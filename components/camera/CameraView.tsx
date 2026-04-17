'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FlipHorizontal, Upload } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';
import CaptureButton from './CaptureButton';
import Button from '@/components/ui/Button';

interface CameraViewProps {
  onCapture: (dataUrl: string) => void;
}

export default function CameraView({ onCapture }: CameraViewProps) {
  const { videoRef, canvasRef, state, startCamera, flipCamera, capture } = useCamera();
  const fileRef = useRef<HTMLInputElement>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  useEffect(() => {
    startCamera();
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const cameras = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(cameras.length > 1);
    });
  }, [startCamera]);

  function handleCapture() {
    const dataUrl = capture();
    if (dataUrl) onCapture(dataUrl);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onCapture(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (state === 'unsupported') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center gap-6">
        <div className="text-6xl">📷</div>
        <h2 className="text-2xl font-bold text-green-950">Fotocamera non disponibile</h2>
        <p className="text-stone-500 max-w-xs">
          Il tuo browser non supporta l'accesso alla fotocamera. Puoi comunque caricare una foto dal tuo dispositivo.
        </p>
        <Button onClick={() => fileRef.current?.click()} size="lg">
          <Upload className="w-5 h-5" />
          Carica una foto
        </Button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center gap-6">
        <div className="text-6xl">🔒</div>
        <h2 className="text-2xl font-bold text-green-950">Accesso alla fotocamera negato</h2>
        <p className="text-stone-500 max-w-sm">
          Plant Doctor ha bisogno di accedere alla fotocamera per scansionare le tue piante. Consenti l'accesso nelle impostazioni del browser e aggiorna la pagina.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => startCamera()} size="md">Riprova</Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()} size="md">
            <Upload className="w-4 h-4" />
            Carica foto
          </Button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-black">
      {/* Video feed */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-3xl border border-white/20" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-white rounded-tl-2xl" style={{ borderWidth: 3 }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-white rounded-tr-2xl" style={{ borderWidth: 3 }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-white rounded-bl-2xl" style={{ borderWidth: 3 }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-white rounded-br-2xl" style={{ borderWidth: 3 }} />

            {state === 'active' && (
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
              />
            )}
          </div>
        </div>

        {/* Helper text */}
        <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {state === 'requesting' ? 'Avvio fotocamera…' : 'Centra la foglia nel riquadro'}
          </div>
        </div>

        {/* Flip camera button */}
        {hasMultipleCameras && state === 'active' && (
          <button
            className="absolute top-6 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={flipCamera}
            aria-label="Cambia fotocamera"
          >
            <FlipHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-black/90 py-8 flex items-center justify-center gap-8">
        <button
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => fileRef.current?.click()}
          aria-label="Carica dalla galleria"
        >
          <Upload className="w-5 h-5" />
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

        <CaptureButton onCapture={handleCapture} disabled={state !== 'active'} />

        <div className="w-12 h-12" />
      </div>
    </div>
  );
}
