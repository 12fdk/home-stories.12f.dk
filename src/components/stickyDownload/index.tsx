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
  const [show, setShow] = useState(false);

  // Out of the way while the reader moves down the page (it would sit on the
  // headings they are reading); back as soon as they scroll up, which is when
  // people go looking for the action. Never over the hero's own badge.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 600) setShow(false);
      else if (y < last - 4) setShow(true);
      else if (y > last + 4) setShow(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!appStoreLink) return null;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 bg-graphite p-3 transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="hs-btn w-full"
        {...appStoreClick("sticky")}
      >
        Download free
        <span className="font-normal">· iOS 17 or later</span>
      </a>
    </div>
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
      className={`fixed inset-x-0 bottom-0 z-50 bg-graphite px-3 py-2 text-mist transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="m-0 flex-1 text-sm leading-tight">
          Track this project on your iPhone or iPad
          <span className="block opacity-75">Free · works offline · no account</span>
        </p>
        <a
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="hs-btn min-h-[44px] px-4"
          {...appStoreClick("sticky")}
        >
          Get it free
        </a>
        <button
          type="button"
          onClick={dismiss}
          tabIndex={show ? 0 : -1}
          aria-label="Hide this bar"
          className="flex h-11 w-11 items-center justify-center text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default StickyDownload;
