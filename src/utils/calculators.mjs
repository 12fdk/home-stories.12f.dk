/**
 * The maths behind the /tools/ calculators. Plain ES module, no DOM and no
 * Astro, so the pages, the browser script and tools/calculators.test.mjs all
 * import the same functions. #162
 *
 * Every function works in metric (m, m², litres, m² per litre). The page
 * converts imperial input to metric first and the result back, with the
 * factors in UNITS below. Money is a plain number in whatever currency the
 * visitor thinks in: nothing here knows about currencies.
 *
 * Invalid input (empty, negative, not a number) makes a function return null,
 * and the page shows a dash instead of a misleading number.
 */

/** Counts are rounded up, but 10.000000001 boxes is still 10 boxes. */
const EPS = 1e-9;
export const ceilCount = (x) => Math.ceil(x - EPS) || 0; // `|| 0` turns -0 into 0

const ok = (...values) => values.every((v) => typeof v === "number" && Number.isFinite(v) && v >= 0);

/**
 * Conversion to metric for each kind of quantity. `toMetric` multiplies an
 * imperial value into its metric twin; `digits` is how precisely a converted
 * value is shown in each system.
 */
export const UNITS = {
  length: { metric: "m", imperial: "ft", toMetric: 0.3048, digits: { metric: 2, imperial: 2 } },
  size: { metric: "cm", imperial: "in", toMetric: 2.54, digits: { metric: 1, imperial: 2 } },
  area: { metric: "m²", imperial: "sq ft", toMetric: 0.09290304, digits: { metric: 2, imperial: 1 } },
  volume: { metric: "L", imperial: "US gal", toMetric: 3.785411784, digits: { metric: 2, imperial: 2 } },
  // m² per litre from sq ft per US gallon: 0.09290304 / 3.785411784
  coverage: { metric: "m²/L", imperial: "sq ft/gal", toMetric: 0.09290304 / 3.785411784, digits: { metric: 1, imperial: 0 } },
};

export function toMetric(value, dim, system) {
  const unit = UNITS[dim];
  if (!unit || system === "metric") return value;
  return value * unit.toMetric;
}

export function fromMetric(value, dim, system) {
  const unit = UNITS[dim];
  if (!unit || system === "metric") return value;
  return value / unit.toMetric;
}

/** Round to `digits` places without float noise (0.1 + 0.2 → 0.3). */
export function round(value, digits = 2) {
  const f = 10 ** digits;
  return Math.round((value + Number.EPSILON) * f) / f;
}

/**
 * Renovation budget with a contingency on top.
 * The contingency is a percentage of the whole pre-contingency subtotal, not
 * of the build alone (see /blog/renovation-contingency-budget/).
 */
export function budget({ lines, contingencyPct }) {
  if (!Array.isArray(lines) || !ok(...lines, contingencyPct)) return null;
  const subtotal = lines.reduce((sum, v) => sum + v, 0);
  const contingency = subtotal * (contingencyPct / 100);
  return { subtotal, contingency, total: subtotal + contingency };
}

/** Starting contingency by the state of the house, as the contingency post sets it out. */
export const CONTINGENCY_PRESETS = [
  { pct: 15, label: "Newer home, surfaces only" },
  { pct: 20, label: "Older home, or opening walls and floors" },
  { pct: 25, label: "Pre-war, or known structural unknowns" },
];

/**
 * Paint for one rectangular room.
 * Wall area = 2 × (length + width) × height − doors and windows.
 * Litres = paint area × coats ÷ coverage per litre.
 */
export function paint({ length, width, height, openings, includeCeiling, coats, coverage, tinSize }) {
  if (!ok(length, width, height, openings, coats, coverage, tinSize)) return null;
  if (coverage === 0 || tinSize === 0) return null;
  const grossWalls = 2 * (length + width) * height;
  const walls = Math.max(0, grossWalls - openings);
  const ceiling = includeCeiling ? length * width : 0;
  const area = walls + ceiling;
  const litres = (area * coats) / coverage;
  return { grossWalls, walls, ceiling, area, litres, tins: ceilCount(litres / tinSize) };
}

/**
 * Tiles for a floor or wall.
 * Tiles = (area × (1 + waste %)) ÷ area of one tile, rounded up.
 * Tile sizes are in cm (metric) and grout joints are ignored, which slightly
 * over-counts: the safe side.
 */
export function tile({ length, width, extraArea, tileLength, tileWidth, wastePct, tilesPerBox }) {
  if (!ok(length, width, extraArea, tileLength, tileWidth, wastePct, tilesPerBox)) return null;
  const tileArea = (tileLength / 100) * (tileWidth / 100);
  if (tileArea === 0 || tilesPerBox === 0) return null;
  const area = length * width + extraArea;
  const areaWithWaste = area * (1 + wastePct / 100);
  const tiles = ceilCount(areaWithWaste / tileArea);
  const boxes = ceilCount(tiles / tilesPerBox);
  return {
    area,
    tileArea,
    areaWithWaste,
    tiles,
    boxes,
    tilesBought: boxes * tilesPerBox,
    areaBought: boxes * tilesPerBox * tileArea,
  };
}

/**
 * Flooring sold in packs that state their coverage (laminate, vinyl plank,
 * engineered wood).
 * Packs = (area × (1 + waste %)) ÷ coverage per pack, rounded up.
 */
export function flooring({ length, width, extraArea, wastePct, packCoverage }) {
  if (!ok(length, width, extraArea, wastePct, packCoverage) || packCoverage === 0) return null;
  const area = length * width + extraArea;
  const areaWithWaste = area * (1 + wastePct / 100);
  const packs = ceilCount(areaWithWaste / packCoverage);
  const areaBought = packs * packCoverage;
  return { area, areaWithWaste, packs, areaBought, spare: areaBought - area };
}

export const CALCULATORS = { budget, paint, tile, flooring };
