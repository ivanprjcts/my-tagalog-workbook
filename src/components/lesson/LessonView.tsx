'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Lesson } from '@/content/schema';
import { A1_COURSE } from '@/content/a1';
import { useProgress } from '@/lib/progress/useProgress';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { LessonSectionView } from './LessonBlocks';
import { VocabularyTable } from './VocabularyTable';
import { ExerciseRunner } from './ExerciseRunner';
import { LessonCheck } from './LessonCheck';
import { AudioEnabledContext } from './AudioContext';

interface LessonLink {
  title: string;
  href: string;
}

export function LessonView({
  lesson,
  previous,
  next,
}: {
  lesson: Lesson;
  previous?: LessonLink;
  next?: LessonLink;
}) {
  const { progress, getLessonProgress, markLessonStarted, addLessonTime } = useProgress();
  const lessonProgress = getLessonProgress(lesson.id);
  const unit = A1_COURSE.units.find((item) => item.id === lesson.unitId);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    markLessonStarted(lesson.id);
    startedAt.current = Date.now();

    const flush = () => {
      if (!startedAt.current) return;
      const elapsed = Date.now() - startedAt.current;
      startedAt.current = Date.now();
      if (elapsed > 1000) addLessonTime(lesson.id, elapsed);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        flush();
        startedAt.current = 0;
      } else {
        startedAt.current = Date.now();
      }
    };

    const interval = window.setInterval(flush, 30_000);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      flush();
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [lesson.id, markLessonStarted, addLessonTime]);

  return (
    <AudioEnabledContext.Provider value={progress.settings.audioEnabled}>
      <div>
        <div className="mx-auto max-w-4xl px-4 pt-5 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Learn', href: '/units' },
            { label: unit?.title ?? lesson.unitId, href: `/units/${lesson.unitId}` },
            { label: lesson.title },
          ]}
        />
      </div>

      <header className="border-b border-line bg-white/60">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">A1</Badge>
            <Badge tone="neutral">Lesson {lesson.order}</Badge>
            <Badge tone="neutral">{lesson.estimatedMinutes} min</Badge>
            {lessonProgress.status === 'completed' && <Badge tone="accent">Completed</Badge>}
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">{lesson.title}</h1>
          {lesson.subtitle && <p className="mt-2 text-lg font-semibold text-accent-strong">{lesson.subtitle}</p>}
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{lesson.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-paper p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted">Objectives</h2>
              <ul className="mt-2 space-y-2 text-sm text-ink">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent-strong">•</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-paper p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted">Can-do</h2>
              <ul className="mt-2 space-y-2 text-sm text-ink">
                {lesson.canDo.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent-strong">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 no-print">
            <button type="button" onClick={() => window.print()} className={buttonStyles('secondary', 'sm')}>
              Print worksheet
            </button>
            <Link href={`/units/${lesson.unitId}`} className={buttonStyles('ghost', 'sm')}>
              Back to unit
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
        <div className="space-y-10">
          {lesson.sections.map((section, index) => (
            <LessonSectionView
              key={`${section.type}-${index}`}
              section={section}
              translationsDefaultVisible={progress.settings.translationVisible}
            />
          ))}
        </div>

        <section id="vocabulary" className="scroll-mt-24">
          <h2 className="mb-3 text-2xl font-black text-ink">Vocabulary</h2>
          <p className="mb-4 text-sm text-ink-muted">
            {lesson.vocabulary.length} words and expressions from this lesson. Listen, say them aloud, then test
            yourself in the practice below.
          </p>
          <VocabularyTable entries={lesson.vocabulary} />
        </section>

        <section id="practice" className="scroll-mt-24">
          <h2 className="mb-3 text-2xl font-black text-ink">Practice</h2>
          <p className="mb-4 text-sm text-ink-muted">
            Work through these at your own pace. The check comes after the practice; mistakes are part of the process.
          </p>
          <ExerciseRunner
            exercises={lesson.exercises}
            title="Practice set"
            description="Recognition, production and listening, one question at a time."
            mode="practice"
          />
        </section>

        <LessonCheck lesson={lesson} />

        {lessonProgress.status === 'completed' && (
          <Callout variant="tip" title="Lesson complete">
            <p>
              You completed this lesson with a best score of {lessonProgress.bestScore ?? 0}%. The vocabulary is now in your
              review queue. Continue to the next lesson or review before moving on.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 no-print">
              <Link href="/review" className={buttonStyles('primary', 'sm')}>
                Review vocabulary
              </Link>
              {next && (
                <Link href={next.href} className={buttonStyles('secondary', 'sm')}>
                  Next: {next.title}
                </Link>
              )}
            </div>
          </Callout>
        )}

        <nav className="no-print flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between" aria-label="Lesson navigation">
          {previous ? (
            <Link href={previous.href} className={buttonStyles('secondary', 'md')}>
              ← {previous.title}
            </Link>
          ) : (
            <span className="text-sm text-ink-muted">Start of the path</span>
          )}
          {next ? (
            <Link href={next.href} className={buttonStyles('primary', 'md')}>
              {next.title} →
            </Link>
          ) : (
            <span className="text-sm text-ink-muted">End of the available lessons</span>
          )}
        </nav>
      </div>
      </div>
    </AudioEnabledContext.Provider>
  );
}
