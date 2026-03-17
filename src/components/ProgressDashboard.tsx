'use client';

import { useProgress } from '@/hooks/useProgress';
import { UNITS, LESSONS } from '@/data';

export default function ProgressDashboard() {
  const { progress, isLoading, getStats } = useProgress();

  if (isLoading || !progress) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-600">Loading progress...</div>
      </div>
    );
  }

  const stats = getStats(UNITS.length, LESSONS.length);

  if (!stats) {
    return <div>Error loading stats</div>;
  }

  // Calculate current streak (simplified version)
  const lastAccess = progress.lastAccess;
  const daysSinceAccess = Math.floor((Date.now() - lastAccess) / (24 * 60 * 60 * 1000));
  const currentStreak = daysSinceAccess <= 1 ? 1 : 0; // Simplified: 1 if accessed today/yesterday

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="text-sm font-semibold text-blue-900 uppercase">Lessons Completed</div>
          <div className="text-4xl font-bold text-blue-600 mt-2">
            {stats.lessonsCompleted}
            <span className="text-xl text-blue-500">/{stats.totalLessons}</span>
          </div>
          <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${stats.lessonsPercentage}%` }}
            />
          </div>
          <div className="text-xs text-blue-700 mt-2">{stats.lessonsPercentage}% complete</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="text-sm font-semibold text-green-900 uppercase">Units Completed</div>
          <div className="text-4xl font-bold text-green-600 mt-2">
            {stats.unitsCompleted}
            <span className="text-xl text-green-500">/{stats.totalUnits}</span>
          </div>
          <div className="mt-4 text-sm text-green-700">
            {stats.unitsCompleted === 0 && 'Start your first unit!'}
            {stats.unitsCompleted > 0 && `${stats.totalUnits - stats.unitsCompleted} more to go`}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="text-sm font-semibold text-purple-900 uppercase">Study Time</div>
          <div className="text-4xl font-bold text-purple-600 mt-2">{stats.hoursSpent}</div>
          <div className="text-xs text-purple-700 mt-2">hours spent learning</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="text-sm font-semibold text-orange-900 uppercase">Current Streak</div>
          <div className="text-4xl font-bold text-orange-600 mt-2">🔥 {currentStreak}</div>
          <div className="text-xs text-orange-700 mt-2">Keep it up!</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
        {progress.achievements.length === 0 ? (
          <p className="text-gray-600">
            No achievements yet. Keep learning to unlock achievements!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {progress.achievements.map((achievement) => (
              <div
                key={achievement}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center"
              >
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-sm font-semibold text-yellow-900 capitalize">
                  {achievement.replace(/-/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-600">
          Last accessed: <span className="font-semibold">{new Date(progress.lastAccess).toLocaleDateString()}</span>
        </p>
      </div>

      {/* Motivation Message */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Keep Learning!</h3>
        <p className="text-blue-800">
          {stats.lessonsPercentage === 100
            ? '🎉 Amazing! You\'ve completed all lessons! Keep practicing with flashcards and grammar.'
            : `You're ${100 - stats.lessonsPercentage}% away from completing all lessons. Keep going!`}
        </p>
      </div>
    </div>
  );
}
