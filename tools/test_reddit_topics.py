"""Unit tests for tools/reddit-topics.py. Stdlib only, no network.

    python3 -m unittest discover -s tools -p 'test_*.py'
"""

from __future__ import annotations

import importlib.util
import io
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
from unittest import mock

_SPEC = importlib.util.spec_from_file_location(
    "reddit_topics", Path(__file__).resolve().parent / "reddit-topics.py")
rt = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(rt)

FEED = """<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry><title>Do I need a permit to move a bathroom wall?</title></entry>
  <entry><title>  Found this   behind my drywall, what is it? </title></entry>
</feed>"""


class ThemeMatching(unittest.TestCase):
    def test_permit_question_lands_in_permits(self):
        self.assertIn("permits", rt.themes_of("Do I need a permit to replace my deck?"))

    def test_short_keywords_need_word_boundaries(self):
        # "gc" must not fire inside a longer word, "tub" not inside "tube".
        self.assertNotIn("contractors", rt.themes_of("Magcraft hinges keep failing"))
        self.assertNotIn("bathroom", rt.themes_of("Which tube of caulk is best for windows?"))

    def test_plural_of_short_keyword_matches(self):
        self.assertIn("quotes-payments", rt.themes_of("Got three quotes, which one would you pick?"))

    def test_smart_quotes_are_normalised(self):
        self.assertIn("living-through", rt.themes_of("Living in the house during the renovation — tips?"))

    def test_title_can_land_in_several_themes(self):
        keys = rt.themes_of("How much did your kitchen remodel cost with a contractor?")
        for key in ("budget-costs", "kitchen", "contractors"):
            self.assertIn(key, keys)

    def test_unrelated_title_has_no_theme(self):
        self.assertEqual(rt.themes_of("What is your favourite sandwich?"), [])


class Usefulness(unittest.TestCase):
    def test_real_question_is_useful(self):
        self.assertTrue(rt.is_useful("Is it normal for a contractor to ask for 50% upfront?"))

    def test_found_this_question_survives(self):
        # Home subs ask "found this behind my wall" in earnest; the bike sub's
        # NOISE list dropped those, this one must not.
        self.assertTrue(rt.is_useful("Found this behind my drywall, what is it?"))

    def test_brag_and_venting_are_noise(self):
        self.assertFalse(rt.is_useful("Before and after of our kitchen, what do you think?"))
        self.assertFalse(rt.is_useful("Is it just me or are contractors impossible to book?"))
        self.assertFalse(rt.is_useful("Contractors never call back, right?"))

    def test_rant_does_not_kill_words_containing_it(self):
        self.assertTrue(rt.is_useful("How do I fix the warranty claim on my new windows?"))

    def test_short_and_all_caps_titles_are_dropped(self):
        self.assertFalse(rt.is_useful("Help?"))
        self.assertFalse(rt.is_useful("WHY IS MY CONTRACTOR NOT ANSWERING ME AT ALL"))


class CoveredDetection(unittest.TestCase):
    def write(self, folder: Path, slug: str, title: str, keyword: str, body: str = "") -> None:
        (folder / f"{slug}.md").write_text(
            f'---\ntitle: "{title}"\nkeyword: "{keyword}"\ndescription: "permit roof"\n---\n{body}\n',
            encoding="utf-8")

    def test_title_keyword_and_slug_mark_a_theme_covered(self):
        with tempfile.TemporaryDirectory() as tmp:
            d = Path(tmp)
            self.write(d, "do-i-need-a-permit", "Do I Need a Permit?", "do i need a permit")
            covered = rt.covered_themes(d)
        self.assertEqual(covered.get("permits"), ["do-i-need-a-permit"])

    def test_description_and_body_do_not_count(self):
        with tempfile.TemporaryDirectory() as tmp:
            d = Path(tmp)
            self.write(d, "paint-colours", "Choosing Paint Colours", "paint colours",
                       body="You may need a permit for the roof.")
            covered = rt.covered_themes(d)
        self.assertNotIn("permits", covered)
        self.assertNotIn("exterior", covered)
        self.assertIn("walls-paint", covered)

    def test_missing_posts_dir_is_empty(self):
        self.assertEqual(rt.covered_themes(Path("/nonexistent/blog")), {})

    def test_real_blog_marks_known_posts(self):
        covered = rt.covered_themes()
        self.assertIn("documenting-renovation-for-insurance", covered.get("insurance", []))
        self.assertNotIn("permits", covered)  # bank topic 10 is still unwritten


class FeedParsing(unittest.TestCase):
    def test_titles_from_atom(self):
        self.assertEqual(rt.titles_from(FEED), [
            "Do I need a permit to move a bathroom wall?",
            "Found this behind my drywall, what is it?",
        ])

    def test_titles_from_garbage_is_empty(self):
        self.assertEqual(rt.titles_from("<html>blocked</html"), [])


class MainExitCodes(unittest.TestCase):
    def run_main(self, fetch_result):
        out, err = io.StringIO(), io.StringIO()
        with mock.patch.object(rt, "fetch", return_value=fetch_result), \
             mock.patch("sys.argv", ["reddit-topics.py", "--subs", "a,b", "--quiet"]), \
             redirect_stdout(out), redirect_stderr(err):
            code = rt.main()
        return code, out.getvalue(), err.getvalue()

    def test_every_feed_failing_exits_2_with_a_message(self):
        code, out, err = self.run_main((None, False))
        self.assertEqual(code, 2)
        self.assertIn("every feed failed", err)
        self.assertIn("topic bank", err)

    def test_digest_ranks_themes_and_exits_0(self):
        code, out, _ = self.run_main((FEED, True))
        self.assertEqual(code, 0)
        self.assertIn("REDDIT DEMAND", out)
        self.assertIn("[permits]", out)
        self.assertIn("ALREADY COVERED", out)


if __name__ == "__main__":
    unittest.main()
