/**
 * Small helpers for the learner-facing IPA.
 *
 * Word-initial glottal stops are deliberately omitted in the displayed IPA;
 * meaningful medial and final glottal stops are kept.
 */

const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

/**
 * Return a human stress label for a single-word phonemic transcription.
 * Phrases return null because counting syllables across word boundaries is
 * misleading for a beginner.
 */
export function getStressLabel(ipa?: string): string | null {
  if (!ipa || ipa.includes(' ')) return null;
  const marker = ipa.indexOf('ˈ');
  if (marker === -1) return null;

  const beforeStress = ipa.slice(0, marker);
  const vowelCount = (beforeStress.match(/[aeiou]/g) ?? []).length;
  return `${ORDINALS[vowelCount] ?? `${vowelCount + 1}th`} syllable`;
}
