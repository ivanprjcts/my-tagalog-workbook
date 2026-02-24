interface LessonProps {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function LessonCard({ title, description, level }: LessonProps) {
  return (
    <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
        {level}
      </span>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700">
        Start Lesson
      </button>
    </div>
  );
}
