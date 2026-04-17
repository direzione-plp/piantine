'use client';

import { motion } from 'framer-motion';
import { CareInstruction } from '@/types/plant';

interface CareInstructionsProps {
  instructions: CareInstruction[];
}

const categoryLabels: Record<CareInstruction['category'], string> = {
  watering: 'Annaffiatura',
  light: 'Luce',
  humidity: 'Umidità',
  soil: 'Terreno e rinvaso',
  pruning: 'Potatura e pulizia',
  urgency: 'Cosa fare prima',
};

const categoryColors: Record<CareInstruction['category'], string> = {
  watering: 'bg-blue-50 border-blue-100',
  light: 'bg-yellow-50 border-yellow-100',
  humidity: 'bg-sky-50 border-sky-100',
  soil: 'bg-amber-50 border-amber-100',
  pruning: 'bg-green-50 border-green-100',
  urgency: 'bg-orange-50 border-orange-100',
};

export default function CareInstructions({ instructions }: CareInstructionsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-green-950 mb-4">Istruzioni di cura</h2>
      <div className="grid gap-4">
        {instructions.map((inst, i) => (
          <motion.div
            key={`${inst.category}-${i}`}
            className={`rounded-2xl border p-4 ${categoryColors[inst.category]}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0 mt-0.5">{inst.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-stone-400">
                    {categoryLabels[inst.category]}
                  </span>
                </div>
                <h3 className="font-bold text-green-950 mb-1">{inst.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{inst.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
