---
title: "Un portal privado para cada cliente constructor"
summary: "En lugar de mandar reportes por correo, cada constructor abre su propio enlace y ve el estado de sus obras, actualizado solo."
lang: es
translationKey: builder-portal
order: 2
featured: true
industry: "Construcción (Iowa, EE. UU.)"
problem: "Los constructores que contratan a la empresa preguntaban por teléfono y correo en qué iba cada casa. Responder implicaba buscar en varios sistemas y armar un reporte que a la semana ya estaba viejo."
system:
  - "Cada constructor tiene un enlace privado, sin usuario ni contraseña que recordar."
  - "La página muestra solo sus obras: qué se hizo, cuándo, qué está programado y qué está facturado."
  - "Los datos salen de la misma base que alimenta la operación, así que siempre están al día."
  - "Un permiso de solo lectura en la base de datos garantiza que cada cliente ve únicamente lo suyo."
results:
  - "180 registros de obra visibles en vivo para el constructor"
  - "Sin usuario ni contraseña: un enlace privado por cliente"
  - "Los datos se actualizan solos desde la operación"
stack: ["React", "Supabase (PostgreSQL)", "Vercel"]
---

Es una extensión del sistema de operación de la misma constructora. Lo que antes era un reporte que alguien armaba a mano ahora es una página que el cliente consulta cuando quiere.
