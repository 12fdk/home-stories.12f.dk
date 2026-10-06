/**
 * Topic hubs. Slugs here are the canonical /guides/<slug>/ URLs.
 * Keep the same URLs in src/data/llms-preamble.md and llms-full-preamble.md.
 * Post slugs must exist in src/content/blog — the hub page throws if one is missing.
 */
export interface Guide {
  slug: string;
  /** Short label for nav, sibling links, and the blog index. */
  label: string;
  /** Search-intent H1. */
  h1: string;
  /** <title> */
  metaTitle: string;
  /** Meta description, kept under ~160 characters. */
  metaDescription: string;
  /** Answer-first intro. 2–4 sentences an answer engine can quote. */
  intro: string[];
  /** Published post slugs, pillar first. */
  posts: string[];
}

export const guides: Guide[] = [
  {
    slug: "budgeting-a-renovation",
    label: "Budgeting and contingency",
    h1: "How to budget a home renovation and set a contingency",
    metaTitle: "How to Budget a Home Renovation and Set a Contingency",
    metaDescription:
      "How to build a renovation budget, how much contingency to hold, and how to track costs, receipts and hidden surprises as the work opens up.",
    intro: [
      "A renovation budget is a total plus a contingency, not a single number you hope to hit. The figure that matters once work starts is the running total of what you have actually paid, with materials, labour and contractor kept apart, not the estimate from day one.",
      "Most of the damage comes from work you could not price until a wall was open, and from costs that were never written down on the day they landed. Set the contingency before you start, then log payments as they happen.",
      "The guides below cover how to build the budget, how large a contingency to hold, where older homes blow the plan, and how to keep receipts and the insurance record.",
    ],
    posts: [
      "how-to-budget-a-home-renovation",
      "renovation-contingency-budget",
      "renovation-cost-overrun-statistics",
      "hidden-costs-older-home",
      "how-to-track-home-improvement-expenses",
      "how-to-organize-renovation-receipts",
      "renovation-budget-template",
      "documenting-renovation-for-insurance",
    ],
  },
  {
    slug: "hiring-contractors",
    label: "Hiring contractors",
    h1: "How to hire and manage a renovation contractor",
    metaTitle: "How to Hire and Manage a Renovation Contractor",
    metaDescription:
      "Compare contractor quotes on the same scope, handle change orders in writing, and decide what is worth doing yourself.",
    intro: [
      "Hire on a written scope you can compare line by line, not on the lowest number on the page. A discount that only lasts if you sign today usually means something was left out of the price.",
      "Once work starts, a change order is a new price for new work. Write it down before that work happens. Do the job yourself only where both the skill and the risk sit with you.",
      "These guides cover comparing quotes, managing change orders and scope creep, and the DIY-versus-hire decision.",
    ],
    posts: [
      "how-to-compare-contractor-quotes",
      "managing-contractor-change-orders",
      "diy-vs-hire-contractor",
    ],
  },
  {
    slug: "renovation-timelines",
    label: "Timelines and sequencing",
    h1: "How long a renovation takes, and the order the work has to happen",
    metaTitle: "How Long a Renovation Takes: Timelines and Sequence",
    metaDescription:
      "Realistic timelines for kitchens, bathrooms, extensions, roofs and the other jobs, plus the sequence trades have to follow.",
    intro: [
      "A kitchen or a bathroom takes as long as the sequence of trades, not as long as the day someone installs the last fitting. Demolition, rough-in, inspections, finishes and drying time stack, and the job waits on whichever trade is late.",
      "Start with the order of work, then use a range for the room rather than a single confident number. The same logic applies to an extension, a loft, a roof, windows, a rewire or a floor.",
      "The guides below are the realistic ranges and the sequences, plus where to start if you have just bought the house.",
    ],
    posts: [
      "how-long-does-a-kitchen-renovation-take",
      "kitchen-renovation-timeline",
      "how-long-does-a-bathroom-renovation-take",
      "bathroom-renovation-sequence",
      "how-long-does-a-house-extension-take",
      "how-long-does-a-loft-conversion-take",
      "how-long-does-a-roof-replacement-take",
      "how-long-does-it-take-to-replace-windows",
      "how-long-does-it-take-to-rewire-a-house",
      "how-long-does-it-take-to-install-flooring",
      "home-renovation-phases",
      "how-to-plan-a-home-renovation-step-by-step",
      "where-to-start-renovating-new-house",
      "moving-into-a-fixer-upper",
      "what-to-track-during-a-renovation",
      "renovation-checklist-printable",
    ],
  },
  {
    slug: "renovation-apps",
    label: "Apps and tools",
    h1: "Best apps and tools for tracking a home renovation",
    metaTitle: "Best Apps and Tools for a Home Renovation",
    metaDescription:
      "When a spreadsheet, Notion, Houzz, HomeZada or a dedicated tracker is the right tool for a renovation — and when it is not.",
    intro: [
      "The right tool is the one you will still open while you are standing in the room. A spreadsheet is enough to plan a budget. It is a poor place to log a payment, a photo and a quote on the same day.",
      "Notion can hold the notes if you already live there. A dedicated tracker is worth it once costs, tasks and photos have to stay attached to one project. Lists of “best renovation apps” go stale fast — check the last update and the reviews before you trust one.",
      "These guides compare spreadsheets, Notion, HomeZada, Houzz and the apps that are actually maintained.",
    ],
    posts: [
      "best-home-improvement-apps",
      "homezada-vs-houzz-pro",
      "notion-for-home-renovation",
      "renovation-spreadsheet-alternative",
      "how-to-track-home-improvement-expenses",
      "renovation-budget-template",
    ],
  },
];

export function guidesForSlug(slug: string): Guide[] {
  return guides.filter((guide) => guide.posts.includes(slug));
}
