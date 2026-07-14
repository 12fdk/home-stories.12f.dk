import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SectionHeading from "../../../../components/sectionHeading";

function Testimonials() {
  const {
    home: { testimonials },
  } = useContext(ConfigContext)!;
  if (!testimonials) return null;

  return (
    <section
      id={testimonials.id}
      className="mx-auto max-w-screen-lg px-4 py-20 md:py-28"
    >
      <SectionHeading
        label="Reviews"
        title={testimonials.title}
        subtitle={testimonials.subtitle}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.cards.map(({ name, comment }, index) => (
          <motion.figure
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="m-0 flex flex-col rounded-box border border-base-300 bg-base-100 p-6"
          >
            <div className="flex gap-0.5 text-accent" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, star) => (
                <svg
                  key={star}
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
                </svg>
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-base-content/80">
              {comment}
            </blockquote>

            <figcaption className="mt-6 border-t border-base-300 pt-4">
              <span className="tick-label text-base-content/50">{name}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
