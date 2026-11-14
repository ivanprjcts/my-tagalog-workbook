import { describe, expect, it } from 'vitest';
import { A1_COURSE } from '../a1';
import type { Exercise } from '../schema';
import { gradeExercise, type ExerciseAnswer } from '@/lib/exercises/grading';

function correctAnswer(exercise: Exercise): ExerciseAnswer {
  switch (exercise.type) {
    case 'mcq':
    case 'listening':
      return exercise.correctOptionId;
    case 'multi-select':
      return exercise.correctOptionIds;
    case 'fill-blank':
    case 'dictation':
    case 'translation':
    case 'error-correction':
    case 'conjugation':
      return exercise.answers[0];
    case 'word-bank':
      return exercise.answer;
    case 'ordering':
      return exercise.items;
    case 'matching':
      return Object.fromEntries(exercise.pairs.map((pair) => [pair.left, pair.right]));
    case 'categorization':
      return Object.fromEntries(exercise.items.map((item) => [item.id, item.categoryId]));
  }
}

describe('answer keys', () => {
  const lessons = A1_COURSE.units.flatMap((unit) => unit.lessons);

  for (const lesson of lessons) {
    it(`${lesson.id}: every practice answer key grades as correct`, () => {
      for (const exercise of lesson.exercises) {
        const result = gradeExercise(exercise, correctAnswer(exercise));
        expect(result.correct, `${exercise.id} should grade as correct`).toBe(true);
      }
    });

    it(`${lesson.id}: every check answer key grades as correct`, () => {
      for (const exercise of lesson.check.questions) {
        const result = gradeExercise(exercise, correctAnswer(exercise));
        expect(result.correct, `${exercise.id} should grade as correct`).toBe(true);
      }
    });
  }
});
