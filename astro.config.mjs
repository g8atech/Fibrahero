import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo del sito: aggiornalo qui se cambia.
export default defineConfig({
  site: 'https://www.fibrahero.it',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/grazie') })],
});
