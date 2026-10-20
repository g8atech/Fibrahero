import type { APIRoute } from 'astro';
import { isConfigured, searchCities, searchStreets, searchNumbers, checkAddress, HiveError } from '../../../lib/hive';

// Funzione server (Vercel): fa da tramite tra il sito e le API EIS/Hive.
export const prerender = false;

const json = (data: unknown, status = 200, cache = 0) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache ? `public, s-maxage=${cache}, stale-while-revalidate=${cache * 2}` : 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });

const clean = (v: string | null, max = 80) => (v ?? '').replace(/[^\p{L}\p{N}\s'.\-\/]/gu, '').trim().slice(0, max);
const tc = (v: string) => v.toLowerCase().replace(/(^|[\s'\-\/])(\p{L})/gu, (_m, a: string, b: string) => a + b.toUpperCase());
const id = (v: string | null) => (v ?? '').replace(/[^\w\-]/g, '').slice(0, 64);

export const GET: APIRoute = async ({ params, url }) => {
  if (!isConfigured()) return json({ error: 'non_configurato' }, 503);
  const q = url.searchParams;
  try {
    switch (params.azione) {
      case 'comuni': {
        const city = clean(q.get('q'), 60);
        if (city.length < 2) return json([]);
        const list = await searchCities(city);
        return json(list.slice(0, 15).map((c) => ({ id: c.idCity, name: c.city, label: tc(c.city), province: c.province, cap: c.zipcode, egon: c.egonCode })), 200, 86400);
      }
      case 'vie': {
        const idCity = id(q.get('comune'));
        const street = clean(q.get('q'), 60);
        if (!idCity || street.length < 2) return json([]);
        const list = await searchStreets(idCity, street);
        return json(list.slice(0, 20).map((s) => ({ id: s.idAddress, name: s.street || `${s.toponym} ${s.name}`, label: tc(s.street || `${s.toponym} ${s.name}`), egon: s.egonCode })), 200, 86400);
      }
      case 'civici': {
        const idAddress = id(q.get('via'));
        const n = clean(q.get('q'), 10);
        if (!idAddress || !n) return json([]);
        const list = await searchNumbers(idAddress, n);
        return json(list.slice(0, 20).map((s) => ({ id: s.idStreetNumber, number: s.toponomastico || s.number })), 200, 86400);
      }
      case 'verifica': {
        const a = {
          city: clean(q.get('comune')), province: clean(q.get('provincia'), 4),
          street: clean(q.get('via')), number: clean(q.get('civico'), 10),
          streetEgon: id(q.get('viaEgon')) || undefined, cityEgon: id(q.get('comuneEgon')) || undefined,
        };
        if (!a.city || !a.street || !a.number) return json({ error: 'indirizzo_incompleto' }, 400);
        return json(await checkAddress(a), 200, 3600);
      }
      default:
        return json({ error: 'azione_sconosciuta' }, 404);
    }
  } catch (e) {
    console.error('[copertura]', e);
    return json({ error: 'servizio_non_disponibile' }, e instanceof HiveError && e.status === 400 ? 400 : 502);
  }
};
