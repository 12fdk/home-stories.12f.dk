/**
 * The free calculators under /tools/<slug>/ (#162). The maths lives in
 * src/utils/calculators.mjs (tested in tools/calculators.test.mjs); this file
 * holds the words and the form fields.
 *
 * Rules, as for the use-case pages: each page has its own intro, formula,
 * assumptions and FAQ. No figure is stated as a fact unless a source is listed
 * under `sources`; typical values are shown as editable starting points.
 * Post and use-case slugs must exist — the page throws at build time if one is
 * missing or not yet published.
 *
 * Field values are in the unit system named: `metric` for m / cm / m² / L,
 * `imperial` for ft / in / sq ft / US gal. Fields without a `dim` (money,
 * percentages, counts) are the same in both.
 */
export type Dim = "length" | "size" | "area" | "volume" | "coverage";

export interface ToolField {
  name: string;
  label: string;
  /** Unit kind; omit for money, percent and counts. */
  dim?: Dim;
  /** Shown after the input when there is no dim, e.g. "%" or "coats". */
  suffix?: string;
  metric: number;
  /** Starting value in imperial; defaults to the converted metric value. */
  imperial?: number;
  step?: string;
  hint?: string;
  checkbox?: boolean;
  /** Quick-pick values shown as buttons under the field. */
  presets?: { value: number; label: string }[];
}

export interface ToolOutput {
  name: string;
  label: string;
  dim?: Dim;
  /** Whole numbers (tiles, boxes, packs, tins). */
  count?: boolean;
  /** The headline result. */
  main?: boolean;
}

export interface Tool {
  slug: "budget-contingency-calculator" | "paint-calculator" | "tile-calculator" | "flooring-calculator";
  /** Key into CALCULATORS in src/utils/calculators.mjs. */
  calc: "budget" | "paint" | "tile" | "flooring";
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One line for the hub and the footer of sibling pages. */
  summary: string;
  /** Hero photo, from /public/stock. */
  image: string;
  imageAlt: string;
  intro: string[];
  fieldsets: { legend: string; fields: ToolField[] }[];
  outputs: ToolOutput[];
  /** The formula, one step per line. */
  formula: string[];
  assumptions: { title: string; body: string }[];
  sources?: { label: string; url: string }[];
  faq: { q: string; a: string }[];
  posts: string[];
  useCases: string[];
  /** Short line above the app link. Only what the app does today. */
  appNote: string;
}

