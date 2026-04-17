'use client';

import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { IssueSeverity } from '@/types/plant';

const samples = [
  {
    emoji: '🪴',
    name: 'Monstera deliciosa',
    issue: 'Annaffiatura eccessiva sospetta',
    summary: 'Foglie gialle in basso e suolo bagnato rilevati. Lascia asciugare completamente prima della prossima annaffiatura.',
    severity: 'medium' as IssueSeverity,
    confidence: 78,
  },
  {
    emoji: '🌵',
    name: 'Mix di cactus',
    issue: 'Ottimo aspetto!',
    summary: 'Colore sano, consistenza compatta, umidità appropriata. Nessuna azione necessaria — continua così!',
    severity: 'healthy' as IssueSeverity,
    confidence: 95,
  },
  {
    emoji: '🪻',
    name: 'Pothos aureus',
    issue: 'Scottatura foglie / troppo sole',
    summary: 'Macchie sbiancate sulle foglie superiori indicano luce diretta intensa. Sposta in un posto con luce indiretta.',
    severity: 'low' as IssueSeverity,
    confidence: 82,
  },
  {
    emoji: '🌺',
    name: 'Ficus lyrata',
    issue: 'Possibile problema fungino',
    summary: 'Trovate macchie marroni con alone giallo. Isola e tratta con uno spray a base di olio di neem.',
    severity: 'high' as IssueSeverity,
    confidence: 71,
  },
];

export default function SampleDiagnoses() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Diagnosi di esempio
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-green-950 mt-3">
            Guardalo in azione
          </h2>
          <p className="text-stone-500 mt-4 max-w-lg mx-auto text-lg">
            Esempi reali di diagnosi che Plant Doctor può fornirti in pochi secondi.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {samples.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-stone-400 font-medium">{s.name}</p>
                    <h3 className="font-bold text-green-950">{s.issue}</h3>
                  </div>
                  <Badge severity={s.severity} className="flex-shrink-0" />
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">{s.summary}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${s.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-stone-500">{s.confidence}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
