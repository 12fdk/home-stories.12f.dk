/**
 * App Store download links with Apple campaign tokens (`ct` + `pt`).
 *
 * App Store Connect's Campaign column is filled from `ct`, but only when the
 * link also carries the provider token `pt`; with `ct` alone no download is
 * attributed to this site. `ct` is free text, 40 characters max. `mt=8`
 * selects the iOS storefront. #112, home-stories#494
 *
 * The same strings are written by hand in src/data/llms-preamble.md and
 * src/data/llms-full-preamble.md (raw markdown, so they cannot import this).
 */

export const CT_MAX = 40;

export const APP_STORE_ID = "6754754960";

/** 12f's App Store Connect provider token — the same for every 12f app. */
export const PROVIDER_TOKEN = "127521693";

/** Neutral listing URL. Match against this; emit links from `appStoreUrl`. */
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Homepage and site-chrome CTAs (navbar, sticky bar, hero, guides, 404). */
export const SITE_CAMPAIGN = "site-home-stories";

/** The Smart App Banner, via its `affiliate-data` parameter. */
export const BANNER_CAMPAIGN = "banner-home-stories";

/** /llms.txt, /llms-full.txt and /ai.txt — what assistants actually read. */
export const LLMS_CAMPAIGN = "llms-home-stories";

/** `blog-<slug>`, truncated so the token stays within Apple's 40-character cap. */
export function blogCampaign(slug) {
  return `blog-${slug}`.slice(0, CT_MAX);
}

/** `uc-<slug>` for the /use-cases/ pages, truncated like `blogCampaign`. */
export function useCaseCampaign(slug) {
  return `uc-${slug}`.slice(0, CT_MAX);
}

export function appStoreUrl(token) {
  const ct = String(token).slice(0, CT_MAX);
  return `${APP_STORE_URL}?ct=${ct}&pt=${PROVIDER_TOKEN}&mt=8`;
}

/** `content` of the `apple-itunes-app` meta tag (the Smart App Banner). */
export const SMART_BANNER_CONTENT = `app-id=${APP_STORE_ID}, affiliate-data=ct=${BANNER_CAMPAIGN}&pt=${PROVIDER_TOKEN}`;
