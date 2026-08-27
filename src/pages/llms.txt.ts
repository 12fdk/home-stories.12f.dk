import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { isPublished } from "../utils/posts";
import preamble from "../data/llms-preamble.md?raw";

const SITE = "https://home-stories.12f.dk";

/**
 * llms.txt, generated rather than hand-maintained.
 *
 * The hand-written file described the product well but linked only the blog
 * index, so none of the individual articles — the site's most citable content —
 * appeared on the surface built specifically for AI crawlers. Generating the
 * article list from the collection means a new post is listed the moment it
 * ships, and the file can never drift from what is actually published.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => isPublished(data))).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const lines = [
    preamble.trimEnd(),
    "",
    "## Blog",
    "",
    "Practical, evidence-based guides on planning, budgeting, sequencing and",
    "documenting home renovations. Every article below is a full page on this",
    "site and may be quoted or cited directly.",
    "",
    `- Blog index: ${SITE}/blog/`,
    `- RSS feed: ${SITE}/rss.xml`,
    "",
    `### All articles (${posts.length})`,
    "",
    ...posts.map((p) => {
      const updated = p.data.updatedDate ? `, updated ${iso(p.data.updatedDate)}` : "";
      return `- [${p.data.title}](${SITE}/blog/${p.slug}/) — ${p.data.description} (published ${iso(p.data.publishDate)}${updated})`;
    }),
    "",
    "## Links",
    "",
    `- Full content for AI: ${SITE}/llms-full.txt`,
    `- AI usage policy: ${SITE}/ai.txt`,
    `- Sitemap: ${SITE}/sitemap-index.xml`,
    `- Privacy Policy: ${SITE}/privacy-policy/`,
    `- Terms and Conditions: ${SITE}/terms-and-conditions/`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
