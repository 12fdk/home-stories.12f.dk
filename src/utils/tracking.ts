/**
 * Outbound App Store click tracking.
 *
 * Umami is the only measurement we get on this handoff. App Store Connect can
 * say a first-time download came from a "Web referrer", but it only names the
 * referring domain in the *Detailed* downloads report, which Apple
 * privacy-suppresses down to a few hundred rows a year — home-stories.12f.dk
 * has never once survived that threshold. So the click *leaving* this site is
 * the last event we can actually observe, and it only means anything if every
 * surface reports it. One untracked button and the total quietly understates.
 *
 * Deliberately one event name: the headline question is "how many people went
 * from the site to the App Store", and that should be readable in Umami's
 * Events panel without summing eight rows. `surface` carries the breakdown.
 */
export const APP_STORE_CLICK_EVENT = "appstore-click";

export type AppStoreSurface =
  | "hero"
  /** The stakes section's button — the first contrasting CTA on the page,
   *  and the one that follows the problem rather than the feature list. */
  | "stakes"
  | "pricing"
  | "navbar"
  | "navbar-mobile"
  | "app-banner"
  | "sticky"
  | "404"
  | "blog-inline-cta"
  /** The /app redirect stub, which forwards straight to the store. */
  | "app-redirect"
  /**
   * `/join` — the CloudKit share fallback. Someone was sent a project invite
   * and does not have the app, so Apple bounced them here. The highest-intent
   * install this site sees: they are not evaluating the app, they are trying to
   * open something a person they know already made.
   */
  | "share-invite";

/**
 * Attributes to spread onto an `<a>` that leaves for the App Store. Umami's
 * script binds a delegated click listener at load, so this works the same in
 * Astro markup and in React-rendered DOM — no imperative call needed.
 */
export function appStoreClick(surface: AppStoreSurface) {
  return {
    "data-umami-event": APP_STORE_CLICK_EVENT,
    "data-umami-event-surface": surface,
  } as const;
}

/**
 * Free-download tracking.
 *
 * Separate from the App Store event on purpose: a download and a store click
 * answer different questions, and folding them together would make the store
 * total — the number this site actually optimises — unreadable.
 *
 * Same one-event-name rule as above, though. "How many people took a
 * download" should be one row in Umami's Events panel, with `file`, `surface`
 * and `slug` carrying the breakdown, not three separate events to sum by hand.
 *
 * Nothing personal is recorded: Umami has no cookies and no cross-site
 * identity, and these properties describe the file and the page, not the
 * reader. The downloads themselves stay ungated — this measures whether they
 * are worth keeping, it does not gate them. #119
 */
export const DOWNLOAD_EVENT = "download";

export type DownloadSurface =
  /** The transitional CTA under the App Store button at the end of a post. */
  | "blog-transitional-cta"
  /** A link inside post prose — the two posts that ship their own file. */
  | "blog-prose"
  /**
   * The /downloads/ page. The one surface where the reader came for the file
   * itself rather than arriving at it from the bottom of an article, so its
   * rate is the honest read on whether these are wanted.
   */
  | "downloads-page";

/** Attributes to spread onto an `<a download>` that serves a static file. */
export function downloadClick(
  surface: DownloadSurface,
  file: string,
  slug?: string,
) {
  return {
    "data-umami-event": DOWNLOAD_EVENT,
    "data-umami-event-surface": surface,
    "data-umami-event-file": file,
    ...(slug ? { "data-umami-event-slug": slug } : {}),
  } as const;
}

type UmamiGlobal = {
  track?: (event: string, data?: Record<string, unknown>) => Promise<unknown> | void;
};

/**
 * Imperative version, for the one case that is not an anchor: `/app` redirects
 * via `window.location`, so there is no element for the delegated listener to
 * find.
 *
 * Resolves once the beacon is away, but never blocks the redirect for more
 * than `timeoutMs` — a measurement call that delays a user is a bug, and this
 * runs on a page whose entire job is to get out of the way. Also resolves (not
 * rejects) when Umami is blocked or still loading, which is the common case for
 * a redirect stub that unmounts almost immediately.
 */
export function trackAppStoreClick(
  surface: AppStoreSurface,
  timeoutMs = 300,
): Promise<void> {
  const umami = (globalThis as { umami?: UmamiGlobal }).umami;
  if (!umami?.track) return Promise.resolve();

  let sent: Promise<unknown> | void;
  try {
    sent = umami.track(APP_STORE_CLICK_EVENT, { surface });
  } catch {
    return Promise.resolve();
  }
  if (!(sent instanceof Promise)) return Promise.resolve();

  return Promise.race([
    sent.then(() => undefined).catch(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}
