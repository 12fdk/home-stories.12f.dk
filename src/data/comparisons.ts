/**
 * "Home Stories vs X" pages. Slugs here are the canonical /compare/<slug>/ URLs.
 * /llms.txt and /llms-full.txt list them from this file. Issue #166.
 *
 * Rules, because generated competitor facts get invented (#104):
 * - Every claim about a competitor (price, plan, feature, rating) comes from the
 *   competitor's own page or the App Store, read on `checkedOn`, and sits in a
 *   row or note with that source URL. If it could not be verified, it is not here.
 * - Re-check before you change `checkedOn`. Prices move; the date is the promise.
 * - Be fair: `chooseThem` says, plainly, when the other tool is the better pick.
 * - Each page has a different intent from the blog post on the same tool
 *   (`post`): the post is the how-to or the round-up, the page is the head-to-head.
 *   Both link to each other. Do not copy text between the two, or between pages.
 *
 * Only claim what Home Stories does today (the App Store description). Mark Pro
 * features "(Pro)" every time.
 */
export interface Source {
  label: string;
  url: string;
}

export interface Comparison {
  slug: string;
  /** The other tool, as people search for it. */
  competitor: string;
  /** Short label for the hub, sibling links and llms.txt. */
  label: string;
  h1: string;
  /** <title>, under ~60 characters. */
  metaTitle: string;
  /** Meta description, under ~160 characters. */
  metaDescription: string;
  /** Hero photo, from /public/stock. */
  image: string;
  imageAlt: string;
  /** Answer-first intro an answer engine can quote. */
  intro: string[];
  /** YYYY-MM-DD the competitor facts were read. */
  checkedOn: string;
  /** Head-to-head rows. `source` indexes `sources` for the competitor cell. */
  rows: { topic: string; homeStories: string; them: string; source?: number | number[] }[];
  /** When the competitor is the better choice. Honest, specific. */
  chooseThem: string[];
  /** When Home Stories is the better choice. */
  chooseUs: string[];
  /** Optional: how the two work together. */
  together?: string[];
  faq: { q: string; a: string }[];
  /** Competitor pages read on `checkedOn`. */
  sources: Source[];
  /** The blog post on the same tool, linked from the page (and back). */
  post: string;
  /** Other related post slugs. */
  posts: string[];
  /** YYYY-MM-DD. The page is built from this date on. Omit for always live. */
  publishDate?: string;
}

