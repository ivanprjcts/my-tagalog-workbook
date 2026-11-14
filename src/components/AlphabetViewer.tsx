'use client';

import React, { useState } from 'react';
import { PHONEMES, PRONUNCIATION_RULES } from '@/data/phonemes';
import type { LetterUsage } from '@/types/content';

export interface AlphabetViewerProps {
  className?: string;
}

const USAGE_LABELS: Record<LetterUsage, string> = {
  native: 'native',
  common: 'common',
  loanword: 'loanword',
  rare: 'rare',
};

const USAGE_STYLES: Record<LetterUsage, string> = {
  native: 'bg-emerald-100 text-emerald-800',
  common: 'bg-sky-100 text-sky-800',
  loanword: 'bg-amber-100 text-amber-800',
  rare: 'bg-slate-200 text-slate-700',
};

export const AlphabetViewer: React.FC<AlphabetViewerProps> = ({ className = '' }) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [showOnlyVowels, setShowOnlyVowels] = useState(false);
  const [hideLoanwords, setHideLoanwords] = useState(false);

  const selectedPhoneme = PHONEMES.find((p) => p.uppercase === selectedLetter);
  const displayedPhonemes = PHONEMES.filter((phoneme) => {
    if (showOnlyVowels && !['A', 'E', 'I', 'O', 'U'].includes(phoneme.uppercase)) {
      return false;
    }
    if (hideLoanwords && ['loanword', 'rare'].includes(phoneme.usage)) {
      return false;
    }
    return true;
  });

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Modern Filipino alphabet (28 letters)</h3>
            <p className="mt-1 text-sm text-stone-600">
              The older abakada has 20 letters. The extra letters are mostly used in Spanish and English loanwords.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlyVowels}
                onChange={(e) => setShowOnlyVowels(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300"
              />
              Vowels only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hideLoanwords}
                onChange={(e) => setHideLoanwords(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300"
              />
              Hide loanword letters
            </label>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {displayedPhonemes.map((phoneme) => (
            <button
              key={phoneme.letter}
              type="button"
              onClick={() => setSelectedLetter(phoneme.uppercase)}
              aria-pressed={selectedLetter === phoneme.uppercase}
              className={`rounded-lg border px-2 py-3 text-center font-semibold transition-colors ${
                selectedLetter === phoneme.uppercase
                  ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              {phoneme.letter}
            </button>
          ))}
        </div>
      </div>

      {selectedPhoneme && (
        <div className="space-y-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="space-y-2">
              <div className="text-7xl font-bold leading-none text-emerald-700">{selectedPhoneme.uppercase}</div>
              <div className="text-sm text-stone-600">Lowercase: {selectedPhoneme.lowercase}</div>
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${USAGE_STYLES[selectedPhoneme.usage]}`}
              >
                {USAGE_LABELS[selectedPhoneme.usage]}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-semibold uppercase tracking-wide text-stone-700">Sound</h4>
                <div className="text-2xl font-bold text-emerald-700">{selectedPhoneme.pronunciation}</div>
                <div className="mt-1 text-sm text-stone-600">IPA: {selectedPhoneme.ipa}</div>
              </div>

              {selectedPhoneme.notes && (
                <div className="rounded-lg border-l-4 border-emerald-600 bg-emerald-100/70 p-3">
                  <p className="text-sm text-stone-800">{selectedPhoneme.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-stone-900">Example words</h4>
            <div className="grid gap-3 md:grid-cols-3">
              {selectedPhoneme.examples.map((example, idx) => (
                <div key={idx} className="rounded-lg border border-stone-200 bg-white p-3">
                  <div className="font-semibold text-stone-900">{example.word}</div>
                  <div className="text-sm text-emerald-700">{example.english}</div>
                  {example.emphasis && (
                    <div className="mt-1 text-xs text-stone-600">Syllables: {example.emphasis}</div>
                  )}
                  {example.spanish && (
                    <div className="mt-1 text-xs text-amber-700">Spanish: {example.spanish}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-stone-900">Pronunciation rules</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {PRONUNCIATION_RULES.map((rule) => (
            <div key={rule.title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <h4 className="mb-2 font-semibold text-stone-900">{rule.title}</h4>
              <p className="mb-3 text-sm text-stone-700">{rule.description}</p>
              <div className="space-y-1">
                {rule.examples.map((example, exIdx) => (
                  <div key={exIdx} className="text-sm text-emerald-700">
                    • {example}
                  </div>
                ))}
              </div>
              {rule.spanish && (
                <p className="mt-3 rounded border-l-2 border-amber-500 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  <strong>Desde el español:</strong> {rule.spanish}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h4 className="mb-2 font-semibold text-stone-900">How to practise</h4>
        <ul className="space-y-2 text-sm text-stone-700">
          <li>• Say each example aloud; the spelling is mostly predictable.</li>
          <li>• Start from the Spanish vowels a, e, i, o, u; keep them short and clean.</li>
          <li>• The Tagalog r is a flap, like the single r in Spanish pero.</li>
          <li>• Practise the ng sound at the start of a syllable without adding a g.</li>
          <li>• Listen for stress and the glottal stop; they can change the meaning.</li>
          <li>• If you also speak English, avoid English long-vowel glides.</li>
          <li>• Learn loanword spellings as vocabulary, not as exceptions to a rule.</li>
        </ul>
      </div>
    </div>
  );
};
