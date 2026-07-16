import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

/**
 * Free vs Pro, stated as plainly as the rest of the page. Two cards, one
 * one-time price, no subscription theatrics.
 */
function Pricing() {
  const {
    appStoreLink,
    home: { pricing },
  } = useContext(ConfigContext)!;
  if (!pricing) return null;

  return (
    <section
      id={pricing.id}
      className="mx-auto max-w-screen-lg px-4 py-20 md:py-28"
    >
      <SectionHeading
        label={pricing.label}
        title={pricing.title}
        subtitle={pricing.subtitle}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {pricing.plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex flex-col rounded-box border p-6 md:p-8 ${
              plan.highlight
                ? "border-base-content bg-base-100"
                : "border-base-300 bg-base-100"
            }`}
          >
            <p className="tick-label m-0 flex items-center gap-3 text-base-content/50">
              {plan.highlight && (
                <span className="inline-block h-0.5 w-8 bg-accent" />
              )}
              {plan.name}
            </p>
            <p className="m-0 mt-4 font-display text-4xl font-extrabold tracking-tightest text-base-content">
              {plan.price}
              <span className="ml-2 align-middle font-sans text-sm font-normal text-base-content/60">
                {plan.period}
              </span>
            </p>
            <ul className="mt-6 flex flex-col gap-3 p-0 text-sm leading-relaxed">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 inline-block h-0.5 w-4 flex-none bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-base-content/80">{feature}</span>
                </li>
              ))}
            </ul>
            {plan.cta && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 self-start ${
                  plan.highlight ? "btn btn-primary" : "btn btn-outline"
                }`}
              >
                {plan.cta}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {pricing.footnote && (
        <p className="mt-6 text-xs text-base-content/50">{pricing.footnote}</p>
      )}
    </section>
  );
}

export default Pricing;
