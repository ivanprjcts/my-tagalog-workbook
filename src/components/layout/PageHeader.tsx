import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';

export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {eyebrow && (
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">{eyebrow}</div>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl">{title}</h1>
            {description && <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>}
            {meta && <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export function MetaBadges({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <Badge key={item} tone="accent">
          {item}
        </Badge>
      ))}
    </>
  );
}
