'use client';

import { useState } from 'react';
import { getVerb, getFocusExplanation, getExamplesByFocusAndAspect } from '@/data/verbs/utils';
import { VerbFocus } from '@/types/content';

interface GrammarViewerProps {
  verbRoot?: string;
  initialFocus?: VerbFocus;
}

type VerbAspect = 'completed' | 'incomplete' | 'contemplated';

export default function GrammarViewer({ verbRoot = 'kain', initialFocus = 'actor' }: GrammarViewerProps) {
  const [selectedFocus, setSelectedFocus] = useState<VerbFocus>(initialFocus);
  const [selectedAspect, setSelectedAspect] = useState<VerbAspect>('completed');

  const verb = getVerb(verbRoot);

  if (!verb) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Verb "{verbRoot}" not found in database.</p>
      </div>
    );
  }

  const conjugations = verb.conjugations[selectedFocus][selectedAspect];
  const focusExplanation = getFocusExplanation(selectedFocus);
  const examples = getExamplesByFocusAndAspect(verbRoot, selectedFocus, selectedAspect);

  const persons = [
    { key: 'firstSingular', label: 'I (ako)', tagalog: 'ako' },
    { key: 'secondSingular', label: 'You (ikaw)', tagalog: 'ikaw' },
    { key: 'thirdSingular', label: 'He/She (siya)', tagalog: 'siya' },
    { key: 'firstPluralInclusive', label: 'We (tayo - includes you)', tagalog: 'tayo' },
    { key: 'firstPluralExclusive', label: 'We (kami - excludes you)', tagalog: 'kami' },
    { key: 'secondPlural', label: 'You all (kayo)', tagalog: 'kayo' },
    { key: 'thirdPlural', label: 'They (sila)', tagalog: 'sila' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verb: <span className="text-blue-600">{verb.root}</span> ({verb.englishMeaning})
        </h1>
        <p className="text-gray-600">Most Common Focus: <span className="font-semibold capitalize">{verb.commonFocus}</span></p>
      </div>

      {/* Focus Selection */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Select Verb Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {(['actor', 'object', 'location', 'beneficiary'] as const).map((focus) => (
            <button
              key={focus}
              onClick={() => setSelectedFocus(focus)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFocus === focus
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="font-bold capitalize text-lg">{focus}</div>
              <div className="text-sm text-gray-600 mt-1">
                {focus === 'actor' && 'Person doing'}
                {focus === 'object' && 'Thing affected'}
                {focus === 'location' && 'Place of action'}
                {focus === 'beneficiary' && 'Person benefiting'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Focus Explanation */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-bold text-blue-900 mb-2">Focus Explanation</h3>
        <p className="text-blue-800">{focusExplanation}</p>
      </div>

      {/* Aspect Selection */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Select Aspect (Tense)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['completed', 'incomplete', 'contemplated'] as const).map((aspect) => (
            <button
              key={aspect}
              onClick={() => setSelectedAspect(aspect)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAspect === aspect
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <div className="font-bold capitalize">{aspect}</div>
              <div className="text-sm text-gray-600 mt-1">
                {aspect === 'completed' && 'Past/Already done'}
                {aspect === 'incomplete' && 'Present/Ongoing'}
                {aspect === 'contemplated' && 'Future/Will do'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conjugation Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Conjugations - {selectedFocus} Focus, {selectedAspect} Aspect
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {persons.map(({ key, label, tagalog }) => (
                <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700 w-1/2 md:w-1/3">
                    <div className="text-sm">{label}</div>
                    <div className="text-xs text-gray-500 mt-1">Tagalog: {tagalog}</div>
                  </td>
                  <td className="px-6 py-4 text-right md:text-left">
                    <span className="inline-block bg-blue-100 text-blue-900 px-4 py-2 rounded font-mono text-lg font-bold">
                      {conjugations[key]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examples Section */}
      {examples.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900">Example Sentences</h2>
          <div className="space-y-4">
            {examples.map((example, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">{example.tagalog}</p>
                <p className="text-gray-700 italic">{example.english}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Conjugations Summary */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Complete Verb Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(['actor', 'object', 'location', 'beneficiary'] as const).map((focus) => (
            <div key={focus} className="border border-gray-300 rounded p-4 bg-white">
              <h4 className="font-bold capitalize mb-3 text-gray-900">{focus} Focus</h4>
              <div className="space-y-2 text-sm">
                {(['completed', 'incomplete', 'contemplated'] as const).map((aspect) => (
                  <div key={aspect}>
                    <div className="font-semibold capitalize text-gray-700">{aspect}</div>
                    <div className="text-gray-600 font-mono text-xs ml-2">
                      {verb.conjugations[focus][aspect].firstSingular}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
