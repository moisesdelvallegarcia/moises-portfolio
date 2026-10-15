# Checklist de lanzamiento y SEO

Lo que Moisés hace fuera del código, en este orden.

## 1. Dominio
- [ ] Comprar **moisesdelvalle.com** (Namecheap, Cloudflare o GoDaddy; alrededor de USD 12 al año).
- [ ] En Vercel: proyecto → Settings → Domains → agregar `moisesdelvalle.com` y `www.moisesdelvalle.com`.
- [ ] En el lugar donde compraste el dominio, poner los registros DNS que Vercel te muestre (normalmente un `A` a `76.76.21.21` y un `CNAME` de `www` a `cname.vercel-dns.com`).
- [ ] Si algún día cambia el dominio, actualizar `site` en `astro.config.mjs`, `SITE.url` en `src/lib/site.ts` y `public/robots.txt`.

## 2. Vercel
- [ ] vercel.com → Add New → Project → importar `moises-portfolio` desde GitHub (Vercel detecta Astro solo).
- [ ] Con eso cada Pull Request tiene su vista previa automática.
- [ ] Antes de publicar con el dominio: el plan gratis (Hobby) es solo para uso no comercial; para el sitio del negocio corresponde Pro (USD 20 al mes).
- [ ] Desactivar GitHub Pages en el repo (Settings → Pages) cuando el sitio nuevo esté publicado.

## 3. Google Search Console
- [ ] search.google.com/search-console → Agregar propiedad → tipo **Dominio** → `moisesdelvalle.com`.
- [ ] Verificar con el registro `TXT` que te da Google, en el DNS del dominio.
- [ ] Sitemaps → enviar `https://moisesdelvalle.com/sitemap-index.xml`.
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
