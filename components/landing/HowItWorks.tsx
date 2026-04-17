'use client';

import { motion } from 'framer-motion';
import { ScanLine, Cpu, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: ScanLine,
    step: '01',
    title: 'Apri la fotocamera',
    desc: 'Tocca "Inizia la scansione" e punta la fotocamera sulla pianta o su una foglia specifica. Usa la luce naturale per i migliori risultati.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Scatta e analizza',
    desc: 'Scatta la foto e lascia che Plant Doctor analizzi l\'immagine in pochi secondi per identificare eventuali problemi di salute.',
  },
  {
    icon: HeartHandshake,
    step: '03',
    title: 'Ricevi il tuo piano di cura',
    desc: 'Ottieni una diagnosi chiara con un punteggio di confidenza e istruzioni di cura personalizzate per aiutare la tua pianta a riprendersi.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Come funziona
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-green-950 mt-3">
            Tre passi per una pianta più sana
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-green-200 to-green-200" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="relative inline-flex w-24 h-24 bg-gradient-to-br from-green-800 to-green-600 rounded-3xl items-center justify-center shadow-xl mb-6 mx-auto">
                <s.icon className="w-10 h-10 text-white" />
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-400 rounded-full text-white text-xs font-black flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-3">{s.title}</h3>
              <p className="text-stone-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
