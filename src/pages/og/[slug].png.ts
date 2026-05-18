import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";

const interBold = await readFile(
  path.join(process.cwd(), "src/assets/Inter-Bold.ttf"),
);
const interRegular = await readFile(
  path.join(process.cwd(), "src/assets/Inter-Regular.ttf"),
);

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export async function GET({ props }: APIContext) {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection>>[number] };

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #007AFF 0%, #0055AA 100%)",
          color: "white",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                opacity: 0.95,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "white",
                      color: "#007AFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "30px",
                      fontWeight: 700,
                    },
                    children: "H",
                  },
                },
                "Home Stories",
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: post.data.title.length > 60 ? "54px" : "64px",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: "-1.5px",
                      maxWidth: "1040px",
                    },
                    children: post.data.title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "26px",
                      fontWeight: 400,
                      opacity: 0.9,
                      letterSpacing: "-0.3px",
                    },
                    children: "home-stories.12f.dk/blog",
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
    .render()
    .asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
