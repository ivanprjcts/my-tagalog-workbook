import type { ReactNode } from 'react';
import { cn } from './cn';

export type CalloutVariant = 'tip' | 'culture' | 'spanish' | 'mistake' | 'warning';

const STYLES: Record<CalloutVariant, { shell: string; label: string; title: string }> = {
  tip: {
    shell: 'border-emerald-200 bg-emerald-50',
    label: 'Tip',
    title: 'text-emerald-900',
  },
  culture: {
    shell: 'border-sky-200 bg-sky-50',
    label: 'Culture',
    title: 'text-sky-900',
  },
  spanish: {
    shell: 'border-amber-200 bg-amber-50',
    label: 'Desde el español',
    title: 'text-amber-900',
  },
  mistake: {
    shell: 'border-red-200 bg-red-50',
    label: 'Common mistake',
    title: 'text-red-900',
  },
  warning: {
    shell: 'border-orange-200 bg-orange-50',
    label: 'Careful',
    title: 'text-orange-900',
  },
};

export function Callout({
  variant = 'tip',
  title,
  children,
  className,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const style = STYLES[variant];
  return (
    <aside className={cn('rounded-xl border p-4 sm:p-5', style.shell, className)}>
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-muted">{style.label}</div>
      {title && <h3 className={cn('mb-2 text-base font-bold', style.title)}>{title}</h3>}
      <div className="prose-lesson text-sm text-ink">{children}</div>
    </aside>
  );
}
