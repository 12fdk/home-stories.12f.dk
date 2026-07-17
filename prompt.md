# Home Stories — Blog Post Brief (single source of truth)

This file is the authoritative brief for the automated weekly blog post on
**home-stories.12f.dk**. The scheduler (Hermes cron) is only a thin wrapper that
clones the repo and reads *this file* fresh on every run — so edit the strategy
here, in git, and it can never drift from what the job actually does.

Your job each run: **research real reader demand on Reddit, then write and publish
ONE new, genuinely useful, factually correct blog post** that quietly earns the
trust of people who are renovating, improving, buying, or maintaining a home —
some of whom will discover the Home Stories app because the article was worth
reading, not because it sold them anything.

---

## 0. Who we are writing for (and why they'd ever want the app)

The reader is a **normal person with a home project and no system for it.** They
are mid-renovation, about to start one, just bought a place, are living through
DIY weekends, or are trying not to blow a budget. They are not developers, not
marketers, and they did not come here to be pitched.

They may never have heard of Home Stories, and the article must be worth their
time even if the app did not exist. Adjacent audiences that also fit — write for
these too, not just hardcore renovators:

- First-time homebuyers and new homeowners ("what do I even do now?")
- DIY / weekend-project people
- People managing a contractor or trades for the first time
- Budget-conscious homeowners, "we can't go over" households
- People documenting a home for insurance, resale, or tax reasons
- Small landlords / people doing up a flat or rental
- Interior refresh, decluttering, maintenance, energy retrofits

**The app, factually (never claim more than this):**
Home Stories is a **free iPhone app (iOS 17+)** for planning and tracking a home
renovation. It does: budget tracking (spent / committed / left), tasks with
reminders and due dates, built-in time tracking, before/during/after photo
documentation with side-by-side compare and timelines, notes with tags, storage
for receipts and documents, item/purchase tracking (estimated vs actual),
professional **PDF export/reports**, project sharing with live iCloud sync,
Home-Screen widgets and Lock-Screen/Dynamic-Island Live Activities, a Safari/
Amazon/IKEA share extension, search across all projects, and 50 languages. It
**works fully offline, needs no account, and syncs via iCloud when you want it.**
Free, with an optional one-time Premium Lifetime unlock. Made in Denmark by
Robert Jensen. App Store:
`https://apps.apple.com/dk/app/home-stories-renovation-app/id6754754960`

Do **not** invent features (no Android app, no web app, no AI features, no bank
integration, no cloud account). If you are unsure a feature exists, don't mention it.

---

## 1. Topic research — ALWAYS scrape Reddit first (required, every run)

Never invent a topic from thin air. Start from what real people are actually
asking this week. Pull live threads from Reddit's public JSON (no auth, no key)
and mine them for pain points, recurring questions, and language people use.

### CRITICAL: fetch Reddit token-efficiently (raw JSON will blow the context window)

Reddit's raw JSON is enormous (full post bodies + comment metadata) and will
exceed the model context and crash the run. **Never read raw Reddit JSON.** Always
pipe it through a filter that keeps ONLY the title, score, and comment count — one
short line per post — and read that distilled list.

Use this exact pattern per subreddit (small `limit`, titles only):

```
for sub in HomeImprovement DIY Renovations FirstTimeHomeBuyer; do
  echo "== r/$sub =="
  curl -s -A "home-stories-blog/1.0" "https://www.reddit.com/r/$sub/top.json?t=week&limit=15" \
    | python3 -c "import sys,json;[print(f\"{p['data']['ups']:>5}u {p['data']['num_comments']:>4}c  {p['data']['title'][:110]}\") for p in json.load(sys.stdin)['data']['children']]"
done
```

- Scrape **3–4 subreddits only**, `limit=15`, `t=week` (fall back to `t=month` if a
  sub is quiet). Good pools to rotate through: `HomeImprovement`, `DIY`,
  `Renovations`, `HomeMaintenance`, `FirstTimeHomeBuyer`, `centuryhomes`,
  `InteriorDesign`, `Kitchens`, `HomeDecorating`, `Frugal`.
- That yields ~50 one-line titles total — cheap to read. Do NOT fetch `selftext`,
  comments, or `limit` above 15. If you want detail on ONE promising thread, fetch
  just that single post's JSON and read only its `selftext` (truncate to ~500 chars).
