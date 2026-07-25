import { getCollection, type CollectionEntry } from "astro:content";

/**
 * A post is live when it is not a draft AND its publishDate has arrived.
 *
 * The future-date half is what lets a batch of posts be written in one sitting but
 * released one per day (issue #95). Publishing a whole page set on a single day is
 * the shape Google's scaled-content-abuse policy is built to spot, and it also
 * breaks the blog's own one-post-per-day rule — so the set is dated forward and
 * revealed by the daily scheduled rebuild in .github/workflows/deploy.yml.
 *
 * Because the site is static, "now" means *build time*. A post therefore appears on
 * the first build on or after its publishDate, not at the stroke of midnight. If the
 * scheduled build is ever removed, future-dated posts silently stop appearing —
 * that workflow and this filter are a pair.
 */
export function isPublished(data: CollectionEntry<"blog">["data"], now = new Date()): boolean {
  if (data.draft) return false;
  return data.publishDate.valueOf() <= now.valueOf();
}

/** Live posts, newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => isPublished(data));
  return posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}
