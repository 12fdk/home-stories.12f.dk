/**
 * Printable templates. Slugs here are the canonical /templates/<slug>/ URLs,
 * and the PDFs are public/templates/<slug>-a4.pdf and -letter.pdf, built by
 * scripts/build-templates.py. Page and line counts come from
 * templateFiles.json, which that script writes, so re-run it after changing a
 * sheet and the pages follow. #163
 *
 * Same rules as the use-case pages: every page has its own intro, its own
 * list and its own FAQ, nothing copied between entries. Only claim what the
 * app does today, and mark Pro features "(Pro)" every time.
 *
 * The budget spreadsheet and the phase checklist are older files on
 * /downloads/, with their own posts. These sheets link to them and do not
 * repeat them.
 */
import files from "./templateFiles.json";

export interface TemplateFile {
  href: string;
  pages: number;
  kb: number;
  [fact: string]: unknown;
}

export interface Template {
  slug: keyof typeof files;
  /** Short label for the hub, sibling links and llms.txt. */
  label: string;
  h1: string;
  /** <title>, under ~60 characters. */
  metaTitle: string;
  /** Meta description, under ~160 characters. */
  metaDescription: string;
  /** Photo for the hero, from /public/stock. */
  image: string;
  imageAlt: string;
  /** Alt text for the page-1 preview of the PDF. */
  previewAlt: string;
  /** "portrait" or "landscape", as printed. */
  orientation: "portrait" | "landscape";
  /** Answer-first intro, 2 short paragraphs. */
  intro: string[];
  /** What is on the sheet: checkable, specific. */
  contains: string[];
  /** How to use it, in order. */
  steps: string[];
  /** The app as the next step: what the paper cannot do, with Pro marked. */
  app: { title: string; body: string[] };
  faq: { q: string; a: string }[];
  /** Related published post slugs, the one it builds on first. */
  posts: string[];
  /** YYYY-MM-DD. The page is built from this date on. Omit for always live. */
  publishDate?: string;
}

const f = files as Record<string, { a4: TemplateFile; letter: TemplateFile; preview: string }>;
const budget = f["renovation-budget-sheet"];
const punch = f["renovation-punch-list"];
const rooms = f["room-by-room-renovation-checklist"];
const quotes = f["contractor-quote-comparison"];

const roomNames = (rooms.a4.rooms as string[]).map((r) => r.toLowerCase());

