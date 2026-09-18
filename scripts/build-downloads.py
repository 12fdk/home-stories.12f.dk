#!/usr/bin/env python3
"""Generate the two free downloads from the blog posts that describe them.

Both posts promise a file and then tell the reader to build it themselves:
`renovation-budget-template.md` says "Create the sheet. Six columns...", and
`renovation-checklist-printable.md` has "printable" in the title with nothing
to print. This script closes that gap, and reads the posts as its source so
the files cannot drift away from the articles that link to them. #119

Outputs (committed to the repo, not built in CI):
  public/downloads/renovation-budget-template.csv   plain, opens anywhere
  public/downloads/renovation-budget-template.xlsx  live contingency cell
  public/downloads/renovation-checklist.pdf         A4, tick boxes, print-first

Re-run it after editing either post:  python3 scripts/build-downloads.py
"""
from __future__ import annotations

import csv
import io
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG = ROOT / "src" / "content" / "blog"
OUT = ROOT / "public" / "downloads"
SITE = "home-stories.12f.dk"

# The one honest line each asset closes on. The argument is already made in
# renovation-spreadsheet-alternative.md; repeating it here means neither file
# can be passed around without it.
CLOSING_SHEET = (
    "This template is the right tool for planning. It stops being the right "
    "tool once the work starts and costs arrive faster than you update rows — "
    "that is what Home Stories is for. Free on the App Store."
)
CLOSING_LIST = (
    "A printed list is the right tool for the wall. It is the wrong tool on "
    "the scaffold, at the merchant, or six months later when the insurer asks "
    "what was behind the wall — that is what Home Stories is for. Free on the "
    "App Store."
)


def strip_md(text: str) -> str:
    """Markdown inline -> plain text. Links keep their label, not their URL."""
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return text.strip()


def body(path: Path) -> str:
    """Post body with the YAML frontmatter removed."""
    raw = path.read_text(encoding="utf-8")
    return raw.split("---", 2)[2] if raw.startswith("---") else raw


# --------------------------------------------------------------------------
# Budget template: the 9 cost categories, parsed from "### 1. Design & permits"
# --------------------------------------------------------------------------
def parse_categories() -> list[tuple[str, list[str]]]:
    categories: list[tuple[str, list[str]]] = []
    current: tuple[str, list[str]] | None = None
    in_section = False

    for line in body(BLOG / "renovation-budget-template.md").splitlines():
        if line.startswith("## "):
            in_section = line.startswith("## The 9 cost categories")
            if not in_section and current:
                categories.append(current)
                current = None
            continue
        if not in_section:
            continue

        heading = re.match(r"^### \d+\.\s+(.*)$", line)
        if heading:
            if current:
                categories.append(current)
            current = (strip_md(heading.group(1)), [])
            continue

        item = re.match(r"^- (?!\[)(.*)$", line)
        if item and current:
            label = strip_md(item.group(1))
            # "Why it matters" commentary and the prose under Furniture /
            # Contingency are explanation, not line items.
            if label and not label.lower().startswith("why it matters"):
                current[1].append(label)

    if current:
        categories.append(current)
    return [(name, items) for name, items in categories if items]


COLUMNS = [
    "Category", "Item", "Supplier",
    "Low quote", "Mid quote", "High quote",
    "Actual paid", "Date paid", "VAT",
]


def write_csv(categories) -> None:
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(["Renovation budget template", f"https://{SITE}/blog/renovation-budget-template/"])
    w.writerow([])
    w.writerow(["Contingency %", "20%", "Set this to match the age of the house — see the post."])
    w.writerow([])
    w.writerow(COLUMNS)
    for name, items in categories:
        for item in items:
            w.writerow([name, item, "", "", "", "", "", "", ""])
    w.writerow([])
    w.writerow([CLOSING_SHEET])
    (OUT / "renovation-budget-template.csv").write_text(buf.getvalue(), encoding="utf-8")


