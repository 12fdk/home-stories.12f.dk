// Unit tests for src/utils/calculators.mjs (the /tools/ calculators, #162).
// Node's built-in runner, no dependencies:  node --test tools/
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  budget,
  paint,
  tile,
  flooring,
  ceilCount,
  toMetric,
  fromMetric,
  round,
} from "../src/utils/calculators.mjs";

const close = (actual, expected, eps = 1e-6) =>
  assert.ok(Math.abs(actual - expected) < eps, `${actual} is not close to ${expected}`);

test("budget adds the contingency on the whole subtotal", () => {
  const r = budget({ lines: [30000, 15000, 5000, 6500], contingencyPct: 20 });
  assert.equal(r.subtotal, 56500);
  assert.equal(r.contingency, 11300);
  assert.equal(r.total, 67800);
});

test("budget with 0% contingency is the subtotal", () => {
  assert.deepEqual(budget({ lines: [100, 50], contingencyPct: 0 }), { subtotal: 150, contingency: 0, total: 150 });
});

test("budget rejects negative or missing numbers", () => {
  assert.equal(budget({ lines: [100, -1], contingencyPct: 15 }), null);
  assert.equal(budget({ lines: [100, NaN], contingencyPct: 15 }), null);
  assert.equal(budget({ lines: [100], contingencyPct: undefined }), null);
});

test("paint: walls minus openings, two coats", () => {
  // 4 × 3 room, 2.5 m high: 2 × 7 × 2.5 = 35 m², minus 3.5 m² = 31.5 m²
  const r = paint({ length: 4, width: 3, height: 2.5, openings: 3.5, includeCeiling: false, coats: 2, coverage: 9, tinSize: 2.5 });
  assert.equal(r.grossWalls, 35);
  assert.equal(r.walls, 31.5);
  assert.equal(r.ceiling, 0);
  close(r.litres, 7);
  assert.equal(r.tins, 3);
});

test("paint: the ceiling adds length × width", () => {
  const r = paint({ length: 4, width: 3, height: 2.5, openings: 0, includeCeiling: true, coats: 1, coverage: 10, tinSize: 5 });
  assert.equal(r.area, 47);
  close(r.litres, 4.7);
  assert.equal(r.tins, 1);
});

test("paint: openings larger than the walls do not go negative", () => {
  const r = paint({ length: 1, width: 1, height: 1, openings: 10, includeCeiling: false, coats: 2, coverage: 10, tinSize: 1 });
  assert.equal(r.walls, 0);
  assert.equal(r.tins, 0);
});

test("paint: zero coverage or tin size is invalid", () => {
  const base = { length: 4, width: 3, height: 2.5, openings: 0, includeCeiling: false, coats: 2, coverage: 9, tinSize: 2.5 };
  assert.equal(paint({ ...base, coverage: 0 }), null);
  assert.equal(paint({ ...base, tinSize: 0 }), null);
});

test("tile: 10% waste, rounded up to whole tiles and boxes", () => {
  // 2 × 1.5 = 3 m²; × 1.1 = 3.3 m²; 30 × 30 cm tile = 0.09 m² → 36.67 → 37 tiles
  const r = tile({ length: 2, width: 1.5, extraArea: 0, tileLength: 30, tileWidth: 30, wastePct: 10, tilesPerBox: 11 });
  close(r.area, 3);
  close(r.tileArea, 0.09);
  assert.equal(r.tiles, 37);
  assert.equal(r.boxes, 4);
  assert.equal(r.tilesBought, 44);
});

test("tile: an exact fit is not rounded up by float noise", () => {
  // 0.6 × 0.6 m with 20 × 20 cm tiles is exactly 9 tiles
  const r = tile({ length: 0.6, width: 0.6, extraArea: 0, tileLength: 20, tileWidth: 20, wastePct: 0, tilesPerBox: 9 });
  assert.equal(r.tiles, 9);
  assert.equal(r.boxes, 1);
});

test("flooring: packs from pack coverage", () => {
  // 5 × 4 + 1.5 = 21.5 m²; × 1.08 = 23.22 m²; 2.22 m² packs → 10.46 → 11 packs
  const r = flooring({ length: 5, width: 4, extraArea: 1.5, wastePct: 8, packCoverage: 2.22 });
  close(r.area, 21.5);
  close(r.areaWithWaste, 23.22);
  assert.equal(r.packs, 11);
  close(r.areaBought, 24.42);
  close(r.spare, 2.92);
});

test("flooring: zero pack coverage is invalid", () => {
  assert.equal(flooring({ length: 5, width: 4, extraArea: 0, wastePct: 8, packCoverage: 0 }), null);
});

test("ceilCount ignores float noise but rounds real fractions up", () => {
  assert.equal(ceilCount(10.0000000001), 10);
  assert.equal(ceilCount(10.01), 11);
  assert.equal(ceilCount(0), 0);
});

test("unit conversion round-trips", () => {
  close(toMetric(10, "length", "imperial"), 3.048);
  close(toMetric(100, "area", "imperial"), 9.290304);
  close(toMetric(1, "volume", "imperial"), 3.785411784);
  close(toMetric(12, "size", "imperial"), 30.48);
  // 350 sq ft per US gallon is about 8.6 m² per litre
  close(toMetric(350, "coverage", "imperial"), 8.59, 0.01);
  close(fromMetric(toMetric(123.4, "coverage", "imperial"), "coverage", "imperial"), 123.4);
  assert.equal(toMetric(5, "length", "metric"), 5);
  assert.equal(toMetric(5, "count", "imperial"), 5);
});

test("round removes float noise", () => {
  assert.equal(round(0.1 + 0.2, 2), 0.3);
  assert.equal(round(1.005, 2), 1.01);
});
