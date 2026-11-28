#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "reportlab==4.2.5",
#   "fonttools==4.55.3",
#   "brotli==1.1.0",
#   "pymupdf==1.25.1",
#   "pillow==11.0.0",
# ]
# ///
"""Build the four printable renovation templates (#163).

    uv run scripts/build-templates.py

uv reads the dependency block above and runs the script in its own cached
environment, so nothing is installed system-wide and the versions are pinned.

Outputs (committed, not built in CI):
  public/templates/<slug>-a4.pdf       A4, metric unit hints
  public/templates/<slug>-letter.pdf   US Letter, imperial unit hints
  public/templates/<slug>-preview.webp page 1 of the A4 file, for the landing page
  src/data/templateFiles.json          pages, sizes and line counts per file

Each template has a landing page at /templates/<slug>/ (src/data/templates.ts).
The cost categories come from the renovation-budget-template post and the
quote rows and questions from how-to-compare-contractor-quotes, so the sheets
cannot drift away from the articles that explain them. The phase checklist and
the budget spreadsheet stay in scripts/build-downloads.py; these sheets are
the pen-and-paper companions, not copies.

Output is byte-for-byte reproducible: reportlab runs in invariant mode (no
timestamps, fixed document ID) and the fonts are converted the same way each
run.
"""
from __future__ import annotations

import io
import re
from pathlib import Path

