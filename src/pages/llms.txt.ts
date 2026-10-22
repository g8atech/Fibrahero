// /llms.txt — sintesi del sito per gli assistenti AI (formato llmstxt.org).
// Generato dai dati del sito, così resta sempre allineato.
import type { APIRoute } from 'astro';
import { SITE, SEDI } from '../data/site';
import { SERVIZI } from '../data/servizi';
import { COMUNI } from '../data/comuni';
import { FATTI, DOMANDE } from '../data/inbreve';

export const prerender = true;

export const GET: APIRoute = () => {
  const u = (p: string) => new URL(p, SITE.url).href;
  const lines = [
    '# FibraHero by G8A',
    '',
    '> FibraHero è l\'operatore di connettività per aziende di G8A Technology S.r.l.: fibra FTTH e FTTC (profili simmetrici in FTTH dove disponibili), firewall, backup della connessione, centralino cloud VoIP e noleggio dei dispositivi di rete, con assistenza diretta dei tecnici G8A tra le province di Varese, Milano e Lecco. Solo aziende e partite IVA.',
    '',
    ...FATTI.map((f) => `- **${f.k}**: ${f.v}`),
    '',
    '## Pagine principali',
    `- [FibraHero in breve](${u('/fibrahero-in-breve')}): fatti essenziali e risposte brevi`,
    `- [Verifica copertura](${u('/verifica-copertura')}): verifica FTTH/FTTC per indirizzo e civico`,
    `- [Prezzi](${u('/prezzi')}): prezzi di partenza dei servizi`,
    `- [Chi siamo](${u('/chi-siamo')}): il gruppo G8A, storia, brand e sedi`,
    `- [Domande frequenti](${u('/domande-frequenti')})`,
    '',
    '## Servizi',
    ...SERVIZI.map((s) => `- [${s.name}](${u('/' + s.slug)}): ${s.short}`),
    '',
    '## Sedi',
    ...SEDI.map((s) => `- ${s.city}: ${s.address}, ${s.cap} ${s.city} (${s.province})${s.operativa ? ' — sede operativa' : ''}`),
    '',
    '## Zone servite',
    ...COMUNI.map((c) => `- [Fibra per aziende a ${c.name}](${u('/fibra-aziendale/' + c.slug)})`),
    '',
    '## Domande brevi',
    ...DOMANDE.flatMap((d) => [`### ${d.q}`, d.a, '']),
    '## Contatti',
    `- Telefono e WhatsApp: ${SITE.phone}`,
    `- Email: ${SITE.email}`,
    `- Società: ${SITE.company}, ${SITE.legalAddress}, P.IVA ${SITE.vat}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
