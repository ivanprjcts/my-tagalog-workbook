'use client';

import { useState } from 'react';
import type { Exercise } from '@/content/schema';
import {
  emptyAnswer,
  gradeExercise,
  isAnswerComplete,
  type ExerciseAnswer,
  type GradeResult,
} from '@/lib/exercises/grading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ExerciseInput } from './ExerciseInput';

export interface ExerciseResultItem {
  exercise: Exercise;
  answer: ExerciseAnswer;
  grade: GradeResult;
}

export interface ExerciseSummary {
  results: ExerciseResultItem[];
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  passScore: number;
}

interface ExerciseRunnerProps {
  exercises: Exercise[];
  title: string;
  description?: string;
  mode?: 'practice' | 'check';
  passScore?: number;
  onFinish?: (summary: ExerciseSummary) => void;
}

function pointsFor(exercise: Exercise) {
  return exercise.points ?? 1;
}

function buildSummary(results: ExerciseResultItem[], passScore: number): ExerciseSummary {
  const total = results.reduce((sum, item) => sum + pointsFor(item.exercise), 0);
  const earned = results.reduce((sum, item) => sum + pointsFor(item.exercise) * item.grade.score, 0);
  const score = total > 0 ? Math.round((earned / total) * 100) : 0;
  return {
    results,
    correct: results.filter((item) => item.grade.correct).length,
    total: results.length,
    score,
    passed: score >= passScore,
    passScore,
  };
}

export function ExerciseRunner({
  exercises,
  title,
  description,
  mode = 'practice',
  passScore = 80,
  onFinish,
}: ExerciseRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<ExerciseAnswer>(() => emptyAnswer(exercises[0]));
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [results, setResults] = useState<ExerciseResultItem[]>([]);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<ExerciseSummary | null>(null);

  const exercise = exercises[index];
  const isLast = index === exercises.length - 1;
  const canCheck = !grade && isAnswerComplete(exercise, answer);
  const progress = finished ? 100 : ((index + (grade ? 0.5 : 0)) / exercises.length) * 100;

  const reset = () => {
    setIndex(0);
    setAnswer(emptyAnswer(exercises[0]));
    setGrade(null);
    setResults([]);
    setFinished(false);
    setSummary(null);
  };

  const check = () => {
    if (!canCheck) return;
    const nextGrade = gradeExercise(exercise, answer);
    setGrade(nextGrade);
    setResults((previous) => [...previous, { exercise, answer, grade: nextGrade }]);
  };

  const next = () => {
    if (!grade) return;
    const allResults = results;
    if (isLast) {
      const nextSummary = buildSummary(allResults, passScore);
      setSummary(nextSummary);
      setFinished(true);
      onFinish?.(nextSummary);
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setAnswer(emptyAnswer(exercises[nextIndex]));
    setGrade(null);
  };

  if (finished && summary) {
    return (
      <div className="rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">
              {mode === 'check' ? 'Lesson check' : 'Practice complete'}
            </div>
            <h3 className="mt-1 text-2xl font-black text-ink">
              {summary.score}% · {summary.correct} of {summary.total} correct
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {mode === 'check'
                ? summary.passed
                  ? 'You passed this check. You can move on, or retry for a higher score.'
                  : `You need ${summary.passScore}% to pass. Review the explanations and try again.`
                : 'Review the answers below, then try the lesson check when you are ready.'}
            </p>
          </div>
          <Badge tone={mode === 'check' ? (summary.passed ? 'accent' : 'rose') : 'accent'}>
            {mode === 'check' ? (summary.passed ? 'Passed' : 'Not yet') : 'Done'}
          </Badge>
        </div>

        <div className="mt-5 space-y-2">
          {summary.results.map((item, itemIndex) => (
            <div
              key={`${item.exercise.id}-${itemIndex}`}
              className={`rounded-lg border p-3 text-sm ${
                item.grade.correct ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-ink">
                  {itemIndex + 1}. {item.exercise.prompt}
                </span>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide">
                  {item.grade.correct ? 'Correct' : 'Review'}
                </span>
              </div>
              {!item.grade.correct && (
                <p className="mt-1 text-ink-muted">
                  Answer: <strong className="text-ink">{item.grade.expected}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <Button variant="secondary" className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">
            {mode === 'check' ? 'Lesson check' : 'Practice'}
          </div>
          <h3 className="mt-1 text-xl font-black text-ink">{title}</h3>
          {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
        </div>
        <Badge tone="neutral">
          {index + 1} / {exercises.length}
        </Badge>
      </div>

      <ProgressBar value={progress} className="mt-4" />

      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <span>{exercise.type.replace('-', ' ')}</span>
          {exercise.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-paper-strong px-2 py-0.5 normal-case tracking-normal">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="text-lg font-bold leading-snug text-ink">{exercise.prompt}</h4>
        {exercise.instructions && <p className="mt-1 text-sm text-ink-muted">{exercise.instructions}</p>}
        {'context' in exercise && exercise.context && (
          <p className="mt-2 rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink">
            {exercise.context}
          </p>
        )}

        <div className="mt-4">
          <ExerciseInput
            key={exercise.id}
            exercise={exercise}
            answer={answer}
            onChange={setAnswer}
            disabled={Boolean(grade)}
          />
        </div>

        {grade && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-lg border p-4 text-sm ${
              grade.correct ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="font-bold text-ink">
              {grade.correct ? (grade.needsReview ? 'Possible match — check the model answer' : 'Correct') : 'Not quite'}
            </div>
            {(grade.needsReview || !grade.correct) && (
              <p className="mt-1 text-ink">
                Model answer: <strong>{grade.expected}</strong>
              </p>
            )}
            <p className="mt-2 whitespace-pre-line leading-relaxed text-ink-muted">{grade.explanation}</p>
            {!grade.correct && exercise.hint && (
              <p className="mt-2 text-ink-muted">
                <strong>Hint:</strong> {exercise.hint}
              </p>
            )}
            {exercise.spanish && (
              <p className="mt-2 rounded border-l-2 border-amber-500 bg-amber-50 px-3 py-2 text-amber-900">
                <strong>Desde el español:</strong> {exercise.spanish}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-muted">
          {mode === 'check' ? `Pass mark: ${passScore}%` : 'Take your time.'}
        </span>
        {!grade ? (
          <Button onClick={check} disabled={!canCheck}>
            Check answer
          </Button>
        ) : (
          <Button onClick={next}>{isLast ? 'Finish' : 'Next question'}</Button>
        )}
      </div>
    </div>
  );
}
