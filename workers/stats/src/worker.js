// Medición de las páginas de clientes: clics, cupones y encuestas.
// Cada negocio es un "sitio" (ej. bichon). Todo vive en el KV STATS.
//   d:<sitio>:<fecha>        contadores del día {visita, wa, tel, mapa, cita}
//   c:<sitio>:<codigo>       cupón generado al mandar la cita por WhatsApp
//   e:<sitio>:<codigo>       encuesta contestada para ese cupón
// El panel pide la clave en el header X-Clave (secreto PANEL_KEY).

const SITIOS = ['bichon'];
const EVENTOS = ['visita', 'wa', 'tel', 'mapa', 'cita'];
const ORIGENES = ['https://moisesdelvalle.com', 'https://www.moisesdelvalle.com', 'http://localhost:4321', 'http://127.0.0.1:8790'];
const CODIGO = /^[A-Z]{2}-[0-9]{4}$/;

function cors(req) {
  const o = req.headers.get('Origin') || '';
  const ok = ORIGENES.includes(o) || o.endsWith('.moises-portfolio.pages.dev');
  return {
    'Access-Control-Allow-Origin': ok ? o : ORIGENES[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Clave',
    Vary: 'Origin',
  };
}

const json = (req, data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...cors(req) } });

const hoy = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
const corta = (t, n) => String(t || '').slice(0, n);

async function cuerpo(req) {
  try { return JSON.parse(await req.text()); } catch { return {}; }
}

async function sumar(env, sitio, evento) {
  const k = `d:${sitio}:${hoy()}`;
  const d = (await env.STATS.get(k, 'json')) || {};
  d[evento] = (d[evento] || 0) + 1;
  await env.STATS.put(k, JSON.stringify(d));
}

async function listar(env, prefix) {
  const out = [];
  let cursor;
  do {
    const r = await env.STATS.list({ prefix, cursor });
    for (const k of r.keys) out.push(k.name);
    cursor = r.list_complete ? null : r.cursor;
  } while (cursor);
  return out;
}

async function panel(env, sitio) {
  const dias = {};
  for (const k of await listar(env, `d:${sitio}:`)) dias[k.split(':')[2]] = await env.STATS.get(k, 'json');
  const cupones = [];
  for (const k of await listar(env, `c:${sitio}:`)) {
    const c = await env.STATS.get(k, 'json');
    const codigo = k.split(':')[2];
    c.encuesta = await env.STATS.get(`e:${sitio}:${codigo}`, 'json');
    cupones.push({ codigo, ...c });
  }
  cupones.sort((a, b) => (b.creado || '').localeCompare(a.creado || ''));
  return { dias, cupones };
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    const url = new URL(req.url);
    const ruta = url.pathname;

    if (req.method === 'POST' && ruta === '/e') {
      const b = await cuerpo(req);
      if (!SITIOS.includes(b.s) || !EVENTOS.includes(b.e)) return json(req, { ok: false }, 400);
      await sumar(env, b.s, b.e);
      return json(req, { ok: true });
    }

    if (req.method === 'POST' && ruta === '/cupon') {
      const b = await cuerpo(req);
      if (!SITIOS.includes(b.s) || !CODIGO.test(b.c)) return json(req, { ok: false }, 400);
      const k = `c:${b.s}:${b.c}`;
      if (!(await env.STATS.get(k)))
        await env.STATS.put(k, JSON.stringify({
          creado: new Date().toISOString(), servicio: corta(b.servicio, 40), dia: corta(b.dia, 10), usado: null,
        }));
      await sumar(env, b.s, 'cita');
      return json(req, { ok: true });
    }

    if (req.method === 'POST' && ruta === '/encuesta') {
      const b = await cuerpo(req);
      if (!SITIOS.includes(b.s) || !CODIGO.test(b.c)) return json(req, { ok: false }, 400);
      if (!(await env.STATS.get(`c:${b.s}:${b.c}`))) return json(req, { ok: false, error: 'cupon' }, 404);
      const estrellas = Math.max(1, Math.min(5, parseInt(b.estrellas, 10) || 0));
      await env.STATS.put(`e:${b.s}:${b.c}`, JSON.stringify({
        fecha: new Date().toISOString(), fue: b.fue === 'si', estrellas, volveria: b.volveria === 'si',
        comentario: corta(b.comentario, 500),
      }));
      return json(req, { ok: true });
    }

    // Lo que sigue es solo para el panel
    if (ruta === '/panel' || ruta === '/canje') {
      if (!env.PANEL_KEY || req.headers.get('X-Clave') !== env.PANEL_KEY) return json(req, { ok: false }, 401);
      const sitio = url.searchParams.get('s');
      if (!SITIOS.includes(sitio)) return json(req, { ok: false }, 400);
      if (req.method === 'GET' && ruta === '/panel') return json(req, await panel(env, sitio));
      if (req.method === 'POST' && ruta === '/canje') {
        const b = await cuerpo(req);
        const k = `c:${sitio}:${b.c}`;
        const c = await env.STATS.get(k, 'json');
        if (!c) return json(req, { ok: false }, 404);
        c.usado = b.usado ? new Date().toISOString() : null;
        await env.STATS.put(k, JSON.stringify(c));
        return json(req, { ok: true });
      }
    }

    return json(req, { ok: false }, 404);
  },
};
