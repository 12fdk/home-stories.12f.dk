#!/usr/bin/env node
/**
 * Editorial validator for src/content/blog/*.md — issue #95.
 *
 * `astro build` already enforces the *shape* of the frontmatter (src/content/config.ts
 * is a zod schema). This script enforces the things zod cannot see: the rules in
 * prompt.md §2 (subtle-nudge), §3 (factual accuracy) and §4 (structure).
 *
 * It exists because the blog is written by a small local model (qwen) on a cron, and
 * its documented failure modes are fabricated statistics, invented citations, and
 * drifting into an advert. Those are exactly the failures a human notices too late.
 *
 * Usage:
 *   node scripts/validate-posts.mjs                 # every post
 *   node scripts/validate-posts.mjs <slug|path>...  # named posts only
 *   node scripts/validate-posts.mjs --set           # only posts in the page set
 *
 * Exit code 1 if any ERROR is found. WARNs never fail the run — they are for a human.
 */

import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = "src/content/blog";
const APP_STORE_URL = "https://apps.apple.com/app/id6754754960";

/**
 * Citations the blog is allowed to link out to (prompt.md §3).
 *
 * §3 bans external URLs because the weekly cron writes offline and cannot check
 * that a link resolves — it once invented authoritative-looking citations, which
 * is the worst failure mode this site has. The ban is the enforcement mechanism
 * for "never write a URL you have not confirmed", not a position that outbound
 * links are bad: §3 explicitly permits a source you fetched in the same run.
 *
 * So the rule stays blunt for anything not on this list. Every entry below was
 * fetched and returned HTTP 200 on 2026-08-27. Adding one is a deliberate act:
 * fetch it first, confirm it resolves, then add it here in the same commit.
 * Primary sources only — standards bodies, regulators, government guidance.
 */
const VERIFIED_CITATIONS = new Set([
  "https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam",
  "https://consumer.ftc.gov/shopping-and-donating/for-the-home",
  "https://www.hud.gov/topics/home_improvements",
  "https://www.nahb.org/news-and-economics/housing-economics",
  "https://www.houzz.com/magazine/2024-us-houzz-and-home-study-stsetivw-vs~171833394",
  "https://www.iii.org/fact-statistic/facts-statistics-homeowners-and-renters-insurance",
  "https://www.nfpa.org/education-and-research/home-fire-safety",
  "https://www.epa.gov/lead/renovation-repair-and-painting-program",
  "https://www.electricalsafetyfirst.org.uk/",
  "https://www.planningportal.co.uk/permission",
  "https://www.gov.uk/planning-permission-england-wales",
  "https://www.gov.uk/building-regulations-approval",
  "https://www.fmb.org.uk/",
  "https://www.nwfa.org/",
  "https://www.asphaltroofing.org/",
  // Named in the tool-comparison posts, which cannot be written without them.
  "https://www.homezada.com",
  "https://www.houzz.com/pro",
]);

// Posts written before the validator existed. They are held to the ERROR rules
// but exempt from WARN-level nitpicks that would otherwise create pointless noise.
const SET_PREFIX = "how-long-does-";

/**
 * Page-set posts that brush against an existing post's territory, and the post they
 * must link to so a reader (and a crawler) can tell the two apart. Keyed by a
 * substring of the set slug.
 */
const DIFFERENTIATE_FROM = {
  kitchen: "kitchen-renovation-timeline",
};

/* ------------------------------------------------------------------ parsing */

/**
 * Minimal frontmatter reader. Deliberately not a general YAML parser — it only
 * understands the shapes prompt.md §5 mandates: scalars, string lists, and the
 * `faq:` list of {question, answer}. Anything more exotic is a schema violation
 * that `astro build` will catch anyway.
 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: null, body: raw };
  const body = raw.slice(m[0].length);
  const data = {};
  const lines = m[1].split(/\r?\n/);
  let key = null;

  const unquote = (v) => {
    const t = v.trim();
    if (
      (t.startsWith('"') && t.endsWith('"') && t.length > 1) ||
      (t.startsWith("'") && t.endsWith("'") && t.length > 1)
    ) {
      return t.slice(1, -1);
    }
    return t;
  };

  for (const line of lines) {
    if (!line.trim() || /^\s*#/.test(line)) continue;

    const top = line.match(/^([A-Za-z_][\w]*):\s*(.*)$/);
    if (top) {
      key = top[1];
      const rest = top[2].trim();
      // Inline list: tags: ["a", "b"]
      if (rest.startsWith("[")) {
        data[key] = rest
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((s) => unquote(s))
          .filter(Boolean);
      } else if (rest === "") {
        data[key] = [];
      } else {
        data[key] = unquote(rest);
      }
      continue;
    }

    // List item under the current key
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      const val = item[1];
      const kv = val.match(/^([A-Za-z_][\w]*):\s*(.*)$/);
      if (kv) data[key].push({ [kv[1]]: unquote(kv[2]) });
      else data[key].push(unquote(val));
      continue;
    }

    // Continuation key of the previous object item (the `answer:` of an faq entry)
    const sub = line.match(/^\s+([A-Za-z_][\w]*):\s*(.*)$/);
    if (sub && key && Array.isArray(data[key]) && data[key].length) {
      const last = data[key][data[key].length - 1];
      if (last && typeof last === "object") last[sub[1]] = unquote(sub[2]);
    }
  }
  return { data, body };
}

/** Body text with code fences, image markup and link URLs removed, for prose checks. */
function prose(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ");
}

