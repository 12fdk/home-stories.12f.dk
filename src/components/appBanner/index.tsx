import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import { appStoreClick } from "../../utils/tracking";
import { longest, twoLines } from "../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The close: one sentence at poster size, one line under it, one action, and
 * the empty room the next project starts in.
 */
function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } = useContext(ConfigContext)!;
  if (!appBanner) return null;

  const lines = twoLines(appBanner.title);

  return (
    <section id={appBanner.id} data-field="light" className="hs-light hs-section">
      <div className="hs-wrap hs-grid items-end gap-y-12">
        <div className="col-span-12 md:col-span-6">
          <h2 className="hs-display hs-display--half m-0" style={{ "--chars": longest(lines) } as CSSProperties}>
            {lines.map((line, i) => (
              <span key={line} className="block whitespace-nowrap" data-reveal style={d(i * 90)}>
                {line}
              </span>
            ))}
          </h2>
          <p className="hs-lead m-0 mt-8 max-w-[30ch]" data-reveal style={d(160)}>
            {appBanner.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal style={d(220)}>
            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-badge"
                {...appStoreClick("app-banner")}
              >
                <img
                  className="h-[56px]"
                  alt="Download Home Stories on the App Store"
                  src={withBase("/stores/app-store.svg")}
                  width={168}
                  height={56}
                  loading="lazy"
                />
              </a>
            )}
            {googlePlayLink && (
              <a href={googlePlayLink} className="hs-badge">
                <img
                  className="h-[56px]"
                  alt="Get Home Stories on Google Play"
                  src={withBase("/stores/google-play.svg")}
                  width={168}
                  height={56}
                  loading="lazy"
                />
              </a>
            )}
          </div>
        </div>

        {/* The next one: an empty room, primed and waiting */}
        <figure className="col-span-12 m-0 overflow-hidden md:col-span-6" data-reveal style={d(120)}>
          <img
            src={withBase("/stock/11.webp")}
            alt="An empty room with fresh white walls and a paint tray on the floor, ready for the next job."
            loading="lazy"
            width={1200}
            height={900}
            className="hs-drift aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}

export default AppBanner;
