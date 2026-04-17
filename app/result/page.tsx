'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScanLine, Save, RotateCcw, Eye } from 'lucide-react';
import DiagnosisCard from '@/components/result/DiagnosisCard';
import CareInstructions from '@/components/result/CareInstructions';
import Button from '@/components/ui/Button';
import { ScanResult } from '@/types/plant';
import { saveScan } from '@/lib/storage';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [nickname, setNickname] = useState('La mia pianta');
  const [showNicknameInput, setShowNicknameInput] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('plant_doctor_result');
    if (!raw) {
      router.replace('/scan');
      return;
    }
    setResult(JSON.parse(raw));
  }, [router]);

  if (!result) return null;

  function handleSave() {
    if (!result) return;
    saveScan(result, nickname);
    setSaved(true);
    setShowNicknameInput(false);
  }

  const { issue } = result;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <DiagnosisCard result={result} />

      {/* Common causes */}
      {issue.causes.length > 0 && (
        <motion.div
          className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-xl font-bold text-green-950 mb-4">Cause più comuni</h2>
          <ul className="space-y-2">
            {issue.causes.map((cause) => (
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

      {/* Care instructions */}
      {issue.careInstructions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CareInstructions instructions={issue.careInstructions} />
        </motion.div>
      )}

      {/* Watch over 7 days */}
      {issue.watchFor.length > 0 && (
        <motion.div
          className="bg-green-50 rounded-3xl border border-green-100 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-green-950 mb-4">
            🗓️ Monitora nei prossimi 7 giorni
          </h2>
          <ul className="space-y-2">
            {issue.watchFor.map((w) => (
              <li key={w} className="flex items-start gap-3 text-green-800 text-sm">
                <Eye className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                {w}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Save section */}
      <motion.div
        className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {saved ? (
          <div className="text-center py-2">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-bold text-green-800">Salvata nel tuo storico!</p>
            <button
              onClick={() => router.push('/history')}
              className="text-sm text-green-600 hover:text-green-800 mt-1 font-medium"
            >
              Vedi lo storico →
            </button>
          </div>
        ) : showNicknameInput ? (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-stone-700">
              Dai un soprannome alla tua pianta
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="es. Monstera Margherita"
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4" />
                Salva
              </Button>
              <Button variant="secondary" onClick={() => setShowNicknameInput(false)}>
                Annulla
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowNicknameInput(true)}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            <Save className="w-5 h-5" />
            Salva questa diagnosi
          </Button>
        )}
      </motion.div>

      {/* Scan again */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={() => router.push('/scan')}
          variant="primary"
          className="w-full"
          size="lg"
        >
          <RotateCcw className="w-5 h-5" />
          Scansiona un'altra pianta
        </Button>
      </motion.div>

      <div className="h-8" />
    </div>
  );
}
