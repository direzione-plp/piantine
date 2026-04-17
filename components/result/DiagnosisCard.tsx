'use client';

import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import ConfidenceBar from './ConfidenceBar';
import { ScanResult } from '@/types/plant';

interface DiagnosisCardProps {
  result: ScanResult;
}

export default function DiagnosisCard({ result }: DiagnosisCardProps) {
  const { issue, imageDataUrl } = result;

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
        <div className="absolute bottom-4 left-4">
          <Badge severity={issue.severity} />
        </div>
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
