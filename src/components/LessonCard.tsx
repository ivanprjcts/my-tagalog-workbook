import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { Lesson } from '@/content/schema';

export function LessonCard({ lesson, available }: { lesson: Lesson; available: boolean }) {
  const body = (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-sm transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Lesson {lesson.order}</div>
        <Badge tone={available ? 'accent' : 'neutral'}>{available ? 'Ready' : 'Draft'}</Badge>
      </div>
      <h3 className="mt-2 text-lg font-black text-ink">{lesson.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{lesson.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-ink-muted">{lesson.estimatedMinutes} min</span>
        {available && <span className="font-bold text-accent-strong">Start →</span>}
      </div>
    </div>
  );

  if (!available) return <div aria-disabled="true">{body}</div>;

  return (
    <Link href={`/units/${lesson.unitId}/lessons/${lesson.slug}`} className="block h-full">
      {body}
    </Link>
  );
}
