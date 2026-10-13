# TrueTime: Accurate Agent Productivity Reporting

TrueTime automates hourly agent productivity reporting by correcting talk time and break time recorded incorrectly in Ozonetel.

## Business Problem

Meetings, video consultations (VCs), and WhatsApp calls were recorded as breaks, making agent productivity reports inaccurate. MIS spent approximately **2.5 hours daily** correcting 10 reports manually.

## Solution

TrueTime automates adjustments, calculates productivity KPIs, and posts hourly reports for Gurgaon (GGN) and Hyderabad (HYD) Sales and Helpline teams.

### Key Features

* Automated hourly productivity reports.
* Agent-wise talk-time and break adjustments.
* 40-minute daily meeting adjustment.
* Traceable adjustment records.
* Automated report delivery through Google Chat.
* Privacy-focused reporting using agent-level totals.

## Workflow

1. Agents submit adjustment requests through Google Forms.
2. Google Apps Script exports agent-wise totals to CSV.
3. Python scripts process Ozonetel data and apply adjustments.
4. Productivity KPIs are calculated.
5. Reports are posted to branch-specific Google Chat spaces.

## KPI Definitions

| KPI                | Formula                                                         |
| ------------------ | --------------------------------------------------------------- |
| Adjusted Talk Time | Raw talk time + approved VC / WhatsApp minutes                  |
| Adjusted Break     | Raw break − meeting adjustment − approved VC / WhatsApp minutes |
| Occupancy %        | Adjusted talk ÷ (login − adjusted break − meeting) × 100        |
| Connectivity %     | Answered calls ÷ total calls dialed × 100                       |

## Results

* **~2.5 hours of manual work saved daily.**
* More consistent hourly reporting.
* Fairer agent productivity evaluation.
* Improved traceability and patient-data privacy.

Sample data shows average break time decreasing from **124 to 65 minutes** after adjustments.

## Repository Structure

```text
apps_script/   Google Apps Script and setup notes
scripts/       Sample-data generator and diagram builder
sample_data/   Synthetic datasets and productivity reports
docs/          BRD, architecture, and process diagrams
```

## Generate Sample Data

```bash
python scripts/generate_sample_data.py
```

This regenerates the synthetic sample datasets.

## Future Improvements

* Validate supporting screenshots and detect duplicate requests.
* Attribute adjustments to the actual call date.
* Standardize duration input formats.
* Introduce dedicated Ozonetel reason codes for meetings and VCs.

## Tech Stack

Google Forms · Google Sheets · Google Apps Script · Python · pandas · Ozonetel CloudAgent API · Google Chat Webhooks · Google Drive for Desktop

## Data Privacy

All repository sample data is synthetic. No real agent, patient, or company data is included.
