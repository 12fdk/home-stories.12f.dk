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
      tagline: "A renovation tracker for iPhone. Made in Denmark by Robert Jensen.",
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
    "https://apps.apple.com/dk/app/home-stories-renovation-app/id6754754960",
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
      { href: "/#faq", title: "FAQ" },
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
      { href: "/#faq", title: "FAQ" },
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
    facts: [
      { label: "Price", value: "Free" },
      { label: "Offline", value: "Fully" },
      { label: "Account", value: "None" },
      { label: "Sync", value: "iCloud" },
      { label: "Requires", value: "iOS 17" },
    ],
    testimonials: {
      id: "testimonials",
      title: "What homeowners say",
      subtitle: "From people mid-renovation",
      cards: [
        {
          name: "Anders T.",
          comment:
            "Home Stories made our kitchen renovation so much easier to manage. The budget tracking feature showed exactly where every krone went, and the photo timeline became a fantastic record of the transformation.",
        },
        {
          name: "Maria S.",
          comment:
            "I'm renovating multiple rooms and Home Stories keeps everything organized. Each project has its own tasks, budget, and photos. The PDF export is perfect for sharing progress with contractors.",
        },
        {
          name: "Thomas H.",
          comment:
            "The budget charts are incredible. I can see at a glance what's spent, what's remaining, and potential costs. No more spreadsheets - Home Stories has everything in one place.",
        },
      ],
    },
    howItWorks: {
      id: "how-it-works",
      title: "Five steps, start to handover",
      subtitle:
        "The order the app expects, and the order a renovation actually runs in.",
      steps: [
        {
          title: "Set the budget",
          subtitle:
            "Name the project, put a number on it, and give it a deadline. That number is what everything else is measured against.",
          image: "/stock/01.webp",
        },
        {
          title: "List the work",
          subtitle:
            "Break the job into tasks, then add the materials, fixtures, and quotes each one needs. Estimates now, receipts later.",
          image: "/stock/02.webp",
        },
        {
          title: "Log what you spend",
          subtitle:
            "Enter costs as they land. The chart splits spent, committed, and remaining, so an overrun shows up while you can still act on it.",
          image: "/stock/03.webp",
        },
        {
          title: "Photograph the progress",
          subtitle:
            "Shoot from inside the app. Photos are dated and pinned to the project, which is how you settle what the wall looked like in March.",
          image: "/stock/04.webp",
        },
        {
          title: "Export the report",
          subtitle:
            "One tap turns budget, tasks, photos, and notes into a PDF. Send it to the contractor, the insurer, or the folder you'll want next year.",
          image: "/stock/05.webp",
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
            "Yes, it's free! We also offer a Premium Lifetime upgrade with more advanced features for serious renovators.",
        },
        {
          question: "Does the app work offline?",
          answer:
            "Absolutely! Home Stories is designed to work fully offline so you can access your projects, budgets, and photos even without internet access - perfect for job sites.",
        },
        {
          question: "Can I share projects with others?",
          answer:
            "Yes! With iCloud sync your projects stay up to date across your devices. You can also export professional PDF reports to share with contractors, family, or keep for records.",
        },
        {
          question: "How do I export reports?",
          answer:
            "Simply open your project, tap the export button, and choose PDF. Home Stories generates a professional report with your budget summary, task progress, photos, and notes.",
        },
        {
          question: "What devices are supported?",
          answer:
            "Home Stories is currently available for iPhone and requires iOS 17.0 or later. We're focused on delivering the best possible experience on iOS first.",
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
      ],
    },
    header: {
      headline: "Your home renovation, measured.",
      subtitle:
        "Home Stories is a renovation tracker for iPhone. Budgets that stay honest, tasks in the right order, photos that prove what happened — exported as a PDF your contractor can read.",
      screenshots: [
        "/screenshots/projects-list.webp",
        "/screenshots/budget-chart.webp",
        "/screenshots/tasks.webp",
      ],
      rewards: [],
      usersDescription: "Built by a homeowner mid-renovation, for homeowners mid-renovation",
      headlineMark: [3, 4],
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
      title: "Privacy Policy - Home Stories",
      description: "Privacy Policy for Home Stories - Renovation App",
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
      title: "Cookies Policy - Home Stories",
      description: "Cookies Policy for Home Stories",
    },
    content: `# Cookies Policy

This website does not use cookies for tracking or advertising purposes.

## Contact Us

If you have any questions, please contact us at robert@12f.dk
`,
  },
  termsAndConditions: {
    seo: {
      title: "Terms and Conditions - Home Stories",
      description: "Terms and Conditions for Home Stories - Renovation App",
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
