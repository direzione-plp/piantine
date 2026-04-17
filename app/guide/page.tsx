'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScanLine } from 'lucide-react';
import Button from '@/components/ui/Button';

const guides = [
  {
    emoji: '🍋',
    title: 'Cosa significano davvero le foglie gialle?',
    category: 'Diagnosi',
    summary:
      "L'ingiallimento è uno dei sintomi più comuni delle piante — ma ha molte cause. Ecco come distinguerle.",
    tips: [
      'Foglie inferiori che ingialliscono naturalmente = invecchiamento normale, nessuna azione',
      'Ingiallimento generalizzato con suolo bagnato = annaffiatura eccessiva — salta qualche annaffiatura',
      'Giallo con venature pallide = carenza di nutrienti — prova un fertilizzante bilanciato',
      'Bordi gialli con punte marroni = annaffiatura insufficiente o umidità troppo bassa',
      'Giallo con piccole macchie marroni = infezione fungina — migliora la ventilazione',
    ],
  },
  {
    emoji: '💧',
    title: 'Con quale frequenza annaffiare?',
    category: 'Annaffiatura',
    summary:
      'Non esiste un programma di annaffiatura universale — dipende dalla tua pianta, dal vaso e dall\'ambiente. Ecco come trovare il tuo.',
    tips: [
      'Test del dito: inserisci 2 cm nel terreno — se asciutto, annaffia; se umido, aspetta',
      'I vasi grandi e in ceramica si asciugano più lentamente della terracotta',
      'La maggior parte delle piante preferisce asciugarsi leggermente tra le annaffiature',
      "Annaffia abbondantemente fino a quando l'acqua non esce dal foro di drenaggio, poi smetti",
      "Riduci l'annaffiatura in inverno — le piante crescono più lentamente e ne hanno bisogno di meno",
    ],
  },
  {
    emoji: '☀️',
    title: 'Le basi della luce per principianti',
    category: 'Luce',
    summary:
      'La luce è la parte più trascurata della cura delle piante. Queste semplici regole coprono il 90% delle necessità delle piante d\'appartamento.',
    tips: [
      'Luce indiretta brillante = vicino a una finestra ma non al sole diretto',
      "Il sole diretto attraverso finestre esposte a sud può bruciare le foglie",
      'Le piante da ombra (pothos, sansevieria) tollerano angoli più bui',
      'Ruota la pianta ogni mese perché tutti i lati ricevano luce uniforme',
      "L'ingiallimento sul lato in ombra spesso indica che ha bisogno di più luce",
    ],
  },
  {
    emoji: '🪴',
    title: 'Segnali che la tua pianta ha bisogno di rinvaso',
    category: 'Terreno e vasi',
    summary:
      'Le piante con le radici a disagio smettono di crescere. Presta attenzione a questi segnali che è ora di cambiare vaso.',
    tips: [
      'Radici che escono dal foro di drenaggio',
      "L'acqua scorre direttamente senza essere assorbita",
      'La pianta si asciuga molto velocemente dopo l\'annaffiatura',
      'Il terreno si stacca dai bordi del vaso',
      "Nessuna nuova crescita nonostante le buone cure in primavera ed estate",
      'Rinvasa in primavera — scegli sempre un vaso di misura leggermente più grande',
    ],
  },
  {
    emoji: '🐛',
    title: 'Individuare i parassiti in anticipo',
    category: 'Parassiti',
    summary:
      'La maggior parte dei parassiti è invisibile finché non si cerca con attenzione. Un controllo settimanale può salvare tutta la tua collezione.',
    tips: [
      'Controlla prima il retro delle foglie — è lì che si nasconde la maggior parte dei parassiti',
      'Ragnatele minuscole = acari (adorano l\'aria secca)',
      'Macchie bianche cotonose = cocciniglie (tratta con alcool isopropilico)',
      'Foglie appiccicose = cocciniglie a scudo o afidi',
      'Moscerini che volano dal terreno = fungus gnats — lascia asciugare il terreno',
      'Isola immediatamente qualsiasi pianta colpita per evitare la diffusione',
    ],
  },
  {
    emoji: '🌫️',
    title: 'L\'umidità e le tue piante',
    category: 'Umidità',
    summary:
      'Molte piante d\'appartamento popolari sono tropicali e amano l\'umidità. Ecco come dargli ciò di cui hanno bisogno.',
    tips: [
      'Punte delle foglie secche e croccanti = umidità troppo bassa (comune nelle case riscaldate)',
      'Raggruppa le piante insieme — si aumentano l\'umidità a vicenda',
      'Vassoio con ghiaia: riempi un vassoio con ghiaia e acqua, appoggia il vaso sopra',
      'Evita di vaporizzare direttamente sulle foglie in presenza di problemi fungini',
      'Un piccolo umidificatore vicino alla tua collezione funziona benissimo',
      'La maggior parte delle tropicali prospera tra il 50 e il 70% di umidità relativa',
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
          Guida alla cura delle piante
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-green-950 mt-2 mb-4">
          Tutto quello che ti serve per tenere le piante felici
        </h1>
        <p className="text-stone-500 text-lg max-w-2xl">
          Guide pratiche e senza gergo tecnico per i proprietari di piante di tutti i giorni. Nessuna esperienza richiesta.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {guides.map((g, i) => (
          <motion.div
            key={g.title}
            className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                {g.emoji}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-orange-500">
                  {g.category}
                </span>
                <h2 className="font-bold text-green-950 text-lg leading-tight">{g.title}</h2>
              </div>
            </div>

            <p className="text-stone-500 text-sm mb-4 leading-relaxed">{g.summary}</p>

            <ul className="space-y-2">
              {g.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 mt-2" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="bg-gradient-to-br from-green-900 to-green-800 rounded-3xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-black mb-3">Non sei ancora sicuro del problema?</h2>
        <p className="text-green-200 mb-6 max-w-md mx-auto">
          Lascia che Plant Doctor dia un'occhiata. Scansiona la tua pianta per una diagnosi personalizzata in pochi secondi.
        </p>
        <Link href="/scan">
          <Button className="bg-white text-green-900 hover:bg-green-50" size="lg">
            <ScanLine className="w-5 h-5" />
            Scansiona la mia pianta
          </Button>
        </Link>
      </motion.div>

      <div className="h-16" />
    </div>
  );
}
