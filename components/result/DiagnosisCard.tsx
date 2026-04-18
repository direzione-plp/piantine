'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import ConfidenceBar from './ConfidenceBar';
import { ScanResult } from '@/types/plant';

interface DiagnosisCardProps {
  result: ScanResult;
}

export default function DiagnosisCard({ result }: DiagnosisCardProps) {
  const { issue, imageDataUrl, plantType } = result;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Captured image */}
      <div className="relative h-64 w-full bg-stone-100">
        <img
          src={imageDataUrl}
          alt="Pianta scansionata"
          className="w-full h-full object-cover"
        />
        {/* Severity badge — bottom left */}
        <div className="absolute bottom-4 left-4">
          <Badge severity={issue.severity} />
        </div>
        {/* Plant type pill — bottom right, only when identified */}
        {plantType && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
            <span className="text-xs font-semibold text-green-900 leading-none">{plantType}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-black text-green-950">{issue.name}</h1>
          <p className="text-stone-600 mt-1 leading-relaxed">{issue.summary}</p>
        </div>
        <ConfidenceBar value={issue.confidence} />
      </div>
    </motion.div>
  );
}
