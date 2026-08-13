import type { TemplateConfig } from "../utils/configType";
import type { StorefrontPricing } from "../utils/appStoreData";
import { applyTranslation } from "./translation";
import { TRANSLATIONS } from "./translations";
import { DEFAULT_LOCALE, homepageAlternates, localeHref } from "./locales";

/**
 * The homepage config for a given locale. English returns the base config with
 * only the locale metadata attached; every other locale is the base with its
 * Translation overlaid. Unknown codes fall back to English.
 *
 * `pricing`, when given, replaces the pricing cards' amounts with the ones read
 * from that locale's App Store storefront at build time. Nothing else in the
 * section moves — the plan names, periods and features stay translated. #109
 */
export function getLocalizedConfig(
  base: TemplateConfig,
  code: string,
  pricing?: StorefrontPricing | null,
): TemplateConfig {
  return withStorefrontPricing(localized(base, code), pricing);
}

function localized(base: TemplateConfig, code: string): TemplateConfig {
  if (code === DEFAULT_LOCALE) {
    return {
      ...base,
      locale: DEFAULT_LOCALE,
      homeHref: localeHref(DEFAULT_LOCALE),
      localeAlternates: homepageAlternates(),
    };
  }
  const translation = TRANSLATIONS[code];
  if (!translation) {
    return { ...base, locale: DEFAULT_LOCALE, homeHref: "/", localeAlternates: homepageAlternates() };
  }
  return applyTranslation(base, translation, code);
}

/**
 * Overwrite the pricing cards' amounts with live storefront prices. The paid
 * card is the highlighted one; every other card is the free tier and gets the
 * same amount zeroed. A missing fetch leaves the config's own fallback in place.
 */
function withStorefrontPricing(
  config: TemplateConfig,
  pricing: StorefrontPricing | null | undefined,
): TemplateConfig {
  const section = config.home.pricing;
  if (!pricing || !section) return config;

  return {
    ...config,
    home: {
      ...config.home,
      pricing: {
        ...section,
        plans: section.plans.map((plan) =>
          plan.highlight
            ? { ...plan, price: pricing.proPrice }
            : { ...plan, price: pricing.freePrice ?? plan.price },
        ),
      },
    },
  };
}
