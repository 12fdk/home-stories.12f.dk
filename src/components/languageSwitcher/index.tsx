import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { LOCALES, localeHref, DEFAULT_LOCALE, SITE } from "../../i18n/locales";

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
  </svg>
);

/**
 * Jumps between languages. A page that exists in several languages (the use
 * cases, #164) passes its hreflang alternates, and an option goes to that
 * language's version of the page when there is one; otherwise it points at
 * that locale's homepage, a page the reader can read.
 */
function LanguageSwitcher() {
  const { locale = DEFAULT_LOCALE, ui, localeAlternates = [] } = useContext(ConfigContext)!;
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const hrefFor = (hreflang: string, code: string) => {
    const alt = localeAlternates.find((a) => a.hreflang === hreflang)?.href;
    return alt ? alt.replace(SITE, "") || "/" : localeHref(code);
  };

  return (
    <details className="dropdown dropdown-end">
      <summary
        className="btn btn-ghost btn-sm h-10 min-h-0 gap-1.5 px-2 font-medium normal-case text-current hover:bg-current/10"
        aria-label={ui.nav.language}
      >
        <GlobeIcon />
        <span className="text-base">{current.label}</span>
      </summary>
      <ul className="menu dropdown-content z-[60] mt-2 max-h-80 w-48 flex-nowrap overflow-y-auto bg-base-200 p-2 text-base text-base-content">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <a
              href={hrefFor(l.hreflang, l.code)}
              hrefLang={l.hreflang}
              lang={l.hreflang}
              aria-current={l.code === locale ? "true" : undefined}
              className={l.code === locale ? "active font-semibold" : ""}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default LanguageSwitcher;
