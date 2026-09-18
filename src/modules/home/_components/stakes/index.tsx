import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { appStoreClick } from "../../../../utils/tracking";
import SectionHeading from "../../../../components/sectionHeading";

/**
 * The stakes. The page used to run hero -> features, which skips the reason
 * anyone is reading: the renovation is already drifting. This names the
 * problem, puts a cited number on what it costs to leave alone, then turns
 * the picture over — and only then asks for the download. #117
 *
 * The figure is a band, not a measurement, and it links to the post that
 * explains why it is a band. Same standard the articles hold themselves to.
 */
function Stakes() {
  const {
    appStoreLink,
    home: { stakes },
  } = useContext(ConfigContext)!;
  if (!stakes) return null;

  return (
    <section id={stakes.id} className="border-b border-base-300">
      <div className="mx-auto max-w-screen-lg px-4 py-20 md:py-28">
        <SectionHeading label={stakes.label} title={stakes.title} />

        <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {stakes.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-0 max-w-xl text-base leading-relaxed text-base-content/70 [&+p]:mt-4 md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            {stakes.stat && (
              <div className="mt-10 border-t-2 border-accent pt-5">
                <p className="m-0 font-display text-4xl font-extrabold tracking-tightest text-base-content md:text-5xl">
                  {stakes.stat.value}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-base-content/60">
                  {stakes.stat.caption}
                </p>
                <p className="mt-4">
                  <a
                    href={stakes.stat.href}
                    className="tick-label inline-flex items-center gap-2 border-b-2 border-accent pb-0.5 text-base-content no-underline hover:opacity-70"
                  >
                    {stakes.stat.linkText}
                    <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
            )}
          </motion.div>

          {/* The turn: same drawing conventions, but this is the side you want
              to be standing on. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-box border border-base-300 bg-base-200 p-7 md:p-8"
          >
            <p className="tick-label m-0 flex items-center gap-3 text-base-content/50">
              <span className="inline-block h-0.5 w-8 bg-accent" />
              {stakes.success.label}
            </p>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.15] tracking-tightest text-base-content md:text-3xl">
              {stakes.success.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-base-content/70">
              {stakes.success.body}
            </p>

            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent mt-7 rounded-btn border-0 font-display text-base font-bold tracking-tight"
                {...appStoreClick("stakes")}
              >
                {stakes.cta}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Stakes;
