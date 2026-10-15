# Checklist de lanzamiento y SEO

Lo que Moisés hace fuera del código, en este orden.

## 1. Publicar gratis en Cloudflare Pages
- [ ] Crear cuenta en dash.cloudflare.com/sign-up (gratis).
- [ ] Workers & Pages → Create → pestaña **Pages** → **Connect to Git** → autorizar GitHub y elegir `moises-portfolio`.
- [ ] Nombre del proyecto: **moisesdelvalle** (así la dirección queda `moisesdelvalle.pages.dev`; si cambia, actualizar `site` en `astro.config.mjs`).
- [ ] Framework preset: **Astro** · Build command: `npm run build` · Build output directory: `dist`.
- [ ] Production branch: `main`. Cada PR tiene su vista previa automática.
- [ ] Cuando el sitio nuevo esté publicado: desactivar GitHub Pages (Settings → Pages) y borrar el proyecto de Vercel.

## 2. Dominio (cuando se compre)
- [ ] Cloudflare → Domain Registration → Register Domains → **moisesdelvalle.com** (alrededor de USD 10 al año, sin margen de reventa).
- [ ] Workers & Pages → moisesdelvalle → Custom domains → agregar `moisesdelvalle.com` y `www.moisesdelvalle.com` (Cloudflare pone el DNS solo).
- [ ] Cambiar `site` en `astro.config.mjs` a `https://moisesdelvalle.com` y publicar.
- [ ] Redirigir `moisesdelvalle.pages.dev` al dominio (Bulk Redirects en Cloudflare) para no tener dos copias en Google.

## 3. Google Search Console
- [ ] search.google.com/search-console → Agregar propiedad → tipo **Dominio** → `moisesdelvalle.com` (antes de tener dominio: tipo **Prefijo de URL** con `https://moisesdelvalle.pages.dev/`).
- [ ] Verificar con el registro `TXT` en el DNS del dominio (o, con pages.dev, con la etiqueta HTML que da Google).
- [ ] Sitemaps → enviar `/sitemap-index.xml` del sitio.
- [ ] Inspección de URLs → pedir indexación de `/` y `/en/`.

## 4. Perfil de Negocio de Google
- [ ] business.google.com → crear perfil como **negocio de servicios sin ubicación física para clientes** (no muestra tu dirección).
- [ ] Categoría: "Consultor de software" o "Desarrollador de software". Zona: Morelia y alrededores (Google solo permite zonas locales).
- [ ] Sitio web: `https://moisesdelvalle.com`. Teléfono: el de WhatsApp.
- [ ] Pedir reseñas a clientes reales cuando terminen un proyecto.

## 5. Bing Webmaster Tools
- [ ] bing.com/webmasters → **Importar desde Google Search Console** (un clic, trae todo).

## 6. Redes
- [ ] Crear el Instagram nuevo y poner el enlace en `SITE.instagram` (`src/lib/site.ts`).
- [ ] Actualizar LinkedIn: titular "Automatización con IA para negocios" y el enlace al sitio.
- [ ] Probar cómo se ve el enlace al compartirlo: pegar la URL en WhatsApp o en opengraph.xyz.

## 7. Después del lanzamiento
- [ ] Publicar un artículo nuevo cada dos semanas (español primero).
- [ ] Revisar Search Console una vez al mes: qué búsquedas traen visitas y qué páginas no aparecen.
