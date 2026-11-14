import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { OutlineUnit } from '@/content/a1/outline';

export function UnitCard({ unit, availableLessons }: { unit: OutlineUnit; availableLessons: number }) {
  const available = unit.status === 'available';
  const body = (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-sm transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Unit {unit.order}</div>
          <h3 className="mt-1 text-lg font-black text-ink">{unit.title}</h3>
          <p className="text-sm font-semibold text-accent-strong">{unit.subtitle}</p>
        </div>
        <Badge tone={available ? 'accent' : 'neutral'}>{available ? 'Available' : 'In authoring'}</Badge>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{unit.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink-muted">
          {available ? `${availableLessons} of ${unit.lessonTitles.length} lessons live` : `${unit.lessonTitles.length} lessons planned`}
        </span>
        {available && <span className="font-bold text-accent-strong">Open unit →</span>}
      </div>
    </div>
  );

  if (!available) {
    return <div aria-disabled="true">{body}</div>;
  }

  return (
    <Link href={`/units/${unit.id}`} className="block h-full">
      {body}
    </Link>
  );
}
