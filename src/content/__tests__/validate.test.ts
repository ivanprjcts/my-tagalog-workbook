import { describe, expect, it } from 'vitest';
import { A1_COURSE } from '../a1';
import { validateCourse } from '../validate';

describe('A1 content validation', () => {
  it('validates the shipped course', () => {
    const { course, problems } = validateCourse(A1_COURSE);
    expect(problems).toEqual([]);
    expect(course).not.toBeNull();
  });

  it('rejects an MCQ with a correct answer that is not an option', () => {
    const broken = structuredClone(A1_COURSE);
    const exercise = broken.units[0].lessons[0].exercises[0];
    if (exercise.type !== 'mcq') throw new Error('Fixture changed: expected an MCQ first');
    exercise.correctOptionId = 'does-not-exist';

    const { problems } = validateCourse(broken);
    expect(problems.some((problem) => problem.message.includes('correctOptionId'))).toBe(true);
  });

  it('rejects a fill-blank without a blank', () => {
    const broken = structuredClone(A1_COURSE);
    const exercise = broken.units[0].lessons[0].exercises.find((item) => item.type === 'fill-blank');
    if (!exercise || exercise.type !== 'fill-blank') throw new Error('Fixture changed: expected a fill-blank');
    exercise.text = 'No blank here.';

    const { problems } = validateCourse(broken);
    expect(problems.some((problem) => problem.message.includes('blank'))).toBe(true);
  });

  it('rejects a published lesson without a listening exercise', () => {
    const broken = structuredClone(A1_COURSE);
    const lesson = broken.units[0].lessons[0];
    lesson.exercises = lesson.exercises.filter((exercise) => !(exercise.tags ?? []).includes('listening'));

    const { problems } = validateCourse(broken);
    expect(problems.some((problem) => problem.message.includes('listening'))).toBe(true);
  });
});
