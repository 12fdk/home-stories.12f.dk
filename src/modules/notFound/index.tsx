import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";

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
      <main className="flex min-h-[60vh] items-center px-4 py-24">
        <div className="mx-auto w-full max-w-screen-lg">
          <p className="tick-label m-0 flex items-center gap-3 text-base-content/50">
            <span className="inline-block h-0.5 w-8 bg-accent" />
            404 — PAGE NOT FOUND
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tightest md:text-6xl">
            That wall isn't there anymore.
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-base-content/70">
            The page you're after was moved, renamed, or never built. The rest
            of the site is still standing.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="/" className="btn btn-primary">
              Back to the homepage
            </a>
            <a href="/blog/" className="link text-base-content/70">
              Read the blog
            </a>
            <a
              href={config.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-base-content/70"
            >
              Get the app
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;
