'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScanLine } from 'lucide-react';
import FilterBar from '@/components/history/FilterBar';
import ScanCard from '@/components/history/ScanCard';
import Button from '@/components/ui/Button';
import { usePlantHistory } from '@/hooks/usePlantHistory';
import { IssueSeverity } from '@/types/plant';

export default function HistoryPage() {
  const { scans, remove } = usePlantHistory();
  const [filter, setFilter] = useState<IssueSeverity | 'all'>('all');

  const filtered =
    filter === 'all' ? scans : scans.filter((s) => s.issue.severity === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-green-950">Il tuo storico piante</h1>
        <p className="text-stone-500 mt-1">Tutte le tue scansioni precedenti, salvate per una facile consultazione.</p>
      </div>

      {scans.length > 0 && (
        <div className="mb-6">
          <FilterBar active={filter} onChange={setFilter} />
        </div>
      )}

      {filtered.length === 0 && scans.length > 0 && (
        <div className="text-center py-16 text-stone-400">
          <p className="text-lg font-medium">Nessuna scansione con questo stato</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-2 text-sm text-green-700 hover:text-green-900"
          >
            Rimuovi filtro
          </button>
        </div>
      )}

      {scans.length === 0 && (
        <motion.div
          className="text-center py-24 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center text-5xl">
            🪴
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-950">Nessuna scansione ancora</h2>
            <p className="text-stone-500 mt-2 max-w-xs mx-auto">
              Scansiona la tua prima pianta per iniziare a costruire il tuo storico e monitorarne la salute nel tempo.
            </p>
          </div>
          <Link href="/scan">
            <Button size="lg">
              <ScanLine className="w-5 h-5" />
              Scansiona la tua prima pianta
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="space-y-4">
        {filtered.map((scan, i) => (
          <ScanCard key={scan.id} scan={scan} onDelete={remove} index={i} />
        ))}
      </div>

      {scans.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/scan">
            <Button size="md">
              <ScanLine className="w-4 h-4" />
              Nuova scansione
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
