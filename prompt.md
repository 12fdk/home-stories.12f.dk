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

## 1. Topic selection — pick from the Reddit-derived topic bank (stable-first)

Topics are **grounded in real Reddit + search demand**, but the job does NOT depend
on a live network scrape at run time (Reddit rate-limits and blocks server IPs, which
crashed earlier runs). Instead, the demand research is **baked into the ranked topic
bank below** and refreshed by a human/Claude when it needs updating. This is the
stable pattern used by the sister Event Stories blog — mirror it.

### How to choose (do this, in order)

1. Run `ls src/content/blog/` and, if useful, `grep -h '^keyword:' src/content/blog/*.md`
   to see what already exists. Read only slugs/keywords, not whole posts (save context).
2. From the **Ranked topic bank** below, pick the **highest-ranked topic that is NOT
   already covered** by an existing post. Higher = stronger demand × app fit.
3. Adapt the exact title for SEO (≤70 chars, includes the keyword). The bracketed
   phrase is roughly what people actually google — use it as the `keyword`.
4. **Optional live confirmation (never required):** if you want, try ONE quick,
   time-boxed Reddit check to confirm phrasing — but treat failure as normal and move
   on immediately. Do NOT block, retry in a loop, or read raw JSON (it blows context):
   ```
   UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/125.0 Safari/537.36"
   curl -s -m 12 -A "$UA" "https://www.reddit.com/r/HomeImprovement/top.json?t=week&limit=12" \
     | python3 -c "import sys,json;[print(p['data']['title'][:100]) for p in json.load(sys.stdin)['data']['children']]" 2>/dev/null \
     | head -12 || echo "(reddit unavailable — using the topic bank, which is fine)"
   ```
   If it returns titles, skim them for fresher phrasing; if not, just use the bank.

### Ranked topic bank (Reddit-demand × Home-Stories-feature fit)

Each entry maps to a real app feature, so the app becomes the natural (unforced)
answer. Pick the highest one not yet covered:

1. **Where to start on a house you just bought** — the first-90-days project order · *"where to start renovating a house"* · (projects + task checklist + photos)
2. **DIY vs. hiring a pro** — an honest decide-in-five-minutes framework · *"should I DIY or hire a contractor"* · (time tracking + budget)
3. **Hidden costs in an older home** — the surprises that blow budgets, and how to brace for them · *"unexpected renovation costs older home"* · (committed vs spent budget + contingency)
4. **Managing a contractor** — change orders, scope creep, and keeping it civil · *"how to deal with contractor change orders"* · (notes log + committed budget + documents)
5. **Documenting a renovation for insurance** — the photo + receipt trail that pays off later · *"how to document home renovation for insurance"* · (photos + receipts + PDF export)
6. **Living through a renovation** — staying sane (and organized) while the house is a building site · *"living in your house during a renovation"* · (tasks + timeline + shared project)
7. **Bathroom renovation order** — the sequence that avoids redoing work · *"bathroom renovation order of work"* · (phases + task checklist)
8. **Where the renovation money actually goes** — a realistic breakdown of a project's line items · *"where does renovation money go"* · (budget categories + item tracking)
9. **Renovation mistakes people regret** — the ones that are cheap to avoid up front · *"biggest home renovation mistakes"* · (planning + photos + notes)
10. **Do I need a permit?** — how to tell, and why skipping it costs more later · *"do I need a permit for home renovation"* · (documents + notes)
11. **Keeping renovation decisions straight** — paint codes, model numbers, why you chose what · *"how to keep track of renovation decisions"* · (notes with tags + item tracking)
12. **Renovating room by room vs. all at once** — how to sequence a whole-house project · *"should I renovate one room at a time"* · (multiple projects + phases)
13. **The end-of-project snag list** — defining "done" so the last 5% actually finishes · *"renovation snag list punch list"* · (task checklist + photos)
14. **Energy-efficiency upgrades worth doing** — what actually pays back vs. what's hype · *"are energy efficient home upgrades worth it"* · (budget + notes)
15. **Renovating a first home on a tight budget** — the frugal-but-not-cheap playbook · *"renovating first home on a budget"* · (budget charts + task checklist)
16. **Moving into a fixer-upper** — the first month's must-dos before the fun stuff · *"moving into a fixer upper first steps"* · (projects + checklist + photos)

