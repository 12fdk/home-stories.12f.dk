# App Store custom product pages per use case (#165)

A custom product page (CPP) is a second version of the App Store page with its
own screenshots and promotional text. It shows only to people who arrive
through its link (`ppid=<page id>`). Name, subtitle, description, icon and
price stay the same as the default page.

The goal here: a visitor on `/use-cases/kitchen-renovation/` who taps
"Download" sees kitchen screenshots on the App Store, not the generic set.

## What exists today (App Store Connect, read 2026-11-28)

Read with `asc product-pages custom-pages list --app 6754754960` and the
version, localization and screenshot-set calls under it. Nothing was changed.

All seven pages are visible, each has one version, and every version is
`APPROVED`. No page has a deep link. They were made in the iOS repo
(`home-stories/fastlane/custom_pages/`, issue home-stories#380 for the
localized budget pages).

| CPP name | Page id (`ppid`) | Locales | iPhone 6.5" | iPad 13" | Promotional text |
|---|---|---|---|---|---|
| kitchen-en-us | `495b34be-cd67-4cd7-9407-47217add22eb` | en-US | 5 | none | none |
| bathroom-en-us | `f1c1fc17-d1e9-4c4b-8a9f-d75f959c4018` | en-US | 4 | none | none |
| budget-en-us | `c64dd5d2-fbf5-4929-8166-adb341a42e8e` | en-US | 5 | none | none |
| budget-da | `ae7b922b-6ee1-49bd-9169-c06f3109a217` | da, en-US | 5 + 5 | 4 + 4 | da only |
| budget-nl-nl | `8d40b1a2-9450-41a8-8a9f-a92068cb6391` | nl-NL, en-US | 5 + 5 | 4 + 4 | nl-NL only |
| diy-en-us | `a7b40a42-3bf4-4e23-9d01-59ad2a9e3504` | en-US | 5 | none | none |
| photos-en-us | `75f09863-2a61-41a9-b906-14edcc970f16` | en-US | 4 | none | none |

Problems found:

- **No en-US page has promotional text.** The field is empty on all five
  English pages.
- **The screenshot order looks wrong.** The API lists the screenshots in this
  order, which is the order the page shows them. The file numbers say the
  intended order was 01, 02, 03 …:
  - kitchen: 03 Tasks, 04 Items, 01 Overview, 05 BeforeAfter, 02 Budget
  - bathroom: 01 Overview, 04 Items, 03 Tasks, 02 Budget
  - budget-en-us: 01, 03, 02, 05, 04
  - diy: 03 Items, 04 Timer, 05 Notes, 01 Overview, 02 Tasks
  - photos: 02 Grid, 03 Timeline, 01 Projects, 04 Notes

  So the kitchen page opens on the task list, not on the kitchen. Check this in
  App Store Connect before you trust it.
- **Some captions show Pro features with no "(Pro)".** The budget vs. actual
  chart, reminders and the PDF report are Pro. Captions that sell them unmarked:
  kitchen and bathroom "Track Costs with Visual Charts", budget "Visual Budget
  vs. Cost Charts" and "Project Budget Charts", DIY "Smart Reminders for Every
  Job". The site marks Pro every time, and the store should too.
- **No iPad set on the English pages** except the budget ones. The iOS repo's
  notes say a new CPP version will not submit without an iPad 13" set
  (`A screenshot with type IPAD_13_PROFILE is required`). Any update to these
  pages needs one.
- **No page for house flipping or rental property,** two of the jobs the issue
  names.

## Which use cases get a CPP, and why

Six. Four reuse an approved page; two are new. A CPP only pays when its
screenshots show the job the visitor came for, so each one below is a job where
the default screenshots (a generic project list, a chart, a photo timeline)
miss what that visitor is looking for.

