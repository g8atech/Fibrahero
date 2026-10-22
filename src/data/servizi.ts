// Servizi FibraHero, dalla locandina ufficiale. Ogni servizio ha una pagina: /<slug>
export type Servizio = {
  slug: string;
  name: string;
  icon: 'fibra' | 'rete' | 'firewall' | 'backup' | 'voip' | 'noleggio';
  short: string;
  title: string;
  description: string;
  intro: string;
  forWho: string[];
  includes: string[];
  faq: { q: string; a: string }[];
  // Funzioni dettagliate, mostrate a gruppi nella pagina del servizio.
  featureGroups?: { title: string; items: { t: string; d: string }[] }[];
};

export const SERVIZI: Servizio[] = [
  {
    slug: 'fibra-ultraveloce-aziende',
    name: 'Fibra ultraveloce',
    icon: 'fibra',
    short: 'Fibra FTTH e FTTC ad alte prestazioni e stabile, con profili simmetrici in FTTH dove disponibili.',
    title: 'Fibra ultraveloce per aziende',
    description:
      'Fibra ottica FTTH e FTTC per aziende tra Varese, Milano e Lecco, con profili simmetrici in FTTH dove disponibili. FibraHero è l\'operatore, con assistenza diretta G8A.',
    intro:
      'Connessioni in fibra ottica FTTH e FTTC ad alte prestazioni e stabili, per lavorare in cloud, fare videochiamate senza scatti e tenere in rete sedi, telecamere e gestionali. Dove arriva la FTTH sono disponibili anche profili simmetrici, con la stessa velocità in download e in upload.',
    forWho: [
      'Uffici che lavorano con gestionali in cloud e videochiamate',
      'Capannoni e laboratori con molte postazioni e telecamere',
      'Studi professionali che inviano e ricevono file pesanti',
    ],
    includes: [
      'Verifica della copertura FTTH o FTTC all\'indirizzo',
      'Profili simmetrici in FTTH, dove disponibili all\'indirizzo',
      'Router professionale configurato e gestito da noi',
      'IP statico per VPN, telecamere e accessi da remoto',
    ],
    faq: [
      {
        q: 'Che differenza c\'è tra FTTH e FTTC?',
        a: 'Con la FTTH la fibra arriva dentro l\'azienda. Con la FTTC arriva all\'armadio in strada e l\'ultimo tratto è in rame, quindi la velocità dipende dalla distanza. Verifichiamo cosa arriva al tuo indirizzo e ti proponiamo la soluzione migliore disponibile.',
      },
      {
        q: 'Cosa vuol dire connessione simmetrica?',
        a: 'Che la velocità in upload è uguale a quella in download. Per un\'azienda conta molto, perché backup in cloud, invio di file, videochiamate e accessi da remoto usano soprattutto l\'upload. I profili simmetrici sono disponibili in FTTH, a seconda dell\'indirizzo; la FTTC ha sempre un upload più basso del download.',
      },
    ],
  },
  {
    slug: 'gestione-rete-aziendale',
    name: 'Gestione rete e dispositivi',
    icon: 'rete',
    short: 'Monitoriamo e gestiamo la tua rete e tutti i dispositivi connessi, per continuità, prestazioni e sicurezza.',
    title: 'Gestione della rete aziendale e dei dispositivi',
    description:
      'Monitoraggio e gestione della rete aziendale e dei dispositivi connessi: router, switch, Wi-Fi, firewall. Un unico referente G8A per linea e rete.',
    intro:
      'Non ci fermiamo alla linea. Monitoriamo e gestiamo la rete interna e tutti i dispositivi connessi, così continuità, prestazioni e sicurezza restano sotto controllo, e quando qualcosa non va c\'è un solo numero da chiamare.',
    forWho: [
      'Aziende senza un tecnico informatico interno',
      'Uffici con Wi-Fi lento o che cade nelle sale riunioni',
      'Chi è stanco del rimpallo tra operatore e informatico',
    ],
    includes: [
      'Monitoraggio della rete e dei dispositivi connessi',
      'Configurazione di router, switch e access point',
      'Wi-Fi aziendale separato per ospiti',
      'Un unico referente per linea e rete interna',
    ],
    faq: [
      {
        q: 'Gestite anche la rete se la linea è di un altro operatore?',
        a: 'Sì, ma con la linea FibraHero seguiamo tutto noi, dal collegamento alla rete interna: non c\'è più nessuno a cui passare la palla.',
      },
    ],
  },
  {
    slug: 'firewall-aziendale',
    name: 'Firewall',
    icon: 'firewall',
    short: 'Proteggiamo la tua azienda da minacce e accessi indesiderati, con regole di sicurezza su misura.',
    title: 'Firewall aziendale gestito',
    description:
      'Firewall aziendale di ultima generazione, configurato e gestito da G8A con regole di sicurezza su misura per proteggere la rete da minacce e accessi indesiderati.',
    intro:
      'Proteggiamo la tua azienda da minacce e accessi indesiderati con firewall di ultima generazione e regole di sicurezza costruite sul modo in cui lavorate, non preimpostate.',
    forWho: [
      'Aziende che gestiscono dati di clienti, ordini o pagamenti',
      'Uffici con collaboratori che lavorano da remoto',
      'Chi deve dimostrare misure di sicurezza adeguate',
    ],
    includes: [
      'Firewall di ultima generazione fornito e installato',
      'Regole di sicurezza su misura per la tua azienda',
      'VPN sicure per chi lavora da casa o in trasferta',
      'Aggiornamenti e gestione a cura dei nostri tecnici',
    ],
    faq: [
      {
        q: 'Il router dell\'operatore non basta?',
        a: 'Il router protegge in modo basilare. Un firewall aziendale filtra il traffico, separa le reti, gestisce le VPN e blocca accessi sospetti con regole decise per la tua azienda.',
      },
    ],
  },
  {
    slug: 'backup-connessione-aziendale',
    name: 'Backup rete',
    icon: 'backup',
    short: 'Soluzioni di backup della rete e dei collegamenti internet, per restare sempre connessi.',
    title: 'Backup della connessione e della rete aziendale',
    description:
      'Linea di backup e continuità della rete aziendale: se la connessione principale cade, l\'azienda resta connessa. Configurata e gestita da G8A.',
    intro:
      'Un guasto sulla linea può fermare casse, gestionale e telefoni. Con il backup della rete e dei collegamenti internet la tua azienda resta connessa: se la linea principale cade, il traffico passa su quella di riserva.',
    forWho: [
      'Negozi e attività che non possono fermare le casse',
      'Aziende con centralino cloud e gestionali online',
      'Chi ha già subito un fermo e non vuole ripeterlo',
    ],
    includes: [
      'Seconda linea di riserva sul collegamento internet',
      'Passaggio automatico quando la linea principale cade',
      'Router e rete configurati per la continuità',
    ],
    faq: [
      {
        q: 'Chi lavora si accorge del passaggio alla linea di backup?',
        a: 'Di solito no, o solo per pochi istanti: il passaggio è automatico e torna sulla linea principale quando è di nuovo disponibile.',
      },
    ],
  },
  {
    slug: 'centralino-cloud-voip',
    name: 'Centralino cloud VoIP',
    icon: 'voip',
    short: 'Centralino in cloud completo: IVR, gruppi, registrazioni, app, chat, videoconferenze e WhatsApp integrato.',
    title: 'Centralino cloud VoIP per aziende',
    description:
      'Centralino telefonico in cloud per aziende: IVR multilivello, gruppi di squillo, registrazione chiamate, app per smartphone, chat, videoconferenze, WhatsApp integrato e sedi collegate. Portabilità dei numeri e assistenza G8A.',
    intro:
      'Un centralino in cloud che fa molto più che squillare. Smisti le chiamate con il risponditore, vedi chi è libero, rispondi dal cellulare come fossi in ufficio, registri le chiamate e apri WhatsApp con un clic. Lo configuriamo noi, con i numeri che hai già.',
    forWho: [
      'Uffici con più interni e un numero principale',
      'Aziende con più sedi che vogliono un unico centralino',
      'Chi lavora anche fuori ufficio e deve restare raggiungibile',
      'Team commerciali e assistenza che gestiscono molte chiamate',
    ],
    includes: [
      'Portabilità dei numeri che hai già',
      'Configurazione di IVR, gruppi e orari fatta da noi',
      'App per smartphone e PC per tutti gli interni',
      'Modifiche e assistenza con un solo referente',
    ],
    featureGroups: [
      {
        title: 'Gestione delle chiamate',
        items: [
          { t: 'IVR multilivello', d: 'Messaggio di benvenuto personalizzato e scelta da tastiera, anche su più livelli, per mandare ogni chiamata all\'ufficio giusto.' },
          { t: 'Gruppi di squillo e code', d: 'Le chiamate in entrata arrivano a gruppi di colleghi, come commerciale o assistenza, e nessuna resta senza risposta.' },
          { t: 'Chiamate dal PC con un clic', d: 'Chiami, metti in attesa e trasferisci a un collega o a un numero esterno direttamente dal computer.' },
          { t: 'Orari e chiusure aziendali', d: 'Fuori orario o nei giorni di chiusura parte in automatico il messaggio giusto, senza disturbare gli interni.' },
          { t: 'Registrazione delle chiamate', d: 'Registri con un clic e ritrovi i file audio quando servono.' },
          { t: 'Casella vocale per ogni interno', d: 'Ogni utente ha la sua segreteria: ascolti, scarichi e gestisci i messaggi.' },
          { t: 'Registro e statistiche', d: 'Chiamate perse, ricevute ed effettuate, con statistiche ed esportazione in Excel.' },
        ],
      },
      {
        title: 'Collaborazione',
        items: [
          { t: 'Stato dei colleghi in tempo reale', d: 'Vedi chi è libero, occupato o in non disturbare, e prenoti la chiamata quando si libera.' },
          { t: 'Chat interna', d: 'Messaggi scritti e vocali, file condivisi e gruppi di lavoro, senza app esterne.' },
          { t: 'WhatsApp integrato', d: 'Apri una chat WhatsApp con un clic dalla rubrica, dal registro chiamate o durante una telefonata.' },
          { t: 'Rubrica condivisa e note', d: 'Contatti personali, di reparto o aziendali. Mentre squilla vedi chi è, le note e le ultime chiamate.' },
          { t: 'Videoconferenze', d: 'Videochiamate con colleghi, gruppi e clienti, anche se loro non hanno il centralino.' },
          { t: 'Promemoria e agenda', d: 'Promemoria di chiamata e videoconferenze su un calendario condivisibile.' },
          { t: 'Affiancamento operatori', d: 'Il responsabile entra in una chiamata in corso per aiutare o formare un collega.' },
        ],
      },
      {
        title: 'Sedi, mobilità e integrazioni',
        items: [
          { t: 'App per smartphone', d: 'Il cellulare diventa un interno aziendale: linee, rubrica, note e chat ovunque sei.' },
          { t: 'Più sedi, un solo centralino', d: 'Colleghi sedi e negozi in un unico sistema, mantenendo numeri e operatori.' },
          { t: 'Integrazione con gestionali e CRM', d: 'Collegamento con i gestionali TeamSystem e con altri software e CRM tramite API.' },
          { t: 'Pannello di controllo unico', d: 'Utenti, interni e sedi sotto controllo da un\'unica schermata.' },
        ],
      },
    ],
    faq: [
      {
        q: 'Perdiamo il numero se cambiamo centralino?',
        a: 'No. Portiamo i numeri che avete già e programmiamo il passaggio per evitare interruzioni.',
      },
      {
        q: 'Servono telefoni nuovi?',
        a: 'Non necessariamente: si può rispondere da PC e smartphone con l\'app. Se volete telefoni da scrivania li forniamo e li configuriamo noi.',
      },
      {
        q: 'Il centralino funziona anche con più sedi?',
        a: 'Sì. Sedi e negozi diversi lavorano come un unico centralino: le chiamate si passano da una sede all\'altra come tra due interni.',
      },
      {
        q: 'Si può collegare al nostro gestionale o CRM?',
        a: 'Sì, con i gestionali TeamSystem in modo nativo e con altri software tramite API. Verifichiamo insieme il vostro caso.',
      },
    ],
  },
  {
    slug: 'noleggio-dispositivi-rete',
    name: 'Noleggio dispositivi',
    icon: 'noleggio',
    short: 'Router, switch, access point, firewall e molto altro a noleggio, configurati e sempre aggiornati.',
    title: 'Noleggio dispositivi di rete per aziende',
    description:
      'Noleggio di router, switch, access point e firewall per aziende, configurati e sostituiti da G8A. Rete sempre aggiornata, senza investimenti iniziali.',
    intro:
      'Noleggiamo e configuriamo i migliori dispositivi di rete: router, switch, access point, firewall e molto altro. La rete resta sempre aggiornata, senza investimenti iniziali e senza pensieri.',
    forWho: [
      'Aziende che non vogliono immobilizzare capitale in hardware',
      'Uffici con apparati vecchi o di marche diverse',
      'Chi vuole un canone chiaro con assistenza inclusa',
    ],
    includes: [
      'Router, switch, access point e firewall professionali',
      'Installazione e configurazione a cura nostra',
      'Sostituzione in caso di guasto',
      'Aggiornamento degli apparati nel tempo',
    ],
    faq: [
      {
        q: 'Cosa succede se un dispositivo a noleggio si guasta?',
        a: 'Lo sostituiamo noi e lo riconfiguriamo come prima: la rete torna a funzionare senza costi a sorpresa.',
      },
    ],
  },
];
