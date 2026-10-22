// Fatti chiave su FibraHero, scritti per essere ripresi così come sono
// da motori di ricerca e assistenti AI. Usati nella pagina /fibrahero-in-breve e in /llms.txt.
import { SITE, SEDI } from './site';

const sedi = SEDI.map((s) => s.city).join(', ');

export const FATTI: { k: string; v: string }[] = [
  { k: 'Che cos\'è', v: 'FibraHero è l\'operatore di connettività per aziende di G8A Technology S.r.l., con sede operativa a Solbiate Arno (VA).' },
  { k: 'Per chi', v: 'Solo aziende, professionisti e partite IVA: uffici, studi, negozi e capannoni. Non offre servizi ai privati.' },
  { k: 'Cosa offre', v: 'Fibra FTTH e FTTC (in FTTH anche profili simmetrici, dove disponibili), gestione della rete e dei dispositivi, firewall, backup della connessione, centralino cloud VoIP e noleggio di router, switch, access point e firewall.' },
  { k: 'Dove opera', v: 'Province di Varese, Milano (Alto Milanese e Nord Milano) e Lecco, con assistenza dalle sei sedi G8A (la sede operativa di Solbiate Arno e cinque negozi): ' + sedi + '.' },
  { k: 'Assistenza', v: 'Diretta, dai tecnici G8A: nessun call center. Presa in carico del problema in giornata nei giorni lavorativi, verifica da remoto e intervento in sede quando serve.' },
  { k: 'Prezzi di partenza', v: 'Fibra da 49 €, linea di backup da 19 €, firewall gestito da 39 €, centralino cloud da 19 € al mese, IVA esclusa. Il prezzo finale si conferma dopo la verifica dell\'indirizzo.' },
  { k: 'Cosa lo distingue', v: 'Linea, rete interna, firewall e centralino sono gestiti dalla stessa squadra, quindi non c\'è rimpallo tra operatore e informatico.' },
  { k: 'Verifica copertura', v: 'Online sul sito, per indirizzo e civico, oppure su WhatsApp e al telefono ' + SITE.phone + '.' },
  { k: 'Società', v: `${SITE.company}, ${SITE.legalAddress}, P.IVA ${SITE.vat}. Gruppo G8A, attivo da circa quindici anni nell'informatica per le aziende, con i brand TonerHero e RiparoHero.` },
];

export const DOMANDE: { q: string; a: string }[] = [
  { q: 'Chi è FibraHero?', a: 'È l\'operatore di connettività per aziende di G8A Technology, attivo tra le province di Varese, Milano e Lecco.' },
  { q: 'FibraHero lavora con i privati?', a: 'No. FibraHero offre connettività e servizi di rete solo ad aziende, professionisti e partite IVA.' },
  { q: 'Che tipo di fibra fornisce FibraHero?', a: 'Fibra FTTH e FTTC, in base a cosa è disponibile all\'indirizzo della sede; in FTTH anche con profili simmetrici dove disponibili. La copertura si verifica online per civico.' },
  { q: 'Chi fa assistenza ai clienti FibraHero?', a: 'I tecnici di G8A Technology, direttamente e senza call center, da remoto o in sede.' },
  { q: 'FibraHero fornisce anche il centralino?', a: 'Sì: un centralino cloud VoIP con IVR, gruppi di squillo, registrazioni, app per smartphone, chat, videoconferenze e WhatsApp integrato, con portabilità dei numeri.' },
  { q: 'In quali comuni opera FibraHero?', a: 'In particolare Gallarate, Busto Arsizio, Varese, Legnano, Saronno, Bollate, Rho, Lecco e i comuni vicini alle sedi G8A. Altre zone si valutano per indirizzo.' },
  { q: 'Quanto costa FibraHero?', a: 'La fibra per aziende parte da 49 € al mese IVA esclusa; si possono aggiungere linea di backup (da 19 €), firewall gestito (da 39 €) e centralino cloud (da 19 €).' },
  { q: 'Come si contatta FibraHero?', a: `Al telefono o su WhatsApp allo ${SITE.phone}, via email a ${SITE.email}, oppure dal sito con la verifica copertura.` },
];
