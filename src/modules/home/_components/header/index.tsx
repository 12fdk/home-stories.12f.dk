import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import AppStoreRating from "../../../../components/appStoreRating";

const SCREENSHOT_INTERVAL = 3800;

/**
 * The dimension rail: the app's budget bar drawn the way a measurement is
 * called out on a construction drawing. The figures are the sample kitchen
 * project shown in the screenshot beside it — not a claim about anyone's spend.
 */
function BudgetRail({
  project,
  currency,
  budget,
  spent,
  potential,
  labels,
}: {
  project: string;
  currency: string;
  budget: number;
  spent: number;
  potential: number;
  labels: { committedSuffix: string; spent: string; committed: string; left: string };
}) {
  const spentRatio = Math.min(spent / budget, 1);
  const potentialRatio = Math.min(potential / budget, 1 - spentRatio);
  const format = (n: number) => `${currency}${n.toLocaleString("en-US")}`;

  return (
    <div className="not-prose mt-7 max-w-md">
      <div className="flex items-baseline justify-between text-base-content/60">
        <span className="tick-label">{project}</span>
        <span className="tick-label">
          {Math.round((spentRatio + potentialRatio) * 100)}% {labels.committedSuffix}
        </span>
      </div>

      {/* The bar: spent solid, committed hatched behind it */}
      <div className="relative mt-3 flex h-3 overflow-hidden rounded-[3px] bg-base-300">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left", width: `${spentRatio * 100}%` }}
          className="h-full bg-accent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            width: `${potentialRatio * 100}%`,
          }}
          className="h-full bg-accent/40"
        />
        <div
          aria-hidden="true"
          className="ticks absolute inset-x-0 -bottom-2 text-base-content"
        />
      </div>

      {/* The dimension callouts */}
      <div className="mt-5 grid grid-cols-3 gap-4 font-mono">
        {[
          { k: labels.spent, v: format(spent) },
          { k: labels.committed, v: format(potential) },
          { k: labels.left, v: format(budget - spent - potential) },
        ].map(({ k, v }) => (
          // Static: hero text must be visible in the SSR paint (LCP). #23
          <div key={k}>
            <div
              aria-hidden="true"
              className="rail text-base-content"
            />
            <div className="mt-2 text-base font-medium tabular-nums text-base-content">
              {v}
            </div>
            <div className="tick-label text-base-content/50">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const {
    googlePlayLink,
    appStoreLink,
    ui,
    home: { header },
  } = useContext(ConfigContext)!;

  const [index, setIndex] = useState(0);
  const shots = header.screenshots;

  useEffect(() => {
    if (shots.length < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % shots.length),
      SCREENSHOT_INTERVAL
    );
    return () => clearInterval(timer);
  }, [shots.length]);

  const words = header.headline.split(" ");
  const mark = header.headlineMark;

  return (
    <section
      id={header.id}
      className="relative overflow-hidden border-b border-base-300"
    >
      {/* Drafting grid, barely there */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="mx-auto grid max-w-screen-lg gap-12 px-4 pb-16 pt-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-8 md:pb-20 md:pt-10">
        <div className="prose max-w-none">
          {/* Hero text is static: SSR must paint it immediately — entrance
              animations here hid the LCP element until hydration (#23). */}
          <p className="tick-label not-prose m-0 flex items-center gap-3 text-base-content/50">
            <span className="inline-block h-0.5 w-8 bg-accent" />
            {ui.header.eyebrow}
          </p>

          <h1 className="mb-0 mt-4 text-[2.5rem] font-extrabold leading-[1.04] tracking-tightest md:text-[3.5rem]">
            {words.map((word, wordIndex) => {
              const highlighted =
                mark && wordIndex >= mark[0] && wordIndex < mark[1];
              return (
                <span key={wordIndex} className="inline-block">
                  <span
                    className={
                      highlighted
                        ? "relative inline-block"
                        : "inline-block"
                    }
                  >
                    {word}
                    {highlighted && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                        className="absolute -bottom-1 left-0 right-0 h-[6px] bg-accent"
                      />
                    )}
                  </span>
                  {wordIndex < words.length - 1 && " "}
                </span>
              );
            })}
          </h1>

          <p className="mb-0 mt-5 max-w-lg text-base leading-relaxed text-base-content/70 md:text-lg">
            {header.subtitle}
          </p>

          <div className="not-prose mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
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
                />
              </a>
            )}
            <AppStoreRating size="md" showReviewCount={false} />
          </div>

          {header.sample && (
            <BudgetRail
              {...header.sample}
              labels={{
                committedSuffix: ui.header.committedSuffix,
                spent: ui.header.spent,
                committed: ui.header.committed,
                left: ui.header.left,
              }}
            />
          )}
        </div>

        {/* The real thing */}
        <div className="flex justify-center md:justify-end">
          {/* Static: the phone screenshot is the desktop LCP candidate — it
              must be visible in the SSR paint, not gated on hydration. #23 */}
          <div className="iphone-frame">
            <div className="iphone-device">
              <div className="iphone-dynamic-island" />
              <div className="iphone-screen">
                {shots.map((src, shotIndex) => (
                  <img
                    key={src}
                    src={withBase(src)}
                    // The frame renders at 280px; the source files are 1206px.
                    // Right-sized variants keep the LCP image small (#23).
                    srcSet={`${withBase(src.replace(".webp", "-560.webp"))} 560w, ${withBase(src.replace(".webp", "-840.webp"))} 840w, ${withBase(src)} 1206w`}
                    sizes="280px"
                    alt={`Home Stories on iPhone, screen ${shotIndex + 1}`}
                    className="iphone-screenshot absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: shotIndex === index ? 1 : 0 }}
                    width={280}
                    height={608}
                    loading={shotIndex === 0 ? "eager" : "lazy"}
                    fetchPriority={shotIndex === 0 ? "high" : "auto"}
                  />
                ))}
              </div>
              <div className="iphone-button-left iphone-button-silent" />
              <div className="iphone-button-left iphone-button-volume-up" />
              <div className="iphone-button-left iphone-button-volume-down" />
              <div className="iphone-button-right iphone-button-power" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
