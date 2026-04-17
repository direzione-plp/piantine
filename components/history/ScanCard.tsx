'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { SavedScan } from '@/types/plant';
import Badge from '@/components/ui/Badge';

interface ScanCardProps {
  scan: SavedScan;
  onDelete: (id: string) => void;
  index: number;
}

export default function ScanCard({ scan, onDelete, index }: ScanCardProps) {
  const date = new Date(scan.timestamp).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex gap-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      {/* Thumbnail */}
      <div className="w-28 h-28 flex-shrink-0">
        <img
          src={scan.imageDataUrl}
          alt={scan.plantNickname}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-green-950 truncate">{scan.plantNickname}</h3>
            <Badge severity={scan.issue.severity} className="flex-shrink-0 text-xs" />
          </div>
          <p className="text-stone-500 text-sm mt-1 line-clamp-2">{scan.issue.name}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-stone-400">{date}</span>
          <div className="flex gap-2">
            <Link
              href={`/result/${scan.id}`}
              className="text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
            >
              Vedi →
            </Link>
            <button
              onClick={() => onDelete(scan.id)}
              className="text-stone-300 hover:text-red-400 transition-colors"
              aria-label="Elimina scansione"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
