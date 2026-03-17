import Link from 'next/link';
import { AlphabetViewer } from '@/components/AlphabetViewer';
import { UNITS, LESSONS } from '@/data';
import { notFound } from 'next/navigation';

interface LessonDetailPageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    id: lesson.unitId,
    lessonId: lesson.id,
  }));
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { id: unitId, lessonId } = await params;

  const unit = UNITS.find((u) => u.id === unitId);
  const lesson = LESSONS.find((l) => l.id === lessonId && l.unitId === unitId);

  if (!unit || !lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href={`/units/${unitId}`} className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to {unit.title}
          </Link>
          <h1 className="text-4xl font-bold">{lesson.title}</h1>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {lesson.level}
            </span>
            <span className="text-sm text-gray-600">Lesson {lesson.order}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-12 p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>
              The Tagalog alphabet is the foundation of learning the language. Understanding how to pronounce each letter
              and the sounds they represent will help you read and speak Tagalog correctly.
            </p>
            <p>
              Tagalog uses the Latin alphabet with 26 letters, plus two additional letters: <strong>Ñ</strong> (en-yeh) and{' '}
              <strong>Ng</strong> (eng). This gives Tagalog its complete 28-letter alphabet.
            </p>
          </div>
        </section>

        {/* Interactive Alphabet Viewer */}
        <section className="mb-12">
          <AlphabetViewer className="bg-white p-6 rounded-lg border border-gray-200" />
        </section>

        {/* Key Takeaways */}
        {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {lesson.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                      ✓
                    </div>
                    <p className="text-gray-700">{takeaway}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice Tips */}
        <section className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-4">🎯 Practice Tips</h3>
          <ul className="space-y-3 text-green-900">
            <li className="flex gap-3">
              <span className="text-lg">1.</span>
              <span>Listen to native speakers pronounce each letter carefully</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">2.</span>
              <span>Practice saying each letter and example word aloud</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">3.</span>
              <span>Pay special attention to letters that sound different from English (like NG)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">4.</span>
              <span>Remember that Tagalog vowels are pure and consistent</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">5.</span>
              <span>Every letter is pronounced - there are no silent letters in Tagalog</span>
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Link href={`/units/${unitId}`} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold">
            ← Back to Unit
          </Link>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Mark as Complete →
          </button>
        </div>
      </main>
    </div>
  );
}
