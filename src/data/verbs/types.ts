/**
 * Tagalog Verb Focus Data Model
 * 
 * Comprehensive system for Tagalog verbs with support for:
 * - Four main verb focuses: actor, object, location, beneficiary
 * - Three aspects: completed, incomplete, contemplated
 * - Complete conjugation patterns
 * - Example sentences for each focus
 */

import { VerbFocus } from '@/types/content';

export type VerbAspect = 'completed' | 'incomplete' | 'contemplated';

/**
 * Conjugation patterns for a specific focus and aspect
 */
export interface VerbConjugationPattern {
  firstSingular: string;    // ako
  secondSingular: string;   // ikaw
  thirdSingular: string;    // siya
  firstPluralInclusive: string;  // tayo (includes listener)
  firstPluralExclusive: string;  // kami (excludes listener)
  secondPlural: string;     // kayo
  thirdPlural: string;      // sila
}

/**
 * Example sentence showing verb in context
 */
export interface VerbExample {
  tagalog: string;
  english: string;
  focus: VerbFocus;
  aspect: VerbAspect;
}

/**
 * Complete Tagalog verb with all conjugations and examples
 */
export interface TagalogVerb {
  id: string;
  root: string;                    // e.g., "kain"
  englishMeaning: string;          // e.g., "eat"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  
  // Conjugations organized by focus, then aspect
  conjugations: {
    actor: {
      completed: VerbConjugationPattern;
      incomplete: VerbConjugationPattern;
      contemplated: VerbConjugationPattern;
    };
    object: {
      completed: VerbConjugationPattern;
      incomplete: VerbConjugationPattern;
      contemplated: VerbConjugationPattern;
    };
    location: {
      completed: VerbConjugationPattern;
      incomplete: VerbConjugationPattern;
      contemplated: VerbConjugationPattern;
    };
    beneficiary: {
      completed: VerbConjugationPattern;
      incomplete: VerbConjugationPattern;
      contemplated: VerbConjugationPattern;
    };
  };

  examples: VerbExample[];
  
  // Additional context
  transitivity: 'transitive' | 'intransitive';
  commonFocus: VerbFocus;  // Most naturally used focus
  notes?: string;
}

/**
 * Helper type for conjugation queries
 */
export interface ConjugationQuery {
  verbRoot: string;
  focus: VerbFocus;
  aspect: VerbAspect;
  person: 'firstSingular' | 'secondSingular' | 'thirdSingular' | 
          'firstPluralInclusive' | 'firstPluralExclusive' | 'secondPlural' | 'thirdPlural';
}
