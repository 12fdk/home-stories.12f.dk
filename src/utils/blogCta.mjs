/**
 * Blog App Store CTAs: topic-aware copy and the mid-article placement rule.
 *
 * Shared by the rehype plugin that renders the mid-article CTA
 * (src/plugins/rehype-inline-cta.mjs), the post template's end CTA, and
 * scripts/validate-posts.mjs — so the validator counts exactly the mention the
 * build is going to render. Plain .mjs on purpose: the validator runs in bare
 * Node without a TypeScript step.
 *
 * The nudge budget (prompt.md §2, EDITORIAL_RULES §6) is "at most two Home
 * Stories mentions in the body, plus the standard end CTA". The mid-article
 * CTA lives inside that budget, never on top of it:
 *
 *   - "upgrade": the post already has a mention paragraph in a mid-article
 *     section (the "how to keep it all straight" paragraph most posts have).
 *     That paragraph is *re-rendered* as the CTA card — same words, plus an
 *     App Store button. Mention count unchanged.
 *   - "insert": the post's only mention is in its closing section. A short
 *     topic-aware card is added after the section nearest the middle of the
 *     article. It counts as a mention, so this only happens when the prose has
 *     at most one — prose + card ≤ 2.
 *   - "none": neither fits (e.g. both mentions already sit in the closing
 *     section). Nothing is added.
 *
 * Frontmatter knobs (all optional, see src/content/config.ts):
 *   inlineCta: false        — no mid-article CTA on this post
 *   inlineCtaAfter: "…"     — insert after the H2 whose text contains this
 *   inlineCtaText: "…"      — custom sentence for an inserted card
 */

export const APP_STORE_URL = "https://apps.apple.com/app/id6754754960";

/** Event surface for the mid-article card (Umami `surface` property). */
export const INLINE_SURFACE = "blog-inline";
/** Event surface for the end-of-article box. */
export const END_SURFACE = "blog-end-cta";

/**
 * Copy per topic. Every claim here matches the App Store listing: a running
 * total with payments split by materials, labour and contractor; tasks; dated
 * photos, receipts and notes; offline; no account. The budget-vs-actual chart,
 * task reminders, PDF export, iCloud sync and project sharing are Pro. The
 * `inline` and `end` sentences differ on purpose (EDITORIAL_RULES §6: the body
 * CTA and the closing blurb must not repeat each other).
 */
export const TOPICS = {
  documentation: {
    label: "Keeping the record",
    inline:
      "If you'd rather not assemble the record by hand, Home Stories keeps dated photos, receipts and notes on one project.",
    end: "A record only helps if it exists on the day someone asks for it. Home Stories keeps photos, receipts and notes dated on the project — free on the App Store. A PDF of the project is part of Pro.",
  },
  timeline: {
    label: "Keeping the schedule straight",
    inline:
      "If you'd rather hold the schedule on your phone than in your head, Home Stories keeps each phase as tasks next to the budget and photos.",
    end: "Timelines slip one trade at a time. Home Stories keeps phases and tasks next to the budget and the photos, so you can see what is waiting on what — free on the App Store.",
  },
  contractors: {
    label: "Keeping the paper trail",
    inline:
      "If you want the quotes, change notes and payments in one place, Home Stories keeps them on the project with a date on each, so the trail is on your phone when a question comes up.",
    end: "Disagreements with a contractor are settled by whoever kept the paper trail. Home Stories keeps quotes, change notes, receipts and payments together on your iPhone or iPad — free on the App Store.",
  },
  budget: {
    label: "Keeping the numbers live",
    inline:
      "If you'd rather not keep this in a spreadsheet, Home Stories logs each payment with its receipt photo and keeps materials, labour and contractor apart, with a running total.",
    end: "Renovation budgets drift. Home Stories puts the running total on one screen, so an overrun shows up while you can still act on it — free on the App Store.",
  },
  general: {
    label: "One way to keep track",
    inline:
      "If you'd rather not juggle a notebook, a spreadsheet and your camera roll, Home Stories keeps the budget, tasks, photos and receipts for a renovation in one place on your iPhone or iPad.",
    end: "Most renovation stress comes from information scattered across five places. Home Stories keeps budget, tasks, photos and receipts in one project on your iPhone or iPad — free on the App Store, no account needed.",
  },
};

/** Pick a topic from slug, keyword and tags. Order matters: most specific first. */
export function topicFor({ slug = "", keyword = "", tags = [] } = {}) {
  const hay = [slug, keyword, ...(Array.isArray(tags) ? tags : [])].join(" ").toLowerCase();
  if (/insurance|document|receipt|photo/.test(hay)) return "documentation";
  if (/how-long|timeline|duration|phases?\b|sequence|schedule/.test(hay)) return "timeline";
  if (/contractor|quote|change order|bids?\b|hiring/.test(hay)) return "contractors";
  if (/budget|cost|expense|overrun|contingency/.test(hay)) return "budget";
  return "general";
}

