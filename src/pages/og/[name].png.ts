// Imágenes para redes sociales (Open Graph), generadas al compilar: una por página.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { slugOf } from '../../lib/content';
import { SLOGAN, type Lang } from '../../lib/site';

const font = (pkg: string, file: string) =>
  readFileSync(join(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));

const fonts = [
  { name: 'Bricolage', data: font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'), weight: 800 as const },
  { name: 'Inter', data: font('inter', 'inter-latin-500-normal.woff'), weight: 500 as const },
];

const PAGES: Record<string, Record<Lang, [string, string]>> = {
  home: { es: ['Automatización con IA para negocios', SLOGAN.es], en: ['AI automation for small business', SLOGAN.en] },
  projects: { es: ['Proyectos', 'Sistemas reales, trabajando todos los días'], en: ['Projects', 'Real systems, working every day'] },
  services: { es: ['Servicios', 'Lo que puedo automatizar en tu negocio'], en: ['Services', 'What I can automate for your business'] },
  demo: { es: ['Demo gratis', 'Una automatización real para tu negocio, en 7 días'], en: ['Free demo', 'A real automation for your business, in 7 days'] },
  about: { es: ['Sobre mí', 'Hola, soy Moisés'], en: ['About', 'Hi, I’m Moisés'] },
  blog: { es: ['Blog', 'Ideas prácticas para que tu negocio trabaje solo'], en: ['Blog', 'Practical ideas to put your business on autopilot'] },
};

export const getStaticPaths = (async () => {
  const paths: { params: { name: string }; props: { kicker: string; title: string } }[] = [];
  for (const [key, langs] of Object.entries(PAGES)) {
    for (const lang of ['es', 'en'] as const) {
      paths.push({ params: { name: `${key}-${lang}` }, props: { kicker: langs[lang][0], title: langs[lang][1] } });
    }
  }
  for (const p of await getCollection('projects')) {
    paths.push({ params: { name: `project-${p.data.lang}-${slugOf(p)}` }, props: { kicker: p.data.industry, title: p.data.title } });
  }
  for (const p of await getCollection('blog')) {
    paths.push({ params: { name: `post-${p.data.lang}-${slugOf(p)}` }, props: { kicker: 'Blog', title: p.data.title } });
  }
  return paths;
}) satisfies GetStaticPaths;

// satori recibe un árbol tipo React; sin JSX se arma con objetos simples.
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title } = props as { kicker: string; title: string };
  const logo = {
    type: 'svg',
    props: {
      width: 72, height: 72, viewBox: '0 0 40 40',
      children: [
        { type: 'rect', props: { width: 40, height: 40, rx: 10, fill: '#FAF9F6' } },
        { type: 'path', props: { d: 'M10 29V12l10 10 10-10v17', fill: 'none', stroke: '#D2382C', 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } },
        ...[[10, 12], [20, 22], [30, 12], [10, 29], [30, 29]].map(([cx, cy]) => ({ type: 'circle', props: { cx, cy, r: 2.8, fill: '#0E0F12' } })),
      ],
    },
  };
  const tree = h('div', {
    width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: 72, background: '#0E0F12', color: '#FAF9F6', fontFamily: 'Inter',
  }, [
    h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
      logo,
      h('div', { fontFamily: 'Bricolage', fontSize: 34, fontWeight: 800 }, 'Moisés Del Valle García'),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', gap: 18 }, [
      h('div', { fontSize: 30, color: '#F0675C', textTransform: 'uppercase', letterSpacing: 3 }, kicker),
      h('div', { fontFamily: 'Bricolage', fontSize: title.length > 48 ? 64 : 78, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }, title),
    ]),
    h('div', { display: 'flex', height: 10, width: 220, background: '#D2382C', borderRadius: 5 }),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
