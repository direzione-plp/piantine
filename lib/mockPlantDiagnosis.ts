import { PlantIssue, IssueCategory } from '@/types/plant';

const issues: Record<IssueCategory, PlantIssue> = {
  healthy: {
    id: 'healthy',
    name: 'Ottimo aspetto!',
    summary:
      'La tua pianta sembra in perfetta salute con foglie vibranti e nessun segno visibile di stress. Continua così!',
    severity: 'healthy',
    confidence: 92,
    causes: [
      'Routine di annaffiatura costante',
      'Esposizione alla luce appropriata',
      'Terreno ben drenante',
    ],
    watchFor: [
      'Crescita di nuove foglie nella prossima settimana',
      'Colore e consistenza delle foglie costanti',
      'Steli fermi e dritti',
    ],
    careInstructions: [
      {
        category: 'watering',
        title: 'Mantieni la costanza',
        description:
          'Annaffia quando i primi 2 cm di terreno sono asciutti. Evita cambiamenti bruschi nella tua routine.',
        icon: '💧',
      },
      {
        category: 'light',
        title: 'Mantieni la luce attuale',
        description:
          'La tua pianta ama il suo posto attuale. Tienila lontana dal sole diretto intenso o dalla penombra profonda.',
        icon: '☀️',
      },
      {
        category: 'humidity',
        title: "L'umidità standard va bene",
        description:
          "La maggior parte delle case ha umidità adeguata. Vaporizza occasionalmente se noti punte di foglie secche.",
        icon: '🌫️',
      },
      {
        category: 'soil',
        title: 'Nessuna azione necessaria',
        description:
          'Il terreno sembra equilibrato. Considera una leggera concimazione durante la stagione di crescita primaverile ed estiva.',
        icon: '🌱',
      },
    ],
  },
  overwatering: {
    id: 'overwatering',
    name: 'Annaffiatura eccessiva sospetta',
    summary:
      "Le foglie mostrano segni di ingiallimento e possibile stress alle radici — un classico indicatore di troppa acqua. Non preoccuparti, si risolve facilmente!",
    severity: 'medium',
    confidence: 78,
    causes: [
      'Annaffiatura troppo frequente',
      'Vaso senza fori di drenaggio',
      'Terreno pesante che trattiene l\'umidità',
      'Poca luce che rallenta l\'assorbimento dell\'acqua',
    ],
    watchFor: [
      'Controlla se l\'ingiallimento si diffonde nei prossimi 7 giorni',
      'Osserva se lo stelo alla base diventa molle',
      'Cerca miglioramenti man mano che il terreno si asciuga',
    ],
    careInstructions: [
      {
        category: 'watering',
        title: 'Lascia asciugare il terreno',
        description:
          'Salta l\'annaffiatura per 7–10 giorni. Poi controlla il terreno: annaffia solo quando i primi 3 cm sono completamente asciutti.',
        icon: '💧',
      },
      {
        category: 'soil',
        title: 'Controlla il marciume radicale',
        description:
          'Rimuovi delicatamente la pianta e ispeziona le radici. Taglia quelle nere o molli e rinvasa in un mix fresco e ben drenante.',
        icon: '🌱',
      },
      {
        category: 'light',
        title: 'Aumenta la luce indiretta',
        description:
          'Spostarla in un posto più luminoso (senza sole diretto) aiuta il terreno ad asciugarsi più velocemente e favorisce la ripresa.',
        icon: '☀️',
      },
      {
        category: 'urgency',
        title: 'Agisci entro la settimana',
        description:
          "Non farti prendere dal panico — ma agisci presto. L'annaffiatura eccessiva prolungata può portare al marciume radicale, più difficile da invertire.",
        icon: '⏰',
      },
    ],
  },
  underwatering: {
    id: 'underwatering',
    name: 'Annaffiatura insufficiente sospetta',
    summary:
      'Foglie che appassiscono o bordi secchi e croccanti suggeriscono che la tua pianta ha sete. Una buona annaffiatura e un programma costante la faranno riprendere rapidamente.',
    severity: 'low',
    confidence: 85,
    causes: [
      'Annaffiatura poco frequente',
      'Terreno a drenaggio rapido o sabbioso',
      'Temperature elevate o bassa umidità',
      'Pianta con le radici a disagio che non riesce a trattenere l\'acqua',
    ],
    watchFor: [
      'Le foglie dovrebbero riprendersi entro 24 ore dall\'annaffiatura',
      'Monitora l\'appassimento continuo',
      'Controlla se il terreno rimane umido per almeno un giorno dopo l\'annaffiatura',
    ],
    careInstructions: [
      {
        category: 'watering',
        title: 'Dagli una bella bevuta',
        description:
          'Annaffia abbondantemente finché l\'acqua non esce dal fondo. Poi stabilisci un programma regolare — controlla il terreno ogni 2–3 giorni.',
        icon: '💧',
      },
      {
        category: 'humidity',
        title: 'Aumenta l\'umidità intorno alla pianta',
        description:
          'Vaporizza leggermente le foglie o metti un vassoio con ghiaia e acqua nelle vicinanze per aumentare l\'umidità locale.',
        icon: '🌫️',
      },
      {
        category: 'soil',
        title: 'Considera un mix che trattiene più umidità',
        description:
          'Se il terreno si asciuga troppo velocemente, aggiungi un po\' di fibra di cocco al prossimo rinvaso.',
        icon: '🌱',
      },
      {
        category: 'light',
        title: 'Evita il sole intenso del pomeriggio',
        description:
          'La luce indiretta brillante è ideale. Il sole diretto intenso aumenta la perdita d\'acqua e lo stress.',
        icon: '☀️',
      },
    ],
  },
  leaf_burn: {
    id: 'leaf_burn',
    name: 'Scottatura foglie / troppo sole',
    summary:
      'Macchie sbiancate o punte marroni bruciate suggeriscono che la pianta riceve troppa luce solare diretta. Spostarla leggermente farà una grande differenza.',
    severity: 'low',
    confidence: 81,
    causes: [
      'Sole diretto intenso del pomeriggio attraverso il vetro',
      'Spostamento improvviso in un posto molto più luminoso',
      'Foglie vaporizzate esposte al sole diretto di recente',
    ],
    watchFor: [
      'Le macchie bruciate esistenti non si riprendono — osserva la nuova crescita sana',
      'Controlla che le nuove foglie siano di un verde sano',
      'Monitora ulteriori sbiancamenti dopo il riposizionamento',
    ],
    careInstructions: [
      {
        category: 'light',
        title: 'Sposta in luce indiretta brillante',
        description:
          'Un posto vicino a una finestra con una tenda leggera è ideale. Evita finestre esposte a sud senza filtro durante l\'estate.',
        icon: '☀️',
      },
      {
        category: 'pruning',
        title: 'Taglia le foglie danneggiate',
        description:
          'Rimuovi le foglie gravemente bruciate con forbici pulite per aiutare la pianta a concentrare l\'energia sulla nuova crescita.',
        icon: '✂️',
      },
      {
        category: 'watering',
        title: 'Non vaporizzare al sole diretto',
        description:
          'Le gocce d\'acqua sulle foglie agiscono come lenti d\'ingrandimento. Vaporizza sempre la mattina presto o la sera.',
        icon: '💧',
      },
      {
        category: 'humidity',
        title: 'Mantieni un\'umidità moderata',
        description:
          "Un'umidità stabile intorno al 40–60% aiuta la pianta a gestire meglio lo stress da calore e luce.",
        icon: '🌫️',
      },
    ],
  },
  fungal: {
    id: 'fungal',
    name: 'Possibile problema fungino',
    summary:
      'Macchie, residui polverosi o scolorimento insolito potrebbero indicare un\'infezione fungina. Se individuato in tempo, la maggior parte dei problemi fungini risponde bene al trattamento.',
    severity: 'high',
    confidence: 70,
    causes: [
      'Alta umidità e scarsa circolazione dell\'aria',
      'Annaffiatura eccessiva che crea condizioni umide',
      'Acqua che rimane a lungo sulle foglie',
      'Terreno infetto o contatto con piante colpite',
    ],
    watchFor: [
      'Osserva se le macchie si diffondono nei prossimi 3–5 giorni',
      'Controlla il retro delle foglie per un rivestimento bianco polveroso',
      'Cerca miglioramenti 5 giorni dopo il trattamento',
    ],
    careInstructions: [
      {
        category: 'urgency',
        title: 'Isola la pianta',
        description:
          'Spostala immediatamente lontano dalle altre piante per evitare la diffusione. I problemi fungini possono passare facilmente tra le piante vicine.',
        icon: '⚠️',
      },
      {
        category: 'pruning',
        title: 'Rimuovi le foglie colpite',
        description:
          'Taglia le foglie con macchie visibili o rivestimento usando forbici pulite e disinfettate. Smaltiscile — non nel compost.',
        icon: '✂️',
      },
      {
        category: 'humidity',
        title: 'Migliora la circolazione dell\'aria',
        description:
          'Sposta in un posto ben ventilato. Evita di vaporizzare fino alla risoluzione. Un piccolo ventilatore nelle vicinanze aiuta ad asciugare il fogliame.',
        icon: '🌫️',
      },
      {
        category: 'soil',
        title: 'Applica un trattamento fungino',
        description:
          'Uno spray all\'olio di neem diluito (1 cucchiaino di neem + una goccia di sapone per i piatti in 1L d\'acqua) applicato settimanalmente è un trattamento naturale efficace.',
        icon: '🌱',
      },
    ],
  },
  nutrient: {
    id: 'nutrient',
    name: 'Segni di carenza nutritiva',
    summary:
      "Foglie pallide, schemi di colore insoliti o crescita stentata segnalano spesso la mancanza di nutrienti chiave — molto comune nelle piante che non sono state rinvasate o concimate di recente.",
    severity: 'medium',
    confidence: 74,
    causes: [
      'Non fertilizzata da oltre 6 mesi',
      'Nutrienti del terreno esauriti dalle annaffiature ripetute',
      'Pianta con radici a disagio che non riesce ad assorbire i nutrienti in modo efficiente',
      'pH del terreno errato che blocca l\'assorbimento dei nutrienti',
    ],
    watchFor: [
      'Miglioramento del colore delle foglie 2–3 settimane dopo la concimazione',
      'Controlla che le nuove foglie crescano di un verde sano',
      'Osserva l\'ingiallimento che progredisce lungo lo stelo',
    ],
    careInstructions: [
      {
        category: 'soil',
        title: 'Concima con un fertilizzante bilanciato',
        description:
          'Usa un fertilizzante liquido bilanciato (come NPK 10-10-10) a metà dose ogni 2 settimane in primavera ed estate.',
        icon: '🌱',
      },
      {
        category: 'watering',
        title: 'Annaffia prima di concimare',
        description:
          'Annaffia sempre prima, poi applica il fertilizzante liquido per evitare di bruciare le radici.',
        icon: '💧',
      },
      {
        category: 'pruning',
        title: 'Considera il rinvaso',
        description:
          'Se la pianta ha le radici a disagio, un terreno fresco ripristinerà i nutrienti. Scegli un vaso di una misura più grande — non troppo grande.',
        icon: '✂️',
      },
      {
        category: 'light',
        title: 'Assicura luce adeguata per l\'assorbimento dei nutrienti',
        description:
          'Le piante con pochissima luce non riescono a elaborare i nutrienti in modo efficace. La luce indiretta brillante migliora l\'assorbimento.',
        icon: '☀️',
      },
    ],
  },
  pest: {
    id: 'pest',
    name: 'Allerta parassiti',
    summary:
      'Piccole macchie, ragnatele, residui appiccicosi o danni insoliti alle foglie suggeriscono ospiti indesiderati. La maggior parte dei parassiti comuni si tratta a casa con pazienza.',
    severity: 'high',
    confidence: 76,
    causes: [
      'Acari ragnetto che prosperano in ambienti secchi',
      'Fungus gnat da terreno costantemente umido',
      'Cocciniglie o scudetti da piante infette nelle vicinanze',
      'Afidi da una finestra aperta o una nuova pianta',
    ],
    watchFor: [
      'Controlla il retro delle foglie quotidianamente per uova o insetti',
      'Osserva nuovi danni dopo il trattamento',
      'Controlla le piante vicine per segni di diffusione',
    ],
    careInstructions: [
      {
        category: 'urgency',
        title: 'Isola immediatamente',
        description:
          'Tieni la pianta lontana da tutte le altre. I parassiti si diffondono velocemente e possono infettare tutta la tua collezione.',
        icon: '⚠️',
      },
      {
        category: 'pruning',
        title: 'Pulisci le foglie',
        description:
          'Usa un panno umido con qualche goccia di olio di neem per rimuovere manualmente i parassiti da tutte le superfici fogliari — sopra e sotto.',
        icon: '✂️',
      },
      {
        category: 'soil',
        title: 'Tratta con spray all\'olio di neem',
        description:
          'Mescola 1 cucchiaino di olio di neem + 1 goccia di sapone per piatti + 1L d\'acqua. Spruzza abbondantemente ogni 5–7 giorni per 3 settimane.',
        icon: '🌱',
      },
      {
        category: 'humidity',
        title: 'Regola in base al tipo di parassita',
        description:
          'Gli acari amano l\'aria secca — aumenta l\'umidità. I fungus gnat amano il terreno bagnato — lascia asciugare lo strato superficiale tra le annaffiature.',
        icon: '🌫️',
      },
    ],
  },
  low_confidence: {
    id: 'low_confidence',
    name: 'Serve una foto migliore',
    summary:
      "L'immagine è un po' poco chiara per una diagnosi sicura. Riprova con una luce migliore e la foglia che riempie la maggior parte del riquadro.",
    severity: 'low',
    confidence: 35,
    causes: [
      'Immagine troppo scura o sovraesposta',
      'Pianta sfocata',
      'Foglia non centrata nel riquadro',
    ],
    watchFor: [
      'Riprova con la foglia vicina e ben illuminata',
      'Usa la luce naturale diurna per i risultati migliori',
    ],
    careInstructions: [
      {
        category: 'urgency',
        title: 'Riprova la scansione',
        description:
          'Avvicinati alla foglia, assicurati che sia a fuoco e usa la luce naturale diurna per il risultato più chiaro.',
        icon: '📷',
      },
    ],
  },
};

const categories: IssueCategory[] = [
  'healthy',
  'overwatering',
  'underwatering',
  'leaf_burn',
  'fungal',
  'nutrient',
  'pest',
  'low_confidence',
];

export function getMockDiagnosis(): PlantIssue {
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return issues[randomCategory];
}

export function getDiagnosisById(id: IssueCategory): PlantIssue {
  return issues[id];
}

export function getAllIssues(): PlantIssue[] {
  return Object.values(issues);
}
