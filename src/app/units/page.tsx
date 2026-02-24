import UnitCard from '@/components/UnitCard';
import { UNITS } from '@/constants/units';
import { LESSONS } from '@/constants/lessons';

export default function UnitsPage() {
  // Calculate lesson count for each unit
  const getUnitLessonCount = (unitId: string) => {
    return LESSONS.filter(lesson => lesson.unitId === unitId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">My Tagalog Workbook</h1>
          <p className="text-gray-600 mt-2">Step-by-step path to fluency.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">All Units</h2>
          <p className="text-gray-600">Choose a unit to explore its lessons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNITS.map((unit) => (
            <UnitCard
              key={unit.id}
              id={unit.id}
              title={unit.title}
              description={unit.description}
              level={unit.level}
              lessonCount={getUnitLessonCount(unit.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
