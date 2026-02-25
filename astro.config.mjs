import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

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
      customPages: [
        "https://home-stories.12f.dk/llms.txt",
        "https://home-stories.12f.dk/llms-full.txt",
      ],
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === "https://home-stories.12f.dk/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // Legal pages get lower priority
        if (item.url.includes("privacy-policy") || item.url.includes("terms-and-conditions") || item.url.includes("cookies-policy")) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        }
        // App redirect page
        if (item.url.includes("/app")) {
          item.priority = 0.5;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],
});
