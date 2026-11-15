'use client';

import type { VocabularyEntry } from '@/content/schema';
import { PRONUNCIATIONS } from '@/content/pronunciations';
import { AudioButton } from './AudioButton';

export function VocabularyTable({ entries }: { entries: VocabularyEntry[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
      <div className="hidden grid-cols-[1.1fr_1fr_1.4fr] gap-3 border-b border-line bg-paper-strong px-4 py-3 text-xs font-bold uppercase tracking-widest text-ink-muted md:grid">
        <span>Tagalog</span>
        <span>English</span>
        <span>Example</span>
      </div>
      <ul className="divide-y divide-line">
        {entries.map((entry) => (
          <li key={entry.id} className="grid gap-2 px-4 py-4 md:grid-cols-[1.1fr_1fr_1.4fr] md:gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-ink">{entry.tagalog}</span>
                <AudioButton text={entry.audioText ?? entry.tagalog} compact label="Audio" />
              </div>
              {PRONUNCIATIONS[entry.tagalog] && (
                <div className="mt-1 font-mono text-xs text-ink-muted">{PRONUNCIATIONS[entry.tagalog]}</div>
              )}
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {entry.partOfSpeech}
              </div>
              {entry.spanish && <div className="mt-1 text-xs text-amber-700">Spanish: {entry.spanish}</div>}
            </div>
            <div className="text-sm text-ink">{entry.english}</div>
            <div className="text-sm text-ink-muted">
              {entry.example ? (
                <>
                  <div className="text-ink">{entry.example.tagalog}</div>
                  <div className="mt-0.5">{entry.example.english}</div>
                </>
              ) : (
                <span>—</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