const allComparisons: Comparison[] = [
  {
    slug: "home-stories-vs-houzz",
    competitor: "Houzz",
    label: "Home Stories vs Houzz",
    h1: "Home Stories vs Houzz: ideas and pros, or the record of your own job",
    metaTitle: "Home Stories vs Houzz for a Homeowner's Renovation",
    metaDescription:
      "Houzz is for ideas and finding a pro. Home Stories tracks the job you then run: costs, tasks and photos. Sourced facts, and when Houzz is the better pick.",
    image: "/stock/cmp-houzz.webp",
    imageAlt: "A bright finished kitchen corner with tile, wood and fabric samples laid out on the counter",
    intro: [
      "Houzz and Home Stories do different halves of a renovation. Houzz is where you look at finished rooms, save the ones you like and find a local professional. Home Stories is where you keep the project once you start paying for it: each item and its price, the payments, the tasks and the photos of your own house.",
      "Most homeowners need the first before the second. If you have not decided what you want yet, start with Houzz. If the builder starts on Monday, you need a tracker.",
      "Houzz Pro is a separate product: business software for contractors and designers, priced per month. It is not built for the homeowner, and this page treats it that way.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "What it is for", homeStories: "Tracking one renovation you are running: budget, tasks, photos, notes and documents per project.", them: "Ideas and hiring. The App Store listing offers more than 20 million photos of finished homes and over 3 million home improvement professionals.", source: 0 },
      { topic: "Price to a homeowner", homeStories: "Free. Pro is a one-time purchase, no subscription.", them: "The Houzz app is free on the App Store.", source: 0 },
      { topic: "Saving what you like", homeStories: "Snap a product in the shop, or share it from Safari, Amazon or IKEA into a project, with the price, the shop and a note.", them: "Save any photo to an Ideabook, or contact the pro who did the work.", source: 1 },
      { topic: "Buying", homeStories: "Not a shop. You log what you bought and what it cost.", them: "Shop Houzz says purchasing on it is no longer available.", source: 2 },
      { topic: "Budget and costs", homeStories: "Every item adds to the running total. Payments split into materials, labour and contractor. Budget-vs-actual chart (Pro).", them: "The App Store listing describes photos, saving ideas and finding pros. It does not describe a budget or cost tracker.", source: 0 },
      { topic: "Your own photos", homeStories: "A photo timeline, a side-by-side before-and-after view and a slideshow.", them: "The photos are other people's finished rooms, there to give you ideas.", source: 1 },
      { topic: "For professionals", homeStories: "Not built for running a contracting business.", them: "Houzz Pro: the Pro plan is $199 a month for one user, Teams starts at $399 a month for five users. There is a free basic plan and a 30-day free trial.", source: 3 },
      { topic: "On the App Store", homeStories: "iPhone and iPad, iOS 17 or later. No account.", them: "Houzz: iOS 17 or later, 4.8 average from about 325,000 US ratings.", source: 0 },
    ],
    chooseThem: [
      "You do not know what you want yet. Twenty minutes in Houzz photos gives you words for the style in your head.",
      "You need to find a builder, a kitchen designer or an architect near you. Houzz is a directory of professionals; Home Stories is not.",
      "You want to show a pro the finish you mean. An Ideabook does that better than a description.",
      "You are the contractor or designer. Houzz Pro is built for estimates, clients and leads, and Home Stories is not.",
    ],
    chooseUs: [
      "The style is chosen and the money has started to move. You need the running total, not more pictures.",
      "You want a dated record of your own house: the wall before it was closed, the pipe the plumber moved.",
      "You want the receipts, the quote and the contract in the same place as the costs.",
      "You do not want an account, and you want the project to stay on your phone unless you turn on sync (Pro).",
    ],
    together: [
      "The two fit end to end. Collect ideas in a Houzz Ideabook and use it to brief the pros you contact. When you pick a sink, a tile or a light, add it to the Home Stories project with its price. From then on, the project total tells you what the ideas cost.",
    ],
    faq: [
      { q: "Is Houzz a renovation tracker?", a: "No. Houzz is for ideas and finding professionals. Its App Store listing describes photos, saving ideas and contacting pros, not a budget or task tracker. Home Stories is the tracker: items with prices, payments, tasks, photos and documents per project." },
      { q: "Is Houzz Pro worth it for a homeowner?", a: "It is not made for one. Houzz Pro is business software for remodeling and design professionals. As checked on 28 November 2026, the Pro plan is $199 a month for one user and Teams starts at $399 a month. A homeowner tracking their own job does not need estimates, leads or a client dashboard." },
      { q: "Can I keep my Houzz ideas in Home Stories?", a: "Keep the Ideabooks in Houzz. When an idea becomes a purchase, add the product to your Home Stories project: share its web page from Safari or take a photo, then add the price and the shop." },
      { q: "Which is free, Houzz or Home Stories?", a: "Both apps are free to download. Home Stories has an optional one-time Pro purchase for the budget-vs-actual chart, task reminders, PDF export, iCloud sync and project sharing. There is no subscription." },
    ],
    sources: [
      { label: "Houzz on the US App Store (description, rating, iOS version)", url: "https://apps.apple.com/us/app/id399563465" },
      { label: "Houzz photos and Ideabooks", url: "https://www.houzz.com/photos" },
      { label: "Shop Houzz notice", url: "https://www.houzz.com/products" },
      { label: "Houzz Pro pricing", url: "https://www.houzz.com/houzz-pro/pricing" },
    ],
    post: "homezada-vs-houzz-pro",
    posts: ["best-home-improvement-apps", "how-to-compare-contractor-quotes"],
    publishDate: "2026-11-28",
  },
  {
    slug: "home-stories-vs-homezada",
    competitor: "HomeZada",
    label: "Home Stories vs HomeZada",
    h1: "Home Stories vs HomeZada: plans, prices and which one fits your renovation",
    metaTitle: "Home Stories vs HomeZada: Plans, Prices, Features",
    metaDescription:
      "HomeZada manages a whole home; Home Stories tracks one renovation at a time. Plans, prices and apps side by side, with sources checked on 28 November 2026.",
    image: "/stock/cmp-homezada.webp",
    imageAlt: "A hallway cupboard under renovation, a box of appliance manuals and warranty folders on the shelf",
    intro: [
      "HomeZada is home management software: an inventory of what you own, home documents, a maintenance schedule, remodel projects and home finances, on the web and in apps. Home Stories does one part of that. It tracks renovation projects, on iPhone and iPad.",
      "The price models differ. HomeZada's remodel projects sit in its Premium plan, a yearly or monthly subscription. Home Stories tracks projects for free, and its Pro upgrade is a single purchase.",
      "Pick HomeZada if you want the house's records in one place for years. Pick Home Stories if you want the renovation you are doing now on your phone.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "What it covers", homeStories: "Renovation projects: items with prices, payments, tasks, photos, notes and documents.", them: "Home inventory, home documents, maintenance, remodel projects and home finances, with reports and dashboards.", source: 0 },
      { topic: "Free plan", homeStories: "Unlimited projects, items, photos, notes, documents, time tracking, widgets, local backups and full data export.", them: "Essentials: home inventory, home documents, a contact list and a news feed, plus 10 AI chats and 5 AI design photos.", source: 0 },
      { topic: "Paid plan", homeStories: "Pro, one purchase: budget-vs-actual chart, task reminders, PDF export, iCloud sync, project sharing.", them: "Premium is $118 a year or $21.98 a month and adds maintenance, remodel projects and finances. Deluxe is $218 a year for up to 2 properties.", source: 0 },
      { topic: "Renovation projects", homeStories: "Free. The running total builds as you add items and payments.", them: "On Premium. HomeZada says they organise designs, budgets, shopping research, costs, photos and documents.", source: 1 },
      { topic: "Inventory and maintenance", homeStories: "No home inventory or maintenance schedule. A repairs project with tasks covers small jobs; reminders are Pro.", them: "An inventory with photos, videos, receipts and documents for insurance; maintenance tasks with service reminders.", source: 1 },
      { topic: "Account and devices", homeStories: "No account. iPhone and iPad only. Projects stay on the device unless you turn on iCloud sync (Pro).", them: "Web, plus iPhone, iPad and Android apps that you use once you have created an account.", source: 2 },
      { topic: "iPhone app", homeStories: "Version 1.9.22, released 13 November 2026. iOS 17 or later.", them: "HomeZada Mobile 2.4.0, last updated 27 May 2022, 2.9 average from 44 US ratings.", source: 3 },
    ],
    chooseThem: [
      "You want a home inventory for insurance: what you own, with photos, receipts and documents.",
      "You want a maintenance schedule for the whole house, with service reminders, year after year.",
      "You manage two properties, or you are getting ready to sell. Deluxe covers up to two properties, and HomeZada sells a transfer of the home's data to the buyer as an add-on.",
      "You work mostly on a computer, or you use Android. Home Stories is iPhone and iPad only.",
    ],
    chooseUs: [
      "Your job is the renovation, not the whole house. Home Stories tracks projects in the free version; at HomeZada they are a Premium feature.",
      "You will log costs and photos on site, in an iPhone app that is still being updated.",
      "You do not want an account or a yearly fee. Pro is one purchase, with Family Sharing.",
      "You want time tracking with a Lock Screen timer, and Home Screen widgets for budget progress.",
    ],
    together: [
      "If HomeZada already holds your inventory and documents, there is no reason to move them. Run the renovation in Home Stories while the work lasts. At the end, export the project (full data export is free, the PDF report is Pro) and file it with the home's records.",
    ],
    faq: [
      { q: "How much does HomeZada cost?", a: "As checked on 28 November 2026 on HomeZada's pricing page: Essentials is free, Premium is $118 a year or $21.98 a month, and Deluxe is $218 a year for up to two properties. Each extra property above two is $98 a year. Remodel projects are part of Premium." },
      { q: "Is Home Stories a HomeZada replacement?", a: "For the renovation part, yes. For the rest, no. Home Stories has no home inventory, maintenance schedule or home finances. It tracks renovation projects: items, payments, tasks, photos, notes and documents." },
      { q: "Does HomeZada work on Android?", a: "HomeZada's homeowner page says it has iPhone, iPad and Android apps. Home Stories runs only on iPhone and iPad, with iOS 17 or later." },
      { q: "Which one needs an account?", a: "HomeZada's apps are used once you have created an account. Home Stories needs no account, and projects stay on your device unless you turn on iCloud sync or share a project (both Pro)." },
    ],
    sources: [
      { label: "HomeZada homeowner pricing", url: "https://www.homezada.com/homeowners/pricing" },
      { label: "HomeZada home page (features)", url: "https://www.homezada.com/" },
      { label: "HomeZada for homeowners (apps and devices)", url: "https://www.homezada.com/homeowners" },
      { label: "HomeZada Mobile on the US App Store", url: "https://apps.apple.com/us/app/id473722482" },
    ],
    post: "looking-for-a-homezada-alternative",
    posts: ["homezada-vs-houzz-pro", "home-maintenance-schedule"],
    publishDate: "2026-11-28",
  },
  {
    slug: "home-stories-vs-notion",
    competitor: "Notion",
    label: "Home Stories vs Notion",
    h1: "Home Stories vs Notion: a renovation app or a workspace you build",
    metaTitle: "Home Stories vs Notion for Tracking a Renovation",
    metaDescription:
      "Notion is a workspace you shape yourself, with user-made renovation templates. Home Stories comes ready for one renovation. Plans, limits and a fair verdict.",
    image: "/stock/cmp-notion.webp",
    imageAlt: "A dining table in a house under renovation with a closed laptop, paper plans, tile samples and a mug",
    intro: [
      "Notion gives you pages and databases and lets you build the renovation system you want. Home Stories gives you the system already built: a project with a budget, items with prices, payments, tasks, a photo timeline and documents.",
      "So the real question is whether you want to design the tool or use one. People who enjoy building a setup, and who plan at a computer, often prefer Notion. People who want to log a cost in the shop and get on with the day usually prefer an app made for it.",
      "Notion's template gallery has several home renovation templates made by its users, many of them free, so you do not have to start from a blank page.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "What it is", homeStories: "An app for renovation projects, ready to use when you open it.", them: "A general workspace of pages and databases. The template gallery lists home renovation templates made by users.", source: 1 },
      { topic: "Price", homeStories: "Free. Pro is a one-time purchase, no subscription.", them: "A Free plan. Plus and Business are paid per seat per month, cheaper billed yearly. Enterprise is custom pricing.", source: 0 },
      { topic: "Budget", homeStories: "Built in: each item's price goes on the running total, payments split materials, labour and contractor. Budget-vs-actual chart (Pro).", them: "Whatever the template or your own database sets up." },
      { topic: "Photos and files", homeStories: "A photo timeline with before-and-after and a slideshow. Quotes, contracts and receipts as documents.", them: "On the Free plan, uploads of up to 5 MB per file.", source: 0 },
      { topic: "Offline", homeStories: "Works offline, always. No account.", them: "Offline on the desktop and mobile apps. On Free you choose which pages to download.", source: 0 },
      { topic: "History", homeStories: "Projects stay on your device; local backups and full data export are free.", them: "Page history is 7 days on the Free plan.", source: 0 },
      { topic: "Devices", homeStories: "iPhone and iPad only, iOS 17 or later.", them: "Desktop and mobile apps. The iPhone app needs iOS 18 or later and has a 4.8 average from about 90,800 US ratings.", source: 2 },
    ],
    chooseThem: [
      "You already run your life in Notion, and you want the renovation next to everything else.",
      "You want research, mood boards, contractor notes and meeting notes linked together in pages you shape yourself.",
      "You plan on a computer, or some people in the house use Windows or Android. Home Stories is iPhone and iPad only.",
      "You like building the system. Notion lets you add any property and any view you want; Home Stories has a fixed structure.",
    ],
    chooseUs: [
      "You want the budget to work on day one, without building a database or choosing a template.",
      "You will log costs and photos on site, one-handed, and want that to take seconds.",
      "You want the photos of the work in a timeline, with a before-and-after view, not as attachments on pages.",
      "You want time tracking with a Lock Screen timer, Home Screen widgets, and no account.",
    ],
    together: [
      "A common split: Notion for the thinking, Home Stories for the doing. Keep the research, the style notes and the shortlist of builders in Notion. Once work starts, keep the money, the tasks with dates and the dated photos in Home Stories, where you can add them from the site.",
    ],
    faq: [
      { q: "Is there a Notion template for home renovation?", a: "Yes, several. As checked on 28 November 2026, Notion's template gallery lists home renovation templates made by its users, for example a Home Renovation Template, a Home Renovation Hub and a Home Renovation Starter Kit. Some are marked free." },
      { q: "Is Home Stories cheaper than Notion?", a: "For one person, both have a free plan. Notion's paid plans are billed per seat per month. Home Stories Pro is a single purchase with no subscription, and Family Sharing is included." },
      { q: "Can I use Home Stories on a computer like Notion?", a: "No. Home Stories runs on iPhone and iPad. On iPad it has a sidebar, keyboard shortcuts and pointer support, and you can drag photos, PDFs and links in from Safari, Files or Photos." },
      { q: "Can I share a renovation with my partner in both?", a: "In Home Stories, project sharing is part of Pro: you invite a partner, family member or contractor and everyone sees the same tasks, items and photos, kept in step through iCloud. In Notion, sharing depends on your plan; check its pricing page." },
    ],
    sources: [
      { label: "Notion pricing and plan limits", url: "https://www.notion.com/pricing" },
      { label: "Notion template gallery: Home Renovation Template", url: "https://www.notion.com/templates/home-renovation-3" },
      { label: "Notion on the US App Store", url: "https://apps.apple.com/us/app/id1232780281" },
    ],
    post: "notion-for-home-renovation",
    posts: ["what-to-track-during-a-renovation", "how-to-plan-a-home-renovation-step-by-step"],
    publishDate: "2026-11-28",
  },
  {
    slug: "home-stories-vs-spreadsheets",
    competitor: "Excel and Google Sheets",
    label: "Home Stories vs Excel and Google Sheets",
    h1: "Home Stories vs Excel and Google Sheets for a renovation budget",
    metaTitle: "Home Stories vs Excel and Google Sheets: Renovation Budget",
    metaDescription:
      "Excel and Google Sheets give you any formula you want. Home Stories gives you the budget, the receipts and the photos in one project. Facts and a fair verdict.",
    image: "/stock/cmp-spreadsheets.webp",
    imageAlt: "Crumpled paper receipts and a pencil on a dusty plywood work surface beside a cordless drill",
    intro: [
      "A spreadsheet is the most flexible budget tool there is. Google Sheets is free with a Google account, and Excel for the web and mobile is free with a Microsoft account. If you want scenarios, formulas and a layout you control, use one.",
      "Home Stories is narrower. It has one budget shape, built for a renovation: items with prices on a running total, payments split into materials, labour and contractor, and the receipt, the photo and the task in the same project.",
      "The difference shows on site. A spreadsheet holds numbers well. A renovation also makes photos, quotes and deadlines, and those end up somewhere else.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "Price", homeStories: "Free. Pro is a one-time purchase, no subscription.", them: "Google Sheets: anyone with a Google Account can use it. Excel: free on the web and mobile with a Microsoft account.", source: [0, 2] },
      { topic: "Full desktop Excel", homeStories: "Not needed.", them: "Microsoft 365 Personal is $99.99 a year or $9.99 a month in the US, with a lower first-period offer shown.", source: 3 },
      { topic: "Tablets", homeStories: "The full app on iPad, free.", them: "Free Office mobile apps cover core viewing and editing, but a device larger than 10.1 inches needs a qualifying Microsoft 365 subscription.", source: 4 },
      { topic: "Structure", homeStories: "Fixed: projects, items, payments, tasks, notes, documents, photos.", them: "Anything you build: any formula, any columns, any chart." },
      { topic: "Offline", homeStories: "Works offline, always. No account.", them: "Sheets works offline. On a computer that means Chrome or Edge with the Google Docs Offline extension, set up while online.", source: 1 },
      { topic: "Sharing", homeStories: "Invite a partner or contractor; everyone sees the same project through iCloud (Pro).", them: "Sheets: view, comment or edit permissions, and several people can edit at the same time.", source: 0 },
      { topic: "Photos and receipts", homeStories: "Snap the receipt or the product into the project. A photo timeline with before-and-after.", them: "A spreadsheet is built for figures. Photos and paperwork usually live in another app." },
      { topic: "iPhone app", homeStories: "iPhone and iPad, iOS 17 or later.", them: "Google Sheets needs iOS 17 or later (4.8 from about 1.9 million US ratings). Excel needs iOS 26 or later (4.7 from about 1.5 million).", source: [5, 6] },
    ],
    chooseThem: [
      "You want to model the budget before work starts: what-if scenarios, loan figures, three quotes side by side. A spreadsheet does that better.",
      "Your accountant or lender wants a spreadsheet file, or you share the budget with someone on Windows or Android.",
      "You already have a budget you trust in a sheet. Our own free renovation budget template is an XLSX and CSV file, made for exactly this stage.",
      "Several people need to edit the same figures at the same time, on any device.",
    ],
    chooseUs: [
      "Work has started and you log costs in the shop or on site, from your phone.",
      "You want the receipt, the product photo and the quote attached to the cost, not in a camera roll.",
      "You want tasks with dates, reminders (Pro) and a photo timeline next to the money.",
      "You want a fixed shape that works without setting up columns, formulas or sheets.",
    ],
    together: [
      "Plan in the sheet, run the job in the app. Build the estimate and the contingency in a spreadsheet, or in the free budget template from our downloads page. On the day work starts, create the Home Stories project with that total as its budget, and log from there.",
    ],
    faq: [
      { q: "Is Google Sheets free for a renovation budget?", a: "Yes. Google's Sheets page says anyone with a Google Account can create in Sheets. It works offline too, though on a computer that needs Chrome or Edge and the Google Docs Offline extension." },
      { q: "Do I need to pay for Excel on an iPad?", a: "It depends on the size. Microsoft's support page says the free mobile apps cover core tasks, but a device larger than 10.1 inches needs a qualifying Microsoft 365 subscription. Home Stories is free on iPad, with an optional one-time Pro purchase." },
      { q: "Can I bring my spreadsheet into Home Stories?", a: "Start the project with your spreadsheet's total as the budget, then add the items still to buy and the payments as they happen. Keep the original sheet as the plan you started from." },
      { q: "Can I get my data out of Home Stories?", a: "Yes. Local backups and full data export are free. A PDF report with a cover photo, of the whole project or just the parts you need, is part of Pro." },
    ],
    sources: [
      { label: "Google Sheets product page", url: "https://workspace.google.com/intl/en/products/sheets/" },
      { label: "Google Docs Editors Help: work offline", url: "https://support.google.com/docs/answer/6388102?hl=en" },
      { label: "Microsoft 365 for the web, free", url: "https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web" },
      { label: "Microsoft 365 plans and prices (US)", url: "https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products" },
      { label: "Microsoft Support: when do I need a Microsoft 365 subscription", url: "https://support.microsoft.com/en-us/office/when-do-i-need-a-microsoft-365-subscription-b6518311-893a-4a89-bfcd-bdc56bf52085" },
      { label: "Google Sheets on the US App Store", url: "https://apps.apple.com/us/app/id842849113" },
      { label: "Microsoft Excel on the US App Store", url: "https://apps.apple.com/us/app/id586683407" },
    ],
    post: "renovation-spreadsheet-alternative",
    posts: ["renovation-budget-template", "how-to-track-home-improvement-expenses"],
    publishDate: "2026-11-28",
  },
  {
    slug: "home-stories-vs-trello",
    competitor: "Trello",
    label: "Home Stories vs Trello",
    h1: "Home Stories vs Trello for a home renovation",
    metaTitle: "Home Stories vs Trello for Planning a Home Renovation",
    metaDescription:
      "Trello moves cards across a board. Home Stories adds the money: items with prices, payments and a running total. Plans, limits and when Trello wins.",
    image: "/stock/cmp-trello.webp",
    imageAlt: "Blank paper notes taped in loose columns on a bare plaster wall, a stepladder and a paint tin below",
    intro: [
      "Trello is a board of cards in lists: to do, doing, done. It is a good fit for the many small jobs in a house, and it is free for up to 10 collaborators per workspace. Trello even has its own Kitchen Project template.",
      "Home Stories has tasks too, with due dates, but it is built around the cost of the job. Every item has a price, every payment goes on the total, and the photos and receipts sit in the same project.",
      "If the hard part of your renovation is who does what next, Trello is strong. If the hard part is what it is costing, Home Stories is the closer fit.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "What it is", homeStories: "A renovation tracker: items with prices, payments, tasks, photos, notes and documents.", them: "Boards, lists and cards for any kind of project." },
      { topic: "Price", homeStories: "Free. Pro is a one-time purchase, no subscription.", them: "Free. Standard $5 and Premium $10 per user a month billed yearly ($6 and $12.50 billed monthly). Enterprise $17.50 per user a month billed yearly.", source: 0 },
      { topic: "Free plan limits", homeStories: "Unlimited projects, items, photos, notes and documents.", them: "Up to 10 collaborators and 10 boards per workspace, unlimited cards, files up to 10 MB.", source: 0 },
      { topic: "Dates and views", homeStories: "Tasks with due dates; reminders (Pro). Widgets show what is next.", them: "Calendar, Timeline, Table, Dashboard and Map views are listed on Premium.", source: 0 },
      { topic: "Money", homeStories: "A running total from item prices, payments split into materials, labour and contractor. Budget-vs-actual chart (Pro).", them: "Budgets and costs are not among the features listed on the pricing page.", source: 0 },
      { topic: "Renovation template", homeStories: "No template needed: create a project with a name, a start date and a budget.", them: "A Kitchen Project template made by Trello, marked \"Works best with Premium\".", source: 1 },
      { topic: "Devices", homeStories: "iPhone and iPad only, iOS 17 or later. No account.", them: "iOS and Android apps on every plan. The iPhone app needs iOS 18.6 or later and has a 4.3 average from about 7,100 US ratings.", source: 2 },
    ],
    chooseThem: [
      "Several people share the work and you want to see, at a glance, which job sits with whom.",
      "Your household uses Android or works on computers. Trello has iOS and Android apps; Home Stories is iPhone and iPad only.",
      "You already use Trello at work and like thinking in cards.",
      "The renovation is mostly a long list of small jobs and money is not the worry.",
    ],
    chooseUs: [
      "You want to know what the job costs: each item's price, each payment, the total against the budget.",
      "You want photos in a timeline, with before-and-after, rather than as card attachments.",
      "You want dates and reminders without a per-user monthly plan. Pro is one purchase.",
      "You want time tracking with a Lock Screen timer, and no account.",
    ],
    faq: [
      { q: "Is Trello free for a home renovation?", a: "Trello's Free plan, as checked on 28 November 2026, covers up to 10 collaborators and 10 boards per workspace, with unlimited cards. The Calendar and Timeline views are listed on Premium, which is $10 per user a month billed yearly." },
      { q: "Does Trello have a renovation template?", a: "Trello has a Kitchen Project template made by the Trello team. Its page says it works best with Premium. We did not find a template named home renovation." },
      { q: "Can Home Stories replace a Trello board?", a: "For one renovation, mostly. Home Stories has tasks with due dates, reminders (Pro) and time tracking. It does not have a card board with drag-between-columns, and it is not built for a team's general work." },
      { q: "Can my partner see the project in Home Stories?", a: "Yes, with Pro. Invite a partner, family member or contractor, and everyone sees the same tasks, items and photos, kept in step through iCloud." },
    ],
    sources: [
      { label: "Trello pricing and plan limits", url: "https://trello.com/pricing" },
      { label: "Trello template: Kitchen Project", url: "https://trello.com/templates/personal/kitchen-project-4Y0idQQT" },
      { label: "Trello on the US App Store", url: "https://apps.apple.com/us/app/id461504587" },
    ],
    post: "what-to-track-during-a-renovation",
    posts: ["home-renovation-phases", "renovation-checklist-printable"],
    publishDate: "2026-11-28",
  },
  {
    slug: "home-stories-vs-buildertrend",
    competitor: "Buildertrend",
    label: "Buildertrend for homeowners",
    h1: "Buildertrend for homeowners: what the client portal shows, and what to keep yourself",
    metaTitle: "Buildertrend for Homeowners vs Home Stories",
    metaDescription:
      "Your builder uses Buildertrend. What its client portal shows a homeowner, what it costs you, and the part of the job you still need to track yourself.",
    image: "/stock/cmp-buildertrend.webp",
    imageAlt: "Inside a timber-frame house extension under construction, a folding table with a hard hat and a rolled drawing",
    intro: [
      "Buildertrend is construction software that builders and remodelers pay for. A homeowner does not buy it. If your builder uses it, you get access to its client portal, at no cost to you, and you see what the builder chooses to share.",
      "That portal is useful: the schedule, selections with their allowances and deadlines, change orders to approve and daily logs with photos. It is the builder's system, though, built around the builder's job.",
      "Home Stories is your own record. It holds the things the builder's system does not: what you bought yourself, the other trades, the DIY weekends, and the whole house after the builder has left.",
    ],
    checkedOn: "2026-11-28",
    rows: [
      { topic: "Who pays", homeStories: "You, if you want Pro: one purchase. The rest is free.", them: "The builder. The app is included with the builder's paid subscription, at no extra cost to their team or clients.", source: 4 },
      { topic: "Who it is built for", homeStories: "Homeowners running their own renovation.", them: "Builders who oversee 5 or more projects a year or handle complex, multi-phase builds. Pricing is a custom quote; there is no free trial.", source: 0 },
      { topic: "Schedule", homeStories: "Your tasks with due dates; reminders (Pro).", them: "In the portal, clients see how the project is moving and what is coming next.", source: 2 },
      { topic: "Selections and changes", homeStories: "Save the product, its price and the shop as an item. Keep the signed change order as a document.", them: "Clients see allowances and deadlines, sign for selections and approve change orders in the portal.", source: 2 },
      { topic: "Money", homeStories: "Every payment you make, split into materials, labour and contractor, on one running total.", them: "Budget, invoices and bills are visible only if the builder allows it. Clients can pay the builder from the portal.", source: 2 },
      { topic: "Photos", homeStories: "Your own photo timeline, with before-and-after and a slideshow.", them: "Daily logs from the builder with progress photos and notes.", source: 2 },
      { topic: "Who decides what you see", homeStories: "You. The project is on your device.", them: "The builder decides the level of detail shared and how it is presented.", source: 3 },
      { topic: "iPhone app", homeStories: "iPhone and iPad, iOS 17 or later.", them: "iOS 18 or later, 4.5 average from about 5,100 US ratings.", source: 5 },
    ],
    chooseThem: [
      "Your builder already runs the job in Buildertrend. Ask for portal access on day one; it costs you nothing.",
      "Approving selections and change orders in writing. The portal is where the builder expects that to happen.",
      "Paying the builder's invoices. Buildertrend says clients can pay directly from the portal.",
      "Knowing the builder's schedule. Nobody else has it.",
    ],
    chooseUs: [
      "You buy some of the materials yourself: the tiles, the taps, the light fittings. The builder's system will not hold those.",
      "You have more than one contractor, or do part of the work yourself.",
      "You want the full cost of the renovation, not only the builder's invoices.",
      "You want a record that stays with you after the job, for the next buyer or the insurer.",
    ],
    together: [
      "Use both, with one rule: what you approve in the portal, you log in Home Stories. When you sign a change order, add its price to the project and save the document. When you pay an invoice, log the payment as contractor cost. Then your project total shows the builder's part and everything else in one figure.",
    ],
    faq: [
      { q: "Can a homeowner buy Buildertrend?", a: "It is not sold that way. Buildertrend's pricing page is aimed at builders and gives a custom quote based on builder type, annual revenue and business needs. A homeowner gets access through their builder's client portal." },
      { q: "Is the Buildertrend app free for homeowners?", a: "Yes. Buildertrend says its app is included with the builder's paid subscription, at no extra cost for the team or clients. What you see in it is set by the builder." },
      { q: "Can I see my budget in the Buildertrend client portal?", a: "Only if your builder allows it. Buildertrend's client portal page says builders choose what clients see, and budget, invoices and bills can be switched on or off." },
      { q: "Why keep my own tracker if my builder uses Buildertrend?", a: "Because the builder's system covers the builder's part. The things you buy yourself, other trades and DIY work are not in it, and you decide nothing about what it shows. Home Stories keeps the whole job, with your own photos and documents." },
    ],
    sources: [
      { label: "Buildertrend pricing", url: "https://buildertrend.com/pricing/" },
      { label: "Buildertrend FAQ (quotes and trials)", url: "https://buildertrend.com/frequently-asked-questions/" },
      { label: "Buildertrend client portal", url: "https://buildertrend.com/communication/construction-client-portal/" },
      { label: "Buildertrend house-building software", url: "https://buildertrend.com/house-building-software/" },
      { label: "Buildertrend app", url: "https://buildertrend.com/app/" },
      { label: "Buildertrend on the US App Store", url: "https://apps.apple.com/us/app/id504370616" },
    ],
    post: "best-home-improvement-apps",
    posts: ["managing-contractor-change-orders", "how-to-compare-contractor-quotes"],
    publishDate: "2026-11-28",
  },
];

function isLive(c: Comparison, now = new Date()): boolean {
  return !c.publishDate || new Date(`${c.publishDate}T00:00:00Z`).valueOf() <= now.valueOf();
}

export const comparisons: Comparison[] = allComparisons.filter((c) => isLive(c));
