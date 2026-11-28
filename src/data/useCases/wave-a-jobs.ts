import type { UseCase } from "../useCases";

/**
 * Use cases wave A (#158): job-to-be-done pages for tool-intent searches
 * ("renovation budget tracker", "punch list app"). Two pages a day from
 * 2026-12-01, strongest search intent first.
 *
 * These overlap with how-to posts such as renovation-budget-template and
 * how-to-track-home-improvement-expenses, but the intent differs: the post
 * teaches the method, the page is for someone looking for the tool. Each page
 * lists those posts, and the post page links back (useCasesForPost).
 */
const entries: UseCase[] = [
  {
    slug: "renovation-budget-tracker",
    publishDate: "2026-12-01",
    label: "Renovation budget tracker",
    h1: "A renovation budget tracker that adds up as you spend",
    metaTitle: "Renovation Budget Tracker App for iPhone and iPad",
    metaDescription:
      "Track a renovation budget on your iPhone: set the total, add every item and payment as you go, and see what is spent, what is still to buy and what is left.",
    image: "/stock/uc-renovation-budget-tracker.webp",
    imageAlt: "Tile samples, a tape measure and a notebook on a dining table in a house under renovation",
    intro: [
      "A renovation budget tracker should answer one question at any moment: how much of the budget is left? Home Stories answers it by adding up every item and payment you save to the project, against the budget you set when you created it.",
      "The budget you write on day one is a guess. The tracker's job is to replace the guess with real numbers as they land: the tiles you bought, the deposit you paid, the plumber's invoice. It is free on iPhone and iPad, needs no account and works in your own currency.",
    ],
    track: [
      { title: "One budget, set at the start", body: "Give the project a total when you create it. Put the contingency inside that number, not on top of it, so the remaining figure is honest." },
      { title: "Every item with its price", body: "Each product, material or fixture you save adds its price to the total. The tracker is only as good as the habit of adding things the day you choose them." },
      { title: "Bought and still to buy", body: "Items you have chosen but not bought yet still have a price. They show what the plan will cost before the money has gone." },
      { title: "Materials, labour, contractor", body: "Log each payment under one of the three. When the total runs high, the split shows whether it was the products or the people." },
      { title: "Several rooms at once", body: "One project per room or per job. The project list shows each budget and what is spent, and the totals across all of them." },
    ],
    steps: [
      "Create a project with a name, a start date and the budget, contingency included.",
      "Add each item as you choose it, with its price and the shop.",
      "Log payments when you make them, as materials, labour or contractor.",
      "Add the budget widget to your Home Screen to see progress without opening the app.",
      "With Pro, open the budget-vs-actual chart before each big purchase.",
    ],
    screenshot: {
      src: "/screenshots/budget-chart.webp",
      alt: "Home Stories budget overview (Pro): budget, spent, potential and remaining for a kitchen project",
    },
    faq: [
      { q: "What is the best way to track a renovation budget?", a: "Set one total at the start, contingency included, and record every cost the day it happens, not at the end of the month. An app on your phone makes that easy on site. Home Stories keeps the running total and the amount left for each project." },
      { q: "Is the budget tracker free?", a: "Yes. The budget, the running total, items, payments and the budget widget are free with no limit on projects. The budget-vs-actual chart is part of Pro, a one-time purchase with no subscription." },
      { q: "Can I track the budget for the whole house, not just one room?", a: "Yes. Make one project per room or per job. The project list shows each one's budget and spend, with the combined totals at the bottom." },
      { q: "Why use an app and not a spreadsheet template?", a: "A spreadsheet works if you update it. The app is on the phone in your pocket when you pay, and the price, the photo and the receipt go in at the same time. If you like spreadsheets, the free data export gives you your numbers back." },
    ],
    posts: [
      "renovation-budget-template",
      "renovation-spreadsheet-alternative",
      "how-to-budget-a-home-renovation",
      "renovation-contingency-budget",
    ],
  },
  {
    slug: "before-and-after-photo-app",
    publishDate: "2026-12-01",
    label: "Before-and-after photos",
    h1: "A before-and-after photo app for your renovation",
    metaTitle: "Before and After Photo App for Home Renovations",
    metaDescription:
      "Take before, progress and after photos of a renovation on your iPhone, see them on a dated timeline, compare them side by side and play them as a slideshow.",
    image: "/stock/uc-before-and-after-photo-app.webp",
    imageAlt: "A living room wall half stripped of old floral wallpaper and half freshly painted white",
    intro: [
      "The best before-and-after renovation photos are taken from the same spot, at the same height, before anything is touched. Home Stories keeps them in the project with their date, puts them on a timeline, and shows the before and after side by side.",
      "Tag a photo \"Before\" or \"After\" when you add it and the comparison uses those photos. Untagged, it takes the earliest and the latest. The slideshow plays the whole project from the first photo to the last, which is the version friends and family actually want to see.",
    ],
    track: [
      { title: "The before, before anything moves", body: "Photograph each room on day one, from the doorway and from each corner. Furniture still in place is fine. It is the honest before." },
      { title: "The same spot every time", body: "Pick one place to stand for each view and use it for every photo. Mark it with a bit of tape on the floor if the room will change a lot." },
      { title: "Progress, not just the result", body: "The stripped walls, the new pipes, the first coat of paint. Tag them \"Progress\" and the timeline tells the story in between." },
      { title: "What will be hidden", body: "Cables, pipes and insulation before the walls close. These are not for sharing; they are the record you need later." },
      { title: "The after, on a clear day", body: "Wait until the room is clean and the light is good. Then stand on your tape marks again." },
    ],
    steps: [
      "Create a project for the room and photograph it before work starts. Tag the photos \"Before\".",
      "Add progress photos as the work goes, from the same spots.",
      "When the room is done, take the after photos and tag them \"After\".",
      "Open the side-by-side comparison to see before and after together.",
      "Play the slideshow to show the whole project.",
    ],
    screenshot: {
      src: "/screenshots/photo-timeline.webp",
      alt: "Home Stories project screen with the photo timeline and time-tracked tasks",
    },
    faq: [
      { q: "How do I take good before-and-after photos of a room?", a: "Stand in the same spot at the same height for both, use the same zoom, and shoot in daylight. Take the before photos before you move anything, and wait for a clean room and good light for the after." },
      { q: "Does Home Stories make a side-by-side comparison?", a: "Yes. The project has a side-by-side before-and-after view. It uses the photos you tagged \"Before\" and \"After\", or the earliest and latest photos if you tagged none." },
      { q: "Are the photos stored in the cloud?", a: "No, not unless you choose to. Photos stay on your device. With Pro you can turn on iCloud sync, which runs through your own private iCloud." },
      { q: "Is there a limit on photos?", a: "No. Photos are free and unlimited, as are projects, items, notes and documents." },
    ],
    posts: [
      "documenting-renovation-for-insurance",
      "what-to-track-during-a-renovation",
      "home-renovation-phases",
    ],
  },
  {
    slug: "punch-list-app",
    publishDate: "2026-12-02",
    label: "Punch list and snag list",
    h1: "A punch list app for the end of a renovation",
    metaTitle: "Punch List App for Homeowners: Track Every Snag",
    metaDescription:
      "Make a punch list (snag list) on your iPhone at the end of a renovation: one task per defect, a photo of each, who fixes it and by when, ticked off when done.",
    image: "/stock/uc-punch-list-app.webp",
    imageAlt: "A newly renovated white room with small pieces of blue painter's tape marking defects on the wall and door frame",
    intro: [
      "A punch list, or snag list, is the list of small defects left at the end of a job: a chipped tile, a door that sticks, paint on a socket. In Home Stories each snag is a task in the project, with a photo, a note of who fixes it and a due date, and you tick it off when it is done.",
      "Walk the finished rooms before the last payment, in daylight, with the contractor if you can. A list on your phone, with photos, is harder to argue with than a list from memory, and it stays in the project with the rest of the job.",
    ],
    track: [
      { title: "One task per snag", body: "\"Hairline crack above the bedroom door\" is a task. \"Paint touch-ups\" is not. Small, specific tasks get done; vague ones get argued about." },
      { title: "A photo of each defect", body: "Photograph it close up and from a step back, so the fixer can find it. Painter's tape on the spot helps both of you." },
      { title: "Who fixes it, by when", body: "Put the trade's name in the task and a due date on it. With Pro, the due date can remind you to check." },
      { title: "Room by room, top to bottom", body: "Ceiling, walls, windows, doors, sockets, floor. A fixed order means nothing is missed." },
      { title: "Done, with a date", body: "Tick each task off when it is fixed. The ticked list is your record that the job was finished." },
    ],
    steps: [
      "Open the renovation's project, or create one for the handover.",
      "Walk each room in the same order and add a task for every defect.",
      "Take a photo of each one and add it to the project.",
      "Give each task the trade's name and a due date.",
      "Walk the list again with the contractor and tick off what is fixed.",
    ],
    screenshot: {
      src: "/screenshots/tasks.webp",
      alt: "Home Stories task list with due dates and tracked time",
    },
    faq: [
      { q: "What is a punch list in a renovation?", a: "It is the list of small things left to fix or finish at the end of a job, made by walking the work with the contractor. In the UK it is often called a snag list. It is done before the final sign-off." },
      { q: "When should I make the punch list?", a: "When the contractor says the work is finished, and before the final payment. Check what your contract says about that payment. Walk the rooms in daylight; many defects only show in good light." },
      { q: "Can my contractor see the punch list?", a: "With Pro you can share the project. The people you invite see the same tasks and photos through iCloud, so the contractor can work from the list. Without Pro, show it on your phone or send the photos." },
      { q: "Is a punch list app free?", a: "Home Stories is. Tasks, photos and due dates are free with no limit. Task reminders and project sharing are part of the one-time Pro upgrade." },
    ],
    posts: [
      "renovation-checklist-printable",
      "how-to-plan-a-home-renovation-step-by-step",
      "managing-contractor-change-orders",
    ],
  },
  {
    slug: "renovation-expense-tracker",
    publishDate: "2026-12-02",
    label: "Expense and receipt tracker",
    h1: "Track renovation expenses and keep every receipt with the cost",
    metaTitle: "Renovation Expense and Receipt Tracker App",
    metaDescription:
      "Log each renovation expense on your iPhone the day you pay it, keep the receipt with the cost, and split materials, labour and contractor payments.",
    image: "/stock/uc-renovation-expense-tracker.webp",
    imageAlt: "A brown paper bag of paint rollers, screws and sandpaper on bare floorboards in a room being renovated",
    intro: [
      "A renovation expense tracker is a record of what you paid, when, to whom and for what, with the receipt to prove it. In Home Stories you add the cost to the project the day you pay it and attach the receipt as a document: a PDF, or a photo of the paper slip.",
      "Expenses are not the same as the budget. The budget is the plan; expenses are what actually left your account. Logging them as payments, kept as materials, labour or contractor, means the total is real and the receipts are where you will look for them.",
    ],
    track: [
      { title: "The cost on the day", body: "A trip to the builders' merchant is easy to forget by Friday. Add it before you leave the car park." },
      { title: "The receipt with the cost", body: "Photograph the paper receipt or save the emailed PDF into the project as a document. Paper receipts fade; the photo does not." },
      { title: "Deposits and stage payments", body: "A large item can be paid in parts. Log each payment against the item, so you see what is paid and what is still owed." },
      { title: "Who you paid", body: "Materials from shops, labour by the hour or the day, contractors by quote. The three totals answer different questions." },
      { title: "Invoices and quotes", body: "Keep the contractor's quote beside the invoices. If the two do not match, you want both in one place." },
    ],
    steps: [
      "Create a project for the renovation with its budget.",
      "Add each purchase as an item with the price and the shop.",
      "Log payments as you make them, as materials, labour or contractor.",
      "Save each receipt and invoice as a document in the project.",
      "Use the free data export at the end of the year if you need the numbers elsewhere.",
    ],
    screenshot: {
      src: "/screenshots/items.webp",
      alt: "Home Stories item list: each product with its price, adding up to the project total",
    },
    faq: [
      { q: "How do I keep track of renovation receipts?", a: "Save each one into the project the day you get it: a photo of a paper receipt or the PDF of an emailed one. Home Stories keeps receipts as documents in the same project as the costs, so you do not need a separate folder or shoebox." },
      { q: "Can I separate materials from labour?", a: "Yes. When you log a payment you keep materials, labour and contractor costs apart, so you see each total on its own." },
      { q: "Do I need the receipts for tax?", a: "It depends on your country and on whether the property is your home, a rental or a flip. Keep them all, and ask an accountant or your tax authority what you can claim. Home Stories does not give tax advice." },
      { q: "Can I get my expenses out of the app?", a: "Yes. A full data export is free. A formatted PDF report of the project, with the items and the budget, is part of Pro." },
    ],
    posts: [
      "how-to-track-home-improvement-expenses",
      "how-to-organize-renovation-receipts",
      "renovation-spreadsheet-alternative",
    ],
  },
  {
    slug: "appliance-warranty-tracker",
    publishDate: "2026-12-03",
    label: "Warranties and manuals",
    h1: "Keep appliance warranties and manuals where you can find them",
    metaTitle: "Appliance Warranty and Manual Organizer App",
    metaDescription:
      "Keep each appliance's receipt, warranty, manual and model number on your iPhone, next to what it cost, so a claim takes minutes, not a search of the house.",
    image: "/stock/uc-appliance-warranty-tracker.webp",
    imageAlt: "A new washing machine and dryer stacked in a utility room beside a new wall-hung boiler, with packaging on the floor",
    intro: [
      "When an appliance breaks under warranty, the manufacturer asks for three things: the model number, the serial number and proof of purchase. In Home Stories each appliance is an item, and the receipt, the warranty card and the manual are documents on that item.",
      "Do it the day the appliance arrives. The box is still there, the rating plate is easy to reach, and the receipt has not gone into a drawer. Two minutes then saves a search of the house when the dishwasher stops in three years' time.",
    ],
    track: [
      { title: "The rating plate", body: "Photograph the sticker with the model and serial number. It is often inside the door or at the back, where you will not want to look later." },
      { title: "Proof of purchase", body: "Save the receipt or the order confirmation on the item. Warranties start from the purchase date, not the day you fitted it." },
      { title: "The warranty terms", body: "How long, what it covers, and whether the product has to be registered. Note the end date in the item's note." },
      { title: "The manual as a PDF", body: "Download it from the maker's site and save it on the item. Paper manuals go missing; the PDF stays with the appliance." },
      { title: "Who installed it", body: "Some warranties depend on professional installation. Keep the installer's name and invoice with the appliance." },
    ],
    steps: [
      "Create a project called \"Appliances\", or add them to the renovation they belong to.",
      "Add each appliance as an item with its price, the shop and the purchase date.",
      "Photograph the rating plate and the box label.",
      "Attach the receipt, the warranty and the manual as documents.",
      "Write the warranty end date and the installer in the item's note.",
    ],
    screenshot: {
      src: "/screenshots/note-detail.webp",
      alt: "A Home Stories note with a title, tags and text",
    },
    faq: [
      { q: "What do I need to make a warranty claim on an appliance?", a: "Usually the model number, the serial number and proof of purchase. Check the warranty terms for the rest. Keeping all three with the appliance in one app means you have them when you call." },
      { q: "Can I store PDF manuals in Home Stories?", a: "Yes. Documents can be PDFs or images, and you can attach them to the item they belong to. On iPad you can drag a PDF straight in from Safari or Files." },
      { q: "Will the app remind me when a warranty runs out?", a: "There is no warranty field. You can add a task with the end date as its due date; with Pro the task can send a reminder." },
      { q: "What happens to the warranties if I change phone?", a: "Make a local backup, which is free, or turn on iCloud sync (Pro) and the items and documents reach your other devices." },
    ],
    posts: [
      "documenting-renovation-for-insurance",
      "home-maintenance-schedule",
      "how-to-organize-renovation-receipts",
    ],
  },
  {
    slug: "renovation-photo-journal",
    publishDate: "2026-12-03",
    label: "Renovation diary and photo journal",
    h1: "A renovation diary that writes itself from your photos",
    metaTitle: "Renovation Diary and Photo Journal App",
    metaDescription:
      "Keep a renovation diary on your iPhone: dated photos, notes on what was done and decided, and the hours worked, all on one timeline for each project.",
    image: "/stock/uc-renovation-photo-journal.webp",
    imageAlt: "An old hallway mid-renovation with stripped floorboards, a freshly plastered wall and a sanded staircase",
    intro: [
      "A renovation diary is the day-by-day record of what was done, what was found and what was decided. In Home Stories the photos you take build a dated timeline on their own, and notes hold the words: the decision about the tiles, the rotten joist under the bath, the plumber's advice.",
      "Most people mean to keep a diary and stop in week two, because writing takes time on site. A photo takes five seconds. Take one at the end of each day, add a line when something was decided, and the diary is there when you need it.",
    ],
    track: [
      { title: "A photo at the end of each day", body: "One wide shot of the room, from the same spot. Over weeks, that row of photos is the diary." },
      { title: "Decisions, with the reason", body: "\"Moved the socket 30 cm left for the desk.\" A short note with the date stops the same argument in a year." },
      { title: "What you found", body: "Old wiring, a hidden beam, damp under the floor. Photograph it and write what was done about it." },
      { title: "The hours", body: "Log the time on each job, yours or the trades'. It turns the diary into a record of effort as well as progress." },
      { title: "Tags for later", body: "Tag photos \"Problem\", \"Solution\" or \"Detail\" so you can pull the useful ones out of hundreds." },
    ],
    steps: [
      "Create a project for the renovation with a start date.",
      "Take a photo at the end of each working day.",
      "Add a note whenever something is decided or found.",
      "Log the hours on each job with the built-in timer.",
      "Look back at the timeline, or play it as a slideshow when the job is done.",
    ],
    screenshot: {
      src: "/screenshots/photo-timeline-560.webp",
      alt: "A kitchen project in Home Stories with dated progress photos and logged hours",
    },
    faq: [
      { q: "What should I write in a renovation diary?", a: "The date, what was done, what was found and what was decided, with the reason. Add a photo of each. You do not need full sentences; one line a day is enough to rebuild the story later." },
      { q: "Can I keep the diary with my partner?", a: "Yes, with Pro. Share the project and you both add photos and notes to the same timeline, kept in step through iCloud." },
      { q: "Can I turn the diary into something to keep?", a: "The slideshow plays the photos in order. With Pro you can export the project as a PDF report with a cover photo, the photos and the notes." },
    ],
    posts: [
      "what-to-track-during-a-renovation",
      "home-renovation-phases",
      "notion-for-home-renovation",
    ],
  },
  {
    slug: "interior-design-shopping-list",
    publishDate: "2026-12-04",
    label: "Interior design shopping list",
    h1: "Save furniture and decor from any shop into one shopping list",
    metaTitle: "Interior Design Shopping List App: Save from Any Store",
    metaDescription:
      "Share products from Safari, IKEA or Amazon into one shopping list on your iPhone, or snap them in the store, with the price, the shop and what they add up to.",
    image: "/stock/uc-interior-design-shopping-list.webp",
    imageAlt: "A partly furnished living room with a sofa still in plastic wrap, a rolled rug, a floor lamp and flat-pack boxes",
    intro: [
      "An interior design shopping list collects products from many shops in one place, with the price of each, so you can compare and see the total before you buy. In Home Stories you share a product page from Safari, IKEA or Amazon straight into a project, or photograph it in the store with the price and a note.",
      "Saving to a browser tab, a screenshot and a note app is how a room plan gets lost. One list per room, with the prices adding up, shows whether the sofa you love leaves room in the budget for the rug.",
    ],
    track: [
      { title: "Products from any website", body: "Use the Share button on a product page in Safari, or in the IKEA or Amazon app, and pick Home Stories. The item lands in the project." },
      { title: "Things you saw in a shop", body: "Photograph the lamp, add the price and the shop. You will not remember which of four shops it was." },
      { title: "Two or three options", body: "Save the candidates for the same spot side by side. Delete the losers once you decide." },
      { title: "Measurements", body: "Put the size of the alcove, the wall and the doorway in a note. Check every big piece against it before you order." },
      { title: "Bought and still to buy", body: "Tick off what you have bought. What is left shows what the room still needs, and what it will cost." },
    ],
    steps: [
      "Create a project for the room, with a budget.",
      "Share products into it from Safari, IKEA or Amazon as you browse.",
      "Photograph pieces you find in shops and add the price.",
      "Write the room's measurements in a note.",
      "Mark items as bought when you order them.",
    ],
    screenshot: {
      src: "/screenshots/items.webp",
      alt: "Home Stories item list: products from several shops with prices, the bought ones ticked",
    },
    faq: [
      { q: "How do I save products from different websites in one list?", a: "Install Home Stories, open a product page in Safari or a shopping app, tap Share and choose Home Stories. The product goes into the project you pick. On iPad you can also drag a link in from Safari." },
      { q: "Does it work with IKEA and Amazon?", a: "Yes. You can share a product straight from Safari, Amazon or IKEA into a project." },
      { q: "Can I share the list with my partner?", a: "Yes, with Pro. Project sharing lets you both add to the same list and see the same total." },
      { q: "Is it only for renovations?", a: "No. A project can be any room or plan: a living room refresh, a nursery, a first flat. The list works the same way." },
    ],
    posts: [
      "best-home-improvement-apps",
      "how-to-track-home-improvement-expenses",
      "renovation-budget-template",
    ],
  },
  {
    slug: "paint-color-tracker",
    publishDate: "2026-12-04",
    label: "Paint colour and material log",
    h1: "Keep a log of every paint colour and material in your home",
    metaTitle: "Paint Color and Material Log App for Your Home",
    metaDescription:
      "Record the paint brand, colour, code and finish for each room on your iPhone, with the tiles, flooring and wallpaper, so touch-ups and repairs match.",
    image: "/stock/uc-paint-color-tracker.webp",
    imageAlt: "Open paint tins in soft colours on a dust sheet in front of a wall with square test patches",
    intro: [
      "A paint and material log records what is on each wall and floor: the brand, the colour name and code, the finish, and where you bought it. Keep it in Home Stories as a note per room, with a photo of the tin lid, and you can buy a matching tin years later.",
      "Paint is the obvious one, but the same goes for tiles, grout, flooring, wallpaper and worktops. All of them get discontinued or change between batches. The day you need the name is the day you scuffed the wall or cracked a tile, and the tin has long gone to the tip.",
    ],
    track: [
      { title: "Brand, colour name and code", body: "\"Warm white\" is not enough. The brand and the code on the tin are what the shop needs to mix it again." },
      { title: "Finish and sheen", body: "Matt on the walls, eggshell on the woodwork, satin in the bathroom. A wrong sheen shows as much as a wrong colour." },
      { title: "Which wall, which room", body: "Feature walls, ceilings and doors are often different. Write it room by room." },
      { title: "A photo of the label", body: "Photograph the lid or the label before the tin is used up. It carries the code and often the batch." },
      { title: "The other finishes", body: "Tile and grout names, the flooring range, the wallpaper roll number. Same note, same habit." },
    ],
    steps: [
      "Create a project called \"Paint and materials\" for the house, or use the renovation's project.",
      "Add a note for each room with the brand, colour, code and finish of each surface.",
      "Photograph each tin label and each tile box label.",
      "Tag the notes with the room name so they are easy to find.",
      "Update the note each time you repaint.",
    ],
    screenshot: {
      src: "/screenshots/note-detail.webp",
      alt: "A Home Stories design note with tags, listing cabinet colours, hardware and the backsplash",
    },
    faq: [
      { q: "How do I keep track of paint colours in my house?", a: "Write down the brand, the colour name, the code and the finish for each wall, room by room, and photograph the tin label. A note per room in Home Stories keeps it on your phone, which is where you are when you stand in the paint shop." },
      { q: "Can I use the app in the paint shop?", a: "Yes. The notes and photos are on your phone and work offline, so you can read the code to the person at the mixing machine." },
      { q: "Does Home Stories match or suggest paint colours?", a: "No. It is a log, not a colour tool. It keeps what you chose so you can buy it again." },
    ],
    posts: [
      "what-to-track-during-a-renovation",
      "home-maintenance-schedule",
      "renovation-checklist-printable",
    ],
  },
  {
    slug: "house-logbook",
    publishDate: "2026-12-05",
    label: "Home history logbook",
    h1: "A house logbook: the history of your home, job by job",
    metaTitle: "House Logbook App: Your Home's Work History",
    metaDescription:
      "A logbook of your home on your iPhone: every renovation, repair and service with its date, cost, photos and paperwork, ready for a buyer or an insurer.",
    image: "/stock/uc-house-logbook.webp",
    imageAlt: "The front of an older brick terraced house with a newly painted front door and new sash windows",
    intro: [
      "A house logbook is the history of everything done to a home: what was renovated, repaired or replaced, when, by whom and for how much. In Home Stories each job is a project with its own dates, costs, photos and documents, and the project list is the logbook.",
      "Most homes have this history in a drawer, an inbox and the previous owner's memory. A buyer, a surveyor or an insurer asks for it at the worst moment. Built up one job at a time, it costs nothing and it is ready when they ask.",
    ],
    track: [
      { title: "One project per job", body: "\"New boiler 2026\", \"Roof repair\", \"Bathroom\". Each with its start date, what it cost and who did it." },
      { title: "Certificates and guarantees", body: "Electrical certificates, gas safety records, damp-proofing and roofing guarantees. Keep them as documents on the job." },
      { title: "What is behind the walls", body: "Photos of the pipes, cables and insulation before they were covered. They are the part of the history nobody can see." },
      { title: "Regular servicing", body: "The boiler service, the chimney sweep, the gutters. A task with a due date for each, ticked off with the date." },
      { title: "Who did the work", body: "The firm, the person and the phone number in a note. When it needs fixing, you call the one who fitted it." },
    ],
    steps: [
      "Create a project for each job you have records for, with its date.",
      "Add the cost, the invoice and any certificate to the project.",
      "Add the photos you have, old ones included.",
      "Create a new project each time work is done.",
      "Make a local backup now and then; it is free.",
    ],
    screenshot: {
      src: "/screenshots/projects-list.webp",
      alt: "Home Stories project list, each project with its budget",
    },
    faq: [
      { q: "What should a house logbook include?", a: "Every job done to the house with its date, its cost and who did it, plus the paperwork: invoices, certificates, guarantees and manuals. Photos of hidden work, such as pipes and cables, are worth as much as the paperwork." },
      { q: "Why keep a history of work on my home?", a: "It answers the questions a buyer, a surveyor or an insurer asks, it tells you which firm to call when something fails, and it shows what the house has cost you over the years." },
      { q: "Can I hand the logbook to a buyer?", a: "With Pro you can export any project as a PDF report with photos, costs and notes, and share it. The full data export is free." },
      { q: "What if I sell the house and my phone changes?", a: "Your projects stay on your device. Make a local backup or a full data export, both free, or turn on iCloud sync (Pro)." },
    ],
    posts: [
      "home-maintenance-schedule",
      "documenting-renovation-for-insurance",
      "hidden-costs-older-home",
    ],
  },
  {
    slug: "furnishing-a-new-home",
    publishDate: "2026-12-05",
    label: "Furnishing a new home",
    h1: "Furnish a new home with one shopping list and one budget",
    metaTitle: "Furnishing a New Home: Shopping List and Budget App",
    metaDescription:
      "Furnish a new home room by room: a shopping list of what each room needs, the price of each piece, what you have bought and what the rest will cost.",
    image: "/stock/uc-furnishing-a-new-home.webp",
    imageAlt: "An empty bright living room just moved into, with stacked cardboard boxes, one armchair and a bare light bulb",
    intro: [
      "Furnishing a new home is a long shopping list with a fixed budget: beds, a sofa, a table, curtains, lamps and a hundred small things, often all at once after a move. Home Stories keeps the list room by room, with the price of each piece, so you see what is bought, what is left and what it will cost.",
      "Most of the money goes in the first month, when every room is empty and every shop has a sale. A list with prices on it lets you buy what you need first, and wait for what you only want.",
    ],
    track: [
      { title: "Room by room", body: "One project for the home, with tags for each room, or one project per room if each has its own budget." },
      { title: "Need first, want later", body: "A bed, curtains and a table on day one. The armchair and the art can wait. Put the first group at the top." },
      { title: "The price before you buy", body: "Add pieces with their price as you find them. The total of what is still to buy is the number to watch." },
      { title: "Measurements of the new place", body: "Doorways, the stair turn, the bedroom wall. A note with the sizes stops the sofa that does not fit through the door." },
      { title: "Delivery dates and receipts", body: "Big pieces come weeks later. Keep the order and the delivery date, and the receipt as a document for returns." },
    ],
    steps: [
      "Create a project for the new home with the furnishing budget.",
      "Walk the rooms and add what each needs as items, with a price where you know it.",
      "Measure doorways, stairs and walls and write them in a note.",
      "Mark items as bought when you order, and add the delivery as a task.",
      "Save receipts as documents in case something goes back.",
    ],
    screenshot: {
      src: "/screenshots/tasks-560.webp",
      alt: "A Home Stories project with its task list, items and running total",
    },
    faq: [
      { q: "What should I buy first when furnishing a new home?", a: "What you need to live there: a bed, a way to cook and eat, curtains or blinds for the bedroom, and lighting. Most of the rest can wait until you know how you use the rooms." },
      { q: "How do I budget for furnishing a new home?", a: "Set one total, list what each room needs with a price, and watch what is left to buy against what is left in the budget. Home Stories keeps the running total for you." },
      { q: "Can I add products from online shops?", a: "Yes. Share a product page from Safari, IKEA or Amazon into the project, with its price." },
    ],
    posts: [
      "where-to-start-renovating-new-house",
      "moving-into-a-fixer-upper",
      "how-to-budget-a-home-renovation",
    ],
  },
  {
    slug: "diy-time-tracker",
    publishDate: "2026-12-06",
    label: "DIY hours and time tracking",
    h1: "Track the hours you put into DIY, with a timer on your Lock Screen",
    metaTitle: "DIY Time Tracker: Log Your Renovation Hours",
    metaDescription:
      "Time your own DIY and renovation work on your iPhone, with a Lock Screen timer and the Dynamic Island, and see how many hours each job really took.",
    image: "/stock/uc-diy-time-tracker.webp",
    imageAlt: "A garage workbench with hand tools and a drill, and an old wooden door half sanded on two trestles",
    intro: [
      "DIY saves money by spending your time, and most people have no idea how much time. Home Stories has a timer built into each project: start it when you pick up the tools, and it runs on the Lock Screen and in the Dynamic Island (iPhone 14 Pro and later) until you stop.",
      "The hours answer real questions. Was it worth doing the floor yourself? How many weekends will the next room take? How much of the project was your own work? The total for each project sits next to what it cost.",
    ],
    track: [
      { title: "A timer per job", body: "Start it when you begin sanding, stop it when you put the tools away. Breaks for coffee are up to you." },
      { title: "Time you forgot to time", body: "Add the hours afterwards with the date, for the Saturday the phone stayed in the house." },
      { title: "A note on what was done", body: "\"Sanded and primed two doors.\" The note turns hours into a pace you can plan with." },
      { title: "Your hours against a quote", body: "Put a trade's quote for the same job next to your hours. That is the real DIY-or-hire comparison." },
      { title: "The hours on the project", body: "Each project shows its total time, and the project list shows time across all of them." },
    ],
    steps: [
      "Open the project, or create one for the job.",
      "Start the timer when you start work. Check it on the Lock Screen.",
      "Stop it when you finish and add a short note.",
      "Add any hours you forgot to time, with the date.",
      "Compare the total with what a trade quoted, before the next job.",
    ],
    screenshot: {
      src: "/screenshots/photo-timeline-840.webp",
      alt: "A Home Stories project with its time log: hours per job, dated, under the progress photos",
    },
    faq: [
      { q: "How do I track time spent on DIY?", a: "Start a timer when you start work and stop it when you finish, and note what you did. Home Stories has a timer in each project that shows on the Lock Screen, so you can check it without unlocking the phone." },
      { q: "Does the timer work in the Dynamic Island?", a: "Yes, on iPhone 14 Pro and later. On other iPhones it shows on the Lock Screen." },
      { q: "Is time tracking free?", a: "Yes. Time tracking, the Lock Screen timer and widgets are free. The time section in the PDF report is part of Pro." },
      { q: "Should I count my own hours as a cost?", a: "That is up to you. Even if you never put a price on them, the hours show how long the next job will take, and whether a trade's quote is fair for the work." },
    ],
    posts: [
      "diy-vs-hire-contractor",
      "how-to-track-home-improvement-expenses",
      "how-to-plan-a-home-renovation-step-by-step",
    ],
  },
  {
    slug: "renovation-pdf-report",
    publishDate: "2026-12-06",
    label: "Renovation PDF report (Pro)",
    h1: "Make a renovation report for a lender, a buyer or a co-owner",
    metaTitle: "Renovation Report PDF: Costs, Photos and Tasks (Pro)",
    metaDescription:
      "Turn a renovation project into a PDF report (Pro) with a cover photo, the budget, items and purchases, tasks, hours, notes and photos, to share with anyone.",
    image: "/stock/uc-renovation-pdf-report.webp",
    imageAlt: "A finished open-plan kitchen and dining room with a herringbone oak floor and a wooden table",
    intro: [
      "A renovation report shows what was done, what it cost and what it looks like now, in one document someone else can read. With Home Stories Pro you export a project as a PDF with a cover photo, and choose which sections go in: the budget overview, items and purchases, tasks, time tracking, notes and the photo gallery.",
      "Different readers want different parts. A buyer or an estate agent wants the photos and the list of work. A co-owner or a family member who paid part wants the costs. A lender or an insurer may ask for both. Ask them what they need, then leave out the rest.",
    ],
    track: [
      { title: "A cover photo", body: "Use the best after photo. It is the first thing the reader sees." },
      { title: "The budget overview", body: "The budget, what was spent and how. For anyone who paid a share, it answers the first question." },
      { title: "Items and purchases", body: "What was bought and from where. For a buyer, it is the list of new appliances and fittings." },
      { title: "Photos of the work", body: "Before, during and after. The photos of hidden work show what was done inside the walls." },
      { title: "Tasks, time and notes", body: "Include them for a full record. Leave them out for a short report." },
    ],
    steps: [
      "Finish the project: add the last photos and payments.",
      "Pick the cover photo.",
      "Open the PDF export (Pro) and turn each section on or off.",
      "Check the page count in the preview.",
      "Generate the PDF and share it by mail, Messages or AirDrop, or save it to Files.",
    ],
    screenshot: {
      src: "/screenshots/export-pdf.webp",
      alt: "Home Stories PDF report export (Pro): the sections to include and the page count",
    },
    faq: [
      { q: "What should a renovation report include?", a: "What was done, when, by whom and what it cost, with photos before and after. Add certificates and guarantees separately if the reader asks for them. Home Stories puts the costs, items, tasks, hours, notes and photos of a project into one PDF (Pro)." },
      { q: "Is PDF export free?", a: "No. PDF export is part of Pro, a one-time purchase with no subscription. The full data export, which gives you all your data in the app's own format, is free." },
      { q: "Can I choose which parts go in the report?", a: "Yes. You turn each section on or off before you export: budget, tasks, items and purchases, time tracking, notes and photos. The cover page and the summary are always included." },
      { q: "Will a lender or buyer accept the report?", a: "That is up to them. The report is a clear record of the work, not an official document. Ask what they need; some will also want invoices or certificates, which you can keep as documents in the project." },
    ],
    posts: [
      "documenting-renovation-for-insurance",
      "how-to-organize-renovation-receipts",
      "managing-contractor-change-orders",
    ],
  },
];

export default entries;
