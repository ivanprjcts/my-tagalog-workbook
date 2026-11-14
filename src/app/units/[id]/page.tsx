import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUnit } from '@/content/a1';
import { A1_OUTLINE } from '@/content/a1/outline';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { LessonCard } from '@/components/LessonCard';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';

interface UnitDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return A1_OUTLINE.map((unit) => ({ id: unit.id }));
}

export default async function UnitDetailPage({ params }: UnitDetailPageProps) {
  const { id } = await params;
  const outline = A1_OUTLINE.find((unit) => unit.id === id);
  if (!outline) notFound();

  const unit = getUnit(id);
  const availableLessons = unit?.lessons ?? [];
  const availableTitles = new Set(availableLessons.map((lesson) => lesson.title));

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
        <Breadcrumbs items={[{ label: 'Learn', href: '/units' }, { label: outline.title }]} />
      </div>

      <PageHeader
        eyebrow={`Unit ${outline.order}`}
        title={outline.title}
        description={outline.description}
        meta={
          <>
            <Badge tone={unit ? 'accent' : 'neutral'}>{unit ? 'Available now' : 'In authoring'}</Badge>
            <Badge tone="neutral">{outline.lessonTitles.length} lessons</Badge>
            <Badge tone="neutral">A1</Badge>
          </>
        }
        actions={
          unit ? (
            <>
              <Link
                href={`/units/${outline.id}/lessons/${availableLessons[0].slug}`}
                className={buttonStyles('primary', 'md')}
              >
                Start this unit
              </Link>
              {availableLessons.length === outline.lessonTitles.length && (
                <Link href={`/units/${outline.id}/quiz`} className={buttonStyles('secondary', 'md')}>
                  Unit quiz
                </Link>
              )}
            </>
          ) : (
            <Link href="/units/unit-1" className={buttonStyles('secondary', 'md')}>
              Go to Unit 1
            </Link>
          )
        }
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {unit && (
          <section className="mb-10" aria-labelledby="can-do">
            <h2 id="can-do" className="mb-3 text-xl font-black text-ink">By the end of this unit</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {unit.canDo.map((item) => (
                <div key={item} className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-ink">
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="lessons">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 id="lessons" className="text-xl font-black text-ink">Lessons</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {availableLessons.length > 0
                  ? `${availableLessons.length} of ${outline.lessonTitles.length} lessons are live.`
                  : 'This unit is being authored. The lesson outline is below.'}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} available />
            ))}
          </div>

          <div className="mt-6 space-y-2">
            {outline.lessonTitles.map((title, index) => {
              if (availableTitles.has(title)) return null;
              return (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-line bg-white/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-paper-strong text-xs font-bold text-ink-muted">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-ink-muted">{title}</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Planned</span>
                </div>
              );
            })}
          </div>
        </section>

        {unit && availableLessons.length === outline.lessonTitles.length && (
          <Card className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-ink">Ready for the unit quiz?</h2>
                <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                  Try a representative quiz drawn from the six lesson checks. It shows a skill breakdown so you know
                  what to review before Unit 2.
                </p>
              </div>
              <Link href={`/units/${outline.id}/quiz`} className={buttonStyles('primary', 'md')}>
                Take the quiz
              </Link>
            </div>
          </Card>
        )}

        {!unit && (
          <Card className="mt-10">
            <h2 className="text-xl font-black text-ink">Why is this unit not live yet?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Units are authored and reviewed in order. Unit 1 proves the lesson format, exercises, audio and review
              loop before the rest of the path is written. Start with Unit 1 and the rest will appear here as it is
              published.
            </p>
            <Link href="/units/unit-1" className={buttonStyles('primary', 'md', 'mt-4')}>
              Start Unit 1
            </Link>
          </Card>
        )}

        <Callout variant="spanish" title="A note on pace" className="mt-10">
          <p>
            Six lessons per unit is deliberate. A smaller unit is easier to finish, review and revisit. If a lesson
            feels heavy, do half and come back tomorrow; the review queue will keep the vocabulary alive.
          </p>
        </Callout>
      </div>
    </div>
  );
}
