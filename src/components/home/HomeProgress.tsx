'use client';

import Link from 'next/link';
import { A1_LESSONS } from '@/content/a1';
import { useProgress } from '@/lib/progress/useProgress';
import { REVIEW_CARD_IDS } from '@/lib/review/cards';
import { buttonStyles } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function HomeProgress() {
  const { progress, stats, getDueCardIds } = useProgress(A1_LESSONS.length);
  const dueCount = getDueCardIds(REVIEW_CARD_IDS).length;
  const inProgress = Object.values(progress.lessons)
    .filter((lesson) => lesson.status === 'in-progress')
    .sort((a, b) => b.updatedAt - a.updatedAt)[0];

  const nextLesson =
    A1_LESSONS.find((lesson) => lesson.id === inProgress?.lessonId) ??
    A1_LESSONS.find((lesson) => progress.lessons[lesson.id]?.status !== 'completed') ??
    A1_LESSONS[0];

  const completed = stats.lessonsCompleted;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-line bg-white p-5 shadow-sm sm:col-span-2">
        <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">
          {completed > 0 ? 'Continue learning' : 'Start here'}
        </div>
        <h2 className="mt-2 text-xl font-black text-ink">{nextLesson?.title ?? 'Unit 1'}</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {nextLesson?.description ?? 'Your first Tagalog lesson is ready.'}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={nextLesson ? `/units/${nextLesson.unitId}/lessons/${nextLesson.slug}` : '/units'}
            className={buttonStyles('primary', 'md')}
          >
            {completed > 0 ? 'Continue lesson' : 'Start Lesson 1'}
          </Link>
          <Link href="/units" className={buttonStyles('secondary', 'md')}>
            See the path
          </Link>
        </div>
        <ProgressBar
          className="mt-5"
          value={stats.completionPercent}
          label={`${completed} of ${stats.totalLessons} lessons complete`}
        />
      </div>

      <div className="grid gap-3">
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Review ready</div>
          <div className="mt-1 text-3xl font-black text-accent-strong">{dueCount}</div>
          <Link href="/review" className="mt-2 inline-block text-sm font-semibold text-accent-strong hover:underline">
            Open review →
          </Link>
        </div>
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Streak</div>
          <div className="mt-1 text-3xl font-black text-sun">{stats.streakDays} day{stats.streakDays === 1 ? '' : 's'}</div>
          <p className="mt-1 text-sm text-ink-muted">Small sessions count.</p>
        </div>
      </div>
    </div>
  );
}
