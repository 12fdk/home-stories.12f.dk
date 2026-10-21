# Home Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-21

## 1. What this is & how it's updated

- Hermes owns this file and runs every step in it. Robert reviews it and owns
  the decisions marked *Robert* in §9.
- Pipeline (Appwrite db `marketing`, app slug `home-stories`, on app.12f.dk):
  - Nightly job (`home-stories-social-content`, 05:30, shared `social-post`
    template, channel platform; spark#140): builds the next due §6 row — media
    rendered on the spark (`comfy-gen`, `motion-render`), created with
    `marketing-post` as `status=ready` at the time it picks (Hermes owns the
    schedule, marketing#97); `publish-social` publishes it then.
  - Before it picks a row, the job removes §6 plan rows whose post is published
    (`plan_prune.py`, spark#138). History lives in §8 and in Appwrite, not in §6.
  - Function `publish-social` (every 15 min) publishes to IG and FB; enforces a
    20h minimum gap between feed posts of this app.
  - Function `collect-metrics` (every 2h) writes IG/FB engagement into the post docs.
  - Function `optimize-guidelines` (monthly) — **dormant**.
- The nightly job also runs the §7 review and appends rows to §8.
- Editing rules for this file:
  - Append-only to §8: never delete or rewrite past log rows.
  - Plan changes go in §6, plus a §8 row that says why.
  - §3 and §4 change only on Robert's say-so.
  - Update the `Last updated` line on every edit.
  - Never put secrets, API keys or tokens in this file.

## 2. Product & funnel

- Product (LIVE; sources: `llms-full.txt`, `llms.txt` and the homepage, read
  2026-10-15; App Store lookup for id6754754960 the same day): **Home Stories:
  Renovation App**, a free native app for iPhone **and** iPad (iOS 17 or later)
  for planning, tracking and documenting a home renovation. On the App Store
  since 2025-11-19; version 1.9.18 released 2026-10-14. No Android version, no
  web app. No account, no sign-up, works offline, no ads. 50 languages, with
  VoiceOver and Dynamic Type. Made by Robert Jensen (12f, Denmark).
- **Free, and it stays free** (site list): unlimited projects, items, photos,
  notes and documents; a project budget and a running total; items saved with
  a price; payments logged with materials, labour and contractor kept apart;
  tasks; time tracking (Lock Screen timer, Dynamic Island on iPhone 14 Pro and
  later); Home Screen widgets for budget progress and what is next; local
  backups and full data export; share a product in from Safari, Amazon or IKEA;
  photo timeline, side-by-side before/after and a slideshow; quotes, contracts
  and receipts kept as documents; notes; project priorities (Low / Medium /
  High); search across every project.
- **Pro** — optional, one-time, no subscription, Family Sharing included. Adds
  only: the budget-vs-actual chart, task due dates and reminders, PDF export
  (a report with a cover photo), iCloud sync (off until turned on) and project
  sharing (partner, family or contractor; everyone sees the same tasks, items
  and photos). The site shows "$9.99 one-time" in the US and says the price
  varies by country — posts never quote it (§5 claim sheet).
- It is not a contractor marketplace, a CRM or a smart-home app (llms-full §2).
- Audience (site + brand record): homeowners renovating a room or a whole
  house, DIY renovators, first-time buyers with a fixer-upper, people managing
  a contractor for the first time, "we can't go over" households. The brand
  record's primary group is millennial homeowners 28–42, many doing DIY plus a
  contractor; the site and the brand record write in US dollars.
- Funnel: profile bio (IG `@homestoriesapp`) → `https://home-stories.12f.dk/`
  → App Store tap (Umami events `appstore-click` with a `surface`, and
  `download`) → App Store id6754754960
  `https://apps.apple.com/app/home-stories-renovation-app/id6754754960`
  (brand record; resolves, checked 2026-10-15).
- **There is no `/go/?src=` hop on this site yet** (`/go/` returns 404,
  2026-10-15). Instagram/Facebook traffic shows only as Umami referrers
  (`instagram.com`, `l.instagram.com`, `facebook.com`, `lm.facebook.com`); the
  funnel report says so. See §9.
- Downloads are counted in App Store Connect, not Umami.

## 3. Content rules

- Text-slide colours: background #14181c · text #fbfbf9 · accent #ffc300
  (carousel text slides; `marketing-post --colors-from` reads this line, so
  keep its format. Taken from the site's "Measured" theme in
  `tailwind.config.mjs`: drafting ink `#14181C`, paper `#FBFBF9`, the one
  signature colour "tape-measure yellow" `#FFC300`. Contrast: text on
  background ≈ 17:1, accent on background ≈ 11:1.)
- **The Home Stories look is "the site, mid-job"**: honest architectural
  interior photography of real renovations in progress, not showroom
  lifestyle shots. Every photo and clip is real-looking and generated fresh
  for that post (`comfy-gen`, LTX); never reused from an earlier post
  (Robert, spark#133).
  - Camera: straight-on and level (verticals straight, 24–35 mm, eye or
    chest height), or square top-down flat-lays on plywood, concrete or a dust
    sheet. No dutch angles, no fisheye, no drone shots.
  - Subject: the work itself — opened walls, joists, studs, pipe and cable
    runs, primer patches, masking-tape lines, dust sheets, tile and timber
    offcuts, tools mid-use. The "after" shot is the same room finished, shot
    the same way (it is a record, not a styled magazine room).
  - Light: one real source per scene, raking across surfaces so plaster,
    timber and dust show texture. Change it every post: overcast north light,
    low winter sun, a single work lamp at dusk, blue hour through a bare
    window, cold garage fluorescent, snow light.
  - Palette: raw materials (plaster pink, pine, oak, concrete grey, copper,
    brick) plus **one small tape-yellow note** (`#ffc300`-ish: a tape measure,
    a spirit level, masking tape, an extension cord). It is the brand
    signature: small, never the subject, and dropped when it fights the scene.
  - Settings rotate (§6 Look column): kitchen, bathroom, attic/loft, basement,
    hallway, nursery, box room, garage, shed, deck/garden, porch, whole-house
    exterior; old houses (1930s, 1950s, 1970s, lath and plaster) as well as
    newer ones.
  - The brand record's `comfyuiStylePreset` ("Beautiful finished home
    interior … architectural photography style, Canon EOS R5 24mm f2.8 …")
    is the base prompt for finished "after" rooms only. For mid-job scenes
    keep its camera words and replace "finished interior … clean bright
    space" with the scene.
- People: hands and forearms (gloves, a pencil, a trowel) or a figure from
  behind are fine. Never AI-generated faces.
- No phone screens and never app UI in generated images; a phone may appear
  face-down only (brand rule). Real app UI appears only as the real app
  footage in reels (§5).
- No text in generated images: no legible writing on receipts, quotes, paint
  tins, boxes or walls (pencil crosses and lines only); tape-measure numbers
  out of focus; no tool or product brands or logos (no IKEA, no Amazon boxes —
  plain cardboard only).
- Every post looks new: a different setting, light, colour mood and
  composition from the app's recent posts (`marketing-post looks --app
  home-stories`); for a reel also a different reel skin and music (§5). §6's
  Look column gives each row its own scene as a starting point.
- One product message per post.
- **Hooks**: a concrete room or project + a concrete problem (money, order,
  proof, paper), in the first 1–2 seconds / on slide 1. The five Home Stories
  hook styles:
  1. *The number* — a scenario budget and what happened to it ("Kitchen
     budget $25,000. The overrun doesn't announce itself.").
  2. *Behind the wall* — the photo you will wish you had taken ("Wall open,
     pipes showing? Photograph it before the plasterboard goes up.").
  3. *In order* — the sequence ("Electrician before plasterer, every time." is
     the site's own line).
  4. *Paper trail* — the quote, receipt, change order or paint code you
     cannot find.
  5. *The deadline* — a dated moment from the §6 calendar ("Guest bathroom
     done before Thanksgiving?").
- Banned openers: the app name; "Renovating?"; "Is your renovation…";
  "Your next renovation…"; "Dream kitchen/home"; any opener with no room and
  no specific problem; any statistic. Banned words (site voice, `prompt.md`):
  "revolutionary", "game-changer", "must-have", "ultimate", "supercharge",
  fake urgency, "download now!", exclamation-mark selling.
- Voice: "your renovation-savvy neighbor who keeps everything organized"
  (brand record) — a fellow homeowner who has been through it; practical,
  calm, a little dry; empathetic about overruns, delays and living in the
  dust; celebrates finished work. The advice must be useful even without the
  app; the app is the natural place to keep it, never a pitch.
- Post language: **English** (the brand record's tone, hashtags and CTAs are
  English). Captions follow the brand record's auto-observed data point (top
  posts ~1,000 characters): aim for 600–1,000 characters on IG.
- CTA (the app is live), verbatim from the app record's ctaOptions: "Download
  Home Stories free" on every post. Carousels may add "Save this for your next
  project". A before/after post may add "Show us your before and after"; a
  sharing or PDF post may add "Share with your contractor"; a post about a
  shared project may add "Tag someone mid-renovation". Never "Get notified",
  never "Link in bio" alone, never the bare "download".
- At most 5 hashtags per post, always including `#HomeStories`. The rest come
  from the brand list (`#HomeRenovation`, `#HomeImprovement`, `#DIYProjects`,
  `#BeforeAndAfter`, `#KitchenRenovation`, `#BathroomRenovation`,
  `#InteriorDesign`, `#HomeDesign`, `#RenovationProject`) plus at most one tag
  for the §6 calendar moment (e.g. `#Thanksgiving`, `#BlackFriday`).
  `#BeforeAndAfter` only on before/after posts.
- One video per episode.
- Use copy verbatim from the live site where possible; the §5 claim sheet
  lists what each feature may say.
- A post that breaks any rule is not published: set it back from `ready` and
  log why in §8.

## 4. Cadence

- Owner decision 2026-10-15 (spark#140), on the shared-pipeline evidence used
  for the sister apps (Buffer ~2M-post study, Hootsuite, SocialCal).
- Ramp:

  | Week of | Posts |
  |---|---|
  | Oct 19 | 2 |
  | Oct 26 | 3 |
  | From Nov 2 | steady 4/week (2 reels + 2 carousels) |
  | Dec 21 and Dec 28 | 3 each (holiday weeks) |

- Floor: never below 3/week at steady state.
- Carousels and reels are 50/50: the brand record ranks carousels first for
  this audience (checklists and budget breakdowns get saved) and reels as the
  reach driver.
- Consistency beats bursts: if a week can't be filled, spread posts out
  instead of batching.
- Posting time: the brand record's auto-observed data says the audience is
  most active on Wednesdays, ~22:00 UTC (US evening). Start from 21:00–23:00
  UTC slots, at least one post per week on a Wednesday; the §7 review may move
  this.
- Avoid FB link posts. The 20h gap allows ~8 posts/week, so 4 fits.

## 5. Format playbook

| Format | Job | Evidence | Rules |
|---|---|---|---|
| Reel (20–45 s) | Reach to non-followers | Brand record: reels are the reach driver (before/after reveals, renovation hacks) | New b-roll for the post + a new moment of the real app footage in second 0–1; reel skin and music per the rotation below |
| Carousel (8–10 slides) | Earns saves | Brand record: carousels are the highest-engagement format; checklists, budget breakdowns and room-by-room orders are the saveable ones | Slide 1 = concrete room + concrete problem; photo slides alternate with text slides; last slide = CTA. Max 10 slides (platform cap) |
| Stories | Polls on design choices, progress updates | Brand record wants them daily | Pipeline is feed-only today — decision in §9 |
| Static image | Milestone announcements only | Brand record | Not in the steady mix |

**Series** (the §6 Series column; each row belongs to one):

| Series | What it is | Feature it sells |
|---|---|---|
| Running Total | A scenario budget for one room, and where the money went | Running total, payments split by materials / labour / contractor, items with a price, time tracking |
| Behind the Wall | The thing you photograph once, before it is covered for good | Dated photo timeline (proof for insurance, resale, the next trade) |
| In Order | The sequence of one job, as a checklist | Tasks per phase |
| Paper Trail | The quote, receipt, change order or paint code you need later | Documents, notes, PDF export (Pro), project sharing (Pro) |
| Before/After | One room, same angle, start and finish | Side-by-side before/after, photo timeline, slideshow |
| Price Tag | Something you buy, with its price and shop, on the project | Items, share a product in from Safari / Amazon / IKEA |
| Spreadsheet vs | The site's honest spreadsheet comparison | The whole app vs a spreadsheet |
| Season | A dated moment from the §6 calendar | Tasks / budget first |

**Reels — skins.** Reels are built with the Remotion `Reel` template
(`/workspace/motion`, spec `reels/<slug>.json`) in the Home Stories type: the
brand display face `font: {"file": "assets/home-stories/brand/Archivo-var.woff2",
"family": "Archivo", …}` and the end card image
`assets/home-stories/brand/app-icon.png`. Three skins, all from the site's
own theme colours, rotated so no two reels in a row share one (§6 column):

| Skin | Spec | Feel |
|---|---|---|
| Tape | `look: bold`, `accent: #ffc300`, `ink: #14181c`, `bg: #14181c`; Archivo weight 800, upper case | Ink-dark headlines in tape-yellow bars — loud, for numbers and lists |
| Blueprint | `look: clean`, `accent: #4c93ff`, `ink: #fbfbf9`, `bg: #14181c`; Archivo weight 700 | Paper-white type over a dark scrim, blueprint-blue CTA line — calm, for proof and paperwork |
| Level | `look: clean`, `accent: #3fbf8f`, `ink: #fbfbf9`, `bg: #14181c`; Archivo weight 600 | Same, spirit-level green accent — for before/after and finished work |

(`#4c93ff` and `#3fbf8f` are the site's dark-mode primary and secondary;
both read on `#14181c` at ≥ 5.9:1.) Never use the `editorial` serif look for
this app: the brand type is a grotesque.

**Reels — real app footage.** `/workspace/motion/assets/home-stories/` holds
six real screen recordings of the app (committed, 30 fps):
`footage-budget.mp4`, `footage-tasks.mp4`, `footage-photos.mp4`,
`footage-items.mp4`, `footage-notes.mp4`, `footage-projects.mp4`. Use the
take that matches the row's feature (Running Total → budget; In Order →
tasks; Behind the Wall / Before/After → photos; Price Tag → items; Paper
Trail → notes; several projects / priorities → projects), a different moment
from recent reels, cut around the new b-roll. Text on screen must not claim
more than the footage shows. The `library/roll-*.jpg` stills and older reel
assets are not reused (fresh-shoot rule).

**Reels — music.** One bed per reel from `music.mjs` (ids 0–5 = c-major,
a-major, g-min, e-min, d-major, c-min). Home Stories has its own fixed order —
v3 e-min, v0 c-major, v5 c-min, v1 a-major, v4 d-major, v2 g-min — so no
variant repeats within 6 consecutive reels. Direction: steady and workmanlike,
no drops or risers; keep clip sound (`clips`) low, with tool and room sound
(a tape measure snapping back, a trowel, footsteps on boards) as texture
where the LTX clip has it.

Brand-record pillar split: renovation tips and checklists 30%,
before/during/after transformations 25%, budget and cost tracking 20%, app
features in action 15%, seasonal and trending projects 10%. The §6 plan
follows it roughly (Running Total + Price Tag ≈ budget, In Order ≈ tips,
Before/After + Behind the Wall ≈ transformations, Season ≈ seasonal).

Baseline: **not read** at creation. The look ledger for `home-stories` is
empty (`marketing-post looks`, 2026-10-15) and the platform's post history
was not reachable from the Mac (see §9). The first §7 reviews set the
baseline.

### Claim sheet — what each §6 feature may say (added 2026-10-15)

Verbatim from the live site (homepage, `llms.txt` and `llms-full.txt`, read
2026-10-15) and the App Store description. Use these lines, not paraphrased
numbers or promises. If a line here and the site disagree, the site wins.

| §6 feature | Verbatim line(s) |
|---|---|
| Running total | "Home Stories keeps a running total on one screen, with tasks in order and dated photos of what happened." · "A running total sits on the project from the first day, with materials, labour and contractor kept apart." · "Every item you save adds its price to the project total" |
| Payments split | "Log payments and keep materials, labour and contractor costs apart." · "A running total as you log payments, split by materials, labour and contractor." |
| Budget vs actual (Pro) | "Budget vs. actual cost chart, so you see the overrun coming (Pro)" · "The budget-vs-actual chart is part of Pro." |
| Budget first | "Name the project, put a number on it, and give it a deadline. That number is what everything else is measured against." |
| Currency | "Works in your own currency" |
| Tasks per phase | "Group the work into tasks and items per phase, and mark them off. Electrician before plasterer, every time." · "Break the job into tasks, then add the materials, fixtures, and quotes each one needs. Estimates now, receipts later." |
| Reminders (Pro) | "Due dates and reminders (Pro)" |
| Time tracking / widgets | "Log hours against a project and see where the days went, next to the running total." · "Home Screen widgets for budget progress and what is next, and a Lock Screen timer while you track time." |
| Photo timeline | "Dated photos pinned to the project build a timeline you can scroll — before, during, and behind the wall." · "Every photo is dated and pinned to the project." |
| Before/after | "A photo timeline for the whole project" · "Side-by-side before and after comparison" · "Slideshow to show people what changed" |
| Insurance proof | "And six months later, when the insurer asks what was behind that wall, nobody has a photo of it." (the problem line; the app answer is the photo timeline) |
| Items / Price Tag | "Spot a sink in the store: snap it, add the price, the shop and a note" · "Save purchases with a price and the shop, organised by phase, so each one adds to the running total." |
| Share a product in | "Share a product straight from Safari, Amazon or IKEA into a project" |
| Documents / notes | "Keep quotes, contracts and receipts as documents" · "Notes for everything else - the carpenter's number, the paint code" · "Keep contracts, receipts, and tagged notes with photos attached to the project they belong to — not in a drawer." |
| PDF export (Pro) | "Hand over a PDF" · "Pro turns the project into a PDF: budget, tasks, photos and notes, or just the parts you need. Send it to the contractor, the insurer, or the folder you'll want next year." |
| Project sharing (Pro) | "Invite a partner, a family member or your contractor" · "Everyone sees the same tasks, items and photos, kept in step through iCloud" · "Sharing and iCloud sync are part of Pro." |
| iPhone + iPad (sync, Pro) | "Start a project on iPhone, carry on planning it on iPad" (with iCloud sync, Pro) · "Built for iPhone and iPad, works fully offline" |
| Several projects | "Can I manage more than one renovation? Yes. Projects are unlimited on the free app." · "Flag each project Low, Medium, or High and sort your list" |
| Spreadsheet vs | "Why not just a spreadsheet? It works — until about week three." · "Emailing budget_v7_final_FINAL.xlsx" · "A shoebox and good intentions" · "A deleted formula fails silently" |
| Price / account | "Free to run the whole job" · "The core is free, forever." · "one-time — no subscription" · "No account and no sign-up" · "Works offline". Never quote the Pro price in a post (it varies by country). |
| Free downloads (site) | "Free downloads — budget template and phase checklist, no signup" at home-stories.12f.dk/downloads (a fact for captions; not a CTA) |

Never claim: PDF export, iCloud sync, project sharing, reminders or the
budget-vs-actual chart as free; that the app is iPhone-only (it is iPhone and
iPad); an Android or web app; AI features, receipt scanning or reading
amounts from photos; bank or card import; a cloud account; finding, rating
or booking contractors; "spent, committed and remaining" columns (`prompt.md`
rule); any user count, rating, review count or statistic — including the
site's "15–30%" overrun band, the "5.0" rating and the brand record's
targetAudience percentages; that the app guarantees a renovation stays on
budget. Building, permit and insurance advice stays general ("check with
your local authority / insurer") — never a legal or cost promise.

## 6. Content plan (week of Oct 19, 2026 – week of Feb 22, 2027)

### Calendar hooks — the moments this plan piggybacks on (added 2026-10-15)

A renovation app wins at the moment people decide, budget or rush a job:
before a hosting deadline, during a tool sale, in January when the year's
project gets a number, and in February before the spring season. Post ~1–3
weeks before the moment ("Post by"). The hook names the room AND a concrete
problem — "Thanksgiving is coming!" alone is a banned generic opener (§3). The
moment also gives the post its look (light, weather, palette), which keeps
every post new. The app sells nothing: a sale moment is an angle for "put the
price on the project", never a deal claim.

| Moment | Date | Post by | Angle | §6 rows |
|---|---|---|---|---|
| **Fall interior before the holidays** | Sept–Oct (brand record) | now | finish the guest room, bathroom or paint before guests | Oct 19 #1, Nov 16 #2 |
| **Fall maintenance / first frost** | varies by region (pattern, not dated) | early Nov | the house checks before cold weather | Oct 26 #3 |
| **US Thanksgiving hosting** | Thu Nov 26, 2026 | Nov 19 | the guest bath and guest room deadline, the overrun before guests | Oct 19 #1, Nov 9 #1, Nov 23 #2 |
| **Black Friday / Cyber Monday** | Fri Nov 27 and Mon Nov 30, 2026 | Nov 27 | tool and material buys: price on the project, receipt with the project | Nov 9 #2, Nov 23 #1, #3, Nov 30 #1 |
| **Christmas hosting** | Fri Dec 25, 2026 | Dec 14 | the half-done kitchen, what must work by Dec 24, "what did it cost?" | Nov 16 #2, Nov 30 #2, Dec 21 #1 |
| **Trades' holiday break** | late Dec – early Jan (pattern, varies by firm; not verified) | Dec 11 | finish, order and photograph before the site goes quiet | Dec 7 #4 |
| **Year in review** | Dec 21 – Jan 3 | Dec 31 | the year's timeline, the before/after slideshow | Dec 14 #4, Dec 21 #2 |
| **January planning / New Year projects** | all of January (brand record: New Year renovation resolutions) | Jan 15 | put a number on the 2027 project, one project per job, quotes side by side | Dec 21 #3, Dec 28 #1–#3, Jan 4 #1–#4 |
| **Winter cold snaps / burst pipes** | Jan – Feb in cold regions (pattern, not dated) | Jan 10 | photos and documents ready before an insurance claim | Dec 7 #3, Dec 14 #2 |
| **US Presidents' Day sales** | Mon Feb 15, 2027 | Feb 12 | appliance buys: price, shop, receipt on the project (sales are a retail pattern, not verified) | Feb 8 #4 |
| **Spring renovation season** | Mar – May (brand record: the biggest kickoff period) | from Feb 1 | quotes in February, the phases, windows, selling in spring | Feb 1 #2, Feb 8 #3, Feb 15 #3, #4 |
| **Outdoor projects** | Jun – Jul (brand record: deck, patio) | budget in Feb | deck and patio budgets while it is cold | Feb 8 #1, Feb 22 #4 |

Dates: Thanksgiving (4th Thursday of November), Black Friday, Cyber Monday
and Presidents' Day (3rd Monday of February) computed from fixed rules and
checked against the calendar 2026-10-15. Seasons and peaks come from the
brand record. Not verified (marked above): first-frost timing, the trades'
holiday break, Presidents' Day sales. Hooks never state an unverified date
or any statistic.

### The plan

| Week of | # | Format | Series | Feature / message | Hook (first 1–2 s) | Reel skin · music | Look / scene (start point; must differ from recent looks) | Status |
|---|---|---|---|---|---|---|---|---|
| Oct 19 | 1 | Carousel | In Order | Tasks per phase | "Guest bathroom done before Thanksgiving? The order the trades need." | — | 1950s bathroom stripped to the studs, tiles stacked by the door, overcast north-window light, cool greys | built 2026-10-15 6ad0ae0918e5f5564886 |
| Oct 26 | 3 | Carousel | Season | Tasks (maintenance checklist) | "First frost is weeks away: the house checks to do before it." | — | gutter and eaves with wet autumn leaves, grey drizzle, a ladder foot on brick paving | built 2026-10-21 6ad83caa21351d832401 |
| Nov 2 | 1 | Reel | Before/After | Side-by-side before/after | "1970s hallway carpet up, oak boards down: before and after, side by side." | Level · v5 c-min | narrow hallway, carpet pulled back over gripper rods, then oak boards; cool daylight through front-door glass | queued |
| Nov 2 | 2 | Carousel | Running Total | Payments: materials, labour, contractor | "Bathroom refresh: where the money went. Materials, labour, contractor." | — | flat-lay on a dust sheet: grout bags, a notched trowel, spacers, blue-grey morning light | queued |
| Nov 2 | 3 | Reel | Price Tag | Share a product in from Safari | "Found the sink online at midnight? Save it to the bathroom project, price included." | Tape · v1 a-major | boxed basin on a hallway floor under a single work lamp, tungsten amber, deep shadows | queued |
| Nov 2 | 4 | Carousel | In Order | Tasks per phase | "Attic conversion: what has to happen before the insulation goes in." | — | bare attic rafters, a skylight shaft of light with dust in the air, pale pine | queued |
| Nov 9 | 1 | Reel | Running Total | Running total | "Thanksgiving guests in under three weeks and the bathroom is $900 over. Where did it go?" | Blueprint · v4 d-major | half-fitted vanity, new tap still wrapped, warm wall-light glow at dusk | queued |
| Nov 9 | 2 | Carousel | Price Tag | Items with a price and the shop | "Black Friday tool deals: put the price on the project before it goes in the cart." | — | garage pegboard with unbranded hand tools, cold fluorescent light, concrete floor | queued |
| Nov 9 | 3 | Reel | Paper Trail | Quotes, contracts, notes | "Change order on the kitchen. Where is the original quote?" | Level · v2 g-min | kitchen worktop with papers (no legible text) and a pencil, rain on the window, grey-blue | queued |
| Nov 9 | 4 | Carousel | Spreadsheet vs | Why not a spreadsheet (site comparison) | "Kitchen renovation, week three: budget_v7_final_FINAL.xlsx." | — | kitchen table at night: folded printouts (no legible text), mug, a closed laptop, low tungsten lamp | queued |
| Nov 16 | 1 | Reel | Behind the Wall | Photo timeline | "Living-room floorboards up: shoot the joists before they disappear again." | Tape · v3 e-min | lifted floorboards, joists and cable runs, soft overcast light, pale wood, top-down | queued |
| Nov 16 | 2 | Carousel | In Order | Tasks per phase | "Painting the living room before the holidays: the order that saves a second coat." | — | room taped and draped, fresh white primer, yellow masking-tape lines, flat white daylight | queued |
| Nov 16 | 3 | Reel | Running Total | Time tracking + widgets | "Weekend deck rebuild: how many hours did it really take?" | Blueprint · v0 c-major | backyard deck half-laid, frost on the boards, low cold sun, a figure from behind kneeling | queued |
| Nov 16 | 4 | Carousel | Running Total | Items with a price + running total | "Nursery before the baby arrives: the budget, item by item." | — | nursery with one wall half-painted sage, flat-packed cot box, soft pastel morning light | queued |
| Nov 23 | 1 | Reel | Price Tag | Items add to the running total | "Black Friday: three tools in the cart. Each one belongs to a project total." | Level · v5 c-min | workbench with new tools in plain boxes, overhead garage strip light, sawdust | queued |
| Nov 23 | 2 | Carousel | Before/After | Photo timeline + slideshow | "Guest room finished in time for Thanksgiving: the photo timeline, start to handover." | — | guest room finished, linen bedding, warm lamp at dusk, a bare autumn branch in a jug | queued |
| Nov 23 | 3 | Carousel | Paper Trail | Receipts kept as documents | "Bought tiles on Black Friday? Keep the receipt with the project, not in a drawer." | — | tile samples and a folded receipt (no legible text) on an oak console, side light | queued |
| Nov 23 | 4 | Reel | In Order | Tasks per phase | "Bathroom gutted, plumber on Tuesday, tiler on Friday. Who goes first?" | Tape · v1 a-major | gutted bathroom with plumbing rough-in, work lamp mixed with cold daylight | queued |
| Nov 30 | 1 | Reel | Running Total | Running total | "Cyber Monday flooring order: will the hallway still come in on budget?" | Blueprint · v4 d-major | stacked flooring boxes (plain) in an empty hallway, winter-blue daylight | queued |
| Nov 30 | 2 | Carousel | Season | Tasks (deadline list) | "Hosting Christmas with the kitchen half done: what has to work by Dec 24." | — | kitchen with a temporary plywood worktop, string lights, warm tungsten evening | queued |
| Nov 30 | 3 | Reel | Paper Trail | PDF export (Pro) | "The contractor wants the plan by Monday. Hand over a PDF." | Level · v2 g-min | porch with a toolbox and work boots, frosty morning, cool steel tones | queued |
| Nov 30 | 4 | Carousel | Before/After | Photo timeline | "Damp, bare basement to den: the timeline in photos." | — | basement concrete walls with a dehumidifier and one bare bulb, then a finished den | queued |
| Dec 7 | 1 | Reel | Running Total | Several projects + priorities | "Kitchen, bathroom, garden fence: three projects, sorted by priority." | Tape · v3 e-min | house exterior at blue hour, scaffold on one side, two windows lit | queued |
| Dec 7 | 2 | Carousel | Running Total | Payments split | "Bathroom budget $8,000: materials, labour and contractor, kept apart." | — | overhead flat-lay of plumbing fittings on raw concrete, hard top light | queued |
| Dec 7 | 3 | Reel | Behind the Wall | Photo timeline (insurance) | "Opening the chimney breast? Photograph it now, before the insurer asks." | Blueprint · v0 c-major | exposed brick chimney breast with soot, warm work-lamp light, brick-red | queued |
| Dec 7 | 4 | Carousel | Season | Tasks + photos before a break | "Trades off over the holidays? What to finish, order and photograph before they go." | — | quiet site, tools packed in crates, a wreath on the front door, overcast | queued |
| Dec 14 | 1 | Reel | Before/After | Side-by-side before/after | "Reading corner, bare plaster to deep green: before and after, side by side." | Level · v5 c-min | reading nook by a window, winter window light, bare plaster then bottle-green wall | queued |
| Dec 14 | 2 | Carousel | Paper Trail | Photos + documents for insurance | "A pipe bursts in January: what the insurer will want from your renovation." | — | under-sink cabinet with new pipework, cold blue light, droplets | queued |
| Dec 14 | 3 | Reel | Price Tag | Notes (the paint code) | "The paint code for the hallway. Where did you write it down?" | Tape · v1 a-major | open paint tin (no label) with a brush across the lid, muted terracotta, raking light | queued |
| Dec 14 | 4 | Carousel | Before/After | Photo timeline | "A year of the kitchen renovation, in 10 photos from the timeline." | — | finished kitchen on a dark winter morning, under-cabinet light, steam from a kettle | queued |
| Dec 21 | 1 | Carousel | Running Total | Running total | "The kitchen is done and someone asks what it cost. One number." | — | kitchen at night set for dinner (no people), candles and warm tungsten | queued |
| Dec 21 | 2 | Reel | Before/After | Slideshow | "Restored the garden shed this year? Show the before and after as a slideshow." | Blueprint · v4 d-major | restored timber shed in light snow, paraffin-lamp glow in the window | queued |
| Dec 21 | 3 | Carousel | Running Total | Budget first | "Kitchen planned for 2027? Put a number on it before the first quote." | — | flat-lay of a blank sketch plan (lines only), pencil, yellow tape measure, white winter daylight | queued |
| Dec 28 | 1 | Reel | Running Total | Several projects | "The 2027 list: bathroom, attic, fence. Start each one as a project." | Level · v2 g-min | empty attic under a snow-covered skylight, blue-white light | queued |
| Dec 28 | 2 | Carousel | In Order | Tasks per phase | "Kitchen renovation in 8 phases, from design to handover." | — | sample board on a table: oak, stone, brass, slate swatches, soft side light | queued |
| Dec 28 | 3 | Carousel | Running Total | Running total + contingency | "Set the kitchen contingency before work starts. Then watch it." | — | concrete-grey utility room, morning light, a paint roller tray on the floor | queued |
| Jan 4 | 1 | Reel | Running Total | Running total + payments | "New year, new bathroom: a $12,000 budget, every payment logged against it." | Tape · v3 e-min | bathroom samples on a bare screed floor, pale January sun | queued |
| Jan 4 | 2 | Carousel | In Order | Tasks per phase | "Just bought a fixer-upper? The first month, in order." | — | empty 1930s house, bare rooms, a moving box, low January sun on old floorboards | queued |
| Jan 4 | 3 | Reel | Paper Trail | Quotes kept as documents | "Three quotes for the loft conversion. Keep them on the project, side by side." | Blueprint · v0 c-major | loft with exposed roof timbers, grey snow light from the roof window | queued |
| Jan 4 | 4 | Carousel | In Order | Tasks (DIY or hire) | "Tile the bathroom yourself or hire it out? Decide in five minutes." | — | tile tools on cardboard: trowel, spacers, cutter, top-down, neutral daylight | queued |
| Jan 11 | 1 | Reel | Behind the Wall | Photo timeline | "Rewiring the house: photograph every wall before it is closed." | Level · v5 c-min | chased plaster walls with cable in the channels, work-lamp shadows, grey | queued |
| Jan 11 | 2 | Carousel | In Order | Tasks (permit checklist) | "Taking out a kitchen wall? Check these before anyone swings a hammer." | — | wall with pencil crosses marking an opening (no writing), dust sheet, daylight | queued |
| Jan 11 | 3 | Reel | Running Total | Time tracking | "Saturday in the garage: where did the eight hours go?" | Tape · v1 a-major | garage workbench with a half-built shelf unit, frosted window, sawdust | queued |
| Jan 11 | 4 | Carousel | Spreadsheet vs | Why not a spreadsheet | "Why the renovation spreadsheet breaks around week three." | — | dining table at dawn with folded printouts and a pencil, cold light | queued |
| Jan 18 | 1 | Reel | Price Tag | Items: price, shop, note | "Tiles you like in the shop? Snap them, add the price, the shop and a note." | Blueprint · v4 d-major | tile-shop sample wall (no signage), cool fluorescent, a gloved hand holding one tile | queued |
| Jan 18 | 2 | Carousel | Running Total | Running total (hidden costs) | "1930s house, lath and plaster: the surprises to budget for." | — | lath-and-plaster wall opened up, horsehair plaster crumbs, dusty warm light | queued |
| Jan 18 | 3 | Reel | Before/After | Side-by-side before/after | "Box room to home office: before and after, side by side." | Level · v2 g-min | small box room with a desk lamp, then birch shelving at blue hour | queued |
| Jan 18 | 4 | Carousel | In Order | Tasks per phase | "Bathroom renovation order: the sequence that saves time and money." | — | bathroom walls in grey-blue waterproofing membrane, bright daylight | queued |
| Jan 25 | 1 | Reel | Running Total | Running total (52% of budget) | "Kitchen at 52% of the budget. Is that on track?" | Tape · v3 e-min | new kitchen doors leaning on a wall before hanging, midday light, ink-dark cabinets | queued |
| Jan 25 | 2 | Carousel | In Order | Tasks (living through it) | "Living at home during the kitchen work: what to set up first." | — | temporary kitchen on a folding table in a dining room, dust-sheet doorway, warm | queued |
| Jan 25 | 3 | Reel | Running Total | iPhone + iPad (iCloud sync, Pro) | "Attic plan on the iPad downstairs, on the iPhone up the ladder." | Blueprint · v0 c-major | attic hatch with a ladder, figure from behind climbing, skylight beam | queued |
| Jan 25 | 4 | Carousel | Running Total | Running total by phase | "Basement conversion: what the money goes on, phase by phase." | — | basement stud framing under LED work lights, cool white | queued |
| Feb 1 | 1 | Reel | Paper Trail | Project sharing (Pro) | "Partner at work, tiler on site: everyone sees the same task list." | Level · v5 c-min | bathroom tiling in progress, grout float resting on a bucket, morning light | queued |
| Feb 1 | 2 | Carousel | Season | Tasks (spring kickoff) | "Renovating in April? Get the quotes in February." | — | brick house front in late-winter frost, bare climbing rose, clear sky | queued |
| Feb 1 | 3 | Reel | Behind the Wall | Photo timeline | "Bathroom floor up: photograph the waterproofing before the tiles cover it." | Tape · v1 a-major | floor membrane around a drain, top-down, cool tones | queued |
| Feb 1 | 4 | Carousel | Before/After | Photo timeline | "Small bathroom, same footprint: before, during, after." | — | tiny bathroom, then terrazzo floor and a wall-hung basin, soft daylight | queued |
| Feb 8 | 1 | Reel | Running Total | Budget first | "Deck rebuild planned for May: the budget starts now." | Blueprint · v4 d-major | old weathered deck under light snow, grey sky, top-down | queued |
| Feb 8 | 2 | Carousel | Price Tag | Share in from Safari, Amazon or IKEA | "Kitchen bits from three websites and the hardware store: one list, one total." | — | plain cardboard flat-packs in an empty kitchen, daylight | queued |
| Feb 8 | 3 | Reel | In Order | Tasks per phase | "Windows replaced in March? What to do the week before the fitters come." | Level · v2 g-min | old sash windows with condensation, cold morning light | queued |
| Feb 8 | 4 | Carousel | Paper Trail | Receipts + items | "Presidents' Day appliance sale: log the price, the shop and keep the receipt." | — | new appliance in plain packaging in a hallway, cool daylight | queued |
| Feb 15 | 1 | Reel | Before/After | Side-by-side before/after | "Garden shed to home gym: before and after, side by side." | Tape · v3 e-min | shed interior, rubber floor tiles, low late-winter sun | queued |
| Feb 15 | 2 | Carousel | Running Total | Running total + contingency | "Halfway through the kitchen and the contingency is gone. Now what?" | — | kitchen subfloor with a rotten joist exposed, hard work light | queued |
| Feb 15 | 3 | Reel | Paper Trail | PDF export (Pro) | "Selling the house this spring? Hand the buyer a PDF of the renovation." | Blueprint · v0 c-major | renovated front door and porch, potted bulbs, early-spring morning | queued |
| Feb 15 | 4 | Carousel | In Order | Tasks per phase | "Spring renovation: the 6 phases you can't skip." | — | brick house with scaffolding against a clear blue late-February sky | queued |
| Feb 22 | 1 | Reel | Price Tag | Items with a price | "Bathroom fittings from five shops: every one on one list, with its price." | Level · v5 c-min | boxed taps and a shower head on a bare floor, spring light | queued |
| Feb 22 | 2 | Carousel | In Order | Tasks (timeline) | "How long a kitchen renovation takes, phase by phase." | — | kitchen during first-fix, open ceiling, cables hanging, neutral light | queued |
| Feb 22 | 3 | Reel | Running Total | Running total | "Loft conversion, month two: is it still on budget?" | Tape · v1 a-major | new dormer timber frame with sky behind, clear morning light | queued |
| Feb 22 | 4 | Carousel | Season | Budget first (outdoor) | "Patio for the summer: set the budget while it's still cold." | — | frosty garden, stacked paving slabs, pale low sun | queued |

Plan totals (by week-of month): 71 posts — Oct 5, Nov 20, Dec 14, Jan 16,
Feb 16. Reels 34, carousels 37. All `queued`.

- Reel skin · music: skins rotate Tape → Blueprint → Level; music follows the
  Home Stories order v3, v0, v5, v1, v4, v2 (§5), so no variant repeats within
  6 consecutive reels. If a row is swapped or skipped, keep both orders and
  check the last 6 reels in `marketing-post looks`.
- Every post ends with "Download Home Stories free"; carousels may add "Save
  this for your next project" (§3 lists the other allowed CTAs).
- The Look column is a starting point, not a script: the nightly job still
  checks `marketing-post looks` and changes anything that repeats a recent
  post. Hooks may be tightened; the room + problem must stay. Reels open on a
  new moment of the matching real app footage (§5), cut around the new b-roll.
- Numbers in hooks ($25,000, $8,000, $12,000, $900 over, 52%, eight hours)
  are the scenario, not a statistic; never present them as facts about users
  or prices. "$25,000" and "52% of budget" are the site's own example project.
- Hooks name dates only when the date is in the calendar hooks table and is
  verified there.
- Pro features (PDF export, sharing, iCloud sync, reminders, the
  budget-vs-actual chart) are labelled "(Pro)" or "with Pro" in the caption
  every time.
- The nightly job may swap a row only per a §7 verdict, and must log the swap
  in §8.
- **Status** (spark#136): `queued` → `built <date> <postId>` (created,
  scheduled) → `posted <date> <postId>`. The nightly job builds the first
  `queued` row whose week starts within 7 days, one row per night, and writes
  its status here. Rows leave this table once their post is published
  (spark#138).
- Extend the plan by ~4 weeks when fewer than 4 weeks of `queued` rows remain
  (next: March 2027 — the spring renovation season peak, Easter weekend
  projects, outdoor deck/patio builds), using the calendar hooks table; log it
  in §8.

## 7. 7-day review procedure

1. Every Monday, select posts with `status=published` published 7–13 days ago
   that do not yet have a §8 learnings-log row (Appwrite db `marketing`, posts
   collection, `appSlug=home-stories`). The 1-day grace covers posts
   published on other weekdays.
2. For each post, read the metrics `collect-metrics` wrote into the post doc:
   reach, likes, comments, saves, shares (IG and FB). Note the doc's
   last-collected time.
3. Read Umami (site `home-stories.12f.dk`) for the 7 days after publish:
   referrers `instagram.com` / `l.instagram.com` and `facebook.com` /
   `lm.facebook.com`, plus the `appstore-click` and `download` events. There
   is no `src` tag yet (§2), so record these as funnel context only; they are
   not tied to a single post.
4. Compute **reach = IG reach + FB reach** and
   **eng = likes + comments + saves + shares** (summed across both platforms).
5. Verdict:
   - **PASS**: reach ≥ 5, or saves ≥ 1, or shares ≥ 1.
   - **FAIL**: reach ≤ 1 and eng = 0.
   - **HOLD**: anything else.
   - **NO-DATA**: metrics missing, or last-collected time > 24h old. Rerun
     next week; do not judge the post.
6. Actions:
   - PASS: keep the series + format; add one more post of that series (new
     room, new look) to §6 within 2 weeks.
   - HOLD: no change.
   - FAIL: rewrite the next planned §6 row of the same series and format
     with a sharper room + problem hook (style 1–5 in §3).
   - Rotate out: a series+format combo that FAILs 2 reviews in a row is
     replaced in next week's plan by the best PASS combo.
   - Saves are the carousel signal; reach is the reel signal. Weigh them so
     when comparing formats.
   - The §4 cadence floor always holds.
7. Re-baseline: when the median reach of the last 8 reviewed posts is ≥ 20,
   propose new thresholds in §9 for Robert. Do not change them without his
   approval.
8. Append one row per post to §8, using this template:

   ```
   | YYYY-MM-DD | <post id> "<hook>" (<format>, <series>) | IG r/l/c/s/sh · FB r/l/c/s/sh · Umami 7d ig/fb referrals, store taps | PASS/HOLD/FAIL/NO-DATA | <change made, or "none"> |
   ```

## 8. Learnings log

Append-only. Newest at bottom. Never edit or delete rows.

| Date | Post | Numbers | Verdict | Change |
|---|---|---|---|---|
| 2026-10-15 | CREATED: this file (spark#140) | no baseline: look ledger empty, platform history not read | — | §1–§9 written; §6 = 71 queued rows, week of Oct 19, 2026 – week of Feb 22, 2027 (34 reels, 37 carousels). First §7 review due the Monday after the first post is 7 days old. |
| 2026-10-15 | 6ad0ae0918e5f5564886 "Guest bathroom done before Thanksgiving? The order the trades need." (carousel, In Order) | built and scheduled 2026-10-21T22:00:00Z; 9 slides (2 fresh photos + 7 text); Gate 1 pass; Claude design task 20261015-1226 + review PASS round 1 | built | First post of the new plan. Angle = sequence, not budget (every backfilled 2026-08 post is a budget/scope angle). Photo A needed 5 re-renders: Flux kept adding a toilet/sink and a legible "0" on an outlet plate; final take is an empty stud-walled room. Funnel 7d flat (0 landings, 1 store tap) — post kept product-focused. |
| 2026-10-16 | 6ad1ad4e342b4b90aa3c "Kitchen wall open, pipes showing? Photograph it before the plasterboard goes up." (reel, Behind the Wall) | built and scheduled 2026-10-21T22:00:00Z; 20 s five-scene cut (real photo-timeline footage grid + week view, 2 fresh LTX clips); Tape skin, Archivo 800, music v3 e-min, clips low; TPK -1.5 dBTP / -14.6 LUFS; Gate 1 pass; Claude design 20261016-0611 + review PASS round 1. Angle = proof/insurance, product-focused (funnel 7d flat: 0 social landings, 1 store tap). Note: 6ad0ae09 (Oct 19 #1 built) is gone from Appwrite (404) — superseded by published 6ad0e248, so no slot clash. Fresh-shoot rule held (new stills/clips, different light/mood); no --allow-similar. |
| 2026-10-19 | 6ad59a2011add2b1e1f0 "Kitchen budget $25,000. The overrun doesn't announce itself." (reel, Running Total) | built and scheduled 2026-10-28T22:00:00Z; 20.5 s four-scene cut (real budget footage t=9.5 s budget screen + t=4.0 s item entry → overview, non-overlapping windows; 2 fresh LTX clips from stills hs-social-20261019-s1/s2); Blueprint skin Archivo 700, music v0 c-major (§5 order, reel #2); machine checks PASS (-14 LUFS, -1.4 dBTP, hook at 0.0 s, accent #4c93ff measured, one CTA); Gate 1 pass; Claude design 20261019-0542 + review PASS round 2 (round 1 FAIL: marketing.md pending, fixed). Funnel 7d flat (0 social landings, 0 store taps) — post kept product-focused on the real budget screen. | built | Fresh look: 1980s semi-detached kitchen mid-install, honey birch-ply carcasses, low late-afternoon pale-gold sun (differs from recent morning terracotta / cool-grey overcast / bright daylight). Scene-3 on-screen text shortened to ≤6 words ("Mark it. Log it." + sub "Keep it apart."); materials/labour/contractor sub dropped from the footage scene (footage splits by status, not cost type — kept in captions verbatim). |
| 2026-10-20 | 6ad6e740c5fd326abca7 "Three quotes for one bathroom, and no two cover the same work." (carousel, Paper Trail) | built and scheduled 2026-10-28T22:00:00Z (Wednesday, the app's best slot); 9 slides (7 fresh garage photos + 2 text, bar layout); look: garage, cold fluorescent (green-white), teal-grey; Gate 1 pass; Claude design 20261020-0536 + review PASS round 2 (round 1 FAIL: §6/§8 pending by pipeline order, slide-9 body cut to 2 sentences, stray period removed). Funnel 7d flat (0 social landings, 0 store taps, 25 pageviews / 15 visitors) — kept product-focused on the free documents feature. | built | Tape-measure photo slide re-shot twice (Flux drew legible tape numbers and a STANLEY logo) and swapped for a blank yellow sticky-note flat-lay; hook slide re-shot once (one sheet instead of three, warm light). Oct 28 slot: the design's Oct 28 conflict was stale — the Oct 26 #1 reel was published 2026-10-19T16:46Z and the live schedule showed no upcoming posts, so the Wednesday slot was taken. |
| 2026-10-21 | 6ad83caa21351d832401 "Wet leaves in the gutters, grey drizzle, and the cold months on the way." (carousel, Season) | built and scheduled 2026-10-28T22:00:00Z (Wednesday, the app's best slot; inside the Oct 26 row week); 9 slides (7 fresh autumn walk-round photos + 2 text, centered layout); look: 1960s brick exterior, wet russet/ochre leaves and moss, fine drizzle, pale low sun-break, pewter sky, warm russet/moss mood; Gate 1 round 1 pass; Claude design 20261021-0540 + review PASS round 2 (round 1 FAIL: post + marketing.md pending by pipeline order; prune of the published Oct 26 #2 row flagged — verified 6ad6e740 published, publishedAt 2026-10-20T04:02Z, both platforms published, so no slot clash). Funnel 7d flat (0 social landings, 0 store taps; 27 pageviews / 18 visitors) — kept product-focused on the free tasks feature. | built | Hook tightened (the row hook's "weeks away" dropped — first-frost timing is unverified, §9). Platform shape confirmed from the two most recent published carousels: photo slides store only the prompt string, so the hook headline lives in the first line of the caption and the value text slide sits mid-deck (slide 4); CTA slide 9. No re-renders: all 7 photos passed the vision check on the first pass (no legible text, faces, phones or brands; a faint illegible ladder label on P1 is within the rules). Minor brief deviations kept: P3 side wall + eaves instead of the gable end, P4 hose hanging loose (tape on the tap body), P5 sticky note on the sill, P7 no foam lagging. Slot 2026-10-28T22:00Z free per the live schedule (no upcoming posts). |

## 9. Open questions & watch items

- **No social attribution** (owner: Robert) — the site has no `/go/?src=`
  hop (`/go/` is 404) and links carry no `src`, so IG/FB visits show only as
  referrers and store taps cannot be tied to social. Add the hop the sister
  sites use (Travel Stories `docs/social-source-links.md`) and point the IG
  bio at `/go/?src=instagram`?
- **Baseline and look ledger** (owner: Hermes) — `marketing-post looks --app
  home-stories` is empty. If the platform holds older Home Stories posts, run
  `marketing-post ledger-backfill --app home-stories` once before the first
  build, so the freshness check sees them, and add a BASELINE row to §8 (best
  and worst past posts) like the sister apps.
- **Brand record vs site** (owner: Robert) — the record lists "iCloud
  collaboration with family/contractors" and "PDF export for contractor
  sharing" as differentiators next to "free to start", but the site says both
  are Pro. Posts follow the site; consider updating the record. Its
  targetAudience percentages (35%, 24%, 80%) are not used in posts.
- **Post language** (owner: Robert) — the brand record has no language field;
  its tone, hashtags and CTAs are English, so posts are English. The site
  runs in 16 languages and the app in 50. Keep English-only?
- **Market focus** (owner: Robert) — the site and the brand record use US
  dollars and the plan leans on US moments (Thanksgiving, Black Friday,
  Presidents' Day). The only published review is from Denmark. Check the
  IG/FB audience by country and swap rows if it is concentrated elsewhere.
- **CTAs in the brand record** (owner: Robert) — ctaOptions also has "Start
  tracking your renovation today", "What room are you renovating? Comment
  below", "Link in bio" and a bare "download". §3 uses "Download Home Stories
  free" plus four situational ones; decide whether to add the others and
  whether to remove the bare "download" from the record.
- **Real footage coverage** (owner: Hermes) — check that each footage take
  shows what its rows need (e.g. side-by-side before/after in
  `footage-photos.mp4`, sharing in any take) before building those reels; if
  a take does not show it, do not say it on screen, and tell Robert a new
  recording is needed.
- **Stories (IG/FB)?** (owner: Robert) — the brand record wants daily
  Stories; the pipeline is feed-only. Decide after the week of Nov 16.
- **`optimize-guidelines` is dormant** (owner: Robert): decide whether to
  enable once §8 has ≥ 4 weeks of logs.
- **Unverified moments** (owner: Hermes) — first-frost timing, the trades'
  holiday break and Presidents' Day sales are patterns, not dated facts;
  their hooks name no date beyond the computed holiday.
- **Log growth** (owner: Robert): decide archiving when §8 passes ~60 rows.