from fontTools.ttLib import TTFont
from reportlab.graphics.shapes import Drawing, Rect
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, LETTER, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.platypus import (
    BaseDocTemplate, Flowable, Frame, KeepTogether, PageBreak,
    PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
BLOG = ROOT / "src" / "content" / "blog"
FONTS = ROOT / "public" / "fonts"
OUT = ROOT / "public" / "templates"
SITE = "home-stories.12f.dk"

# The site palette (tailwind.config.mjs): graphite, mist, signal orange.
INK = colors.HexColor("#18191B")
MUTED = colors.HexColor("#5F6166")
RULE = colors.HexColor("#A9AAA5")
HAIR = colors.HexColor("#D2D2CD")
TINT = colors.HexColor("#EBEBE7")
SIGNAL = colors.HexColor("#FF4A1F")


# --------------------------------------------------------------------------
# Fonts: the site's own Inter (OFL) and IBM Plex Mono (OFL), woff2 -> TTF
# --------------------------------------------------------------------------
def register_fonts() -> None:
    for name, file in [
        ("Inter", "Inter-Regular.woff2"),
        ("Inter-Medium", "Inter-Medium.woff2"),
        ("Inter-SemiBold", "Inter-SemiBold.woff2"),
        ("Inter-Bold", "Inter-Bold.woff2"),
        ("Mono", "IBMPlexMono-500.woff2"),
    ]:
        font = TTFont(str(FONTS / file), recalcTimestamp=False)
        font.flavor = None
        buf = io.BytesIO()
        font.save(buf)
        buf.seek(0)
        pdfmetrics.registerFont(RLFont(name, buf))


def style(name, font="Inter", size=9.0, leading=None, color=INK, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size,
                          leading=leading or size * 1.3, textColor=color, **kw)


S = {}


def init_styles() -> None:
    S.update(
        title=style("title", "Inter-Bold", 21, 24, spaceAfter=2),
        lede=style("lede", size=9, leading=12.5, color=MUTED, spaceAfter=8),
        h2=style("h2", "Inter-Bold", 11.5, 14, spaceBefore=9, spaceAfter=4),
        label=style("label", "Mono", 6.4, 8, color=MUTED),
        cell=style("cell", size=8.2, leading=10.2),
        cellb=style("cellb", "Inter-SemiBold", 8.2, 10.2),
        head=style("head", "Inter-SemiBold", 7.4, 9.2),
        small=style("small", size=7.4, leading=9.6, color=MUTED),
        note=style("note", size=8, leading=10.8, color=MUTED),
    )


# --------------------------------------------------------------------------
# Source text from the posts
# --------------------------------------------------------------------------
def strip_md(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    return text.strip()


def post_body(slug: str) -> str:
    raw = (BLOG / f"{slug}.md").read_text(encoding="utf-8")
    return raw.split("---", 2)[2]


def budget_categories() -> list[str]:
    """'### 1. Design & permits' ... from the budget template post."""
    names = re.findall(r"^### \d+\.\s+(.+)$", post_body("renovation-budget-template"), re.M)
    names = [strip_md(n) for n in names]
    assert len(names) == 9, f"expected the post's 9 cost categories, got {names}"
    return names


def quote_rows() -> list[str]:
    """First column of the blank worksheet ('| Compare | Bid A | ...')."""
    body = post_body("how-to-compare-contractor-quotes")
    block = body.split("| Compare | Bid A | Bid B | Bid C |", 1)[1]
    rows = []
    for line in block.splitlines()[2:]:
        if not line.startswith("|"):
            break
        rows.append(strip_md(line.strip("|").split("|")[0]))
    assert len(rows) >= 10, f"expected the post's worksheet rows, got {rows}"
    return rows


def quote_questions() -> list[str]:
    body = post_body("how-to-compare-contractor-quotes")
    section = body.split("## What questions should you ask before you pick?", 1)[1].split("\n## ", 1)[0]
    qs = [strip_md(q) for q in re.findall(r"^\d+\.\s+(.+)$", section, re.M)]
    assert len(qs) >= 5, f"expected the post's questions, got {qs}"
    return qs


# --------------------------------------------------------------------------
# Building blocks
# --------------------------------------------------------------------------
def box(size=3.2 * mm):
    """A tick box drawn as a shape: the ballot-box glyph is not in every font."""
    d = Drawing(size, size)
    d.add(Rect(0, 0, size, size, strokeColor=RULE, strokeWidth=0.7, fillColor=None))
    return d


def P(text, s="cell"):
    return Paragraph(text, S[s])


def fields(items, width, cols=None, weights=None):
    """Fill-in fields: a small label over a ruled line, with a gutter between."""
    cols = cols or len(items)
    gap = 5 * mm
    weights = weights or [1] * cols
    usable = width - gap * (cols - 1)
    widths = []
    for c in range(cols):
        widths += [usable * weights[c] / sum(weights)] + ([gap] if c < cols - 1 else [])
    data = []
    for i in range(0, len(items), cols):
        row = items[i:i + cols] + [""] * (cols - len(items[i:i + cols]))
        cells = []
        for c, label in enumerate(row):
            cells.append(P(label.upper(), "label") if label else "")
            if c < cols - 1:
                cells.append("")
        data.append(cells)
    t = Table(data, colWidths=widths, rowHeights=[9.5 * mm] * len(data))
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]
    for r, row in enumerate(data):
        for c in range(0, len(row), 2):
            if row[c]:
                cmds.append(("LINEBELOW", (c, r), (c, r), 0.7, RULE))
    t.setStyle(TableStyle(cmds))
    t.hAlign = "LEFT"
    return t


def grid(header, rows, widths, row_h=7.2 * mm, head_h=None, zebra=False, bold_last=False,
         align_right=(), extra=()):
    data = [[P(h, "head") for h in header]] + rows
    heights = [head_h or 6.6 * mm] + [row_h] * len(rows)
    t = Table(data, colWidths=widths, rowHeights=heights, repeatRows=1)
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("BACKGROUND", (0, 0), (-1, 0), TINT),
        ("LINEABOVE", (0, 0), (-1, 0), 1.4, INK),
        ("LINEBELOW", (0, 0), (-1, 0), 0.7, INK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, HAIR),
        ("LINEAFTER", (0, 0), (-2, -1), 0.5, HAIR),
        ("LINEBELOW", (0, -1), (-1, -1), 0.9, INK),
    ]
    if zebra:
        for r in range(2, len(data), 2):
            cmds.append(("BACKGROUND", (0, r), (-1, r), colors.HexColor("#F6F6F3")))
    if bold_last:
        cmds += [("LINEABOVE", (0, -1), (-1, -1), 0.9, INK),
                 ("BACKGROUND", (0, -1), (-1, -1), TINT)]
    for c in align_right:
        cmds.append(("ALIGN", (c, 0), (c, -1), "RIGHT"))
    t.setStyle(TableStyle(cmds + list(extra)))
    t.hAlign = "LEFT"
    return t


