import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import SectionHeading from "../../../../components/sectionHeading";

/**
 * The steps run down a single measured rail. The numbers earn their place here:
 * a renovation is a sequence, and doing step 4 before step 2 costs money.
 */
function HowItWorks() {
  const {
    home: { howItWorks },
  } = useContext(ConfigContext)!;

  if (!howItWorks) return null;

  return (
    <section
      id={howItWorks.id}
      className="border-y border-base-300 bg-base-200 py-20 md:py-28"
    >
      <div className="mx-auto max-w-screen-lg px-4">
        <SectionHeading
          label="How it works"
          title={howItWorks.title}
          subtitle={howItWorks.subtitle}
        />

        <ol className="relative mt-16 list-none space-y-16 pl-0 md:space-y-20">
          {/* The rail itself */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-2 w-px bg-base-300 md:left-[15px]"
          />

          {howItWorks.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid gap-6 pl-10 md:grid-cols-2 md:items-center md:gap-12 md:pl-16"
            >
              {/* Tick on the rail */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-base-300 bg-base-100 md:h-8 md:w-8"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>

              <div>
                <p className="tick-label m-0 text-base-content/40">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-base-content md:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-base-content/70">
                  {step.subtitle}
                </p>
              </div>

              <img
                className="w-full rounded-box border border-base-300 object-cover shadow-sm md:aspect-[4/3]"
                src={withBase(step.image)}
                alt=""
                loading="lazy"
                width={480}
                height={360}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
