import type { ReactNode } from 'react';
import { cn } from './cn';

export type BadgeTone = 'neutral' | 'accent' | 'sun' | 'sky' | 'rose';

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-paper-strong text-ink-muted border-line',
  accent: 'bg-accent-soft text-accent-strong border-emerald-200',
  sun: 'bg-sun-soft text-sun border-amber-200',
  sky: 'bg-sky-soft text-sky border-sky-200',
  rose: 'bg-rose-soft text-rose border-red-200',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
