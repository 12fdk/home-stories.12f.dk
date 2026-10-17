import { useContext, useId, useState, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * A renovation is a sequence, and doing the fourth thing before the second
 * costs money. So the steps are a slider: one control drives both halves,
 * the stage in words on the left and a picture of that stage on the right.
 * Every step's text is in the markup; only the current one is shown.
 */
function HowItWorks() {
  const {
    home: { howItWorks },
  } = useContext(ConfigContext)!;
  const [stage, setStage] = useState(0);
  const sliderId = useId();

  if (!howItWorks) return null;
  const steps = howItWorks.steps;
  const last = steps.length - 1;
  const progress = last > 0 ? stage / last : 1;

  return (
    <section
      id={howItWorks.id}
      data-field="dark"
      className="hs-dark hs-split relative"
      style={{ "--progress": progress } as CSSProperties}
    >
      <div className="hs-wrap relative z-[1] grid min-h-[88svh] grid-cols-1 gap-y-10 pb-12 pt-24 md:grid-cols-2 md:gap-x-14 md:pt-32">
        {/* The stage in pictures: first on a phone, the right half on desktop */}
        <div className="order-1 flex items-center justify-center md:order-2" data-reveal style={d(120)}>
          <div className="grid w-full max-w-[460px] overflow-hidden">
            {steps.map((step, i) => (
              <img
                key={step.image}
                src={withBase(step.image)}
                alt={step.imageAlt ?? ""}
                aria-hidden={i !== stage}
                loading="lazy"
                width={920}
                height={1150}
                className="aspect-[4/5] w-full object-cover transition-opacity duration-200 [grid-area:1/1]"
                style={{ opacity: i === stage ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* The stage in words */}
        <div className="order-3 md:order-1">
          <h2 className="hs-lead m-0 font-semibold" data-reveal>
            {howItWorks.title}
          </h2>
          {howItWorks.subtitle && (
            <p className="hs-soft m-0 mt-2 max-w-[44ch]" data-reveal style={d(60)}>
              {howItWorks.subtitle}
            </p>
          )}

          <div className="mt-14 grid md:mt-24" data-reveal style={d(120)}>
            {steps.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={i !== stage}
                className="transition-opacity duration-200 [grid-area:1/1]"
                style={{
                  opacity: i === stage ? 1 : 0,
                  visibility: i === stage ? "visible" : "hidden",
                }}
              >
                <h3 className="hs-head m-0 max-w-[16ch]">{step.title}</h3>
                <p className="m-0 mt-6 max-w-[46ch]">{step.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* One control drives both halves */}
        <div className="order-2 md:order-3 md:col-span-2" data-reveal style={d(180)}>
          <label htmlFor={sliderId} className="sr-only">
            {howItWorks.title}
          </label>
          <div className="hs-range">
            <div aria-hidden="true" className="hs-range__track">
              <div className="hs-range__fill" />
            </div>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={last}
              step={1}
              value={stage}
              aria-valuetext={steps[stage]?.title}
              onChange={(e) => setStage(Number(e.target.value))}
            />
          </div>
          <ol className="m-0 mt-5 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="m-0 p-0">
                <button
                  type="button"
                  onClick={() => setStage(i)}
                  className={`hs-lead text-left transition-colors hover:text-[color:var(--ink)] ${i === stage ? "font-semibold" : "hs-soft"}`}
                >
                  {step.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
