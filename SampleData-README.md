# TrueTime – Sample Data

This folder contains **synthetic sample data** for the TrueTime agent productivity reporting project. The data is generated using `scripts/generate_sample_data.py` with a fixed seed, making it reproducible.

No real agents, patients, or phone numbers are used.

## Dataset Overview

The sample covers **16 agents across Gurgaon (GGN) and Hyderabad (HYD), Sales and Helpline teams**, over 12 working days from 14–26 September 2026, with 188 agent-days.

| File                             | Description                                                        | Rows |
| -------------------------------- | ------------------------------------------------------------------ | ---: |
| `agents.csv`                     | Agent master and Ozonetel login mapping                            |   16 |
| `ozonetel_agent_summary_raw.csv` | Raw daily agent summaries from Ozonetel                            |  188 |
| `ozonetel_break_log_raw.csv`     | Break entries and reason codes                                     |  904 |
| `adjustment_form_responses.csv`  | VC / WhatsApp adjustment requests and status                       |  139 |
| `adjustments_audit_log.csv`      | Applied adjustments, including meeting rules and approved requests |  315 |
| `agent_productivity_report.csv`  | Final daily report with raw and adjusted KPIs                      |  188 |

## KPI Definitions

| KPI                  | Formula                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| Adjusted Talk Time   | Raw talk time + approved VC / WhatsApp minutes                            |
| Adjusted Break       | Raw break − 40-minute meeting adjustment − approved VC / WhatsApp minutes |
| Raw Occupancy %      | Raw talk time ÷ (login time − raw break) × 100                            |
| Adjusted Occupancy % | Adjusted talk time ÷ (login time − adjusted break − meeting) × 100        |
| Connectivity %       | Answered calls ÷ total calls dialed × 100                                 |

## Key Findings

* **Average break:** Reduced from 124 minutes to 65 minutes per agent.
* **Average talk time:** Increased from 199 minutes to 218 minutes per agent.
* **Form requests:** 12 of 139 requests (9%) were rejected due to missing proof or duplicates.

These results illustrate how verified adjustments can improve the accuracy of agent productivity reporting.
