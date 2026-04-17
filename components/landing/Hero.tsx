'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScanLine, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 flex flex-col md:flex-row items-center gap-16">
        {/* Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-green-200 mb-8">
            <Sparkles className="w-4 h-4" />
            Analisi AI della salute delle piante
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Scansiona la pianta.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-200">
              Capisci la sua salute.
            </span>{' '}
            Aiutala a fiorire.
          </h1>

          <p className="text-lg md:text-xl text-green-200 max-w-xl mb-10 leading-relaxed">
            Punta la fotocamera su qualsiasi pianta d'appartamento e ricevi una
            diagnosi istantanea con istruzioni di cura personalizzate — nessuna
            esperienza botanica richiesta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/scan">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 shadow-2xl gap-3 rounded-2xl">
                <ScanLine className="w-5 h-5" />
                Inizia la scansione
              </Button>
            </Link>
            <Link href="/guide">
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/30 rounded-2xl gap-2"
              >
                Esplora la guida alla cura
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-green-400 text-sm">
            Gratuito · Nessun account richiesto · Funziona su qualsiasi telefono
          </p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative w-64 h-[520px]">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950 rounded-[3rem] shadow-2xl border border-white/10" />
            <div className="absolute inset-2 bg-green-950 rounded-[2.5rem] overflow-hidden">
              <div className="h-8 bg-green-900/50 flex items-center justify-center">
                <div className="w-20 h-1.5 bg-stone-700 rounded-full" />
              </div>
              <div className="relative flex-1 h-full bg-gradient-to-b from-green-800/30 to-transparent flex flex-col items-center justify-center p-4 gap-4">
                <div className="w-40 h-40 relative">
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/40" />
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    🌿
                  </div>
                </div>
                <p className="text-white/70 text-xs text-center">Centra la foglia nel riquadro</p>
                <div className="w-16 h-16 rounded-full border-4 border-white/50 flex items-center justify-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -right-6 top-20 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center text-lg">⚠️</div>
            <div>
              <p className="text-xs font-bold text-stone-800">Annaffiatura eccessiva</p>
              <p className="text-xs text-stone-500">78% di confidenza</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -left-8 bottom-28 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-lg">✅</div>
            <div>
              <p className="text-xs font-bold text-stone-800">Pianta sana</p>
              <p className="text-xs text-stone-500">92% di confidenza</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fafaf9" />
        </svg>
      </div>
    </section>
  );
}
