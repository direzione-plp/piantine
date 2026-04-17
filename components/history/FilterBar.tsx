'use client';

import { IssueSeverity } from '@/types/plant';
import { cn } from '@/lib/utils';

const filters: { label: string; value: IssueSeverity | 'all' }[] = [
  { label: 'Tutte', value: 'all' },
  { label: 'Sana', value: 'healthy' },
  { label: 'Lieve', value: 'low' },
  { label: 'Moderato', value: 'medium' },
  { label: 'Attenzione', value: 'high' },
  { label: 'Urgente', value: 'urgent' },
];

interface FilterBarProps {
  active: IssueSeverity | 'all';
  onChange: (v: IssueSeverity | 'all') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
            active === f.value
              ? 'bg-green-800 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
