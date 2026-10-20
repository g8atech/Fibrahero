# FibraHero by G8A

Sito di FibraHero, la connettività per aziende di G8A Technology. Costruito con [Astro](https://astro.build): ogni pagina è HTML statico, leggibile subito da Google e dai motori AI.

## Comandi

```bash
npm install
npm run dev      # anteprima locale su http://localhost:4321
npm run build    # genera il sito in dist/
```

## Dove si modificano i contenuti

| Cosa | File |
|---|---|
| Email, telefono e WhatsApp, P.IVA, endpoint del form | `src/data/site.ts` |
| Immagini (logo, supereroe, loghi stampa) | `src/assets/` |
| Sedi | `src/data/site.ts` (`SEDI`) |
| Servizi e loro pagine | `src/data/servizi.ts` |
| Comuni con pagina dedicata | `src/data/comuni.ts` |
| Domande frequenti | `src/data/faq.ts` |
| Dominio | `astro.config.mjs` e `public/robots.txt` |

Per aggiungere un comune basta una riga in `src/data/comuni.ts`: pagina, sitemap e link si generano da soli. Il campo `note` è il testo locale scritto a mano, quello che rende la pagina unica.

## Form verifica copertura

Se la variabile d'ambiente `PUBLIC_LEAD_ENDPOINT` è impostata (su Vercel: Settings → Environment Variables), il form invia i dati in JSON a quell'indirizzo, ad esempio una funzione su Brain/Supabase. Se non è impostata, il form apre una mail precompilata verso l'indirizzo in `site.ts`.

## Verifica copertura in tempo reale (API EIS / Hive)

Il verificatore (home, pagina Verifica copertura e pagine dei comuni) usa le API di copertura EIS tramite una funzione server su Vercel (`src/pages/api/copertura/[azione].ts`). Le credenziali restano sul server e non arrivano mai al browser.

Su Vercel → Settings → Environment Variables impostare:

| Variabile | Valore |
|---|---|
| `HIVE_CLIENT_ID` | clientId generato nel portale Hive (Profilo utente → API Keys) |
| `HIVE_API_KEY` | API Key generata insieme al clientId |
| `HIVE_BASE_URL` | facoltativa: `https://staging.api.eis.it` per i test, altrimenti produzione |
| `HIVE_DEBUG` | facoltativa: `1` per vedere nei log Vercel le risposte grezze di copertura |

Senza credenziali, o se le API non rispondono, il verificatore passa da solo alla richiesta manuale (WhatsApp, modulo, telefono).

## Pubblicazione su Vercel

Importa il repository su Vercel: il framework Astro viene riconosciuto in automatico. Ogni push sul ramo principale aggiorna il sito.

## Da completare prima di andare online

Cerca `TODO` nel codice: partita IVA, informativa privacy definitiva.
