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
Home Stories is a **free native app for iPhone and iPad (iOS 17+)**. There is
no Android version. Made in Denmark by Robert Jensen. App Store:
`https://apps.apple.com/app/id6754754960`

Free, and it stays free: projects with a budget and a running total; items with
a price; payments logged with materials, labour and contractor kept apart;
photos (timeline, before/after); notes; documents (quotes, contracts, receipts);
tasks; time tracking; Home Screen widgets; local backups; data export; works
fully offline; no account; 50 languages; share a product in from Safari, Amazon
or IKEA.

Pro is an optional **one-time** purchase (about $9.99 in the US, no
subscription). It adds only: the budget-vs-actual chart, task reminders, PDF
export, iCloud sync, and project sharing.

Do not describe PDF export, iCloud sync, or project sharing as free. Do not say
the app is iPhone-only. Do not name three budget columns "spent, committed and
remaining" — the App Store wording is a running total, a budget-vs-actual chart
(Pro), and payments split by materials, labour and contractor.

Do **not** invent features (no Android app, no web app, no AI features, no bank
integration, no cloud account). If you are unsure a feature exists, don't mention it.

---

## 1. Topic selection — the page-set queue, then the live Reddit digest, then the topic bank

Three sources, in this order. Take the topic from the first one that gives you one.

1. **§1a, the page-set queue**, while it has unwritten rows. (Page set 1 is finished;
   the queue stays here so the next set can be added the same way.)
2. **§1b, the live Reddit digest** from `tools/reddit-topics.py`. This is the normal
   source of a topic.
3. **§1c, the ranked topic bank.** This is the fallback, for a failed scrape or a
   digest with nothing that fits.

`BLOG_CONTENT_PLAN.md` is the maintainer's strategy document, not a source for this
job. If it and this brief disagree, this brief wins.

### 1a. Page-set queue (WORK THIS FIRST while it has unwritten rows)

A **page set** is a group of posts that share a shape and each answer one distinct
long-tail question. Sets earn traffic that one-off posts can't, because they cover a
whole question space instead of a single query. Issue #95 tracks this.

**How to use the queue:**

1. Run `ls src/content/blog/` once.
2. Walk the table below **top to bottom** and take the **first row whose slug has no
   matching `.md` file.** That row is your post this run. Do not pick a different one,
   do not reorder, do not write two.
3. Use the row's `slug`, `keyword` and `publishDate` **exactly as written.** The
   `publishDate` is deliberately in the future — the set is written over a few sittings
   but released one post per day, so the blog never dumps a pile of posts on one date.
   A future-dated post correctly does not appear on the site until that day; that is
   the design, not a bug (see `src/utils/posts.ts`). **Never change a row's date to
   today.**
4. If every row is written, the set is done — fall through to §1b (the live digest).

**The set: "how long does <task> take"** — duration questions people actually type.
Each row must be genuinely its own article: the honest answer, what the days are
actually spent on, and what makes it run long. Same shape, different substance.

| # | slug | keyword | publishDate |
|---|------|---------|-------------|
| 1 | `how-long-does-a-kitchen-renovation-take` | how long does a kitchen renovation take | 2026-07-27 |
| 2 | `how-long-does-a-bathroom-renovation-take` | how long does a bathroom renovation take | 2026-07-28 |
| 3 | `how-long-does-it-take-to-rewire-a-house` | how long does it take to rewire a house | 2026-07-29 |
| 4 | `how-long-does-it-take-to-replace-windows` | how long does it take to replace windows | 2026-07-30 |
| 5 | `how-long-does-it-take-to-install-flooring` | how long does it take to install flooring | 2026-07-31 |
| 6 | `how-long-does-a-roof-replacement-take` | how long does a roof replacement take | 2026-08-01 |
| 7 | `how-long-does-a-house-extension-take` | how long does a house extension take | 2026-08-02 |
| 8 | `how-long-does-a-loft-conversion-take` | how long does a loft conversion take | 2026-08-03 |

**Rules specific to this set (on top of everything else in this brief):**

- **Durations are ranges with reasons, never researched-sounding facts.** Write "most
  straightforward kitchen refits run somewhere in the region of four to eight weeks on
  site, and the spread is mostly about whether anything moves" — never "the average
  kitchen renovation takes 6.2 weeks". §3 applies in full: no surveys, no studies, no
  named sources. If you cannot say it qualitatively and honestly, cut it.