function wordCount(body) {
  return prose(body).split(/\s+/).filter(Boolean).length;
}

/* ------------------------------------------------------------------- checks */

const HYPE = [
  "revolutionary", "game-changer", "game changer", "must-have", "must have",
  "ultimate", "supercharge", "cutting-edge", "seamlessly", "unlock the power",
  "download now", "look no further", "in today's fast-paced",
];

// Patterns that read as a researched finding. prompt.md §3 bans these outright.
// NOTE on the percentage rule: prompt.md §3 *allows* hypothetical illustration
// ("you've burned 10% of it", "set aside 15%") and bans only figures dressed up as
// research. So this matches "% of <population noun>", not every "% of".
const POPULATION = "homeowners?|home ?owners?|renovations?|remodels?|projects?|people|contractors?|builders?|households?|homes?|respondents?|buyers?|jobs?";
const STAT_PATTERNS = [
  { re: new RegExp(`\\b\\d{1,3}(?:\\.\\d+)?\\s?%\\s+of\\s+(?:all\\s+|US\\s+|UK\\s+)?(?:${POPULATION})\\b`, "gi"), why: "percentage-of-population claim" },
  { re: /\b(?:studies|research|surveys?|data)\s+(?:show|shows|found|suggest|indicate)/gi, why: "unsourced research claim" },
  { re: /\baccording to\s+(?:a\s+)?(?:the\s+)?[A-Z]/g, why: "attributed citation" },
  { re: /\b(?:Cost\s*vs\.?\s*Value|NAR\b|NARI\b|Houzz\b|Remodeling Magazine|Angi\b|HomeAdvisor)/g, why: "named report/organisation" },
  { re: /\b(?:on average|the average)\s+(?:homeowner|renovation|project|kitchen|bathroom)s?\s+\w+\s+\$?\d/gi, why: "averaged figure presented as fact" },
  { re: /\b\d{1,3}(?:\.\d+)?\s?%\s+(?:cost recovery|return|ROI|recoup)/gi, why: "ROI statistic" },
];

