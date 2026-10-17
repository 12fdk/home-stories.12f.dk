import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import { appStoreClick } from "../../utils/tracking";
import ThemeSwitcher from "./themeSwitcher";
import LanguageSwitcher from "../languageSwitcher";

type Field = "dark" | "dark-2" | "light";

/**
 * Colour by chapter. The homepage is a run of flat fields, each marked with
 * data-field; the bar takes the field under its own bottom edge and switches
 * over 300ms as each section edge passes beneath it. Nothing else on the page
 * is recoloured by scroll.
 */
function useFieldUnderBar(): Field | undefined {
  const [field, setField] = useState<Field>();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-field]"));
    if (!sections.length) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const probe = 72; // just under the bar
      const under = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setField((under?.dataset.field as Field) ?? undefined);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // The hero changes its own field when the sample goes over budget.
    const mo = new MutationObserver(onScroll);
    sections.forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ["data-field"] }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return field;
}

function Navbar() {
  const {
    name,
    logo,
    showThemeSwitch,
    topNavbar,
    googlePlayLink,
    appStoreLink,
    homeHref = "/",
  } = useContext(ConfigContext)!;

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const field = useFieldUnderBar();
  // Downloads stays in the phone menu and the footer; the bar holds five.
  const barLinks = topNavbar.links.filter((l) => !l.href.includes("/downloads"));

  return (
    <nav
      className="hs-nav sticky top-0 z-50"
      data-on={field ?? "theme"}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center px-5 md:h-[4.5rem] md:px-7">
        <a href={homeHref} className="flex items-center gap-2.5">
          <img
            className="h-8 rounded-[22%] md:h-9"
            src={withBase(logo)}
            alt={`${name} app icon`}
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold tracking-tight">{name}</span>
        </a>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          {showThemeSwitch && <ThemeSwitcher />}
          <MenuToggle
            toggle={() => setIsMobileNavVisible((current) => !current)}
            isOpen={isMobileNavVisible}
          />
        </div>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          <ul className="flex list-none items-center gap-6 p-0 lg:gap-7">
            {barLinks.map(({ title, href }) => (
              <li key={href} className="m-0 p-0">
                <a
                  className="whitespace-nowrap font-medium underline-offset-[0.3em] transition-opacity hover:underline"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          {showThemeSwitch && <ThemeSwitcher />}
          {topNavbar.cta && appStoreLink && (
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-btn min-h-[44px] px-5"
              {...appStoreClick("navbar")}
            >
              {topNavbar.cta}
            </a>
          )}
        </div>
      </div>

      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute top-16 md:top-[4.5rem] w-full bg-base-100 text-base-content px-5 pb-6 flex flex-col lg:hidden"
        isVisible={isMobileNavVisible}
      >
        {topNavbar.links.map(({ title, href }) => (
          <motion.a
            key={href}
            className="w-full py-3 text-2xl font-semibold tracking-tight"
            href={href}
            onClick={() => setIsMobileNavVisible(false)}
            variants={{
              show: { x: 0, opacity: 1 },
              hidden: { x: -12, opacity: 0 },
            }}
          >
            {title}
          </motion.a>
        ))}
        <motion.ul
          variants={{
            show: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 8 },
          }}
          className="mt-4 flex list-none gap-3 p-0"
        >
          {appStoreLink && (
            <li>
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                {...appStoreClick("navbar-mobile")}
              >
                <img
                  className="h-12"
                  src={withBase("/stores/app-store.svg")}
                  alt="Download on the App Store"
                  width={144}
                  height={48}
                />
              </a>
            </li>
          )}
          {googlePlayLink && (
            <li>
              <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
                <img
                  className="h-12"
                  src={withBase("/stores/google-play.svg")}
                  alt="Get it on Google Play"
                  width={144}
                  height={48}
                />
              </a>
            </li>
          )}
        </motion.ul>
      </AnimatedList>
    </nav>
  );
}

export default Navbar;
