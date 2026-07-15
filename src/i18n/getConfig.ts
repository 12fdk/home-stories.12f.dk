import type { TemplateConfig } from "../utils/configType";
import { applyTranslation } from "./translation";
import { TRANSLATIONS } from "./translations";
import { DEFAULT_LOCALE, homepageAlternates, localeHref } from "./locales";

/**
 * The homepage config for a given locale. English returns the base config with
 * only the locale metadata attached; every other locale is the base with its
 * Translation overlaid. Unknown codes fall back to English.
 */
export function getLocalizedConfig(base: TemplateConfig, code: string): TemplateConfig {
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
