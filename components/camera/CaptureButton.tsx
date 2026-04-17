'use client';

import { motion } from 'framer-motion';

interface CaptureButtonProps {
  onCapture: () => void;
  disabled?: boolean;
}

export default function CaptureButton({ onCapture, disabled }: CaptureButtonProps) {
  return (
    <motion.button
      className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
      onClick={onCapture}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Capture photo"
    >
      <div className="w-14 h-14 rounded-full bg-white" />
    </motion.button>
  );
}
