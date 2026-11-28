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

/** `tpl-<slug>` for the /templates/ pages, truncated like `blogCampaign`. #163 */
export function templateCampaign(slug) {
  return `tpl-${slug}`.slice(0, CT_MAX);
}

/** App Store Connect custom product page ids are UUIDs. */
export const CPP_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * `options.ppid` opens a custom product page instead of the default one (#165).
 * A malformed id throws, so a typo fails the build instead of shipping a link
 * that silently shows the default page.
 *
 * `options.storefront` (ISO country, lower case: "dk", "de") opens that
 * country's App Store page, for pages written for one market (#164). Without
 * it the neutral URL lets Apple pick the reader's own storefront.
 */
export function appStoreUrl(token, { ppid, storefront } = {}) {
  const ct = String(token).slice(0, CT_MAX);
  const base = storefront
    ? `https://apps.apple.com/${String(storefront).toLowerCase()}/app/id${APP_STORE_ID}`
    : APP_STORE_URL;
  return `${base}?ct=${ct}&pt=${PROVIDER_TOKEN}&mt=8${ppidParam(ppid)}`;
}

function ppidParam(ppid) {
  if (ppid === undefined || ppid === null || ppid === "") return "";
  if (!CPP_ID_PATTERN.test(ppid)) throw new Error(`Not a custom product page id: ${ppid}`);
  return `&ppid=${ppid.toLowerCase()}`;
}

/** `content` of the `apple-itunes-app` meta tag (the Smart App Banner). */
export const SMART_BANNER_CONTENT = `app-id=${APP_STORE_ID}, affiliate-data=ct=${BANNER_CAMPAIGN}&pt=${PROVIDER_TOKEN}`;