export const allTemplates: Template[] = [
  {
    slug: "renovation-budget-sheet",
    label: "Renovation budget sheet",
    h1: "Printable renovation budget sheet, with a payment log",
    metaTitle: "Printable Renovation Budget Sheet (Free PDF)",
    metaDescription:
      "A free printable renovation budget sheet: budget, committed and paid per category, a contingency line, and a payment log. A4 and US Letter, no signup.",
    image: "/stock/tpl-renovation-budget-sheet.webp",
    imageAlt: "A blank sheet of paper and a pen on a wooden table, with a calculator and two tins blurred behind",
    previewAlt:
      "Page one of the budget sheet: fields for the project and total budget, then a table of cost categories with budget, committed, paid and left-to-pay columns.",
    orientation: "portrait",
    intro: [
      `This is a ${budget.a4.pages}-page renovation budget sheet to print and fill in by hand. Page one gives each cost category a budget, what you have committed to, what you have paid and what is left to pay, with the contingency on its own line under the subtotal. Page two is a payment log with ${budget.a4.paymentLines} lines on A4 (${budget.letter.paymentLines} on Letter).`,
      "It is the paper version of the renovation budget template. The spreadsheet has the formulas and 34 pre-filled line items. This sheet is for the site folder or the fridge door, where anyone can write a payment down on the day it happens.",
    ],
    contains: [
      `${budget.a4.categories} cost categories from the budget template post, plus an Other row, a subtotal, a contingency line and a total`,
      "Four money columns: budget, quoted or committed, paid to date, left to pay",
      "A short table for decisions that changed the budget: the date, what changed, the cost and where the money came from",
      "A payment log with a Type column: M for materials, L for labour, C for contractor",
      "Fields at the top for the project name, start date, total budget and contingency percentage",
    ],
    steps: [
      "Write the total budget and your contingency percentage at the top. The renovation budget template post explains how to pick the percentage.",
      "Split the budget across the categories before any work starts. Keep the contingency out of the categories; it sits under the subtotal.",
      "When you sign a quote or place an order, write the amount in Quoted / committed that day.",
      "Log every payment on page two when it leaves your account, and keep the receipt behind the sheet.",
      "Once a week, add up page two by category and copy the totals into Paid to date. Left to pay is committed minus paid.",
    ],
    app: {
      title: "When the log fills up",
      body: [
        "A paper log does not add itself up. In Home Stories, every item you save adds its price to the project total, and payments are logged with materials, labour and contractor kept apart, the same split as the Type column.",
        "The budget-vs-actual chart (Pro) shows what page one shows in numbers, as the costs come in. Receipts and invoices go into the same project as documents, so the proof sits next to the payment.",
      ],
    },
    faq: [
      {
        q: "Why is the contingency not one of the categories?",
        a: "Because it is a share of everything else. On its own line under the subtotal it grows when the subtotal grows, and it is easier to see when you start spending it.",
      },
      {
        q: "What is the difference between committed and paid?",
        a: "Committed is money you have agreed to pay: a signed quote, an order you have placed. Paid is money that has left your account. The difference is what you still owe.",
      },
      {
        q: "Is there a spreadsheet version?",
        a: "Yes. The renovation budget template is an XLSX and a CSV with 34 line items and one contingency cell that drives the totals. It is on the downloads page, and the post explains each category.",
      },
      {
        q: "Should I print A4 or Letter?",
        a: "A4 in Europe and most of the world, Letter in the US and Canada. The sheets are the same; the Letter page is a little shorter, so the payment log has a couple of lines fewer.",
      },
    ],
    posts: [
      "renovation-budget-template",
      "renovation-contingency-budget",
      "how-to-budget-a-home-renovation",
      "how-to-track-home-improvement-expenses",
    ],
    publishDate: "2026-11-28",
  },
  {
    slug: "renovation-punch-list",
    label: "Punch list (snag list)",
    h1: "Printable renovation punch list for the final walk-through",
    metaTitle: "Printable Renovation Punch List / Snag List (PDF)",
    metaDescription:
      "A free printable punch list for the end of a renovation: room, defect, photo, who fixes it and by when, fixed and re-checked boxes, and a sign-off. A4 and Letter.",
    image: "/stock/tpl-renovation-punch-list.webp",
    imageAlt: "A strip of blue painter's tape on a freshly painted wall, just above new white skirting",
    previewAlt:
      "Page one of the punch list: fields for the property, contractor, date and amount held back, then numbered rows with columns for location, defect, photo, who fixes it, fix-by date, fixed and re-check.",
    orientation: "portrait",
    intro: [
      `A punch list, called a snag list in the UK, is the list of defects you write on the final walk-through, before the last payment. This one has ${punch.a4.lines} numbered lines over ${punch.a4.pages} pages (${punch.letter.lines} on Letter). Each line has the room, the defect, a photo box, who fixes it, the fix-by date, and two tick boxes: one when it is fixed, one when you have checked it yourself.`,
      "The renovation checklist ends with snagging as its last phase. This sheet is the form you use for that phase, and the sign-off at the end is what you release the final payment against.",
    ],
    contains: [
      "Fields for the property, the contractor, the walk-through date and the amount you are holding back",
      `${punch.a4.lines} numbered defect lines on A4, ${punch.letter.lines} on Letter, with room for a short description`,
      "Tick boxes for Photo, Fixed and Re-check on every line",
      "Who fixes it and a fix-by date, agreed on the spot",
      "A sign-off: items left open, who agreed it, both signatures and the date the final payment was released",
    ],
    steps: [
      "Walk every room with the contractor, in the same order, when they say the job is finished.",
      "Write one defect per line, with where it is and how big: \"chip in worktop, 10 cm left of the sink\" beats \"worktop damaged\".",
      "Photograph each defect and tick Photo, so there is no argument later about what was there.",
      "Agree who fixes it and by when, and write it on the line while you are both standing there.",
      "Tick Fixed when they say it is done. Tick Re-check only after you have seen it yourself.",
      "Fill in the sign-off when every line is closed or agreed to stay open, then release the money you held back.",
    ],
    app: {
      title: "Keep the snags where the photos are",
      body: [
        "In Home Stories, add each snag as a task with a due date, and take the photo inside the project, so it lands on the project's photo timeline. Reminders on those due dates are Pro.",
        "If the contractor is on the project with you (sharing is Pro), you both see the same tasks and photos, kept in step through iCloud. Afterwards, PDF export (Pro) turns the project into a report you can file or send.",
      ],
    },
    faq: [
      {
        q: "Is a punch list the same as a snag list?",
        a: "Yes. Punch list is the usual name in the US, snag list in the UK and Ireland. Both mean the list of defects and unfinished work found at the end of a job.",
      },
      {
        q: "What should go on the list?",
        a: "Anything that is not finished or not as agreed: chips, gaps in sealant, doors that stick, sockets that do not work, paint on glass or tiles. If you are not sure, write it down. A line is easy to cross off.",
      },
      {
        q: "Why tick Fixed and Re-check separately?",
        a: "Because \"done\" from the contractor and \"done\" from you are not the same thing. The second tick is the one that counts, and it is the one you sign off against.",
      },
      {
        q: "Who keeps the signed sheet?",
        a: "Both of you. Take a photo of the signed page on the day, so there is a copy even if the paper gets lost.",
      },
    ],
    posts: [
      "renovation-checklist-printable",
      "what-to-track-during-a-renovation",
      "managing-contractor-change-orders",
    ],
    publishDate: "2026-11-28",
  },
  {
    slug: "room-by-room-renovation-checklist",
    label: "Room-by-room checklist",
    h1: "Room-by-room renovation checklist: one printable page per room",
    metaTitle: "Room-by-Room Renovation Checklist (Free Printable)",
    metaDescription:
      "One printable page per room: measurements, what to keep and change, finishes with codes, sockets and lights, room checks and photos. A4 and US Letter.",
    image: "/stock/tpl-room-by-room-renovation-checklist.webp",
    imageAlt: "An empty room with freshly painted walls, a wooden floor and a stepladder in the window light",
    previewAlt:
      "The kitchen page of the room-by-room checklist: measurement fields, keep and change columns, a finishes table, a services row, kitchen checks and a photo list.",
    orientation: "portrait",
    intro: [
      `This checklist has one page per room: ${roomNames.slice(0, -1).join(", ")} and ${roomNames.at(-1)}, plus a blank page for any other room. Each page holds the measurements, what you keep and what you change, the finishes you chose with their codes, the number of sockets and lights, ${rooms.a4.checksPerRoom} checks for that room, and the photos to take.`,
      "It is not an order of work. The phase checklist covers that, across the whole house. Use these pages to plan each room before you ask for quotes, and to record what went in once it is done.",
    ],
    contains: [
      `${rooms.a4.pages} pages: ${(rooms.a4.rooms as string[]).join(", ")}, and a blank room`,
      "Measurement fields, in metres on the A4 file and feet on the Letter file",
      "Keep and Change columns, which turn into the scope you send to contractors",
      "A finishes table for walls, ceiling, trim, floor and tiles: product, code or batch, supplier",
      `${rooms.a4.checksPerRoom} room-specific checks per room, such as the waste position in the bathroom or the stair rise in the hallway`,
      "A photo list: before, inside the open walls, after from the same angles, and the labels on tins and boxes",
    ],
    steps: [
      "Print the pages for the rooms you are doing. Print the blank page for a utility room, loft, garage or office.",
      "Measure before you ask for quotes, so every contractor prices the same room.",
      "Fill in Keep and Change. Together they are most of the scope page a contractor needs.",
      "Write paint codes and tile batch numbers on the page the day you buy them.",
      "Take the photos on the list, including inside the walls while they are open.",
      "Keep the pages in one folder, one room after another, for the next job on the same room.",
    ],
    app: {
      title: "The same record, with the photos attached",
      body: [
        "In Home Stories, one project can hold the whole house, or each room can be its own project. Notes keep the measurements and paint codes, and items keep the products you chose with their prices.",
        "The photo timeline shows every room before, during and after, and the side-by-side comparison puts the before and after photos next to each other. Free, with no account.",
      ],
    },
    faq: [
      {
        q: "How is this different from the renovation phase checklist?",
        a: "The phase checklist is the order of work across the house: strip-out, first fix, plaster, second fix, snagging. This one is a record per room: sizes, choices, codes and photos. Most projects use both.",
      },
      {
        q: "Why write down paint codes and tile batches?",
        a: "Touch-ups and repairs need the exact product. A colour name is not always enough to match a paint, and tiles from different batches can differ slightly in shade.",
      },
      {
        q: "What is the blank page for?",
        a: "Any room that is not in the set. It has the same sections, with lines for your own checks in place of the printed ones.",
      },
      {
        q: "Can I use it for a single room?",
        a: "Yes. Print the page for that room. The other pages are there for when the next room comes up.",
      },
    ],
    posts: [
      "renovation-checklist-printable",
      "how-to-plan-a-home-renovation-step-by-step",
      "home-renovation-phases",
      "what-to-track-during-a-renovation",
    ],
    publishDate: "2026-11-29",
  },
  {
    slug: "contractor-quote-comparison",
    label: "Contractor quote comparison",
    h1: "Contractor quote comparison sheet for three bids",
    metaTitle: "Contractor Quote Comparison Sheet (Free Printable)",
    metaDescription:
      "Compare three contractor quotes line by line on paper: scope, allowances, exclusions, payments, warranty, the gaps priced and an adjusted total. A4 and Letter.",
    image: "/stock/tpl-contractor-quote-comparison.webp",
    imageAlt: "Three blank sheets of paper side by side on a kitchen table, with a pen and two pairs of glasses",
    previewAlt:
      "Page one of the quote comparison sheet, in landscape: a column for each of three bids and a row for each line, from scope and allowances to warranty and the adjusted total.",
    orientation: "landscape",
    intro: [
      `This is a ${quotes.a4.pages}-page landscape sheet for comparing three contractor quotes side by side. Page one has a column per bid and ${quotes.a4.rows} rows: scope, materials, allowances, exclusions, permits, timeline, payment stages, change orders, license and insurance, warranty, how long the price holds, and the adjusted total. Page two prices the gaps and lists ${quotes.a4.questions} questions to put to your top two in writing.`,
      "The rows are the worksheet from the guide on how to compare contractor quotes, which explains each line and works through an example. This is the sheet to fill in while the bids are on the table.",
    ],
    contains: [
      "A header for each bid: the contractor, phone or email, and the date the quote arrived",
      `${quotes.a4.rows} comparison rows, from the total as written to the adjusted total`,
      "A gaps table: each exclusion or low allowance, priced for every bid that leaves it out",
      `The ${quotes.a4.questions} questions to ask before you pick, with space for two contractors' answers`,
      "A decision line: who you chose, why, when you signed and the deposit paid",
    ],
    steps: [
      "Send every contractor the same scope page, and note the date you sent it at the top.",
      "Give each quote its own column as it arrives, with the date you received it.",
      "Go down the rows. Leave a cell empty when the quote does not mention it; empty means unclear, not included.",
      "On page two, list every gap and put a rough price on it for each bid that leaves it out.",
      "Compare the adjusted totals, not the totals as written.",
      "Put the questions to your top two in writing, and write their answers on the sheet.",
    ],
    app: {
      title: "After you sign",
      body: [
        "Once you pick a contractor, the winning quote becomes money you have committed. In Home Stories, keep every quote and the signed contract as documents in the project, next to your notes, and log the deposit as a payment.",
        "If the contractor joins the project (sharing is Pro), you both see the same tasks, items and photos. The comparison sheet itself can go in as a photo or a scanned document, so the reason you chose them is still there in week four.",
      ],
    },
    faq: [
      {
        q: "What if I only have two quotes, or more than three?",
        a: "With two, leave a column empty. With more than three, print a second copy and carry the best of the first sheet over.",
      },
      {
        q: "What is an allowance?",
        a: "A placeholder price in a quote for something you have not chosen yet, such as tile or fixtures. A low allowance makes a quote look cheap now and expensive later, so compare it against real prices for what you want.",
      },
      {
        q: "Why price the gaps instead of just comparing totals?",
        a: "Because the totals do not price the same job. A quote that excludes electrics or patching is cheaper on paper, and you pay for the gap separately. The adjusted total is the honest comparison.",
      },
      {
        q: "Why is it landscape?",
        a: "Three bid columns need the width to write in. The questions and the gaps table are on page two, in the same layout.",
      },
    ],
    posts: [
      "how-to-compare-contractor-quotes",
      "diy-vs-hire-contractor",
      "managing-contractor-change-orders",
      "how-to-budget-a-home-renovation",
    ],
    publishDate: "2026-11-30",
  },
];

{
  for (const t of allTemplates) {
    if (!f[t.slug]) throw new Error(`Template "${t.slug}" has no files: run scripts/build-templates.py`);
  }
}

export function isTemplateLive(t: Template, now = new Date()): boolean {
  return !t.publishDate || new Date(`${t.publishDate}T00:00:00Z`).valueOf() <= now.valueOf();
}

/** Live entries at build time. The pages, the hub and llms.txt use this. */
export const templates: Template[] = allTemplates.filter((t) => isTemplateLive(t));

export function templateFiles(t: Template) {
  return f[t.slug];
}
