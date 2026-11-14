import type { ReactNode } from 'react';
import { cn } from './cn';

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-dashed border-line bg-white p-8 text-center', className)}>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
