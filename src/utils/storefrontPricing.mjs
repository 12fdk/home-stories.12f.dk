import { APP_STORE_ID } from "./appStoreLink.mjs";

/**
 * In-app purchase pricing, read from the App Store storefront at build time.
 *
 * The Lookup API carries only the price of the app itself (free) — it never
 * reports in-app purchases, so the pricing section's paid tier used to be a
 * hand-typed string and had drifted to a third of the real price. The
 * storefront page does carry them: its embedded serialized-server-data blob
 * holds an "In-App Purchases" annotation whose `textPairs` pair each product
 * with an already-localized, already-formatted price. Anchor on the `textPairs`
 * key rather than the annotation title — the title is translated on every
 * non-English storefront, the key is not. #109
 *
 * Plain .mjs (moved out of appStoreData.ts, which re-exports it) so the blog's
 * rehype plugin can use it: astro.config.mjs loads plugins outside Vite, and
 * CI's Node 20 cannot import TypeScript. #150
 *
 * @typedef {{ proPrice: string, freePrice: string | undefined }} StorefrontPricing
 */
const TEXT_PAIRS_RE = /"textPairs":(\[\[.*?\]\])/;

/** Apple serves the embedded JSON blob only to browser-shaped clients. */
const STOREFRONT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const STOREFRONT_TIMEOUT_MS = 15_000;

/**
 * A formatted price with its amount zeroed — "89,00 kr" → "0,00 kr", "¥1,500" →
 * "¥0", "$9.99" → "$0.00". Lets the free tier be written the way that storefront
 * writes money without a second request to learn its currency, and keeps the two
 * cards in one format. Decimals are kept only when the amount actually has them,
 * so zero-decimal currencies (JPY, KRW) don't grow a fake fractional part.
 *
 * @param {string} formatted
 * @returns {string | undefined}
 */
export function zeroLike(formatted) {
  // Apple groups digits with non-breaking (fr, ru, pl) and narrow no-break
  // spaces, so those count as part of the amount, not as a suffix.
  const amount = formatted.match(/\d[\d.,   ]*\d|\d/)?.[0];
  if (!amount) return undefined;
  const decimals = amount.match(/([.,])\d{2}$/);
  return formatted.replace(amount, decimals ? `0${decimals[1]}00` : "0");
}

// One request per storefront per build, shared by every page and the rehype
// plugin that render in the same process.
/** @type {Map<string, Promise<StorefrontPricing | null>>} */
const pricingCache = new Map();

/**
 * In-app purchase pricing for one storefront, or null if it can't be read.
 *
 * @param {string} country
 * @returns {Promise<StorefrontPricing | null>}
 */
export function fetchStorefrontPricing(country) {
  const cached = pricingCache.get(country);
  if (cached) return cached;
  const pending = loadStorefrontPricing(country);
  pricingCache.set(country, pending);
  return pending;
}

/**
 * @param {string} country
 * @returns {Promise<StorefrontPricing | null>}
 */
async function loadStorefrontPricing(country) {
  try {
    const response = await fetch(`https://apps.apple.com/${country}/app/id${APP_STORE_ID}`, {
      headers: { "User-Agent": STOREFRONT_UA },
      signal: AbortSignal.timeout(STOREFRONT_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`App Store storefront ${country} returned ${response.status}`);
      return null;
    }

    const match = TEXT_PAIRS_RE.exec(await response.text());
    if (!match) {
      console.warn(`No in-app purchase prices found on the ${country} storefront`);
      return null;
    }

    const pairs = JSON.parse(match[1]);
    const first = Array.isArray(pairs) ? pairs[0] : undefined;
    const proPrice = Array.isArray(first) ? String(first[1] ?? "").trim() : "";
    if (!proPrice) {
      console.warn(`Empty in-app purchase price on the ${country} storefront`);
      return null;
    }

    return { proPrice, freePrice: zeroLike(proPrice) };
  } catch (error) {
    console.error(`Failed to fetch ${country} storefront pricing:`, error);
    return null;
  }
}
