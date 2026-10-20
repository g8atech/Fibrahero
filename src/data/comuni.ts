import { SEDI, type Sede } from './site';

// Comuni con pagina dedicata "Fibra aziendale a <comune>".
// Coordinate approssimate del centro, usate solo per calcolare la sede più vicina.
// `note` è il paragrafo locale scritto a mano: è quello che rende la pagina unica
// agli occhi di Google. Aggiungilo per ogni comune (zone artigianali, clienti, ecc.).
export type Comune = {
  slug: string;
  name: string;
  province: 'VA' | 'MI' | 'LC';
  lat: number;
  lng: number;
  note?: string;
};

export const COMUNI: Comune[] = [
  { slug: 'gallarate', name: 'Gallarate', province: 'VA', lat: 45.6600, lng: 8.7920 },
  { slug: 'busto-arsizio', name: 'Busto Arsizio', province: 'VA', lat: 45.6120, lng: 8.8500 },
  { slug: 'varese', name: 'Varese', province: 'VA', lat: 45.8206, lng: 8.8251 },
  { slug: 'jerago-con-orago', name: 'Jerago con Orago', province: 'VA', lat: 45.7050, lng: 8.7980 },
  { slug: 'solbiate-arno', name: 'Solbiate Arno', province: 'VA', lat: 45.7190, lng: 8.8130 },
  { slug: 'cassano-magnago', name: 'Cassano Magnago', province: 'VA', lat: 45.6750, lng: 8.8220 },
  { slug: 'cardano-al-campo', name: 'Cardano al Campo', province: 'VA', lat: 45.6490, lng: 8.7700 },
  { slug: 'somma-lombardo', name: 'Somma Lombardo', province: 'VA', lat: 45.6830, lng: 8.7060 },
  { slug: 'samarate', name: 'Samarate', province: 'VA', lat: 45.6250, lng: 8.7840 },
  { slug: 'castellanza', name: 'Castellanza', province: 'VA', lat: 45.6100, lng: 8.8960 },
  { slug: 'saronno', name: 'Saronno', province: 'VA', lat: 45.6260, lng: 9.0370 },
  { slug: 'tradate', name: 'Tradate', province: 'VA', lat: 45.7100, lng: 8.9070 },
  { slug: 'sesto-calende', name: 'Sesto Calende', province: 'VA', lat: 45.7270, lng: 8.6350 },
  { slug: 'legnano', name: 'Legnano', province: 'MI', lat: 45.5950, lng: 8.9150 },
  { slug: 'bollate', name: 'Bollate', province: 'MI', lat: 45.5470, lng: 9.1180 },
  { slug: 'garbagnate-milanese', name: 'Garbagnate Milanese', province: 'MI', lat: 45.5770, lng: 9.0750 },
  { slug: 'arese', name: 'Arese', province: 'MI', lat: 45.5530, lng: 9.0770 },
  { slug: 'rho', name: 'Rho', province: 'MI', lat: 45.5300, lng: 9.0400 },
  { slug: 'novate-milanese', name: 'Novate Milanese', province: 'MI', lat: 45.5300, lng: 9.1370 },
  { slug: 'paderno-dugnano', name: 'Paderno Dugnano', province: 'MI', lat: 45.5700, lng: 9.1650 },
  { slug: 'lecco', name: 'Lecco', province: 'LC', lat: 45.8560, lng: 9.3970 },
  { slug: 'valmadrera', name: 'Valmadrera', province: 'LC', lat: 45.8460, lng: 9.3580 },
  { slug: 'calolziocorte', name: 'Calolziocorte', province: 'LC', lat: 45.8000, lng: 9.4300 },
  { slug: 'merate', name: 'Merate', province: 'LC', lat: 45.6970, lng: 9.4190 },
];

export const PROVINCE: Record<Comune['province'], string> = {
  VA: 'provincia di Varese',
  MI: 'città metropolitana di Milano',
  LC: 'provincia di Lecco',
};

function km(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestSede(c: Comune): { sede: Sede; distance: number } {
  return SEDI.map((sede) => ({ sede, distance: km(c, sede) })).sort((a, b) => a.distance - b.distance)[0];
}

export function neighbours(c: Comune, n = 4): Comune[] {
  return COMUNI.filter((o) => o.slug !== c.slug)
    .map((o) => ({ o, d: km(c, o) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((x) => x.o);
}
