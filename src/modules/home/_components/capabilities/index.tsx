import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The parts around the edges, set as a list rather than a grid of cards:
 * a wide statement, then the rows pushed to the right half with their
 * description beside each name. One photograph holds the empty left side.
 */
function Capabilities() {
  const {
    home: { capabilities },
  } = useContext(ConfigContext)!;
  if (!capabilities) return null;

  return (
    <section id={capabilities.id} data-field="dark" className="hs-dark hs-section">
      <div className="hs-wrap hs-grid gap-y-16">
        <div className="col-span-12">
          <h2 className="hs-head m-0 max-w-[22ch] md:indent-[3vw]" data-reveal>
            {capabilities.title}
          </h2>
          {capabilities.subtitle && (
            <p className="hs-lead m-0 mt-6 max-w-[40ch]" data-reveal style={d(80)}>
              {capabilities.subtitle}
            </p>
          )}
        </div>

        <figure className="col-span-12 m-0 self-end sm:col-span-8 md:col-span-4" data-reveal style={d(160)}>
          <img
            src={withBase("/stock/12.webp")}
            alt="Hand tools on a workbench: a drill, a level, a hammer, pliers and a tape measure, mid-job."
            loading="lazy"
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
        </figure>

        <dl className="col-span-12 m-0 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          {capabilities.cards.map((cap, i) => (
            <div
              key={cap.title}
              className={`grid gap-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 ${
                i === 0 ? "" : i % 4 === 0 ? "mt-14" : "mt-7"
              }`}
              data-reveal
              style={d((i % 4) * 60)}
            >
              <dt className="font-semibold">{cap.title}</dt>
              <dd className="m-0 opacity-90">{cap.subtitle}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Capabilities;
