---
title: "Una constructora que dejó de capturar a mano"
summary: "Facturas de proveedores, entregas de concreto, recibos y trabajos de cinco sistemas distintos, juntos en una sola base y con avisos diarios por Telegram."
lang: es
translationKey: construction-ops
order: 1
featured: true
industry: "Construcción (Iowa, EE. UU.)"
problem: "La información de la empresa vivía en cinco plataformas que no se hablaban entre sí: el sistema de trabajos, el de entregas de concreto, el de asistencia del personal, el portal de un constructor y el correo donde llegaban las facturas. Para saber qué se había hecho, qué faltaba cobrar y qué estaba mal facturado, alguien tenía que abrir todo y comparar a mano."
system:
  - "Las facturas en PDF que llegan por correo se leen solas con IA: proveedor, fecha, obra y montos quedan guardados sin capturar nada."
  - "Las fotos de recibos se mandan a un bot de Telegram; la IA saca los datos y la persona solo confirma con un botón."
  - "Cada pocos minutos el sistema trae las entregas de concreto, los trabajos y los calendarios de las otras plataformas y los junta en una sola base de datos."
  - "Cruza la información y avisa lo que nadie ve a simple vista: obra hecha sin facturar, factura con dirección equivocada, entregas sin trabajo asignado."
  - "Cada mañana manda por Telegram el plan del día y los pendientes."
results:
  - "5 sistemas conectados en una sola base de datos"
  - "7,859 conceptos de 1,793 trabajos sincronizados"
  - "3,095 fotos de obra guardadas en un archivo privado"
  - "Plan del día por Telegram a las 8:00, con máximo 3 pendientes"
stack: ["Node.js", "Supabase (PostgreSQL)", "OpenAI", "Telegram", "Render"]
---

Es el sistema más grande que he construido y sigue creciendo: empezó leyendo recibos y hoy conecta casi toda la operación. La regla desde el principio fue que nadie cambiara su forma de trabajar: el sistema se adapta a las herramientas que el equipo ya usaba.
