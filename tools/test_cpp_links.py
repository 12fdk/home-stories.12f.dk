"""Guards the custom product page (`ppid`) support in the App Store link helper (#165).

A use case with `cppId` links to that custom product page; without it, the link
is the default product page, unchanged. The campaign tokens stay on both.

Run: python3 -m unittest discover -s tools -p 'test_*.py'
"""
import glob
import json
import os
import re
import shutil
import subprocess
import unittest

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
HELPER = os.path.join(ROOT, "src/utils/appStoreLink.mjs")
CPP_ID = "495b34be-cd67-4cd7-9407-47217add22eb"
DEFAULT = "https://apps.apple.com/app/id6754754960?ct=uc-kitchen-renovation&pt=127521693&mt=8"


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def node_eval(expr):
    """Evaluates `expr` with the helper imported as `h`; returns JSON {ok, value|error}."""
    script = (
        f"const h = await import({json.dumps('file://' + os.path.abspath(HELPER))});"
        f"try {{ console.log(JSON.stringify({{ ok: true, value: {expr} }})); }}"
        "catch (e) { console.log(JSON.stringify({ ok: false, error: String(e.message) })); }"
    )
    out = subprocess.run(
        ["node", "--input-type=module", "-e", script], capture_output=True, text=True, check=True
    )
    return json.loads(out.stdout)


@unittest.skipUnless(shutil.which("node"), "node is not installed")
class AppStoreUrlPpidTests(unittest.TestCase):
    def test_without_cpp_id_the_link_is_unchanged(self):
        for arg in ["", ", undefined", ", null", ', ""']:
            with self.subTest(arg=arg):
                result = node_eval(f'h.appStoreUrl(h.useCaseCampaign("kitchen-renovation"){arg})')
                self.assertEqual(result, {"ok": True, "value": DEFAULT})

    def test_cpp_id_is_appended_as_ppid_after_the_campaign_tokens(self):
        result = node_eval(f'h.appStoreUrl("uc-kitchen-renovation", "{CPP_ID}")')
        self.assertEqual(result["value"], f"{DEFAULT}&ppid={CPP_ID}")

    def test_cpp_id_is_lowercased(self):
        result = node_eval(f'h.appStoreUrl("uc-x", "{CPP_ID.upper()}")')
        self.assertTrue(result["value"].endswith(f"&ppid={CPP_ID}"))

    def test_malformed_cpp_id_throws(self):
        for bad in ["kitchen-en-us", CPP_ID + "&ct=x", CPP_ID[:-1], " " + CPP_ID]:
            with self.subTest(bad=bad):
                result = node_eval(f"h.appStoreUrl('uc-x', {json.dumps(bad)})")
                self.assertFalse(result["ok"])
                self.assertIn("custom product page id", result["error"])


class UseCaseCppWiringTests(unittest.TestCase):
    def test_use_case_page_passes_cpp_id_to_the_helper(self):
        page = read("src/pages/use-cases/[slug].astro")
        self.assertIn("appStoreUrl(useCaseCampaign(useCase.slug), useCase.cppId)", page)

    def test_use_case_interface_has_optional_cpp_id(self):
        self.assertRegex(read("src/data/useCases.ts"), r"\n  cppId\?: string;\n")

    def test_every_set_cpp_id_is_a_uuid(self):
        sources = ["src/data/useCases.ts"] + [
            os.path.relpath(p, ROOT) for p in sorted(glob.glob(os.path.join(ROOT, "src/data/useCases/*.ts")))
        ]
        uuid = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
        for rel in sources:
            for value in re.findall(r"""\bcppId:\s*["'`]([^"'`]*)["'`]""", read(rel)):
                with self.subTest(file=rel, cppId=value):
                    self.assertRegex(value, uuid)


if __name__ == "__main__":
    unittest.main()
