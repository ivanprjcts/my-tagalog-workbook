import type { CardProgress, ReviewGrade } from './types';

export const DAY_MS = 24 * 60 * 60 * 1000;
const AGAIN_DELAY_MS = 10 * 60 * 1000;
const MIN_EASE = 1.3;

const EASE_DELTA: Record<ReviewGrade, number> = {
  again: -0.2,
  hard: -0.15,
  good: 0,
  easy: 0.15,
};

const MASTERY_DELTA: Record<ReviewGrade, number> = {
  again: -1,
  hard: 0,
  good: 1,
  easy: 2,
};

export function createCardProgress(cardId: string, now = Date.now()): CardProgress {
  return {
    cardId,
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    lapses: 0,
    masteryLevel: 0,
    dueAt: now,
  };
}

function nextInterval(card: CardProgress, grade: ReviewGrade): number {
  if (grade === 'again') return 0;

  const base = Math.max(1, Math.round(card.intervalDays));
  if (card.repetitions === 0) {
    return grade === 'easy' ? 4 : 1;
  }
  if (card.repetitions === 1) {
    return grade === 'hard' ? 2 : grade === 'easy' ? 7 : 3;
  }

  const multiplier = grade === 'hard' ? 1.2 : grade === 'easy' ? 1.3 : 1;
  return Math.max(1, Math.round(base * card.easeFactor * multiplier));
}

/**
 * Schedule a card using a four-grade SM-2 variant.
 *
 * Again -> due in 10 minutes, lapsed.
 * Hard  -> short interval, small ease penalty.
 * Good  -> normal interval growth.
 * Easy  -> longer interval, ease bonus.
 */
export function scheduleCard(card: CardProgress, grade: ReviewGrade, now = Date.now()): CardProgress {
  const easeFactor = Math.max(MIN_EASE, card.easeFactor + EASE_DELTA[grade]);
  const intervalDays = nextInterval(card, grade);
  const mastery = Math.max(0, Math.min(5, card.masteryLevel + MASTERY_DELTA[grade])) as CardProgress['masteryLevel'];
  const dueAt = grade === 'again' ? now + AGAIN_DELAY_MS : now + intervalDays * DAY_MS;

  return {
    ...card,
    easeFactor,
    intervalDays,
    repetitions: grade === 'again' ? 0 : card.repetitions + 1,
    lapses: card.lapses + (grade === 'again' ? 1 : 0),
    masteryLevel: mastery,
    dueAt,
    lastReviewedAt: now,
  };
}

export function isCardDue(card: CardProgress, now = Date.now()): boolean {
  return card.dueAt <= now;
}

export function isCardNew(card: CardProgress | undefined): boolean {
  return !card || card.repetitions === 0;
}

export function isCardMastered(card: CardProgress | undefined): boolean {
  return Boolean(card && card.masteryLevel >= 4 && card.intervalDays >= 7);
}
