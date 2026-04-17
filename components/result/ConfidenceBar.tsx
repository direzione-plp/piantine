'use client';

import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  value: number; // 0–100
}

function getColor(v: number) {
  if (v >= 80) return 'bg-green-500';
  if (v >= 60) return 'bg-yellow-400';
  return 'bg-orange-400';
}

function getLabel(v: number) {
  if (v >= 80) return 'Alta confidenza';
  if (v >= 60) return 'Confidenza moderata';
  return 'Bassa confidenza — considera di ripetere la scansione';
}

export default function ConfidenceBar({ value }: ConfidenceBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-stone-600">Confidenza</span>
        <span className="text-sm font-bold text-stone-800">{value}%</span>
      </div>
      <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs text-stone-400 mt-1.5">{getLabel(value)}</p>
    </div>
  );
}
