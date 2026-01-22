import type { TemplateConfig } from "./configType";

const templateConfig: TemplateConfig = {
  name: "Home Stories",
  seo: {
    title: "Home Stories - Free Home Renovation Tracker for iPhone",
    description:
      "Track your renovation budget, organize tasks, and document progress with photos. Export professional PDF reports. Free for iPhone - download now!",
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
      termsAndConditions: false,
      cookiesPolicy: false,
      privacyPolicy: false,
    },
    socials: {},
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
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
      { href: "/#faq", title: "FAQ" },
    ],
  },
  appBanner: {
    id: "app-banner",
    title: "Download Home Stories Today!",
    subtitle:
      "Your complete project management tool for home renovations. Track budgets, organize tasks, and document your progress. Available on the App Store.",
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
    testimonials: {
      id: "testimonials",
      title: "What Homeowners Say",
      subtitle: "Hear from renovators using Home Stories",
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
    partners: {
      title: "",
      logos: [],
    },
    howItWorks: {
      id: "how-it-works",
      title: "How it works",
      subtitle:
        "Manage your renovation project from start to finish with Home Stories",
      steps: [
        {
          title: "Create Your Project",
          subtitle:
            "Set up a renovation project with your budget and timeline to get started tracking your home improvement.",
          image: "/stock/01.webp",
        },
        {
          title: "Add Tasks & Items",
          subtitle:
            "Break down the work into manageable tasks and track materials, fixtures, and items needed for each phase.",
          image: "/stock/02.webp",
        },
        {
          title: "Track Your Budget",
          subtitle:
            "Monitor spending with visual charts showing spent, potential, and remaining budget at a glance.",
          image: "/stock/03.webp",
        },
        {
          title: "Document Progress",
          subtitle:
            "Capture photos throughout your renovation to create a visual timeline of your home's transformation.",
          image: "/stock/04.webp",
        },
        {
          title: "Export & Share",
          subtitle:
            "Generate professional PDF reports to share with contractors, keep for records, or show off your progress.",
          image: "/stock/05.webp",
        },
      ],
    },
    features: {
      id: "features",
      title: "Everything You Need for Your Renovation",
      subtitle:
        "Plan, track, and document your home improvement projects with powerful features",
      cards: [
        {
          title: "Budget Tracking",
          subtitle:
            "Track costs vs. estimates with visual charts showing spent, potential, and remaining budget. Stay on top of your renovation finances.",
          icon: "/icons/budget-tracking.png",
        },
        {
          title: "Photo Timeline",
          subtitle:
            "Document your renovation progress with photos organized by date. Create a visual record of your home's transformation.",
          icon: "/icons/photo-timeline.png",
        },
        {
          title: "Task Management",
          subtitle:
            "Organize work into tasks, track completion status, and keep your renovation project moving forward efficiently.",
          icon: "/icons/task-management.png",
        },
        {
          title: "PDF Export",
          subtitle:
            "Generate professional project reports to share with contractors, insurance, or keep for your records.",
          icon: "/icons/pdf-export.png",
        },
      ],
    },
    faq: {
      id: "faq",
      title: "Frequently Asked Questions",
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
      ],
    },
    header: {
      headline: "Manage Your Home Renovation",
      subtitle:
        "Home Stories is your complete project management tool for home renovations. Track budgets, organize tasks, document progress with photos, and export professional reports.",
      screenshots: [
        "/screenshots/tasks.webp",
        "/screenshots/budget-chart.webp",
        "/screenshots/projects-list.webp",
      ],
      rewards: [],
      usersDescription: "Join homeowners managing their renovations",
      headlineMark: [2, 3],
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
