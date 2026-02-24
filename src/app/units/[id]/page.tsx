import Link from 'next/link';
import LessonCard from '@/components/LessonCard';
import { UNITS } from '@/constants/units';
import { LESSONS } from '@/constants/lessons';
import { notFound } from 'next/navigation';

interface UnitDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return UNITS.map((unit) => ({
    id: unit.id,
  }));
}

export default async function UnitDetailPage({ params }: UnitDetailPageProps) {
  const { id } = await params;

  const unit = UNITS.find(u => u.id === id);
  if (!unit) {
    notFound();
  }

  const unitLessons = LESSONS.filter(lesson => lesson.unitId === id).sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/units" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Units
          </Link>
          <h1 className="text-4xl font-bold">{unit.title}</h1>
          <p className="text-gray-600 mt-2">{unit.description}</p>
          <span className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded">
            {unit.level}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Lessons in this Unit</h2>
          <p className="text-gray-600">{unitLessons.length} lessons</p>
        </div>

        {unitLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                level={lesson.level}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No lessons found for this unit.</p>
          </div>
        )}
      </main>
    </div>
  );
}
