import type {
  CategorizationExercise,
  DictationExercise,
  ErrorCorrectionExercise,
  Exercise,
  FillBlankExercise,
  ConjugationExercise,
  ListeningExercise,
  MatchingExercise,
  McqExercise,
  MultiSelectExercise,
  OrderingExercise,
  TranslationExercise,
  WordBankExercise,
} from '@/content/schema';

export type ExerciseAnswer =
  | string
  | string[]
  | Record<string, string>
  | null;

export interface GradeResult {
  correct: boolean;
  /** 0..1, useful for partially correct matching/categorization answers. */
  score: number;
  expected: string;
  explanation: string;
  needsReview?: boolean;
}

export interface NormalizeOptions {
  caseSensitive?: boolean;
  acceptAccents?: boolean;
  stripPunctuation?: boolean;
}

function stripDiacritics(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function normalizeAnswer(value: string, options: NormalizeOptions = {}): string {
  const { caseSensitive = false, acceptAccents = true, stripPunctuation = true } = options;
  let normalized = value.trim().replace(/\s+/g, ' ');
  if (!caseSensitive) normalized = normalized.toLowerCase();
  if (acceptAccents) normalized = stripDiacritics(normalized);
  if (stripPunctuation) {
    normalized = normalized.replace(/[.,!?;:"'“”‘’¿¡()[\]]/g, '');
  }
  return normalized.trim();
}

function sameText(actual: string, expected: string, options: NormalizeOptions = {}) {
  return normalizeAnswer(actual, options) === normalizeAnswer(expected, options);
}

function inAnswers(actual: string, answers: string[], options: NormalizeOptions = {}) {
  return answers.some((answer) => sameText(actual, answer, options));
}

function sameTokenList(actual: string[], expected: string[]) {
  if (actual.length !== expected.length) return false;
  return actual.every((token, index) => normalizeAnswer(token) === normalizeAnswer(expected[index]));
}

function optionText(options: Array<{ id: string; text: string }>, id: string) {
  return options.find((option) => option.id === id)?.text ?? id;
}

function result(
  correct: boolean,
  expected: string,
  explanation: string,
  score = correct ? 1 : 0,
  needsReview = false,
): GradeResult {
  return { correct, score, expected, explanation, needsReview };
}

export function gradeExercise(exercise: Exercise, answer: ExerciseAnswer): GradeResult {
  switch (exercise.type) {
    case 'mcq': {
      const mcq = exercise as McqExercise;
      const correct = answer === mcq.correctOptionId;
      return result(correct, optionText(mcq.options, mcq.correctOptionId), mcq.explanation);
    }
    case 'listening': {
      const listening = exercise as ListeningExercise;
      const correct = answer === listening.correctOptionId;
      return result(correct, optionText(listening.options, listening.correctOptionId), listening.explanation);
    }
    case 'multi-select': {
      const multi = exercise as MultiSelectExercise;
      const selected = Array.isArray(answer) ? answer : [];
      const expected = [...multi.correctOptionIds].sort();
      const actual = [...selected].sort();
      const correct = actual.length === expected.length && actual.every((id, index) => id === expected[index]);
      return result(
        correct,
        multi.correctOptionIds.map((id) => optionText(multi.options, id)).join(', '),
        multi.explanation,
      );
    }
    case 'fill-blank': {
      const fill = exercise as FillBlankExercise;
      const text = typeof answer === 'string' ? answer : '';
      const correct = inAnswers(text, fill.answers, {
        caseSensitive: fill.caseSensitive,
        acceptAccents: fill.acceptAccents ?? true,
      });
      return result(correct, fill.answers[0], fill.explanation);
    }
    case 'dictation': {
      const dictation = exercise as DictationExercise;
      const text = typeof answer === 'string' ? answer : '';
      const correct = inAnswers(text, dictation.answers, {
        acceptAccents: dictation.acceptAccents ?? true,
      });
      return result(correct, dictation.answers[0], dictation.explanation);
    }
    case 'word-bank': {
      const wordBank = exercise as WordBankExercise;
      const selected = Array.isArray(answer) ? answer : [];
      const alternatives = [wordBank.answer, ...(wordBank.alternatives ?? [])];
      const correct = alternatives.some((expected) => sameTokenList(selected, expected));
      return result(correct, wordBank.answer.join(' '), wordBank.explanation);
    }
    case 'ordering': {
      const ordering = exercise as OrderingExercise;
      const selected = Array.isArray(answer) ? answer : [];
      const correct = sameTokenList(selected, ordering.items);
      return result(correct, ordering.items.join(' '), ordering.explanation);
    }
    case 'matching': {
      const matching = exercise as MatchingExercise;
      const mapping = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
      const correctPairs = matching.pairs.filter((pair) => sameText(mapping[pair.left] ?? '', pair.right));
      const correct = correctPairs.length === matching.pairs.length;
      const score = matching.pairs.length > 0 ? correctPairs.length / matching.pairs.length : 0;
      const expected = matching.pairs.map((pair) => `${pair.left} → ${pair.right}`).join('; ');
      return result(correct, expected, matching.explanation, score);
    }
    case 'translation': {
      const translation = exercise as TranslationExercise;
      const text = typeof answer === 'string' ? answer : '';
      const exact = inAnswers(text, translation.answers);
      if (exact) return result(true, translation.answers[0], translation.explanation);

      const normalized = normalizeAnswer(text);
      const keywordGroups = translation.keywords ?? [];
      const keywordMatch =
        keywordGroups.length > 0 &&
        keywordGroups.every((group) => group.some((keyword) => normalized.includes(normalizeAnswer(keyword))));

      if (keywordMatch) {
        return result(
          true,
          translation.answers[0],
          `${translation.explanation}\n\nYour answer may be valid. Compare it with the model answer and check the grammar.`,
          1,
          true,
        );
      }

      return result(false, translation.answers[0], translation.explanation);
    }
    case 'error-correction': {
      const correction = exercise as ErrorCorrectionExercise;
      const text = typeof answer === 'string' ? answer : '';
      const correct = inAnswers(text, correction.answers);
      return result(correct, correction.answers[0], correction.explanation);
    }
    case 'categorization': {
      const categorization = exercise as CategorizationExercise;
      const mapping = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
      const correctItems = categorization.items.filter((item) => mapping[item.id] === item.categoryId);
      const correct = correctItems.length === categorization.items.length;
      const score = categorization.items.length > 0 ? correctItems.length / categorization.items.length : 0;
      const categoryLabel = (id: string) => categorization.categories.find((category) => category.id === id)?.label ?? id;
      const expected = categorization.items
        .map((item) => `${item.text} → ${categoryLabel(item.categoryId)}`)
        .join('; ');
      return result(correct, expected, categorization.explanation, score);
    }
    case 'conjugation': {
      const conjugation = exercise as ConjugationExercise;
      const text = typeof answer === 'string' ? answer : '';
      const correct = inAnswers(text, conjugation.answers);
      return result(correct, conjugation.answers[0], conjugation.explanation);
    }
    default:
      return result(false, '', 'This exercise type is not supported yet.');
  }
}

export function emptyAnswer(exercise: Exercise): ExerciseAnswer {
  switch (exercise.type) {
    case 'multi-select':
    case 'word-bank':
    case 'ordering':
      return [];
    case 'matching':
    case 'categorization':
      return {};
    default:
      return '';
  }
}

export function isAnswerComplete(exercise: Exercise, answer: ExerciseAnswer): boolean {
  switch (exercise.type) {
    case 'multi-select':
      return Array.isArray(answer) && answer.length > 0;
    case 'word-bank':
      return Array.isArray(answer) && answer.length > 0;
    case 'ordering':
      return Array.isArray(answer) && answer.length === exercise.items.length;
    case 'matching':
      return (
        answer !== null &&
        typeof answer === 'object' &&
        !Array.isArray(answer) &&
        exercise.pairs.every((pair) => Boolean(answer[pair.left]))
      );
    case 'categorization':
      return (
        answer !== null &&
        typeof answer === 'object' &&
        !Array.isArray(answer) &&
        exercise.items.every((item) => Boolean(answer[item.id]))
      );
    default:
      return typeof answer === 'string' && answer.trim().length > 0;
  }
}
