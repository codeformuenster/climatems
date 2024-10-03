from openpyxl import load_workbook
import json
from pathlib import Path

# valid rows start with one of these prefixes
# rows that start with something different will be appended to the previous one
ROW_TITLE_PREFIXES = [
    "Titel",
    "Kurzbeschreibung",
    "Federführung",
    "Sachstand",
    "Plan 2025",
    "Kosten",
    "CO2-Reduktionspo",
    "Indikatoren (Gesamtmaßnahme)",
    "!",  # Wirtschaftsplanung
    "Informationen zu",
    "Haushaltsansätze/ Planung",
    "Teilfinanzplan",
    "Teilergebnisplan",
]

results = {}

# iterate through the excel files
for excel_path in Path(
    "data/raw/Sachstandbericht_Klima_plus_Haushaltsinformationen/"
).glob("*.xlsx"):
    # open the file
    wb = load_workbook(excel_path)

    # collect results for this file here
    results_file = {}

    # go through the sheets (one measure per sheet)
    for sheetname in wb.sheetnames:
        result_sheet = {}
        ws = wb[sheetname]

        current_row_start = 1
        current_row_end = 1

        # first we check how many excel rows the current table row has by going down until we hit one of the valid prefixes
        while current_row_start < ws.max_row:
            while current_row_end < ws.max_row:
                next_row = current_row_end + 1
                if not any(
                    [
                        ws.cell(next_row, 1).value is not None
                        and ws.cell(next_row, 1).value.startswith(prefix)
                        for prefix in ROW_TITLE_PREFIXES
                    ]
                ):
                    # belongs to former row
                    current_row_end = next_row
                else:
                    break

            # join together the title
            title = "".join(
                [
                    ws.cell(row, 1).value
                    for row in range(current_row_start, current_row_end + 1)
                    if ws.cell(row, 1).value is not None
                ]
            ).strip()

            # join together the value
            value = ""
            for row in range(current_row_start, current_row_end + 1):
                for col in range(2, ws.max_column + 1):
                    if ws.cell(row, col).value is not None:
                        value += str(ws.cell(row, col).value)

                value += "\n"

            # remove unneeded whitespaces and newlines
            value = value.strip()

            result_sheet[title] = value

            # go to the next row
            current_row_start = current_row_end + 1
            current_row_end = current_row_start

        results_file[result_sheet["Titel"]] = result_sheet

    results[excel_path.stem] = results_file

with open(
    "data/parsed/Sachstandbericht_Klima_plus_Haushaltsinformationen.json",
    "w",
    encoding="utf-8",
) as fp:
    json.dump(results, fp, ensure_ascii=False, indent=2)
