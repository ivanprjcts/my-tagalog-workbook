import type { Course, Lesson, Unit } from '../schema';
import { unit1 } from './unit-01';

/**
 * The A1 course.
 *
 * Units are added here as they are authored. A course can contain a partial
 * unit while it is being built; the content check reports draft lessons but
 * only published lessons are treated as learner-ready.
 */
export const A1_COURSE: Course = {
  id: 'a1',
  title: 'Tagalog A1',
  description:
    'A functional A1 path for Spanish speakers learning Tagalog through English: 6 units, 36 lessons, dialogues, audio, exercises and spaced review.',
  level: 'A1',
  units: [unit1],
};

export const A1_LESSONS: Lesson[] = A1_COURSE.units.flatMap((unit) => unit.lessons);

export function getUnit(unitId: string): Unit | undefined {
  return A1_COURSE.units.find((unit) => unit.id === unitId);
}

export function getLesson(unitId: string, lessonSlug: string): Lesson | undefined {
  return getUnit(unitId)?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return A1_LESSONS.find((lesson) => lesson.id === lessonId);
}

export function getPublishedLessons(): Lesson[] {
  return A1_LESSONS.filter((lesson) => lesson.status === 'published');
}
