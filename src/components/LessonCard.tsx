import Link from 'next/link';

interface LessonProps {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  unitId?: string;
  lessonId?: string;
}

export default function LessonCard({ title, description, level, unitId, lessonId }: LessonProps) {
  const href = unitId && lessonId ? `/units/${unitId}/lessons/${lessonId}` : '#';
  
  return (
    <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
        {level}
      </span>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <Link href={href} className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700 block text-center">
        Start Lesson
      </Link>
    </div>
  );
}
