---
title: "Un calendario que se copia solo, todos los días"
summary: "Un servicio pequeño que entra a un portal web, lee el calendario de actividades y lo guarda en una base de datos, registrando cualquier cambio."
lang: es
translationKey: calendar-sync
order: 4
featured: false
industry: "Construcción (Iowa, EE. UU.)"
problem: "Un cliente publica su calendario de actividades en un portal web que no permite exportar nada. Para enterarse de un cambio de fecha había que entrar, revisar desarrollo por desarrollo y compararlo contra lo que uno recordaba."
system:
  - "Una vez al día el servicio inicia sesión en el portal, como lo haría una persona."
  - "Lee el calendario mes por mes, de todos los desarrollos."
  - "Guarda las actividades en la base de datos y marca las que se movieron o desaparecieron."
  - "Cada cambio queda registrado con fecha, para poder consultar el historial."
results: []
stack: ["Python", "Supabase (PostgreSQL)", "Render"]
---

Es el ejemplo más claro de lo que hago: una tarea que alguien hacía a mano, con riesgo de que se le pasara algo, convertida en algo que pasa sola cada mañana.
