import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import { appStoreClick } from "../../utils/tracking";
import { longest, twoLines } from "../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The close. The page's colours flip: graphite becomes the ink and the light
 * grey the ground. One sentence at poster size, one line under it, one action.
 */
function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } = useContext(ConfigContext)!;
  if (!appBanner) return null;

  const lines = twoLines(appBanner.title);

  return (
    <section
      id={appBanner.id}
      data-field="light"
      className="hs-light flex min-h-[80svh] flex-col justify-between gap-20 pb-10 pt-24 md:min-h-[90svh] md:pt-32"
    >
      <div className="hs-wrap w-full">
        <h2 className="hs-display m-0" style={{ "--chars": longest(lines) } as CSSProperties}>
          {lines.map((line, i) => (
            <span key={line} className="block whitespace-nowrap" data-reveal style={d(i * 90)}>
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="hs-wrap hs-grid w-full items-end gap-y-8">
        <p className="hs-lead col-span-12 m-0 max-w-[34ch] md:col-span-6" data-reveal style={d(160)}>
          {appBanner.subtitle}
        </p>
        <div
          className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-4 md:col-start-9 md:justify-end"
          data-reveal
          style={d(220)}
        >
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
    </section>
  );
}

export default AppBanner;
