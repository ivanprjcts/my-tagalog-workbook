import { createCardProgress, scheduleCard } from './srs';
import {
  clearProgress,
  createDefaultProgress,
  dayKey,
  exportProgress,
  importProgress,
  loadProgress,
  saveProgress,
} from './storage';
import type {
  LessonProgress,
  LessonScore,
  ProgressSettings,
  ProgressState,
  ReviewGrade,
} from './types';

type Listener = () => void;

function nowIso() {
  return Date.now();
}

class ProgressStore {
  private state: ProgressState = createDefaultProgress(0);
  private readonly serverState: ProgressState = createDefaultProgress(0);
  private loaded = false;
  private listeners = new Set<Listener>();

  constructor() {
    this.markLessonStarted = this.markLessonStarted.bind(this);
    this.setLastSection = this.setLastSection.bind(this);
    this.addLessonTime = this.addLessonTime.bind(this);
    this.recordLessonScore = this.recordLessonScore.bind(this);
    this.completeLesson = this.completeLesson.bind(this);
    this.gradeCard = this.gradeCard.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.reset = this.reset.bind(this);
    this.exportState = this.exportState.bind(this);
    this.importState = this.importState.bind(this);
  }

  getSnapshot = (): ProgressState => {
    this.ensureLoaded();
    return this.state;
  };

  getServerSnapshot = (): ProgressState => this.serverState;

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private ensureLoaded() {
    if (this.loaded || typeof window === 'undefined') return;
    this.state = loadProgress();
    this.loaded = true;
  }

  private emit() {
    for (const listener of this.listeners) listener();
  }

  private update(updater: (state: ProgressState) => ProgressState) {
    this.ensureLoaded();
    this.state = updater(this.state);
    saveProgress(this.state);
    this.emit();
  }

  markLessonStarted(lessonId: string) {
    const now = nowIso();
    this.update((state) => {
      const previous = state.lessons[lessonId];
      if (previous?.status === 'completed') return { ...state, lastAccess: now };
      const lesson: LessonProgress = {
        lessonId,
        status: 'in-progress',
        timeSpentMs: previous?.timeSpentMs ?? 0,
        attempts: previous?.attempts ?? 0,
        bestScore: previous?.bestScore,
        lastScore: previous?.lastScore,
        lastSectionId: previous?.lastSectionId,
        completedAt: previous?.completedAt,
        updatedAt: now,
      };
      return {
        ...state,
        lessons: { ...state.lessons, [lessonId]: lesson },
        lastAccess: now,
      };
    });
  }

  setLastSection(lessonId: string, sectionId: string) {
    const now = nowIso();
    this.update((state) => {
      const previous = state.lessons[lessonId];
      const lesson: LessonProgress = {
        lessonId,
        status: previous?.status ?? 'in-progress',
        timeSpentMs: previous?.timeSpentMs ?? 0,
        attempts: previous?.attempts ?? 0,
        bestScore: previous?.bestScore,
        lastScore: previous?.lastScore,
        completedAt: previous?.completedAt,
        lastSectionId: sectionId,
        updatedAt: now,
      };
      return {
        ...state,
        lessons: { ...state.lessons, [lessonId]: lesson },
        lastAccess: now,
      };
    });
  }

  addLessonTime(lessonId: string, milliseconds: number) {
    if (!Number.isFinite(milliseconds) || milliseconds <= 0) return;
    const now = nowIso();
    const seconds = Math.max(1, Math.round(milliseconds / 1000));
    const key = dayKey(new Date(now));

    this.update((state) => {
      const previous = state.lessons[lessonId];
      const lesson: LessonProgress = {
        lessonId,
        status: previous?.status === 'completed' ? 'completed' : 'in-progress',
        timeSpentMs: (previous?.timeSpentMs ?? 0) + milliseconds,
        attempts: previous?.attempts ?? 0,
        bestScore: previous?.bestScore,
        lastScore: previous?.lastScore,
        lastSectionId: previous?.lastSectionId,
        completedAt: previous?.completedAt,
        updatedAt: now,
      };
      return {
        ...state,
        lessons: { ...state.lessons, [lessonId]: lesson },
        activity: {
          ...state.activity,
          [key]: (state.activity[key] ?? 0) + seconds,
        },
        lastAccess: now,
      };
    });
  }

  recordLessonScore(lessonId: string, score: LessonScore) {
    const now = nowIso();
    this.update((state) => {
      const previous = state.lessons[lessonId];
      const passed = score.passed;
      const lesson: LessonProgress = {
        lessonId,
        status: passed ? 'completed' : previous?.status === 'completed' ? 'completed' : 'in-progress',
        timeSpentMs: previous?.timeSpentMs ?? 0,
        attempts: (previous?.attempts ?? 0) + 1,
        bestScore: Math.max(previous?.bestScore ?? 0, score.score),
        lastScore: score.score,
        lastSectionId: previous?.lastSectionId,
        completedAt: passed ? previous?.completedAt ?? now : previous?.completedAt,
        updatedAt: now,
      };
      return {
        ...state,
        lessons: { ...state.lessons, [lessonId]: lesson },
        lastAccess: now,
      };
    });
  }

  completeLesson(lessonId: string) {
    const now = nowIso();
    this.update((state) => {
      const previous = state.lessons[lessonId];
      const lesson: LessonProgress = {
        lessonId,
        status: 'completed',
        timeSpentMs: previous?.timeSpentMs ?? 0,
        attempts: previous?.attempts ?? 0,
        bestScore: previous?.bestScore,
        lastScore: previous?.lastScore,
        lastSectionId: previous?.lastSectionId,
        completedAt: previous?.completedAt ?? now,
        updatedAt: now,
      };
      return {
        ...state,
        lessons: { ...state.lessons, [lessonId]: lesson },
        lastAccess: now,
      };
    });
  }

  gradeCard(cardId: string, grade: ReviewGrade, now = Date.now()) {
    this.update((state) => {
      const card = state.cards[cardId] ?? createCardProgress(cardId, now);
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: scheduleCard(card, grade, now),
        },
        lastAccess: now,
      };
    });
  }

  updateSettings(partial: Partial<ProgressSettings>) {
    this.update((state) => ({
      ...state,
      settings: { ...state.settings, ...partial },
      lastAccess: nowIso(),
    }));
  }

  reset() {
    clearProgress();
    this.state = createDefaultProgress();
    this.loaded = true;
    saveProgress(this.state);
    this.emit();
  }

  exportState(): string {
    return exportProgress(this.getSnapshot());
  }

  importState(raw: string): { ok: true } | { ok: false; error: string } {
    const result = importProgress(raw);
    if (!result.state) {
      return { ok: false, error: result.error ?? 'Could not import progress.' };
    }
    this.state = result.state;
    this.loaded = true;
    saveProgress(this.state);
    this.emit();
    return { ok: true };
  }
}

export const progressStore = new ProgressStore();
