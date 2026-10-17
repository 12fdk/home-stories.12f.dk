import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

/** Each screen gets its own flat field; the run alternates tone so the edges read. */
const FIELDS = [
  { cls: "hs-dark-2", field: "dark-2" },
  { cls: "hs-ply", field: "ply" },
  { cls: "hs-dark", field: "dark" },
  { cls: "hs-dark-2", field: "dark-2" },
] as const;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Four screens, four statements. Each is a full-bleed field holding one claim
 * on the left and its proof on the right: the real screen, at phone size,
 * cropped by the bottom edge of the field so it reads as the top of a phone
 * held up to you.
 */
function Features() {
  const {
    home: { features },
  } = useContext(ConfigContext)!;
  if (!features) return null;

  return (
    <section id={features.id} aria-labelledby="features-title">
      {features.cards.map((feat, index) => {
        const tone = FIELDS[index % FIELDS.length];
        return (
          <article
            key={feat.title}
            data-field={tone.field}
            className={`${tone.cls} overflow-hidden`}
          >
            <div className="hs-wrap hs-grid min-h-[80svh] gap-y-12 pt-24 md:pt-32">
              <div className="col-span-12 self-center md:col-span-7 md:pb-32 lg:col-span-6">
                {index === 0 && (
                  <div className="mb-20 md:mb-28">
                    <h2 id="features-title" className="hs-head m-0 max-w-[20ch]" data-reveal>
                      {features.title}
                    </h2>
                    {features.subtitle && (
                      <p className="hs-lead m-0 mt-5 max-w-[34ch]" data-reveal style={d(80)}>
                        {features.subtitle}
                      </p>
                    )}
                  </div>
                )}
                <h3 className="hs-head m-0 max-w-[18ch]" data-reveal>
                  {feat.title}
                </h3>
                <p className="hs-lead m-0 mt-6 max-w-[30ch]" data-reveal style={d(90)}>
                  {feat.subtitle}
                </p>
              </div>

              <div
                className="col-span-12 h-[440px] self-end overflow-hidden md:col-span-5 md:col-start-8 md:h-[min(70svh,720px)]"
                data-reveal
                style={d(160)}
              >
                <img
                  src={withBase(feat.screenshot ?? feat.icon)}
                  srcSet={
                    feat.screenshot && /budget-chart|tasks|photo-timeline|export-pdf/.test(feat.screenshot)
                      ? `${withBase(feat.screenshot.replace(".webp", "-560.webp"))} 560w, ${withBase(feat.screenshot.replace(".webp", "-840.webp"))} 840w, ${withBase(feat.screenshot)} 1206w`
                      : undefined
                  }
                  sizes="(min-width: 768px) 400px, 80vw"
                  alt={`${feat.title}: the ${feat.label ?? ""} screen in Home Stories on iPhone`}
                  loading="lazy"
                  width={1206}
                  height={2622}
                  style={{ marginTop: feat.crop ?? "0%" }}
                  className="mx-auto block w-full max-w-[400px]"
                />
              </div>
            </div>
          </article>
        );
      })}

      {/* The room itself, stripped to the studs: what all four screens are for */}
      <div data-field="dark" className="hs-dark overflow-hidden">
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
