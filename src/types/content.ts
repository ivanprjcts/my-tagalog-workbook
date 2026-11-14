/**
 * Types for the legacy reference data (alphabet and grammar).
 *
 * Lesson content uses the richer schema in src/content/schema.ts.
 */

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type GrammarCategory = 'pronouns' | 'markers' | 'verbs' | 'adjectives' | 'sentence-structure';

export interface GrammarRule {
  id: string;
  title: string;
  category: GrammarCategory;
  level: DifficultyLevel;
  explanation: string;
  examples: GrammarExample[];
  relatedRules?: string[];
}

export interface GrammarExample {
  tagalog: string;
  english: string;
  explanation?: string;
}

export type LetterUsage = 'native' | 'common' | 'loanword' | 'rare';

export interface Phoneme {
  letter: string;
  uppercase: string;
  lowercase: string;
  pronunciation: string;
  ipa: string; // International Phonetic Alphabet
  usage: LetterUsage;
  examples: PronunciationExample[];
  notes?: string;
}

export interface PronunciationExample {
  word: string;
  english: string;
  emphasis?: string; // Which part emphasizes the sound
  spanish?: string; // Optional Spanish cognate or contrast
}

export interface PronunciationRule {
  title: string;
  description: string;
  examples: string[];
  spanish?: string;
}
