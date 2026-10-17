/**
 * Use-case landing pages. Slugs here are the canonical /use-cases/<slug>/ URLs.
 * /llms.txt and /llms-full.txt list them from this file.
 *
 * Every page must stand on its own: its own intro, its own list of what to keep,
 * its own FAQ. Do not copy a block between entries — near-duplicate pages are
 * what Google's scaled-content policy looks for.
 *
 * Only claim what the app does today (see the App Store description). Pro
 * features are marked "(Pro)" in the copy every time they are mentioned.
 * Post slugs must exist in src/content/blog — the page throws if one is missing.
 */
export interface UseCase {
  slug: string;
  /** Short label for the hub, sibling links and the footer. */
  label: string;
  /** Search-intent H1. */
  h1: string;
  /** <title>, under ~60 characters. */
  metaTitle: string;
  /** Meta description, under ~160 characters. */
  metaDescription: string;
  /** Hero photo, from /public/stock. */
  image: string;
  imageAlt: string;
  /** Answer-first intro. 2–3 short paragraphs an answer engine can quote. */
  intro: string[];
  /** What to keep in the project for this job. */
  track: { title: string; body: string }[];
  /** How to set the project up in Home Stories, in order. */
  steps: string[];
  /** App screenshot shown beside the steps. */
  screenshot: { src: string; alt: string };
  faq: { q: string; a: string }[];
  /** Related published post slugs. */
  posts: string[];
}

