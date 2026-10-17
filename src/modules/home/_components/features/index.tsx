import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import { measure } from "../../../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The moment on site each screen is for, in the same order as the cards in
 * config: the money on the table, the room being built, what is behind the
 * wall, and the report on the worktop at handover.
 */
const SCENES = [
  {
    src: "/stock/34.webp",
    alt: "Printed budget sheets with highlighted figures, a calculator and a tape measure on a table.",
  },
  {
    src: "/stock/16.webp",
    alt: "A kitchen mid-build: stud walls, a bare floor and the first cabinet carcasses going in.",
  },
  {
    src: "/stock/31.webp",
    alt: "An opened wall with the plaster cut back to show the pipes behind it.",
  },
  {
    src: "/stock/05.webp",
    alt: "A clipped stack of printed report pages on a pale stone worktop in a finished kitchen.",
  },
];

/**
 * Four screens, four rows. Each claim sits beside the real screen from the
 * app, set in front of a photograph of the moment on site it is for. Rows
 * alternate sides so the page reads down, not across.
 */
function Features() {
  const {
    home: { features },
  } = useContext(ConfigContext)!;
  if (!features) return null;

  return (
    <section id={features.id} data-field="light" className="hs-light hs-section">
      <div className="hs-wrap">
        <div className="hs-grid gap-y-5">
          <h2 className="hs-head col-span-12 m-0 md:col-span-8" data-reveal>
            {features.title}
          </h2>
          {features.subtitle && (
            <p className="hs-lead col-span-12 m-0 max-w-[36ch] md:col-span-6" data-reveal style={d(80)}>
              {features.subtitle}
            </p>
          )}
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-36">
          {features.cards.map((feat, index) => {
            const scene = SCENES[index % SCENES.length];
            const flip = index % 2 === 1;
            return (
              <article key={feat.title} className="hs-grid items-center gap-y-10">
                <div
                  className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
                >
                  <h3 className={`${measure(feat.title) > 24 ? "hs-title" : "hs-head"} m-0 max-w-[16ch]`} data-reveal>
                    {feat.title}
                  </h3>
                  <p className="hs-lead m-0 mt-6 max-w-[30ch]" data-reveal style={d(80)}>
                    {feat.subtitle}
                  </p>
                </div>

                <figure
                  className={`hs-scene col-span-12 m-0 lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"}`}
                  data-reveal
                  style={d(120)}
                >
                  <img
                    src={withBase(scene.src)}
                    alt={scene.alt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="hs-scene__photo"
                  />
                  <span className={`hs-scene__screen ${flip ? "hs-scene__screen--left" : ""}`}>
                    <img
                      src={withBase(feat.screenshot ?? feat.icon)}
                      srcSet={
                        feat.screenshot
                          ? `${withBase(feat.screenshot.replace(".webp", "-560.webp"))} 560w, ${withBase(feat.screenshot.replace(".webp", "-840.webp"))} 840w`
                          : undefined
                      }
                      sizes="(min-width: 768px) 280px, 46vw"
                      alt={`${feat.title}: the ${feat.label ?? ""} screen in Home Stories on iPhone`}
                      loading="lazy"
                      width={560}
                      height={1217}
                      style={{ marginTop: feat.crop ?? "0%" }}
                    />
                  </span>
                </figure>
              </article>
            );
          })}
        </div>
      </div>

      {/* The room itself, stripped to the studs: what all four screens are for */}
      <div className="mt-28 overflow-hidden md:mt-36">
        <img
          src={withBase("/stock/08.webp")}
          alt="A stripped room mid-renovation: bare stud walls, open ceiling joists and a dusty floor in low sunlight."
          loading="lazy"
          width={1600}
          height={900}
          className="hs-drift block h-[56svh] w-full object-cover md:h-[78svh]"
        />
      </div>
    </section>
  );
}

export default Features;
