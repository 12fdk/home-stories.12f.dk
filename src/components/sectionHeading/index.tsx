import { motion } from "framer-motion";

interface Props {
  /** Mono eyebrow. Names the section — it is a label, not a count. */
  label: string;
  title: string;
  subtitle?: string | undefined;
  /** Dark sections invert the rule and the muted text. */
  inverted?: boolean;
}

/**
 * Every section is introduced the same way: a mono label on a hairline rule,
 * then the title. The rule is the drawing convention the page is built on.
 */
function SectionHeading({ label, title, subtitle, inverted = false }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl"
    >
      <p
        className={`tick-label m-0 flex items-center gap-3 ${
          inverted ? "text-neutral-content/50" : "text-base-content/50"
        }`}
      >
        <span className="inline-block h-0.5 w-8 bg-accent" />
        {label}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tightest md:text-[2.75rem] ${
          inverted ? "text-neutral-content" : "text-base-content"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${
            inverted ? "text-neutral-content/70" : "text-base-content/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}

export default SectionHeading;
