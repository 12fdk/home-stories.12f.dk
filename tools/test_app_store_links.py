"""Guards the App Store campaign link format and the Smart App Banner (home-stories#494).

Apple attributes a web download to a campaign only when the link carries both
`ct` and the provider token `pt`; `ct` alone counts for nothing.

Run: python3 -m unittest discover -s tools -p 'test_*.py'
"""
import glob
import os
import re
import unittest

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PROVIDER_TOKEN = "127521693"
# `<` and `>` stay in: the brief writes the placeholder `ct=blog-<slug>`.
LINK = re.compile(r"https://apps\.apple\.com/app/id6754754960\?[^\s)\"'`]+")

# Hand-written links: blog posts, the llms.txt preambles and the blog brief.
LINK_SOURCES = ["src/content/blog/*.md", "src/data/*.md", "prompt.md"]
LAYOUTS = ["src/Layout.astro", "src/layouts/BlogLayout.astro"]


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def files(patterns):
    for pattern in patterns:
        for path in sorted(glob.glob(os.path.join(ROOT, pattern))):
            yield os.path.relpath(path, ROOT)


def helper():
    return read("src/utils/appStoreLink.mjs")


def helper_const(name):
    return re.search(rf'export const {name} = "([^"]+)"', helper()).group(1)


class AppStoreLinkTests(unittest.TestCase):
    def test_generated_links_carry_campaign_and_provider_token(self):
        template = re.search(r"return `(\$\{APP_STORE_URL\}[^`]+)`", helper()).group(1)
        self.assertIn("ct=${ct}", template)
        self.assertIn("pt=${PROVIDER_TOKEN}", template)
        self.assertEqual(helper_const("PROVIDER_TOKEN"), PROVIDER_TOKEN)

    def test_hand_written_links_carry_campaign_and_provider_token(self):
        seen = 0
        for rel in files(LINK_SOURCES):
            for link in LINK.findall(read(rel)):
                seen += 1
                with self.subTest(file=rel, link=link):
                    self.assertRegex(link, r"[?&]ct=[^&]+")
                    self.assertIn(f"pt={PROVIDER_TOKEN}", link)
        self.assertGreater(seen, 0)

    def test_campaign_tokens_fit_apples_limit(self):
        for rel in files(LINK_SOURCES):
            for ct in re.findall(r"id6754754960\?ct=([^&\s)\"'`]+)", read(rel)):
                with self.subTest(file=rel, ct=ct):
                    self.assertLessEqual(len(ct), 40)

    def test_smart_app_banner_carries_campaign_and_provider_token(self):
        content = re.search(r"SMART_BANNER_CONTENT = `([^`]+)`", helper()).group(1)
        self.assertIn("app-id=${APP_STORE_ID}", content)
        self.assertIn("affiliate-data=ct=${BANNER_CAMPAIGN}&pt=${PROVIDER_TOKEN}", content)
        for rel in LAYOUTS:
            with self.subTest(file=rel):
                self.assertIn('<meta name="apple-itunes-app" content={SMART_BANNER_CONTENT} />', read(rel))

    def test_layouts_offer_the_umami_opt_out(self):
        for rel in LAYOUTS:
            with self.subTest(file=rel):
                self.assertIn('localStorage.setItem("umami.disabled", "1")', read(rel))


if __name__ == "__main__":
    unittest.main()
