import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const SITE = "https://home-stories.12f.dk";
const BLOG_DIR = "src/content/blog";

/**
 * lastmod per blog post, read from its own frontmatter (updatedDate if it has
 * one, else publishDate). Google distrusts a sitemap whose lastmod it can't
 * believe, so a date is only emitted when we actually know it — never guessed,
 * never in the future.
 */
function blogLastmod() {
  const dates = new Map();
  const today = new Date();

  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const stamp = (
      raw.match(/^updatedDate:\s*(\S+)/m)?.[1] ??
      raw.match(/^publishDate:\s*(\S+)/m)?.[1]
    )?.replace(/['"]/g, "");
    if (!stamp) continue;

    const date = new Date(stamp);
    if (Number.isNaN(date.valueOf()) || date > today) continue;
    dates.set(`${SITE}/blog/${file.replace(/\.md$/, "")}/`, date);
  }
  return dates;
}

// https://astro.build/config
export default defineConfig({
  site: "https://home-stories.12f.dk",
  base: "/",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    build: {
      // Improve code splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
            'swiper': ['swiper'],
          },
        },
      },
    },
  },
  image: {
    // Enable image optimization with sharp
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      // Emit xhtml:link hreflang alternates. Only the homepage exists in every
      // locale; blog and legal pages are English-only and stay self-referential.
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en", da: "da", de: "de", fr: "fr", es: "es", it: "it",
          nl: "nl", pt: "pt", sv: "sv", ja: "ja", zh: "zh-Hans", ko: "ko",
          pl: "pl", tr: "tr", ru: "ru", nb: "nb",
        },
      },
      // A sitemap is a list of pages we want indexed. /app is a redirect stub
      // (noindexed), and llms.txt / llms-full.txt are plain-text files for AI
      // crawlers — Google parks those at "crawled, currently not indexed"
      // forever. They stay in robots.txt; they just don't belong here.
      filter: (page) => !page.includes("/app/"),
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === `${SITE}/`) {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // Legal pages get lower priority
        if (item.url.includes("privacy-policy") || item.url.includes("terms-and-conditions") || item.url.includes("cookies-policy")) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        }

        const posts = blogLastmod();
        const lastmod = posts.get(item.url);
        if (lastmod) {
          item.lastmod = lastmod.toISOString();
        } else if (item.url === `${SITE}/blog/` && posts.size > 0) {
          // The index changes when its newest post does.
          item.lastmod = new Date(
            Math.max(...[...posts.values()].map((d) => d.valueOf()))
          ).toISOString();
        }
        return item;
      },
    }),
  ],
});
