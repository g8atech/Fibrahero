// Dati generali del sito. Tutto ciò che è da confermare è segnato con TODO.
export const SITE = {
  name: 'FibraHero',
  tagline: 'Connettività gestita. Aziende connesse.',
  url: 'https://www.fibrahero.it',
  company: 'G8A Technology S.r.l.',
  email: 'info@g8a.it',
  // Numero commerciale e di assistenza (anche WhatsApp), dalla locandina.
  phone: '345 178 33 03',
  whatsapp: '393451783303',
  whatsappText: 'Ciao FibraHero, vorrei un\'offerta per la connessione della mia azienda.',
  // TODO: partita IVA di G8A Technology S.r.l. per il footer.
  vat: '',
  // Endpoint che riceve le richieste di verifica copertura (es. funzione su Brain/Supabase).
  // Se vuoto, il form apre una mail precompilata verso SITE.email.
  leadEndpoint: import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '',
};

export type Sede = {
  slug: string;
  city: string;
  address: string;
  cap: string;
  province: string;
  lat: number;
  lng: number;
  operativa?: boolean;
};

export const SEDI: Sede[] = [
  { slug: 'solbiate-arno', city: 'Solbiate Arno', address: 'Via Caronno Varesino 33', cap: '21048', province: 'VA', lat: 45.7186, lng: 8.8135, operativa: true },
  { slug: 'gallarate', city: 'Gallarate', address: 'Viale Milano 1', cap: '21013', province: 'VA', lat: 45.6587, lng: 8.7936 },
  { slug: 'busto-arsizio', city: 'Busto Arsizio', address: 'Via Q. Sella 27', cap: '21052', province: 'VA', lat: 45.6115, lng: 8.8519 },
  { slug: 'jerago-con-orago', city: 'Jerago con Orago', address: 'Via Varesina 3', cap: '21040', province: 'VA', lat: 45.7055, lng: 8.7972 },
  { slug: 'bollate', city: 'Bollate', address: 'Piazza Indipendenza 8', cap: '20021', province: 'MI', lat: 45.5468, lng: 9.1187 },
  { slug: 'lecco', city: 'Lecco', address: 'Viale Dante Alighieri 22', cap: '23900', province: 'LC', lat: 45.8566, lng: 9.3977 },
];

export const waLink = (text: string = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+39${SITE.phone.replace(/\s/g, '')}`;