export const useCases: UseCase[] = [
  {
    slug: "kitchen-renovation",
    label: "Kitchen renovation",
    h1: "A kitchen renovation tracker for the budget, the trades and the photos",
    metaTitle: "Kitchen Renovation Tracker App for iPhone and iPad",
    metaDescription:
      "Track a kitchen renovation on your iPhone: the budget, every appliance and worktop price, the trade sequence, quotes and before-and-after photos.",
    image: "/stock/06.webp",
    imageAlt: "A kitchen with new white cabinets and stone worktops fitted, the floor still unfinished",
    intro: [
      "A kitchen is the renovation with the most line items: cabinets, worktops, appliances, sink, taps, tiles, lighting, plus the plumber, the electrician and the fitter. Home Stories keeps each of them as an item with a price, so the running total is always the real one.",
      "The schedule matters as much as the money. Plumbing and electrics go in before the cabinets, and the worktop template waits for the cabinets. Put each step in as a task with a date, and you see which trade is holding up the next.",
    ],
    track: [
      { title: "Every product, with its price", body: "Snap the sink in the showroom, or share the appliance page from Safari. The price, the shop and a note go on the item, and the item goes on the total." },
      { title: "Labour apart from materials", body: "Log what you pay the fitter and the electrician as labour. The split shows if the quote for fitting was low and the materials ate the budget." },
      { title: "Quotes and the worktop order", body: "Keep the kitchen supplier's quote, the worktop order and the delivery note as documents in the same project." },
      { title: "The trade sequence", body: "Strip-out, first-fix plumbing and electrics, plastering, cabinets, worktop template, worktop fit, splashback, second fix. One task each." },
      { title: "Before and after", body: "Photograph the old kitchen before the strip-out. The side-by-side comparison at the end is the picture everyone asks for." },
    ],
    steps: [
      "Create a project called \"Kitchen\", with a start date and your total budget.",
      "Add an item for each cabinet run, appliance, worktop and fitting as you choose it.",
      "Add the trade sequence as tasks with due dates.",
      "Log each payment as materials, labour or contractor.",
      "Add photos at each stage. The timeline builds itself.",
    ],
    screenshot: { src: "/screenshots/items.webp", alt: "Home Stories item list: each product with its price, adding up to the project total" },
    faq: [
      { q: "Can I track a kitchen renovation budget on my iPhone?", a: "Yes. Create a project with a budget, add each appliance, cabinet and fitting as an item with a price, and Home Stories keeps the running total. It is free, works offline and needs no account." },
      { q: "How do I keep appliance and cabinet prices in one place?", a: "Add each one as an item. You can take a photo in the store or share a product page from Safari, Amazon or IKEA straight into the project, with the price, the shop and a note." },
      { q: "Can I see if the kitchen is going over budget?", a: "The running total is free and always visible. The budget-vs-actual chart, which shows the overrun coming, is part of the optional one-time Pro upgrade." },
    ],
    posts: [
      "how-long-does-a-kitchen-renovation-take",
      "kitchen-renovation-timeline",
      "how-to-budget-a-home-renovation",
    ],
  },
  {
    slug: "bathroom-remodel",
    label: "Bathroom remodel",
    h1: "Plan and track a bathroom remodel, from strip-out to the last tile",
    metaTitle: "Bathroom Remodel Planner and Tracker App",
    metaDescription:
      "Plan a bathroom remodel on iPhone and iPad: tiles, fittings and labour on one budget, the waterproofing sequence as tasks, and photos of the pipes before they disappear.",
    image: "/stock/31.webp",
    imageAlt: "A new white bathtub standing in a bathroom under renovation, exposed wooden studs and copper pipes in the wall",
    intro: [
      "A bathroom is a small room with a long sequence. Strip-out, plumbing, waterproofing, drying time, tiling and fitting all have to happen in order, and most of the cost is labour you cannot see once the tiles are on.",
      "Home Stories keeps the tiles, the fittings and the labour on one budget, and the sequence as tasks. The most useful habit is a photo of every pipe and the waterproofing before the wall closes. That photo is the one you need in five years.",
    ],
    track: [
      { title: "Photos of what goes behind the wall", body: "Pipe runs, the waterproofing membrane, the floor drain. Take them on the day and they sit on the timeline with the date." },
      { title: "Tiles by the square metre", body: "Add the tiles, the adhesive and the grout as items. Note the tile name and batch number, so you can buy more that match." },
      { title: "Fittings and their documents", body: "Keep the shower, the toilet and the basin as items, and the manuals and warranty cards as documents." },
      { title: "Drying time as a task", body: "The waterproofing and the screed need time to cure. A task with a date stops the tiler from starting a day early." },
      { title: "Plumber and tiler apart", body: "Log each trade's payments as labour or contractor, so the final cost per trade is clear." },
    ],
    steps: [
      "Create a \"Bathroom\" project with a start date and a budget.",
      "Photograph the room before the strip-out.",
      "Add the tiles, the fittings and the materials as items with prices.",
      "Add the sequence as tasks, with drying time as its own task.",
      "Photograph the pipes and the waterproofing before the walls close.",
    ],
    screenshot: { src: "/screenshots/photo-timeline.webp", alt: "Home Stories project screen with the photo timeline and time-tracked tasks" },
    faq: [
      { q: "What should I photograph during a bathroom remodel?", a: "Everything that the tiles will cover: the pipe runs, the waterproofing membrane, the floor drain and any electrical cable near the shower. Those photos are the record if a leak appears later." },
      { q: "Can I keep the tile batch number in the app?", a: "Yes. Add the tiles as an item and put the name, the colour and the batch number in the note. You will need it if a tile cracks and you buy more." },
      { q: "Is Home Stories free for a single bathroom project?", a: "Yes. Projects, items, photos, notes, documents and tasks are free with no limit. Pro is an optional one-time purchase for the chart, reminders, PDF export, iCloud sync and sharing." },
    ],
    posts: [
      "how-long-does-a-bathroom-renovation-take",
      "bathroom-renovation-sequence",
      "what-to-track-during-a-renovation",
    ],
  },
  {
    slug: "loft-conversion",
    label: "Loft and attic conversion",
    h1: "Keep a loft or attic conversion on budget and on record",
    metaTitle: "Loft and Attic Conversion Tracker App",
    metaDescription:
      "Track a loft or attic conversion: the structural work, the stairs, insulation and windows on one budget, building-control stages as tasks, and a dated photo record.",
    image: "/stock/27.webp",
    imageAlt: "A timber-framed loft conversion under construction, showing exposed roof trusses and new floor joists",
    intro: [
      "A loft or attic conversion is structural work first and a room second. New joists, steel, a staircase, roof windows and insulation all come before the plasterboard, and many of them need a building-control or inspection sign-off.",
      "Home Stories keeps the structural engineer's drawings, the inspection stages and the costs in one project. The dated photos of the joists, the steel and the insulation are the proof that the hidden work was done as drawn.",
    ],
    track: [
      { title: "Drawings and calculations", body: "Keep the structural engineer's drawings and calculations as documents, so they are on site when the builder asks." },
      { title: "Inspection stages", body: "Add each inspection as a task with a date. The next stage of work waits for the sign-off." },
      { title: "Photos of the structure", body: "Joists, steel, fire protection and insulation, photographed before the boards go up." },
      { title: "The big-ticket items", body: "Stairs, roof windows and insulation are the largest material costs. Each gets an item with its price." },
      { title: "Stage payments", body: "Builders on a loft usually invoice in stages. Log each stage payment as contractor." },
    ],
    steps: [
      "Create a \"Loft conversion\" project with the budget from your quotes.",
      "Add the drawings, calculations and approvals as documents.",
      "Add each building stage and inspection as a task.",
      "Log stage payments when you pay them.",
      "Photograph each stage before it is covered.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "How do I keep track of a loft conversion?", a: "Keep one project with the budget, the stage payments, the inspection dates and the drawings. Home Stories holds all of them on your iPhone or iPad and works offline on site." },
      { q: "Why photograph the joists and insulation?", a: "Once the plasterboard is on, nobody can see them. Dated photos show what was built, which helps with an inspection, a later repair or a sale." },
      { q: "Can I share the project with my builder?", a: "Yes, with Pro. Project sharing lets you invite a partner, a family member or a contractor, and everyone sees the same tasks, items and photos through iCloud." },
    ],
    posts: [
      "how-long-does-a-loft-conversion-take",
      "do-i-need-a-permit-for-a-home-renovation",
      "home-renovation-phases",
    ],
  },
  {
    slug: "basement-conversion",
    label: "Basement conversion",
    h1: "Track a basement conversion, from damp-proofing to the finished room",
    metaTitle: "Basement Conversion and Finishing Tracker App",
    metaDescription:
      "Finish or convert a basement with one record: damp-proofing, framing, electrics and flooring on a budget, with photos of the walls before they are covered.",
    image: "/stock/41.webp",
    imageAlt: "An unfinished basement with insulated timber stud walls, a small high window and a bare concrete floor",
    intro: [
      "A basement conversion is won or lost on moisture. The damp-proofing, the drainage and the insulation are the expensive parts, and they are all hidden once the room is finished.",
      "Home Stories keeps those costs apart from the finishes, so you see what the dry room cost before the carpet. The photos of the membrane and the sump are the record you want if water ever comes back.",
    ],
    track: [
      { title: "Moisture work first", body: "Tanking, membrane, sump pump and drainage as their own items, so their cost stays visible." },
      { title: "Photos of the walls and floor", body: "Photograph the membrane, the drainage and the insulation before the stud walls are boarded." },
      { title: "Electrics and ventilation", body: "Keep the electrician's certificate and the fan's manual as documents." },
      { title: "Finishes on their own", body: "Flooring, lighting and paint as items, so you can cut back here if the moisture work ran over." },
    ],
    steps: [
      "Create a \"Basement\" project with a budget and a contingency.",
      "Add the moisture work as items before anything else.",
      "Photograph the walls and the floor at each stage.",
      "Keep certificates and warranties as documents.",
      "Add the finishes last.",
    ],
    screenshot: { src: "/screenshots/budget-chart.webp", alt: "Home Stories budget vs actual chart (Pro)" },
    faq: [
      { q: "What is the most important thing to record in a basement conversion?", a: "The moisture work: the membrane, the drainage and the sump. Photograph it before it is covered and keep the warranty as a document." },
      { q: "Can I set a contingency for hidden problems?", a: "Yes. Set the project budget to include the contingency, and keep the moisture work as its own items so you see how much of the contingency it used." },
      { q: "Does the app work in a basement with no signal?", a: "Yes. Home Stories works offline. If you use iCloud sync (Pro), it catches up when you are back online." },
    ],
    posts: [
      "renovation-contingency-budget",
      "hidden-costs-older-home",
      "documenting-renovation-for-insurance",
    ],
  },
  {
    slug: "house-extension",
    label: "House extension",
    h1: "Run a house extension project from one app",
    metaTitle: "House Extension Project Tracker for iPhone",
    metaDescription:
      "Track a house extension: stage payments, permits, the build sequence, every change order and a dated photo record of the foundations and structure.",
    image: "/stock/26.webp",
    imageAlt: "A timber-framed single-storey house extension under construction against a clear sky",
    intro: [
      "An extension is the largest project most homeowners run. It has a builder, often an architect, a permit, inspections, and a long list of choices that turn into change orders.",
      "Home Stories keeps the money, the documents and the photos for the whole build. Every change order goes in as an item with its price, so the total you see includes the extras, not just the original quote.",
    ],
    track: [
      { title: "Stage payments", body: "Foundations, structure, roof, first fix, second fix. Log each payment against the contractor." },
      { title: "Change orders", body: "Each extra is an item with a price and a note of who agreed it and when." },
      { title: "Permits and drawings", body: "Planning approval, building regulations and the architect's drawings as documents." },
      { title: "The foundations on camera", body: "Photograph the footings, the drainage and the damp-proof course. Nobody sees them again." },
      { title: "Your own choices", body: "Windows, doors, flooring and kitchen units you buy yourself, as separate items." },
    ],
    steps: [
      "Create an \"Extension\" project with the contract price and a contingency.",
      "Add the permits and drawings as documents.",
      "Add the build stages as tasks.",
      "Add every change order as an item when you agree to it.",
      "Photograph each stage, from the footings up.",
    ],
    screenshot: { src: "/screenshots/budget-chart.webp", alt: "Home Stories budget vs actual chart (Pro)" },
    faq: [
      { q: "How do I track change orders on an extension?", a: "Add each change order as an item with its price and a note of the date and who agreed it. The project total then includes every extra." },
      { q: "Can I export the extension record as a PDF?", a: "Yes, with Pro. PDF export makes a report with a cover photo, for the whole project or just the parts you choose." },
      { q: "Can the architect or builder see the project?", a: "With Pro you can share a project with a contractor. They see the same tasks, items and photos, kept in step through iCloud." },
    ],
    posts: [
      "how-long-does-a-house-extension-take",
      "managing-contractor-change-orders",
      "how-to-compare-contractor-quotes",
    ],
  },
  {
    slug: "flooring-and-decorating",
    label: "Flooring and decorating",
    h1: "Track flooring, painting and decorating, room by room",
    metaTitle: "Decorating and Flooring Project Tracker App",
    metaDescription:
      "Keep paint codes, flooring samples, quantities and costs for each room, and see the before and after side by side. Free on iPhone and iPad.",
    image: "/stock/22.webp",
    imageAlt: "An open living room with subfloor exposed and several types of flooring samples laid out in a row",
    intro: [
      "Decorating projects are small, but they create a lot of details you need later: the exact paint colour, the finish, the floor's product name, how many boxes you bought and how many are left over.",
      "Home Stories keeps those details on the room they belong to. A note with the paint code and a photo of the tin label saves a trip to the store with a chip of the wall in your pocket.",
    ],
    track: [
      { title: "Paint codes", body: "A note per room with the brand, colour code and finish. Add a photo of the tin label." },
      { title: "Flooring and quantities", body: "The flooring as an item with price per square metre, the number of boxes and the batch." },
      { title: "Samples you looked at", body: "Photograph each sample with a price. The ones you did not choose are useful for the next room." },
      { title: "Before and after", body: "One photo before, one after. The side-by-side comparison and the slideshow do the rest." },
    ],
    steps: [
      "Create a project per room, or one \"Decorating\" project for the house.",
      "Add the paint and flooring as items with prices.",
      "Write the codes and quantities in a note.",
      "Photograph the room before you start and when you finish.",
    ],
    screenshot: { src: "/screenshots/note-detail.webp", alt: "A Home Stories note with project details" },
    faq: [
      { q: "Where should I keep my paint colour codes?", a: "In a note on the room's project, with a photo of the tin label. The note is on your phone when you are in the paint store." },
      { q: "Can I compare before and after photos?", a: "Yes. Home Stories has a side-by-side before and after comparison and a slideshow for the whole project. Both are free." },
      { q: "Is the app useful for small decorating jobs?", a: "Yes. Unlimited projects are free, so a single room or a weekend paint job can have its own project." },
    ],
    posts: [
      "how-long-does-it-take-to-install-flooring",
      "what-to-track-during-a-renovation",
      "diy-vs-hire-contractor",
    ],
  },
  {
    slug: "nursery-and-bedroom",
    label: "Nursery and bedroom",
    h1: "Plan a nursery or bedroom makeover with a deadline that will not move",
    metaTitle: "Nursery and Bedroom Makeover Planner App",
    metaDescription:
      "Plan a nursery or bedroom makeover: a budget for furniture and paint, tasks that work back from the due date, and a photo record to keep.",
    image: "/stock/42.webp",
    imageAlt: "A small bedroom being turned into a nursery, one wall freshly painted sage green, a flat-packed cot box against the wall",
    intro: [
      "A nursery has a fixed deadline, and the paint needs to air out before the baby arrives. Work back from the date: paint first, then flooring, then furniture, then the small things.",
      "Home Stories keeps the furniture list with prices, the paint details and the tasks with dates. The photo timeline becomes a record of the room that you will want to keep.",
    ],
    track: [
      { title: "Tasks worked back from the date", body: "Paint early so the room can air out. Then the floor, the furniture and the curtains." },
      { title: "Furniture with prices", body: "Cot, changing table, wardrobe, blinds. Share each product page from Safari or IKEA into the project." },
      { title: "Assembly instructions", body: "Keep the PDF instructions and the receipts as documents, for the warranty and for the next move." },
      { title: "The room as it changes", body: "Photos from empty room to finished nursery, on one timeline." },
    ],
    steps: [
      "Create a \"Nursery\" project with a budget.",
      "Add tasks with dates, working back from the due date.",
      "Share each piece of furniture into the project as an item.",
      "Keep receipts and instructions as documents.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "When should I paint a nursery?", a: "Early, so the room has time to air out before it is used. Put the painting in as the first task, with a date well before the due date." },
      { q: "Can I save furniture from IKEA or Amazon into a project?", a: "Yes. Share the product page from Safari, Amazon or IKEA straight into the project, and it becomes an item you can give a price." },
      { q: "Can my partner see the same list?", a: "Yes, with Pro. Project sharing keeps the tasks, items and photos in step for both of you through iCloud." },
    ],
    posts: [
      "how-to-plan-a-home-renovation-step-by-step",
      "renovation-checklist-printable",
      "how-to-track-home-improvement-expenses",
    ],
  },
  {
    slug: "home-office",
    label: "Home office",
    h1: "Set up a home office without losing track of the cost",
    metaTitle: "Home Office Renovation Planner and Cost Tracker",
    metaDescription:
      "Plan a home office build or conversion: desk, chair, lighting, cabling and electrics on one budget, with receipts kept for warranty and expense claims.",
    image: "/stock/43.webp",
    imageAlt: "A spare room being turned into a home office, a plain desk with a laptop and an open toolbox on the floor",
    intro: [
      "A home office looks like a furniture job, but it often needs more: extra sockets, network cable, better lighting and some sound insulation. Those are the costs people forget when they set the budget.",
      "Home Stories keeps the furniture, the electrics and the receipts in one project. If your employer or your accountant asks for the receipts, they are all in one place.",
    ],
    track: [
      { title: "Furniture and equipment", body: "Desk, chair, monitor arm, lighting. Each as an item with the price and the shop." },
      { title: "Electrics and network", body: "Extra sockets and a network point are labour plus materials. Log them apart." },
      { title: "Receipts", body: "Keep every receipt as a document, in case you can claim part of the cost. Check the rules with your accountant." },
      { title: "Warranties", body: "Chairs and desks often have long warranties. The document is in the project when you need it." },
    ],
    steps: [
      "Create a \"Home office\" project with a budget.",
      "Add the furniture and equipment as items.",
      "Add the electrician's work as labour.",
      "Keep receipts and warranties as documents.",
    ],
    screenshot: { src: "/screenshots/items.webp", alt: "Home Stories item list: each product with its price, adding up to the project total" },
    faq: [
      { q: "Can I keep home office receipts in the app?", a: "Yes. Add each receipt as a document in the project. A full data export is free, and PDF export is part of Pro." },
      { q: "Can I claim my home office cost?", a: "That depends on your country and your job. Home Stories keeps the receipts together. Ask an accountant or your tax authority what you can claim." },
      { q: "Does the app need an account?", a: "No. There is no account and no sign-up. Your projects stay on your device unless you turn on iCloud sync or share a project." },
    ],
    posts: [
      "how-to-organize-renovation-receipts",
      "how-to-track-home-improvement-expenses",
      "renovation-budget-template",
    ],
  },
  {
    slug: "home-gym",
    label: "Home gym",
    h1: "Build a home gym and know what it really cost",
    metaTitle: "Home Gym Build Planner and Budget Tracker App",
    metaDescription:
      "Plan a home gym build: flooring, equipment, ventilation and electrics on one budget, with product links, warranties and the build on a photo timeline.",
    image: "/stock/44.webp",
    imageAlt: "A garage being turned into a home gym, rubber floor tiles on the concrete and a squat rack against a newly boarded wall",
    intro: [
      "A home gym is often built one piece at a time: a rack this month, plates next month, flooring when the floor starts to crack. Without a record, nobody knows what the gym cost in total.",
      "Home Stories adds up every piece as you buy it. It also keeps the equipment manuals and warranties, which you need when a cable or a bench breaks.",
    ],
    track: [
      { title: "Equipment as you buy it", body: "Each piece as an item with its price. Share the product page from the store's site." },
      { title: "The room itself", body: "Rubber flooring, mirrors, ventilation and extra sockets. These are the costs that make it a gym." },
      { title: "Manuals and warranties", body: "Keep them as documents. Spare parts need a model number." },
      { title: "A wish list", body: "Items you have not bought yet, with a price, show what the full setup will cost." },
    ],
    steps: [
      "Create a \"Home gym\" project with a budget.",
      "Add the room work (floor, ventilation, electrics) first.",
      "Add equipment as items when you buy or plan it.",
      "Keep manuals and warranties as documents.",
    ],
    screenshot: { src: "/screenshots/items.webp", alt: "Home Stories item list: each product with its price, adding up to the project total" },
    faq: [
      { q: "How do I track the total cost of a home gym?", a: "Add each piece of equipment and each part of the room work as an item with a price. Home Stories keeps the running total against your budget." },
      { q: "Can I add a home screen widget for the budget?", a: "Yes. Home Screen widgets for budget progress and what is next are free." },
      { q: "Is there a subscription?", a: "No. The app is free. Pro is a single purchase with no subscription and nothing to cancel." },
    ],
    posts: [
      "how-to-track-home-improvement-expenses",
      "diy-vs-hire-contractor",
      "renovation-budget-template",
    ],
  },
  {
    slug: "garage-conversion",
    label: "Garage conversion",
    h1: "Convert a garage into a room, with the budget and the paperwork in one place",
    metaTitle: "Garage Conversion Planner and Cost Tracker App",
    metaDescription:
      "Track a garage conversion: the new wall and window, insulation, floor, electrics and approvals on one budget, with photos of each stage before it is covered.",
    image: "/stock/45.webp",
    imageAlt: "A garage conversion in progress, new glazed doors framed into the old door opening and plasterboard sheets against the walls",
    intro: [
      "A garage conversion changes a cold, open space into a heated room. That means a new wall where the door was, a raised and insulated floor, insulated walls and ceiling, a window, heating and electrics. Many places also need an approval.",
      "Home Stories keeps each of those as its own cost, so you see where the money went. The photos of the insulation and the new wall footing are the record for an inspector, an insurer or a buyer.",
    ],
    track: [
      { title: "The new front wall", body: "Footing, blockwork or timber frame, window and cladding. Often the largest single cost." },
      { title: "Floor and insulation", body: "Damp-proof membrane, insulation and screed, photographed before they are covered." },
      { title: "Approvals", body: "Keep any permit or building-control paperwork as documents." },
      { title: "Heating and electrics", body: "Extra circuits, sockets and a radiator or heater, as items and labour." },
    ],
    steps: [
      "Create a \"Garage conversion\" project with a budget.",
      "Add the approvals as documents.",
      "Add each stage as a task.",
      "Log materials and labour apart.",
      "Photograph the floor and walls before they are closed.",
    ],
    screenshot: { src: "/screenshots/photo-timeline.webp", alt: "Home Stories project screen with the photo timeline and time-tracked tasks" },
    faq: [
      { q: "Do I need a permit to convert a garage?", a: "Often you do, but it depends on where you live and what you change. Check with your local authority before you start, and keep the answer as a document in the project." },
      { q: "What should I photograph in a garage conversion?", a: "The new wall footing, the floor membrane and insulation, and the wall and ceiling insulation. All of it is hidden in the finished room." },
      { q: "Can I export a report of the conversion?", a: "Yes, with Pro. PDF export makes a report with a cover photo for the whole project or the parts you choose." },
    ],
    posts: [
      "do-i-need-a-permit-for-a-home-renovation",
      "how-to-compare-contractor-quotes",
      "home-renovation-phases",
    ],
  },
  {
    slug: "garden-and-landscaping",
    label: "Garden and landscaping",
    h1: "Plan a garden or landscaping project and keep the costs together",
    metaTitle: "Garden and Landscaping Project Planner App",
    metaDescription:
      "Track a garden or landscaping project: patio, fencing, decking and plants on one budget, with seasonal tasks, product receipts and a before-and-after record.",
    image: "/stock/46.webp",
    imageAlt: "A back garden landscaping project in progress, with new patio slabs half laid on a sand bed",
    intro: [
      "Garden projects run on seasons. The patio goes in when the ground is dry, the planting when the weather is right, and the costs come in small amounts from many shops.",
      "Home Stories adds up the slabs, the sand, the plants and the hired digger, and keeps the tasks for each season. The before-and-after photos of a garden are some of the most satisfying in the app.",
    ],
    track: [
      { title: "Hard landscaping", body: "Slabs, sand, cement, edging, fencing and decking as items. The quantities go in the note." },
      { title: "Plants", body: "Each plant or tray as an item, with a photo of the label so you know what it is next year." },
      { title: "Hire costs", body: "Digger, skip, wacker plate. Log them as their own items." },
      { title: "Seasonal tasks", body: "Tasks with dates for when to lay, plant, seal or treat." },
    ],
    steps: [
      "Create a \"Garden\" project with a budget.",
      "Photograph the garden before you start.",
      "Add materials and plants as items.",
      "Add seasonal work as tasks with dates.",
      "Photograph the result from the same spot.",
    ],
    screenshot: { src: "/screenshots/photo-timeline.webp", alt: "Home Stories project screen with the photo timeline and time-tracked tasks" },
    faq: [
      { q: "Can I use Home Stories for a garden project?", a: "Yes. A project is any job with a budget, tasks and photos. Gardens, patios, fences and decking all work the same way as a room." },
      { q: "How do I remember which plants I bought?", a: "Add each plant as an item with a photo of its label. The item keeps the name, the price and the shop." },
      { q: "Can I get reminders for seasonal tasks?", a: "Tasks with due dates are free. Task reminders are part of the optional Pro upgrade." },
    ],
    posts: [
      "home-maintenance-schedule",
      "how-to-track-home-improvement-expenses",
      "diy-vs-hire-contractor",
    ],
  },
  {
    slug: "house-flipping",
    label: "House flipping",
    h1: "A house-flipping tracker that shows the real cost of every flip",
    metaTitle: "House Flipping Tracker App: Costs, Tasks and Photos",
    metaDescription:
      "Track every house flip: renovation costs against the budget, contractor payments, the schedule, and before-and-after photos for the listing.",
    image: "/stock/32.webp",
    imageAlt: "An older fixer-up living room on moving-in day, worn hardwood floors and patched bare plaster walls",
    intro: [
      "A flip makes money only if the renovation stays inside its budget and its schedule. Every week of delay is another week of holding costs, and every unlogged payment makes the profit look better than it is.",
      "Home Stories gives each property its own project, with the materials, labour and contractor costs kept apart. The before-and-after photos and the slideshow are ready for the listing when the work is done.",
    ],
    track: [
      { title: "One project per property", body: "Unlimited projects are free, so each flip has its own budget and record." },
      { title: "Costs by type", body: "Materials, labour and contractor apart. You see which part of the budget ran over." },
      { title: "The schedule", body: "Tasks with dates for each trade. Time tracking shows the hours you put in yourself." },
      { title: "Listing photos", body: "Before-and-after comparison and a slideshow from the photos you took on the job." },
    ],
    steps: [
      "Create a project for the property with the renovation budget.",
      "Photograph every room on day one.",
      "Add each trade as tasks with dates.",
      "Log every payment as materials, labour or contractor.",
      "Use the before-and-after comparison for the listing.",
    ],
    screenshot: { src: "/screenshots/projects-list.webp", alt: "Home Stories project list, each project with its budget" },
    faq: [
      { q: "Can I track several flips at once?", a: "Yes. Unlimited projects are free, and each one has its own budget, running total, tasks and photos." },
      { q: "Can I track the hours I work on a flip?", a: "Yes. Built-in time tracking is free, with a Lock Screen timer and the Dynamic Island on iPhone 14 Pro and later." },
      { q: "Does Home Stories calculate profit?", a: "No. It tracks the renovation cost against your budget. Purchase price, holding costs and sale price are outside the app." },
    ],
    posts: [
      "renovation-cost-overrun-statistics",
      "how-to-compare-contractor-quotes",
      "hidden-costs-older-home",
    ],
  },
  {
    slug: "fixer-upper",
    label: "Fixer-upper",
    h1: "Renovating a fixer-upper while you live in it",
    metaTitle: "Fixer-Upper Renovation Planner App for iPhone",
    metaDescription:
      "Plan a fixer-upper one project at a time: a baseline photo record on day one, a must-do list before the nice-to-haves, and a budget for each room.",
    image: "/stock/18.webp",
    imageAlt: "An empty room in a newly purchased older house with soft morning light, bare walls and a single cardboard box",
    intro: [
      "A fixer-upper is not one renovation. It is many small ones over several years, done while you live there. The order matters: leaks, safety and heating first, the pretty rooms later.",
      "Home Stories lets each job be its own project, with its own budget and photos. A full photo record of the house on day one is the baseline for everything that follows.",
    ],
    track: [
      { title: "The day-one baseline", body: "Photograph every room before you unpack. It shows the condition you bought." },
      { title: "Must-do and can-wait", body: "One project for the urgent work, and separate projects for the rooms that can wait." },
      { title: "What the walls hide", body: "When a trade opens a wall, photograph what is inside and add the new cost as an item." },
      { title: "Several years of receipts", body: "Every repair and improvement with its receipt, in the project it belongs to." },
    ],
    steps: [
      "Create a \"Day one\" project and photograph every room.",
      "Create a \"Must-do\" project for safety, leaks and heating.",
      "Add a project per room for the work that can wait.",
      "Add each surprise as an item with a photo.",
    ],
    screenshot: { src: "/screenshots/projects-list.webp", alt: "Home Stories project list, each project with its budget" },
    faq: [
      { q: "Where do I start with a fixer-upper?", a: "With the problems that are unsafe or let water in: leaks, electrics, heating, the roof. Cosmetic work comes after." },
      { q: "Should I keep a separate project for each room?", a: "Yes, if the rooms will be done at different times. Each project then has its own budget, tasks and photo timeline." },
      { q: "Can I back up years of renovation records?", a: "Yes. Local backups and a full data export are free. iCloud sync (Pro) also keeps the projects on your other devices." },
    ],
    posts: [
      "moving-into-a-fixer-upper",
      "where-to-start-renovating-new-house",
      "hidden-costs-older-home",
    ],
  },
  {
    slug: "home-repairs-and-maintenance",
    label: "Repairs and maintenance",
    h1: "Keep a log of home repairs and maintenance",
    metaTitle: "Home Repair and Maintenance Log App for iPhone",
    metaDescription:
      "Log every home repair and maintenance job: what was done, by whom, what it cost and when it is due again, with photos and receipts in one place.",
    image: "/stock/37.webp",
    imageAlt: "The porch of a stucco house with a wooden ladder against the wall, a metal toolbox and work gloves on the steps",
    intro: [
      "Every home collects a long list of small jobs: a dripping tap, gutters, a boiler service, a sticking door. Each one is small, but together they are a large part of what the house costs to own.",
      "Home Stories can hold a maintenance project for the house, with each repair as a task and each cost as an item. When something breaks again, you know who fixed it last time and what they charged.",
    ],
    track: [
      { title: "Each job as a task", body: "What needs doing, with a date. Done jobs stay on the record." },
      { title: "Who did the work", body: "A note with the tradesperson's name and number, on the job they did." },
      { title: "Recurring work", body: "Boiler service, gutter cleaning, smoke-alarm test. A task for the next one when you finish this one." },
      { title: "Costs over the year", body: "Every repair as an item, so the yearly total is there when you need it." },
    ],
    steps: [
      "Create a \"Maintenance\" project for the house.",
      "Add each repair or service as a task with a date.",
      "Log the cost as an item.",
      "Keep the invoice as a document and the tradesperson in a note.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "How do I keep a home maintenance log?", a: "Make one project for the house. Add each job as a task, its cost as an item, and the invoice as a document. Home Stories keeps them on your iPhone or iPad." },
      { q: "Can the app remind me about the next service?", a: "Tasks with due dates are free. Reminders for those tasks are part of the optional one-time Pro upgrade." },
      { q: "Can I see what is due next without opening the app?", a: "Yes. The free Home Screen widgets show budget progress and what is next." },
    ],
    posts: [
      "home-maintenance-schedule",
      "how-to-track-home-improvement-expenses",
      "how-to-organize-renovation-receipts",
    ],
  },
  {
    slug: "rental-property",
    label: "Rental property",
    h1: "Track renovations and repairs on a rental property",
    metaTitle: "Rental Property Renovation and Repair Tracker",
    metaDescription:
      "Keep each rental unit's renovations, repairs and receipts apart, with dated photos of its condition between tenants. Free on iPhone and iPad.",
    image: "/stock/47.webp",
    imageAlt: "An empty rental flat between tenants, freshly painted white walls, a grey floor, a stepladder and a dust sheet",
    intro: [
      "A landlord needs two records for each unit: what was spent on it, and what condition it was in. Both matter when a tenant leaves, and both matter at tax time.",
      "Home Stories gives each property or unit its own project. The costs, receipts and dated photos stay apart for each one, so nothing from one unit gets mixed into another.",
    ],
    track: [
      { title: "One project per unit", body: "Each flat or house has its own budget, costs and photos." },
      { title: "Condition between tenants", body: "A dated photo set at each change of tenant." },
      { title: "Repairs and improvements", body: "Each job as items and tasks, with the invoice as a document." },
      { title: "Receipts for the year", body: "All receipts for the unit in one place for your accountant." },
    ],
    steps: [
      "Create a project for each unit.",
      "Photograph every room at each change of tenant.",
      "Log every repair and refresh with its receipt.",
      "Export the records when your accountant asks.",
    ],
    screenshot: { src: "/screenshots/projects-list.webp", alt: "Home Stories project list, each project with its budget" },
    faq: [
      { q: "Can I keep repairs for several rental units apart?", a: "Yes. Make a project per unit. Unlimited projects are free, and each one keeps its own costs, receipts and photos." },
      { q: "Is a photo in the app enough as a check-in inventory?", a: "Dated photos are a good record, but the rules for deposits and inventories depend on your country. Use the photos together with the inventory your rules ask for." },
      { q: "Can I export the costs for my accountant?", a: "A full data export is free. A PDF report of the project is part of Pro." },
    ],
    posts: [
      "how-to-track-home-improvement-expenses",
      "how-to-organize-renovation-receipts",
      "home-maintenance-schedule",
    ],
  },
  {
    slug: "selling-your-home",
    label: "Selling your home",
    h1: "Keep a record of home improvements for when you sell",
    metaTitle: "Home Improvement Records for Selling Your House",
    metaDescription:
      "Keep every improvement, receipt, warranty and before-and-after photo in one record, ready for the buyer, the estate agent and your accountant when you sell.",
    image: "/stock/05.webp",
    imageAlt: "A clipped stack of printed report pages on a pale quartz worktop in a finished kitchen",
    intro: [
      "When you sell, a buyer asks what was done to the house and when. In some countries the cost of improvements also changes the tax on the sale. Both questions are easy if you kept a record, and hard if you did not.",
      "Home Stories keeps each improvement with its date, cost, receipts, warranties and photos. With Pro, you can export a PDF report of the whole project for the buyer or the estate agent.",
    ],
    track: [
      { title: "What was done, and when", body: "A project per improvement, with the dates on the tasks and the photos." },
      { title: "Receipts and invoices", body: "Each payment with its document, kept for as long as you own the house." },
      { title: "Warranties and certificates", body: "Roof, windows, boiler, electrics. Buyers ask for these." },
      { title: "Before and after", body: "Photos that show the change, ready for the listing." },
    ],
    steps: [
      "Make a project for each improvement you have done or plan to do.",
      "Add the receipts, warranties and certificates as documents.",
      "Add before and after photos.",
      "When you sell, export a PDF report (Pro).",
    ],
    screenshot: { src: "/screenshots/export-pdf.webp", alt: "Home Stories PDF report export (Pro)" },
    faq: [
      { q: "What home improvement records should I keep for a sale?", a: "The date, the cost and the invoice for each improvement, plus warranties, certificates and before-and-after photos. Ask your accountant which costs count for tax where you live." },
      { q: "Can I give the buyer a report?", a: "Yes, with Pro. PDF export makes a report with a cover photo for the whole project or the parts you choose." },
      { q: "How long are records kept in the app?", a: "As long as you keep them. Projects stay on your device, and local backups and a full data export are free." },
    ],
    posts: [
      "how-to-organize-renovation-receipts",
      "documenting-renovation-for-insurance",
      "how-to-track-home-improvement-expenses",
    ],
  },
  {
    slug: "insurance-documentation",
    label: "Insurance record",
    h1: "Document a renovation for your home insurance",
    metaTitle: "Document a Renovation for Home Insurance",
    metaDescription:
      "Build the record an insurer asks for: dated photos of hidden work, invoices, certificates and the value of what you added, in one project.",
    image: "/stock/30.webp",
    imageAlt: "A rolled insurance document and a stack of receipts on a bare floorboard in a mid-renovation kitchen",
    intro: [
      "After a claim, an insurer asks what was there, what it cost, and who installed it. A renovation adds value to the house, and if the record is missing, that value can be hard to prove.",
      "Home Stories keeps the dated photos, invoices and certificates for each project. Photos of work inside the walls are the hardest to replace, so take them before the walls close.",
    ],
    track: [
      { title: "Dated photos", body: "Each photo is on the project timeline with its date." },
      { title: "Hidden work", body: "Wiring, pipes, waterproofing and insulation, photographed before they are covered." },
      { title: "Invoices and certificates", body: "Who did the work and what it cost, as documents." },
      { title: "The value added", body: "The project total is the cost of the improvement. Tell your insurer if it changes your cover." },
    ],
    steps: [
      "Photograph the room before the work starts.",
      "Photograph the hidden work before it is covered.",
      "Add invoices and certificates as documents.",
      "Keep a backup or turn on iCloud sync (Pro).",
    ],
    screenshot: { src: "/screenshots/photo-timeline.webp", alt: "Home Stories project screen with the photo timeline and time-tracked tasks" },
    faq: [
      { q: "What do insurers want to see after a renovation?", a: "Usually proof of what was installed, what it cost and who did it: dated photos, invoices and certificates. Check your own policy for what it requires." },
      { q: "Should I tell my insurer about a renovation?", a: "Often yes, because a renovation can change the rebuild value of the house. Ask your insurer before and after the work." },
      { q: "Where are my photos stored?", a: "On your device. With Pro you can turn on iCloud sync, which uses your own private iCloud. Local backups and data export are free." },
    ],
    posts: [
      "documenting-renovation-for-insurance",
      "what-to-track-during-a-renovation",
      "how-to-organize-renovation-receipts",
    ],
  },
  {
    slug: "renovating-with-a-partner",
    label: "Renovating as a couple",
    h1: "Renovate with your partner from one shared project",
    metaTitle: "Shared Renovation Planner App for Couples",
    metaDescription:
      "Share a renovation project with your partner or family: the same budget, tasks, items and photos on every iPhone and iPad, kept in step through iCloud.",
    image: "/stock/15.webp",
    imageAlt: "A woman standing in a partly renovated room, looking at notes pinned to the bare wall",
    intro: [
      "Most renovation arguments are about money nobody wrote down and decisions one person did not know about. A shared record removes most of them.",
      "With Pro, Home Stories shares a project with your partner or family. Both of you see the same budget, tasks, items and photos, and changes reach the other phone through iCloud.",
    ],
    track: [
      { title: "One budget", body: "Both of you add what you pay. The running total is the real one." },
      { title: "Who does what", body: "Tasks with dates, so the list is clear for both of you." },
      { title: "Choices in one place", body: "Both of you share products from Safari into the project, and you decide together." },
      { title: "Your own iCloud", body: "Sharing runs through iCloud. There is no account and no server of ours in between." },
    ],
    steps: [
      "Create the project and set the budget together.",
      "Upgrade to Pro (one purchase, Family Sharing included).",
      "Share the project with your partner.",
      "Each of you adds items, payments and photos as you go.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "Can my partner and I use the same renovation project?", a: "Yes, with Pro. Project sharing lets you invite a partner or family member, and everyone sees the same tasks, items and photos through iCloud." },
      { q: "Do we both need to buy Pro?", a: "Pro is a single purchase with Family Sharing included, so people in your Apple Family Sharing group get it too." },
      { q: "Does sharing need an account?", a: "No. There is no Home Stories account. Sharing and sync run through your own iCloud." },
    ],
    posts: [
      "how-to-plan-a-home-renovation-step-by-step",
      "how-to-budget-a-home-renovation",
      "renovation-spreadsheet-alternative",
    ],
  },
  {
    slug: "working-with-a-contractor",
    label: "Working with a contractor",
    h1: "Keep quotes, change orders and payments to your contractor in one place",
    metaTitle: "Track Contractor Quotes, Change Orders and Payments",
    metaDescription:
      "Compare contractor quotes, record each change order before the work happens, and log every payment, all in one renovation project on your iPhone.",
    image: "/stock/33.webp",
    imageAlt: "Three stapled paper quotes fanned out on a worn wooden kitchen table beside a tape measure and a pencil",
    intro: [
      "Most disputes with a contractor come from one of three things: a scope nobody wrote down, a change order agreed by word of mouth, or a payment nobody can find.",
      "Home Stories keeps the quotes as documents, each change order as an item with its price and date, and each payment logged against the contractor. With Pro, you can share the project with the contractor.",
    ],
    track: [
      { title: "Quotes side by side", body: "Keep each quote as a document in the project, so you compare the same scope." },
      { title: "Change orders", body: "An item with the price, the date and who agreed it, before the work starts." },
      { title: "Payments", body: "Each payment logged as contractor, so you know what is paid and what is left." },
      { title: "Their number", body: "A note with the contractor's contact details and the site rules." },
    ],
    steps: [
      "Add every quote as a document.",
      "Set the project budget from the quote you accept.",
      "Add each change order as an item when you agree to it.",
      "Log each payment against the contractor.",
      "Share the project with the contractor (Pro).",
    ],
    screenshot: { src: "/screenshots/budget-chart.webp", alt: "Home Stories budget vs actual chart (Pro)" },
    faq: [
      { q: "How do I keep track of contractor payments?", a: "Log each payment as contractor in the project. Home Stories keeps materials, labour and contractor costs apart, so the amount paid to the contractor is clear." },
      { q: "How should I record a change order?", a: "Add it as an item with its price, the date and who agreed it, before the work happens. Keep any written confirmation as a document." },
      { q: "Can my contractor see the project?", a: "Yes, with Pro. Project sharing lets you invite your contractor, and you both see the same tasks, items and photos." },
    ],
    posts: [
      "how-to-compare-contractor-quotes",
      "managing-contractor-change-orders",
      "diy-vs-hire-contractor",
    ],
  },
  {
    slug: "diy-projects",
    label: "DIY projects",
    h1: "A DIY project tracker for the materials, the hours and the result",
    metaTitle: "DIY Project Tracker App: Materials, Time and Photos",
    metaDescription:
      "Track DIY projects: materials and tools on one budget, the hours you put in with a Lock Screen timer, and a photo timeline from start to finish.",
    image: "/stock/19.webp",
    imageAlt: "A cordless drill, driver bits and screws resting on a sawhorse in a room with one wall half painted",
    intro: [
      "DIY saves the labour cost, but it costs your time and a lot of small trips to the hardware store. Without a record, you know neither what the job cost nor how long it took.",
      "Home Stories adds up the materials and tools as you buy them, and the built-in timer records your hours. Next time you decide between doing it yourself and hiring someone, you have real numbers.",
    ],
    track: [
      { title: "Materials and tools", body: "Each purchase as an item. Snap the shelf label in the store." },
      { title: "Your hours", body: "Start the timer when you start work. It runs on the Lock Screen and in the Dynamic Island." },
      { title: "Steps as tasks", body: "Break the job into tasks, so you can stop and start without losing track." },
      { title: "Progress photos", body: "A photo at the end of each session builds the timeline." },
    ],
    steps: [
      "Create a project for the job with a budget.",
      "Add materials and tools as you buy them.",
      "Start the timer when you work.",
      "Add a photo at the end of each session.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "Can I track the time I spend on DIY?", a: "Yes. Built-in time tracking is free, with a Lock Screen timer and the Dynamic Island on iPhone 14 Pro and later." },
      { q: "Is DIY cheaper than hiring someone?", a: "Only if the materials, the tools you buy and your own time come to less than the quote. Tracking the job gives you those numbers." },
      { q: "Is Home Stories free for DIY projects?", a: "Yes. Unlimited projects, items, photos, notes, documents, tasks and time tracking are free." },
    ],
    posts: [
      "diy-vs-hire-contractor",
      "what-to-track-during-a-renovation",
      "renovation-checklist-printable",
    ],
  },
  {
    slug: "holiday-home",
    label: "Holiday home and cabin",
    h1: "Renovate a holiday home or cabin from a distance",
    metaTitle: "Holiday Home and Cabin Renovation Tracker App",
    metaDescription:
      "Renovate a holiday home, cabin or summer house you only visit now and then: offline access on site, photos of the work, tasks for each visit and shared access.",
    image: "/stock/48.webp",
    imageAlt: "A red wooden summer house with a ladder against the wall and paint tins on the deck, pine trees in evening light",
    intro: [
      "A holiday home is renovated in short visits, often with weak signal and a local tradesperson who works while you are away. The hard part is to remember what was done last time and what to bring next time.",
      "Home Stories works offline on site. Tasks hold the list for the next visit, and photos show the progress when you are not there.",
    ],
    track: [
      { title: "Work for the next visit", body: "Tasks with dates for each trip, and a list of what to bring." },
      { title: "Local tradespeople", body: "Names and numbers in a note, and their invoices as documents." },
      { title: "Photos between visits", body: "Ask the tradesperson for photos and add them to the timeline." },
      { title: "Seasonal work", body: "Opening and closing the house, wood treatment, gutters. Tasks with dates." },
    ],
    steps: [
      "Create a project for the house with a budget.",
      "Add the work for each visit as tasks.",
      "Keep local contacts in a note.",
      "Share the project with family (Pro) so everyone sees the plan.",
    ],
    screenshot: { src: "/screenshots/tasks.webp", alt: "Home Stories task list with due dates and tracked time" },
    faq: [
      { q: "Does the app work at a cabin with no internet?", a: "Yes. Home Stories works offline. iCloud sync (Pro), if you use it, catches up when you are back online." },
      { q: "Can the family share the holiday home project?", a: "Yes, with Pro. Project sharing keeps the tasks, items and photos in step for everyone you invite." },
      { q: "Can I use the app in my own language?", a: "Home Stories is available in 50 languages and works in your own currency." },
    ],
    posts: [
      "home-maintenance-schedule",
      "how-to-plan-a-home-renovation-step-by-step",
      "renovation-checklist-printable",
    ],
  },
];