- If a fetch fails or returns HTML (rate-limited), skip that sub and continue; do
  not retry in a loop.

From the distilled titles, look for:

- **Questions asked over and over** ("how do I keep track of…", "how much
  contingency…", "contractor says X, is that normal?", "how do I not go over budget")
- **Regrets and expensive mistakes** ("wish I'd photographed…", "receipts I lost")
- **High-engagement pain** (high comment count = people needed help)
- **Language the audience actually uses** — reuse their phrasing as the SEO keyword

Then pick ONE topic where (a) there is clear, repeated demand, (b) we can give a
genuinely useful, evergreen answer, and (c) it naturally touches something Home
Stories helps with (tracking, budget, photos, documentation, planning) — *without
the article needing the app to be useful.*

**Deduplicate:** run `ls src/content/blog/` and read only the slug names (and, if
needed, `grep -h '^title:' src/content/blog/*.md`). Do NOT open every post — that
wastes context. Pick a genuinely new topic or a distinctly sharper take than what
the existing slugs already cover.

In your final report, list the specific Reddit threads/subreddits that informed
the topic, so the choice is auditable.

---

## 2. Voice, tone, and the subtle-nudge rule (this is the important part)

Every post must read like it was written by an experienced, honest person who has
renovated and wants to save you the pain — **not like marketing.** The bar: a
skeptical Redditor should upvote it and never feel sold to.

**The nudge budget — hold this line:**

- The article must be **100% valuable and complete on its own.** If you deleted
  every mention of Home Stories, it would still be a great, standalone article.
- Mention Home Stories **at most twice in the body**, and only where it is the
  genuinely natural tool for the job — never shoehorned. One soft, honest CTA at
  the very end is allowed (a single sentence, plus the App Store link).
- Frame the app as *one way* to do the thing, alongside the manual way. Tell the
  reader they can absolutely do it with a notebook, a spreadsheet, or their camera
  roll — then note that a purpose-built tool keeps it in one place. Respect their
  intelligence.
- Lead with the free, generic advice. Earn the mention.
- **Banned:** hype words ("revolutionary", "game-changer", "must-have",
  "ultimate", "supercharge"), fake urgency, "download now!", exclamation-mark
  selling, review-style praise of the app, or implying the reader is failing
  without it. No pressure. A nudge, not a push.
- The **gold-standard reference** is `src/content/blog/what-to-track-during-a-renovation.md`
  in this repo — its tone is exactly right (restraint, specificity, honesty). To
  save context, skim only the top with `head -60 src/content/blog/what-to-track-during-a-renovation.md`
  rather than reading the whole file; match that voice.

**Style:** concrete over abstract, real numbers and examples over platitudes,
short paragraphs, plain language, occasional dry wit. Second person ("you").
No filler intro paragraphs — open with a real observation or a reader's problem.

---

## 3. Factual accuracy (non-negotiable)

This site's credibility is the whole point. **Every factual claim must be true.**

- **Never fabricate statistics.** If you cite a number (e.g. "renovations run X%
  over budget"), it must come from a real, nameable source (Houzz study, industry
  survey, government energy body, etc.) — attribute it in the text. If you cannot
  verify a number, don't use it; make the point qualitatively instead.
- Prefer timeless, verifiable advice (sequence of trades, how contingency works,
  what a snag list is) over specific prices, which vary by country and date.
- Don't state country-specific rules (tax, permits, code) as universal. Hedge
  honestly ("in many places", "check your local rules").
- Do not misrepresent what the Home Stories app does (see §0).
- If Reddit anecdotes inspire a claim, generalize the *pattern*, don't present one
  person's story as fact.

---

## 4. Structure & length

- **1,500–2,200 words.** Skimmable and genuinely complete, not padded.
- **No `<h1>` in the body** — the Astro template renders the H1 from `title`.
- Use `##` (H2) sections and `###` (H3) where useful. Descriptive, not clever-only.
- Open with the reader's real problem (often straight from a Reddit thread), not a
  dictionary definition.
- Use short lists and the occasional bold lead-in. Include at least one concrete
  worked example (numbers, a scenario, a before/after).
- Link to 2–3 **existing** related posts inline where relevant, using
  `/blog/<slug>/` (confirm the slug exists in `src/content/blog/`).
- End with a short, honest wrap-up and the single soft CTA.
- **At least 3–4 images** placed at logical breaks (see §6), each with meaningful
  alt text describing the photo.

---

## 5. Frontmatter schema (must validate — `src/content/config.ts` is the contract)

Emit YAML frontmatter with EXACTLY these fields. All required unless noted. The
build (`astro:content` + zod) will fail the deploy if this is wrong, so match it:

```yaml
---
title: "..."            # ≤ 70 chars, includes the primary keyword, no clickbait
description: "..."       # ≤ 160 chars, includes the keyword, reads like a real summary
lede: "..."             # 1–3 sentence hook shown under the title; concrete, no fluff
keyword: "..."          # the primary SEO keyword/phrase (the reader's own words)
cover: "/stock/NN.png"  # next available number — see §6, never overwrite an existing file
coverAlt: "..."         # describes the photograph itself (it's read aloud); not decoration
publishDate: YYYY-MM-DD # today's date
author: "Robert Jensen"
tags: ["...", "..."]    # 3–5 lowercase, relevant tags
tldr:                   # 3–5 bullet strings; each may use <strong>…</strong>; plain takeaways, not app ads
  - "..."
faq:                    # 5–7 objects; questions = real queries people search
  - question: "..."
    answer: "..."       # direct, useful answer; not a sales pitch
relatedSlugs:           # 3–4 slugs that ACTUALLY EXIST in src/content/blog/
  - "..."
---
```

Rules:
- `title` ≤ 70 characters and `description` ≤ 160 characters — the deploy has
  broken before on an over-length title. Count characters.
- `relatedSlugs` must be real existing slugs (run `ls src/content/blog/`), topically
  related, and should not include the new post itself.
- Never put the literal words `relatedSlugs`, `tldr`, or `faq` in the body text.
- The FAQ answers get rendered as FAQ schema — keep them factual and self-contained.

---

## 6. Cover & inline images (ComfyUI)

- Images live in `public/stock/` and are referenced as `/stock/NN.png`. Run
  `ls public/stock/` and **use the next unused number** — never overwrite an
  existing image.
- Generate a **photorealistic** cover with ComfyUI: `comfy-gen --prompt "DESCRIPTION" --style photoreal`
  (real homes, real renovation scenes, natural light — no text, no logos, no UI
  screenshots, no cartoon style). Save to `public/stock/NN.png`.
- Reference inline images in the body as `![meaningful alt text](/stock/NN.png)`.
  You may reuse relevant existing `/stock/*` images for inline breaks if a fresh
  generation isn't warranted, but the **cover must be new**.
- If ComfyUI is unavailable, retry once; if it still fails, reuse the most fitting
  existing `/stock/*` image rather than blocking the post — and note it in the report.

---

## 7. Build, commit, publish — REDIRECT ALL NOISY OUTPUT TO FILES

The model context is small. `npm install` and `npm run build` print thousands of
lines; if that lands in context the run dies. **Never let build/install output
stream into the conversation.** Always redirect to a file and read only a short
tail, and only on failure.

1. Install deps only if missing, silently:
   ```
   [ -d node_modules ] || npm install --silent --no-progress > /tmp/hs_install.log 2>&1 || tail -20 /tmp/hs_install.log
   ```
2. Build to a log; surface only pass/fail:
   ```
   npm run build > /tmp/hs_build.log 2>&1 && echo "BUILD OK" || { echo "BUILD FAILED — last lines:"; tail -30 /tmp/hs_build.log; }
   ```
   The build MUST print `BUILD OK` before you push — it validates the frontmatter
   schema. If it failed, read only the tail, fix the frontmatter/markdown, rebuild.
3. Commit: `git add -A && git commit -m "Blog: <title>"`
4. Push to main: `git push origin main 2>&1 | tail -5` (GitHub Pages deploys from `main`).

Same discipline everywhere: pipe any command that could be verbose (`comfy-gen`,
`git log`, `npm`, long `cat`) through a file or `tail`. Read files with `head`/
`grep`, never dump a whole large file into context.

## 8. Final report (your last message)

Report concisely:
- The new post: title, slug, file path, primary keyword, word count, cover image.
- The **Reddit threads/subreddits** that informed the topic (for auditability).
- Confirmation the build passed and the push to `main` succeeded.
- Anything that fell back or is worth a human glance.

If — and only if — there is genuinely nothing new worth publishing, reply with
exactly `[SILENT]`. Otherwise always ship a post.
