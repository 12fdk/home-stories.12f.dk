import { appStoreUrl, blogCampaign } from "../utils/appStoreLink.mjs";
import {
  APP_STORE_URL,
  INLINE_SURFACE,
  TOPICS,
  planInlineCta,
  topicFor,
} from "../utils/blogCta.mjs";
import {
  APP_ICON,
  APP_NAME,
  APP_TAGLINE,
  INTRO_SURFACE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TRUST_LINE,
  priceLine,
  screenFor,
} from "../utils/appCard.mjs";
import { fetchStorefrontPricing } from "../utils/storefrontPricing.mjs";

/**
 * Mid-article App Store CTA for blog posts.
 *
 * Posts are plain Markdown written by a cron, so a component cannot be
 * dropped into them by hand. This plugin finds the right spot from the post's
 * own structure (see planInlineCta in src/utils/blogCta.mjs for the rule and
 * the mention budget) and renders a quiet card there:
 *
 *   small label · one sentence · "Free on the App Store" button · fine print
 *
 * Every App Store link in the card carries `appstore-click` with
 * surface=blog-inline and the post slug, so Umami attributes it on its own row.
 *
 * On a phone the post also gets the app card (icon, a real screen, price, one
 * button) right after its intro, before the first H2 — surface
 * blog-intro-card. A phone reader rarely reaches the end card, so this is the
 * one early ask. An *inserted* mid-article card is then hidden on phones, so a
 * phone reader sees two cards (intro + end), not three. An *upgraded* one stays:
 * it is the post's own paragraph. #150
 */

const text = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(text).join("");

const hasAppLink = (node) =>
  node.type === "element" &&
  ((node.tagName === "a" && String(node.properties?.href ?? "").startsWith(APP_STORE_URL)) ||
    (node.children ?? []).some(hasAppLink));

// A paragraph ending in a colon introduces a list; turning it into a card
// would orphan the list, so it is skipped (mirrors sectionsFromMarkdown).
const isMention = (node) =>
  node.type === "element" &&
  node.tagName === "p" &&
  !/:\s*$/.test(text(node)) &&
  (/Home Stories/.test(text(node)) || hasAppLink(node));

const words = (node) => text(node).split(/\s+/).filter(Boolean).length;

function track(slug, surface = INLINE_SURFACE) {
  return {
    dataUmamiEvent: "appstore-click",
    dataUmamiEventSurface: surface,
    ...(slug ? { dataUmamiEventSlug: slug } : {}),
  };
}

/** Stamp the tracking attributes onto App Store links inside a paragraph. */
function stampLinks(node, slug) {
  if (node.type !== "element") return;
  if (node.tagName === "a" && String(node.properties?.href ?? "").startsWith(APP_STORE_URL)) {
    Object.assign(node.properties, track(slug));
  }
  (node.children ?? []).forEach((c) => stampLinks(c, slug));
}

const el = (tagName, properties, children = []) => ({ type: "element", tagName, properties, children });
const t = (value) => ({ type: "text", value });

function card({ label, paragraph, slug, phone = true }) {
  return el(
    "aside",
    {
      className: [
        "blog-inline-cta",
        ...(phone ? [] : ["hidden", "md:block"]),
        "my-10",
        "bg-base-200",
        "px-6",
        "py-6",
        "sm:px-8",
      ],
      dataCtaId: slug ? `blog-inline-${slug}` : "blog-inline",
      ariaLabel: "About the Home Stories app",
    },
    [
      el("p", { className: ["not-prose", "mb-2", "font-semibold", "text-base-content"] }, [t(label)]),
      { ...paragraph, properties: { ...(paragraph.properties ?? {}), className: ["!my-0", "text-base"] } },
      el("div", { className: ["not-prose", "mt-4", "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-2"] }, [
        el(
          "a",
          {
            href: appStoreUrl(blogCampaign(slug)),
            target: "_blank",
            rel: "noopener",
            className: ["hs-btn", "!no-underline"],
            ...track(slug),
          },
          [t("Free on the App Store")],
        ),
        el("span", { className: ["hs-soft"] }, [t("iPhone · works offline · no account")]),
      ]),
    ],
  );
}

/**
 * The phone-only app card after the intro. Same content and classes as
 * components/blog/AppCard.astro (the end card), minus the topic sentence.
 */
