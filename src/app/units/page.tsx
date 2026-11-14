import { A1_COURSE } from '@/content/a1';
import { A1_OUTLINE } from '@/content/a1/outline';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitCard } from '@/components/UnitCard';
import { Callout } from '@/components/ui/Callout';

export const metadata = {
  title: 'The A1 path',
  description: 'Six units and 36 lessons, from Tagalog sounds to a functional A1 exit profile.',
};

export default function UnitsPage() {
  const availableLessons = A1_COURSE.units.flatMap((unit) => unit.lessons);

  return (
    <div>
      <PageHeader
        eyebrow="Curriculum"
        title="The A1 path"
        description="Six units, six lessons each. Unit 1 is live; the remaining units are being authored in order. The path stays visible so you always know what is next."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {A1_OUTLINE.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              availableLessons={availableLessons.filter((lesson) => lesson.unitId === unit.id).length}
            />
          ))}
        </div>

        <Callout variant="tip" title="How to use the path" className="mt-10">
          <p>
            Do one lesson every two or three days and review for ten minutes on the other days. Do not rush to Unit 6;
            the early units build the patterns you will reuse in every conversation.
          </p>
        </Callout>
      </div>
    </div>
  );
}
