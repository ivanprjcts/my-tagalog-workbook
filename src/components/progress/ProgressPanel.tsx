'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { A1_LESSONS } from '@/content/a1';
import { useProgress } from '@/lib/progress/useProgress';
import { REVIEW_CARD_IDS } from '@/lib/review/cards';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonStyles } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

function formatStudyTime(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}m`;
}

export function ProgressPanel() {
  const {
    progress,
    stats,
    getLessonProgress,
    getDueCardIds,
    updateSettings,
    resetProgress,
    exportProgress,
    importProgress,
  } = useProgress(A1_LESSONS.length);
  const dueCount = getDueCardIds(REVIEW_CARD_IDS).length;
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `tagalog-workbook-progress-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Progress exported.');
  };

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    const result = importProgress(text);
    setMessage(result.ok ? 'Progress imported.' : result.error);
    if (fileRef.current) fileRef.current.value = '';
  };

  const reset = () => {
    if (!window.confirm('Reset all lesson progress and review cards? This cannot be undone.')) return;
    resetProgress();
    setMessage('Progress reset.');
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Lessons</div>
          <div className="mt-1 text-3xl font-black text-accent-strong">
            {stats.lessonsCompleted}
            <span className="text-lg text-ink-muted">/{stats.totalLessons}</span>
          </div>
          <ProgressBar value={stats.completionPercent} className="mt-3" />
        </Card>
        <Card>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Streak</div>
          <div className="mt-1 text-3xl font-black text-sun">{stats.streakDays} days</div>
          <p className="mt-2 text-xs text-ink-muted">Any study time counts.</p>
        </Card>
        <Card>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Study time</div>
          <div className="mt-1 text-3xl font-black text-ink">{formatStudyTime(stats.totalStudySeconds)}</div>
          <p className="mt-2 text-xs text-ink-muted">Tracked while a lesson is open.</p>
        </Card>
        <Card>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Review</div>
          <div className="mt-1 text-3xl font-black text-accent-strong">{dueCount}</div>
          <p className="mt-2 text-xs text-ink-muted">cards ready · {stats.cardsReviewed} reviews</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-ink">Lesson progress</h2>
            <p className="mt-1 text-sm text-ink-muted">A lesson is complete when you pass its check.</p>
          </div>
          <Link href="/units" className={buttonStyles('secondary', 'sm')}>Go to lessons</Link>
        </div>
        <div className="mt-4 divide-y divide-line">
          {A1_LESSONS.map((lesson) => {
            const item = getLessonProgress(lesson.id);
            return (
              <div key={lesson.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-bold text-ink">{lesson.title}</div>
                  <div className="text-xs text-ink-muted">
                    Lesson {lesson.order} · {lesson.estimatedMinutes} min
                    {item.bestScore !== undefined ? ` · best ${item.bestScore}%` : ''}
                  </div>
                </div>
                <Badge
                  tone={
                    item.status === 'completed' ? 'accent' : item.status === 'in-progress' ? 'sun' : 'neutral'
                  }
                >
                  {item.status === 'not-started' ? 'Not started' : item.status.replace('-', ' ')}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-black text-ink">Settings</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between gap-4 text-sm">
            <span>
              <span className="font-semibold text-ink">Audio</span>
              <span className="block text-xs text-ink-muted">Use the device Tagalog voice when available.</span>
            </span>
            <input
              type="checkbox"
              checked={progress.settings.audioEnabled}
              onChange={(event) => updateSettings({ audioEnabled: event.target.checked })}
              className="h-5 w-5"
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm">
            <span>
              <span className="font-semibold text-ink">Show translations by default</span>
              <span className="block text-xs text-ink-muted">Dialogue translations will start visible.</span>
            </span>
            <input
              type="checkbox"
              checked={progress.settings.translationVisible}
              onChange={(event) => updateSettings({ translationVisible: event.target.checked })}
              className="h-5 w-5"
            />
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-black text-ink">Backup</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Progress lives in this browser only. Export a JSON file before clearing browser data or moving to another
          device.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={download}>Export progress</Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>Import progress</Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => void onImport(event.target.files?.[0])}
          />
          <Button variant="danger" onClick={reset}>Reset progress</Button>
        </div>
        {message && <p role="status" className="mt-3 text-sm font-semibold text-accent-strong">{message}</p>}
      </Card>
    </div>
  );
}
