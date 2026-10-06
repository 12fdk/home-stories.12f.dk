import type { TemplateConfig } from "./configType";

const templateConfig: TemplateConfig = {
  name: "Home Stories",
  seo: {
    title: "Home Stories - Free Home Renovation Tracker for iPhone and iPad",
    description:
      "Track a renovation on iPhone or iPad: budget, tasks, photos, notes and documents. Free, works offline, no account. iOS 17 or later.",
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
      eyebrow: "Renovation tracker for iPhone and iPad",
      runningTotal: "Running total",
      budgetLabel: "Budget",
      ofBudget: "of budget",
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
        "Renovation budgets drift. Home Stories puts the running total on one screen, so an overrun shows up while you can still act on it. A renovation tracker for iPhone and iPad, made in Denmark by Robert Jensen.",
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
      "Free on the App Store for iPhone and iPad. Works offline and needs no account. Requires iOS 17 or later.",
    screenshots: [
      "/screenshots/projects-list.webp",
      "/screenshots/budget-chart.webp",
      "/screenshots/tasks.webp",
    ],
  },
  home: {
    seo: {
      title: "Home Stories - Free Home Renovation Tracker for iPhone and iPad",
      description:
        "Track a renovation on iPhone or iPad: budget, tasks, photos, notes and documents. Free, works offline, no account. iOS 17 or later.",
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
        body: "A running total sits on the project from the first day, with materials, labour and contractor kept apart. Photos and notes land on the same project while you are still in the room.",
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
            "Unlimited projects, photos, notes, and documents",
            "Items with prices, and a running total",
            "Payments split by materials, labour, and contractor",
            "Tasks, time tracking, and Home Screen widgets",
            "Local backups and data export",
            "Works fully offline, no account",
          ],
        },
        {
          name: "Home Stories Pro",
          price: "$9.99",
          period: "one-time — no subscription",
          highlight: true,
          features: [
            "Budget vs actual chart",
            "Task reminders",
            "PDF export",
            "iCloud sync",
            "Project sharing",
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
          us: "A running total. Materials, labour and contractor kept apart.",
        },
        {
          aspect: "On site",
          them: "Pinch-zooming cells on your phone",
          us: "Built for iPhone and iPad, works fully offline",
        },
        {
          aspect: "Sharing",
          them: "Emailing budget_v7_final_FINAL.xlsx",
          us: "iCloud sharing or a PDF — both part of Pro",
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
            "Log payments as they land and photograph from the app. Materials, labour and contractor stay apart, and the running total updates with them. Every photo is dated and pinned to the project.",
          image: "/stock/03.webp",
          imageAlt:
            "A pile of building-merchant receipts and invoices spread across a table next to a phone.",
        },
        {
          title: "Export the report",
          subtitle:
            "Pro turns the project into a PDF: budget, tasks, photos and notes, or just the parts you need. Send it to the contractor, the insurer, or the folder you'll want next year.",
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
            "A running total as you log payments, split by materials, labour and contractor. The budget-vs-actual chart is part of Pro.",
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
            "A PDF of the whole project, or just the parts you need. Export is part of Pro.",
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
            "Home Screen widgets for budget progress and what is next, and a Lock Screen timer while you track time.",
        },
        {
          icon: "clock",
          title: "Time tracking",
          subtitle:
            "Log hours against a project and see where the days went, next to the running total.",
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
            "Save purchases with a price and the shop, organised by phase, so each one adds to the running total.",
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
            "Share a project with a partner, family or the contractor. Sharing and iCloud sync are part of Pro.",
        },
        {
          icon: "flag",
          title: "Project priorities",
          subtitle:
            "Flag each project Low, Medium, or High and sort your list — by priority, date, or name — so the next job is on top.",
        },
        {
          icon: "globe",
          title: "50 languages, accessible",
          subtitle:
            "Fully translated into 50 languages, with VoiceOver and Dynamic Type support throughout. Works 100% offline.",
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
            "Yes. Unlimited projects, items, photos, notes, documents, tasks, time tracking, Home Screen widgets, local backups and data export are free. Home Stories Pro is an optional one-time purchase, not a subscription. It adds the budget-vs-actual chart, task reminders, PDF export, iCloud sync and project sharing.",
        },
        {
          question: "Does the app work offline?",
          answer:
            "Yes. Projects, photos and payments live on the device, so it works with no signal. iCloud sync is part of Pro, stays off until you turn it on, and catches up when you are back online.",
        },
        {
          question: "Can I share projects with others?",
          answer:
            "Project sharing is part of Home Stories Pro. You invite a partner, family member or contractor, and they see the same tasks, items and photos over iCloud. A PDF report, also part of Pro, is the version for someone who only needs to read it.",
        },
        {
          question: "How do I export reports?",
          answer:
            "PDF export is part of Home Stories Pro: a report with a cover photo, for the whole project or just the parts you choose. A full data export of the project is included free.",
        },
        {
          question: "What devices are supported?",
          answer:
            "iPhone and iPad, running iOS 17.0 or later. The iPad app is native. There is no Android version.",
        },
        {
          question: "Does Home Stories have widgets?",
          answer:
            "Yes. Home Screen widgets show budget progress and what's next. Time tracking has a Lock Screen timer, and Dynamic Island on iPhone 14 Pro and later.",
        },
        {
          question: "Can I collaborate with a partner or contractor?",
          answer:
            "Yes, with Home Stories Pro. Share a project over iCloud and the people you invite see the same tasks, items and photos.",
        },
        {
          question: "What languages is Home Stories available in?",
          answer:
            "Home Stories is available in 50 languages, including English, German, French, Spanish, Italian, Danish, Dutch, Portuguese, Japanese, Chinese, Korean and many more, with VoiceOver and Dynamic Type support.",
        },
        {
          question: "Can I track costs by category, like materials and labour?",
          answer:
            "Yes. Log payments and keep materials, labour and contractor costs apart. Each item's price adds to the project's running total. The budget-vs-actual chart, which compares that total with the budget, is part of Home Stories Pro.",
        },
        {
          question: "How do I manage multiple contractors?",
          answer:
            "Keep each trade's payments apart from materials and labour, and keep their quotes and contracts as documents on the project. Sharing the live project, or exporting a PDF, is part of Home Stories Pro.",
        },
        {
          question: "How do I avoid going over budget?",
          answer:
            "The free app keeps a running total as you log items and payments. Home Stories Pro adds a budget-vs-actual chart so the gap is visible while you can still change the plan. A Home Screen widget can show budget progress without opening the app.",
        },
        {
          question: "Is my project data backed up?",
          answer:
            "Local backups are included free, and so is a full data export. iCloud sync, which keeps the project on your other devices, is part of Home Stories Pro and stays off until you turn it on.",
        },
      ],
    },
    header: {
      headline: "Finish the renovation without the budget getting away from you.",
      subtitle:
        "Renovations drift because the overrun stays invisible until the money is gone. Home Stories keeps a running total on one screen, with tasks in order and dated photos of what happened.",
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
      },
    },
  },
  privacyPolicy: {
    seo: {
      title: "Privacy Policy — Home Stories",
      description: "How Home Stories handles your renovation data: stored on the device by default. iCloud sync is optional, part of Pro, and off until you turn it on. Anonymous usage analytics can be switched off in Settings. No advertising.",
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
      title: "Cookies Policy — Home Stories",
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
      description: "The terms covering use of the Home Stories app for iPhone and iPad and this website, including the one-time Pro purchase, acceptable use, and limits of liability.",
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
