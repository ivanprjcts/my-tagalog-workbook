/**
 * Spaced Repetition Algorithm (Modified Leitner System)
 * 
 * Implements a scientifically-proven technique for long-term retention
 * of information through strategic spacing of reviews.
 */

export interface FlashcardProgress {
  cardId: string;
  masteryLevel: 0 | 1 | 2 | 3 | 4 | 5; // 0-5 levels
  repetitions: number;
  lastReviewDate: number; // timestamp
  nextReviewDate: number; // timestamp
  interval: number; // days until next review
  easeFactor: number; // multiplier for difficulty
}

export interface FlashcardSession {
  sessionId: string;
  deckId: string;
  startTime: number;
  endTime?: number;
  cardsReviewed: number;
  correctAnswers: number;
  cardsLearned: number; // New cards that reached mastery
}

/**
 * Calculate the next review interval using spaced repetition algorithm
 * Based on the Leitner System with improvements
 */
export function calculateNextReviewDate(
  currentProgress: FlashcardProgress,
  quality: 0 | 1 | 2 | 3 | 4 | 5 // 0 = complete failure, 5 = perfect
): Partial<FlashcardProgress> {
  const now = Date.now();
  let { easeFactor, repetitions, interval, masteryLevel } = currentProgress;

  // Update ease factor based on quality (SM-2 algorithm)
  easeFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  // Update repetitions and interval
  repetitions += 1;

  if (quality < 3) {
    // Restart learning if quality is poor
    interval = 1;
    masteryLevel = Math.max(0, masteryLevel - 1) as any;
  } else {
    // Increase interval based on spaced repetition
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    masteryLevel = Math.min(5, masteryLevel + 1) as any;
  }

  // Calculate next review date (in milliseconds)
  const nextReviewDate = now + interval * 24 * 60 * 60 * 1000;

  return {
    masteryLevel,
    repetitions,
    interval,
    easeFactor,
    lastReviewDate: now,
    nextReviewDate,
  };
}

/**
 * Determine which cards need review today
 */
export function getCardsForReview(
  allProgress: FlashcardProgress[],
  now: number = Date.now()
): string[] {
  return allProgress
    .filter((progress) => progress.nextReviewDate <= now)
    .sort((a, b) => a.nextReviewDate - b.nextReviewDate)
    .map((p) => p.cardId);
}

/**
 * Get statistics for a deck
 */
export interface DeckStatistics {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
  cardsForReviewToday: number;
  averageMastery: number;
}

export function getDeckStatistics(
  progress: Map<string, FlashcardProgress>,
  totalCards: number,
  now: number = Date.now()
): DeckStatistics {
  const progressArray = Array.from(progress.values());

  const masteredCards = progressArray.filter((p) => p.masteryLevel >= 4).length;
  const learningCards = progressArray.filter((p) => p.masteryLevel > 0 && p.masteryLevel < 4).length;
  const newCards = totalCards - progressArray.length;
  const cardsForReviewToday = progressArray.filter((p) => p.nextReviewDate <= now).length;

  const averageMastery =
    progressArray.length > 0
      ? progressArray.reduce((sum, p) => sum + p.masteryLevel, 0) / progressArray.length
      : 0;

  return {
    totalCards,
    masteredCards,
    learningCards,
    newCards,
    cardsForReviewToday,
    averageMastery,
  };
}

/**
 * Initialize progress for a new card
 */
export function initializeCardProgress(cardId: string): FlashcardProgress {
  const now = Date.now();
  return {
    cardId,
    masteryLevel: 0,
    repetitions: 0,
    lastReviewDate: now,
    nextReviewDate: now, // Immediately available for study
    interval: 0,
    easeFactor: 2.5, // Initial ease factor
  };
}