- **Answer each question once.** Set posts run long by saying the same thing twice
  under two headings — a "what the weeks are spent on" section *and* a "what the time
  is spent on" walk-through are the same section with two titles. Before you commit,
  read your own `##` headings in order and delete any that duplicates another's job.
  **Aim for 1,500–2,000 words here**, not the 2,200 ceiling in §4; a duration question
  answered honestly does not need padding.
- **Say what the time is actually spent on.** The valuable part is the breakdown —
  lead times on ordered items, the wait for an inspection, the drying/curing days
  nobody counts, the gap between trades. That is what makes each row different.
- **Name what makes it run long**, specifically for that task. This is the section
  that must not be interchangeable between rows.
- **Two link requirements, both enforced by the validator — it will fail your post:**
  1. **Link to every sibling requirement in this list that applies to your row.** Row 1
     (kitchen) **must** link to `/blog/kitchen-renovation-timeline/`, which targets
     "renovation project timeline example" and lays out a week-by-week worked example.
     Yours answers the *duration* question and the *delay causes*. Point at it instead
     of repeating it, so a reader and a crawler can tell the two apart.
  2. **Link to at least one existing `how-long-does-*` sibling**, so the set forms a
     cluster rather than eight islands. Row 1 has no siblings — it is exempt until
     row 2 exists. Every later row is not.

  These are on top of the usual 2–3 pillar links, not instead of them.

### 1b. Live Reddit digest (the normal source of a topic)

`tools/reddit-topics.py` reads the monthly top posts of the subreddits this
audience uses (r/HomeImprovement, r/Renovations, r/homeowners, r/FirstTimeHomeBuyer,
r/HomeMaintenance, r/DIY, r/centuryhomes, r/OldHouses, r/Landlord, r/Homebuilding,
r/Contractor). It keeps only titles that ask a real question, sorts them into
themes, and marks the themes an existing post already owns. It prints a short
digest (about 60 lines): `UNCOVERED THEMES` (strongest demand first, each with
verbatim example titles), `ALREADY COVERED` (with the slugs that cover them), and
`TOP QUESTION TITLES VERBATIM`. It is slow by design (about one feed a minute,
Reddit rate-limits) and caches feeds in `.cache/reddit-topics/` (git-ignored).

**How to choose from the digest (do this, in order):**

1. Read the digest from its log with `head`/`tail`. Never read the raw feeds or the
   cache files.
