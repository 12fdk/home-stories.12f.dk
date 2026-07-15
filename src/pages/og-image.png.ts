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

// Static 1200x630 Open Graph image for the homepage / social shares.
export async function GET(_context: APIContext) {
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
                      fontSize: "72px",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-2px",
                      maxWidth: "1040px",
                    },
                    children: "Your home renovation, measured.",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "30px",
                      fontWeight: 400,
                      opacity: 0.9,
                      letterSpacing: "-0.3px",
                    },
                    children: "Free renovation tracker for iPhone · home-stories.12f.dk",
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
