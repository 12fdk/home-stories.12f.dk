import type { TemplateConfig, UiStrings } from "../utils/configType";
import { localeHref, homepageAlternates, DEFAULT_LOCALE } from "./locales";

/**
 * The full set of translatable strings for the homepage, in one flat shape.
 * `en` is extracted from the base config with extractEnglish(); every other
 * locale is a hand/agent translation of that same shape. Non-text config
 * (hrefs, icons, screenshots, sample figures, testimonial names) is NOT here —
 * it comes from the base config unchanged.
 */
export interface Translation {
  seo: { title: string; description: string };
  /** App Store CTA + nav link titles, in the base config's link order. */
  nav: { cta: string; links: string[] };
  ui: UiStrings;
  header: {
    headline: string;
    subtitle: string;
    usersDescription: string;
    /** Word-index range [start, end) to underline in the headline, or null. */
    headlineMark: [number, number] | null;
  };
  facts: { label: string; value: string }[];
  features: {
    title: string;
    subtitle: string;
    cards: { label: string; title: string; subtitle: string }[];
  };
  capabilities: {
    title: string;
    subtitle: string;
    cards: { title: string; subtitle: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { title: string; subtitle: string }[];
  };
  testimonials: { title: string; subtitle: string; comments: string[] };
  faq: { title: string; qa: { question: string; answer: string }[] };
  /** Optional so older translation files fall back to English wholesale. */
  pricing?: {
    label: string;
    title: string;
    subtitle: string;
    plans: { name: string; price: string; period: string; features: string[]; cta: string }[];
    footnote: string;
  };
  /** Optional so older translation files fall back to English wholesale. */
  comparison?: {
    label: string;
    title: string;
    subtitle: string;
    columns: { them: string; us: string };
    rows: { aspect: string; them: string; us: string }[];
    cta: string;
  };
  appBanner: { title: string; subtitle: string };
}

/** Pull the English strings out of the base config into the Translation shape,
 *  so the English reference for translators can never drift from what ships. */
export function extractEnglish(base: TemplateConfig): Translation {
  const h = base.home;
  return {
    seo: { title: base.seo.title, description: base.seo.description },
    nav: {
      cta: base.topNavbar.cta ?? "",
      links: base.topNavbar.links.map((l) => l.title),
    },
    ui: base.ui,
    header: {
      headline: h.header.headline,
      subtitle: h.header.subtitle,
      usersDescription: h.header.usersDescription ?? "",
      headlineMark: (h.header.headlineMark as [number, number]) ?? null,
    },
    facts: (h.facts ?? []).map((f) => ({ label: f.label, value: f.value })),
    features: {
      title: h.features!.title,
      subtitle: h.features!.subtitle ?? "",
      cards: h.features!.cards.map((c) => ({
        label: c.label ?? "",
        title: c.title,
        subtitle: c.subtitle,
      })),
    },
    capabilities: {
      title: h.capabilities!.title,
      subtitle: h.capabilities!.subtitle ?? "",
      cards: h.capabilities!.cards.map((c) => ({ title: c.title, subtitle: c.subtitle })),
    },
    howItWorks: {
      title: h.howItWorks!.title,
      subtitle: h.howItWorks!.subtitle ?? "",
      steps: h.howItWorks!.steps.map((s) => ({ title: s.title, subtitle: s.subtitle })),
    },
    testimonials: {
      title: h.testimonials!.title,
      subtitle: h.testimonials!.subtitle ?? "",
      comments: h.testimonials!.cards.map((c) => c.comment),
    },
    faq: {
      title: h.faq!.title,
      qa: h.faq!.qa.map((q) => ({ question: q.question, answer: q.answer })),
    },
    pricing: h.pricing
      ? {
          label: h.pricing.label,
          title: h.pricing.title,
          subtitle: h.pricing.subtitle ?? "",
          plans: h.pricing.plans.map((p) => ({
            name: p.name,
            price: p.price,
            period: p.period,
            features: [...p.features],
            cta: p.cta ?? "",
          })),
          footnote: h.pricing.footnote ?? "",
        }
      : undefined,
    comparison: h.comparison
      ? {
          label: h.comparison.label,
          title: h.comparison.title,
          subtitle: h.comparison.subtitle ?? "",
          columns: { ...h.comparison.columns },
          rows: h.comparison.rows.map((r) => ({ ...r })),
          cta: h.comparison.cta?.text ?? "",
        }
      : undefined,
    appBanner: {
      title: base.appBanner!.title,
      subtitle: base.appBanner!.subtitle,
    },
  };
}

/** Rewrite an in-page anchor href to the current locale's homepage. External
 *  links, the blog and legal pages (English-only) are left untouched. */
function localizeHref(href: string, code: string): string {
  if (code === DEFAULT_LOCALE) return href;
  if (href === "/") return localeHref(code);
  if (href.startsWith("/#")) return `/${code}${href}`;
  return href;
}

/**
 * Build a fully-localized TemplateConfig by overlaying a Translation onto the
 * base English config. Positional lists (facts, feature cards, steps, testimonial
 * comments, faq, nav links) map by index, so a Translation MUST keep the base's
 * ordering and length. Anything the Translation omits falls back to English.
 */
export function applyTranslation(
  base: TemplateConfig,
  t: Translation,
  code: string,
): TemplateConfig {
  const h = base.home;
  const byIndex = <A, B>(arr: A[], over: B[] | undefined, fn: (a: A, b: B | undefined) => A): A[] =>
    arr.map((a, i) => fn(a, over?.[i]));

  return {
    ...base,
    locale: code,
    localeAlternates: homepageAlternates(),
    homeHref: localeHref(code),
    ui: t.ui ?? base.ui,
    seo: { ...base.seo, ...t.seo },
    topNavbar: {
      ...base.topNavbar,
      cta: t.nav?.cta ?? base.topNavbar.cta,
      links: base.topNavbar.links.map((l, i) => ({
        title: t.nav?.links?.[i] ?? l.title,
        href: localizeHref(l.href, code),
      })),
    },
    footer: {
      ...base.footer,
      links: base.footer.links.map((l, i) => ({
        title: t.nav?.links?.[i] ?? l.title,
        href: localizeHref(l.href, code),
      })),
    },
    appBanner: base.appBanner
      ? { ...base.appBanner, title: t.appBanner?.title ?? base.appBanner.title, subtitle: t.appBanner?.subtitle ?? base.appBanner.subtitle }
      : base.appBanner,
    home: {
      ...h,
      seo: { ...h.seo, ...t.seo },
      header: {
        ...h.header,
        headline: t.header?.headline ?? h.header.headline,
        subtitle: t.header?.subtitle ?? h.header.subtitle,
        usersDescription: t.header?.usersDescription ?? h.header.usersDescription,
        headlineMark: t.header?.headlineMark ?? undefined,
      },
      facts: h.facts
        ? byIndex(h.facts, t.facts, (f, o) => ({ label: o?.label ?? f.label, value: o?.value ?? f.value }))
        : h.facts,
      features: h.features
        ? {
            ...h.features,
            title: t.features?.title ?? h.features.title,
            subtitle: t.features?.subtitle ?? h.features.subtitle,
            cards: byIndex(h.features.cards, t.features?.cards, (c, o) => ({
              ...c,
              label: o?.label ?? c.label,
              title: o?.title ?? c.title,
              subtitle: o?.subtitle ?? c.subtitle,
            })),
          }
        : h.features,
      capabilities: h.capabilities
        ? {
            ...h.capabilities,
            title: t.capabilities?.title ?? h.capabilities.title,
            subtitle: t.capabilities?.subtitle ?? h.capabilities.subtitle,
            cards: byIndex(h.capabilities.cards, t.capabilities?.cards, (c, o) => ({
              ...c,
              title: o?.title ?? c.title,
              subtitle: o?.subtitle ?? c.subtitle,
            })),
          }
        : h.capabilities,
      howItWorks: h.howItWorks
        ? {
            ...h.howItWorks,
            title: t.howItWorks?.title ?? h.howItWorks.title,
            subtitle: t.howItWorks?.subtitle ?? h.howItWorks.subtitle,
            steps: byIndex(h.howItWorks.steps, t.howItWorks?.steps, (s, o) => ({
              ...s,
              title: o?.title ?? s.title,
              subtitle: o?.subtitle ?? s.subtitle,
            })),
          }
        : h.howItWorks,
      testimonials: h.testimonials
        ? {
            ...h.testimonials,
            title: t.testimonials?.title ?? h.testimonials.title,
            subtitle: t.testimonials?.subtitle ?? h.testimonials.subtitle,
            cards: byIndex(h.testimonials.cards, t.testimonials?.comments, (c, o) => ({
              ...c,
              comment: o ?? c.comment,
            })),
          }
        : h.testimonials,
      faq: h.faq
        ? {
            ...h.faq,
            title: t.faq?.title ?? h.faq.title,
            qa: byIndex(h.faq.qa, t.faq?.qa, (q, o) => ({
              question: o?.question ?? q.question,
              answer: o?.answer ?? q.answer,
            })),
          }
        : h.faq,
      pricing: h.pricing
        ? {
            ...h.pricing,
            label: t.pricing?.label ?? h.pricing.label,
            title: t.pricing?.title ?? h.pricing.title,
            subtitle: t.pricing?.subtitle ?? h.pricing.subtitle,
            plans: byIndex(h.pricing.plans, t.pricing?.plans, (p, o) => ({
              ...p,
              name: o?.name ?? p.name,
              price: o?.price ?? p.price,
              period: o?.period ?? p.period,
              features: byIndex(p.features, o?.features, (f, of) => of ?? f),
              cta: p.cta ? (o?.cta || p.cta) : p.cta,
            })),
            footnote: t.pricing?.footnote ?? h.pricing.footnote,
          }
        : h.pricing,
      comparison: h.comparison
        ? {
            ...h.comparison,
            label: t.comparison?.label ?? h.comparison.label,
            title: t.comparison?.title ?? h.comparison.title,
            subtitle: t.comparison?.subtitle ?? h.comparison.subtitle,
            columns: t.comparison?.columns ?? h.comparison.columns,
            rows: byIndex(h.comparison.rows, t.comparison?.rows, (r, o) => ({
              aspect: o?.aspect ?? r.aspect,
              them: o?.them ?? r.them,
              us: o?.us ?? r.us,
            })),
            cta: h.comparison.cta
              ? { ...h.comparison.cta, text: t.comparison?.cta || h.comparison.cta.text }
              : h.comparison.cta,
          }
        : h.comparison,
    },
  };
}