function checkPost(file) {
  const slug = path.basename(file, ".md");
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const errors = [];
  const warns = [];
  const E = (m) => errors.push(m);
  const W = (m) => warns.push(m);

  if (!data) {
    return { slug, errors: ["no frontmatter block"], warns, words: 0 };
  }

  /* --- frontmatter (beyond what zod already enforces) --- */
  for (const f of ["title", "description", "lede", "keyword", "publishDate", "author"]) {
    if (!data[f]) E(`frontmatter: missing \`${f}\``);
  }
  if (data.title && data.title.length > 70) E(`title is ${data.title.length} chars (max 70)`);
  if (data.description && data.description.length > 160) E(`description is ${data.description.length} chars (max 160)`);
  if (data.keyword && data.title) {
    // The title rarely contains the keyword verbatim (it is written for humans), so
    // ask only that most of the keyword's words show up somewhere in the title.
    const kw = data.keyword.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    const t = data.title.toLowerCase();
    const hit = kw.filter((w) => t.includes(w)).length;
    if (kw.length && hit / kw.length < 0.5) {
      W(`title covers only ${hit}/${kw.length} words of the keyword "${data.keyword}"`);
    }
  }
  const faq = (data.faq || []).filter((f) => f && f.question);
  if (faq.length < 5) E(`faq has ${faq.length} entries (need 5–7 — it feeds FAQPage schema)`);
  if (faq.length > 7) W(`faq has ${faq.length} entries (7 is the intended cap)`);
  const tldr = data.tldr || [];
  if (tldr.length < 3) E(`tldr has ${tldr.length} bullets (need 3–5)`);
  const tags = data.tags || [];
  if (tags.length < 3) W(`only ${tags.length} tags (3–5 intended)`);

  /* --- relatedSlugs must exist --- */
  const related = data.relatedSlugs || [];
  if (related.length < 3) W(`relatedSlugs has ${related.length} entries (3–4 intended)`);
  for (const r of related) {
    if (r === slug) E(`relatedSlugs links to itself (${r})`);
    else if (!fs.existsSync(path.join(BLOG_DIR, `${r}.md`))) E(`relatedSlugs "${r}" does not exist`);
  }

  /* --- structure --- */
  const words = wordCount(body);
  if (words < 1400) E(`body is ${words} words (min 1,500 — 1,400 tolerated)`);
  else if (words < 1500) W(`body is ${words} words (target 1,500–2,200)`);
  // Page-set posts get a tighter ceiling. The format's failure mode is padding —
  // row 2 reached 2,278 words by answering "what is the time spent on" in two separate
  // sections. A duration question does not need 2,200 words to answer honestly.
  const padCeiling = slug.startsWith(SET_PREFIX) ? 2100 : 2400;
  if (words > padCeiling) W(`body is ${words} words (target 1,500–2,000 for a set post — check for repeated sections)`);
  if (/^#\s+/m.test(body)) E("body contains an H1 — the template renders the H1 from `title`");
  if (!/^##\s+/m.test(body)) E("body has no H2 sections");

  /* --- internal links --- */
  const internal = [...body.matchAll(/\]\((\/blog\/[a-z0-9-]+)\/?\)/g)].map((m) => m[1]);
  const uniqueInternal = [...new Set(internal)];
  // Floor raised from 2 to 3 with #96, once every post on the blog cleared it. Three is
  // the point where a post is part of the site rather than a cul-de-sac in it.
  if (uniqueInternal.length < 3) E(`only ${uniqueInternal.length} inline internal /blog/ links (need at least 3)`);
  for (const l of uniqueInternal) {
    const target = l.replace("/blog/", "");
    if (target === slug) E(`links to itself (${l})`);
    else if (!fs.existsSync(path.join(BLOG_DIR, `${target}.md`))) E(`internal link "${l}" points at a post that does not exist`);
  }

  /* --- page-set cohesion (prompt.md §1a) ---
   * A set only earns its keep if its pages are linked into a cluster and each one is
   * clearly distinct from whatever already covered that ground. Run 1 of the set
   * silently skipped its required differentiation link, so this is checked, not asked. */
  if (slug.startsWith(SET_PREFIX)) {
    // Only *earlier* siblings count. A post cannot link to one that did not exist when
    // it was written, and requiring it would retroactively fail every post each time a
    // new row lands. Backward links are the cron's job; the forward links that turn the
    // chain into a mesh are a deliberate pass once the set is complete (#95).
    const siblings = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.startsWith(SET_PREFIX) && f.endsWith(".md") && f !== `${slug}.md`)
      .map((f) => f.replace(/\.md$/, ""))
      .filter((s) => {
        const sib = parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, `${s}.md`), "utf8")).data;
        return sib?.publishDate && data.publishDate && String(sib.publishDate) < String(data.publishDate);
      });
    if (siblings.length) {
      const linked = siblings.filter((s) => uniqueInternal.includes(`/blog/${s}`));
      if (!linked.length) {
        E(`page-set post links to none of its ${siblings.length} earlier sibling(s) — the set must form a cluster`);
      }
    }
    for (const [needle, required] of Object.entries(DIFFERENTIATE_FROM)) {
      if (slug.includes(needle) && !uniqueInternal.includes(`/blog/${required}`)) {
        E(`must link to /blog/${required}/ — it covers adjacent ground and the two posts have to be told apart`);
      }
    }
  }

  /* --- external links: App Store link + the verified citation allowlist (prompt.md §3) --- */
  const external = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
  for (const u of external) {
    if (u.startsWith(APP_STORE_URL)) continue;
    if (VERIFIED_CITATIONS.has(u)) continue;
    E(`unverified external URL: ${u} — fetch it, confirm it resolves, then add it to VERIFIED_CITATIONS`);
  }
  if (/apps\.apple\.com\/[a-z]{2}\//.test(raw)) E("App Store link uses a country storefront — use the neutral form (#97)");

  /* --- nudge budget (prompt.md §2) --- */
  const bodyMentions = (prose(body).match(/Home Stories/g) || []).length;
  if (bodyMentions > 3) E(`"Home Stories" appears ${bodyMentions}× in the body (max 2 + one CTA)`);
  else if (bodyMentions === 3) W(`"Home Stories" appears 3× — allowed only if one is the closing CTA`);
  const lowerAll = raw.toLowerCase();
  for (const h of HYPE) {
    if (lowerAll.includes(h)) E(`banned hype phrase: "${h}"`);
  }
  const bangs = (prose(body).match(/!/g) || []).length;
  if (bangs > 2) W(`${bangs} exclamation marks — the voice is dry, not excitable`);

  /* --- factual accuracy (prompt.md §3) --- */
  // The "Sources and further reading" section is exempt from the named-body
  // heuristic. That heuristic exists to catch an organisation invoked with no
  // way to check it; in this section every name is attached to a URL from
  // VERIFIED_CITATIONS, which is the sourcing §3 asks for rather than the
  // fabrication it forbids. Everything above the heading is still scanned.
  const citedFrom = body.indexOf("## Sources and further reading");
  const scannable = citedFrom === -1 ? body : body.slice(0, citedFrom);
  const scan = prose(scannable) + " " + faq.map((f) => `${f.question} ${f.answer}`).join(" ");
  for (const { re, why } of STAT_PATTERNS) {
    const hits = [...scan.matchAll(re)].map((m) => m[0].trim());
    for (const h of [...new Set(hits)]) E(`possible fabricated ${why}: "${h}"`);
  }

  return { slug, errors, warns, words, publishDate: data.publishDate, keyword: data.keyword };
}

