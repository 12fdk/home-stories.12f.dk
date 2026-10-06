import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { appStoreClick } from "../../utils/tracking";

interface Props {
  /**
   * "blog" swaps the homepage behaviour (appears after 400px, stays) for one
   * that respects reading: it waits until the reader is a third of the way
   * through the article, steps aside whenever an in-page App Store CTA or the
   * footer is on screen (no double ask), and can be dismissed for the session.
   */
  context?: "blog";
}

const DISMISS_KEY = "hs-sticky-dismissed";

/** Phone-only: the action follows you down the page, quietly. */
function StickyDownload({ context }: Props) {
  if (context === "blog") return <BlogSticky />;
  return <HomeSticky />;
}

function HomeSticky() {
  const { appStoreLink } = useContext(ConfigContext)!;
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [400, 520], [0, 1]);
  const y = useTransform(scrollY, [400, 520], [24, 0]);

  if (!appStoreLink) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-base-300 bg-base-100/95 p-3 backdrop-blur-md md:hidden"
    >
      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full text-base font-semibold normal-case"
        {...appStoreClick("sticky")}
      >
        Download free
        <span className="tick-label opacity-70">iOS 17+</span>
      </a>
    </motion.div>
  );
}

function BlogSticky() {
  const { appStoreLink } = useContext(ConfigContext)!;
  const [farEnough, setFarEnough] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const [dismissed, setDismissed] = useState(true); // until sessionStorage is read

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }

    // Progress through the article itself, not the page: the hero, TL;DR and
    // first sections should be read without a bar over the last line.
    const article = document.querySelector("article");
    const onScroll = () => {
      if (!article) return setFarEnough(window.scrollY > 900);
      const rect = article.getBoundingClientRect();
      const read = (window.innerHeight - rect.top) / Math.max(rect.height, 1);
      setFarEnough(read > 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide while any real CTA is on screen — the mid-article card, the end
    // box, the app banner, the footer. One ask at a time.
    const targets = document.querySelectorAll(
      '[data-cta-id], footer, a[data-umami-event-surface="app-banner"]',
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCtaInView(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  if (!appStoreLink) return null;
  const show = farEnough && !ctaInView && !dismissed;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode: dismissal just lasts for this page */
    }
  };

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-base-300 bg-base-100/95 px-3 py-2 backdrop-blur-md transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="m-0 flex-1 text-sm leading-tight text-base-content/80">
          Track this project on your iPhone
          <span className="block text-xs text-base-content/55">Free · works offline · no account</span>
        </p>
        <a
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="btn btn-primary btn-sm font-semibold normal-case"
          {...appStoreClick("sticky")}
        >
          Get it free
        </a>
        <button
          type="button"
          onClick={dismiss}
          tabIndex={show ? 0 : -1}
          aria-label="Hide this bar"
          className="btn btn-ghost btn-sm btn-square text-base-content/60"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default StickyDownload;
