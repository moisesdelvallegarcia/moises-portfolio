---
title: "A contractor that stopped doing data entry"
summary: "Supplier invoices, concrete deliveries, receipts and jobs from five different systems, pulled into one database with daily Telegram alerts."
lang: en
translationKey: construction-ops
order: 1
featured: true
industry: "Construction (Iowa, US)"
problem: "The company's information lived in five platforms that didn't talk to each other: the job system, the concrete delivery system, crew time tracking, a builder's portal and the inbox where invoices arrived. Knowing what got done, what still needed billing and what was billed wrong meant opening everything and comparing by hand."
system:
  - "Invoice PDFs that arrive by email are read by AI: vendor, date, job and amounts are saved with zero typing."
  - "Receipt photos go to a Telegram bot; AI pulls the details and the person just taps to confirm."
  - "Every few minutes the system pulls concrete deliveries, jobs and schedules from the other platforms into one database."
  - "It cross-checks everything and flags what nobody would catch by eye: work done but not invoiced, invoices with the wrong address, deliveries with no job attached."
  - "Every morning it sends the day's plan and open items on Telegram."
results:
  - "5 systems connected in a single database"
  - "7,859 line items from 1,793 jobs synced"
  - "3,095 job-site photos stored in a private archive"
  - "Daily plan on Telegram at 8:00 am, with 3 items max"
stack: ["Node.js", "Supabase (PostgreSQL)", "OpenAI", "Telegram", "Render"]
---

This is the largest system I've built and it keeps growing: it started by reading receipts and now connects most of the operation. The rule from day one was that nobody had to change how they work — the system adapts to the tools the crew already used.
