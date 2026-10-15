// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://moisesdelvalle.com',
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
