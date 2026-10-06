import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    lede: z.string(),
    keyword: z.string(),
    // Card image for the blog overview. alt describes the photograph itself —
    // it is content, not decoration, so it gets read out.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Robert Jensen"),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    tldr: z.array(z.string()).default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
    relatedSlugs: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Mid-article App Store card (src/plugins/rehype-inline-cta.mjs). All
    // optional: by default the plugin places it from the post's structure,
    // inside the two-mention body budget. `inlineCta: false` turns it off,
    // `inlineCtaAfter` names the H2 to put it after, `inlineCtaText` replaces
    // the topic sentence on an inserted card.
    inlineCta: z.boolean().optional(),
    inlineCtaAfter: z.string().optional(),
    inlineCtaText: z.string().max(240).optional(),
  }),
});

export const collections = { blog };
