import Link from 'next/link';
import { A1_COURSE } from '@/content/a1';
import { A1_OUTLINE } from '@/content/a1/outline';
import { HomeProgress } from '@/components/home/HomeProgress';
import { UnitCard } from '@/components/UnitCard';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const availableLessons = A1_COURSE.units.flatMap((unit) => unit.lessons);

  return (
    <div>
      <section className="paper-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <Badge tone="sun">A1 · Spanish → Tagalog</Badge>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-ink sm:text-6xl">
              Learn Tagalog, one small lesson at a time.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              A static workbook built for a Spanish speaker who already knows English. Clear explanations, real
              dialogues, audio, exercises and spaced review — with no account and no tracking.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/units/unit-1/lessons/sounds-and-spelling" className={buttonStyles('primary', 'lg')}>
                Start Lesson 1
              </Link>
              <Link href="/units" className={buttonStyles('secondary', 'lg')}>
                See the A1 path
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              Units 1 and 2 are live. The full A1 path is being authored in phases; the outline shows exactly what is next.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 sm:py-14">
        <section aria-labelledby="today">
          <h2 id="today" className="mb-4 text-2xl font-black text-ink">Today</h2>
          <HomeProgress />
        </section>

        <section aria-labelledby="path">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="path" className="text-2xl font-black text-ink">The A1 path</h2>
              <p className="mt-1 text-sm text-ink-muted">Six units, six lessons each, from sounds to a mock exam.</p>
            </div>
            <Link href="/units" className="text-sm font-semibold text-accent-strong hover:underline">
              View all units →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {A1_OUTLINE.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                availableLessons={availableLessons.filter((lesson) => lesson.unitId === unit.id).length}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="how">
          <h2 id="how" className="mb-5 text-2xl font-black text-ink">How the workbook works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">01 · Input</div>
              <h3 className="mt-2 text-lg font-black text-ink">Understand first</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Short explanations, vocabulary with audio and a dialogue you can reveal line by line.
              </p>
            </Card>
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">02 · Practice</div>
              <h3 className="mt-2 text-lg font-black text-ink">Then produce</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Recognition becomes controlled production: fill the blank, build the sentence, translate, listen and
                type what you hear.
              </p>
            </Card>
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest text-accent-strong">03 · Review</div>
              <h3 className="mt-2 text-lg font-black text-ink">Keep it</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Lesson checks and spaced review bring back what you are about to forget. Your progress stays in this
                browser.
              </p>
            </Card>
          </div>
        </section>

        <Callout variant="spanish" title="Spanish is an advantage here">
          <p>
            You already have the five vowels, the ñ and thousands of loanwords. The workbook uses that advantage and
            warns you about the traps: <em>siyempre</em> does not mean “always”, <em>siguro</em> does not mean “sure”,
            and <em>ang</em> is not “the”.
          </p>
        </Callout>

        <section className="rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-ink">What is next</h2>
              <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                Units 1 and 2 are complete and playable end-to-end. The next phase authors Units 3–6, the final A1
                exam, graded reading and listening, and the searchable reference.
              </p>
            </div>
            <Link href="/progress" className={buttonStyles('secondary', 'md')}>
              Your progress
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
