/**
 * App Store download links with an Apple campaign token (`ct`).
 *
 * App Store Connect's Campaign column is filled from `ct`. Without it every
 * download from this site lands in one "Web referrer" bucket. `ct` is free
 * text, 40 characters max. `mt=8` selects the iOS storefront. Do not add `pt=`
 * — the provider token is unknown. #112
 *
 * The same strings are written by hand in src/data/llms-preamble.md and
 * src/data/llms-full-preamble.md (raw markdown, so they cannot import this).
 */

export const CT_MAX = 40;

export const APP_STORE_ID = "6754754960";

/** Neutral listing URL. Match against this; emit links from `appStoreUrl`. */
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Homepage and site-chrome CTAs (navbar, sticky bar, hero, guides, 404). */
export const SITE_CAMPAIGN = "site-home-stories";

/** /llms.txt, /llms-full.txt and /ai.txt — what assistants actually read. */
export const LLMS_CAMPAIGN = "llms-home-stories";

/** `blog-<slug>`, truncated so the token stays within Apple's 40-character cap. */
export function blogCampaign(slug) {
  return `blog-${slug}`.slice(0, CT_MAX);
}

export function appStoreUrl(token) {
  const ct = String(token).slice(0, CT_MAX);
  return `${APP_STORE_URL}?ct=${ct}&mt=8`;
}
