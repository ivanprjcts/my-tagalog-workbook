'use client';

import { useSyncExternalStore } from 'react';
import { getDueCardIds, getLessonProgress, getStats } from './selectors';
import { progressStore } from './store';

export function useProgress(totalLessons = 0) {
  const progress = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot,
  );

  return {
    progress,
    stats: getStats(progress, totalLessons),
    getLessonProgress: (lessonId: string) => getLessonProgress(progress, lessonId),
    getDueCardIds: (cardIds: string[]) => getDueCardIds(progress.cards, cardIds),
    markLessonStarted: progressStore.markLessonStarted,
    setLastSection: progressStore.setLastSection,
    addLessonTime: progressStore.addLessonTime,
    recordLessonScore: progressStore.recordLessonScore,
    completeLesson: progressStore.completeLesson,
    gradeCard: progressStore.gradeCard,
    updateSettings: progressStore.updateSettings,
    resetProgress: progressStore.reset,
    exportProgress: progressStore.exportState,
    importProgress: progressStore.importState,
  };
}
