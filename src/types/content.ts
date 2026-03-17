/**
 * Content Type Definitions
 * 
 * Core types for all language learning content including units, lessons,
 * vocabulary, and grammar rules.
 */

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type VerbFocus = 'actor' | 'object' | 'location' | 'beneficiary';

export type GrammarCategory = 'pronouns' | 'markers' | 'verbs' | 'adjectives' | 'sentence-structure';

/**
 * Unit represents a collection of related lessons
 */
export interface Unit {
  id: string;
  title: string;
  description: string;
  level: DifficultyLevel;
  order: number;
}

/**
 * Lesson represents a single learning module within a unit
 */
export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  level: DifficultyLevel;
  order: number;
  content?: string;
  keyTakeaways?: string[];
}

/**
 * Vocabulary entry for word/phrase learning
 */
export interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction';
  level: DifficultyLevel;
  example?: string;
  exampleEnglish?: string;
  audioUrl?: string;
  relatedWords?: string[];
}

/**
 * Grammar rule with examples and explanations
 */
export interface GrammarRule {
  id: string;
  title: string;
  category: GrammarCategory;
  level: DifficultyLevel;
  explanation: string;
  examples: GrammarExample[];
  relatedRules?: string[];
}

/**
 * Example sentence for grammar rules
 */
export interface GrammarExample {
  tagalog: string;
  english: string;
  explanation?: string;
}

/**
 * Flashcard data structure
 */
export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  category: 'vocabulary' | 'grammar' | 'verbs' | 'phrases';
  cards: Flashcard[];
}

/**
 * Individual flashcard
 */
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  level?: DifficultyLevel;
  hint?: string;
  audioUrl?: string;
}

/**
 * Phoneme for alphabet and pronunciation
 */
export interface Phoneme {
  letter: string;
  uppercase: string;
  lowercase: string;
  pronunciation: string;
  ipa: string; // International Phonetic Alphabet
  examples: PronunciationExample[];
  notes?: string;
}

/**
 * Example word demonstrating a phoneme
 */
export interface PronunciationExample {
  word: string;
  english: string;
  emphasis?: string; // Which part emphasizes the sound
}
