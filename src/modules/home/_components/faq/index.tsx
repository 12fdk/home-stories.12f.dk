import clsx from "clsx";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

function Faq() {
  const {
    home: { faq },
  } = useContext(ConfigContext)!;
  const [activeIndex, setActiveIndex] = useState<number>();

  if (!faq) return null;

  return (
    <section
      id={faq.id}
      className="border-t border-base-300 bg-base-200 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-screen-lg gap-12 px-4 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <SectionHeading label="FAQ" title={faq.title} />

        <div className="divide-y divide-base-300 border-y border-base-300">
          {faq.qa.map((qa, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={qa.question}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="m-0">
                  <button
                    onClick={() =>
                      setActiveIndex((current) =>
                        current === index ? undefined : index
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold tracking-tight text-base-content"
                  >
                    {qa.question}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "relative h-4 w-4 shrink-0 text-base-content/40 transition-transform duration-300",
                        { "rotate-45": isOpen }
                      )}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  className={clsx(
                    "grid grid-rows-[0fr] transition-[grid-template-rows,padding] duration-300",
                    { "grid-rows-[1fr] pb-6": isOpen }
                  )}
                >
                  <p className="faq-answer m-0 overflow-hidden pr-8 leading-relaxed text-base-content/70">
                    {qa.answer}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