/** Section headings that are wrap-ups, sources or FAQs — never a mid-article spot. */
const CLOSING = /sources|further reading|wrapping up|bottom line|summary|ready to|putting it together|what's next|frequently asked|\bfaq\b|in short|final thoughts|honest recommendation/i;

/**
 * Decide the mid-article CTA for one post.
 *
 * @param {object} p
 * @param {{heading: string, words: number, mentions: number}[]} p.sections
 *   index 0 = intro before the first H2; then one entry per H2 section.
 *   `mentions` = paragraphs in that section that name Home Stories or link the
 *   App Store.
 * @param {number} p.proseMentions  "Home Stories" count the validator sees
 * @param {object} p.frontmatter
 * @returns {{mode: "upgrade"|"insert"|"none", section: number, reason: string}}
 */
export function planInlineCta({ sections, proseMentions, frontmatter = {} }) {
  const fm = frontmatter ?? {};
  if (fm.inlineCta === false || fm.inlineCta === "false") {
    return { mode: "none", section: -1, reason: "disabled in frontmatter" };
  }
  // The last section that is not Sources/FAQ is the closing one; anything in
  // it is the closing nudge, and sits right above the end CTA box anyway.
  const content = sections
    .map((s, i) => ({ ...s, i }))
    .filter((s) => s.i > 0 && !/sources|further reading|frequently asked|\bfaq\b/i.test(s.heading));
  const lastContent = content.length ? content[content.length - 1].i : -1;
  const eligible = (s) => s.i >= 1 && s.i !== lastContent && !CLOSING.test(s.heading);

  // 1. Upgrade an existing mid-article mention (no change to the count).
  const withMention = content.find((s) => eligible(s) && s.mentions > 0);
  if (withMention && !fm.inlineCtaAfter) {
    return { mode: "upgrade", section: withMention.i, reason: `upgrades the mention in "${withMention.heading}"` };
  }

  // 2. Insert a card — only if it keeps the body at ≤ 2 mentions.
  if (proseMentions > 1) {
    return {
      mode: "none",
      section: -1,
      reason: fm.inlineCtaAfter
        ? `inlineCtaAfter is set but the body already has ${proseMentions} mentions`
        : `body already has ${proseMentions} mentions, none mid-article`,
    };
  }
  if (fm.inlineCtaAfter) {
    const needle = String(fm.inlineCtaAfter).toLowerCase();
    const hit = content.find((s) => s.heading.toLowerCase().includes(needle));
    if (!hit) return { mode: "none", section: -1, reason: `inlineCtaAfter "${fm.inlineCtaAfter}" matches no H2` };
    return { mode: "insert", section: hit.i, reason: `inserted after "${hit.heading}" (frontmatter)` };
  }
  const total = sections.reduce((n, s) => n + s.words, 0);
  let run = 0;
  let best = null;
  sections.forEach((s, i) => {
    run += s.words;
    const at = run / (total || 1);
    // At least two sections in and past 30% — the reader has had real value
    // before anything asks for their attention — and not in the last 20%.
    if (i < 2 || at < 0.3 || at > 0.8 || !eligible({ ...s, i })) return;
    const d = Math.abs(at - 0.5);
    if (!best || d < best.d) best = { i, d, heading: s.heading };
  });
  if (!best) return { mode: "none", section: -1, reason: "no section between 30% and 80% of the article" };
  return { mode: "insert", section: best.i, reason: `inserted after "${best.heading}"` };
}

/* ----------------------------------------------- markdown-side analysis --- */

/** Split a markdown body into H2 sections for planInlineCta (validator side). */
export function sectionsFromMarkdown(body) {
  const clean = body.replace(/```[\s\S]*?```/g, " ");
  const sections = [{ heading: "", words: 0, mentions: 0 }];
  // Paragraph blocks: separated by blank lines.
  for (const block of clean.split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t) continue;
    const h2 = t.match(/^##\s+(.*)$/m);
    if (h2 && t.startsWith("## ")) {
      sections.push({ heading: h2[1].trim(), words: 0, mentions: 0 });
      const rest = t.split("\n").slice(1).join("\n");
      if (rest.trim()) addBlock(sections[sections.length - 1], rest);
      continue;
    }
    addBlock(sections[sections.length - 1], t);
  }
  return sections;
}

function addBlock(section, t) {
  const text = t.replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  section.words += text.split(/\s+/).filter(Boolean).length;
  // A "paragraph" in the plugin's sense: a top-level <p>, not a heading,
  // list, quote or table — those are not re-rendered as a card.
  // A paragraph that ends in a colon introduces the list after it; lifting it
  // into a card would orphan that list, so it is not a candidate.
  const isPara = !/^(#|[-*+]\s|\d+\.\s|>|\|)/.test(t) && !/:\s*$/.test(text);
  if (isPara && (/Home Stories/.test(text) || t.includes(APP_STORE_URL))) section.mentions++;
}
