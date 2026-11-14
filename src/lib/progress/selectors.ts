import { dayKey } from './storage';
import { isCardDue, isCardMastered, isCardNew } from './srs';
import type { CardProgress, ProgressState, ProgressStats } from './types';

export function getLessonProgress(state: ProgressState, lessonId: string) {
  return (
    state.lessons[lessonId] ?? {
      lessonId,
      status: 'not-started' as const,
      timeSpentMs: 0,
      attempts: 0,
      updatedAt: 0,
    }
  );
}

export function getTotalStudySeconds(state: ProgressState): number {
  return Object.values(state.activity).reduce((total, seconds) => total + seconds, 0);
}

export function getStreakDays(state: ProgressState, now = new Date()): number {
  const cursor = new Date(now);
  if (state.activity[dayKey(cursor)] === undefined) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (state.activity[dayKey(cursor)] !== undefined) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getStats(state: ProgressState, totalLessons: number, now = Date.now()): ProgressStats {
  const lessons = Object.values(state.lessons);
  const lessonsCompleted = lessons.filter((lesson) => lesson.status === 'completed').length;
  const lessonsInProgress = lessons.filter((lesson) => lesson.status === 'in-progress').length;
  const cards = Object.values(state.cards);

  return {
    totalLessons,
    lessonsCompleted,
    lessonsInProgress,
    completionPercent: totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0,
    cardsReviewed: cards.reduce((total, card) => total + card.repetitions, 0),
    cardsDue: cards.filter((card) => isCardDue(card, now)).length,
    streakDays: getStreakDays(state, new Date(now)),
    totalStudySeconds: getTotalStudySeconds(state),
  };
}

export interface CardCounts {
  total: number;
  newCards: number;
  learning: number;
  mastered: number;
  due: number;
}

export function getCardCounts(cards: Record<string, CardProgress>, cardIds: string[], now = Date.now()): CardCounts {
  let newCards = 0;
  let learning = 0;
  let mastered = 0;
  let due = 0;

  for (const cardId of cardIds) {
    const card = cards[cardId];
    if (isCardNew(card)) newCards += 1;
    else if (isCardMastered(card)) mastered += 1;
    else learning += 1;
    if (card && isCardDue(card, now)) due += 1;
  }

  return { total: cardIds.length, newCards, learning, mastered, due };
}

export function getDueCardIds(cards: Record<string, CardProgress>, cardIds: string[], now = Date.now()): string[] {
  return cardIds
    .filter((cardId) => {
      const card = cards[cardId];
      return card ? isCardDue(card, now) : true;
    })
    .sort((a, b) => {
      const cardA = cards[a];
      const cardB = cards[b];
      if (!cardA && !cardB) return 0;
      if (!cardA) return -1;
      if (!cardB) return 1;
      return cardA.dueAt - cardB.dueAt;
    });
}
