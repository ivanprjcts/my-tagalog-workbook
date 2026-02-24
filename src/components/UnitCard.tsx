import Link from 'next/link';

interface UnitCardProps {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonCount: number;
}

export default function UnitCard({ id, title, description, level, lessonCount }: UnitCardProps) {
  return (
    <Link href={`/units/${id}`}>
      <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white cursor-pointer">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          {level}
        </span>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{lessonCount} lessons</span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700">
            View Unit
          </button>
        </div>
      </div>
    </Link>
  );
}
