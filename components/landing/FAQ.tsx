'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Quanto è accurata la diagnosi delle piante?',
    a: 'Plant Doctor utilizza l\'analisi AI delle immagini per identificare i sintomi visivi più comuni. L\'accuratezza dipende dalla qualità dell\'immagine e dall\'illuminazione. Per i migliori risultati, usa una buona luce naturale e centra la foglia chiaramente nel riquadro. Il punteggio di confidenza indica quanto è certa l\'analisi.',
  },
  {
    q: "L'app funziona offline?",
    a: "La fotocamera e l'acquisizione delle immagini funzionano offline. L'analisi AI richiede attualmente una connessione a internet. Le diagnosi salvate dalle scansioni precedenti sono sempre disponibili nella tua cronologia.",
  },
  {
    q: 'Su quali piante funziona?',
    a: 'Plant Doctor funziona meglio con le piante d\'appartamento comuni. Identifica i sintomi di salute piuttosto che le specie specifiche — quindi se la tua pianta mostra ingiallimento, appassimento o macchie, può aiutarti indipendentemente dalla varietà.',
  },
  {
    q: 'I miei dati sono al sicuro?',
    a: 'La tua cronologia di scansioni è salvata localmente sul tuo dispositivo. Nessuna immagine o dato personale viene inviato a server esterni oltre a quanto necessario per l\'analisi AI.',
  },
  {
    q: 'Posso usarla senza fotocamera?',
    a: "Sì! Puoi caricare una foto dalla tua galleria se l'accesso alla fotocamera non è disponibile. L'opzione \"Carica foto\" appare nella pagina di scansione.",
  },
  {
    q: 'E se la diagnosi non sembra corretta?',
    a: 'Prova a scansionare di nuovo con una luce migliore e una visione più chiara dell\'area interessata. Un punteggio di confidenza inferiore al 60% di solito significa che la foto potrebbe essere migliorata per un risultato più affidabile.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 font-semibold text-green-950 hover:text-green-700 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Domande frequenti
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-green-950 mt-3">
            Hai domande?
          </h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-sm border border-stone-100 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