def lined(n, width, h=6.4 * mm):
    """n blank writing lines."""
    t = Table([[""]] * n, colWidths=[width], rowHeights=[h] * n)
    t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR)]))
    t.hAlign = "LEFT"
    return t


class FillGrid(Flowable):
    """A ruled grid that takes every row the rest of the page has room for.

    A4 and Letter differ by 18 mm in height, and a fixed row count leaves one
    of them half empty. This measures the space it is given and sets as many
    rows as fit, keeping `reserve` free below it for what follows.
    """

    def __init__(self, header, widths, row_fn, row_h, reserve=0.0, counter=None, **kw):
        super().__init__()
        self.header, self.widths, self.row_fn = header, widths, row_fn
        self.row_h, self.reserve, self.counter, self.kw = row_h, reserve, counter, kw
        self.table = None

    def wrap(self, aw, ah):
        n = max(1, int((ah - self.reserve - 6.6 * mm - 1) // self.row_h))
        start = self.counter["next"] if self.counter else 1
        rows = [self.row_fn(start + i) for i in range(n)]
        self.n = n
        self.table = grid(self.header, rows, self.widths, row_h=self.row_h, **self.kw)
        return self.table.wrap(aw, ah)

    def draw(self):
        if self.counter:
            self.counter["next"] += self.n
        self.table.drawOn(self.canv, 0, 0)


class StretchGrid(Flowable):
    """A grid with a fixed set of rows whose height grows to fill the page."""

    def __init__(self, header, rows, widths, max_h, reserve=0.0, **kw):
        super().__init__()
        self.header, self.rows, self.widths = header, rows, widths
        self.max_h, self.reserve, self.kw = max_h, reserve, kw

    def wrap(self, aw, ah):
        h = min(self.max_h, (ah - self.reserve - 6.6 * mm - 1) / len(self.rows))
        self.table = grid(self.header, self.rows, self.widths, row_h=h, **self.kw)
        return self.table.wrap(aw, ah)

    def draw(self):
        self.table.drawOn(self.canv, 0, 0)


class FillLines(Flowable):
    """Writing lines down to the bottom of the frame."""

    def __init__(self, width, h=6.6 * mm):
        super().__init__()
        self.width, self.h = width, h

    def wrap(self, aw, ah):
        self.n = max(0, int((ah - 1) // self.h))
        return self.width, self.n * self.h

    def draw(self):
        self.canv.setStrokeColor(HAIR)
        self.canv.setLineWidth(0.5)
        for i in range(self.n):
            y = i * self.h
            self.canv.line(0, y, self.width, y)


def checks(items, width, cols=1):
    """Tick-box list, in columns."""
    per = -(-len(items) // cols)
    colw = width / cols
    data = []
    for r in range(per):
        row = []
        for c in range(cols):
            i = c * per + r
            if i < len(items):
                row += [box(), P(items[i])]
            else:
                row += ["", ""]
        data.append(row)
    widths = [5.5 * mm, colw - 5.5 * mm] * cols
    t = Table(data, colWidths=widths)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
        ("TOPPADDING", (0, 0), (0, -1), 2.6),
    ] + [("TOPPADDING", (c, 0), (c, -1), 2.6) for c in range(0, cols * 2, 2)]))
    t.hAlign = "LEFT"
    return t


# --------------------------------------------------------------------------
# Document shell
# --------------------------------------------------------------------------
class Sheet:
    def __init__(self, slug, name, paper, orient="portrait"):
        self.slug, self.name, self.paper = slug, name, paper
        size = A4 if paper == "a4" else LETTER
        self.size = landscape(size) if orient == "landscape" else size
        self.metric = paper == "a4"
        self.margin = 14 * mm
        self.width = self.size[0] - 2 * self.margin

    def unit(self, metric, imperial):
        return metric if self.metric else imperial

    def furniture(self, canvas, doc):
        w, h = self.size
        m = self.margin
        canvas.saveState()
        canvas.setFillColor(SIGNAL)
        canvas.rect(m, h - 10.5 * mm, 9 * mm, 1.6 * mm, stroke=0, fill=1)
        canvas.setFillColor(INK)
        canvas.setFont("Inter-Bold", 7.6)
        canvas.drawString(m + 12 * mm, h - 10.6 * mm, "Home Stories")
        canvas.setFillColor(MUTED)
        canvas.setFont("Mono", 6.6)
        canvas.drawString(m + 12 * mm + pdfmetrics.stringWidth("Home Stories", "Inter-Bold", 7.6) + 3 * mm,
                          h - 10.5 * mm, f"/  {self.name.upper()}")
        canvas.drawRightString(w - m, h - 10.4 * mm, f"PAGE {doc.page}")
        canvas.setStrokeColor(HAIR)
        canvas.setLineWidth(0.5)
        canvas.line(m, 11.5 * mm, w - m, 11.5 * mm)
        canvas.setFillColor(MUTED)
        left = f"Free template from {SITE}/templates/{self.slug}/"
        right = "Keep the same record on your phone: Home Stories, free for iPhone and iPad."
        canvas.setFont("Inter", 6.8)
        if pdfmetrics.stringWidth(left + right, "Inter", 6.8) + 12 * mm < w - 2 * m:
            canvas.drawString(m, 8 * mm, left)
            canvas.drawRightString(w - m, 8 * mm, right)
        else:
            canvas.drawString(m, 8 * mm, left)
            canvas.drawString(m, 5 * mm, right)
        canvas.restoreState()

    def build(self, story, title, subject):
        path = OUT / f"{self.slug}-{self.paper}.pdf"
        doc = BaseDocTemplate(
            str(path), pagesize=self.size,
            leftMargin=self.margin, rightMargin=self.margin,
            topMargin=15 * mm, bottomMargin=15 * mm,
            title=title, author="Home Stories (home-stories.12f.dk)", subject=subject,
            creator=f"{SITE} scripts/build-templates.py", invariant=1,
        )
        doc.addPageTemplates([PageTemplate(
            id="p", onPage=self.furniture,
            frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height,
                          id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)],
        )])
        doc.build(story)
        return path


