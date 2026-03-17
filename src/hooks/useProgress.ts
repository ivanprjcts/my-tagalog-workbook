import { useState, useEffect } from 'react';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedDate?: number;
  timeSpent: number; // milliseconds
}

export interface UnitProgress {
  unitId: string;
  lessonsCompleted: number;
  totalLessons: number;
  completedDate?: number;
}

export interface UserProgress {
  lessonsProgress: Map<string, LessonProgress>;
  unitsProgress: Map<string, UnitProgress>;
  lastAccess: number;
  totalTimeSpent: number;
  achievements: string[];
}

const STORAGE_KEY = 'tagalog-learning-progress';

/**
 * Hook to manage user learning progress
 */
export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          // Convert Maps back from array format
          const lessonsMap = new Map(data.lessonsProgress || []);
          const unitsMap = new Map(data.unitsProgress || []);

          setProgress({
            ...data,
            lessonsProgress: lessonsMap,
            unitsProgress: unitsMap,
          });
        } else {
          // Initialize empty progress
          setProgress({
            lessonsProgress: new Map(),
            unitsProgress: new Map(),
            lastAccess: Date.now(),
            totalTimeSpent: 0,
            achievements: [],
          });
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        setProgress({
          lessonsProgress: new Map(),
          unitsProgress: new Map(),
          lastAccess: Date.now(),
          totalTimeSpent: 0,
          achievements: [],
        });
      }
      setIsLoading(false);
    };

    loadProgress();
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress && !isLoading) {
      try {
        const dataToSave = {
          lessonsProgress: Array.from(progress.lessonsProgress.entries()),
          unitsProgress: Array.from(progress.unitsProgress.entries()),
          lastAccess: progress.lastAccess,
          totalTimeSpent: progress.totalTimeSpent,
          achievements: progress.achievements,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  }, [progress, isLoading]);

  /**
   * Mark a lesson as completed
   */
  const completeLessor = (lessonId: string, timeSpent: number = 0) => {
    setProgress((prev) => {
      if (!prev) return prev;

      const newProgress = { ...prev };
      newProgress.lessonsProgress.set(lessonId, {
        lessonId,
        completed: true,
        completedDate: Date.now(),
        timeSpent,
      });

      newProgress.totalTimeSpent += timeSpent;
      newProgress.lastAccess = Date.now();

      return newProgress;
    });
  };

  /**
   * Get progress for a specific unit
   */
  const getUnitProgress = (unitId: string, totalLessons: number) => {
    if (!progress) return null;

    const unitProgress = progress.unitsProgress.get(unitId);
    if (unitProgress) return unitProgress;

    // Calculate from lessons
    let completedCount = 0;
    // (This would be calculated from lessons in the unit)

    return {
      unitId,
      lessonsCompleted: completedCount,
      totalLessons,
    };
  };

  /**
   * Get overall progress statistics
   */
  const getStats = (totalUnits: number, totalLessons: number) => {
    if (!progress) return null;

    const lessonsCompleted = progress.lessonsProgress.size;
    const hoursSpent = Math.round(progress.totalTimeSpent / 3600000);

    return {
      lessonsCompleted,
      totalLessons,
      lessonsPercentage: Math.round((lessonsCompleted / totalLessons) * 100),
      unitsCompleted: progress.unitsProgress.size,
      totalUnits,
      hoursSpent,
      achievements: progress.achievements,
    };
  };

  /**
   * Award an achievement
   */
  const awardAchievement = (achievementId: string) => {
    setProgress((prev) => {
      if (!prev || prev.achievements.includes(achievementId)) return prev;

      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  };

  return {
    progress,
    isLoading,
    completeLessor,
    getUnitProgress,
    getStats,
    awardAchievement,
  };
}