| # | Use-case page | CPP | Why this one |
|---|---|---|---|
| 1 | `/use-cases/kitchen-renovation/` | kitchen-en-us (exists) | The biggest renovation search, and the most line items. Kitchen screenshots match the page one to one. |
| 2 | `/use-cases/bathroom-remodel/` | bathroom-en-us (exists) | The second biggest. The page is already approved; it only needs the fixes above. |
| 3 | Renovation budget tracker page (#158, slug set there) | budget-en-us (exists) | "Budget tracker" is the tool search the #158 page targets. The page can lead with the free running total and show the Pro chart after it, marked. |
| 4 | Before-and-after photo app page (#158, slug set there) | photos-en-us (exists) | A visitor looking for a before-and-after app should land on photos, not on a budget. |
| 5 | `/use-cases/house-flipping/` | flipping-en-us (new) | The default page shows one home. A flipper runs several properties and cares about cost by type and time. |
| 6 | `/use-cases/rental-property/` | rental-en-us (new) | A landlord wants one record per unit and dated condition photos. Nothing on the default page says that. |

Not in the six:

- **DIY** (`/use-cases/diy-projects/`): diy-en-us already exists and is
  approved. Once its order and the "Smart Reminders" caption are fixed, it can
  be linked too. It is left out of the six only to keep the first round of
  reviews small; the use-case pages get about one view each so far (#157).
- **budget-da and budget-nl-nl**: these are for Apple Ads in Denmark and the
  Netherlands. The site pages are English, so they link budget-en-us. When the
  Danish and Dutch use-case pages from #164 exist, those can link the local
  pages.
- The other use cases keep the default page. More CPPs mean more reviews and
  more screenshots to keep current, for pages that get about one view each
  (see #157).

## Promotional text per CPP

At most 170 characters. Only what the app does today, from the live App Store
description. Pro is named where it appears.

1. **kitchen-en-us**
   > Keep the whole kitchen in one project: every cabinet, worktop and appliance with its price, the trade sequence as dated tasks, and photos from strip-out to finish.
2. **bathroom-en-us**
   > Plan the bathroom remodel in one place: tiles, taps and the vanity with their prices, each trade as a dated task, and photos of what goes behind the walls.
3. **budget-en-us**
   > Every item you save adds its price to the project total. Keep materials, labour and contractor costs apart, in your own currency. Budget vs. actual chart with Pro.
4. **photos-en-us**
   > Photograph the room before work starts and at every stage. Home Stories builds the photo timeline, a side-by-side before and after, and a slideshow to show people.
5. **flipping-en-us**
   > One project per property, each with its own budget. Keep materials, labour and contractor costs apart, time your own hours, and keep before-and-after photos.
6. **rental-en-us**
   > Give each rental unit its own project: repair and refresh costs, invoices and receipts as documents, and dated photos of every room at each change of tenant.

For diy-en-us, if it is linked later:

> Plan the job, list the tools and materials with their prices, and time your own hours with the Lock Screen timer. Notes keep the paint code and measurements.

US English spelling would be "labor", but the site writes "labour" and the
App Store description does too, so the text keeps it.

## Screenshot brief per CPP

iPhone 6.5" (`IPHONE_65`, 1284 × 2778) and iPad 13" (`IPAD_PRO_3GEN_129`) for
every page. Screens are the ones the iOS repo's `ScreenshotTests.swift`
already captures (`testCPP_*`) on the demo data in
`home-stories/Utilities/ScreenshotDemoData.swift` (Kitchen renovation,
Bathroom remodel, Backyard deck). Captions are the title / subtitle pairs in
each theme's `frame_titles.json`. Slot 1 is the one people see in search and
on the link preview, so it must say the job.

Rules for every caption: name the job in slot 1, put "(Pro)" on any Pro
feature, no claims the App Store description does not make.

The screenshot runs use Pro. In the app, the project's budget overview and its
charts show only with Pro (`budgetPlacement` in `ProjectDetailView.swift`);
free users see the spending summary. So every slot that shows the budget chart
carries "(Pro)", and no caption calls the chart free.

### 1. kitchen-en-us (refresh)

| Slot | Screen (key) | Title | Subtitle |
|---|---|---|---|
| 1 | Kitchen project, top (KitchenOverview) | Kitchen Renovation Planner | Every Cost, Task and Photo |
| 2 | Kitchen items (KitchenItems) | Every Appliance, Priced | Snap It or Share It from Safari |
| 3 | Kitchen tasks (KitchenTasks) | The Trade Sequence | Plumber, Fitter, Worktop |
| 4 | Before and after (KitchenBeforeAfter) | Kitchen Before & After | Side by Side |
| 5 | Budget chart (KitchenBudget) | Budget vs. Actual (Pro) | See the Overrun Coming |

Change from today: slot order fixed, items move up, the chart caption gets
"(Pro)". iPad: projects list, items, tasks, before/after from the main iPad set.

### 2. bathroom-en-us (refresh)

| Slot | Screen (key) | Title | Subtitle |
|---|---|---|---|
| 1 | Projects list, bathroom visible (BathroomOverview) | Bathroom Remodel Planner | Tiles, Taps and Trades |
| 2 | Bathroom items (BathroomItems) | Every Fixture, Priced | Vanity, Shower, Tiles |
| 3 | Bathroom tasks (BathroomTasks) | Shower Remodel Checklist | Each Trade with a Date |
| 4 | Budget chart (BathroomBudget) | Budget vs. Actual (Pro) | Running Total Free |

Add a 5th slot if the test can reach the bathroom's photos: "Before the Walls
Close" / "Photos of the Pipes".

### 3. budget-en-us (refresh)

| Slot | Screen (key) | Title | Subtitle |
|---|---|---|---|
| 1 | Projects list with budgets (BudgetMultiProject) | Renovation Budget Tracker | Every Project, Its Own Budget |
| 2 | Items with prices (BudgetItems) | Every Price Adds Up | Prices from Any Store |
| 3 | Tasks, total in the bar (BudgetTasks) | Total Spent, Always Visible | Free, No Account |
| 4 | Budget chart (BudgetOverview) | Budget vs. Actual (Pro) | See the Overrun Coming |
| 5 | Second project's budget (BudgetCompare) | Budget per Project | Kitchen, Bathroom, Deck |

The free running total leads; the Pro chart comes after it, marked. Keep
budget-da and budget-nl-nl as they are; if the chart captions there change,
mark Pro in the local language ("(Pro)" works in both).

### 4. photos-en-us (refresh)

| Slot | Screen (key) | Title | Subtitle |
|---|---|---|---|
| 1 | Before/after comparison (from the main set's 03_PhotoTimeline capture) | Before & After Photos | Side by Side, Room by Room |
| 2 | Photo timeline (PhotoTimeline) | The Whole Project in Photos | Before, During and After |
| 3 | Photo grid (PhotoGrid) | Progress Photo Gallery | Every Stage of the Work |
| 4 | Projects with cover photos (PhotoProjects) | A Photo Record per Project | Free, No Limit |
| 5 | Note with photo (PhotoNotes) | Notes on Every Photo | What Is Behind the Wall |

The comparison is the screen this visitor wants, so it moves to slot 1. It is
captured by the main `ScreenshotTests` flow (the before/after button), not by
`testCPP_Photos` today.

### 5. flipping-en-us (new)

| Slot | Screen | Title | Subtitle |
|---|---|---|---|
| 1 | Projects list, one project per property | House Flipping Tracker | One Project per Property |
| 2 | Payments split by materials, labour, contractor | Costs by Type | Materials, Labour, Contractor |
| 3 | Tasks with due dates | The Schedule for Each Trade | Every Week Costs Money |
| 4 | Time tracking / Lock Screen timer | Time Your Own Hours | Lock Screen Timer |
| 5 | Before/after comparison | Before & After for the Listing | Side by Side, Slideshow |
| 6 | PDF report export | Report for the Buyer (Pro) | PDF with a Cover Photo |

Needs new demo data: two or three properties as projects (say "Maple Street
flip", "Oak Avenue flip"; invented names, no real address) with a budget each,
payments in all three cost types, and before/after photos. The current demo set
(Kitchen, Bathroom, Deck) reads as one home, not as flips. The app does not
calculate profit, so no caption may suggest it.

### 6. rental-en-us (new)

| Slot | Screen | Title | Subtitle |
|---|---|---|---|
| 1 | Projects list, one project per unit | Rental Property Tracker | One Project per Unit |
| 2 | Photo timeline of one unit | Condition Between Tenants | Dated Photos of Every Room |
| 3 | Documents (invoices, receipts) | Receipts for the Year | Invoices as Documents |
| 4 | Items and tasks for a repair | Every Repair, Priced | Tasks with Due Dates |
| 5 | Data export or PDF report | Records for Your Accountant | Free Export, PDF Report (Pro) |

Needs new demo data: units as projects ("Flat 1", "Flat 2", "Garden flat"),
each with repair items, a few documents and a dated photo set. No caption may
say the photos are a legal inventory; the use-case page says the rules depend
on the country, and the store should not say more.

## Linking a CPP from the site

`src/data/useCases.ts` has an optional `cppId` on each use case. When it is
set, the page's download buttons link to
`https://apps.apple.com/app/id6754754960?ct=uc-<slug>&pt=127521693&mt=8&ppid=<cppId>`.
The `ct`/`pt` campaign tokens are kept on the link, so the download should still count for the
page's campaign in App Store Connect. A malformed id fails the build.

`cppId` is unset on every page today. Set it only after the refreshed or new
page is approved, so nobody lands on a page with the problems above. For
example, in the kitchen entry:

```ts
cppId: "495b34be-cd67-4cd7-9407-47217add22eb",
```

Before the first one goes live, open the link on an iPhone once and check that
the App Store shows the CPP screenshots. Then check after a week in App Store
Connect → Analytics that installs from `uc-<slug>` still show up under that
campaign and that the CPP gets page views.

## Owner steps

The spark has no Xcode and no simulator, so screenshots are made on the Mac.
Creating, changing or submitting a CPP changes the live store, so it waits for
your OK.

### A. Screenshots (Mac, in the iOS repo `home-stories`)

For the four existing themes:

1. Update `fastlane/custom_pages/<theme>/frame_titles.json` with the captions
   above (kitchen, bathroom, budget, photos).
2. Fix the photos theme so it captures the before/after comparison (slot 1),
   and reorder the kitchen and budget slots by renaming the snapshot keys in
   `ScreenshotTests.swift` (`kitchen_01_…` etc.), since the file number sets
   the order.
3. Capture: `bundle exec fastlane cpp_screenshots_theme theme:<theme>`
   (or `make cpp-screenshots` for all).
4. Frame: `make frame-custom-<theme>` (runs
   `fastlane/frame_custom_pages.sh <theme> en-US`). Output goes to
   `fastlane/custom_pages/<theme>/framed/en-US/`.
5. iPad 13" set: stage it the way `custom_pages/budget/stage_ipad.sh` does,
   from the main iPad set (`make frame-ipad` first), with the slots that fit
   the theme.
6. Commit the framed sets.

For flipping and rental (new themes), first:

1. Add the demo projects described above to `ScreenshotDemoData.swift`, behind
   a launch argument so the main screenshots do not change.
2. Add `testCPP_Flipping` and `testCPP_Rental` to `ScreenshotTests.swift`,
   `flipping` and `rental` to `THEMES` in `capture_custom_screenshots.sh` and
   `sort_cpp_screenshots.sh`, and `frame-custom-flipping` / `frame-custom-rental`
   to the Makefile.
3. Add `custom_pages/flipping/` and `custom_pages/rental/` with
   `frame_titles.json` and `keywords.txt`, then run steps 3–6 above.

### B. App Store Connect (needs your OK)

Updating an approved page (kitchen, bathroom, budget-en-us, photos):

```sh
asc product-pages custom-pages versions create --custom-page-id <page id>
asc product-pages custom-pages localizations list --custom-page-version-id <new version id>
asc product-pages custom-pages localizations update --localization-id <en-US id> \
  --promotional-text "<text from above>"
asc product-pages custom-pages localizations screenshot-sets sync --localization-id <en-US id> \
  --path fastlane/custom_pages/<theme>/framed/en-US --device-type IPHONE_65 --confirm
asc product-pages custom-pages localizations screenshot-sets sync --localization-id <en-US id> \
  --path fastlane/custom_pages/<theme>/framed-ipad/en-US --device-type IPAD_PRO_3GEN_129 --confirm
```

Then open the page in App Store Connect, check the order and the text, and
submit it for review. `asc` has no CPP submit command; use the web page (or an
`asc api` review submission). The approved version stays live until the new
one is approved.

New pages (flipping, rental):

```sh
asc product-pages custom-pages create --app 6754754960 --name flipping-en-us
asc product-pages custom-pages create --app 6754754960 --name rental-en-us
```

Then add an en-US localization to the version
(`localizations create --custom-page-version-id <id> --locale en-US`), set the
promotional text, upload both screenshot sets as above, and submit.

### C. After approval

Tell the site (an Inbox note `home-stories.12f.dk: CPP approved` or a comment
on #165) which page ids are live. The `cppId` goes on the matching use case in
`src/data/useCases.ts` (or the #158 file for the budget and photos pages), and
the next daily build ships it.