If every bank topic is already covered, write a sharper/fresher take on the
highest-demand cluster (budgeting, contractor management, documentation, getting
started) from a new angle — and add a note in your report suggesting the bank be
refreshed. Never repeat an existing post's angle.

**Keeping the bank fresh (human/maintainer task, not the cron's):** periodically
re-derive this list from live demand and edit it here. From a machine that isn't
rate-limited, that's e.g.
`curl -s -A "<browser UA>" "https://www.reddit.com/r/HomeImprovement/top.json?t=month&limit=25"`
across r/HomeImprovement, r/DIY, r/Renovations, r/HomeMaintenance, r/FirstTimeHomeBuyer,
plus Google keyword checks — then rank by demand × app-feature fit.

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

**Style:** concrete over abstract, vivid *illustrative* examples over platitudes,
short paragraphs, plain language, occasional dry wit. Second person ("you"). No
filler intro paragraphs — open with a real observation or a reader's problem.
(Concrete ≠ fabricated: an illustrative scenario is fine — "say the roof quote
comes in at $12k" — but never dress a made-up number as a researched statistic.)

---

## 3. Factual accuracy (non-negotiable — this is where past posts failed)

This site's credibility is the whole point, and the single worst failure mode is
**inventing authoritative-sounding statistics and citations.** You are running
offline and CANNOT reliably verify a number or a source. So the rule is blunt:

- **DEFAULT TO QUALITATIVE. Do not put specific statistics in the post.** No "94%
  cost recovery", no "recovers 74¢ on the dollar", no "60% of renovations go over
  by 10%". Make the point in words instead ("minor kitchen updates tend to return
  far more of their cost than a full gut remodel"). The gold-standard post
  `what-to-track-during-a-renovation.md` contains **zero fabricated stats** — copy
  that discipline exactly.
- **NEVER attribute a claim to a named report/study/organization** (Remodeling
  Magazine "Cost vs. Value", NAR, NARI, Houzz, etc.) unless you have fetched that
  exact source *in this run* and are quoting it. If you didn't fetch it, don't name
  it. A fabricated citation is worse than no citation.
- **NEVER write a URL you have not confirmed.** Only link to (a) pages inside this
  site (`/blog/<slug>/`, confirmed to exist) and (b) the App Store link in §0. Do
  NOT invent external links to reports or studies. External links you didn't fetch
  are almost always wrong (broken domains, typos, dead pages).
- **Dollar figures / percentages are allowed only as clearly-hypothetical
  illustration**, and must read as such: "say a quote comes in around $12k", "a
  spread of a few thousand dollars". Never as a surveyed or measured fact.
- Prefer timeless, verifiable advice (sequence of trades, how contingency works,
  what a snag list is) over specific prices, which vary by country and date.
- Don't state country-specific rules (tax, permits, code) as universal. Hedge
  honestly ("in many places", "check your local rules").
- Do not misrepresent what the Home Stories app does (see §0).
- If Reddit anecdotes inspire a claim, generalize the *pattern*, don't present one
  person's story as fact.

**Self-check before committing:** re-read the draft and delete any number that
looks like a research finding, and any source name or external URL you did not
actually fetch this run. When in doubt, cut it — a purely qualitative post is
100% acceptable and always safer than a confidently wrong one.

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
- Which **topic-bank entry** you chose (its rank/number) and why it was the highest
  uncovered one. If you ran the optional live Reddit check, say whether it worked and
  whether it changed the phrasing.
- Confirmation the build passed (`BUILD OK`) and the push to `main` succeeded.
- Confirm you did the factual-accuracy self-check (§3): no invented statistics, no
  unfetched report names, no unverified external URLs.
- Anything that fell back or is worth a human glance (e.g. "topic bank is running low").

If — and only if — there is genuinely nothing new worth publishing, reply with
exactly `[SILENT]`. Otherwise always ship a post.