/* --------------------------------------------------------------------- main */

const argv = process.argv.slice(2);
const setOnly = argv.includes("--set");
const named = argv.filter((a) => !a.startsWith("--"));

let files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => path.join(BLOG_DIR, f));

if (named.length) {
  files = named.map((n) =>
    n.endsWith(".md") ? n : path.join(BLOG_DIR, `${path.basename(n)}.md`),
  );
} else if (setOnly) {
  files = files.filter((f) => path.basename(f).startsWith(SET_PREFIX));
}

let totalErrors = 0;
let totalWarns = 0;
const results = [];

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log(`✗ ${f}\n    ERROR  file not found`);
    totalErrors++;
    continue;
  }
  const r = checkPost(f);
  results.push(r);
  totalErrors += r.errors.length;
  totalWarns += r.warns.length;

  if (r.errors.length || r.warns.length) {
    console.log(`${r.errors.length ? "✗" : "!"} ${r.slug}  (${r.words} words)`);
    for (const e of r.errors) console.log(`    ERROR  ${e}`);
    for (const w of r.warns) console.log(`    warn   ${w}`);
  } else {
    console.log(`✓ ${r.slug}  (${r.words} words)`);
  }
}

/* --- cross-post checks: same-day pile-ups and duplicate keywords --- */
const byDate = new Map();
const byKeyword = new Map();
for (const r of results) {
  if (r.publishDate) byDate.set(r.publishDate, (byDate.get(r.publishDate) || 0) + 1);
  if (r.keyword) {
    const k = r.keyword.toLowerCase();
    byKeyword.set(k, [...(byKeyword.get(k) || []), r.slug]);
  }
}
const collisions = [...byDate.entries()].filter(([, n]) => n > 1);
if (collisions.length && files.length > 1) {
  console.log("");
  for (const [d, n] of collisions) {
    console.log(`    warn   ${n} posts share publishDate ${d} — the blog publishes one post per day`);
    totalWarns++;
  }
}
/* --- orphan check ---
 * Outbound links are easy to satisfy and mean little on their own; what moves crawl
 * priority and authority is whether anything points *at* a post. The page set was
 * written entirely with backward links, which left it reachable only from the sitemap
 * and from itself — no established post linked into it. Scans every post on disk, not
 * just the ones being validated, since inbound links come from anywhere. (#95, #96) */
{
  const all = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const inbound = new Map(all.map((f) => [f.replace(/\.md$/, ""), new Set()]));
  for (const f of all) {
    const from = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    for (const m of raw.matchAll(/\]\((\/blog\/([a-z0-9-]+))\/?\)/g)) {
      if (m[2] !== from && inbound.has(m[2])) inbound.get(m[2]).add(from);
    }
  }
  for (const r of results) {
    const sources = inbound.get(r.slug);
    if (!sources) continue;
    if (sources.size === 0) {
      console.log(`    warn   ${r.slug} is orphaned — no other post links to it`);
      totalWarns++;
    } else if (r.slug.startsWith(SET_PREFIX)) {
      const outside = [...sources].filter((s) => !s.startsWith(SET_PREFIX));
      if (!outside.length) {
        console.log(`    warn   ${r.slug} is only linked from inside its own page set — no established post points into it`);
        totalWarns++;
      }
    }
  }
}

const dupeKeywords = [...byKeyword.entries()].filter(([, s]) => s.length > 1);
for (const [k, slugs] of dupeKeywords) {
  console.log(`    ERROR  duplicate keyword "${k}" in: ${slugs.join(", ")} — these will cannibalise each other`);
  totalErrors++;
}

console.log(
  `\n${files.length} post(s) checked — ${totalErrors} error(s), ${totalWarns} warning(s)`,
);
process.exit(totalErrors > 0 ? 1 : 0);
