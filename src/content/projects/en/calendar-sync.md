---
title: "A schedule that copies itself, every day"
summary: "A small service that logs into a web portal, reads the activity calendar and saves it to a database, recording every change."
lang: en
translationKey: calendar-sync
order: 4
featured: false
industry: "Construction (Iowa, US)"
problem: "A client publishes their activity calendar on a web portal with no export option. Catching a date change meant logging in, checking development by development and comparing against memory."
system:
  - "Once a day the service logs into the portal, the same way a person would."
  - "It reads the calendar month by month, across every development."
  - "It saves the activities to the database and flags the ones that moved or disappeared."
  - "Every change is logged with a date, so the history can be looked up anytime."
results:
  - "Checks every development each morning, without anyone logging in"
  - "Every date change is saved with its full history"
stack: ["Python", "Supabase (PostgreSQL)", "Render"]
---

It's the clearest example of what I do: a task someone did by hand, with a real chance of missing something, turned into something that just happens every morning.
