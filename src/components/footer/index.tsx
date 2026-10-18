import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import InstagramLogo from "./svgs/instagram";
import FacebookLogo from "./svgs/facebook";
import TwitterLogo from "./svgs/twitter";

/**
 * Sister apps from the same developer, with descriptive anchors. Plain links
 * in the static HTML of every page; the sister sites link back here. #151
 * English on every locale: the names are proper nouns and the sister sites
 * are English-only.
 */
const MORE_APPS = [
  { title: "Event Stories – party planner app", href: "https://event-stories.12f.dk/" },
  { title: "Travel Stories – trip planner & travel journal", href: "https://travel-stories.12f.dk/" },
  { title: "Bike Stories – bike maintenance log", href: "https://bike-stories.12f.dk/" },
];

/**
 * The footer is a close, not a sitemap: the one-liner, the links in two short
 * columns, and the name across the bottom at a size the screen cannot hold,
 * cut by the bottom edge.
 */
function Footer() {
  const {
    name,
    ui,
    homeHref = "/",
    footer: { links, legalLinks, socials },
  } = useContext(ConfigContext)!;

  const legal = [
    legalLinks.termsAndConditions && {
      href: "/terms-and-conditions",
      title: "Terms & conditions",
    },
    legalLinks.privacyPolicy && {
      href: "/privacy-policy",
      title: "Privacy policy",
    },
    legalLinks.cookiesPolicy && {
      href: "/cookies-policy",
      title: "Cookies policy",
    },
  ].filter(Boolean) as { href: string; title: string }[];

  const linkClass = "hover:underline underline-offset-[0.3em]";

  return (
    <footer data-field="dark" className="hs-dark relative overflow-hidden pt-24 md:pt-32">
      <div className="hs-wrap hs-grid gap-y-14">
        <p className="hs-lead col-span-12 m-0 max-w-[38ch] md:col-span-6">
          {ui.footer.tagline}
        </p>

        <nav aria-label={ui.footer.site} className="col-span-6 md:col-span-2 md:col-start-9">
          <p className="hs-soft m-0">{ui.footer.site}</p>
          <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
            {links.map(({ title, href }) => (
              <li key={href} className="m-0 p-0">
                <a className={linkClass} href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-2">
          <p className="hs-soft m-0">{ui.footer.contact}</p>
          <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
            <li className="m-0 p-0">
              <a className={linkClass} href="mailto:robert@12f.dk">
                robert@12f.dk
              </a>
            </li>
            {legal.map(({ title, href }) => (
              <li key={href} className="m-0 p-0">
                <a className={linkClass} href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
          {(socials?.facebook || socials?.instagram || socials?.twitter) && (
            <div className="mt-5 flex items-center gap-4">
              {socials?.facebook && (
                <a className="h-5 w-5" target="_blank" rel="noopener noreferrer" href={socials.facebook} aria-label="Home Stories on Facebook">
                  <FacebookLogo />
                </a>
              )}
              {socials?.instagram && (
                <a className="h-5 w-5" target="_blank" rel="noopener noreferrer" href={socials.instagram} aria-label="Home Stories on Instagram">
                  <InstagramLogo />
                </a>
              )}
              {socials?.twitter && (
                <a className="h-5 w-5" target="_blank" rel="noopener noreferrer" href={socials.twitter} aria-label="Home Stories on X">
                  <TwitterLogo />
                </a>
              )}
            </div>
          )}
        </div>

        <nav aria-label="More apps from 12f" className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="hs-soft m-0">More apps from 12f</p>
          <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
            {MORE_APPS.map(({ title, href }) => (
              <li key={href} className="m-0 p-0">
                <a className={linkClass} href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hs-wrap hs-soft hs-small mt-24 flex flex-wrap justify-between gap-x-6 gap-y-1 md:mt-36">
        <span>© {new Date().getFullYear()} 12f · Made in Denmark</span>
        <span>iPhone and iPad · iOS 17 or later</span>
      </div>

      {/* The name, cut by the bottom edge. Recognisable from its upper part. */}
      <a href={homeHref} aria-label={name} className="hs-wordmark" tabIndex={-1}>
        <span aria-hidden="true">{name}</span>
      </a>
    </footer>
  );
}

export default Footer;
