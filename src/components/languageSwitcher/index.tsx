import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { LOCALES, localeHref, DEFAULT_LOCALE } from "../../i18n/locales";

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
 * Jumps between the localized homepages. Only the homepage is translated, so
 * every option points at that locale's root; from any other page this returns
 * the reader to a homepage they can read.
 */
function LanguageSwitcher() {
  const { locale = DEFAULT_LOCALE, ui } = useContext(ConfigContext)!;
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <details className="dropdown dropdown-end">
      <summary
        className="btn btn-ghost btn-sm h-9 min-h-0 gap-1.5 px-2 font-medium normal-case text-base-content/70 hover:text-base-content"
        aria-label={ui.nav.language}
      >
        <GlobeIcon />
        <span className="text-sm">{current.label}</span>
      </summary>
      <ul className="menu dropdown-content z-[60] mt-2 max-h-80 w-44 flex-nowrap overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <a
              href={localeHref(l.code)}
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
