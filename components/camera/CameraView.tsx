'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, FlipHorizontal, Upload, ImageIcon } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';
import CaptureButton from './CaptureButton';

interface CameraViewProps {
  onCapture: (dataUrl: string) => void;
}

export default function CameraView({ onCapture }: CameraViewProps) {
  const { videoRef, canvasRef, state, startCamera, flipCamera, capture } = useCamera();
  const fileRef = useRef<HTMLInputElement>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    startCamera();
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      setHasMultipleCameras(devices.filter((d) => d.kind === 'videoinput').length > 1);
    });
  }, [startCamera]);

  function handleCapture() {
    const dataUrl = capture();
    if (dataUrl) onCapture(dataUrl);
  }

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => onCapture(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }

  const cameraPanel = (
    <div className="relative flex flex-col h-full bg-black">
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Corner frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <div className="absolute inset-0 rounded-3xl border border-white/20" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-2xl" />
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

        {/* Status pill */}
        <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {state === 'requesting'
              ? 'Avvio fotocamera…'
              : state === 'denied'
              ? 'Accesso negato'
              : 'Centra la foglia nel riquadro'}
          </div>
        </div>

        {/* Flip button */}
        {hasMultipleCameras && state === 'active' && (
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={flipCamera}
            aria-label="Cambia fotocamera"
          >
            <FlipHorizontal className="w-5 h-5" />
          </button>
        )}

        {/* Permission denied overlay */}
        {state === 'denied' && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-4 text-white p-8 text-center">
            <div className="text-5xl">🔒</div>
            <p className="font-bold text-lg">Accesso alla fotocamera negato</p>
            <p className="text-sm text-white/70 max-w-xs">
              Consenti l'accesso nelle impostazioni del browser, poi riprova.
            </p>
            <button
              onClick={() => startCamera()}
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold text-sm hover:bg-stone-100 transition-colors"
            >
              Riprova
            </button>
          </div>
        )}
      </div>

      {/* Shutter bar */}
      <div className="bg-black/90 py-6 flex items-center justify-center">
        <CaptureButton onCapture={handleCapture} disabled={state !== 'active'} />
      </div>
    </div>
  );

  const uploadPanel = (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-stone-50">
      <div
        className={`w-full max-w-sm rounded-3xl border-2 border-dashed transition-all duration-200 p-10 flex flex-col items-center gap-5 cursor-pointer select-none ${
          dragOver
            ? 'border-green-500 bg-green-50 scale-[1.02]'
            : 'border-stone-300 bg-white hover:border-green-400 hover:bg-green-50/50'
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-green-700" />
        </div>
        <div className="text-center">
          <p className="font-bold text-green-950 text-lg">Carica una foto</p>
          <p className="text-stone-500 text-sm mt-1">Trascina qui o clicca per sfogliare</p>
          <p className="text-stone-400 text-xs mt-2">JPG, PNG, HEIC · max 20 MB</p>
        </div>
        <button
          className="bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-green-700 transition-colors pointer-events-none"
        >
          Sfoglia file
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUploadChange}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar — mobile only */}
      <div className="flex md:hidden bg-white border-b border-stone-200 flex-shrink-0">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'camera'
              ? 'text-green-800 border-green-700'
              : 'text-stone-500 border-transparent'
          }`}
          onClick={() => setActiveTab('camera')}
        >
          <Camera className="w-4 h-4" />
          Fotocamera
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'upload'
              ? 'text-green-800 border-green-700'
              : 'text-stone-500 border-transparent'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <Upload className="w-4 h-4" />
          Carica foto
        </button>
      </div>

      {/* Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Camera panel: active tab on mobile, always visible on desktop */}
        <div className={`${activeTab === 'camera' ? 'flex' : 'hidden'} md:flex flex-1 flex-col`}>
          {cameraPanel}
        </div>

        {/* Divider — desktop only */}
        <div className="hidden md:block w-px bg-stone-200 flex-shrink-0" />

        {/* Upload panel: active tab on mobile, always visible on desktop */}
        <div className={`${activeTab === 'upload' ? 'flex' : 'hidden'} md:flex flex-1 flex-col`}>
          {uploadPanel}
        </div>
      </div>
    </div>
  );
}
