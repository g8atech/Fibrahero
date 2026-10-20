import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Dominio definitivo del sito: aggiornalo qui se cambia.
// Le pagine restano HTML statico; solo /api/copertura/* gira come funzione su Vercel.
export default defineConfig({
  site: 'https://www.fibrahero.it',
  trailingSlash: 'never',
  build: { format: 'file' },
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes('/grazie') && !page.includes('/api/') })],
});
