import { describe, expect, it } from 'vitest';
import {
  createDefaultProgress,
  dayKey,
  exportProgress,
  importProgress,
  loadProgress,
  saveProgress,
  type StorageLike,
} from '../storage';
import { LEGACY_PROGRESS_STORAGE_KEY, PROGRESS_STORAGE_KEY } from '../types';

class MemoryStorage implements StorageLike {
  private readonly map = new Map<string, string>();

  getItem(key: string) {
    return this.map.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.map.set(key, value);
  }

  removeItem(key: string) {
    this.map.delete(key);
  }
}

describe('progress storage', () => {
  it('round-trips the current schema', () => {
    const storage = new MemoryStorage();
    const state = createDefaultProgress(1000);
    state.lessons.alpha = {
      lessonId: 'alpha',
      status: 'completed',
      timeSpentMs: 4000,
      attempts: 1,
      bestScore: 100,
      updatedAt: 2000,
    };
    saveProgress(state, storage);

    const loaded = loadProgress(storage);
    expect(loaded.lessons.alpha.status).toBe('completed');
    expect(loaded.lessons.alpha.bestScore).toBe(100);
  });

  it('migrates the legacy progress key', () => {
    const storage = new MemoryStorage();
    storage.setItem(
      LEGACY_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        lessonsProgress: [
          [
            'sounds-and-spelling',
            {
              lessonId: 'sounds-and-spelling',
              completed: true,
              completedDate: 1234,
              timeSpent: 5000,
            },
          ],
        ],
        lastAccess: 999,
        totalTimeSpent: 120_000,
        achievements: [],
      }),
    );

    const loaded = loadProgress(storage);
    expect(loaded.lessons['sounds-and-spelling'].status).toBe('completed');
    expect(loaded.lessons['sounds-and-spelling'].timeSpentMs).toBe(5000);
    expect(loaded.activity[dayKey(new Date())]).toBe(120);
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).not.toBeNull();
  });

  it('falls back to a clean state when storage is corrupted', () => {
    const storage = new MemoryStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, '{not valid json');
    const loaded = loadProgress(storage);
    expect(loaded.lessons).toEqual({});
    expect(loaded.cards).toEqual({});
  });

  it('exports and imports a valid backup', () => {
    const state = createDefaultProgress(5000);
    state.settings.audioEnabled = false;
    const json = exportProgress(state);

    const result = importProgress(json);
    expect(result.state?.settings.audioEnabled).toBe(false);
    expect(result.error).toBeUndefined();
  });

  it('rejects a file that is not JSON', () => {
    const result = importProgress('not json');
    expect(result.state).toBeNull();
    expect(result.error).toBeTruthy();
  });
});
