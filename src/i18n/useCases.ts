/**
 * Localized use-case pages: /<lang>/use-cases/ and /<lang>/use-cases/<slug>/.
 * #164
 *
 * One file per language in ./useCases/<code>.ts (default export:
 * UseCaseLocaleFile), picked up by import.meta.glob, so a new language — or a
 * new page in one — never touches a shared file.
 *
 * - The slug is the English slug. The URL path after /<lang> is then the same
 *   in every language, which is what @astrojs/sitemap's i18n option needs to
 *   group the versions into xhtml:link alternates.
 * - A localized page goes live with its English original: if the English entry
 *   has a future publishDate, the translation waits for it too.
 * - Photos, the screenshot file and the related (English) posts come from the
 *   English entry. Everything a reader reads is written in the file.
 * - Write for the country, not from the English: local permit and trade names,
 *   local units and currency. Same rules as src/data/useCases.ts — only what the
 *   app does today, "(Pro)" on every Pro feature, no copied blocks.
 */
import { allUseCases, isUseCaseLive, type UseCase } from "../data/useCases";
import { DEFAULT_LOCALE, SITE, getLocale } from "./locales";

/** Fixed page chrome for the use-case template, in one language. */
export interface UseCaseUi {
  home: string;
  /** Breadcrumb and hub name. */
  useCases: string;
  trackHeading: string;
  stepsHeading: string;
  faqHeading: string;
  /** Free/Pro line under the steps. */
  proNote: string;
  heroCta: string;
  footerHeading: string;
  footerBody: string;
  footerCta: string;
  otherHeading: string;
  /** Link to the English hub, for the pages not translated yet. */
  moreInEnglish: string;
  /** Heading over the related posts, which are in English. */
  readingHeading: string;
}

export interface UseCaseHubCopy {
  metaTitle: string;
  metaDescription: string;
  /** H1, one string per line. */
  h1: string[];
  intro: string;
  imageAlt: string;
  /** Paragraph that points to the English hub for the other use cases. */
  englishNote: string;
  englishLink: string;
}

/** The reader-facing text of one use case. Shape follows UseCase. */
export interface LocalizedUseCaseCopy {
  /** English slug of the page this translates. */
  slug: string;
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  intro: string[];
  track: { title: string; body: string }[];
  steps: string[];
  screenshotAlt: string;
  faq: { q: string; a: string }[];
  /** HowTo schema name, e.g. "Sådan sætter du et køkkenprojekt op i Home Stories". */
  howToName: string;
}

export interface UseCaseLocaleFile {
  /** Locale code from src/i18n/locales.ts. */
  locale: string;
  ui: UseCaseUi;
  hub: UseCaseHubCopy;
  entries: LocalizedUseCaseCopy[];
}

/** A translated page, merged with what it takes from its English original. */
export interface LocalizedUseCase extends LocalizedUseCaseCopy {
  image: string;
  screenshot: { src: string; alt: string };
  posts: string[];
  source: UseCase;
}

const files = import.meta.glob<{ default: UseCaseLocaleFile }>("./useCases/*.ts", { eager: true });

export const USE_CASE_LOCALES: UseCaseLocaleFile[] = Object.keys(files)
  .sort()
  .map((file) => files[file].default);

const bySlug = new Map(allUseCases.map((useCase) => [useCase.slug, useCase]));

{
  const seenLocales = new Set<string>();
  for (const file of USE_CASE_LOCALES) {
    if (!getLocale(file.locale) || file.locale === DEFAULT_LOCALE) {
      throw new Error(`Use-case translation for unknown locale: ${file.locale}`);
    }
    if (seenLocales.has(file.locale)) throw new Error(`Two use-case files for locale ${file.locale}`);
    seenLocales.add(file.locale);
    const seen = new Set<string>();
    for (const entry of file.entries) {
      if (!bySlug.has(entry.slug)) {
        throw new Error(`${file.locale}: use case "${entry.slug}" has no English original`);
      }
      if (seen.has(entry.slug)) throw new Error(`${file.locale}: duplicate use case "${entry.slug}"`);
      seen.add(entry.slug);
    }
  }
}

export function getUseCaseLocale(code: string): UseCaseLocaleFile | undefined {
  return USE_CASE_LOCALES.find((file) => file.locale === code);
}

/** Live translated pages for a locale, in the English hub's order. */
export function localizedUseCases(code: string, now = new Date()): LocalizedUseCase[] {
  const file = getUseCaseLocale(code);
  if (!file) return [];
  const copy = new Map(file.entries.map((entry) => [entry.slug, entry]));
  return allUseCases
    .filter((source) => copy.has(source.slug) && isUseCaseLive(source, now))
    .map((source) => {
      const entry = copy.get(source.slug)!;
      return {
        ...entry,
        image: source.image,
        screenshot: { src: source.screenshot.src, alt: entry.screenshotAlt },
        posts: source.posts,
        source,
      };
    });
}

/** Locales (other than English) with at least one live use-case page. */
export function useCaseLocaleCodes(): string[] {
  return USE_CASE_LOCALES.filter((file) => localizedUseCases(file.locale).length > 0).map((file) => file.locale);
}

/** Root-relative hub path for a locale. */
export function useCaseHubHref(code: string): string {
  return code === DEFAULT_LOCALE ? "/use-cases/" : `/${code}/use-cases/`;
}

export function useCaseHref(code: string, slug: string): string {
  return `${useCaseHubHref(code)}${slug}/`;
}

type Alternate = { hreflang: string; href: string };

function alternates(codes: string[], path: (code: string) => string): Alternate[] {
  if (codes.length === 0) return [];
  return [
    { hreflang: getLocale(DEFAULT_LOCALE)!.hreflang, href: SITE + path(DEFAULT_LOCALE) },
    ...codes.map((code) => ({ hreflang: getLocale(code)!.hreflang, href: SITE + path(code) })),
    { hreflang: "x-default", href: SITE + path(DEFAULT_LOCALE) },
  ];
}

/** hreflang set for one use case: English, every live translation, x-default.
 *  Empty when the page exists in English only. */
export function useCaseAlternates(slug: string): Alternate[] {
  const codes = USE_CASE_LOCALES.filter((file) =>
    localizedUseCases(file.locale).some((entry) => entry.slug === slug),
  ).map((file) => file.locale);
  return alternates(codes, (code) => useCaseHref(code, slug));
}

/** hreflang set for the hubs. */
export function useCaseHubAlternates(): Alternate[] {
  return alternates(useCaseLocaleCodes(), useCaseHubHref);
}
