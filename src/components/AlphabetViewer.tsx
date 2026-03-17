'use client';

import React, { useState } from 'react';
import { PHONEMES, PRONUNCIATION_RULES } from '@/data/phonemes';

export interface AlphabetViewerProps {
  className?: string;
}

export const AlphabetViewer: React.FC<AlphabetViewerProps> = ({ className = '' }) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [showOnlyVowels, setShowOnlyVowels] = useState(false);

  const selectedPhoneme = PHONEMES.find((p) => p.uppercase === selectedLetter);
  const displayedPhonemes = showOnlyVowels
    ? PHONEMES.filter((p) => ['A', 'E', 'I', 'O', 'U'].includes(p.uppercase))
    : PHONEMES;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Alphabet Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Tagalog Alphabet (28 Letters)</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showOnlyVowels}
              onChange={(e) => setShowOnlyVowels(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            Show vowels only
          </label>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {displayedPhonemes.map((phoneme) => (
            <button
              key={phoneme.letter}
              onClick={() => setSelectedLetter(phoneme.uppercase)}
              className={`py-3 px-2 text-center rounded-lg font-semibold transition-all ${
                selectedLetter === phoneme.uppercase
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {phoneme.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Letter Details */}
      {selectedPhoneme && (
        <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          {/* Letter Display */}
          <div className="flex items-center gap-8">
            <div className="space-y-2">
              <div className="text-7xl font-bold text-blue-600">{selectedPhoneme.uppercase}</div>
              <div className="text-sm text-gray-600">Uppercase: {selectedPhoneme.uppercase}</div>
              <div className="text-sm text-gray-600">Lowercase: {selectedPhoneme.lowercase}</div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-1">Pronunciation</h4>
                <div className="text-2xl text-blue-600 font-bold">{selectedPhoneme.pronunciation}</div>
                <div className="text-sm text-gray-600 mt-1">IPA: {selectedPhoneme.ipa}</div>
              </div>

              {selectedPhoneme.notes && (
                <div className="p-3 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-800">{selectedPhoneme.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Example Words</h4>
            <div className="grid gap-3 md:grid-cols-3">
              {selectedPhoneme.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="font-semibold text-gray-900">{example.word}</div>
                  <div className="text-sm text-blue-600 font-mono">{example.english}</div>
                  {example.emphasis && (
                    <div className="text-xs text-gray-600 mt-1">Emphasis: {example.emphasis}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pronunciation Rules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pronunciation Rules</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {PRONUNCIATION_RULES.map((rule, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">{rule.title}</h4>
              <p className="text-sm text-gray-700 mb-3">{rule.description}</p>
              <div className="space-y-1">
                {rule.examples.map((example, exIdx) => (
                  <div key={exIdx} className="text-sm font-mono text-blue-600">
                    • {example}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Tips for Pronunciation</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Listen to native speakers for the most accurate pronunciation</li>
          <li>• Pay special attention to the special letters: Ñ and Ng</li>
          <li>• Tagalog vowels are pure and consistent - no diphthongs</li>
          <li>• Every letter is pronounced; there are no silent letters</li>
          <li>• Stress marks (´) indicate which syllable to emphasize</li>
        </ul>
      </div>
    </div>
  );
};