def header(sheet, title, lede, field_labels, cols=None, weights=None):
    return [
        P(title, "title"),
        P(lede, "lede"),
        fields(field_labels, sheet.width, cols, weights),
        Spacer(1, 3 * mm),
    ]


# --------------------------------------------------------------------------
# 1. Budget sheet
# --------------------------------------------------------------------------
def budget_sheet(paper):
    sh = Sheet("renovation-budget-sheet", "Renovation budget sheet", paper)
    w = sh.width
    cats = budget_categories()
    story = header(
        sh, "Renovation budget sheet",
        "One page for the plan, one for every payment. Fill in the budget per category "
        "before work starts, then log each payment on the day it is made. The "
        "categories are the nine from the renovation budget template.",
        ["Project", "Start date", "Total budget", "Contingency %"],
    )
    story.append(P("Budget by category", "h2"))
    cw = [w * 0.34, w * 0.165, w * 0.165, w * 0.165, w * 0.165]
    rows = [[P(c, "cellb"), "", "", "", ""] for c in cats if not c.lower().startswith("contingency")]
    rows.append([P("Other", "cellb"), "", "", "", ""])
    rows.append([P("Subtotal", "cellb"), "", "", "", ""])
    rows.append([P("Contingency (subtotal × %)", "cellb"), "", "", "", ""])
    rows.append([P("Total", "cellb"), "", "", "", ""])
    t = grid(["Category", "Budget", "Quoted / committed", "Paid to date", "Left to pay"],
             rows, cw, row_h=8.2 * mm, bold_last=True)
    story.append(t)
    story.append(Spacer(1, 2 * mm))
    story.append(P(
        "<b>Budget</b> is what you plan to spend. <b>Quoted / committed</b> is what you have signed "
        "for. <b>Paid to date</b> comes from the payment log overleaf. <b>Left to pay</b> = "
        "committed − paid. When committed passes budget in a row, decide there and then where the "
        "difference comes from.", "note"))
    story.append(P("Decisions that changed the budget", "h2"))
    story.append(FillGrid(["Date", "What changed", "Cost +/−", "Paid from"],
                          [w * 0.14, w * 0.5, w * 0.16, w * 0.2], lambda i: [""] * 4, row_h=7.4 * mm))

    story.append(PageBreak())
    story.append(P("Payment log", "title"))
    story.append(P(
        "One line per payment, on the day it leaves your account. Type: <b>M</b> materials, "
        "<b>L</b> labour, <b>C</b> contractor. Keep the receipt with the page.", "lede"))
    log_w = [w * 0.11, w * 0.19, w * 0.25, w * 0.14, w * 0.06, w * 0.12, w * 0.13]
    log = FillGrid(["Date", "Paid to", "What for", "Category", "Type", "Amount", "Running total"],
                   log_w, lambda i: [""] * 7, row_h=7.6 * mm, zebra=True)
    story.append(log)
    path = sh.build(story, "Renovation budget sheet",
                    "A printable renovation budget sheet with a payment log.")
    return path, {"categories": len(rows) - 4, "paymentLines": log.n}


