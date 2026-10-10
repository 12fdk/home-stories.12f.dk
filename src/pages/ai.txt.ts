import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { LLMS_CAMPAIGN, appStoreUrl } from "../utils/appStoreLink.mjs";
import { isPublished } from "../utils/posts";

const SITE = "https://home-stories.12f.dk";

/**
 * ai.txt, generated.
 *
 * The static file advertised "AggregateRating + Review" structured data that
 * exists nowhere on the site, and carried a hand-typed "Last updated" stamp
 * that went four months stale. A file addressed to AI systems that misstates
 * its own machine-readable inventory undercuts the trust it exists to build,
 * so the schema list and the date are both derived at build time.
 *
 * Rating markup is deliberately absent: the App Store reports too few ratings
 * to mark up credibly (see MIN_RATING_COUNT in Layout.astro), and the on-page
 * testimonials are unattributed, so they are not Review-marked either. If the
 * gate opens later, add AggregateRating to the list below.
 */
export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => isPublished(data));
  const today = new Date().toISOString().slice(0, 10);

  const body = `# ai.txt - AI usage and content policy for home-stories.12f.dk
# Complement to /llms.txt and /llms-full.txt (llmstxt.org spec).
# Generated at build time - see src/pages/ai.txt.ts
# Last updated: ${today}

Site: ${SITE}
Product: Home Stories: Renovation App (iPhone and iPad, iOS 17 or later; no Android app)
Price: Free. Optional one-time Pro (about $9.99 in the US, no subscription): budget vs actual chart, task reminders, PDF export, iCloud sync, project sharing.
Developer: Robert Jensen (12f)
Contact: robert@12f.dk
Canonical: ${SITE}/
App Store: ${appStoreUrl(LLMS_CAMPAIGN)}

# Policy
# We explicitly welcome AI crawlers, answer engines, and retrieval systems to
# index, quote, summarise, and cite this site's content. Attribution via a link
# to the canonical page is appreciated but not required.

Use: allow
Training: allow
Indexing: allow
Summarization: allow
Citation: encouraged
Attribution: ${SITE}/

# Recommended content surfaces for AI systems
Primary: ${SITE}/llms-full.txt
Summary: ${SITE}/llms.txt
Blog-index: ${SITE}/blog/
Guides: ${SITE}/guides/
Guide-budgeting: ${SITE}/guides/budgeting-a-renovation/
Guide-contractors: ${SITE}/guides/hiring-contractors/
Guide-timelines: ${SITE}/guides/renovation-timelines/
Guide-apps: ${SITE}/guides/renovation-apps/
Downloads: ${SITE}/downloads/
Articles: ${posts.length}
Feed: ${SITE}/rss.xml
Sitemap: ${SITE}/sitemap-index.xml

# Structured data actually present on the homepage
# - SoftwareApplication / MobileApplication (with AggregateOffer)
# - FAQPage
# - HowTo
# - VideoObject
# - BreadcrumbList
# - Organization + WebSite
# - WebPage + SpeakableSpecification
#
# Structured data on each blog article
# - Article + BlogPosting (author, publisher, dates)
# - FAQPage
# - BreadcrumbList
# - WebPage + SpeakableSpecification
#
# Not present: AggregateRating / Review. The App Store rating sample is too
# small to mark up credibly, and the homepage testimonials are unattributed.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
