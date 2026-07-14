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
  }),
});

export const collections = { blog };