# --------------------------------------------------------------------------
# 2. Punch list
# --------------------------------------------------------------------------
def punch_list(paper):
    sh = Sheet("renovation-punch-list", "Punch list / snag list", paper)
    w = sh.width
    story = header(
        sh, "Punch list (snag list)",
        "Walk every room with the contractor before the final payment. One defect per line, "
        "with a photo and a fix-by date. Re-check each one yourself before you tick the last box.",
        ["Property", "Contractor", "Walk-through date", "Amount held back"],
        weights=[3, 3, 1.6, 1.6],
    )
    cw = [w * 0.05, w * 0.15, w * 0.32, w * 0.07, w * 0.13, w * 0.1, w * 0.07, w * 0.11]
    head = ["#", "Room / location", "Defect (what, where, how big)", "Photo", "Who fixes", "Fix by",
            "Fixed", "Re-check"]
    centred = [("ALIGN", (3, 1), (3, -1), "CENTER"), ("ALIGN", (6, 1), (7, -1), "CENTER")]
    counter = {"next": 1}

    def row(i):
        return [P(str(i), "small"), "", "", box(), "", "", box(), box()]

    story.append(FillGrid(head, cw, row, row_h=8.6 * mm, counter=counter, extra=centred))
    story.append(PageBreak())
    story.append(FillGrid(head, cw, row, row_h=8.6 * mm, counter=counter, extra=centred,
                          reserve=40 * mm))
    story.append(Spacer(1, 5 * mm))
    story.append(KeepTogether([
        P("Sign-off", "h2"),
        P("Every line is fixed and checked, or listed below as agreed to stay open.", "note"),
        Spacer(1, 1 * mm),
        fields(["Items left open (numbers)", "Agreed by", "Date"], w, 3),
        fields(["Homeowner signature", "Contractor signature", "Final payment released on"], w, 3),
    ]))
    path = sh.build(story, "Punch list (snag list)",
                    "A printable renovation punch list for the final walk-through.")
    return path, {"lines": counter["next"] - 1}


