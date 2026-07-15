import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import SectionHeading from "../../../../components/sectionHeading";

function Features() {
  const {
    ui,
    home: { features },
  } = useContext(ConfigContext)!;
  if (!features) return null;

  return (
    <section
      id={features.id}
      className="mx-auto max-w-screen-lg px-4 py-20 md:py-28"
    >
      <SectionHeading
        label={ui.sectionLabels.features}
        title={features.title}
        subtitle={features.subtitle}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {features.cards.map((feat, index) => (
          <motion.article
            key={feat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: (index % 2) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100"
          >
            {/* Show the real screen, cropped to the top where the data lives */}
            <div className="relative h-56 overflow-hidden bg-base-200 md:h-64">
              <img
                src={withBase(feat.screenshot ?? feat.icon)}
                alt={`${feat.title} — Home Stories on iPhone`}
                loading="lazy"
                width={600}
                height={1300}
                style={{ marginTop: feat.crop ?? "0%" }}
                className="absolute inset-x-0 top-8 mx-auto w-[58%] rounded-t-2xl border border-b-0 border-base-300 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-3"
              />
            </div>

            <div className="border-t border-base-300 p-6 md:p-7">
              {feat.label && (
                <p className="tick-label m-0 text-primary">{feat.label}</p>
              )}
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-base-content md:text-2xl">
                {feat.title}
              </h3>
              <p className="mt-2 text-base-content/70">{feat.subtitle}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Features;
