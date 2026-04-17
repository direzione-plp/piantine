'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CameraView from '@/components/camera/CameraView';
import { analyzePlant } from '@/lib/analyzePlant';
import { ResultSkeleton } from '@/components/ui/Skeleton';

type ScanState = 'camera' | 'analyzing' | 'error';

export default function ScanPage() {
  const router = useRouter();
  const [scanState, setScanState] = useState<ScanState>('camera');
  const [error, setError] = useState<string | null>(null);

  async function handleCapture(dataUrl: string) {
    setScanState('analyzing');
    try {
      const response = await analyzePlant({ imageDataUrl: dataUrl });
      if (response.error) throw new Error(response.error);

      sessionStorage.setItem('plant_doctor_result', JSON.stringify(response.result));
      router.push('/result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analisi fallita. Riprova.');
      setScanState('error');
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {scanState === 'camera' && (
          <motion.div
            key="camera"
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CameraView onCapture={handleCapture} />
          </motion.div>
        )}

        {scanState === 'analyzing' && (
          <motion.div
            key="analyzing"
            className="flex-1 bg-stone-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-lg mx-auto">
              <div className="text-center pt-12 pb-4 px-4">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔍
                </motion.div>
                <h2 className="text-2xl font-black text-green-950">Analisi della tua pianta in corso…</h2>
                <p className="text-stone-500 mt-2">
                  Cerco segni di stress, parassiti o malattie. Ci vuole solo un momento.
                </p>
              </div>
              <ResultSkeleton />
            </div>
          </motion.div>
        )}

        {scanState === 'error' && (
          <motion.div
            key="error"
            className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl">😕</div>
            <h2 className="text-2xl font-bold text-green-950">Qualcosa è andato storto</h2>
            <p className="text-stone-500 max-w-xs">{error}</p>
            <button
              className="bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-colors"
              onClick={() => { setError(null); setScanState('camera'); }}
            >
              Riprova
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
