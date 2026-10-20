// Client per le API di copertura EIS / Hive (https://docs.api.hive-service.com).
// Gira SOLO lato server (funzione Vercel): le credenziali non arrivano mai al browser.
//
// Variabili d'ambiente da impostare su Vercel (Settings → Environment Variables):
//   HIVE_CLIENT_ID   clientId generato nel portale Hive (Profilo utente → API Keys)
//   HIVE_API_KEY     API Key (refresh token) generata insieme al clientId
//   HIVE_BASE_URL    facoltativa, default https://api.eis.it (staging: https://staging.api.eis.it)

const env = (k: string): string | undefined =>
  (typeof process !== 'undefined' ? process.env[k] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[k];

const BASE = () => (env('HIVE_BASE_URL') || 'https://api.eis.it').replace(/\/$/, '');

export const isConfigured = () => Boolean(env('HIVE_CLIENT_ID') && env('HIVE_API_KEY'));

// L'access token dura 24 ore: lo teniamo in memoria finché la funzione resta "calda".
let token: { value: string; exp: number } | null = null;

async function getToken(force = false): Promise<string> {
  if (!force && token && token.exp > Date.now()) return token.value;
  const res = await fetch(`${BASE()}/auth/api-key/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ clientId: env('HIVE_CLIENT_ID')!, clientSecret: env('HIVE_API_KEY')! }),
  });
  if (!res.ok) throw new HiveError(`login ${res.status}`, res.status);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new HiveError('login senza token', 502);
  token = { value: data.access_token, exp: Date.now() + 23 * 60 * 60 * 1000 };
  return token.value;
}

export class HiveError extends Error {
  constructor(msg: string, public status = 502) { super(msg); }
}

async function hiveGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = `${BASE()}${path}?${new URLSearchParams(params)}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${await getToken(attempt > 0)}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
    if (res.status === 401 && attempt === 0) continue; // token scaduto: rinnova e riprova una volta
    if (res.status === 404) return [] as T;
    if (!res.ok) throw new HiveError(`${path} ${res.status}`, res.status >= 500 ? 502 : res.status);
    return (await res.json()) as T;
  }
  throw new HiveError(`${path} non autorizzato`, 502);
}

// ---------- Toponomastica ----------

export type City = { idCity: string; city: string; province: string; zipcode: string; egonCode: string };
export type Street = { idAddress: string; name: string; street: string; toponym: string; egonCode: string };
export type StreetNumber = { idStreetNumber: string; addressId: string; number: string; toponomastico: string };

export const searchCities = (city: string) => hiveGet<City[]>('/v1/coverage/manual/getcity', { city });
export const searchStreets = (idCity: string, address: string) =>
  hiveGet<Street[]>('/v1/coverage/manual/getaddress', { idCity, address });
export const searchNumbers = (idAddress: string, streetNumber: string) =>
  hiveGet<StreetNumber[]>('/v1/coverage/manual/getstreetnumber', { idAddress, streetNumber });

// ---------- Copertura ----------

type TechItem = {
  speedLimit?: number;
  speedComplete?: string | null;
  coverage?: boolean;
  connectionType?: string;
  serviceName?: string;
  oloTypeService?: string;
};

export type CoverageResult = {
  available: { tech: 'FTTH' | 'FTTC'; label: string; maxMbps: number; speedText: string | null }[];
};

const GROUPS: { tech: 'FTTH' | 'FTTC'; label: string; filters: string[] }[] = [
  { tech: 'FTTH', label: 'Fibra FTTH', filters: ['ftth', 'ftthome'] },
  { tech: 'FTTC', label: 'Fibra FTTC', filters: ['fttc', 'fttcab'] },
];

/**
 * Restituisce le tecnologie disponibili a un civico, raggruppate in FTTH e FTTC,
 * con la velocità massima. I dati del fornitore (carrier, armadi, centrali) restano sul server.
 */
export async function getCoverage(streetEgon: string, streetNumber: string, mainEgon: string): Promise<CoverageResult> {
  const available: CoverageResult['available'] = [];
  for (const g of GROUPS) {
    const lists = await Promise.all(
      g.filters.map((technology) =>
        hiveGet<TechItem[]>('/v1/coverage/getcoverage', { streetEgon, streetNumber, mainEgon, technology }).catch(() => [] as TechItem[]),
      ),
    );
    const items = lists.flat().filter((i) => i && i.coverage !== false);
    if (process.env.HIVE_DEBUG === '1') console.log('[hive] coverage', g.tech, JSON.stringify(items).slice(0, 2000));
    if (!items.length) continue;
    const best = items.reduce((a, b) => ((b.speedLimit ?? 0) > (a.speedLimit ?? 0) ? b : a));
    available.push({ tech: g.tech, label: g.label, maxMbps: best.speedLimit ?? 0, speedText: best.speedComplete ?? null });
  }
  return { available };
}

// ---------- Validazione indirizzo ----------

type ValidateResponse = {
  city?: { egonCode?: string };
  address?: { egonCode?: string; streetType?: string };
  streetNumber?: string;
  egonCode?: string;
  valid?: boolean;
};

async function validateAddress(body: { city: string; province: string; address: string; number: string }) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${BASE()}/v1/coverage/validate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${await getToken(attempt > 0)}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    if (res.status === 401 && attempt === 0) continue;
    if (!res.ok) throw new HiveError(`validate ${res.status}`, res.status >= 500 ? 502 : 400);
    return (await res.json()) as ValidateResponse;
  }
  throw new HiveError('validate non autorizzato', 502);
}

/**
 * Verifica completa a partire dall'indirizzo scelto dall'utente.
 * Il "mainEgon" richiesto da getcoverage non è documentato in dettaglio: proviamo
 * prima il codice EGON del civico, poi quello della via e del comune.
 */
export async function checkAddress(a: { city: string; province: string; street: string; number: string; streetEgon?: string; cityEgon?: string }) {
  const v = await validateAddress({ city: a.city, province: a.province, address: a.street, number: a.number }).catch(() => null);
  if (process.env.HIVE_DEBUG === '1') console.log('[hive] validate', JSON.stringify(v));
  const streetEgon = v?.address?.egonCode || a.streetEgon;
  if (!streetEgon) return { valid: false, available: [] as CoverageResult['available'] };
  const candidates = [v?.egonCode, streetEgon, v?.city?.egonCode || a.cityEgon].filter((x, i, arr): x is string => !!x && arr.indexOf(x) === i);
  for (const mainEgon of candidates) {
    const r = await getCoverage(streetEgon, a.number, mainEgon);
    if (r.available.length) return { valid: true, ...r };
  }
  return { valid: v?.valid ?? true, available: [] as CoverageResult['available'] };
}
