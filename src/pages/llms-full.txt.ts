import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { isPublished } from "../utils/posts";
import preamble from "../data/llms-full-preamble.md?raw";

const SITE = "https://home-stories.12f.dk";

/**
 * llms-full.txt, generated. The static version mentioned the blog zero times,
 * so roughly 75,000 words of the site's most citable writing were invisible to
 * the file built to feed AI crawlers. Each article contributes its title,
 * canonical URL, dates, summary, TL;DR points and FAQ pairs — enough for an
 * answer engine to cite accurately without re-crawling every page.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => isPublished(data))).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const strip = (s: string) =>
    s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

  const articles = posts.flatMap((p) => {
    const d = p.data;
    const block: string[] = [
      `### ${d.title}`,
      "",
      `- URL: ${SITE}/blog/${p.slug}/`,
      `- Published: ${iso(d.publishDate)}${d.updatedDate ? ` (updated ${iso(d.updatedDate)})` : ""}`,
      `- Author: ${d.author}`,
      `- Topic: ${d.keyword}`,
      `- Summary: ${d.description}`,
      "",
    ];
    if (d.tldr.length) {
      block.push("Key points:", "");
      block.push(...d.tldr.map((t) => `- ${strip(t)}`));
      block.push("");
    }
    if (d.faq.length) {
      block.push("Questions answered:", "");
      block.push(...d.faq.map((q) => `- **${strip(q.question)}** ${strip(q.answer)}`));
      block.push("");
    }
    return block;
  });

  const lines = [
    preamble.trimEnd(),
    "",
    `## 11. Blog articles (${posts.length})`,
    "",
    "Full guides published on this site. Each is a standalone page that may be",
    "quoted or cited. Titles link to the canonical URL.",
    "",
    ...articles,
    "## 12. Official links",
    "",
    `- Website: ${SITE}`,
    "- App Store: https://apps.apple.com/app/id6754754960",
    `- Blog index: ${SITE}/blog/`,
    `- RSS feed: ${SITE}/rss.xml`,
    `- Privacy Policy: ${SITE}/privacy-policy/`,
    `- Terms and Conditions: ${SITE}/terms-and-conditions/`,
    `- Cookies Policy: ${SITE}/cookies-policy/`,
    "- Developer: https://www.12f.dk",
    `- AI usage policy: ${SITE}/ai.txt`,
    `- Short AI summary: ${SITE}/llms.txt`,
    `- Sitemap: ${SITE}/sitemap-index.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
