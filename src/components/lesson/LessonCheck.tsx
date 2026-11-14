'use client';

import type { Lesson } from '@/content/schema';
import { A1_LESSONS } from '@/content/a1';
import { useProgress } from '@/lib/progress/useProgress';
import { Badge } from '@/components/ui/Badge';
import { ExerciseRunner, type ExerciseSummary } from './ExerciseRunner';

export function LessonCheck({ lesson }: { lesson: Lesson }) {
  const { getLessonProgress, recordLessonScore } = useProgress(A1_LESSONS.length);
  const progress = getLessonProgress(lesson.id);
  const passScore = lesson.check.passScore ?? 80;

  const handleFinish = (summary: ExerciseSummary) => {
    recordLessonScore(lesson.id, {
      score: summary.score,
      passed: summary.passed,
      totalQuestions: summary.total,
      correctAnswers: summary.correct,
    });
  };

  return (
    <section id="lesson-check" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-ink">{lesson.check.title}</h2>
          {lesson.check.description && <p className="mt-1 text-sm text-ink-muted">{lesson.check.description}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {progress.status === 'completed' && <Badge tone="accent">Completed</Badge>}
          {progress.bestScore !== undefined && <Badge tone="neutral">Best: {progress.bestScore}%</Badge>}
        </div>
      </div>
      <ExerciseRunner
        exercises={lesson.check.questions}
        title={lesson.check.title}
        description={`Pass mark: ${passScore}%. Retry as often as you need.`}
        mode="check"
        passScore={passScore}
        onFinish={handleFinish}
      />
    </section>
  );
}
