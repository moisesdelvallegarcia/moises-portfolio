// Datos de contacto y rutas del sitio. Para cambiar un número, una red o un texto
// que se repite en todo el sitio, este es el único lugar que hay que tocar.

export type Lang = 'es' | 'en';

export const SITE = {
  name: 'Moisés Del Valle García',
  shortName: 'Moisés Del Valle',
  url: 'https://moisesdelvalle.com',
  city: 'Morelia, Michoacán',
  whatsapp: '524433428744',
  email: 'moises_delvalle_garcia@outlook.com',
  linkedin: 'https://www.linkedin.com/in/mois%C3%A9s-del-valle-garc%C3%ADa/',
  instagram: 'https://www.instagram.com/yosoymoisesdelvalle/',
  demo: { spots: 5, days: 7 },
} as const;

export const SLOGAN: Record<Lang, string> = {
  es: 'Si lo puedes imaginar, lo programamos.',
  en: 'If you can imagine it, we can build it.',
};

const WA_TEXT: Record<Lang, string> = {
  es: 'Hola Moisés, vi tu página y quiero mi demo gratis. Mi negocio es: ',
  en: 'Hi Moisés, I saw your website and I’d like my free demo. My business is: ',
};

export function whatsappUrl(lang: Lang, text = WA_TEXT[lang]) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Cada página existe en los dos idiomas; las rutas en inglés no son traducción literal
// de las de español, por eso se emparejan aquí.
export const ROUTES = {
  home: { es: '/', en: '/en/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  services: { es: '/servicios/', en: '/en/services/' },
  demo: { es: '/demo/', en: '/en/demo/' },
  about: { es: '/sobre-mi/', en: '/en/about/' },
  blog: { es: '/blog/', en: '/en/blog/' },
  privacy: { es: '/aviso-de-privacidad/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof ROUTES;

export const NAV: RouteKey[] = ['projects', 'services', 'demo', 'about', 'blog'];

export const UI = {
  es: {
    nav: { home: 'Inicio', projects: 'Proyectos', services: 'Servicios', demo: 'Demo gratis', about: 'Sobre mí', blog: 'Blog', privacy: 'Aviso de privacidad' },
    cta: 'Quiero mi demo gratis',
    ctaShort: 'Demo gratis',
    seeProjects: 'Ver proyectos',
    readCase: 'Ver el caso',
    readArticle: 'Leer artículo',
    switchLang: 'English',
    switchLangLabel: 'Ver esta página en inglés',
    skip: 'Saltar al contenido',
    menu: 'Menú',
    spots: (n: number) => `Cupo para ${n} negocios`,
    footerTag: 'Automatización con IA para negocios en México y Estados Unidos.',
    rights: 'Todos los derechos reservados.',
    pending: 'Pendiente',
    whatsappLabel: 'Escríbeme por WhatsApp',
    published: 'Publicado el',
    backToBlog: 'Volver al blog',
    backToProjects: 'Todos los proyectos',
    problem: 'El problema',
    system: 'El sistema',
    result: 'El resultado',
    stack: 'Con qué está hecho',
    industry: 'Industria',
    privateNote: 'El código es privado y el cliente se describe sin nombre.',
  },
  en: {
    nav: { home: 'Home', projects: 'Projects', services: 'Services', demo: 'Free demo', about: 'About', blog: 'Blog', privacy: 'Privacy notice' },
    cta: 'Get my free demo',
    ctaShort: 'Free demo',
    seeProjects: 'See projects',
    readCase: 'Read the case',
    readArticle: 'Read article',
    switchLang: 'Español',
    switchLangLabel: 'Ver esta página en español',
    skip: 'Skip to content',
    menu: 'Menu',
    spots: (n: number) => `Open to ${n} businesses`,
    footerTag: 'AI automation for businesses in the US and Mexico.',
    rights: 'All rights reserved.',
    pending: 'To do',
    whatsappLabel: 'Message me on WhatsApp',
    published: 'Published',
    backToBlog: 'Back to the blog',
    backToProjects: 'All projects',
    problem: 'The problem',
    system: 'The system',
    result: 'The result',
    stack: 'Built with',
    industry: 'Industry',
    privateNote: 'The code is private and the client is described without their name.',
  },
} as const;

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
