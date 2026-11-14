import { A1_LESSONS } from '@/content/a1';

export interface ReviewCard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  lessonId: string;
  lessonTitle: string;
}

/**
 * Vocabulary cards are generated from published lessons. Adding a lesson with
 * vocabulary automatically adds its cards to the review queue.
 */
export const REVIEW_CARDS: ReviewCard[] = A1_LESSONS.flatMap((lesson) =>
  lesson.vocabulary.map((entry) => ({
    id: `vocab:${entry.id}`,
    front: entry.tagalog,
    back: entry.english,
    hint: entry.example?.tagalog,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
  })),
);

export const REVIEW_CARD_IDS = REVIEW_CARDS.map((card) => card.id);