2. Take the **highest-ranked theme under `UNCOVERED THEMES`** that this site can
   serve honestly: a question our reader (§0) has, where planning, budgeting,
   documenting or keeping track is part of the answer. Skip a theme only for a
   reason you can say in one line in the report (for example "pure how-to for a
   licensed trade, no planning angle").
3. **Safety-critical trades (electrical, gas, structural, roofing at height): write
   the decision and planning angle, never a how-to.** "Do I need an electrician for
   this, and what does the quote cover?" is our post; "how to wire a sub-panel" is
   not. Say plainly where the right answer is a licensed professional.
4. **The verbatim titles are the brief.** Use the readers' own phrasing for the
   `keyword`, the question H2s and the FAQ questions. Generalise the pattern behind
   the titles; never present one Reddit poster's story as fact (§3).
5. Confirm the angle is new: `ls src/content/blog/` and
   `grep -h '^keyword:' src/content/blog/*.md`. A theme under `ALREADY COVERED`
   is allowed only with a clearly different angle from the slugs it lists.
6. If the theme you chose matches an entry in the §1c bank, that bank entry is now
   used: mark it in the same commit (see §1c).

**When to fall back to §1c, the topic bank:**

- The tool exited `2` (every feed failed). That is a normal outcome, not a fault.
- The digest has no uncovered theme that passes step 2.
- The digest is thin (fewer than about 3 feeds read, or no theme with 2 or more
  posts). Then use the bank, and use any digest titles that fit for phrasing.

### 1c. Ranked topic bank (fallback)

The bank is Reddit + search demand that was researched by hand from the same
subreddits, ranked by demand × Home-Stories-feature fit. Each entry maps to a real
app feature, so the app becomes the natural (unforced) answer.

**How to use it:**

1. Pick the **highest-ranked entry that is not marked ✅ and not already covered**
   by an existing post (check with `ls src/content/blog/`).
2. Adapt the exact title for SEO (≤70 chars, includes the keyword). The bracketed
   phrase is roughly what people actually google — use it as the `keyword`.
3. **Mark the entry you used in the same commit as the post:** append
   ` — ✅ \`<slug>\`` to its line in this file, and stage `prompt.md` with the post.

**Ranked topic bank (Reddit-demand × Home-Stories-feature fit):**

1. **Where to start on a house you just bought** — the first-90-days project order · *"where to start renovating a house"* · (projects + task checklist + photos) — ✅ `where-to-start-renovating-new-house`
2. **DIY vs. hiring a pro** — an honest decide-in-five-minutes framework · *"should I DIY or hire a contractor"* · (time tracking + budget) — ✅ `diy-vs-hire-contractor`
3. **Hidden costs in an older home** — the surprises that blow budgets, and how to brace for them · *"unexpected renovation costs older home"* · (running total + contingency) — ✅ `hidden-costs-older-home`
4. **Managing a contractor** — change orders, scope creep, and keeping it civil · *"how to deal with contractor change orders"* · (notes log + payments + documents) — ✅ `managing-contractor-change-orders`
5. **Documenting a renovation for insurance** — the photo + receipt trail that pays off later · *"how to document home renovation for insurance"* · (photos + receipts + PDF export) — ✅ `documenting-renovation-for-insurance`
6. **Living through a renovation** — staying sane (and organized) while the house is a building site · *"living in your house during a renovation"* · (tasks + timeline + shared project)
7. **Bathroom renovation order** — the sequence that avoids redoing work · *"bathroom renovation order of work"* · (phases + task checklist) — ✅ `bathroom-renovation-sequence`
8. **Where the renovation money actually goes** — a realistic breakdown of a project's line items · *"where does renovation money go"* · (budget categories + item tracking)
9. **Renovation mistakes people regret** — the ones that are cheap to avoid up front · *"biggest home renovation mistakes"* · (planning + photos + notes)
10. **Do I need a permit?** — how to tell, and why skipping it costs more later · *"do I need a permit for home renovation"* · (documents + notes)
11. **Keeping renovation decisions straight** — paint codes, model numbers, why you chose what · *"how to keep track of renovation decisions"* · (notes + item tracking)
12. **Renovating room by room vs. all at once** — how to sequence a whole-house project · *"should I renovate one room at a time"* · (multiple projects + phases)
13. **The end-of-project snag list** — defining "done" so the last 5% actually finishes · *"renovation snag list punch list"* · (task checklist + photos)
14. **Energy-efficiency upgrades worth doing** — what actually pays back vs. what's hype · *"are energy efficient home upgrades worth it"* · (budget + notes)
15. **Renovating a first home on a tight budget** — the frugal-but-not-cheap playbook · *"renovating first home on a budget"* · (budget charts + task checklist)
16. **Moving into a fixer-upper** — the first month's must-dos before the fun stuff · *"moving into a fixer upper first steps"* · (projects + checklist + photos) — ✅ `moving-into-a-fixer-upper`

If every bank topic is used and the digest failed, write a sharper/fresher take on
the highest-demand cluster (budgeting, contractor management, documentation, getting
started) from a new angle — and say in your report that the bank needs a refresh.
Never repeat an existing post's angle.

**Keeping the bank fresh (maintainer task, not the cron's):** run
`python3 tools/reddit-topics.py --windows month,year --max-seconds 1800` from a
machine that is not rate-limited, add the strongest uncovered themes here as new
entries, and rank them by demand × app-feature fit. The theme buckets the tool uses
live in `THEMES` in `tools/reddit-topics.py`; its tests run with
`npm test` (stdlib `unittest`, no dependencies).

---

## 2. Voice
, tone, and the subtle-nudge rule (this is the important part)

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
  Where a section answers a question people search, make the H2 that question and answer it in the first sentence.
- Open with the reader's real problem (often straight from a Reddit thread), not a
  dictionary definition.
- Use short lists and the occasional bold lead-in. Include at least one concrete
  worked example (numbers, a scenario, a before/after).
- **Link to at least 3 existing posts inline** using `/blog/<slug>/` — confirm each
  slug exists in `src/content/blog/`. The validator fails a post with fewer than three.
  At least one of them should be a **pillar**: `how-to-plan-a-home-renovation-step-by-step`
  (the how-do-I-start pillar), `how-to-budget-a-home-renovation` (the money pillar), or
  `home-renovation-phases` (the sequence pillar). Everything else on the blog is a spoke
  that should point up at one of those three, so authority collects somewhere instead of
  spreading evenly across 25 dead ends.
- **Then make your post reachable.** Links out are only half of it — a post nothing
  links *to* is invisible no matter how many links it contains. After writing, add a
  sentence linking to your new post from **one existing post** where it genuinely
  belongs, and commit that edit alongside the new file. `node scripts/validate-posts.mjs`
  (no arguments) reports orphans if you want to check the picture.
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
cover: "/stock/NN.webp" # next available number — see §6, never overwrite an existing file
coverAlt: "..."         # describes the photograph itself (it's read aloud); not decoration
publishDate: YYYY-MM-DD # queue row → its assigned date. Otherwise → next free date (below).
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
- **`publishDate` — one post per day, no exceptions.** If your post came from the §1a
  queue, use that row's date verbatim. Otherwise use **today's date, unless a post
  already has it** — then walk forward to the first date no post is using:
  ```
  grep -h '^publishDate:' src/content/blog/*.md | sort | tail -5
  ```
  Scheduled posts from a page set can occupy dates weeks ahead, so today is not always
  free. Two posts sharing a date breaks the blog's one-a-day rule and the validator
  will warn about it.
- `title` ≤ 70 characters and `description` ≤ 160 characters — the deploy has
  broken before on an over-length title. Count characters.
- `relatedSlugs` must be real existing slugs (run `ls src/content/blog/`), topically
  related, and should not include the new post itself.
- Never put the literal words `relatedSlugs`, `tldr`, or `faq` in the body text.
- The FAQ answers get rendered as FAQ schema — keep them factual and self-contained.

---

## 6. Cover & inline images (ComfyUI)

- Images live in `public/stock/` and are referenced as `/stock/NN.webp`. Every
  stock image is WebP since #129 (PNG photographs were ~15× larger and the cover is
  the page's LCP element). Run `ls public/stock/` and **use the next unused number**
  — never overwrite an existing image.
- Generate a **photorealistic** cover with ComfyUI:
  `comfy-gen --prompt "DESCRIPTION" --style photoreal --width 1024 --height 768 --prefix home --copy-to /tmp > /tmp/home-comfy.log 2>&1; tail -3 /tmp/home-comfy.log`
  (real homes, real renovation scenes, natural light — **no people**, no text, no
  logos, no UI screenshots, no cartoon style). The last lines print the PNG path.
- **Convert the PNG to WebP into the stock folder**, then use the `.webp` path:
  `ffmpeg -loglevel error -y -i <png path> -c:v libwebp -quality 80 public/stock/NN.webp && ls -l public/stock/NN.webp`
  Never commit the PNG. A cover over ~300 KB means the conversion did not happen.
- Reference inline images in the body as `![meaningful alt text](/stock/NN.webp)`.
  You may reuse relevant existing `/stock/*.webp` images for inline breaks if a fresh
  generation isn't warranted, but the **cover must be new** when ComfyUI works.
- **Image fallback.** If `comfy-gen` fails, retry once. If it fails again, or it has
  not returned after a couple of minutes, stop waiting: reuse the most fitting
  existing `/stock/*.webp` image as the cover (`ls public/stock/`), finish the post,
  and say in the report that the cover is a reused image.

---

## 7. Build, commit, publish — REDIRECT ALL NOISY OUTPUT TO FILES

The model context is small. `npm install` and `npm run build` print thousands of
lines; if that lands in context the run dies. **Never let build/install output
stream into the conversation.** Always redirect to a file and read only a short
tail, and only on failure.

1. Install deps only if missing, silently:
   ```
   [ -d node_modules ] || npm install --silent --no-progress > /tmp/home-install.log 2>&1 || tail -20 /tmp/home-install.log
   ```
2. Build to a log; surface only pass/fail:
   ```
   npm run build > /tmp/home-build.log 2>&1 && echo "BUILD OK" || { echo "BUILD FAILED — last lines:"; tail -30 /tmp/home-build.log; }
   ```
   The build MUST print `BUILD OK` before you push — it validates the frontmatter
   schema. If it failed, read only the tail, fix the frontmatter/markdown, rebuild.
3. **Validate the post you just wrote — this gate is not optional:**
   ```
   node scripts/validate-posts.mjs <your-slug> && echo "VALIDATE OK"
   ```
   Pass **only your own slug**, not the whole blog — older posts have known
   violations and would drown your result. The checker enforces the rules in §2, §3
   and §4 that the build cannot see: fabricated statistics, invented citations,
   unverified external URLs, hype words, too many app mentions, word count, missing
   FAQ entries, and internal links that point nowhere.

   Every `ERROR` must be fixed and the check re-run until it prints `VALIDATE OK`.
   Fix them by **cutting or rewording the offending sentence** — never by deleting the
   check. A `warn` is advice; mention it in your report and move on.

   If you genuinely cannot get it to pass after a few attempts, do NOT push a failing
   post. Say so plainly in your report and stop — an unpublished post costs nothing,
   a wrong one costs the site's credibility.
4. Commit ONLY the post, its new image, the one existing post you edited for the
   inbound link (§4), and `prompt.md` if you marked a §1c bank entry — never
   scratch/helper scripts, logs, the PNG from ComfyUI, or `.cache/`. Run `git status`
   first; if you wrote any helper files (e.g. `scrape_*.py`, `*.log`, temp scripts),
   delete them before committing. Then stage explicitly:
   `git add src/content/blog/<slug>.md src/content/blog/<linking-post>.md public/stock/NN.webp [prompt.md] && git commit -m "Blog: <title>"`
   (Avoid `git add -A`, which sweeps in stray files. `.gitignore` covers common ones,
   but stage deliberately anyway.)
5. Push to main: `git push origin main 2>&1 | tail -5` (GitHub Pages deploys from `main`).

Same discipline everywhere: pipe any command that could be verbose (`comfy-gen`,
`git log`, `npm`, long `cat`) through a file or `tail`. Read files with `head`/
`grep`, never dump a whole large file into context.

## Site-specific review checks

Run these in the review pass before `git commit`, on top of the generic checks. Each
one has failed on this site before or is enforced by the validator.

1. **`node scripts/validate-posts.mjs <slug>` prints `VALIDATE OK`** (§7 step 3),
   after your last edit, not before it.
2. **App facts match §0 word for word in meaning.** iPhone **and iPad**, never
   "iPhone-only"; no Android or web app; PDF export, iCloud sync, project sharing,
   reminders and the budget-vs-actual chart are **Pro** (one-time purchase, no
   subscription), never "free"; never the three columns "spent, committed and
   remaining".
3. **No statistic dressed as research and no named source you did not fetch this
   run** (§3). Grep the file for `%`, `study`, `survey`, `report`, `according to`.
4. **Every internal link exists:** each `/blog/<slug>/` and each `relatedSlugs`
   entry has a file in `src/content/blog/`. At least 3 inline links, at least one to
   a pillar (§4).
5. **The post is reachable:** one existing post links to it, and that edit is staged
   (§4).
6. **`publishDate` is free:** no other post uses it, and a §1a queue row keeps its
   own date (§5).
7. **The cover is a new `/stock/NN.webp`** that did not exist before this run (or a
   reused image, named as such in the report), and no image shows people (§6).
8. **Page-set rules, if the post came from §1a:** the sibling link requirements in
   §1a are met.

## 8. Final report (your last message)

Report concisely:
- The new post: title, slug, file path, primary keyword, word count, cover image.
- **Where the topic came from**, one of:
  - the §1a page-set queue: which row number, and how many rows remain unwritten;
  - the §1b live digest: how many feeds it read, the theme key and its rank under
    `UNCOVERED THEMES`, the 1–3 verbatim Reddit titles the post answers, and any
    higher-ranked theme you skipped with the one-line reason;
  - the §1c topic bank: why you fell back (exit `2`, nothing fitting, or a thin
    digest), which rank you took, and confirmation you marked it ✅ in `prompt.md`.
- Confirmation the build passed (`BUILD OK`), the validator passed (`VALIDATE OK`),
  and the push to `main` succeeded. List any `warn`s the validator printed, and any
  `ERROR` you had to fix and how you fixed it — that feedback is what improves this
  brief over time.
- Confirm you did the factual-accuracy self-check (§3): no invented statistics, no
  unfetched report names, no unverified external URLs.
- The cover: new ComfyUI image (`/stock/NN.webp`, size in KB) or a reused image (§6 fallback).
- Which existing post now links to the new one (§4).
- Anything that fell back or is worth a human glance (e.g. "topic bank is running low",
  "the digest kept surfacing a theme no post can serve").

If — and only if — there is genuinely nothing new worth publishing, reply with
exactly `[SILENT]`. Otherwise always ship a post.
