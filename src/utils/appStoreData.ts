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
