'use client';

import { useCallback, useEffect, useState } from 'react';
import { SavedScan } from '@/types/plant';
import { deleteScan, getSavedScans, saveScan } from '@/lib/storage';
import { ScanResult } from '@/types/plant';

export function usePlantHistory() {
  const [scans, setScans] = useState<SavedScan[]>([]);

  useEffect(() => {
    setScans(getSavedScans());
  }, []);

  const save = useCallback((result: ScanResult, nickname?: string) => {
    const saved = saveScan(result, nickname);
    setScans(getSavedScans());
    return saved;
  }, []);

  const remove = useCallback((id: string) => {
    deleteScan(id);
    setScans(getSavedScans());
  }, []);

  return { scans, save, remove };
}
