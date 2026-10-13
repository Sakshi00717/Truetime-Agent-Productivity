# Business Requirements Document (BRD): TrueTime

## Project Overview

  -----------------------------------------------------------------------
  Field                               Details
  ----------------------------------- -----------------------------------
  **Project**                         TrueTime: Accurate Agent
                                      Productivity Reporting

  **Author**                          Sakshi, MIS

  **Teams Covered**                   Gurgaon (GGN) and Hyderabad (HYD)
                                      --- Sales and Helpline

  **Status**                          Implemented
  -----------------------------------------------------------------------

## 1. Problem Statement

Hourly agent productivity reports from Ozonetel can overstate break time
and understate talk time. Agents may mark team meetings, video
consultations (VCs), and WhatsApp patient calls as **Break** because
suitable reason codes are unavailable.

MIS previously corrected each report manually. At approximately 15
minutes per report and 10 reports per day (9:00 AM--6:00 PM), this
required around **2.5 hours of manual work daily**.

## 2. Objectives

1.  Reduce manual corrections to hourly productivity reports.
2.  Accurately credit agents for eligible meetings, VCs, and WhatsApp
    calls.
3.  Maintain traceability for each adjustment, including supporting
    proof.
4.  Keep patient data out of productivity reports.

## 3. Stakeholders

  -----------------------------------------------------------------------
  Stakeholder                         Interest / Need
  ----------------------------------- -----------------------------------
  Agents                              Fair productivity figures and a
                                      simple way to submit VC / WhatsApp
                                      time adjustments

  Team Leads                          Accurate hourly productivity
                                      information for their teams

  Managers                            Reliable, timely reports to support
                                      performance decisions

  MIS                                 Less repetitive manual work and an
                                      auditable adjustment process
  -----------------------------------------------------------------------

## 4. Scope

**In scope** - Daily team-meeting adjustments. - VC talk-time
adjustments. - WhatsApp-call talk-time adjustments. - Hourly
productivity reporting for GGN and HYD.

**Out of scope** - Changes to Ozonetel reason codes. - Payroll or
incentive calculations. - Historical reports dated before go-live.

## 5. Functional Requirements

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  FR-1                                Agents can submit VC / WhatsApp
                                      call adjustments through a Google
                                      Form and select their name from a
                                      dropdown.

  FR-2                                The form captures the patient ID,
                                      talk time to credit, break time to
                                      remove, and a screenshot as
                                      supporting proof.

  FR-3                                Each hour, the system totals the
                                      day's approved adjustments for each
                                      agent.

  FR-4                                Only agent name, talk time, and
                                      break time are passed to the
                                      productivity report; patient
                                      details remain in the form-response
                                      sheet.

  FR-5                                A fixed 40-minute meeting
                                      adjustment is applied for every
                                      agent each day.

  FR-6                                Adjustments are applied before
                                      productivity KPIs are calculated.

  FR-7                                The report is posted to each
                                      branch's Google Chat space hourly,
                                      from 9:00 AM to 6:00 PM.

  FR-8                                Late submissions are included if
                                      received before the final run of
                                      the day.
  -----------------------------------------------------------------------

## 6. Non-Functional Requirements

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  NFR-1                               Credentials, including API tokens
                                      and webhook URLs, are stored
                                      outside the code.

  NFR-2                               A failed run must not post partial
                                      figures.

  NFR-3                               Setup and operating instructions
                                      are documented so another MIS team
                                      member can maintain the process.
  -----------------------------------------------------------------------

## 7. KPI Definitions

  -----------------------------------------------------------------------
  KPI                                 Definition
  ----------------------------------- -----------------------------------
  **Login Time**                      Time from the first login to the
                                      last logout recorded in Ozonetel.

  **Adjusted Talk Time**              Ozonetel talk time + approved VC /
                                      WhatsApp minutes.

  **Adjusted Break**                  Ozonetel break − 40-minute meeting
                                      adjustment − approved VC / WhatsApp
                                      minutes; the result must not be
                                      below zero.

  **Occupancy %**                     Adjusted talk time ÷ (login time −
                                      adjusted break − meeting) × 100.

  **Connectivity %**                  Answered calls ÷ total calls dialed
                                      × 100.
  -----------------------------------------------------------------------

## 8. Success Metrics

  -----------------------------------------------------------------------
  Metric                  Before                  Target
  ----------------------- ----------------------- -----------------------
  Manual processing time  Approximately 2.5 hours Exceptions only
  per day                 (10 reports × 15        
                          minutes)                

  Reports posted on       Dependent on MIS        10 out of 10 daily
  schedule                availability            reports

  Adjustments supported   No consistent proof     100%
  by proof                record                  
  -----------------------------------------------------------------------

## 9. Known Gaps and Next Steps

1.  Validate supporting proof and identify duplicate submissions before
    applying an adjustment.
2.  Match adjustments to the date of the call rather than the submission
    date.
3.  Standardize the duration field to accept one consistent format.
4.  Propose dedicated Ozonetel reason codes for meetings and VCs.

------------------------------------------------------------------------

**Document purpose:** Define the requirements for TrueTime, a process
intended to improve the accuracy and consistency of agent productivity
reporting while reducing manual corrections and limiting the exposure of
patient data.
