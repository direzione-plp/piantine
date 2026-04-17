'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DiagnosisCard from '@/components/result/DiagnosisCard';
import CareInstructions from '@/components/result/CareInstructions';
import Button from '@/components/ui/Button';
import { SavedScan } from '@/types/plant';
import { getScanById } from '@/lib/storage';
import { Eye, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SavedResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [scan, setScan] = useState<SavedScan | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const found = getScanById(id);
    if (!found) setNotFound(true);
    else setScan(found);
  }, [id]);

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4 px-4">
        <div className="text-6xl">🌱</div>
        <h2 className="text-2xl font-bold text-green-950">Scansione non trovata</h2>
        <p className="text-stone-500">Questa scansione potrebbe essere stata eliminata o non esiste.</p>
        <Button onClick={() => router.push('/history')}>Torna allo storico</Button>
      </div>
    );
  }

  if (!scan) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => router.push('/history')}
          className="text-sm text-green-700 hover:text-green-900 font-medium"
        >
          ← Storico
        </button>
        <span className="text-stone-300">/</span>
        <span className="text-sm text-stone-500">{scan.plantNickname}</span>
      </div>

      <DiagnosisCard result={scan} />

      {scan.issue.causes.length > 0 && (
        <motion.div
          className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-green-950 mb-4">Cause più comuni</h2>
          <ul className="space-y-2">
            {scan.issue.causes.map((cause) => (
              <li key={cause} className="flex items-start gap-3 text-stone-600">
                <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                </span>
                {cause}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {scan.issue.careInstructions.length > 0 && (
        <CareInstructions instructions={scan.issue.careInstructions} />
      )}

      {scan.issue.watchFor.length > 0 && (
        <div className="bg-green-50 rounded-3xl border border-green-100 p-6">
          <h2 className="text-xl font-bold text-green-950 mb-4">🗓️ Monitora nei prossimi 7 giorni</h2>
          <ul className="space-y-2">
            {scan.issue.watchFor.map((w) => (
              <li key={w} className="flex items-start gap-3 text-green-800 text-sm">
                <Eye className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={() => router.push('/scan')} className="w-full" size="lg">
        <RotateCcw className="w-5 h-5" />
        Scansiona un'altra pianta
      </Button>
      <div className="h-8" />
    </div>
  );
}
