export const PROGRESS_SCHEMA_VERSION = 2 as const;
export const PROGRESS_STORAGE_KEY = 'tagalog-workbook-progress-v2';
export const LEGACY_PROGRESS_STORAGE_KEY = 'tagalog-learning-progress';

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  lastSectionId?: string;
  timeSpentMs: number;
  attempts: number;
  bestScore?: number;
  lastScore?: number;
  completedAt?: number;
  updatedAt: number;
}

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export interface CardProgress {
  cardId: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
  masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
  dueAt: number;
  lastReviewedAt?: number;
}

export interface ProgressSettings {
  audioEnabled: boolean;
  translationVisible: boolean;
}

export interface ProgressState {
  schemaVersion: typeof PROGRESS_SCHEMA_VERSION;
  lessons: Record<string, LessonProgress>;
  cards: Record<string, CardProgress>;
  /** Local calendar day (YYYY-MM-DD) to seconds studied. */
  activity: Record<string, number>;
  settings: ProgressSettings;
  lastAccess: number;
  createdAt: number;
}

export interface ProgressStats {
  totalLessons: number;
  lessonsCompleted: number;
  lessonsInProgress: number;
  completionPercent: number;
  cardsReviewed: number;
  cardsDue: number;
  streakDays: number;
  totalStudySeconds: number;
}

export interface LessonScore {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
}
