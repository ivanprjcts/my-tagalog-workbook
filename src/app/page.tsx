import Link from 'next/link';
import LessonCard from '@/components/LessonCard';
import { LESSONS } from '@/constants/lessons';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">My Tagalog Workbook</h1>
          <p className="text-gray-600 mt-2">Step-by-step path to fluency.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">Get Started</h2>
              <p className="text-gray-600 mt-2">Browse all lessons or explore units for structured learning</p>
            </div>
            <Link 
              href="/units" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              View All Units
            </Link>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6">Recent Lessons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LESSONS.slice(0, 6).map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
