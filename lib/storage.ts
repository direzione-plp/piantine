import { SavedScan, ScanResult } from '@/types/plant';

const STORAGE_KEY = 'plant_doctor_scans';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getSavedScans(): SavedScan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScan(result: ScanResult, nickname?: string): SavedScan {
  const saved: SavedScan = {
    ...result,
    plantNickname: nickname || result.plantNickname || 'My Plant',
  };
  const scans = getSavedScans();
  scans.unshift(saved);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
  }
  return saved;
}

export function deleteScan(id: string): void {
  const scans = getSavedScans().filter((s) => s.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
  }
}

export function getScanById(id: string): SavedScan | null {
  return getSavedScans().find((s) => s.id === id) ?? null;
}
