import { describe, expect, it } from 'vitest';
import type {
  CategorizationExercise,
  FillBlankExercise,
  MatchingExercise,
  McqExercise,
  MultiSelectExercise,
  OrderingExercise,
  TranslationExercise,
  WordBankExercise,
} from '@/content/schema';
import { emptyAnswer, gradeExercise, isAnswerComplete, normalizeAnswer } from '../grading';

const mcq: McqExercise = {
  id: 'mcq',
  type: 'mcq',
  prompt: 'Which is a vowel?',
  options: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
  ],
  correctOptionId: 'a',
  explanation: 'A is a vowel.',
};

const fill: FillBlankExercise = {
  id: 'fill',
  type: 'fill-blank',
  prompt: 'Complete',
  text: 'The word for house is ___.',
  answers: ['bahay'],
  explanation: 'Bahay means house.',
};

const wordBank: WordBankExercise = {
  id: 'bank',
  type: 'word-bank',
  prompt: 'Build the greeting',
  words: ['Magandang', 'umaga', 'gabi'],
  answer: ['Magandang', 'umaga'],
  explanation: 'Magandang umaga means good morning.',
};

const matching: MatchingExercise = {
  id: 'matching',
  type: 'matching',
  prompt: 'Match',
  pairs: [
    { left: 'a', right: 'vowel' },
    { left: 'b', right: 'consonant' },
  ],
  explanation: 'a is a vowel; b is a consonant.',
};

const categorization: CategorizationExercise = {
  id: 'cat',
  type: 'categorization',
  prompt: 'Sort',
  categories: [
    { id: 'vowel', label: 'Vowel' },
    { id: 'consonant', label: 'Consonant' },
  ],
  items: [
    { id: 'a', text: 'a', categoryId: 'vowel' },
    { id: 'b', text: 'b', categoryId: 'consonant' },
  ],
  explanation: 'a is a vowel; b is a consonant.',
};

const translation: TranslationExercise = {
  id: 'translation',
  type: 'translation',
  prompt: 'Translate',
  source: 'The house is beautiful.',
  sourceLanguage: 'en',
  answers: ['Maganda ang bahay.'],
  keywords: [['maganda'], ['bahay']],
  explanation: 'Maganda ang bahay.',
};

const multi: MultiSelectExercise = {
  id: 'multi',
  type: 'multi-select',
  prompt: 'Select the vowels',
  options: [
    { id: 'a', text: 'a' },
    { id: 'e', text: 'e' },
    { id: 'b', text: 'b' },
  ],
  correctOptionIds: ['a', 'e'],
  explanation: 'a and e are vowels.',
};

describe('answer normalization', () => {
  it('ignores case, punctuation and extra spaces', () => {
    expect(normalizeAnswer('  MAGANDANG   UMAGA! ')).toBe('magandang umaga');
  });

  it('can ignore accents for learner input', () => {
    expect(normalizeAnswer('basâ')).toBe('basa');
  });
});

const ordering: OrderingExercise = {
  id: 'ordering',
  type: 'ordering',
  prompt: 'Put the words in order',
  items: ['Magandang', 'umaga'],
  explanation: 'Magandang umaga.',
};

describe('exercise grading', () => {
  it('grades multiple choice', () => {
    expect(gradeExercise(mcq, 'a').correct).toBe(true);
    expect(gradeExercise(mcq, 'b').correct).toBe(false);
  });

  it('grades multi-select regardless of order', () => {
    expect(gradeExercise(multi, ['e', 'a']).correct).toBe(true);
    expect(gradeExercise(multi, ['a']).correct).toBe(false);
  });

  it('grades fill-in-the-blank with punctuation and case tolerance', () => {
    expect(gradeExercise(fill, 'Bahay!').correct).toBe(true);
    expect(gradeExercise(fill, 'bahay').correct).toBe(true);
    expect(gradeExercise(fill, 'bahai').correct).toBe(false);
  });

  it('grades a word bank and its alternatives', () => {
    expect(gradeExercise(wordBank, ['Magandang', 'umaga']).correct).toBe(true);
    expect(gradeExercise(wordBank, ['umaga', 'Magandang']).correct).toBe(false);
  });

  it('starts an ordering exercise in its correct order', () => {
    expect(emptyAnswer(ordering)).toEqual(['Magandang', 'umaga']);
    expect(isAnswerComplete(ordering, emptyAnswer(ordering))).toBe(true);
    expect(gradeExercise(ordering, emptyAnswer(ordering)).correct).toBe(true);
  });

  it('gives partial credit for matching', () => {
    const half = gradeExercise(matching, { a: 'vowel' });
    expect(half.correct).toBe(false);
    expect(half.score).toBe(0.5);
  });

  it('gives partial credit for categorization', () => {
    const result = gradeExercise(categorization, { a: 'vowel', b: 'vowel' });
    expect(result.correct).toBe(false);
    expect(result.score).toBe(0.5);
  });

  it('accepts a keyword-compatible translation but flags it for review', () => {
    const result = gradeExercise(translation, 'Ang bahay ay maganda');
    expect(result.correct).toBe(true);
    expect(result.needsReview).toBe(true);
  });

  it('rejects a translation that misses a keyword group', () => {
    const result = gradeExercise(translation, 'Maganda ako');
    expect(result.correct).toBe(false);
  });
});