def write_xlsx(categories) -> None:
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
    from openpyxl.utils import get_column_letter

    wb = Workbook()
    ws = wb.active
    ws.title = "Budget"

    accent = "FFC300"
    head_font = Font(bold=True, size=11)
    title_font = Font(bold=True, size=16)
    hairline = Side(style="thin", color="D4D4D4")
    box = Border(bottom=hairline)

    ws["A1"] = "Renovation budget template"
    ws["A1"].font = title_font
    ws["A2"] = f"https://{SITE}/blog/renovation-budget-template/"
    ws["A2"].font = Font(size=9, color="808080")

    # The single cell the post promises: change it once, the figures below move.
    ws["A4"] = "Contingency %"
    ws["B4"] = 0.20
    ws["B4"].number_format = "0%"
    ws["B4"].fill = PatternFill("solid", fgColor=accent)
    ws["B4"].font = head_font
    ws["C4"] = "← set this to match the age of the house (15% post-2000 … 25% pre-1950)"
    ws["C4"].font = Font(size=9, color="808080")

    first, last = 11, 11 + sum(len(i) for _, i in categories) - 1
    summary = [
        ("Working budget (mid quotes)", f"=SUM(E{first}:E{last})"),
        ("Contingency budget", "=B5*B4"),
        ("Total incl. contingency", "=B5+B6"),
        ("Actual paid to date", f"=SUM(G{first}:G{last})"),
        ("Remaining vs total", "=B7-B8"),
    ]
    for offset, (label, formula) in enumerate(summary):
        row = 5 + offset
        ws[f"A{row}"] = label
        ws[f"B{row}"] = formula
        ws[f"B{row}"].number_format = "#,##0.00"
        ws[f"A{row}"].font = head_font if row in (7, 9) else Font(size=11)
        ws[f"B{row}"].font = head_font if row in (7, 9) else Font(size=11)

    for col, name in enumerate(COLUMNS, start=1):
        cell = ws.cell(row=10, column=col, value=name)
        cell.font = head_font
        cell.border = Border(bottom=Side(style="medium", color=accent))

    row = first
    for name, items in categories:
        for item in items:
            ws.cell(row=row, column=1, value=name)
            ws.cell(row=row, column=2, value=item)
            for col in (4, 5, 6, 7):
                ws.cell(row=row, column=col).number_format = "#,##0.00"
            ws.cell(row=row, column=8).number_format = "yyyy-mm-dd"
            for col in range(1, len(COLUMNS) + 1):
                ws.cell(row=row, column=col).border = box
            row += 1

    for col, width in enumerate([26, 46, 20, 13, 13, 13, 13, 13, 10], start=1):
        ws.column_dimensions[get_column_letter(col)].width = width
    ws.freeze_panes = "A11"

    close = ws.cell(row=row + 2, column=1, value=CLOSING_SHEET)
    close.font = Font(size=9, color="808080")
    close.alignment = Alignment(wrap_text=True, vertical="top")
    ws.merge_cells(start_row=row + 2, start_column=1, end_row=row + 3, end_column=6)

    # Second sheet: per-category totals, driven by the categories above so a
    # deleted row cannot leave a stale subtotal behind.
    s = wb.create_sheet("By category")
    for col, name in enumerate(["Category", "Mid quote", "Actual paid", "Difference"], start=1):
        cell = s.cell(row=1, column=col, value=name)
        cell.font = head_font
        cell.border = Border(bottom=Side(style="medium", color=accent))
    for i, (name, _) in enumerate(categories, start=2):
        s.cell(row=i, column=1, value=name)
        s.cell(row=i, column=2, value=f"=SUMIF(Budget!$A${first}:$A${last},A{i},Budget!$E${first}:$E${last})")
        s.cell(row=i, column=3, value=f"=SUMIF(Budget!$A${first}:$A${last},A{i},Budget!$G${first}:$G${last})")
        s.cell(row=i, column=4, value=f"=C{i}-B{i}")
        for col in (2, 3, 4):
            s.cell(row=i, column=col).number_format = "#,##0.00"
    for col, width in enumerate([30, 16, 16, 16], start=1):
        s.column_dimensions[get_column_letter(col)].width = width

    wb.save(OUT / "renovation-budget-template.xlsx")


# --------------------------------------------------------------------------
# Phase checklist: "## Phase N — Title", "### Subsection", "- [ ] task"
# --------------------------------------------------------------------------
def parse_phases() -> list[tuple[str, list[tuple[str | None, list[str]]]]]:
    phases: list[tuple[str, list[tuple[str | None, list[str]]]]] = []
    phase: tuple[str, list] | None = None
    group: tuple[str | None, list[str]] | None = None

    for line in body(BLOG / "renovation-checklist-printable.md").splitlines():
        if line.startswith("## "):
            if group and group[1] and phase:
                phase[1].append(group)
            group = None
            if phase and phase[1]:
                phases.append(phase)
            title = strip_md(line[3:])
            phase = (title, []) if title.lower().startswith("phase") else None
            continue

        if line.startswith("### ") and phase:
            if group and group[1]:
                phase[1].append(group)
            group = (strip_md(line[4:]), [])
            continue

        task = re.match(r"^- \[ \]\s+(.*)$", line)
        if task and phase:
            if group is None:
                group = (None, [])
            group[1].append(strip_md(task.group(1)))

    if group and group[1] and phase:
        phase[1].append(group)
    if phase and phase[1]:
        phases.append(phase)
    return phases


