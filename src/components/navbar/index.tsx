import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useContext, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import ThemeSwitcher from "./themeSwitcher";
import LanguageSwitcher from "../languageSwitcher";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  const isSolid = isScrolled || isMobileNavVisible;

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 transition-colors duration-300",
        isSolid
          ? "border-b border-base-300 bg-base-100/90 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-lg items-center px-4 md:h-[4.5rem]">
        <a href={homeHref} className="flex items-center gap-2">
          <img
            className="h-9 rounded-[22%] md:h-10"
            src={withBase(logo)}
            alt=""
            width={40}
            height={40}
          />
          <span className="font-display text-base font-bold tracking-tight md:text-lg">
            {name}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          {showThemeSwitch && <ThemeSwitcher />}
          <MenuToggle
            toggle={() => setIsMobileNavVisible((current) => !current)}
            isOpen={isMobileNavVisible}
          />
        </div>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          <ul className="flex list-none items-center gap-6 p-0">
            {topNavbar.links.map(({ title, href }) => (
              <li key={href} className="m-0 p-0">
                <a
                  className="whitespace-nowrap text-sm font-medium text-base-content/70 transition-colors hover:text-base-content"
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
              className="btn btn-primary btn-sm h-10 min-h-0 px-5 text-sm font-semibold normal-case"
            >
              {topNavbar.cta}
            </a>
          )}
        </div>
      </div>

      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute top-16 w-full border-b border-base-300 bg-base-100 px-4 pb-4 flex flex-col gap-1 md:hidden"
        isVisible={isMobileNavVisible}
      >
        {topNavbar.links.map(({ title, href }) => (
          <motion.a
            key={href}
            className="w-full border-b border-base-300 py-3 text-base font-medium"
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
          className="mt-3 flex list-none gap-3 p-0"
        >
          {appStoreLink && (
            <li>
              <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
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
