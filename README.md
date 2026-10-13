# Ozonetel Talk Time Sync

An automated Google Apps Script that processes talk-time adjustments and break-removal requests submitted through a Google Form and exports agent-level totals to a CSV file for the Ozonetel reporting workflow.

## Overview

The script is bound to the Google Sheet that receives adjustment form responses. It runs hourly using a time-driven trigger and generates a `talktime.csv` file in the Google Drive folder named `Ozonetel Sync`.

The CSV file is synchronized to the reporting PC using Google Drive for Desktop.

## Features

* **Hourly automation:** Processes adjustment form responses automatically.
* **Today's responses only:** Filters submissions using the `Timestamp` column.
* **Agent-wise aggregation:** Adds up talk-time credits and break removals for each agent.
* **CSV export:** Generates a three-column `talktime.csv` file.
* **Automatic updates:** Overwrites the existing CSV file on each run.
* **Flexible column mapping:** Identifies required columns using header keywords, regardless of column order.
* **Privacy by design:** Exports only agent names and aggregated adjustment totals, not patient names, phone numbers, or screenshot links.

## Workflow

1. Agents submit talk-time addition or break-removal requests through the Google Form.
2. Responses are recorded in the linked Google Sheet.
3. The Apps Script runs every hour.
4. The script filters responses submitted today.
5. Talk-time credits and break-removal durations are aggregated by agent.
6. The script generates or updates `talktime.csv` in the `Ozonetel Sync` folder.
7. Google Drive for Desktop synchronizes the CSV file to the reporting PC.

## CSV Format

The exported file contains the following columns:

| Column  | Description                    |
| ------- | ------------------------------ |
| `agent` | Agent name                     |
| `talk`  | Total talk time to add         |
| `break` | Total break duration to remove |

Time values use the `HH:MM:SS` format.

Example:

```csv
agent,talk,break
Agent A,00:15:00,00:10:00
Agent B,00:08:30,00:05:00
```

*The sample agent names and durations above are illustrative.*

## Expected Form Columns

The script identifies columns using keywords in the header row.

| Header keyword            | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| `timestamp`               | Submission timestamp; used to filter today's responses |
| `talk time` or `talktime` | Talk-time duration to add                              |
| `remove break`            | Break duration to remove                               |
| `referred by`             | Agent name associated with the adjustment              |

Column order does not matter, provided the headers contain the expected keywords.

## Requirements

* A Google Form linked to a Google Sheet.
* Google Apps Script access to the linked spreadsheet.
* A Google Drive folder named `Ozonetel Sync`.
* Google Drive for Desktop installed and configured on the reporting PC.
* A time-driven trigger configured to run the script hourly.

## Setup

1. Open the Google Sheet that receives the adjustment form responses.
2. Navigate to **Extensions → Apps Script**.
3. Add the `export_talktime.gs` script to the project.
4. Review the setup instructions in the script's initial comment block.
5. Configure the required Google Drive folder and script settings.
6. Authorize the script to access the required Google services.
7. Create an hourly time-driven trigger for the export function.
8. Run the script manually once to verify that `talktime.csv` is generated correctly.
9. Confirm that the CSV appears in the `Ozonetel Sync` folder and synchronizes to the reporting PC.

**Important:** The script must be bound to, or correctly configured to access, the spreadsheet containing the form responses.

## Privacy and Security

* Patient names are not exported.
* Patient phone numbers are not exported.
* Screenshot links are not exported.
* Only agent-level adjustment totals are included in the CSV.
* No API keys or secrets are required, according to the current setup.
