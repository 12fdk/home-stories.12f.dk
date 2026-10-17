import { useContext, type CSSProperties } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { appStoreClick } from "../../../../utils/tracking";
import { longest } from "../../../../utils/measure";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The offer as one sentence. The Pro price sits on an orange block one line
 * tall, so the figure reads as an object in the line rather than a styled
 * word. The amount is the live price from the reader's own storefront (#109);
 * underneath, both plans say plainly what they include.
 */
function Pricing() {
  const {
    appStoreLink,
    ui,
    home: { pricing },
  } = useContext(ConfigContext)!;
  if (!pricing) return null;

  const pro = pricing.plans.find((p) => p.highlight) ?? pricing.plans[pricing.plans.length - 1];
  const [line1, line2] = ui.poster.price;
  const [before, after = ""] = line2.split("{price}");
  const chars = longest([line1, `${before}${pro.price}${after}`]) + 1.5;

  return (
    <section id={pricing.id} data-field="dark" className="hs-dark hs-section">
      <div className="hs-wrap">
        <h2 className="hs-display m-0" style={{ "--chars": chars } as CSSProperties}>
          <span className="block whitespace-nowrap" data-reveal>
            {line1}
          </span>
          <span className="block whitespace-nowrap" data-reveal style={d(90)}>
            {before}
            <span className="hs-price">{pro.price}</span>
            {after}
          </span>
        </h2>

        <div className="hs-grid mt-16 items-end gap-y-10">
          {pricing.subtitle && (
            <p className="hs-lead col-span-12 m-0 max-w-[36ch] md:col-span-7" data-reveal>
              {pricing.subtitle}
            </p>
          )}
          {appStoreLink && pro.cta && (
            <div className="col-span-12 md:col-span-5 md:col-start-8 md:justify-self-end" data-reveal style={d(80)}>
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-btn w-full md:w-auto"
                {...appStoreClick("pricing")}
              >
                {pro.cta}
              </a>
            </div>
          )}
        </div>

        <div className="hs-grid mt-24 gap-y-14">
          {pricing.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`col-span-12 md:col-span-6 ${i === 1 ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5"}`}
              data-reveal
              style={d(i * 90)}
            >
              <h3 className="hs-lead m-0 font-semibold">
                {plan.name}
                <span className="hs-soft font-normal">
                  {" "}
                  · {plan.price}, {plan.period}
                </span>
              </h3>
              <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
                {plan.features.map((feature) => (
                  <li key={feature} className="m-0 p-0">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {pricing.footnote && (
          <p className="hs-soft hs-small m-0 mt-14">{pricing.footnote}</p>
        )}
      </div>
    </section>
  );
}

export default Pricing;
