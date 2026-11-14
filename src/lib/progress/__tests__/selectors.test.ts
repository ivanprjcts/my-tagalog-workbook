import { describe, expect, it } from 'vitest';
import { createDefaultProgress, dayKey } from '../storage';
import { getCardCounts, getDueCardIds, getStats, getStreakDays } from '../selectors';
import { createCardProgress } from '../srs';

const TODAY = new Date(2026, 0, 15, 12, 0, 0);

describe('progress selectors', () => {
  it('counts a streak ending today', () => {
    const state = createDefaultProgress(TODAY.getTime());
    for (let offset = 0; offset < 3; offset += 1) {
      const date = new Date(TODAY);
      date.setDate(date.getDate() - offset);
      state.activity[dayKey(date)] = 60;
    }
    expect(getStreakDays(state, TODAY)).toBe(3);
  });

  it('still counts a streak if today has no activity yet', () => {
    const state = createDefaultProgress(TODAY.getTime());
    for (let offset = 1; offset < 3; offset += 1) {
      const date = new Date(TODAY);
      date.setDate(date.getDate() - offset);
      state.activity[dayKey(date)] = 60;
    }
    expect(getStreakDays(state, TODAY)).toBe(2);
  });

  it('summarizes lesson and review stats', () => {
    const state = createDefaultProgress(TODAY.getTime());
    state.lessons.one = {
      lessonId: 'one',
      status: 'completed',
      timeSpentMs: 1000,
      attempts: 1,
      bestScore: 100,
      updatedAt: TODAY.getTime(),
    };
    state.cards.due = { ...createCardProgress('due', TODAY.getTime() - 1000), repetitions: 1 };
    state.cards.future = { ...createCardProgress('future', TODAY.getTime()), repetitions: 1, dueAt: TODAY.getTime() + 100000 };

    const stats = getStats(state, 2, TODAY.getTime());
    expect(stats.lessonsCompleted).toBe(1);
    expect(stats.completionPercent).toBe(50);
    expect(stats.cardsDue).toBe(1);
  });

  it('counts new, learning and mastered cards and returns a due queue', () => {
    const now = TODAY.getTime();
    const cards = {
      newCard: createCardProgress('newCard', now),
      due: { ...createCardProgress('due', now), repetitions: 2, dueAt: now - 1 },
      future: { ...createCardProgress('future', now), repetitions: 2, dueAt: now + 100000 },
      mastered: {
        ...createCardProgress('mastered', now),
        repetitions: 5,
        masteryLevel: 5 as const,
        intervalDays: 30,
        dueAt: now + 100000,
      },
    };

    const counts = getCardCounts(cards, Object.keys(cards), now);
    expect(counts.total).toBe(4);
    expect(counts.newCards).toBe(1);
    expect(counts.due).toBe(2);
    expect(counts.mastered).toBe(1);

    const due = getDueCardIds(cards, Object.keys(cards), now);
    expect(due).toContain('newCard');
    expect(due).toContain('due');
    expect(due).not.toContain('future');
  });
});
