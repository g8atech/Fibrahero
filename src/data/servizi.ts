// Servizi FibraHero. Ogni servizio ha una pagina dedicata: /<slug>
// TODO: confermare velocità, tempi e condizioni prima della pubblicazione.
export type Servizio = {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  intro: string;
  forWho: string[];
  includes: string[];
  faq: { q: string; a: string }[];
};

export const SERVIZI: Servizio[] = [
  {
    slug: 'fibra-ftth-aziende',
    name: 'Fibra FTTH',
    short: 'Fibra fino in azienda, la connessione principale per uffici e capannoni.',
    title: 'Fibra FTTH per aziende in Lombardia',
    description:
      'Fibra ottica FTTH per aziende tra Varese, Milano e Lecco: IP statico, router configurato e assistenza diretta dei tecnici G8A.',
    intro:
      'La fibra arriva fino ai locali dell\'azienda, senza tratti in rame. È la base per lavorare in cloud, fare videochiamate senza scatti e tenere in rete sedi, telecamere e gestionali.',
    forWho: [
      'Uffici che lavorano con gestionali in cloud e videochiamate',
      'Capannoni e laboratori con più postazioni e telecamere',
      'Studi professionali che inviano e ricevono file pesanti',
    ],
    includes: [
      'Sopralluogo e verifica dell\'armadio di rete',
      'Router professionale configurato e gestito da noi',
      'IP statico per VPN, telecamere e accessi da remoto',
      'Assistenza diretta dei tecnici G8A, senza call center',
    ],
    faq: [
      {
        q: 'Che differenza c\'è tra FTTH e FTTC?',
        a: 'Con la FTTH la fibra arriva dentro l\'azienda. Con la FTTC arriva all\'armadio in strada e l\'ultimo tratto è in rame, quindi la velocità dipende dalla distanza. Quando la FTTH è disponibile è sempre la scelta migliore.',
      },
      {
        q: 'Serve l\'IP statico?',
        a: 'Serve se volete raggiungere l\'azienda da fuori: VPN per chi lavora da casa, telecamere, server o NAS. Lo includiamo perché alla maggior parte delle aziende serve.',
      },
    ],
  },
  {
    slug: 'connessione-radio-fwa-aziende',
    name: 'Radio FWA',
    short: 'Dove la fibra non arriva, connessione via antenna con assistenza nostra.',
    title: 'Connessione radio FWA per aziende',
    description:
      'Connessione FWA via antenna per aziende in zone non coperte dalla fibra, in provincia di Varese, Milano e Lecco. Installazione e supporto G8A.',
    intro:
      'Molte zone artigianali non sono ancora raggiunte dalla fibra. Con la FWA la connessione arriva via radio a un\'antenna installata sull\'edificio: niente scavi, attivazione più rapida.',
    forWho: [
      'Aziende in zone industriali non ancora cablate',
      'Sedi temporanee o cantieri di lunga durata',
      'Chi aspetta la fibra e non vuole restare con l\'ADSL',
    ],
    includes: [
      'Verifica della visibilità radio dal vostro edificio',
      'Installazione dell\'antenna e del router',
      'Configurazione della rete interna',
      'Passaggio alla fibra quando arriva, senza cambiare referente',
    ],
    faq: [
      {
        q: 'La FWA è stabile come la fibra?',
        a: 'Per la maggior parte degli usi d\'ufficio sì. Dipende dalla posizione dell\'edificio: per questo facciamo una verifica prima di proporla.',
      },
    ],
  },
  {
    slug: 'linea-backup-aziende',
    name: 'Linea di backup',
    short: 'Una seconda linea che entra in funzione da sola se la principale cade.',
    title: 'Linea di backup 4G/5G per aziende',
    description:
      'Linea di backup per aziende: se la connessione principale cade, il traffico passa in automatico su una seconda linea. Configurata e monitorata da G8A.',
    intro:
      'Un guasto sulla linea può fermare casse, gestionale e telefoni per ore. La linea di backup entra in funzione da sola: chi lavora spesso non si accorge di nulla.',
    forWho: [
      'Negozi e attività che non possono fermare le casse',
      'Aziende con centralino VoIP e gestionali in cloud',
      'Chi ha già subito un fermo e non vuole ripeterlo',
    ],
    includes: [
      'Router con doppia linea e passaggio automatico',
      'Seconda linea su rete mobile o su un\'altra tecnologia',
      'Avviso al nostro supporto quando la linea principale cade',
    ],
    faq: [
      {
        q: 'Il backup funziona anche con la linea di un altro operatore?',
        a: 'Sì. Possiamo aggiungere il backup anche se la linea principale non è nostra, ma con entrambe le linee FibraHero la gestione dei guasti è più veloce perché seguiamo tutto noi.',
      },
    ],
  },
  {
    slug: 'centralino-voip-aziende',
    name: 'Centralino VoIP',
    short: 'Telefoni d\'ufficio su internet, con i numeri che avete già.',
    title: 'Centralino VoIP e telefonia per aziende',
    description:
      'Centralino VoIP per aziende con portabilità dei numeri, interni, code e app sul cellulare. Installato e assistito dai tecnici G8A.',
    intro:
      'Il centralino passa su internet insieme alla fibra. Si mantengono i numeri attuali, si aggiungono interni senza nuovi cavi e si risponde anche dal cellulare.',
    forWho: [
      'Uffici con più interni e un numero principale',
      'Aziende con più sedi che vogliono un unico centralino',
      'Chi lavora anche fuori ufficio e deve restare raggiungibile',
    ],
    includes: [
      'Portabilità dei numeri attuali',
      'Interni, gruppi di risposta e messaggi di attesa',
      'App per rispondere dal cellulare o dal PC',
      'Telefoni fissi configurati, se servono',
    ],
    faq: [
      {
        q: 'Perdiamo il numero se cambiamo?',
        a: 'No. Portiamo i numeri che avete già: il passaggio viene programmato per evitare interruzioni.',
      },
    ],
  },
];
