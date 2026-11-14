import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { A1_LESSONS, getLesson } from '@/content/a1';
import { LessonView } from '@/components/lesson/LessonView';

interface LessonDetailPageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export function generateStaticParams() {
  return A1_LESSONS.filter((lesson) => lesson.status === 'published').map((lesson) => ({
    id: lesson.unitId,
    lessonId: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonDetailPageProps): Promise<Metadata> {
  const { id, lessonId } = await params;
  const lesson = getLesson(id, lessonId);
  if (!lesson) return { title: 'Lesson not found' };
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { id: unitId, lessonId } = await params;
  const lesson = getLesson(unitId, lessonId);

  if (!lesson || lesson.status !== 'published') {
    notFound();
  }

  const published = A1_LESSONS.filter((item) => item.status === 'published');
  const index = published.findIndex((item) => item.id === lesson.id);
  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index >= 0 && index < published.length - 1 ? published[index + 1] : undefined;

  return (
    <LessonView
      lesson={lesson}
      previous={
        previous
          ? { title: previous.title, href: `/units/${previous.unitId}/lessons/${previous.slug}` }
          : undefined
      }
      next={next ? { title: next.title, href: `/units/${next.unitId}/lessons/${next.slug}` } : undefined}
    />
  );
}
