import type { TemplateConfig } from "./configType";

const templateConfig: TemplateConfig = {
  name: "Home Stories",
  seo: {
    title: "Home Stories - Free Home Renovation Tracker for iPhone",
    description:
      "Track your renovation budget, organize tasks, and document progress with photos. Export professional PDF reports. Free for iPhone - download now!",
  },
  locale: "en",
  // English micro-copy. Other locales override this via src/i18n/translations.
  ui: {
    nav: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      toggleTheme: "Toggle dark mode",
      language: "Language",
    },
    header: {
      eyebrow: "Renovation tracker for iPhone",
      committedSuffix: "committed",
      spent: "Spent",
      committed: "Committed",
      left: "Left",
    },
    sectionLabels: {
      features: "Features",
      more: "More",
      demo: "Demo",
      reviews: "Reviews",
      howItWorks: "How it works",
      writing: "Writing",
      atAGlance: "At a glance",
    },
    videoDemo: {
      title: "Watch it run",
      subtitle:
        "Three screens, recorded from the app on an iPhone. No mockups, no narration.",
      tabs: ["Projects", "Budget", "Photos"],
    },
    blog: {
      title: "What we've learned about budgets",
      subtitle: "Notes from renovations that went over, and the ones that didn't.",
      allPosts: "All posts",
    },
    footer: {
      site: "Site",
      contact: "Contact",
      // The one-liner: problem + solution + result. Reused in the About lede
      // and the blog CTA so the same sentence works everywhere. #117
      tagline:
        "Renovation budgets drift. Home Stories puts spent, committed and remaining on one screen, so an overrun shows up while you can still act on it. A renovation tracker for iPhone, made in Denmark by Robert Jensen.",
    },
  },
  // Draws grid behind main container
  backgroundGrid: false,
  logo: "/logo.png",
  theme: "home",
  // Forces theme to be chosen above, no matter what user prefers
  forceTheme: false,
  // Shows switch to toggle between dark and light modes
  showThemeSwitch: true,
  appStoreLink:
    "https://apps.apple.com/app/id6754754960",
  googlePlayLink: "",
  footer: {
    legalLinks: {
      termsAndConditions: true,
      cookiesPolicy: true,
      privacyPolicy: true,
    },
    socials: {},
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/blog/", title: "Blog" },
      { href: "/downloads/", title: "Downloads" },
      { href: "/#faq", title: "FAQ" },
      { href: "/about/", title: "About" },
    ],
  },
  topNavbar: {
    cta: "Get the app",
    disableWidthAnimation: false,
    hideAppStore: false,
    hideGooglePlay: true,
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/blog/", title: "Blog" },
      { href: "/downloads/", title: "Downloads" },
      { href: "/#faq", title: "FAQ" },
      // Keep this array index-parallel with footer.links: applyTranslation maps
      // BOTH against the same t.nav.links array by position.
      { href: "/about/", title: "About" },
    ],
  },
  appBanner: {
    id: "app-banner",
    title: "Measure the next one.",
    subtitle:
      "Free on the App Store. Works offline, needs no account, and syncs with iCloud when you want it to. Requires iPhone with iOS 17 or later.",
    screenshots: [
      "/screenshots/projects-list.webp",
      "/screenshots/budget-chart.webp",
      "/screenshots/tasks.webp",
    ],
  },
  home: {
    seo: {
      title: "Home Stories - Free Home Renovation Tracker for iPhone",
      description:
        "Track your renovation budget, organize tasks, and document progress with photos. Export professional PDF reports. Free for iPhone - download now!",
    },
    // StoryBrand agreement plan: the same facts, phrased as the commitments
    // that remove the fear of downloading. #117
    facts: [
      { label: "Price", value: "Free" },
      { label: "Subscription", value: "None" },
      { label: "Account", value: "None" },
      { label: "Offline", value: "Always" },
      { label: "Your data", value: "On device" },
    ],
    // The missing middle of the story: the problem the reader is already in,
    // what it costs to leave alone, and what the other side looks like. Sits
    // directly under the hero, because that is where the story gap opens. #117
    stakes: {
      id: "stakes",
      label: "The problem",
      title: "The overrun doesn't announce itself",
      body: [
        "It arrives as a few hundred here, a change order there, and a receipt you meant to file. Each one is small enough to wave through, and none of them is the moment you notice.",
        "The spreadsheet only tells you once the tiles are down and the money is gone. And six months later, when the insurer asks what was behind that wall, nobody has a photo of it.",
      ],
      stat: {
        value: "15–30%",
        caption:
          "the band renovations typically overrun by — wider for older homes, and for anything that opens a wall.",
        linkText: "See what the data says",
        href: "/blog/renovation-cost-overrun-statistics/",
      },
      success: {
        label: "The other way",
        title: "Or you reach handover still holding the receipts",
        body: "Spent, committed and remaining sit on one screen from the first day. Every cost, photo and note lands on the project it belongs to, while you are still standing in the room. On handover day the whole job is one PDF — the figures, the timeline, and the proof of what was behind the wall.",
      },
      cta: "Start tracking — free",
    },
    testimonials: {
      id: "testimonials",
      title: "Every review, so far",
      // The three previous cards were template placeholders with invented
      // names. Checked against the App Store customer-review RSS feed on
      // 2026-09-18 across us/gb/de/dk/nl/se/no: this is the only real review
      // that exists. It stays a list of one until more arrive. #117
      subtitle:
        "The app is new, so there are not many yet. This is every review that has come in, unedited.",
      cards: [
        {
          name: "Henrik Moenster",
          source: "App Store · Denmark · 5★ · translated from Danish",
          comment:
            "This app is brilliant when you have to plan and carry out projects, large and small. I wish I had had it a couple of years ago when we renovated a flat. It would have been very useful for planning and documenting the renovation, the hours spent and the materials bought.",
        },
      ],
    },
    pricing: {
      id: "pricing",
      label: "Pricing",
      title: "Free to run the whole job",
      subtitle:
        "The core is free, forever. One small one-time purchase unlocks the deep budget tools.",
      // Both prices are only the fallback for a failed fetch: every build
      // overwrites them with the real in-app purchase price read from the
      // reader's locale storefront (utils/appStoreData → i18n/getConfig). #109
      plans: [
        {
          name: "Free",
          price: "$0.00",
          period: "forever",
          features: [
            "Unlimited projects, tasks, and phases",
            "Photo timeline with dated photos",
            "Expense logging and item prices",
            "Works fully offline",
            "iCloud sync across your devices",
            "Home Screen & Lock Screen widgets",
          ],
        },
        {
          name: "Home Stories Pro",
          price: "$9.99",
          period: "one-time — no subscription",
          highlight: true,
          features: [
            "Budget targets and the budget-vs-cost chart",
            "Advanced cost analysis",
            "PDF & CSV export of reports and time logs",
            "Task reminders and deadline notifications",
          ],
          cta: "Get the app — upgrade inside",
        },
      ],
      footnote:
        "One-time price from the App Store — it varies by country.",
    },
    comparison: {
      id: "vs-spreadsheets",
      label: "Vs the spreadsheet",
      title: "Why not just a spreadsheet?",
      subtitle: "It works — until about week three. The honest comparison.",
      columns: { them: "A spreadsheet", us: "Home Stories" },
      rows: [
        {
          aspect: "Photos",
          them: "In a camera roll or folder, unlabeled",
          us: "Dated and pinned to the project timeline",
        },
        {
          aspect: "Totals",
          them: "Formulas you write and maintain yourself",
          us: "Spent, committed, and remaining — automatic",
        },
        {
          aspect: "On site",
          them: "Pinch-zooming cells on your phone",
          us: "Built for iPhone, works fully offline",
        },
        {
          aspect: "Sharing",
          them: "Emailing budget_v7_final_FINAL.xlsx",
          us: "Live iCloud sharing, or a PDF anyone can read",
        },
        {
          aspect: "Receipts",
          them: "A shoebox and good intentions",
          us: "Photographed and stored with the project",
        },
        {
          aspect: "When it breaks",
          them: "A deleted formula fails silently",
          us: "Nothing to maintain — the structure is built in",
        },
      ],
      cta: {
        text: "Read why spreadsheets stop working",
        href: "/blog/renovation-spreadsheet-alternative/",
      },
    },
    howItWorks: {
      id: "how-it-works",
      title: "Four steps, start to handover",
      subtitle:
        "The order the app expects, and the order a renovation actually runs in.",
      steps: [
        {
          title: "Set the budget",
          subtitle:
            "Name the project, put a number on it, and give it a deadline. That number is what everything else is measured against.",
          image: "/stock/01.webp",
          imageAlt:
            "A notebook and calculator on a kitchen worktop beside a tape measure, with a renovation budget written out by hand.",
        },
        {
          title: "List the work",
          subtitle:
            "Break the job into tasks, then add the materials, fixtures, and quotes each one needs. Estimates now, receipts later.",
          image: "/stock/02.webp",
          imageAlt:
            "Timber studs and boxed fixtures stacked in a stripped-back room waiting to be fitted.",
        },
        {
          // Costs and photos are one habit on site, not two steps: a plan
          // stays a plan at four steps, not five. #117
          title: "Log the spend, shoot the work",
          subtitle:
            "Enter costs as they land and photograph straight from the app. The chart splits spent, committed, and remaining, so an overrun shows up while you can still act on it — and every photo is dated and pinned to the project.",
          image: "/stock/03.webp",
          imageAlt:
            "A pile of building-merchant receipts and invoices spread across a table next to a phone.",
        },
        {
          title: "Export the report",
          subtitle:
            "One tap turns budget, tasks, photos, and notes into a PDF. Send it to the contractor, the insurer, or the folder you'll want next year.",
          image: "/stock/05.webp",
          imageAlt:
            "A printed project report on a worktop in a finished room, ready to hand to a contractor.",
        },
      ],
    },
    features: {
      id: "features",
      title: "Four screens do the work",
      subtitle:
        "No spreadsheet, no shoebox of receipts, no photo roll you can't search.",
      cards: [
        {
          label: "Budget",
          title: "See the overrun coming",
          subtitle:
            "Spent, committed, and remaining on one chart. You find out you're over while there's still something you can do about it.",
          icon: "/icons/budget-tracking.png",
          screenshot: "/screenshots/budget-chart.webp",
          // Skip past the project photo to the budget donut itself.
          crop: "-27%",
        },
        {
          label: "Tasks",
          title: "Keep the order straight",
          subtitle:
            "Group the work into tasks and items per phase, and mark them off. Electrician before plasterer, every time.",
          icon: "/icons/task-management.png",
          screenshot: "/screenshots/tasks.webp",
        },
        {
          label: "Photos",
          title: "Prove what was there",
          subtitle:
            "Dated photos pinned to the project build a timeline you can scroll — before, during, and behind the wall.",
          icon: "/icons/photo-timeline.png",
          screenshot: "/screenshots/photo-timeline.webp",
        },
        {
          label: "Export",
          title: "Hand over a PDF",
          subtitle:
            "Budget, tasks, photos, and notes in one report your contractor, insurer, or future buyer can actually read.",
          icon: "/icons/pdf-export.png",
          screenshot: "/screenshots/export-pdf.webp",
        },
      ],
    },
    capabilities: {
      id: "more",
      title: "And everything around the edges",
      subtitle:
        "The four screens do the heavy lifting. These are the parts that keep the rest of a renovation from slipping through the cracks.",
      cards: [
        {
          icon: "widget",
          title: "Widgets & Live Activities",
          subtitle:
            "A budget ring on your Lock Screen, the next tasks at a glance, and a Dynamic Island timer while you work — without opening the app.",
        },
        {
          icon: "clock",
          title: "Time tracking",
          subtitle:
            "Log hours against a project and see where the days actually went, broken down visually alongside the money.",
        },
        {
          icon: "note",
          title: "Notes & documents",
          subtitle:
            "Keep contracts, receipts, and tagged notes with photos attached to the project they belong to — not in a drawer.",
        },
        {
          icon: "tag",
          title: "Items & shopping lists",
          subtitle:
            "Save purchases with prices and store details, organised by phase, so actual cost lands next to what you estimated.",
        },
        {
          icon: "search",
          title: "Search & Share extension",
          subtitle:
            "Search across every project instantly, and save a product straight from Safari, IKEA, or Amazon into the right one.",
        },
        {
          icon: "users",
          title: "Real-time collaboration",
          subtitle:
            "Share a project over iCloud and keep it in sync with a partner, family, or the contractor doing the work.",
        },
        {
          icon: "flag",
          title: "Project priorities",
          subtitle:
            "Flag each project Low, Medium, or High and sort your list — by priority, date, or name — so the next job is on top.",
        },
        {
          icon: "globe",
          title: "51 languages, accessible",
          subtitle:
            "Fully translated into 51 languages, with VoiceOver and Dynamic Type support throughout. Works 100% offline.",
        },
      ],
    },
    faq: {
      id: "faq",
      title: "Questions, answered",
      qa: [
        {
          question: "Is Home Stories free to use?",
          answer:
            "Yes — free for the whole job, with unlimited projects, tasks, phases, photos and expense logging. One optional in-app purchase, Home Stories Pro, unlocks budget targets, the budget-vs-cost chart, PDF and CSV export, and task reminders. It is a one-time price, not a subscription.",
        },
        {
          question: "Does the app work offline?",
          answer:
            "Fully. Projects, budgets and photos all live on the device, so the app works in a basement with no signal and syncs later. Nothing about it depends on being online.",
        },
        {
          question: "Can I share projects with others?",
          answer:
            "Yes, two ways. Share a project over iCloud and it stays in sync in real time with a partner, family member or contractor. Or export a PDF report — budget, tasks, photos and notes — for anyone who just needs to read it.",
        },
        {
          question: "How do I export reports?",
          answer:
            "Open the project, tap export, and choose PDF or CSV. The report comes out with the budget summary, task progress, photos and notes already laid out, ready to send to a contractor or an insurer. Export is part of Home Stories Pro.",
        },
        {
          question: "What devices are supported?",
          answer:
            "iPhone, running iOS 17.0 or later. There is no iPad or Android version yet.",
        },
        {
          question: "Does Home Stories have widgets?",
          answer:
            "Yes. Add a budget progress ring and upcoming tasks to your Home Screen and Lock Screen, and use Live Activities with Dynamic Island to keep a project timer in view while you work — all without opening the app.",
        },
        {
          question: "Can I collaborate with a partner or contractor?",
          answer:
            "Yes. Share a project over iCloud and it stays in sync in real time across everyone's devices, so a partner, family member, or contractor can follow the budget, tasks, and photos as they change.",
        },
        {
          question: "What languages is Home Stories available in?",
          answer:
            "Home Stories is fully translated into 51 languages, including English, German, French, Spanish, Italian, Danish, Dutch, Portuguese, Japanese, Chinese, Korean, and many more, with full VoiceOver and Dynamic Type accessibility support.",
        },
        {
          question: "Can I track costs by category, like materials and labour?",
          answer:
            "Yes — costs live where the work is. Break the project into phases and tasks, then attach the materials, fixtures, labour items, and quotes each one needs. The budget chart rolls it all up as spent, committed, and remaining, and the PDF report itemizes it.",
        },
        {
          question: "How do I manage multiple contractors?",
          answer:
            "Group the work into phases and tasks so each trade knows what happens when — electrician before plasterer. Share the project over iCloud so a contractor can follow the budget, tasks, and photos live, or export a PDF with just the sections they need.",
        },
        {
          question: "How do I avoid going over budget?",
          answer:
            "The budget chart shows spent, committed, and remaining at a glance, so an overrun shows up while there's still time to act. Add the Home Screen or Lock Screen widget to keep the budget ring in view without opening the app.",
        },
        {
          question: "Is my project data backed up?",
          answer:
            "Yes — with iCloud sync on, your projects live in your iCloud account and follow you to a new iPhone. Everything also works fully offline; changes sync when you're back online.",
        },
      ],
    },
    header: {
      headline: "Finish the renovation without the budget getting away from you.",
      subtitle:
        "Renovations drift because nobody sees the overrun until the money is already spent. Home Stories keeps spent, committed and remaining on one screen — with tasks in the right order and dated photos that prove what happened.",
      screenshots: [
        "/screenshots/projects-list.webp",
        "/screenshots/budget-chart.webp",
        "/screenshots/tasks.webp",
      ],
      rewards: [],
      usersDescription: "Built by a homeowner mid-renovation, for homeowners mid-renovation",
      // "budget getting away" — the words carrying the desire, not the feature.
      headlineMark: [5, 8],
      // The kitchen project in the screenshot beside it, figure for figure.
      sample: {
        project: "Kitchen renovation",
        currency: "$",
        budget: 25000,
        spent: 12950,
        potential: 1430,
      },
    },
  },
  privacyPolicy: {
    seo: {
      title: "Privacy Policy — Home Stories Renovation App for iPhone",
      description: "How Home Stories handles your renovation data: stored on-device by default, synced only to your own iCloud, with no tracking and no advertising.",
    },
    content: `# Privacy Policy

**Effective Date:** January 2026

## Introduction

Welcome to Home Stories (the "App"). Robert Jensen ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our App.

For the full privacy policy, please visit: [https://www.12f.dk/home-stories/privacy-policy/](https://www.12f.dk/home-stories/privacy-policy/)

## Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at:

Robert Jensen
Adjudantvaenget 12, 3520 Farum, Denmark
robert@12f.dk
+45 29475566

`,
  },
  cookiesPolicy: {
    seo: {
      title: "Cookies Policy — Home Stories Renovation App for iPhone",
      description: "Which cookies home-stories.12f.dk sets, what the privacy-friendly analytics record, and how to opt out. No advertising or cross-site tracking cookies.",
    },
    content: `# Cookies Policy

This website does not use cookies for tracking or advertising purposes.

## Contact Us

If you have any questions, please contact us at robert@12f.dk
`,
  },
  termsAndConditions: {
    seo: {
      title: "Terms & Conditions — Home Stories Renovation App",
      description: "The terms covering use of the Home Stories iPhone app and this website, including the one-time Pro purchase, acceptable use, and limits of liability.",
    },
    content: `# Terms and Conditions

**Effective Date:** January 2026

## Introduction

Welcome to Home Stories (the "App"). These Terms and Conditions govern your use of the App provided by Robert Jensen ("we," "our," or "us"). By accessing or using our App, you agree to be bound by these Terms.

## Use of the App

### Eligibility
To use our App, you must be at least 4 years old (as per App Store rating).

### User Accounts
You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.

## Intellectual Property

All content and materials available on the App are the property of Robert Jensen and are protected by intellectual property laws.

## Disclaimers

The App is provided on an "as is" and "as available" basis. We make no warranties about the accuracy or completeness of the content.

## Governing Law

These Terms shall be governed by and construed in accordance with the laws of Denmark.

## Contact Us

If you have any questions about these Terms, please contact us at:

Robert Jensen
Adjudantvaenget 12, 3520 Farum, Denmark
robert@12f.dk
+45 29475566
`,
  },
};

export default templateConfig;
