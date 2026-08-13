// App Store data fetcher for build-time data loading
// Fetches app metadata from iTunes Lookup API

export interface AppStoreData {
  trackName: string;
  description: string;
  version: string;
  artworkUrl512: string;
  artworkUrl100: string;
  artworkUrl60: string;
  averageUserRating: number;
  userRatingCount: number;
  price: number;
  formattedPrice: string;
  minimumOsVersion: string;
  fileSizeBytes: string;
  releaseDate: string;
  currentVersionReleaseDate: string;
  sellerName: string;
  primaryGenreName: string;
}

interface AppStoreApiResponse {
  resultCount: number;
  results: AppStoreData[];
}

const APP_ID = "6754754960";
// The lookup API has no worldwide aggregate — it needs a storefront, and each
// one reports only its OWN ratings (checked 2026-07-25: us 2, gb 2, de 2, dk 1,
// au 0). Denmark is not the app's market, so a dk lookup both undercounts the
// rating total and holds the AggregateRating schema below MIN_RATING_COUNT
// (Layout.astro) far longer than it should. We use the largest storefront,
// which is also where the country-neutral App Store link resolves by default. #97
const COUNTRY = "us";
const API_URL = `https://itunes.apple.com/lookup?id=${APP_ID}&country=${COUNTRY}`;

export async function fetchAppStoreData(): Promise<AppStoreData | null> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.warn(`App Store API returned ${response.status}`);
      return null;
    }

    const data: AppStoreApiResponse = await response.json();

    if (data.resultCount === 0 || !data.results[0]) {
      console.warn("No app found in App Store API response");
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error("Failed to fetch App Store data:", error);
    return null;
  }
}

// Fallback data for when API fails
export const fallbackAppStoreData: AppStoreData = {
  trackName: "Home Stories: Renovation App",
  description:
    "Your complete project management tool for home renovations. Track budgets, organize tasks, document progress with photos, and export professional PDF reports.",
  version: "1.0.0",
  artworkUrl512: "/logo.svg",
  artworkUrl100: "/logo.svg",
  artworkUrl60: "/logo.svg",
  averageUserRating: 0,
  userRatingCount: 0,
  price: 0,
  formattedPrice: "Free",
  minimumOsVersion: "17.0",
  fileSizeBytes: "0",
  releaseDate: "",
  currentVersionReleaseDate: "",
  sellerName: "Robert Jensen",
  primaryGenreName: "Productivity",
};

// ---------------------------------------------------------------------------
// In-app purchase pricing
// ---------------------------------------------------------------------------

/**
 * The Lookup API carries only the price of the app itself (free) — it never
 * reports in-app purchases, so the pricing section's paid tier used to be a
 * hand-typed string and had drifted to a third of the real price. The
 * storefront page does carry them: its embedded serialized-server-data blob
 * holds an "In-App Purchases" annotation whose `textPairs` pair each product
 * with an already-localized, already-formatted price. Anchor on the `textPairs`
 * key rather than the annotation title — the title is translated on every
 * non-English storefront, the key is not. #109
 */
const TEXT_PAIRS_RE = /"textPairs":(\[\[.*?\]\])/;

/** Apple serves the embedded JSON blob only to browser-shaped clients. */
const STOREFRONT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const STOREFRONT_TIMEOUT_MS = 15_000;

export interface StorefrontPricing {
  /** Localized, storefront-formatted price of the paid upgrade, e.g. "89,00 kr". */
  proPrice: string;
  /** The same amount zeroed for the free tier, e.g. "0,00 kr". */
  freePrice: string | undefined;
}

/**
 * A formatted price with its amount zeroed — "89,00 kr" → "0,00 kr", "¥1,500" →
 * "¥0", "$9.99" → "$0.00". Lets the free tier be written the way that storefront
 * writes money without a second request to learn its currency, and keeps the two
 * cards in one format. Decimals are kept only when the amount actually has them,
 * so zero-decimal currencies (JPY, KRW) don't grow a fake fractional part.
 */
export function zeroLike(formatted: string): string | undefined {
  // Apple groups digits with non-breaking (fr, ru, pl) and narrow no-break
  // spaces, so those count as part of the amount, not as a suffix.
  const amount = formatted.match(/\d[\d.,\u00a0\u202f ]*\d|\d/)?.[0];
  if (!amount) return undefined;
  const decimals = amount.match(/([.,])\d{2}$/);
  return formatted.replace(amount, decimals ? `0${decimals[1]}00` : "0");
}

// One request per storefront per build, shared across index.astro and
// [lang]/index.astro, which render in the same process.
const pricingCache = new Map<string, Promise<StorefrontPricing | null>>();

/** In-app purchase pricing for one storefront, or null if it can't be read. */
export function fetchStorefrontPricing(country: string): Promise<StorefrontPricing | null> {
  const cached = pricingCache.get(country);
  if (cached) return cached;
  const pending = loadStorefrontPricing(country);
  pricingCache.set(country, pending);
  return pending;
}

async function loadStorefrontPricing(country: string): Promise<StorefrontPricing | null> {
  try {
    const response = await fetch(`https://apps.apple.com/${country}/app/id${APP_ID}`, {
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

    const pairs: unknown = JSON.parse(match[1]!);
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

// Metadata structure for use in config
export interface AppStoreMetadata {
  version: string;
  rating: number;
  ratingCount: number;
  price: string;
  minimumOsVersion: string;
  lastUpdated: string;
  appIconUrl: string;
  description: string;
}

// Convert API data to config-friendly metadata
export function toAppStoreMetadata(data: AppStoreData): AppStoreMetadata {
  return {
    version: data.version,
    rating: data.averageUserRating,
    ratingCount: data.userRatingCount,
    price: data.formattedPrice,
    minimumOsVersion: data.minimumOsVersion,
    lastUpdated: data.currentVersionReleaseDate,
    // Self-hosted build-time copy (src/pages/app-icon-512.jpg.ts) — nothing
    // shipped to the client should reference Apple's CDN. #74
    appIconUrl: "/app-icon-512.jpg",
    description: data.description,
  };
}
