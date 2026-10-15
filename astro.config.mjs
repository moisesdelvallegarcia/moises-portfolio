// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Dirección pública del sitio: se usa en canonical, hreflang, sitemap y robots.
  // Mientras no haya dominio propio es la dirección gratis de Cloudflare Pages;
  // al comprar moisesdelvalle.com solo se cambia esta línea.
  site: 'https://moisesdelvalle.pages.dev',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Las rutas en inglés no son espejo de las de español (/proyectos/ ↔ /en/projects/),
    // así que hreflang va en el <head> de cada página y no en el sitemap.
    sitemap({ filter: (page) => !page.includes('/og/') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
