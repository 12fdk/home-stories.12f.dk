/**
 * The blog's App Store app card: what it says and which screen it shows. #150
 *
 * One source for both placements — the mobile-only card after a post's intro
 * (rendered into the markdown by rehype-inline-cta) and the card at the end of
 * every post (components/blog/AppCard.astro) — so the two can never quote a
 * different price or claim. Plain .mjs: the rehype plugin loads it from
 * astro.config.mjs.
 *
 * Every claim matches the App Store listing and the homepage pricing section:
 * the app is free, Pro is a one-time purchase (no subscription, no trial), it
 * works offline and needs no account.
 */

/** Event surface for the mobile card after the intro (Umami `surface`). */
export const INTRO_SURFACE = "blog-intro-card";

/** US storefront price of Home Stories Pro; only used when the live read fails. */
export const PRO_PRICE_FALLBACK = "$9.99";

export const APP_NAME = "Home Stories";
export const APP_TAGLINE = "Renovation planner & budget tracker";
export const APP_ICON = "/app-icon-512.jpg";

/** The price line. `proPrice` is the storefront-formatted Pro price. */
export function priceLine(proPrice = PRO_PRICE_FALLBACK) {
  return `Free · Pro ${proPrice} one-time`;
}

export const TRUST_LINE = "No account · works offline";

/**
 * One real app screen per post topic (keys match TOPICS in blogCta.mjs). Only
 * free-tier screens: the budget chart and PDF export are Pro, and showing them
 * next to the word "Free" would oversell the free app.
 */
const SCREENS = {
  documentation: { src: "/screenshots/photo-timeline-560.webp", alt: "A kitchen project in Home Stories with dated progress photos and logged hours" },
  timeline: { src: "/screenshots/tasks-560.webp", alt: "A kitchen project in Home Stories with its task list, items and running total" },
  contractors: { src: "/screenshots/projects-list-560.webp", alt: "Home Stories project list showing budget, amount spent and time for each renovation" },
  budget: { src: "/screenshots/projects-list-560.webp", alt: "Home Stories project list showing budget, amount spent and time for each renovation" },
  general: { src: "/screenshots/projects-list-560.webp", alt: "Home Stories project list showing budget, amount spent and time for each renovation" },
};

/** Source images are 560×1218. */
export const SCREEN_WIDTH = 560;
export const SCREEN_HEIGHT = 1218;

export function screenFor(topic) {
  return SCREENS[topic] ?? SCREENS.general;
}
