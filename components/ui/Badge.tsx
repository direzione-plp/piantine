import { cn } from '@/lib/utils';
import { IssueSeverity } from '@/types/plant';

interface BadgeProps {
  severity: IssueSeverity;
  className?: string;
}

const labels: Record<IssueSeverity, string> = {
  healthy: 'Sana',
  low: 'Lieve',
  medium: 'Moderato',
  high: 'Attenzione',
  urgent: 'Urgente',
};

const styles: Record<IssueSeverity, string> = {
  healthy: 'bg-green-100 text-green-800 border-green-200',
  low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  medium: 'bg-orange-100 text-orange-800 border-orange-200',
  high: 'bg-red-100 text-red-800 border-red-200',
  urgent: 'bg-red-600 text-white border-red-700',
};

export default function Badge({ severity, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border',
        styles[severity],
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current opacity-80" />
      {labels[severity]}
    </span>
  );
}
