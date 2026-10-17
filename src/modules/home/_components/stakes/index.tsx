import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import { appStoreClick } from "../../../../utils/tracking";
import { measure } from "../../../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The stakes. The page used to run hero -> features, which skips the reason
 * anyone is reading: the renovation is already drifting. This names the
 * problem, puts a cited number on what it costs to leave alone, then turns
 * the picture over — and only then asks for the download. #117
 *
 * The figure is a band, not a measurement, and it links to the post that
 * explains why it is a band. Same standard the articles hold themselves to.
 */
function Stakes() {
  const {
    appStoreLink,
    home: { stakes },
  } = useContext(ConfigContext)!;
  if (!stakes) return null;

  const stat = stakes.stat;

  return (
    <>
      <section id={stakes.id} data-field="light" className="hs-light hs-section">
        <div className="hs-wrap hs-grid gap-y-12">
          <h2
            className={`${measure(stakes.title) > 40 ? "hs-title" : "hs-head"} col-span-12 m-0 max-w-[22ch] lg:col-span-10`}
            data-reveal
          >
            {stakes.title}
          </h2>

          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            {stakes.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className="m-0 max-w-[52ch] [&+p]:mt-5"
                data-reveal
                style={d(80 + i * 80)}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {stat && (
            <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-start-8 lg:col-span-5">
              <p
                className="hs-display m-0 tabular-nums"
                style={{ ...d(120), "--chars": measure(stat.value) + 1 } as CSSProperties}
                data-reveal
              >
                {stat.value}
              </p>
              <p className="m-0 mt-5 max-w-[40ch]" data-reveal style={d(200)}>
                {stat.caption}
              </p>
              <p className="m-0 mt-4" data-reveal style={d(260)}>
                <a href={stat.href} className="hs-link">
                  {stat.linkText}
                </a>
              </p>
            </div>
          )}

          {/* What nobody photographed: the inside of the wall. */}
          <figure className="col-span-12 m-0 mt-6 overflow-hidden" data-reveal>
            <img
              src={withBase("/stock/20.webp")}
              alt="An opened stud wall in a stripped room, with yellow cables running through the gap before the plasterboard goes back on."
              loading="lazy"
              width={1600}
              height={900}
              className="hs-drift aspect-[4/3] w-full object-cover md:aspect-[21/9]"
            />
          </figure>
        </div>
      </section>

      {/* The turn: the side you want to be standing on. */}
      <section data-field="dark" className="hs-dark hs-section">
        <div className="hs-wrap hs-grid items-end gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <h3
              className={`${measure(stakes.success.title) > 40 ? "hs-title" : "hs-head"} m-0 max-w-[26ch]`}
              data-reveal
            >
              {stakes.success.title}
            </h3>
            <p className="m-0 mt-6 max-w-[52ch]" data-reveal style={d(80)}>
              {stakes.success.body}
            </p>
            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-btn mt-9"
                data-reveal
                style={d(160)}
                {...appStoreClick("stakes")}
              >
                {stakes.cta}
              </a>
            )}
          </div>
          <img
            src={withBase("/stock/15.webp")}
            alt="A finished white kitchen with a stone worktop, pendant lights and a steel fridge, everything installed and clean."
            loading="lazy"
            width={800}
            height={1000}
            className="col-span-12 aspect-[4/5] w-full object-cover sm:col-span-8 lg:col-span-5 lg:col-start-8"
            data-reveal
            style={d(120)}
          />
        </div>
      </section>
    </>
  );
}

export default Stakes;