export const tools: Tool[] = [
  {
    slug: "budget-contingency-calculator",
    calc: "budget",
    label: "Budget and contingency calculator",
    h1: "Renovation budget and contingency calculator",
    metaTitle: "Renovation Contingency Calculator: Budget + Buffer",
    metaDescription:
      "Add up a renovation budget and put a contingency on top. Pick 15, 20 or 25% by the state of the house, or type your own. Any currency, no signup.",
    summary: "Add up the lines of a renovation budget and size the contingency on top of them.",
    image: "/stock/tool-budget.webp",
    imageAlt: "A kitchen under renovation with unfinished wooden cabinets, a tape measure and a clipboard of blank paper on the counter",
    intro: [
      "Add every cost you know about, then put the contingency on top of that subtotal: total = subtotal × (1 + contingency %). With a subtotal of 56,500 and a 20% contingency, the buffer is 11,300 and the total budget is 67,800.",
      "The percentage depends on the house, not on a fixed rule. A newer home where only surfaces change carries less risk than an older one where walls and floors come up. The buttons give three starting points; the number is yours to change.",
    ],
    fieldsets: [
      {
        legend: "What you already know it will cost",
        fields: [
          { name: "materials", label: "Materials and fixtures", metric: 30000, step: "any", hint: "Cabinets, tiles, sanitaryware, flooring, paint." },
          { name: "labour", label: "Labour", metric: 15000, step: "any", hint: "The contractor and each trade's quote." },
          { name: "fees", label: "Permits, design and fees", metric: 5000, step: "any", hint: "Architect, engineer, permit and inspection fees." },
          { name: "other", label: "Everything else", metric: 6500, step: "any", hint: "Skip hire, disposal, storage, a rental while the kitchen is out." },
        ],
      },
      {
        legend: "Contingency",
        fields: [
          {
            name: "contingencyPct",
            label: "Contingency",
            suffix: "%",
            metric: 20,
            step: "any",
            hint: "A percentage of the whole subtotal above.",
            presets: [
              { value: 15, label: "15%: newer home, surfaces only" },
              { value: 20, label: "20%: older home, or opening walls" },
              { value: 25, label: "25%: pre-war, or structural unknowns" },
            ],
          },
        ],
      },
    ],
    outputs: [
      { name: "subtotal", label: "Subtotal before contingency" },
      { name: "contingency", label: "Contingency" },
      { name: "total", label: "Total budget", main: true },
    ],
    formula: [
      "subtotal = materials + labour + fees + everything else",
      "contingency = subtotal × contingency % ÷ 100",
      "total budget = subtotal + contingency",
    ],
    assumptions: [
      {
        title: "The contingency is on the whole subtotal",
        body: "Not only on the contractor's quote. Overruns turn up in fees, disposal and fixtures as often as in the build, so the buffer covers every line.",
      },
      {
        title: "15, 20 and 25% are starting points",
        body: "They are the rule of thumb from our contingency guide, sized to the age and condition of the house. They are not a statistic about your project. If a surveyor has already found rot or old wiring, go higher.",
      },
      {
        title: "No currency, no tax",
        body: "Type amounts in the currency you think in. The calculator does not add VAT or sales tax; enter amounts the way your quotes state them, and keep that consistent.",
      },
    ],
    faq: [
      {
        q: "What percentage should a renovation contingency be?",
        a: "Our guide uses about 15% for a newer home where only surfaces change, 20% for an older home or any job that opens walls, floors or services, and 25% or more for a pre-war house or known structural problems. Pick the row that matches your house and adjust from there.",
      },
      {
        q: "Should the contingency be part of the budget or on top of it?",
        a: "On top of the costs you know, but inside the total you plan to spend. If you can afford 60,000 in total and want a 20% buffer, the known costs have to fit in 50,000. Divide the total you can afford by 1 + the percentage to find that figure.",
      },
      {
        q: "Can I use this calculator in euros, pounds or kroner?",
        a: "Yes. It only adds and multiplies numbers, so the result is in whatever currency you typed. It shows no currency sign, so nothing is converted or assumed.",
      },
      {
        q: "Is the contingency the same as money for upgrades?",
        a: "No. The contingency is for surprises you could not have priced, like water damage behind a wall. A nicer worktop is a change to the plan and should come from a new decision, not from the buffer.",
      },
      {
        q: "Does this page save what I type?",
        a: "No. The sums run in your browser and nothing is sent anywhere. Reload the page and the starting values come back.",
      },
    ],
    posts: [
      "renovation-contingency-budget",
      "how-to-budget-a-home-renovation",
      "renovation-budget-template",
      "renovation-cost-overrun-statistics",
      "hidden-costs-older-home",
    ],
    useCases: ["kitchen-renovation", "bathroom-remodel", "house-extension", "fixer-upper"],
    appNote:
      "Once the work starts, the plan meets real prices. In Home Stories every item you save adds its price to the project total, so you see how much of the budget is left. The budget vs. actual chart is Pro.",
  },
  {
    slug: "paint-calculator",
    calc: "paint",
    label: "Paint calculator",
    h1: "Paint calculator: how much paint for a room",
    metaTitle: "Paint Calculator: Litres or Gallons for a Room",
    metaDescription:
      "Work out how much paint a room needs from its size, doors and windows, coats and the coverage on your tin. Metric or imperial, with the formula shown.",
    summary: "Wall and ceiling area, coats and coverage turned into litres or gallons, and tins.",
    image: "/stock/tool-paint.webp",
    imageAlt: "An empty living room being painted, with paint tins, a roller tray and a dust sheet on the floor and one wall already pale green",
    intro: [
      "Paint needed = paint area × coats ÷ coverage per litre (or per gallon). For a 4 × 3 m room with 2.5 m walls, minus 3.5 m² of door and window, two coats at 9 m² per litre come to 7 litres.",
      "Coverage is the number that changes most. Paint makers state it per coat on the tin or the data sheet, and rough or fresh plaster takes more than a smooth painted wall. Put in the figure from your tin.",
    ],
    fieldsets: [
      {
        legend: "The room",
        fields: [
          { name: "length", label: "Room length", dim: "length", metric: 4, imperial: 13, step: "any" },
          { name: "width", label: "Room width", dim: "length", metric: 3, imperial: 10, step: "any" },
          { name: "height", label: "Wall height", dim: "length", metric: 2.5, imperial: 8, step: "any" },
          {
            name: "openings",
            label: "Doors and windows to leave out",
            dim: "area",
            metric: 3.5,
            imperial: 38,
            step: "any",
            hint: "Their total area. Measure them, or leave it at zero to be safe.",
          },
          { name: "includeCeiling", label: "Paint the ceiling too", checkbox: true, metric: 0 },
        ],
      },
      {
        legend: "The paint",
        fields: [
          { name: "coats", label: "Coats", suffix: "coats", metric: 2, step: "1" },
          {
            name: "coverage",
            label: "Coverage per coat",
            dim: "coverage",
            metric: 9,
            imperial: 350,
            step: "any",
            hint: "From the tin or data sheet. Wall paints often state about 8–10 m²/L (350–400 sq ft/gal).",
          },
          { name: "tinSize", label: "Tin size", dim: "volume", metric: 2.5, imperial: 1, step: "any" },
        ],
      },
    ],
    outputs: [
      { name: "walls", label: "Wall area to paint", dim: "area" },
      { name: "ceiling", label: "Ceiling area (when ticked)", dim: "area" },
      { name: "litres", label: "Paint needed", dim: "volume", main: true },
      { name: "tins", label: "Tins to buy", count: true },
    ],
    formula: [
      "wall area = 2 × (length + width) × height − doors and windows",
      "paint area = wall area + ceiling (length × width, if ticked)",
      "paint needed = paint area × coats ÷ coverage per coat",
      "tins = paint needed ÷ tin size, rounded up",
    ],
    assumptions: [
      {
        title: "Coverage is per coat, and it is a range",
        body: "Makers quote it for a smooth, sealed surface. The default here is 9 m²/L, or 350 sq ft per US gallon in imperial, inside the ranges the sources below give. Bare plaster, a strong colour change or a rough wall can need noticeably more paint.",
      },
      {
        title: "The room is a rectangle",
        body: "For an L-shaped room, work out each part as its own rectangle and add the results. Sloping ceilings and stairwells need their own measurements.",
      },
      {
        title: "Primer is not included",
        body: "New plaster usually gets a mist coat or a primer first, and primer often covers less per litre than the top coat. Run the calculator again with the primer's coverage and one coat.",
      },
      {
        title: "No allowance for spills or touch-ups",
        body: "Rounding up to whole tins usually leaves a little over. Keep it, with the colour code written on the lid.",
      },
    ],
    sources: [
      {
        label: "Sherwin-Williams paint calculator: a gallon of paint typically covers about 350–400 sq ft",
        url: "https://www.sherwin-williams.com/en-us/color/color-tools/paint-calculator",
      },
      {
        label: "Dulux EasyCare technical data sheet: approx. 8–10 m² per litre, depending on surface porosity, profile and application",
        url: "https://prdakzodecodocumentssa.blob.core.windows.net/public/tds/da/za/en/dulux%20easycare.pdf",
      },
    ],
    faq: [
      {
        q: "How do I work out the area of the walls?",
        a: "Add the length and the width of the room, double it to get the distance round the walls, and multiply by the wall height. Then take off the doors and windows. A 4 × 3 m room with 2.5 m walls has 35 m² of wall before the openings.",
      },
      {
        q: "Do I need one coat or two?",
        a: "Two is the usual plan for walls, especially over a different colour. One coat can be enough when you repaint in the same colour on a sound surface. The calculator multiplies by the coats you enter, so you can compare both.",
      },
      {
        q: "Why does my tin say a different coverage?",
        a: "Each paint is different, and matt, silk, ceiling and trim paints do not spread the same. Use the figure printed on the tin you buy. The value in the calculator is only a starting point.",
      },
      {
        q: "Can I use it for the ceiling only?",
        a: "Yes. Set the wall height to zero and tick the ceiling box. The paint area is then the length times the width of the room.",
      },
      {
        q: "Does it work in gallons?",
        a: "Switch the units to imperial. Lengths become feet, areas square feet, coverage square feet per US gallon and the result US gallons. The values you typed are converted, not reset.",
      },
    ],
    posts: [
      "where-to-start-renovating-new-house",
      "kitchen-renovation-timeline",
      "diy-vs-hire-contractor",
      "renovation-checklist-printable",
    ],
    useCases: ["flooring-and-decorating", "nursery-and-bedroom", "home-office", "rental-property", "diy-projects"],
    appNote:
      "Home Stories keeps a note for the paint code and the colour of each room, and every tin you buy can go in as an item with its price, so the decorating cost adds up as you shop.",
  },
  {
    slug: "tile-calculator",
    calc: "tile",
    label: "Tile calculator",
    h1: "Tile calculator: how many tiles and boxes to buy",
    metaTitle: "Tile Calculator: Tiles and Boxes with Waste",
    metaDescription:
      "Count the tiles and boxes for a floor or wall from its area, the tile size, a waste allowance and tiles per box. Metric or imperial, formula shown.",
    summary: "Tiles and boxes for a floor or wall, from the area, tile size and a waste allowance.",
    image: "/stock/tool-tile.webp",
    imageAlt: "A newly tiled floor with boxes of spare tiles stacked in the corner",
    intro: [
      "Tiles needed = area × (1 + waste %) ÷ area of one tile, rounded up; boxes = tiles ÷ tiles per box, rounded up. A 2 × 1.5 m floor with 30 × 30 cm tiles and 10% waste needs 37 tiles, so 4 boxes of 11.",
      "The waste allowance covers cuts at the edges, breakages and a few spares. It is a choice, not a constant: a straight grid wastes less than a diagonal or herringbone lay, and large tiles waste more per cut.",
    ],
    fieldsets: [
      {
        legend: "The surface",
        fields: [
          { name: "length", label: "Length", dim: "length", metric: 2, imperial: 7, step: "any" },
          { name: "width", label: "Width (or height, for a wall)", dim: "length", metric: 1.5, imperial: 5, step: "any" },
          {
            name: "extraArea",
            label: "Extra area",
            dim: "area",
            metric: 0,
            step: "any",
            hint: "A niche, a splashback or the second leg of an L-shape. Take off a bath or shower tray by lowering length or width.",
          },
        ],
      },
      {
        legend: "The tiles",
        fields: [
          { name: "tileLength", label: "Tile length", dim: "size", metric: 30, imperial: 12, step: "any" },
          { name: "tileWidth", label: "Tile width", dim: "size", metric: 30, imperial: 12, step: "any" },
          {
            name: "wastePct",
            label: "Waste allowance",
            suffix: "%",
            metric: 10,
            step: "any",
            hint: "A planning choice. Raise it for diagonal or herringbone patterns and for large tiles.",
          },
          { name: "tilesPerBox", label: "Tiles per box", suffix: "tiles", metric: 11, imperial: 10, step: "1" },
        ],
      },
    ],
    outputs: [
      { name: "area", label: "Area to tile", dim: "area" },
      { name: "areaWithWaste", label: "Area with waste", dim: "area" },
      { name: "tiles", label: "Tiles needed", count: true, main: true },
      { name: "boxes", label: "Boxes to buy", count: true },
      { name: "tilesBought", label: "Tiles in those boxes", count: true },
    ],
    formula: [
      "area = length × width + extra area",
      "one tile = tile length × tile width",
      "tiles = area × (1 + waste % ÷ 100) ÷ one tile, rounded up",
      "boxes = tiles ÷ tiles per box, rounded up",
    ],
    assumptions: [
      {
        title: "Grout joints are ignored",
        body: "A joint makes each tile cover slightly more than its own size, so leaving it out over-counts by a little. That is the safe side.",
      },
      {
        title: "The waste figure is yours",
        body: "10% is a common starting point for a straight lay of standard tiles. It is not a rule. Patterns, many corners, large or fragile tiles and a narrow room all push it up.",
      },
      {
        title: "Tiles per box comes from the box",
        body: "Some boxes state a coverage instead of a count. Divide that coverage by the area of one tile to get the count, or use the flooring calculator, which works in coverage per pack.",
      },
      {
        title: "Buy from one batch",
        body: "Shade and size can vary between production batches. Buying every box at once, with a spare or two, avoids a mismatched patch later.",
      },
    ],
    faq: [
      {
        q: "How much extra tile should I buy?",
        a: "Most people plan with a waste allowance of about 10% for a simple straight lay and more for diagonal or herringbone layouts. Ask the tiler what they want for the pattern you have chosen, and put that figure in the waste field.",
      },
      {
        q: "How do I measure a wall for tiles?",
        a: "Measure the width and the height you want to tile, and enter them as length and width. Leave out a window or a bath by measuring around them as separate rectangles and adding them in the extra area field.",
      },
      {
        q: "What if my tiles are not square?",
        a: "Enter the two sides separately. A 60 × 30 cm tile covers 0.18 m², whichever way round it is laid.",
      },
      {
        q: "Why does it say more boxes than I expected?",
        a: "Both steps round up. You cannot buy part of a tile or part of a box, so a small change in area or waste can tip the count into another box. The last line shows how many tiles the boxes actually hold.",
      },
      {
        q: "Should I keep the spare tiles?",
        a: "Yes. A few spares from the same batch make a cracked tile easy to replace years later, when the line may no longer be made.",
      },
    ],
    posts: [
      "bathroom-renovation-sequence",
      "how-long-does-a-bathroom-renovation-take",
      "how-long-does-it-take-to-install-flooring",
      "how-to-compare-contractor-quotes",
    ],
    useCases: ["bathroom-remodel", "kitchen-renovation", "flooring-and-decorating", "diy-projects"],
    appNote:
      "In Home Stories a tile you pick can be an item with its price, the shop and a photo, and the tiler's quote goes in as a document beside it.",
  },
  {
    slug: "flooring-calculator",
    calc: "flooring",
    label: "Flooring calculator",
    h1: "Flooring calculator: how many packs of laminate, vinyl or wood",
    metaTitle: "Flooring Calculator: Packs of Laminate or Vinyl",
    metaDescription:
      "Find how many packs of laminate, vinyl plank or engineered wood a room needs from its area, a waste allowance and the coverage per pack. Metric or imperial.",
    summary: "Packs of laminate, vinyl plank or engineered wood from the floor area and pack coverage.",
    image: "/stock/tool-flooring.webp",
    imageAlt: "A room with light wood flooring going down, packs of boards stacked on the floor and a sheet of underlay rolled out",
    intro: [
      "Packs needed = floor area × (1 + waste %) ÷ coverage per pack, rounded up. A 5 × 4 m room plus 1.5 m² of hallway, with 8% waste and 2.22 m² packs, needs 11 packs.",
      "Use the coverage printed on the pack rather than counting boards, because board sizes vary between ranges. The waste allowance covers the offcuts at the end of each row and the cuts around door frames.",
    ],
    fieldsets: [
      {
        legend: "The floor",
        fields: [
          { name: "length", label: "Room length", dim: "length", metric: 5, imperial: 16, step: "any" },
          { name: "width", label: "Room width", dim: "length", metric: 4, imperial: 13, step: "any" },
          {
            name: "extraArea",
            label: "Extra area",
            dim: "area",
            metric: 1.5,
            imperial: 16,
            step: "any",
            hint: "A hallway, a bay window or a cupboard floor, measured separately.",
          },
        ],
      },
      {
        legend: "The flooring",
        fields: [
          {
            name: "wastePct",
            label: "Waste allowance",
            suffix: "%",
            metric: 8,
            step: "any",
            hint: "Raise it for diagonal or herringbone lays, or a room with many corners.",
          },
          {
            name: "packCoverage",
            label: "Coverage per pack",
            dim: "area",
            metric: 2.22,
            imperial: 24,
            step: "any",
            hint: "Printed on the pack or the product page.",
          },
        ],
      },
    ],
    outputs: [
      { name: "area", label: "Floor area", dim: "area" },
      { name: "areaWithWaste", label: "Area with waste", dim: "area" },
      { name: "packs", label: "Packs to buy", count: true, main: true },
      { name: "areaBought", label: "Area those packs cover", dim: "area" },
      { name: "spare", label: "Left over beyond the floor", dim: "area" },
    ],
    formula: [
      "floor area = length × width + extra area",
      "area with waste = floor area × (1 + waste % ÷ 100)",
      "packs = area with waste ÷ coverage per pack, rounded up",
    ],
    assumptions: [
      {
        title: "Coverage per pack is the maker's figure",
        body: "It is the face area of the boards in the pack. The values in the form are only examples; packs differ a lot between ranges.",
      },
      {
        title: "Waste depends on the lay",
        body: "A straight lay in a rectangular room wastes the least. Diagonal and herringbone patterns, and rooms with alcoves, pipes and several doors, need a bigger allowance.",
      },
      {
        title: "Underlay, trims and skirting are separate",
        body: "Underlay is usually sold by area too: run the calculator again with the underlay roll's coverage and no waste. Count thresholds and beading by length.",
      },
      {
        title: "Acclimatisation and expansion gaps are not counted",
        body: "Floating floors are laid with a gap at the walls, hidden by the skirting. It is too small to change the pack count, so the full floor area is used.",
      },
    ],
    faq: [
      {
        q: "How much extra flooring should I order?",
        a: "Pick a waste allowance for the way the floor is laid and put it in the form. A plain straight lay needs the least. Your fitter or the product's installation guide may recommend a figure; use that when you have it.",
      },
      {
        q: "Do I measure up to the skirting or under it?",
        a: "Measure wall to wall. The expansion gap under the skirting is small, and measuring the full room keeps the count on the safe side.",
      },
      {
        q: "Can I use it for carpet or sheet vinyl?",
        a: "Not well. Carpet and sheet vinyl come off a roll of a fixed width, so the number of drops and the seams decide how much you buy. This calculator is for products sold in packs.",
      },
      {
        q: "What do I do with an L-shaped room?",
        a: "Split it into two rectangles. Enter the bigger one as length and width, and the area of the smaller one as extra area.",
      },
      {
        q: "Should I keep the leftover packs?",
        a: "Keep at least one unopened pack. Boards from the same batch make a repair match, and many ranges change after a few years.",
      },
    ],
    posts: [
      "how-long-does-it-take-to-install-flooring",
      "how-to-plan-a-home-renovation-step-by-step",
      "hidden-costs-older-home",
      "how-to-budget-a-home-renovation",
    ],
    useCases: ["flooring-and-decorating", "basement-conversion", "loft-conversion", "home-gym", "rental-property"],
    appNote:
      "Home Stories keeps the flooring you choose as an item with its price and a photo, and a before-and-after photo comparison shows the room once the last board is down.",
  },
];
