import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import InstagramLogo from "./svgs/instagram";
import FacebookLogo from "./svgs/facebook";
import TwitterLogo from "./svgs/twitter";

function Footer() {
  const {
    name,
    logo,
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

  return (
    <footer className="border-t border-base-300 bg-base-100 px-4 pb-24 pt-16 md:pb-16">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <a href={homeHref} className="flex items-center gap-2">
            <img
              className="h-10 rounded-[22%]"
              src={withBase(logo)}
              alt=""
              width={40}
              height={40}
            />
            <span className="font-display text-lg font-bold tracking-tight">
              {name}
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-base-content/60">
            {ui.footer.tagline}
          </p>
          {(socials?.facebook || socials?.instagram || socials?.twitter) && (
            <div className="mt-5 flex items-center gap-4 text-base-content/60">
              {socials?.facebook && (
                <a
                  className="h-5 w-5 hover:text-base-content"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socials.facebook}
                  aria-label="Home Stories on Facebook"
                >
                  <FacebookLogo />
                </a>
              )}
              {socials?.instagram && (
                <a
                  className="h-5 w-5 hover:text-base-content"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socials.instagram}
                  aria-label="Home Stories on Instagram"
                >
                  <InstagramLogo />
                </a>
              )}
              {socials?.twitter && (
                <a
                  className="h-5 w-5 hover:text-base-content"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socials.twitter}
                  aria-label="Home Stories on X"
                >
                  <TwitterLogo />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-16">
          <nav aria-label={ui.footer.site}>
            <p className="tick-label m-0 text-base-content/40">{ui.footer.site}</p>
            <ul className="mt-4 list-none space-y-3 p-0">
              {links.map(({ title, href }) => (
                <li key={href} className="m-0 p-0">
                  <a
                    className="text-sm text-base-content/70 hover:text-base-content"
                    href={href}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="tick-label m-0 text-base-content/40">{ui.footer.contact}</p>
            <ul className="mt-4 list-none space-y-3 p-0">
              <li className="m-0 p-0">
                <a
                  className="text-sm text-base-content/70 hover:text-base-content"
                  href="mailto:robert@12f.dk"
                >
                  robert@12f.dk
                </a>
              </li>
              {legal.map(({ title, href }) => (
                <li key={href} className="m-0 p-0">
                  <a
                    className="text-sm text-base-content/70 hover:text-base-content"
                    href={href}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-screen-lg items-center justify-between border-t border-base-300 pt-6">
        <span className="tick-label text-base-content/40">
          © {new Date().getFullYear()} 12f
        </span>
        <span className="tick-label text-base-content/40">iOS 17+</span>
      </div>
    </footer>
  );
}

export default Footer;
