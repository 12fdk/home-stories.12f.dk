/**
 * Feature pages. Slugs here are the canonical /features/<slug>/ URLs. The hub
 * (/features/), the footer, /llms.txt and /llms-full.txt list them from this file.
 *
 * Each page answers one question people put to a search engine or an assistant
 * ("renovation app for iPad", "renovation app without an account") with the exact
 * limits from the App Store description: what is free and what is Pro, which
 * devices, what is off by default. Source of truth:
 *   curl -s "https://itunes.apple.com/lookup?id=6754754960&country=us"
 * Only claim what the app does today. Pro features are marked "(Pro)" in the copy
 * every time they are mentioned. Pro is a one-time purchase, not a subscription.
 *
 * Every page stands on its own: its own intro, facts, sections and FAQ. Do not copy
 * a block between entries (Google's scaled-content policy).
 *
 * Screenshots are real app screens: /public/screenshots, or the App Store
 * screenshots saved as /public/screenshots/feature-*.webp. Never mock UI.
 * `useCases` are slugs in src/data/useCases.ts; the page throws on an unknown slug
 * and links only the live ones.
 *
 * publishDate works like the use cases: a page goes live on the first daily build
 * (.github/workflows/deploy.yml) on or after that date.
 */
export interface Feature {
  slug: string;
  /** Short label for the hub, sibling links and llms.txt. */
  label: string;
  /** Search-intent H1. */
  h1: string;
  /** <title>, under ~60 characters. */
  metaTitle: string;
  /** Meta description, under ~160 characters. */
  metaDescription: string;
  /** True when the whole feature is part of Pro. */
  pro: boolean;
  /** Answer-first intro. 2–3 short paragraphs an answer engine can quote. */
  intro: string[];
  /** The exact limits, as short label/value pairs. */
  facts: { label: string; value: string }[];
  /** How the feature works. */
  sections: { title: string; body: string }[];
  /** How to start using it, in order. */
  steps: string[];
  screenshot: { src: string; alt: string; width: number; height: number; caption: string };
  faq: { q: string; a: string }[];
  /** Use-case slugs (src/data/useCases.ts) this feature matters most for. */
  useCases: string[];
  /** YYYY-MM-DD. The page is built from this date on. Omit for always live. */
  publishDate?: string;
}