function introCard({ slug, topic, proPrice }) {
  const screen = screenFor(topic);
  return el(
    "aside",
    {
      className: ["hs-appcard", "hs-appcard--phone", "hs-ply", "not-prose", "my-10"],
      dataCtaId: `blog-intro-card-${slug}`,
      ariaLabel: "Get the Home Stories app",
    },
    [
      el("div", { className: ["hs-appcard__head"] }, [
        el("div", { className: ["hs-appcard__id"] }, [
          el("img", {
            src: APP_ICON,
            alt: "",
            width: 52,
            height: 52,
            loading: "lazy",
            decoding: "async",
            className: ["hs-appcard__icon"],
          }),
          el("div", { className: ["min-w-0"] }, [
            el("p", { className: ["m-0", "font-semibold", "leading-tight"] }, [t(APP_NAME)]),
            el("p", { className: ["hs-soft", "hs-small", "m-0"] }, [t(APP_TAGLINE)]),
          ]),
        ]),
        el("ul", { className: ["hs-appcard__facts"] }, [
          el("li", {}, [t(priceLine(proPrice))]),
          el("li", {}, [t(TRUST_LINE)]),
        ]),
      ]),
      el("div", { className: ["hs-appcard__shot"] }, [
        el("img", {
          src: screen.src,
          alt: screen.alt,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          loading: "lazy",
          decoding: "async",
        }),
      ]),
      el("div", { className: ["hs-appcard__body"] }, [
        el(
          "a",
          {
            href: appStoreUrl(blogCampaign(slug)),
            target: "_blank",
            rel: "noopener",
            className: ["hs-btn", "hs-appcard__btn", "!no-underline"],
            ...track(slug, INTRO_SURFACE),
          },
          [t("Get it free on the App Store")],
        ),
      ]),
    ],
  );
}

/** Put the phone app card at the end of the intro: right before the first H2. */
function insertIntroCard(tree, card) {
  const firstH2 = tree.children.findIndex((n) => n.type === "element" && n.tagName === "h2");
  if (firstH2 === -1) return; // no structure to anchor on; the end card still shows
  tree.children.splice(firstH2, 0, card);
}

export function rehypeInlineCta() {
  return async (tree, file) => {
    const fm = file.data?.astro?.frontmatter;
    // Only blog posts: they are the only content with this frontmatter shape.
    if (!fm || !fm.keyword || !String(file.path ?? file.history?.[0] ?? "").includes("content/blog")) return;
    const slug = String(file.path ?? file.history?.[0] ?? "").split("/").pop().replace(/\.mdx?$/, "");

    // Group root children into H2 sections, as planInlineCta expects.
    const sections = [{ heading: "", words: 0, mentions: 0, start: 0, nodes: [] }];
    tree.children.forEach((node, idx) => {
      if (node.type === "element" && node.tagName === "h2") {
        sections.push({ heading: text(node).trim(), words: 0, mentions: 0, start: idx, nodes: [] });
        return;
      }
      const s = sections[sections.length - 1];
      s.nodes.push(idx);
      if (node.type === "element") {
        s.words += words(node);
        if (isMention(node)) s.mentions++;
      }
    });
    const proseMentions = (text(tree).match(/Home Stories/g) || []).length;
    const plan = planInlineCta({ sections, proseMentions, frontmatter: fm });
    const topicKey = topicFor({ slug, keyword: fm.keyword, tags: fm.tags });
    const topic = TOPICS[topicKey];
    const section = sections[plan.section];

    if (plan.mode === "upgrade") {
      const idx = section.nodes.find((i) => isMention(tree.children[i]));
      const paragraph = tree.children[idx];
      stampLinks(paragraph, slug);
      tree.children[idx] = card({ label: topic.label, paragraph, slug });
    } else if (plan.mode === "insert") {
      // insert: after the last node of the chosen section, i.e. before the next H2.
      const after = section.nodes.length ? section.nodes[section.nodes.length - 1] : section.start;
      const sentence = fm.inlineCtaText || topic.inline;
      tree.children.splice(
        after + 1,
        0,
        card({ label: topic.label, paragraph: el("p", {}, [t(sentence)]), slug, phone: false }),
      );
    }

    // Last, so the section indices above are still valid. The live US price,
    // as on the end card; the fallback only when the storefront can't be read.
    const pricing = await fetchStorefrontPricing("us");
    insertIntroCard(tree, introCard({ slug, topic: topicKey, proPrice: pricing?.proPrice }));
  };
}

export default rehypeInlineCta;