# --------------------------------------------------------------------------
# 3. Room-by-room checklist
# --------------------------------------------------------------------------
ROOM_CHECKS = {
    "Kitchen": [
        "Appliance sizes and the gaps they need",
        "Where the water supply, waste and gas come in",
        "Extractor route to the outside",
        "Worktop length on each run",
        "Sockets above the worktop: where and how many",
        "Window and door positions against the cabinet plan",
    ],
    "Bathroom": [
        "Waste pipe position and fall for the WC and shower",
        "Where the extractor fan will vent",
        "Wet zones: which walls get waterproofing",
        "Floor: what it is made of, and is it level",
        "Shutoff valve location",
        "Mirror, cabinet and towel rail heights",
    ],
    "Bedroom": [
        "Wardrobe wall: width, depth and any skirting or radiator",
        "Bedside sockets and light switches at the bed",
        "Window size for blinds or curtains",
        "Door swing against the furniture plan",
        "Ceiling light position",
        "Radiator or heater position",
    ],
    "Living room": [
        "TV wall: socket, aerial or network point",
        "Seating layout against doors and radiators",
        "Lamp sockets away from the walls",
        "Fireplace or chimney condition",
        "Window and door sizes",
        "Shelving or built-in positions",
    ],
    "Hallway and stairs": [
        "Stair width, rise and going (measure, don't guess)",
        "Handrail and banister condition",
        "Switches at both ends of the stairs",
        "Coat and shoe storage space",
        "Front door: size, swing and draught",
        "Meter, fuse board or alarm panel location",
    ],
}


def room_page(sh, room):
    w = sh.width
    u = sh.unit
    blocks = [
        P(room if room else "Room: ______________________", "title"),
        P("Fill this in before any work starts, and finish it when the room is done. "
          "The codes and sizes are the ones you will need again.", "lede"),
        P("Measurements", "h2"),
        fields([f"Length ({u('m', 'ft')})", f"Width ({u('m', 'ft')})",
                f"Ceiling height ({u('m', 'ft')})", f"Floor area ({u('m²', 'sq ft')})"], w),
        fields([f"Window(s) ({u('cm', 'in')})", f"Door(s) ({u('cm', 'in')})",
                f"Wall area to paint ({u('m²', 'sq ft')})", "Skirting / baseboard length"], w),
    ]
    half = (w - 6 * mm) / 2
    keep_change = Table(
        [[P("Keep", "h2"), P("Change", "h2")],
         [lined(5, half), lined(5, half)]],
        colWidths=[half + 6 * mm, half])
    keep_change.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    keep_change.hAlign = "LEFT"
    blocks.append(keep_change)

    blocks.append(P("Finishes chosen", "h2"))
    cw = [w * 0.18, w * 0.32, w * 0.25, w * 0.25]
    blocks.append(grid(["Surface", "Product / colour", "Code or batch", "Supplier"],
                       [[P(s, "cellb"), "", "", ""] for s in
                        ["Walls", "Ceiling", "Woodwork / trim", "Floor", "Tiles", "Other"]],
                       cw, row_h=7 * mm))

    blocks.append(P("Services", "h2"))
    blocks.append(fields(["Sockets now / planned", "Switches", "Light points",
                          "Radiators / heaters", "Network / aerial"], w))
    if room:
        blocks.append(P(f"Check in the {room.lower()}", "h2"))
        blocks.append(checks(ROOM_CHECKS[room], w, cols=2))
    else:
        blocks.append(P("Room-specific checks", "h2"))
        blocks.append(lined(3, w))
    blocks.append(P("Photos taken", "h2"))
    blocks.append(checks(["Before: every wall, the floor and the ceiling",
                          "Inside the walls and floor while they are open",
                          "After: the same angles as the before photos",
                          "Labels: paint tins, tile boxes, appliance plates"], w, cols=2))
    blocks.append(P("Notes", "h2"))
    blocks.append(FillLines(w))
    return blocks


def room_checklist(paper):
    sh = Sheet("room-by-room-renovation-checklist", "Room-by-room checklist", paper)
    story = []
    rooms = list(ROOM_CHECKS) + [None]
    for i, room in enumerate(rooms):
        if i:
            story.append(PageBreak())
        story += room_page(sh, room)
    path = sh.build(story, "Room-by-room renovation checklist",
                    "One printable page per room: measurements, finishes, services and photos.")
    return path, {"rooms": list(ROOM_CHECKS), "checksPerRoom": len(next(iter(ROOM_CHECKS.values())))}


