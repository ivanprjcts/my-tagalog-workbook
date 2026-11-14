import { z } from 'zod';
import {
  LEGACY_PROGRESS_STORAGE_KEY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  type LessonProgress,
  type ProgressState,
} from './types';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const masterySchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const lessonProgressSchema = z.object({
  lessonId: z.string(),
  status: z.enum(['not-started', 'in-progress', 'completed']),
  lastSectionId: z.string().optional(),
  timeSpentMs: z.number().nonnegative(),
  attempts: z.number().int().nonnegative(),
  bestScore: z.number().min(0).max(100).optional(),
  lastScore: z.number().min(0).max(100).optional(),
  completedAt: z.number().optional(),
  updatedAt: z.number(),
});

const cardProgressSchema = z.object({
  cardId: z.string(),
  easeFactor: z.number().min(1.3),
  intervalDays: z.number().nonnegative(),
  repetitions: z.number().int().nonnegative(),
  lapses: z.number().int().nonnegative(),
  masteryLevel: masterySchema,
  dueAt: z.number(),
  lastReviewedAt: z.number().optional(),
});

const progressStateSchema = z.object({
  schemaVersion: z.literal(PROGRESS_SCHEMA_VERSION),
  lessons: z.record(z.string(), lessonProgressSchema),
  cards: z.record(z.string(), cardProgressSchema),
  activity: z.record(z.string(), z.number().nonnegative()),
  settings: z.object({
    audioEnabled: z.boolean(),
    translationVisible: z.boolean(),
  }),
  lastAccess: z.number(),
  createdAt: z.number(),
});

export function dayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createDefaultProgress(now = Date.now()): ProgressState {
  return {
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    lessons: {},
    cards: {},
    activity: {},
    settings: {
      audioEnabled: true,
      translationVisible: false,
    },
    lastAccess: now,
    createdAt: now,
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function migrateLegacy(raw: unknown, now: number): ProgressState {
  const state = createDefaultProgress(now);
  const legacy = asRecord(raw);

  const entries = Array.isArray(legacy.lessonsProgress) ? legacy.lessonsProgress : [];
  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const lessonId = String(entry[0]);
    const data = asRecord(entry[1]);
    const completed = Boolean(data.completed);
    const completedAt = typeof data.completedDate === 'number' ? data.completedDate : undefined;
    const timeSpentMs = typeof data.timeSpent === 'number' ? Math.max(0, data.timeSpent) : 0;
    const progress: LessonProgress = {
      lessonId,
      status: completed ? 'completed' : timeSpentMs > 0 ? 'in-progress' : 'not-started',
      timeSpentMs,
      attempts: completed ? 1 : 0,
      completedAt,
      updatedAt: completedAt ?? now,
    };
    state.lessons[lessonId] = progress;
  }

  if (typeof legacy.totalTimeSpent === 'number' && legacy.totalTimeSpent > 0) {
    state.activity[dayKey(new Date(now))] = Math.round(legacy.totalTimeSpent / 1000);
  }

  if (typeof legacy.lastAccess === 'number') {
    state.lastAccess = legacy.lastAccess;
  }
  state.createdAt = typeof legacy.lastAccess === 'number' ? legacy.lastAccess : now;
  return state;
}

export function parseStoredProgress(raw: string | null, now = Date.now()): ProgressState | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    const direct = progressStateSchema.safeParse(parsed);
    if (direct.success) return direct.data;
    return migrateLegacy(parsed, now);
  } catch {
    return null;
  }
}

export function loadProgress(storage: StorageLike | null = typeof window !== 'undefined' ? window.localStorage : null): ProgressState {
  const now = Date.now();
  if (!storage) return createDefaultProgress(now);

  try {
    const current = parseStoredProgress(storage.getItem(PROGRESS_STORAGE_KEY), now);
    if (current) return current;

    const legacy = parseStoredProgress(storage.getItem(LEGACY_PROGRESS_STORAGE_KEY), now);
    if (legacy) {
      saveProgress(legacy, storage);
      return legacy;
    }
  } catch {
    // Private mode, disabled storage or quota errors: fall back to memory.
  }

  return createDefaultProgress(now);
}

export function saveProgress(state: ProgressState, storage: StorageLike | null = typeof window !== 'undefined' ? window.localStorage : null): void {
  if (!storage) return;
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Progress should never crash a lesson. Export/import still works while the tab is open.
  }
}

export function clearProgress(storage: StorageLike | null = typeof window !== 'undefined' ? window.localStorage : null): void {
  if (!storage) return;
  try {
    storage.removeItem(PROGRESS_STORAGE_KEY);
    storage.removeItem(LEGACY_PROGRESS_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function exportProgress(state: ProgressState): string {
  return JSON.stringify(state, null, 2);
}

export function importProgress(raw: string): { state: ProgressState | null; error?: string } {
  const parsed = parseStoredProgress(raw);
  if (!parsed) {
    return { state: null, error: 'The file is not valid workbook progress.' };
  }
  const validation = progressStateSchema.safeParse(parsed);
  if (!validation.success) {
    return { state: null, error: 'The file is missing required progress fields.' };
  }
  return { state: validation.data };
}
