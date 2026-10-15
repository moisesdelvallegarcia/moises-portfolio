import { getCollection, type CollectionEntry } from 'astro:content';
import { ROUTES, SITE, type Lang } from './site';

type Post = CollectionEntry<'blog'>;
type Project = CollectionEntry<'projects'>;

/** "es/mi-articulo" → "mi-articulo" */
export const slugOf = (entry: { id: string }) => entry.id.split('/').pop()!;

export const postPath = (post: Post) => `${ROUTES.blog[post.data.lang]}${slugOf(post)}/`;
export const projectPath = (p: Project) => `${ROUTES.projects[p.data.lang]}${slugOf(p)}/`;

export async function getPosts(lang: Lang) {
  const posts = await getCollection('blog', (p) => p.data.lang === lang && !p.data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProjects(lang: Lang) {
  const projects = await getCollection('projects', (p) => p.data.lang === lang);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Ruta de esta entrada en cada idioma en que exista (para hreflang y el botón de idioma). */
export async function alternatesFor(entry: Post | Project): Promise<Partial<Record<Lang, string>>> {
  const own = { [entry.data.lang]: entry.collection === 'blog' ? postPath(entry as Post) : projectPath(entry as Project) };
  const key = entry.data.translationKey;
  if (!key) return own;
  const all = await getCollection(entry.collection);
  const twin = all.find((e) => e.data.lang !== entry.data.lang && e.data.translationKey === key);
  if (!twin) return own;
  return {
    ...own,
    [twin.data.lang]: twin.collection === 'blog' ? postPath(twin as Post) : projectPath(twin as Project),
  };
}

/**
 * Saca las preguntas de la sección "## Preguntas frecuentes" / "## FAQ" de un artículo
 * para publicarlas también como datos estructurados FAQPage.
 */
export function extractFaq(markdown: string) {
  const section = markdown.split(/^## (?:Preguntas frecuentes|FAQ)\s*$/m)[1];
  if (!section) return [];
  const body = section.split(/^## /m)[0];
  return body
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split('\n');
      const answer = rest.join('\n').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
      return { question: question.trim(), answer };
    })
    .filter((f) => f.question && f.answer);
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function personJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og/home-${lang}.png`,
    jobTitle: lang === 'es' ? 'Desarrollador de automatización con IA' : 'AI automation developer',
    address: { '@type': 'PostalAddress', addressLocality: 'Morelia', addressRegion: 'Michoacán', addressCountry: 'MX' },
    sameAs: [SITE.linkedin, SITE.instagram].filter(Boolean),
    knowsLanguage: ['es', 'en'],
  };
}
