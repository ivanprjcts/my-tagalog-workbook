import { VERBS } from './index';
import { TagalogVerb, VerbConjugationPattern, ConjugationQuery, VerbAspect } from './types';

/**
 * Get a verb by its root or ID
 */
export function getVerb(identifier: string): TagalogVerb | undefined {
  return VERBS.find(
    (v) => v.root === identifier.toLowerCase() || v.id === identifier.toLowerCase()
  );
}

/**
 * Get all verbs at a specific level
 */
export function getVerbsByLevel(level: 'Beginner' | 'Intermediate' | 'Advanced'): TagalogVerb[] {
  return VERBS.filter((v) => v.level === level);
}

/**
 * Get conjugation pattern for a specific verb, focus, and aspect
 */
export function getConjugationPattern(
  verbRoot: string,
  focus: 'actor' | 'object' | 'location' | 'beneficiary',
  aspect: VerbAspect
): VerbConjugationPattern | null {
  const verb = getVerb(verbRoot);
  if (!verb) return null;

  return verb.conjugations[focus][aspect];
}

/**
 * Get a specific conjugated form
 */
export function getConjugatedForm(query: ConjugationQuery): string | null {
  const pattern = getConjugationPattern(query.verbRoot, query.focus, query.aspect);
  if (!pattern) return null;

  return pattern[query.person] || null;
}

/**
 * Get all examples for a specific verb and focus
 */
export function getExamplesByFocus(
  verbRoot: string,
  focus: 'actor' | 'object' | 'location' | 'beneficiary'
) {
  const verb = getVerb(verbRoot);
  if (!verb) return [];

  return verb.examples.filter((ex) => ex.focus === focus);
}

/**
 * Get examples by focus and aspect
 */
export function getExamplesByFocusAndAspect(
  verbRoot: string,
  focus: 'actor' | 'object' | 'location' | 'beneficiary',
  aspect: VerbAspect
) {
  const verb = getVerb(verbRoot);
  if (!verb) return [];

  return verb.examples.filter((ex) => ex.focus === focus && ex.aspect === aspect);
}

/**
 * Format conjugation pattern as a readable table
 */
export function formatConjugationTable(
  verbRoot: string,
  focus: 'actor' | 'object' | 'location' | 'beneficiary'
) {
  const verb = getVerb(verbRoot);
  if (!verb) return null;

  return {
    verb: verb.englishMeaning,
    focus,
    completed: verb.conjugations[focus].completed,
    incomplete: verb.conjugations[focus].incomplete,
    contemplated: verb.conjugations[focus].contemplated,
  };
}

/**
 * Get explanation text for when to use each focus
 */
export function getFocusExplanation(focus: 'actor' | 'object' | 'location' | 'beneficiary'): string {
  const explanations: Record<string, string> = {
    actor: 'Actor focus emphasizes the person or thing performing the action. The actor becomes the subject (marked with "ang"). This is the most common focus in everyday conversation.',
    object: 'Object focus emphasizes the person or thing receiving the action. The object becomes the subject (marked with "ang"). Use this when the object is the main topic of discussion.',
    location: 'Location focus emphasizes the place where an action occurs. Use this when the location is the main topic. Common with verbs about living, staying, or places of activity.',
    beneficiary:
      'Beneficiary focus emphasizes the person who benefits from or is affected by the action. Use this when expressing concern for or involvement of a specific person.',
  };

  return explanations[focus] || '';
}
