'use client';

import { useState } from 'react';
import type { DialogueSection, LessonSection, PatternSection, TextSection } from '@/content/schema';
import { Callout } from '@/components/ui/Callout';
import { cn } from '@/components/ui/cn';
import { AudioButton } from './AudioButton';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-2xl font-black tracking-tight text-ink">{children}</h2>;
}

function TextBlock({ section }: { section: TextSection }) {
  return (
    <section>
      {section.title && <SectionTitle>{section.title}</SectionTitle>}
      <div className="prose-lesson text-ink">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {section.bullets && (
          <ul>
            {section.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function PatternBlock({ section }: { section: PatternSection }) {
  return (
    <section>
      <SectionTitle>{section.title}</SectionTitle>
      {section.pattern && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-accent-soft px-4 py-3 font-mono text-base font-bold text-accent-strong">
          {section.pattern}
        </div>
      )}
      <p className="mb-4 leading-relaxed text-ink">{section.explanation}</p>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-paper-strong text-xs font-bold uppercase tracking-widest text-ink-muted">
            <tr>
              <th className="px-4 py-3">Tagalog</th>
              <th className="px-4 py-3">English</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {section.examples.map((example, index) => (
              <tr key={index}>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-ink">{example.tagalog}</span>
                    <AudioButton text={example.tagalog} compact label="Audio" />
                  </div>
                  {example.ipa && <div className="mt-1 font-mono text-xs text-ink-muted">{example.ipa}</div>}
                  {example.explanation && <p className="mt-1 text-xs text-ink-muted">{example.explanation}</p>}
                </td>
                <td className="px-4 py-3 text-ink-muted">{example.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.commonMistake && (
        <Callout variant="mistake" className="mt-4">
          <p>
            <span className="font-semibold">Instead of:</span> {section.commonMistake.wrong}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Say:</span> {section.commonMistake.right}
          </p>
          <p className="mt-2 text-ink-muted">{section.commonMistake.explanation}</p>
        </Callout>
      )}
    </section>
  );
}

function DialogueBlock({
  section,
  translationsDefaultVisible,
}: {
  section: DialogueSection;
  translationsDefaultVisible: boolean;
}) {
  const [showEnglish, setShowEnglish] = useState(translationsDefaultVisible);

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>{section.title}</SectionTitle>
        <button
          type="button"
          onClick={() => setShowEnglish((value) => !value)}
          className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted hover:border-accent hover:text-accent-strong"
          aria-pressed={showEnglish}
        >
          {showEnglish ? 'Hide translation' : 'Show translation'}
        </button>
      </div>
      {section.context && <p className="mb-4 text-sm italic text-ink-muted">{section.context}</p>}
      <div className="space-y-3">
        {section.lines.map((line, index) => (
          <div
            key={index}
            className={cn(
              'rounded-xl border border-line bg-white p-4 shadow-sm',
              index % 2 === 1 && 'bg-paper/70',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-strong">{line.speaker}</span>
              <AudioButton text={line.audioText ?? line.tagalog} compact label="Audio" />
            </div>
            <p className="mt-1 text-lg font-semibold leading-snug text-ink">{line.tagalog}</p>
            {showEnglish && <p className="mt-1 text-sm text-ink-muted">{line.english}</p>}
          </div>
        ))}
      </div>
      {section.comprehension && (
        <p className="mt-3 rounded-lg border border-line bg-paper p-3 text-sm text-ink-muted">
          <strong className="text-ink">Check:</strong> {section.comprehension}
        </p>
      )}
    </section>
  );
}

function ReviewBlock({ section }: { section: Extract<LessonSection, { type: 'review' }> }) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <h2 className="text-xl font-black text-ink">{section.title}</h2>
      <ul className="mt-3 space-y-2">
        {section.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ink">
            <span aria-hidden="true" className="text-accent-strong">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LessonSectionView({
  section,
  translationsDefaultVisible = false,
}: {
  section: LessonSection;
  translationsDefaultVisible?: boolean;
}) {
  switch (section.type) {
    case 'text':
      return <TextBlock section={section} />;
    case 'pattern':
      return <PatternBlock section={section} />;
    case 'dialogue':
      return <DialogueBlock section={section} translationsDefaultVisible={translationsDefaultVisible} />;
    case 'callout':
      return (
        <Callout variant={section.variant} title={section.title}>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
        </Callout>
      );
    case 'review':
      return <ReviewBlock section={section} />;
    default:
      return null;
  }
}
