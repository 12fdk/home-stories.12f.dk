import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ConfigContext } from "../../utils/configContext";
import { appStoreClick } from "../../utils/tracking";
import type { TemplateConfig } from "../../utils/configType";
import type { CSSProperties } from "react";

interface Props {
  config: TemplateConfig;
}

/**
 * Branded 404. Keeps the site chrome (navbar/footer) so a dead link is a
 * detour, not a dead end — and points at the pages people usually wanted.
 */
function NotFound({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar />
      <main data-field="light" className="hs-light pb-24 pt-16 md:pb-36 md:pt-24">
        <div className="hs-wrap hs-grid gap-y-10">
          <h1
            className="hs-display col-span-12 m-0"
            style={{ "--chars": 16 } as CSSProperties}
          >
            <span className="block">That wall isn't</span>
            <span className="block">there anymore.</span>
          </h1>
          <div className="col-span-12 md:col-span-5">
            <p className="hs-lead m-0 max-w-[30ch]">
              Page not found (404). It was moved, renamed, or never built. The
              rest of the site is still standing.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="/" className="hs-btn">
                Back to the homepage
              </a>
              <a href="/blog/" className="hs-link">
                Read the blog
              </a>
              <a
                href={config.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-link"
                {...appStoreClick("404")}
              >
                Get the app
              </a>
            </div>
          </div>
          <figure className="col-span-12 m-0 overflow-hidden md:col-span-7">
            <img
              src="/stock/31.webp"
              alt="An opened wall with the plaster cut back to show the pipes behind it."
              width={1200}
              height={900}
              className="hs-drift aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;
