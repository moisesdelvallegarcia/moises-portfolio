import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Artículos: src/content/blog/<es|en>/<slug>.md
// translationKey empareja un artículo con su versión en el otro idioma (si existe).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    keywords: z.array(z.string()).default([]),
    translationKey: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Casos: src/content/projects/<es|en>/<slug>.md
// Si no hay un resultado medido, `results` se deja vacío y la página muestra un marcador.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lang: z.enum(['es', 'en']),
    translationKey: z.string(),
    order: z.number(),
    industry: z.string(),
    problem: z.string(),
    system: z.array(z.string()),
    results: z.array(z.string()).default([]),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