# --------------------------------------------------------------------------
# 4. Contractor quote comparison
# --------------------------------------------------------------------------
def quote_comparison(paper):
    sh = Sheet("contractor-quote-comparison", "Contractor quote comparison", paper, "landscape")
    w = sh.width
    rows_src = quote_rows()
    story = [
        P("Contractor quote comparison", "title"),
        P("One column per contractor, one row per line. Leave a cell empty when the quote does not "
          "mention it, and treat empty as unclear, not as included. Compare the adjusted totals, "
          "not the first ones.", "lede"),
        fields(["Job / scope page", "Date scope sent", "Quotes due by"], w * 0.75, 3),
        Spacer(1, 2 * mm),
    ]
    first = w * 0.25
    bid = (w - first) / 3
    head_rows = [[P(x, "cellb"), "", "", ""] for x in ["Contractor", "Phone / email", "Date received"]]
    body_rows = [[P(r, "cellb"), "", "", ""] for r in rows_src]
    sep = [("LINEBELOW", (0, len(head_rows)), (-1, len(head_rows)), 0.9, INK)]
    story.append(StretchGrid(["", "Bid A", "Bid B", "Bid C"], head_rows + body_rows,
                             [first, bid, bid, bid], max_h=9 * mm, bold_last=True, extra=sep))

    story.append(PageBreak())
    story.append(P("Price the gaps", "title"))
    story.append(P("List every exclusion, \"by others\" and low allowance from page 1, and put a rough "
                   "price on it for each bid that leaves it out. Add the gaps to the written total.", "lede"))
    gaps = grid(["Gap (exclusion or allowance shortfall)", "Bid A", "Bid B", "Bid C"],
                [[""] * 4 for _ in range(6)] +
                [[P("Written total", "cellb"), "", "", ""],
                 [P("+ gaps", "cellb"), "", "", ""],
                 [P("Adjusted total", "cellb"), "", "", ""]],
                [w * 0.34] + [w * 0.22] * 3,
                row_h=6.6 * mm, bold_last=True)
    story.append(gaps)
    story.append(P("Questions for your top two, answered in writing", "h2"))
    qw = (w - w * 0.36) / 2
    story.append(StretchGrid(["Question", "Bid ___", "Bid ___"],
                             [[P(q), "", ""] for q in quote_questions()],
                             [w * 0.36, qw, qw], max_h=12 * mm, reserve=16 * mm))
    story.append(Spacer(1, 3 * mm))
    story.append(fields(["Chosen", "Why", "Signed on", "Deposit paid"], w, weights=[2, 4, 1.4, 1.4]))
    path = sh.build(story, "Contractor quote comparison",
                    "A printable sheet for levelling three contractor quotes line by line.")
    return path, {"rows": len(rows_src), "questions": len(quote_questions())}


# --------------------------------------------------------------------------
def preview(pdf: Path, out: Path) -> None:
    """Page 1 as a WebP for the landing page."""
    import fitz  # pymupdf
    from PIL import Image

    page = fitz.open(pdf)[0]
    pix = page.get_pixmap(dpi=110, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(out, "WEBP", quality=82, method=6)


def main() -> None:
    import json

    import fitz

    OUT.mkdir(parents=True, exist_ok=True)
    register_fonts()
    init_styles()
    manifest = {}
    for build in [budget_sheet, punch_list, room_checklist, quote_comparison]:
        for paper in ("a4", "letter"):
            path, facts = build(paper)
            slug = path.name.rsplit("-", 1)[0]
            pages = len(fitz.open(path))
            entry = manifest.setdefault(slug, {})
            entry[paper] = {"href": f"/templates/{path.name}", "pages": pages,
                            "kb": round(path.stat().st_size / 1024), **facts}
            print(f"  {path.relative_to(ROOT)}  {pages} pp  {entry[paper]['kb']} KB  {facts}")
            if paper == "a4":
                webp = path.with_name(f"{slug}-preview.webp")
                preview(path, webp)
                entry["preview"] = f"/templates/{webp.name}"
    # The landing pages read page and line counts from here, so the copy
    # cannot claim a number the file does not have.
    (ROOT / "src" / "data" / "templateFiles.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
