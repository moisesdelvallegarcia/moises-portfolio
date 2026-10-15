# moisesdelvalle.com

Sitio personal de **Moisés Del Valle García**: automatización con IA para negocios en México y Estados Unidos.
Bilingüe: español en `/` e inglés en `/en/`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # revisa tipos y genera dist/
npm run preview  # sirve dist/ para probar el resultado final
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, Instagram, correo, días y cupo del demo | `src/lib/site.ts` (`SITE`) |
| Textos del menú y botones | `src/lib/site.ts` (`UI`) |
| Textos de cada página | `src/views/<Página>.astro`, en el bloque `copy` (español y inglés juntos) |
| Un caso del portafolio | `src/content/projects/es/*.md` y `src/content/projects/en/*.md` |
| Un artículo del blog | `src/content/blog/es/*.md` y `src/content/blog/en/*.md` |
| Colores y letras | `src/styles/global.css` (`@theme`) |
| Foto | `src/assets/moises.jpg` |

### Agregar un artículo

Crea `src/content/blog/es/mi-articulo.md` con este encabezado:

```yaml
---
title: "Título de máximo 60 caracteres"
description: "Resumen de 140 a 160 caracteres para Google."
pubDate: 2026-11-01
lang: es
keywords: ["palabra clave principal", "otra"]
translationKey: "mi-articulo"   # opcional: el mismo valor en la versión en inglés las enlaza
---
```

Si el artículo termina con `## Preguntas frecuentes` (o `## FAQ`) y preguntas en `### …?`, se publican también como datos estructurados para Google.

### Resultados de los casos

Si un caso no tiene un resultado medido, `results: []` muestra un marcador visible `[RESULTADO…]`.
Cuando tengas el dato real, agrégalo así: `results: ["Ya no se captura ninguna factura a mano"]`.

## Stack

Astro 6 + TypeScript + Tailwind CSS 4. Sitio estático, sin servidor ni variables de entorno.
Las imágenes para redes sociales (`/og/*.png`) se generan al compilar con satori.