def write_pdf(phases) -> None:
    """A4 checklist with real, tickable boxes.

    The boxes are drawn as table-cell borders rather than set as a character:
    the ballot-box glyph is absent from the base-14 fonts and silently
    substitutes to a filled block, which cannot be ticked with a pen.
    """
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.units import mm
    from reportlab.graphics.shapes import Drawing, Rect
    from reportlab.platypus import (
        BaseDocTemplate, CondPageBreak, Frame, PageTemplate, Paragraph,
        Spacer, Table, TableStyle,
    )

    accent = colors.HexColor("#FFC300")
    ink = colors.HexColor("#14181C")
    muted = colors.HexColor("#6B7280")
    rule = colors.HexColor("#9CA3AF")

    title = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=22,
                           leading=25, textColor=ink, spaceAfter=3)
    lede = ParagraphStyle("lede", fontName="Helvetica", fontSize=9.5, leading=13,
                          textColor=muted, spaceAfter=12)
    phase_style = ParagraphStyle("phase", fontName="Helvetica-Bold", fontSize=13,
                                 leading=16, textColor=ink, spaceBefore=11, spaceAfter=4)
    group_style = ParagraphStyle("group", fontName="Helvetica-Bold", fontSize=8.5,
                                 leading=11, textColor=muted, spaceBefore=7, spaceAfter=2)
    task = ParagraphStyle("task", fontName="Helvetica", fontSize=10, leading=13.5,
                          textColor=ink)
    foot = ParagraphStyle("foot", fontName="Helvetica", fontSize=8, leading=11,
                          textColor=muted)

    def furniture(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(accent)
        canvas.setLineWidth(2)
        canvas.line(18 * mm, A4[1] - 14 * mm, 34 * mm, A4[1] - 14 * mm)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(muted)
        canvas.drawString(38 * mm, A4[1] - 15.4 * mm, "RENOVATION PHASE CHECKLIST")
        canvas.drawRightString(A4[0] - 18 * mm, A4[1] - 15.4 * mm, SITE.upper())
        canvas.drawString(18 * mm, 12 * mm, f"Free from {SITE}")
        canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f"Page {doc.page}")
        canvas.restoreState()

    doc = BaseDocTemplate(
        str(OUT / "renovation-checklist.pdf"), pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=22 * mm, bottomMargin=18 * mm,
        title="Renovation Phase Checklist", author="Robert Jensen",
        subject="A phase-ordered renovation checklist you can print and tick off.",
    )
    doc.addPageTemplates([PageTemplate(
        id="body",
        frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")],
        onPage=furniture,
    )])

    box = 3.3 * mm
    col = [box + 3.5 * mm, doc.width - box - 3.5 * mm]
    task_table = TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        # Nudge the square down onto the text baseline rather than the ascender.
        ("TOPPADDING", (0, 0), (0, -1), 3.6),
    ])

    def checkbox():
        """One separated square per task, drawn rather than set as a glyph."""
        d = Drawing(box, box)
        d.add(Rect(0, 0, box, box, strokeColor=rule, strokeWidth=0.6, fillColor=None))
        return d

    def rows(tasks):
        table = Table(
            [[checkbox(), Paragraph(t, task)] for t in tasks],
            colWidths=col, style=task_table,
        )
        table.hAlign = "LEFT"
        return table

    story = [
        Paragraph("Renovation phase checklist", title),
        Paragraph(
            "Work it in phase order, not room order — trades want to do first-fix "
            "work across every room in one visit, before any walls close up. Tick "
            "the cheap early tasks first: they are two-minute jobs with "
            "weeks-long consequences if skipped.", lede),
    ]

    for name, groups in phases:
        # Never leave a phase heading stranded at the foot of a page.
        story.append(CondPageBreak(28 * mm))
        story.append(Paragraph(name, phase_style))
        for group_name, tasks in groups:
            if group_name:
                story.append(Paragraph(group_name.upper(), group_style))
            story.append(rows(tasks))

    story += [
        Spacer(1, 9 * mm),
        Paragraph(CLOSING_LIST, foot),
        Paragraph(f"Full guide: https://{SITE}/blog/renovation-checklist-printable/", foot),
    ]
    doc.build(story)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    categories = parse_categories()
    assert len(categories) >= 6, f"expected the post's cost categories, parsed {len(categories)}"
    write_csv(categories)
    write_xlsx(categories)

    phases = parse_phases()
    assert len(phases) >= 5, f"expected Phase 0-5, parsed {len(phases)}"
    write_pdf(phases)

    items = sum(len(i) for _, i in categories)
    tasks = sum(len(t) for _, groups in phases for _, t in groups)
    print(f"budget template: {len(categories)} categories, {items} line items")
    print(f"checklist:       {len(phases)} phases, {tasks} tasks")
    for f in sorted(OUT.iterdir()):
        print(f"  {f.relative_to(ROOT)}  {f.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
