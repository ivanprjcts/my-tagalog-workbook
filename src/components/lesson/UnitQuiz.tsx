'use client';

import { useState } from 'react';
import type { Exercise } from '@/content/schema';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ExerciseRunner, type ExerciseSummary } from './ExerciseRunner';

export function UnitQuiz({
  title,
  questions,
  passScore = 80,
}: {
  title: string;
  questions: Exercise[];
  passScore?: number;
}) {
  const [summary, setSummary] = useState<ExerciseSummary | null>(null);

  const breakdown = (() => {
    if (!summary) return [];
    const counts = new Map<string, { correct: number; total: number }>();
    for (const item of summary.results) {
      const tags = item.exercise.tags ?? ['review'];
      for (const tag of tags) {
        const current = counts.get(tag) ?? { correct: 0, total: 0 };
        current.total += 1;
        if (item.grade.correct) current.correct += 1;
        counts.set(tag, current);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1].total - a[1].total);
  })();

  return (
    <div className="space-y-6">
      <ExerciseRunner
        exercises={questions}
        title={title}
        description={`A representative unit quiz: ${questions.length} questions from the six lessons. Pass mark: ${passScore}%.`}
        mode="check"
        passScore={passScore}
        onFinish={setSummary}
      />

      {summary && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-ink">Skill breakdown</h2>
              <p className="mt-1 text-sm text-ink-muted">Where the score came from. Use it to choose what to review.</p>
            </div>
            <Badge tone={summary.passed ? 'accent' : 'rose'}>{summary.passed ? 'Passed' : 'Review and retry'}</Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {breakdown.map(([tag, data]) => {
              const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={tag} className="rounded-lg border border-line bg-paper p-3">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-semibold capitalize text-ink">{tag}</span>
                    <span className="text-ink-muted">
                      {data.correct}/{data.total}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-paper-strong">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
