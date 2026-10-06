import {
  APP_STORE_URL,
  INLINE_SURFACE,
  TOPICS,
  planInlineCta,
  topicFor,
} from "../utils/blogCta.mjs";

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

function track(slug) {
  return {
    dataUmamiEvent: "appstore-click",
    dataUmamiEventSurface: INLINE_SURFACE,
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

function card({ label, paragraph, slug }) {
  return el(
    "aside",
    {
      className: ["blog-inline-cta", "my-10", "rounded-2xl", "border", "border-base-300", "bg-base-200/60", "px-5", "py-5", "sm:px-6"],
      dataCtaId: slug ? `blog-inline-${slug}` : "blog-inline",
      ariaLabel: "About the Home Stories app",
    },
    [
      el("p", { className: ["not-prose", "mb-2", "font-mono", "text-xs", "uppercase", "tracking-label", "text-base-content/60"] }, [t(label)]),
      { ...paragraph, properties: { ...(paragraph.properties ?? {}), className: ["!my-0", "text-base"] } },
      el("div", { className: ["not-prose", "mt-4", "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-2"] }, [
        el(
          "a",
          {
            href: APP_STORE_URL,
            target: "_blank",
            rel: "noopener",
            className: ["btn", "btn-primary", "btn-sm", "normal-case"],
            ...track(slug),
          },
          [t("Free on the App Store")],
        ),
        el("span", { className: ["text-xs", "text-base-content/60"] }, [t("iPhone · works offline · no account")]),
      ]),
    ],
  );
}

export function rehypeInlineCta() {
  return (tree, file) => {
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
    if (plan.mode === "none") return;

    const topic = TOPICS[topicFor({ slug, keyword: fm.keyword, tags: fm.tags })];
    const section = sections[plan.section];

    if (plan.mode === "upgrade") {
      const idx = section.nodes.find((i) => isMention(tree.children[i]));
      const paragraph = tree.children[idx];
      stampLinks(paragraph, slug);
      tree.children[idx] = card({ label: topic.label, paragraph, slug });
      return;
    }

    // insert: after the last node of the chosen section, i.e. before the next H2.
    const after = section.nodes.length ? section.nodes[section.nodes.length - 1] : section.start;
    const sentence = fm.inlineCtaText || topic.inline;
    tree.children.splice(after + 1, 0, card({ label: topic.label, paragraph: el("p", {}, [t(sentence)]), slug }));
  };
}

export default rehypeInlineCta;
