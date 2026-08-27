/**
 * Every locale the marketing homepage is published in. `code` is both the URL
 * segment (/de/, /ja/, …) and the value stored on config.locale; English is the
 * default and lives at the site root with no prefix.
 */
export interface LocaleDef {
  /** URL segment and config.locale value. */
  code: string;
  /** Native name shown in the language switcher. */
  label: string;
  /** BCP-47 tag for hreflang, og:locale and <html lang>. */
  hreflang: string;
  /**
   * App Store storefront (ISO country) this locale quotes prices from. A static
   * page can't know where the reader is, so the language they chose is the best
   * available proxy — far better than quoting one country's currency to all
   * sixteen. The footnote says prices vary by storefront. #109
   */
  storefront: string;
  /**
   * ISO 4217 currency of that storefront. Declared explicitly rather than
   * inferred from the price string: symbols are ambiguous (¥ is both JPY and
   * CNY) and thousands separators differ by locale, so parsing the display
   * string guessed wrong. Used for the AggregateOffer priceCurrency.
   */
  currency: string;
}

export const DEFAULT_LOCALE = "en";

export const SITE = "https://home-stories.12f.dk";

export const LOCALES: LocaleDef[] = [
  { code: "en", label: "English", hreflang: "en", storefront: "us", currency: "USD" },
  { code: "da", label: "Dansk", hreflang: "da", storefront: "dk", currency: "DKK" },
  { code: "de", label: "Deutsch", hreflang: "de", storefront: "de", currency: "EUR" },
  { code: "fr", label: "Français", hreflang: "fr", storefront: "fr", currency: "EUR" },
  { code: "es", label: "Español", hreflang: "es", storefront: "es", currency: "EUR" },
  { code: "it", label: "Italiano", hreflang: "it", storefront: "it", currency: "EUR" },
  { code: "nl", label: "Nederlands", hreflang: "nl", storefront: "nl", currency: "EUR" },
  { code: "pt", label: "Português", hreflang: "pt", storefront: "pt", currency: "EUR" },
  { code: "sv", label: "Svenska", hreflang: "sv", storefront: "se", currency: "SEK" },
  { code: "ja", label: "日本語", hreflang: "ja", storefront: "jp", currency: "JPY" },
  { code: "zh", label: "中文", hreflang: "zh-Hans", storefront: "cn", currency: "CNY" },
  { code: "ko", label: "한국어", hreflang: "ko", storefront: "kr", currency: "KRW" },
  { code: "pl", label: "Polski", hreflang: "pl", storefront: "pl", currency: "PLN" },
  { code: "tr", label: "Türkçe", hreflang: "tr", storefront: "tr", currency: "TRY" },
  { code: "ru", label: "Русский", hreflang: "ru", storefront: "ru", currency: "RUB" },
  { code: "nb", label: "Norsk", hreflang: "nb", storefront: "no", currency: "NOK" },
];

/** Locales other than English — the ones that get a prefixed route. */
export const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);

export function getLocale(code: string): LocaleDef | undefined {
  return LOCALES.find((l) => l.code === code);
}

/** Root-relative home path for a locale: "/" for English, "/<code>/" otherwise. */
export function localeHref(code: string): string {
  return code === DEFAULT_LOCALE ? "/" : `/${code}/`;
}

/** hreflang alternates for the homepage, including x-default → English root. */
export function homepageAlternates(): { hreflang: string; href: string }[] {
  return [
    ...LOCALES.map((l) => ({ hreflang: l.hreflang, href: SITE + localeHref(l.code) })),
    { hreflang: "x-default", href: SITE + "/" },
  ];
}
