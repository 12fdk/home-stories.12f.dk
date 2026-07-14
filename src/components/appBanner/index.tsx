import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import { motion } from "framer-motion";
import AppStoreRating from "../appStoreRating";

/** The closing ask. Ink section, one action, no second thought to have. */
function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } =
    useContext(ConfigContext)!;

  if (!appBanner) return null;

  return (
    <section
      id={appBanner.id}
      className="relative overflow-hidden border-t border-base-300 bg-neutral text-neutral-content"
    >
      {/* Tape edge across the top: the one place the accent runs full width */}
      <div aria-hidden="true" className="h-1 w-full bg-accent" />
      <div
        aria-hidden="true"
        className="ticks absolute inset-x-0 top-1 text-neutral-content"
      />

      <div className="mx-auto grid max-w-screen-lg items-center gap-10 px-4 py-20 md:grid-cols-2 md:gap-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="m-0 font-display text-4xl font-extrabold leading-[1.05] tracking-tightest md:text-[3.25rem]">
            {appBanner.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-neutral-content/70">
            {appBanner.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <img
                  className="h-[52px]"
                  alt="Download Home Stories on the App Store"
                  src={withBase("/stores/app-store.svg")}
                  width={156}
                  height={52}
                  loading="lazy"
                />
              </a>
            )}
            {googlePlayLink && (
              <a href={googlePlayLink} className="inline-flex">
                <img
                  className="h-[52px]"
                  alt="Get Home Stories on Google Play"
                  src={withBase("/stores/google-play.svg")}
                  width={156}
                  height={52}
                  loading="lazy"
                />
              </a>
            )}
            <AppStoreRating size="md" showReviewCount={false} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="iphone-frame">
            <div className="iphone-device">
              <div className="iphone-dynamic-island" />
              <div className="iphone-screen">
                <img
                  className="iphone-screenshot"
                  src={withBase(appBanner.screenshots[0])}
                  alt="Home Stories project list on iPhone"
                  loading="lazy"
                  width={288}
                  height={625}
                />
              </div>
              <div className="iphone-button-left iphone-button-silent" />
              <div className="iphone-button-left iphone-button-volume-up" />
              <div className="iphone-button-left iphone-button-volume-down" />
              <div className="iphone-button-right iphone-button-power" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AppBanner;
