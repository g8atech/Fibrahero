// File generato da scripts/sync-guide.mjs (workflow "Guide di Nina"): guide di fibrahero approvate e firmate in Brain.
// Non modificarlo a mano: si corregge in Brain → Marketing → Guide.
/* eslint-disable */
export const GUIDE_NINA: any[] = [
  {
    "slug": "backup-connessione-internet-azienda",
    "titolo": "Backup connessione internet azienda: serve davvero?",
    "h1": "Backup della connessione internet per l'azienda: serve davvero?",
    "descrizione": "Il backup della connessione internet in azienda serve? Come funziona il failover su 4G/5G, quando conviene e cosa controllare. Chiedi una verifica.",
    "intro": "Se la tua azienda lavora con gestionale in cloud, posta, telefono VoIP, cassa o pagamenti elettronici, quando cade internet ti fermi. Il backup della connessione è una seconda via d'uscita che entra in funzione da sola quando la linea principale non risponde. Per molte attività è una protezione semplice e sensata, ma non per tutte: vediamo come capire se serve a te.",
    "in_breve": [
      "Serve se, senza internet, in ufficio o in negozio non puoi lavorare, incassare o rispondere ai clienti.",
      "Il backup più comune è una seconda connessione, spesso su rete mobile 4G/5G, collegata a un router che passa da una linea all'altra in automatico (failover).",
      "Non basta una SIM in un cassetto: il router giusto, la prova prima del guasto e un gruppo di continuità fanno la differenza.",
      "Se internet ti serve solo per navigare, puoi anche valutare di farne a meno: conta quanto costa a te un'ora di fermo."
    ],
    "sezioni": [
      {
        "punti": [],
        "titolo": "Che cos'è il backup della connessione internet?",
        "paragrafi": [
          "È una seconda connessione che resta in attesa. Quando la linea principale, per esempio la fibra, smette di funzionare, il router sposta il traffico sulla linea di riserva. Quando la principale torna, il router ci ritorna da solo.",
          "Questo passaggio si chiama failover, e il ritorno failback. Non è un backup dei file: non salva i tuoi dati, tiene aperta la porta verso internet."
        ]
      },
      {
        "punti": [
          "Usi un gestionale o un programma di fatturazione in cloud.",
          "Hai un centralino VoIP o telefoni che passano da internet.",
          "Incassi con POS o casse collegate alla rete.",
          "Hai telecamere, allarmi o accessi che devi poter controllare da remoto.",
          "Lavori con clienti che ti scrivono o ti chiamano tutto il giorno.",
          "Hai una sede dove le persone lavorano insieme su file condivisi online."
        ],
        "titolo": "Quando il backup serve davvero?",
        "paragrafi": [
          "La domanda giusta non è «la mia fibra si guasta?». Nessuna connessione è sicura al 100%, e i guasti possono arrivare da un cantiere, da un cavo tranciato o da un problema dell'operatore, cose che non dipendono da te. La domanda giusta è: cosa succede alla mia attività se internet manca per qualche ora?"
        ]
      },
      {
        "punti": [],
        "titolo": "Quando puoi farne a meno?",
        "paragrafi": [
          "Se in ufficio internet serve soprattutto per consultare qualche sito e una volta al giorno la posta, e se potete lavorare qualche ora offline o dal telefono, un backup dedicato può essere un di più. In quel caso, un'alternativa semplice è sapere in anticipo come condividere la connessione dallo smartphone in caso di emergenza.",
          "Fai due conti in modo onesto: quante persone si fermano, quanti ordini o appuntamenti perdi, quanto ti pesa non rispondere ai clienti. Se il fermo è un fastidio, forse basta. Se è un danno, il backup si ripaga."
        ]
      },
      {
        "punti": [],
        "titolo": "Come funziona il backup su 4G/5G?",
        "immagine": {
          "alt": "Schema del failover: guasto della fibra e passaggio automatico del router alla linea di riserva",
          "url": "https://ijrrnuurjbgugystlfry.supabase.co/storage/v1/object/public/guide-immagini/fibrahero/backup-connessione-internet-azienda-1cd0bf68.jpg",
          "fonte": "nina",
          "didascalia": "Il failover in tre passi"
        },
        "paragrafi": [
          "La soluzione più diffusa per chi ha la fibra è una connessione su rete mobile. Serve un router con due ingressi internet (dual WAN) o con una SIM dati integrata. Il router controlla di continuo la linea principale: se non risponde, attiva la rete mobile e instrada il traffico lì.",
          "Poiché la rete mobile è pensata come riserva, di solito si usa solo nei momenti di guasto e non come seconda linea sempre attiva. In alternativa si può usare una seconda linea fissa, meglio se passa per un percorso diverso dalla prima: due linee che viaggiano nello stesso cavo si fermano insieme."
        ]
      },
      {
        "punti": [
          "Il router supporta il failover automatico e non richiede di fare nulla a mano.",
          "Il segnale mobile nel punto in cui è installato il router è buono: va misurato, non dato per scontato.",
          "La linea di riserva è davvero indipendente da quella principale, per quanto possibile anche come operatore o tecnologia.",
          "Router, centralino e apparati di rete sono collegati a un gruppo di continuità, altrimenti un black-out ti ferma comunque.",
          "Le chiamate in corso possono cadere nel momento del passaggio: chiedi come si comporta il tuo centralino.",
          "Servizi come telecamere o accessi da remoto possono richiedere un indirizzo IP fisso anche sulla linea di riserva: chiedilo prima.",
          "Il passaggio è stato simulato, staccando la linea principale in un momento tranquillo."
        ],
        "titolo": "Cosa controllare perché il backup funzioni davvero",
        "paragrafi": [
          "Un backup che non è mai stato provato è una speranza, non una protezione. Prima di fidarti controlla questi punti."
        ]
      },
      {
        "punti": [
          "Non affidarti a una SIM inserita in un router economico senza averlo provato.",
          "Non dare per buona una promessa di velocità sulla linea di riserva: la rete mobile varia con la zona e con l'orario.",
          "Non usare la linea di riserva per tutto il traffico pesante, come aggiornamenti e copie di file: le regole del router servono proprio a evitarlo.",
          "Non confondere il backup della connessione con il backup dei dati: servono tutti e due, ma proteggono cose diverse."
        ],
        "titolo": "Cosa non fare",
        "paragrafi": []
      },
      {
        "punti": [],
        "titolo": "Cosa fa FibraHero per il backup",
        "paragrafi": [
          "FibraHero è l'operatore di connettività di G8A Technology, solo per aziende. Non controlliamo la rete in strada, ma progettiamo bene la rete dentro la tua sede: fibra, backup, router, firewall e Wi-Fi pensati insieme, così l'azienda non si ferma. Se vuoi capire come funziona il servizio, leggi la pagina sul backup della connessione aziendale.",
          "L'assistenza è diretta, con i tecnici G8A, negli orari della sede e con presa in carico in giornata. Per velocità reali e tempi di attivazione sul tuo indirizzo, la strada giusta è la verifica copertura."
        ]
      }
    ],
    "faq": [
      {
        "d": "Il backup si attiva da solo?",
        "r": "Sì, se il router supporta il failover automatico. Il router controlla la linea principale e, quando non risponde, sposta il traffico sulla riserva. Le chiamate in corso possono cadere, quelle successive partono sulla linea di riserva."
      },
      {
        "d": "Basta una SIM 4G in un router qualsiasi?",
        "r": "Di solito no. Serve un router adatto al failover, un segnale mobile verificato nel punto di installazione e una prova fatta prima del guasto."
      },
      {
        "d": "Il backup della connessione protegge anche i miei file?",
        "r": "No. Mantiene l'accesso a internet, non salva i dati. Per i file serve un backup dei dati separato."
      },
      {
        "d": "La linea di riserva ha la stessa velocità della fibra?",
        "r": "Non necessariamente. Serve a far continuare il lavoro, non a replicare in tutto la linea principale. Per i valori reali sul tuo indirizzo usa la verifica copertura."
      },
      {
        "d": "Serve anche un gruppo di continuità?",
        "r": "È consigliato per router, centralino e apparati di rete: se manca la corrente, anche il miglior backup si ferma."
      }
    ],
    "link": [
      {
        "url": "/backup-connessione-aziendale",
        "testo": "backup della connessione aziendale"
      },
      {
        "url": "/guide/fibra-ftth-o-fttc-azienda",
        "testo": "fibra FTTH o FTTC per l'azienda"
      },
      {
        "url": "/gestione-rete-aziendale",
        "testo": "gestione della rete aziendale"
      },
      {
        "url": "/firewall-aziendale",
        "testo": "firewall aziendale"
      },
      {
        "url": "/centralino-cloud-voip",
        "testo": "centralino cloud VoIP"
      },
      {
        "url": "/verifica-copertura",
        "testo": "verifica la copertura al tuo indirizzo"
      },
      {
        "url": "/prezzi",
        "testo": "prezzi e canoni"
      }
    ],
    "extra": {},
    "copertina": {
      "alt": "Router aziendale con linea in fibra e linea di riserva 4G/5G per il backup della connessione internet",
      "url": "https://ijrrnuurjbgugystlfry.supabase.co/storage/v1/object/public/guide-immagini/fibrahero/backup-connessione-internet-azienda-19b6874a.jpg",
      "fonte": "nina"
    },
    "firmato_da": "Antonio Arrigo",
    "pubblicata_il": "2026-11-14",
    "aggiornata_il": "2026-11-14"
  },
  {
    "slug": "fibra-ftth-o-fttc-azienda",
    "titolo": "Fibra FTTH o FTTC per l'azienda: differenze e scelta",
    "h1": "Fibra FTTH o FTTC per l'azienda: quale arriva al tuo ufficio e quale ti serve",
    "descrizione": "FTTH o FTTC per la tua azienda: cosa cambia davvero, come riconoscerle nel contratto e come scoprire quale arriva al tuo indirizzo. Guida pratica.",
    "intro": "La differenza tra FTTH e FTTC è nell'ultimo tratto del collegamento: nella FTTH la fibra arriva fino ai locali dell'azienda, nella FTTC si ferma all'armadio in strada e poi prosegue su rame. Per un'azienda questo conta per stabilità e prestazioni, ma la scelta dipende da cosa è disponibile al tuo indirizzo e da come è fatta la rete interna. Qui trovi come distinguerle e come decidere senza farti guidare solo dalla sigla.",
    "in_breve": [
      "FTTH: fibra ottica fino ai tuoi locali. FTTC: fibra fino all'armadio stradale, poi cavo in rame.",
      "Cosa puoi attivare dipende dall'indirizzo: la velocità reale e i tempi si vedono solo con la verifica di copertura.",
      "Nel contratto cerca la tecnologia indicata (AGCOM: F per fibra, FR per fibra e rame), non solo la parola «fibra».",
      "Qualunque linea scegli, una connessione di backup e una rete interna ben fatta evitano il fermo dell'attività."
    ],
    "sezioni": [
      {
        "punti": [],
        "titolo": "Che differenza c'è tra FTTH e FTTC?",
        "immagine": {
          "alt": "Confronto FTTH e FTTC: fibra fino all'ufficio contro fibra fino all'armadio e rame nell'ultimo tratto",
          "url": "https://ijrrnuurjbgugystlfry.supabase.co/storage/v1/object/public/guide-immagini/fibrahero/fibra-ftth-o-fttc-azienda-a38ccab9.jpg",
          "fonte": "nina",
          "didascalia": "Dove si ferma la fibra: l'unica differenza che conta davvero è l'ultimo tratto."
        },
        "paragrafi": [
          "Entrambe usano la fibra ottica per una parte del percorso. Cambia il punto in cui la fibra si ferma.",
          "Con la FTTC (Fiber To The Cabinet) la fibra arriva all'armadio che vedi sul marciapiede. Da lì all'ufficio il collegamento è il vecchio cavo telefonico in rame. Per questo si parla di fibra mista rame.",
          "Con la FTTH (Fiber To The Home) la fibra arriva direttamente nei tuoi locali e il rame non c'è più.",
          "C'è anche la FTTB, dove la fibra arriva all'edificio e poi prosegue in rame dentro il palazzo. Se il tuo ufficio è in un condominio o in un centro direzionale, chiedi quale delle tre ti viene proposta."
        ]
      },
      {
        "punti": [
          "Gestionale, cloud e backup online che lavorano tutto il giorno.",
          "Videochiamate e telefono VoIP, che soffrono se la linea è instabile.",
          "Più persone collegate insieme, anche con Wi-Fi e telecamere.",
          "Invio di file grandi, dove conta la velocità in upload e non solo in download."
        ],
        "titolo": "Perché la differenza conta per un'azienda?",
        "paragrafi": [
          "Il rame è più sensibile a distanza, disturbi e invecchiamento dell'impianto. La fibra pura dipende meno da questi fattori, quindi di norma offre prestazioni più costanti.",
          "Per un'azienda i punti che si sentono di più sono questi:"
        ]
      },
      {
        "punti": [],
        "titolo": "Come capire se nel tuo contratto c'è FTTH o FTTC?",
        "paragrafi": [
          "Non fidarti della parola «fibra» nel nome dell'offerta: la usano anche le offerte miste rame. Cerca la tecnologia scritta nella scheda del contratto.",
          "AGCOM chiede agli operatori di indicare la tecnologia con un sistema di bollini: la sigla F indica la fibra fino ai locali, FR la fibra con ultimo tratto in rame. La scheda dell'offerta e il contratto riportano anche la velocità minima e quella tipica.",
          "Un segnale pratico: in molti casi la FTTH arriva con un cavo in fibra che entra nei locali e si collega a un apparato dedicato. Se hai ancora la presa telefonica classica come unico ingresso, probabilmente sei su rame. Se hai dubbi, un tecnico lo verifica in pochi minuti."
        ]
      },
      {
        "punti": [],
        "titolo": "Quale fibra arriva al mio indirizzo?",
        "paragrafi": [
          "Dipende dalla via e dall'edificio, non dal comune. Nella stessa zona un civico può avere la FTTH e quello accanto solo la FTTC.",
          "Per questo la risposta seria si ottiene solo dalla verifica per indirizzo. Velocità reali e tempi di attivazione non si promettono a priori: si leggono dopo la verifica.",
          "Noi non controlliamo la rete in strada. Quello che facciamo è dirti cosa è disponibile e progettare bene la rete dentro l'azienda."
        ]
      },
      {
        "punti": [
          "Quante persone lavorano in contemporanea e con quali programmi?",
          "Usi cloud, gestionale online, telefono VoIP o telecamere?",
          "Quanto costa un'ora di internet fermo alla tua attività?",
          "Hai già una linea di riserva?",
          "Il contratto attuale ha vincoli o scadenze da rispettare?"
        ],
        "titolo": "FTTH o FTTC: come scegliere senza sbagliare?",
        "paragrafi": [
          "Se la FTTH è disponibile al tuo indirizzo, di solito è la scelta più solida per un'attività che lavora online. Se c'è solo la FTTC, può comunque bastare per uno studio o un negozio con usi normali.",
          "Prima di decidere rispondi a queste domande:"
        ]
      },
      {
        "punti": [],
        "titolo": "La fibra migliore basta a non fermarsi?",
        "paragrafi": [
          "No. Anche la linea migliore può interrompersi per un guasto in strada, lavori o un problema dell'apparato. Non è un difetto di una tecnologia: succede a tutte.",
          "La difesa è avere un backup della connessione, su rete mobile 4G/5G o su una seconda linea, che entra in funzione quando la principale cade. Conta anche la rete interna: un firewall configurato bene, switch e Wi-Fi gestiti evitano che il problema sia dentro l'ufficio e non fuori.",
          "Un consiglio da non dimenticare: se cambi operatore, non disdire la vecchia linea prima di sapere quando parte la nuova. Se devi portare il numero fisso, chiedi al tuo consulente e verifica le regole di portabilità sul sito AGCOM."
        ]
      },
      {
        "punti": [],
        "titolo": "Cosa succede quando ci chiedi una verifica?",
        "paragrafi": [
          "Ci dai l'indirizzo dell'ufficio e un'idea di come lavori: quante postazioni, quali servizi online, se hai già una linea di riserva. Controlliamo cosa è disponibile e ti diciamo quale soluzione ha senso.",
          "Se scegli di lavorare con noi, i tecnici G8A seguono direttamente l'installazione e la rete, con assistenza negli orari della tua sede e presa in carico in giornata."
        ]
      }
    ],
    "faq": [
      {
        "d": "La FTTC è vera fibra ottica?",
        "r": "È fibra mista rame: la fibra arriva fino all'armadio in strada e l'ultimo tratto è in rame. Funziona meglio dell'ADSL, ma non è fibra fino ai locali come la FTTH."
      },
      {
        "d": "La FTTH è sempre più veloce della FTTC?",
        "r": "In generale la FTTH offre prestazioni più alte e costanti. La velocità reale però dipende da offerta e indirizzo: la verifica di copertura ti dà i dati del tuo ufficio."
      },
      {
        "d": "Posso passare da FTTC a FTTH?",
        "r": "Solo se la FTTH è disponibile al tuo indirizzo. Si controlla con la verifica di copertura; se l'edificio non è ancora raggiunto, serve attendere o valutare alternative."
      },
      {
        "d": "Cosa significano F e FR nelle offerte?",
        "r": "Sono le sigle con cui l'AGCOM classifica la tecnologia: F per la fibra fino ai locali, FR per la fibra con ultimo tratto in rame."
      },
      {
        "d": "Se ho la fibra, mi serve ancora un backup?",
        "r": "Sì, se l'attività si ferma senza internet. Un guasto può colpire anche una linea ottima: il backup su 4G/5G o su una seconda linea tiene in piedi l'essenziale."
      },
      {
        "d": "Cambiando operatore rischio di restare senza internet?",
        "r": "Con una pianificazione corretta no: la linea vecchia si chiude solo quando la nuova funziona. Per numero fisso e contratto sentì il tuo consulente."
      }
    ],
    "link": [
      {
        "url": "/fibra-ultraveloce-aziende",
        "testo": "Fibra FTTH e FTTC per aziende"
      },
      {
        "url": "/verifica-copertura",
        "testo": "Verifica la copertura al tuo indirizzo"
      },
      {
        "url": "/backup-connessione-aziendale",
        "testo": "Backup della connessione aziendale"
      },
      {
        "url": "/gestione-rete-aziendale",
        "testo": "Gestione della rete aziendale"
      },
      {
        "url": "/firewall-aziendale",
        "testo": "Firewall aziendale"
      },
      {
        "url": "/prezzi",
        "testo": "Prezzi e offerte per le aziende"
      },
      {
        "url": "/fibra-aziendale",
        "testo": "Fibra aziendale nelle zone servite"
      },
      {
        "url": "/domande-frequenti",
        "testo": "Domande frequenti"
      }
    ],
    "extra": {},
    "copertina": {
      "alt": "Schema di fibra FTTH e FTTC per un ufficio: fibra fino ai locali o fino all'armadio stradale",
      "url": "https://ijrrnuurjbgugystlfry.supabase.co/storage/v1/object/public/guide-immagini/fibrahero/fibra-ftth-o-fttc-azienda-81f464c7.jpg",
      "fonte": "nina"
    },
    "firmato_da": "Antonio Arrigo",
    "pubblicata_il": "2026-11-13",
    "aggiornata_il": "2026-11-13"
  }
];
