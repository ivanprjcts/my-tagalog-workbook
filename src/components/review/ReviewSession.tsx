'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useProgress } from '@/lib/progress/useProgress';
import { REVIEW_CARDS, type ReviewCard } from '@/lib/review/cards';
import type { ReviewGrade } from '@/lib/progress/types';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonStyles } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProgressBar } from '@/components/ui/ProgressBar';

const SESSION_SIZE = 10;

export function ReviewSession() {
  const { getDueCardIds, gradeCard } = useProgress();
  const [status, setStatus] = useState<'idle' | 'reviewing' | 'finished'>('idle');
  const [queue, setQueue] = useState<ReviewCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [grades, setGrades] = useState<Record<ReviewGrade, number>>({ again: 0, hard: 0, good: 0, easy: 0 });

  const dueIds = getDueCardIds(REVIEW_CARDS.map((card) => card.id));
  const card = queue[index];

  const start = () => {
    const ids = new Set(dueIds.slice(0, SESSION_SIZE));
    if (ids.size === 0) {
      setStatus('idle');
      return;
    }
    setQueue(REVIEW_CARDS.filter((item) => ids.has(item.id)));
    setIndex(0);
    setRevealed(false);
    setGrades({ again: 0, hard: 0, good: 0, easy: 0 });
    setStatus('reviewing');
  };

  const grade = (value: ReviewGrade) => {
    if (!card) return;
    gradeCard(card.id, value);
    setGrades((previous) => ({ ...previous, [value]: previous[value] + 1 }));
    if (index < queue.length - 1) {
      setIndex(index + 1);
      setRevealed(false);
    } else {
      setStatus('finished');
    }
  };

  if (status === 'idle') {
    if (dueIds.length === 0) {
      return (
        <EmptyState
          title="All caught up"
          description="No cards are due right now. Come back later, or start the next lesson to add new vocabulary."
          action={<Link href="/units" className={buttonStyles('primary', 'md')}>Go to lessons</Link>}
        />
      );
    }

    return (
      <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge tone="accent">Spaced review</Badge>
            <h2 className="mt-3 text-2xl font-black text-ink">
              {Math.min(dueIds.length, SESSION_SIZE)} cards ready
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
              Recall the meaning before revealing the answer, then grade yourself honestly. Again cards come back in
              about ten minutes; Good and Easy cards move further into the future.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper p-4 text-center">
            <div className="text-3xl font-black text-accent-strong">{dueIds.length}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">due today</div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={start} size="lg">Start review</Button>
          <Link href="/units" className={buttonStyles('secondary', 'lg')}>Add new words</Link>
        </div>
      </div>
    );
  }

  if (status === 'finished') {
    const total = Object.values(grades).reduce((sum, count) => sum + count, 0);
    return (
      <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
        <Badge tone="accent">Session complete</Badge>
        <h2 className="mt-3 text-2xl font-black text-ink">{total} cards reviewed</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(['again', 'hard', 'good', 'easy'] as const).map((value) => (
            <div key={value} className="rounded-lg border border-line bg-paper p-3 text-center">
              <div className="text-2xl font-black text-ink">{grades[value]}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{value}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          The next review dates are saved in this browser. Come back tomorrow for the cards that are due.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={start}>Review again</Button>
          <Link href="/units" className={buttonStyles('secondary', 'md')}>Back to lessons</Link>
        </div>
      </div>
    );
  }

  if (!card) {
    return <EmptyState title="No card loaded" description="Start a new review session." action={<Button onClick={start}>Start review</Button>} />;
  }

  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone="neutral">
          Card {index + 1} of {queue.length}
        </Badge>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{card.lessonTitle}</span>
      </div>
      <ProgressBar value={((index + (revealed ? 0.5 : 0)) / queue.length) * 100} className="mt-3" />

      <div className="mt-8 rounded-xl border border-line bg-paper p-8 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Tagalog</div>
        <div className="mt-2 text-4xl font-black text-ink">{card.front}</div>
        {revealed && (
          <div className="mt-6 border-t border-line pt-5">
            <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">English</div>
            <div className="mt-1 text-2xl font-bold text-accent-strong">{card.back}</div>
            {card.hint && <p className="mt-3 text-sm italic text-ink-muted">Example: {card.hint}</p>}
          </div>
        )}
      </div>

      {!revealed ? (
        <div className="mt-5 flex justify-center">
          <Button onClick={() => setRevealed(true)} size="lg">Show answer</Button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="mb-3 text-center text-sm font-semibold text-ink">How well did you remember?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button variant="danger" onClick={() => grade('again')}>Again</Button>
            <Button variant="secondary" onClick={() => grade('hard')}>Hard</Button>
            <Button variant="secondary" onClick={() => grade('good')}>Good</Button>
            <Button onClick={() => grade('easy')}>Easy</Button>
          </div>
        </div>
      )}
    </div>
  );
}
