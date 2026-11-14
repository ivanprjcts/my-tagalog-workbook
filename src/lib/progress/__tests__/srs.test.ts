import { describe, expect, it } from 'vitest';
import { createCardProgress, DAY_MS, isCardDue, isCardMastered, scheduleCard } from '../srs';

const NOW = new Date('2026-01-01T09:00:00.000Z').getTime();

describe('spaced repetition scheduling', () => {
  it('makes a new card due immediately', () => {
    const card = createCardProgress('card-1', NOW);
    expect(isCardDue(card, NOW)).toBe(true);
    expect(card.masteryLevel).toBe(0);
    expect(card.intervalDays).toBe(0);
  });

  it('grows the interval with Good grades', () => {
    let card = createCardProgress('card-1', NOW);
    card = scheduleCard(card, 'good', NOW);
    expect(card.intervalDays).toBe(1);
    expect(card.masteryLevel).toBe(1);

    card = scheduleCard(card, 'good', NOW + DAY_MS);
    expect(card.intervalDays).toBe(3);
    expect(card.masteryLevel).toBe(2);

    card = scheduleCard(card, 'good', NOW + 4 * DAY_MS);
    expect(card.intervalDays).toBeGreaterThanOrEqual(7);
    expect(card.masteryLevel).toBe(3);
  });

  it('marks a well-reviewed card as mastered', () => {
    let card = createCardProgress('card-1', NOW);
    for (let i = 0; i < 4; i += 1) {
      card = scheduleCard(card, 'good', NOW + i * DAY_MS);
    }
    expect(card.masteryLevel).toBeGreaterThanOrEqual(4);
    expect(card.intervalDays).toBeGreaterThanOrEqual(7);
    expect(isCardMastered(card)).toBe(true);
  });

  it('requeues Again cards quickly and records a lapse', () => {
    let card = createCardProgress('card-1', NOW);
    card = scheduleCard(card, 'good', NOW);
    card = scheduleCard(card, 'again', NOW + DAY_MS);

    expect(card.intervalDays).toBe(0);
    expect(card.lapses).toBe(1);
    expect(card.repetitions).toBe(0);
    expect(card.masteryLevel).toBe(0);
    expect(card.dueAt).toBe(NOW + DAY_MS + 10 * 60 * 1000);
  });

  it('never lets ease fall below the floor', () => {
    let card = createCardProgress('card-1', NOW);
    for (let i = 0; i < 20; i += 1) {
      card = scheduleCard(card, 'again', NOW + i * DAY_MS);
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
  });
});
