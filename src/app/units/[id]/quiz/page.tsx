import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUnit } from '@/content/a1';
import { A1_OUTLINE } from '@/content/a1/outline';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitQuiz } from '@/components/lesson/UnitQuiz';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';

interface UnitQuizPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return A1_OUTLINE.filter((outline) => {
    const unit = getUnit(outline.id);
    return Boolean(unit && unit.lessons.length === outline.lessonTitles.length);
  }).map((outline) => ({ id: outline.id }));
}

export default async function UnitQuizPage({ params }: UnitQuizPageProps) {
  const { id } = await params;
  const outline = A1_OUTLINE.find((item) => item.id === id);
  const unit = getUnit(id);

  if (!outline || !unit || unit.lessons.length !== outline.lessonTitles.length) {
    notFound();
  }

  const questions = unit.lessons.flatMap((lesson) => lesson.check.questions.slice(0, 3));

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 pt-5 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Learn', href: '/units' },
            { label: outline.title, href: `/units/${outline.id}` },
            { label: 'Unit quiz' },
          ]}
        />
      </div>

      <PageHeader
        eyebrow={`Unit ${outline.order} review`}
        title={`${outline.title} — unit quiz`}
        description="A representative quiz from the six lesson checks. It is a self-check: your lesson progress is not changed by this quiz yet."
        meta={
          <>
            <Badge tone="accent">A1</Badge>
            <Badge tone="neutral">{questions.length} questions</Badge>
            <Badge tone="neutral">Pass: 80%</Badge>
          </>
        }
        actions={
          <Link href={`/units/${outline.id}`} className={buttonStyles('secondary', 'md')}>
            Back to unit
          </Link>
        }
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <UnitQuiz title={`${outline.title} review`} questions={questions} />
      </div>
    </div>
  );
}
