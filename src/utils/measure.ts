/**
 * The width of a line in "average Latin letters", for sizing display type to
 * the longest line it must hold (the --chars custom property in styles.scss).
 * CJK and Hangul glyphs are set on a full em, so each counts as nearly two.
 */
const WIDE = /[ᄀ-ᇿ⺀-鿿가-힯豈-﫿＀-￯]/;

export function measure(text: string): number {
  let width = 0;
  for (const ch of text) width += WIDE.test(ch) ? 1.72 : 1;
  return width;
}

/** The widest of several lines, never below a floor so short words stay sane. */
export function longest(lines: string[], floor = 6): number {
  return Math.max(floor, ...lines.map(measure));
}

/**
 * A sentence as two balanced lines, broken at the space nearest its middle.
 * Text with no spaces (Japanese, Chinese) comes back as one line.
 */
export function twoLines(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 2) return [text];
  let best: string[] = [text];
  let bestWidth = Infinity;
  for (let k = 1; k < words.length; k++) {
    const a = words.slice(0, k).join(" ");
    const b = words.slice(k).join(" ");
    const w = Math.max(measure(a), measure(b));
    if (w < bestWidth) {
      bestWidth = w;
      best = [a, b];
    }
  }
  return best;
}