export const allFeatures: Feature[] = [
  {
    slug: "offline-no-account",
    label: "Offline, no account, private",
    h1: "A renovation app with no account, that works offline and keeps your data on your device",
    metaTitle: "Renovation App with No Account That Works Offline",
    metaDescription:
      "Home Stories needs no account or sign-up, works offline and keeps your renovation projects on your iPhone or iPad unless you turn on sync or share.",
    pro: false,
    intro: [
      "Home Stories has no account and no sign-up. You open the app and create a project. There is no email to give and no password to forget.",
      "Your projects stay on your device unless you turn on iCloud sync (Pro) or share a project (Pro). Both run through your own private iCloud, not a server run by us. The app works offline, in a basement with no signal or a cabin with no internet.",
      "The app sends anonymous usage analytics, and you can switch them off in Settings. Local backups and a full data export are free.",
    ],
    facts: [
      { label: "Account", value: "None. No sign-up, no email" },
      { label: "Where data lives", value: "On your device" },
      { label: "Leaves the device", value: "Only if you turn on iCloud sync (Pro) or share a project (Pro)" },
      { label: "Analytics", value: "Anonymous, and can be switched off in Settings" },
      { label: "Offline", value: "Everything works offline" },
      { label: "Backups", value: "Local backups and full data export, free" },
    ],
    sections: [
      { title: "Nothing to sign up for", body: "The first screen is your project list, not a login form. No account means no account to be hacked, sold or closed, and nothing to set up before you photograph the wall you are about to open." },
      { title: "Offline is the normal case", body: "Renovations happen where the Wi-Fi is not: a gutted room, a loft, a garden shed. Adding an item, a photo, a payment or a task does not wait for a connection." },
      { title: "Sync is a choice, not a default", body: "iCloud sync (Pro) stays off until you switch it on. When it is on, it uses your own private iCloud, and it catches up when you are back online." },
      { title: "Analytics you can turn off", body: "The app collects anonymous usage analytics to see which screens people use. There is a switch for it under Privacy in Settings. Turn it off and it stays off." },
      { title: "Backups without a cloud", body: "Settings has local backups. A full data export is free too, so your records are never locked inside the app." },
    ],
    steps: [
      "Install Home Stories from the App Store. There is no sign-up screen.",
      "Create a project with a name, a start date and a budget.",
      "Open Settings, then Privacy, if you want to switch off anonymous analytics.",
      "Open Settings, then Backups, to see the local backups.",
    ],
    screenshot: {
      src: "/screenshots/feature-settings-privacy.webp",
      alt: "Home Stories Settings screen with currency, notifications, local backups, diagnostics and the analytics switch under Privacy",
      width: 1206,
      height: 2614,
      caption: "Settings on iPhone: local backups under Data, the analytics switch under Privacy.",
    },
    faq: [
      { q: "Is there a renovation app that works without an account?", a: "Yes. Home Stories has no account and no sign-up. You install it on your iPhone or iPad and create a project straight away. It is free, with an optional one-time Pro upgrade." },
      { q: "Does Home Stories work offline?", a: "Yes. Everything in the app works without a connection. If you use iCloud sync (Pro), it catches up when you are back online." },
      { q: "Where is my renovation data stored?", a: "On your device. It leaves the device only if you turn on iCloud sync (Pro) or share a project (Pro), and both go through your own private iCloud." },
      { q: "Does the app collect data about me?", a: "It sends anonymous usage analytics, which you can switch off in Settings under Privacy. There is no account, so there is no profile with your name or email." },
      { q: "How do I back up my projects without an account?", a: "Home Stories makes local backups, which you find in Settings. A full data export is free. With Pro you can also turn on iCloud sync to keep the projects on your other devices." },
    ],
    useCases: ["insurance-documentation", "holiday-home", "basement-conversion", "home-repairs-and-maintenance"],
    publishDate: "2026-11-30",
  },
  {
    slug: "ipad",
    label: "iPad app",
    h1: "A renovation app built for iPad: sidebar, inspector and drag and drop",
    metaTitle: "Renovation Planner App for iPad with Sidebar and Drag and Drop",
    metaDescription:
      "Home Stories on iPad: projects in a sidebar, tasks and notes in an inspector beside your work, drag and drop from Safari, Files and Photos, keyboard shortcuts.",
    pro: false,
    intro: [
      "Home Stories runs on iPad as an iPad app, not a stretched iPhone screen. Your projects sit in a sidebar, and the project you pick opens beside them.",
      "A task, item, note or document opens in an inspector next to your work, not on top of it. You can drag photos, PDFs and links straight in from Safari, Files or Photos, and use keyboard shortcuts and a pointer.",
      "The iPad layout is free. It needs iPadOS 17 or later.",
    ],
    facts: [
      { label: "Price", value: "Free. The iPad layout is not part of Pro" },
      { label: "Requires", value: "iPadOS 17 or later" },
      { label: "Layout", value: "Project sidebar, project view, inspector" },
      { label: "Drag and drop", value: "Photos, PDFs and links from Safari, Files or Photos" },
      { label: "Input", value: "Touch, keyboard shortcuts and pointer" },
      { label: "Same projects on iPhone", value: "With iCloud sync (Pro)" },
    ],
    sections: [
      { title: "Projects in a sidebar", body: "Every project is a card in the sidebar with its budget, what you have spent and the time logged. Pick one and it opens on the right, with the sidebar still there." },
      { title: "An inspector, not a pop-up", body: "Tap a note, a task, an item or a document and it opens in a column beside the project. You read the contractor's quote and still see the item list it belongs to." },
      { title: "Drag it in", body: "Drag a product photo or a link out of Safari, a quote PDF out of Files, or a batch of progress photos out of Photos, and drop them into the project." },
      { title: "Keyboard and pointer", body: "With a keyboard attached, the common actions have shortcuts, and the app supports a mouse or trackpad pointer." },
      { title: "A desk for the planning", body: "The iPhone is for the site: snap the sink, log the payment, start the timer. The iPad is for the evening: lay out the tasks, read the quotes, sort the photos." },
    ],
    steps: [
      "Install Home Stories on your iPad (iPadOS 17 or later).",
      "Create a project, or turn on iCloud sync (Pro) to bring your iPhone projects across.",
      "Pick a project in the sidebar.",
      "Tap a task, item, note or document to open it in the inspector.",
      "Drag photos, PDFs or links in from Safari, Files or Photos.",
    ],
    screenshot: {
      src: "/screenshots/feature-ipad-inspector.webp",
      alt: "Home Stories on iPad: the kitchen project with its notes, pictures and time log on the left and a note open in the inspector on the right",
      width: 1032,
      height: 1376,
      caption: "On iPad, a note opens in the inspector beside the project.",
    },
    faq: [
      { q: "Is there a renovation app for iPad?", a: "Yes. Home Stories has a full iPad layout: projects in a sidebar, the project beside them, and an inspector for tasks, items, notes and documents. It is free and needs iPadOS 17 or later." },
      { q: "Can I drag photos and PDFs into a renovation project on iPad?", a: "Yes. Drag photos, PDFs and links straight in from Safari, Files or Photos." },
      { q: "Does Home Stories support a keyboard and trackpad on iPad?", a: "Yes. It has keyboard shortcuts and pointer support." },
      { q: "Can I start a project on iPhone and continue on iPad?", a: "Yes, with iCloud sync (Pro). Turn it on and your edits reach your other devices as you make them. Without sync, each device keeps its own projects." },
    ],
    useCases: ["house-extension", "loft-conversion", "kitchen-renovation", "house-flipping"],
    publishDate: "2026-12-01",
  },
  {
    slug: "project-sharing",
    label: "Project sharing (Pro)",
    h1: "Share a renovation project with your partner or contractor",
    metaTitle: "Share a Renovation Project with Your Partner or Contractor",
    metaDescription:
      "Home Stories project sharing (Pro): invite a partner, family member or contractor. Everyone sees the same tasks, items and photos, kept in step through iCloud.",
    pro: true,
    intro: [
      "With project sharing (Pro), you invite a partner, a family member or your contractor into one project. Everyone sees the same tasks, items and photos, kept in step through iCloud.",
      "You share one project at a time, with a link you send any way you like. The people you invite can view and edit. Your other projects stay private.",
      "Sharing is part of Pro, a single purchase with no subscription. The person you invite needs Home Stories on an iPhone or iPad.",
    ],
    facts: [
      { label: "Price", value: "Pro, one-time purchase" },
      { label: "Who", value: "A partner, family member or contractor" },
      { label: "What is shared", value: "One project: its tasks, items and photos" },
      { label: "Access", value: "Everyone in the share can view and edit" },
      { label: "Runs through", value: "iCloud. No Home Stories account" },
      { label: "The other person needs", value: "Home Stories on iPhone or iPad" },
    ],
    sections: [
      { title: "One project, one list", body: "When your partner ticks off \"order tiles\" in the shop, it is ticked on your phone too. No more two lists, a group chat and a spreadsheet that disagree." },
      { title: "Bring the contractor in", body: "Share the bathroom project with the fitter. They see the tiles you chose, the photos of the pipes behind the wall, and the tasks that are waiting on them." },
      { title: "A link, not an account", body: "Tap Share Project, then Generate Share Link, and send it by Messages, mail or anything else. Nobody signs up for anything. The share runs on Apple's iCloud." },
      { title: "Only what you choose", body: "Sharing works per project. Share the kitchen with the builder and keep the budget for the garden to yourself." },
      { title: "A report for people outside the app", body: "For someone who does not have the app, export a PDF report (Pro) of the whole project or just the parts they need." },
    ],
    steps: [
      "Open the project you want to share.",
      "Tap Share Project, then Generate Share Link.",
      "Send the link to your partner, family member or contractor.",
      "They install Home Stories, then tap the link. If they install the app after getting the link, they tap it a second time to open the project.",
    ],
    screenshot: {
      src: "/screenshots/feature-share-project.webp",
      alt: "Home Stories Share Project screen: Collaborate Together, Full Access so everyone can view and edit, and a Generate Share Link button",
      width: 1206,
      height: 2614,
      caption: "The Share Project screen (Pro) on iPhone.",
    },
    faq: [
      { q: "Is there an app to share a renovation project with a contractor?", a: "Yes. Home Stories project sharing (Pro) lets you invite your contractor into one project. You both see the same tasks, items and photos, kept in step through iCloud." },
      { q: "Can my partner and I plan a renovation in the same app?", a: "Yes, with Pro. Share the project with your partner and you both add items, complete tasks and add photos in the same project." },
      { q: "Does the person I invite need an account?", a: "No Home Stories account. Sharing runs through iCloud. They need Home Stories installed on an iPhone or iPad to open the shared project." },
      { q: "Can I share one project and keep the others private?", a: "Yes. You share one project at a time. Your other projects are not shared." },
      { q: "Is project sharing a subscription?", a: "No. It is part of Pro, a one-time purchase that also adds the budget chart, task reminders, PDF export and iCloud sync. Family Sharing is included." },
    ],
    useCases: ["renovating-with-a-partner", "working-with-a-contractor", "holiday-home", "bathroom-remodel"],
    publishDate: "2026-12-02",
  },
  {
    slug: "time-tracking",
    label: "Time tracking",
    h1: "Track the hours on a renovation, with a Lock Screen timer and Dynamic Island",
    metaTitle: "Renovation Time Tracking App with Lock Screen Timer",
    metaDescription:
      "Free time tracking in Home Stories: start a timer on a project, see it on the Lock Screen and in the Dynamic Island (iPhone 14 Pro and later), total the hours.",
    pro: false,
    intro: [
      "Home Stories has built-in time tracking. Start a timer on a project, and it runs on your Lock Screen, and in the Dynamic Island on iPhone 14 Pro and later, so you do not have to open the app with dusty hands.",
      "When you stop, you save the session with an optional note on what you worked on. The project shows the total time next to the total spent, and the project list adds up the hours across all your projects.",
      "Time tracking is free. It is not part of Pro.",
    ],
    facts: [
      { label: "Price", value: "Free" },
      { label: "Lock Screen timer", value: "Yes, on iPhone" },
      { label: "Dynamic Island", value: "iPhone 14 Pro and later" },
      { label: "Logged per session", value: "Duration, date and an optional note" },
      { label: "Totals", value: "Per project, and across all projects" },
      { label: "In the PDF report", value: "As a Time Tracking section (Pro)" },
    ],
    sections: [
      { title: "A timer on the project", body: "Start the timer in the kitchen project when you pick up the trowel, and stop it when you put it down. The hours go on that project, not into a separate app." },
      { title: "On the Lock Screen", body: "The running timer shows on the Lock Screen. On iPhone 14 Pro and later it also sits in the Dynamic Island, so you see it while you use the phone for something else." },
      { title: "Your hours as a cost", body: "A DIY job looks cheap until you count the weekends. The total time sits beside the total spent, so you can judge what the job really took." },
      { title: "A log you can check", body: "Every session is listed with its length, its date and your note: demolition day one, demolition day two, the cabinet fit. Forgot the timer? Add the time by hand. The project total is the sum of those, not a guess." },
      { title: "Across every project", body: "The project list shows the time on each project and the total for all of them, so the kitchen and the deck do not blur into each other." },
    ],
    steps: [
      "Open the project you are about to work on.",
      "Start the timer.",
      "Lock the phone. The timer stays on the Lock Screen, and in the Dynamic Island on iPhone 14 Pro and later.",
      "Stop the timer when you are done, add a note if you like, and save. The session goes on the project total.",
    ],
    screenshot: {
      src: "/screenshots/tasks.webp",
      alt: "Home Stories kitchen project with its task list and a summary bar showing the due date, a total time of 39h 45m and the total spent",
      width: 1206,
      height: 2622,
      caption: "The project summary shows total time next to total spent.",
    },
    faq: [
      { q: "Is there a renovation app with time tracking?", a: "Yes. Home Stories has free built-in time tracking. You start a timer on a project, and the hours add up per project and across all your projects." },
      { q: "Does the timer show on the Lock Screen?", a: "Yes. A running timer shows on the iPhone Lock Screen, and in the Dynamic Island on iPhone 14 Pro and later." },
      { q: "Does time tracking need Pro?", a: "No. Time tracking is free. Pro adds the budget chart, task reminders, PDF export, iCloud sync and project sharing." },
      { q: "Can I see how many hours a DIY project took?", a: "Yes. Every timer session is logged with its length, date and an optional note, and the project shows the total time next to the total spent." },
    ],
    useCases: ["diy-projects", "house-flipping", "fixer-upper", "flooring-and-decorating"],
    publishDate: "2026-12-03",
  },
  {
    slug: "icloud-sync",
    label: "iCloud sync (Pro)",
    h1: "Your renovation projects on iPhone and iPad, with iCloud sync",
    metaTitle: "Renovation App with iCloud Sync for iPhone and iPad",
    metaDescription:
      "Home Stories iCloud sync (Pro): edits reach your other devices as you make them, through your own private iCloud. Sync is off until you switch it on.",
    pro: true,
    intro: [
      "With iCloud sync (Pro), your Home Stories projects are on your iPhone and your iPad. Edits reach your other devices as you make them. Start a project on iPhone in the shop, carry on planning it on iPad at home.",
      "Sync stays off until you switch it on. It runs through your own private iCloud, not a server run by us, and there is no Home Stories account.",
      "The app works offline either way. When you are back online, sync catches up.",
    ],
    facts: [
      { label: "Price", value: "Pro, one-time purchase" },
      { label: "Default", value: "Off until you switch it on" },
      { label: "Runs through", value: "Your own private iCloud" },
      { label: "Devices", value: "Your iPhone and iPad, iOS 17 or later" },
      { label: "Offline", value: "Works offline, catches up when back online" },
      { label: "Without sync", value: "Local backups and full data export, free" },
    ],
    sections: [
      { title: "Two screens, one project", body: "Photograph the cracked tile on your iPhone, and it is in the project on the iPad when you sit down to plan. Edits travel as you make them." },
      { title: "Off by default", body: "A fresh install keeps everything on the device. Nothing goes to iCloud until you switch sync on yourself." },
      { title: "Your iCloud, not ours", body: "Sync uses your private iCloud storage. There is no Home Stories server holding your projects and no account to sign in to." },
      { title: "A dead zone is fine", body: "Keep working in the basement with no signal. The changes wait on the device and go up when the phone finds a connection." },
      { title: "Sync is not sharing", body: "Sync keeps your own devices in step. To work on a project with another person, use project sharing (Pro)." },
    ],
    steps: [
      "Get Pro, the one-time upgrade, on the device where your projects are.",
      "Switch on iCloud sync in the app.",
      "Install Home Stories on your other iPhone or iPad and switch on sync there too.",
      "Edit on either device. Changes reach the other as you make them.",
    ],
    screenshot: {
      src: "/screenshots/feature-ipad-sidebar.webp",
      alt: "Home Stories on iPad: three projects in the sidebar and an overview of the money spent, the tasks due next and recent photos",
      width: 1032,
      height: 1376,
      caption: "The same projects on iPad, with an overview across all of them.",
    },
    faq: [
      { q: "Does Home Stories sync between iPhone and iPad?", a: "Yes, with iCloud sync (Pro). Turn it on and your edits reach your other devices as you make them." },
      { q: "Is iCloud sync on by default?", a: "No. Sync stays off until you switch it on. Until then your projects stay on the device." },
      { q: "Where does the synced data go?", a: "Into your own private iCloud. There is no Home Stories account and no server of ours holding your projects." },
      { q: "What happens to sync when I am offline?", a: "The app keeps working. Your changes wait on the device, and sync catches up when you are back online." },
      { q: "Is there a way to back up without Pro?", a: "Yes. Local backups and a full data export are free. iCloud sync is part of Pro." },
    ],
    useCases: ["holiday-home", "rental-property", "fixer-upper", "house-extension"],
    publishDate: "2026-12-04",
  },
  {
    slug: "home-screen-widgets",
    label: "Home Screen widgets",
    h1: "Renovation budget and next tasks on your Home Screen, with widgets",
    metaTitle: "Renovation Budget Widget for the iPhone Home Screen",
    metaDescription:
      "Free Home Stories widgets show a renovation's budget progress and the tasks due next on your iPhone or iPad Home Screen, without opening the app.",
    pro: false,
    intro: [
      "Home Stories has Home Screen widgets for budget progress and what is next. You see how much of the budget is spent and which tasks are due, without opening the app.",
      "Each widget shows the project you pick: the share of the budget spent, the amount against the total, how many tasks are done, and the next tasks with when they are due.",
      "Widgets are free. They are not part of Pro.",
    ],
    facts: [
      { label: "Price", value: "Free" },
      { label: "Shows", value: "Budget progress and the tasks due next" },
      { label: "Where", value: "The Home Screen, on iPhone and iPad" },
      { label: "Per widget", value: "The project you pick" },
      { label: "Task reminders", value: "Separate, part of Pro" },
    ],
    sections: [
      { title: "The number that matters", body: "A ring shows how much of the budget is gone, with the amount against the total under it: 65 per cent, $6.5k of $10.0k. You see an overrun building every time you unlock the phone." },
      { title: "What is next", body: "Below the budget, the widget lists the next tasks with when they are due: order cabinets today, finalise the design tomorrow, install the cabinets in three days." },
      { title: "Progress in one count", body: "A small count shows tasks done against the total, so you know where the project stands without opening it." },
      { title: "A glance, not a notification", body: "The widget does not ping you. If you want an alert on the day a task is due, that is task reminders (Pro)." },
    ],
    steps: [
      "Touch and hold an empty spot on the Home Screen, then add a widget.",
      "Search for Home Stories and add its widget.",
      "Touch and hold the widget and edit it to pick the project it shows.",
    ],
    screenshot: {
      src: "/screenshots/feature-home-screen-widget.webp",
      alt: "An iPhone Home Screen with the Home Stories widget: 65% of the budget spent, $6.5k of $10.0k, 5 of 12 tasks done and the next four tasks with their due dates",
      width: 1206,
      height: 2614,
      caption: "The Home Stories widget on an iPhone Home Screen.",
    },
    faq: [
      { q: "Is there a widget that shows my renovation budget?", a: "Yes. The Home Stories widget shows a project's budget progress, the amount spent against the total, and the next tasks due, on your Home Screen." },
      { q: "Are the widgets free?", a: "Yes. Home Screen widgets are free. Pro adds the budget chart, task reminders, PDF export, iCloud sync and project sharing." },
      { q: "Does the widget remind me when a task is due?", a: "The widget shows what is due next but does not send alerts. Task reminders are part of Pro." },
      { q: "Do the widgets work on iPad?", a: "Yes. The widget can sit on the iPad Home Screen as well as the iPhone's." },
    ],
    useCases: ["kitchen-renovation", "home-repairs-and-maintenance", "nursery-and-bedroom", "garden-and-landscaping"],
    publishDate: "2026-12-05",
  },
  {
    slug: "pdf-export",
    label: "PDF export (Pro)",
    h1: "Export a renovation report as a PDF, with a cover photo",
    metaTitle: "Renovation Report PDF Export App for iPhone and iPad",
    metaDescription:
      "Home Stories PDF export (Pro): a renovation report with a cover photo, for the whole project or only the sections you pick, ready to share.",
    pro: true,
    intro: [
      "With PDF export (Pro), Home Stories turns a project into a polished PDF report with a cover photo. You export the whole project or just the parts you need.",
      "You pick the sections: budget overview, tasks, items and purchases, time tracking, notes and the photo gallery. The cover page and summary are always included. Before you export, the app shows how many pages the report will have.",
      "PDF export is part of Pro. A full data export of your records is free.",
    ],
    facts: [
      { label: "Price", value: "Pro, one-time purchase" },
      { label: "Sections to pick", value: "Budget overview, tasks, items and purchases, time tracking, notes, photo gallery" },
      { label: "Always included", value: "Cover page and summary" },
      { label: "Before export", value: "Estimated page count" },
      { label: "Free alternative", value: "Full data export" },
    ],
    sections: [
      { title: "For people without the app", body: "A buyer, an estate agent, an insurer or a landlord does not need Home Stories to read a PDF. Send the report by mail or Messages, or save it to Files." },
      { title: "Only the parts they need", body: "Each section has a switch. The insurer gets the items, the receipts and the photos. The buyer gets the work done and the before-and-after pictures, not your notes on the plumber." },
      { title: "A cover and a summary", body: "Every report opens with a cover page and a summary of the project. The cover photo makes it look like a record, not a printout." },
      { title: "Know the length first", body: "The export screen shows the estimated page count as you switch sections on and off, so a 40-page photo gallery does not surprise you." },
    ],
    steps: [
      "Open the project.",
      "Choose Export PDF.",
      "Switch on the sections you want. The cover page and summary are always in.",
      "Check the estimated page count, then tap Generate & Share PDF.",
    ],
    screenshot: {
      src: "/screenshots/export-pdf.webp",
      alt: "Home Stories Export PDF screen with switches for budget overview, tasks, items and purchases, time tracking, notes and photo gallery, and an estimated page count",
      width: 1206,
      height: 2622,
      caption: "The Export PDF screen (Pro) on iPhone.",
    },
    faq: [
      { q: "Can I export my renovation project as a PDF?", a: "Yes, with Pro. Home Stories makes a PDF report with a cover photo, for the whole project or only the sections you pick." },
      { q: "What can go in the PDF report?", a: "Budget overview, tasks, items and purchases, time tracking, notes and the photo gallery, each with its own switch. The cover page and summary are always included." },
      { q: "Can I export my data without Pro?", a: "Yes. A full data export is free. The designed PDF report is part of Pro." },
      { q: "Is PDF export a subscription?", a: "No. It is part of Pro, a one-time purchase with nothing to cancel. Family Sharing is included." },
    ],
    useCases: ["selling-your-home", "insurance-documentation", "rental-property", "working-with-a-contractor"],
    publishDate: "2026-12-06",
  },
];

{
  const seen = new Set<string>();
  for (const { slug } of allFeatures) {
    if (seen.has(slug)) throw new Error(`Duplicate feature slug: ${slug}`);
    seen.add(slug);
  }
}

export function isFeatureLive(feature: Feature, now = new Date()): boolean {
  return !feature.publishDate || new Date(`${feature.publishDate}T00:00:00Z`).valueOf() <= now.valueOf();
}

/** Live entries at build time. Pages, the hub, the footer and llms.txt use this. */
export const features: Feature[] = allFeatures.filter((feature) => isFeatureLive(feature));
