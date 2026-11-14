import { z } from 'zod';

/**
 * Typed content model for the workbook.
 *
 * Content is authored as TypeScript modules and validated at build time. The
 * schema is intentionally strict: a lesson cannot ship with a missing answer,
 * an empty dialogue or an exercise that points at a nonexistent option.
 */

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const cefrLevelSchema = z.enum(CEFR_LEVELS);
export type CefrLevel = z.infer<typeof cefrLevelSchema>;

export const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'marker',
  'numeral',
  'particle',
  'interjection',
  'phrase',
  'expression',
] as const;
export const partOfSpeechSchema = z.enum(PARTS_OF_SPEECH);
export type PartOfSpeech = z.infer<typeof partOfSpeechSchema>;

export const exerciseTagSchema = z.enum([
  'vocabulary',
  'grammar',
  'listening',
  'reading',
  'pronunciation',
  'culture',
  'review',
  'greetings',
  'politeness',
  'introductions',
  'pronouns',
  'markers',
  'people',
  'places',
  'numbers',
  'money',
  'food',
  'survival',
  'questions',
  'language',
  'adjectives',
  'possession',
  'family',
  'demonstratives',
  'existence',
  'objects',
  'animals',
]);
export type ExerciseTag = z.infer<typeof exerciseTagSchema>;

export const exampleSchema = z.object({
  tagalog: z.string().min(1),
  english: z.string().min(1),
  explanation: z.string().optional(),
});
export type Example = z.infer<typeof exampleSchema>;

export const commonMistakeSchema = z.object({
  wrong: z.string().min(1),
  right: z.string().min(1),
  explanation: z.string().min(1),
});
export type CommonMistake = z.infer<typeof commonMistakeSchema>;

const sectionBase = {
  title: z.string().optional(),
};

export const textSectionSchema = z.object({
  type: z.literal('text'),
  ...sectionBase,
  paragraphs: z.array(z.string().min(1)).min(1),
  bullets: z.array(z.string().min(1)).optional(),
});
export type TextSection = z.infer<typeof textSectionSchema>;

export const patternSectionSchema = z.object({
  type: z.literal('pattern'),
  ...sectionBase,
  title: z.string().min(1),
  pattern: z.string().optional(),
  explanation: z.string().min(1),
  examples: z.array(exampleSchema).min(1),
  commonMistake: commonMistakeSchema.optional(),
});
export type PatternSection = z.infer<typeof patternSectionSchema>;

export const dialogueLineSchema = z.object({
  speaker: z.string().min(1),
  tagalog: z.string().min(1),
  english: z.string().min(1),
  audioText: z.string().min(1).optional(),
});
export type DialogueLine = z.infer<typeof dialogueLineSchema>;

export const dialogueSectionSchema = z.object({
  type: z.literal('dialogue'),
  ...sectionBase,
  title: z.string().min(1),
  context: z.string().optional(),
  lines: z.array(dialogueLineSchema).min(2),
  comprehension: z.string().optional(),
});
export type DialogueSection = z.infer<typeof dialogueSectionSchema>;

export const calloutVariantSchema = z.enum(['tip', 'culture', 'spanish', 'mistake', 'warning']);
export type CalloutVariant = z.infer<typeof calloutVariantSchema>;

export const calloutSectionSchema = z.object({
  type: z.literal('callout'),
  ...sectionBase,
  variant: calloutVariantSchema,
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  bullets: z.array(z.string().min(1)).optional(),
});
export type CalloutSection = z.infer<typeof calloutSectionSchema>;

export const reviewSectionSchema = z.object({
  type: z.literal('review'),
  ...sectionBase,
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});
export type ReviewSection = z.infer<typeof reviewSectionSchema>;

export const lessonSectionSchema = z.discriminatedUnion('type', [
  textSectionSchema,
  patternSectionSchema,
  dialogueSectionSchema,
  calloutSectionSchema,
  reviewSectionSchema,
]);
export type LessonSection = z.infer<typeof lessonSectionSchema>;

export const vocabularyEntrySchema = z.object({
  id: z.string().min(1),
  tagalog: z.string().min(1),
  english: z.string().min(1),
  spanish: z.string().optional(),
  partOfSpeech: partOfSpeechSchema,
  example: exampleSchema.optional(),
  audioText: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
});
export type VocabularyEntry = z.infer<typeof vocabularyEntrySchema>;

const exerciseBaseShape = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  instructions: z.string().optional(),
  explanation: z.string().min(1),
  hint: z.string().optional(),
  points: z.number().positive().optional(),
  tags: z.array(exerciseTagSchema).min(1).optional(),
  spanish: z.string().optional(),
};

const exerciseBaseSchema = z.object(exerciseBaseShape);

export const mcqOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});
export type McqOption = z.infer<typeof mcqOptionSchema>;

export const mcqExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('mcq'),
  context: z.string().optional(),
  options: z.array(mcqOptionSchema).min(2),
  correctOptionId: z.string().min(1),
});
export type McqExercise = z.infer<typeof mcqExerciseSchema>;

export const multiSelectExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('multi-select'),
  context: z.string().optional(),
  options: z.array(mcqOptionSchema).min(2),
  correctOptionIds: z.array(z.string().min(1)).min(1),
});
export type MultiSelectExercise = z.infer<typeof multiSelectExerciseSchema>;

export const fillBlankExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('fill-blank'),
  text: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1),
  caseSensitive: z.boolean().optional(),
  acceptAccents: z.boolean().optional(),
});
export type FillBlankExercise = z.infer<typeof fillBlankExerciseSchema>;

export const wordBankExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('word-bank'),
  words: z.array(z.string().min(1)).min(2),
  answer: z.array(z.string().min(1)).min(1),
  alternatives: z.array(z.array(z.string().min(1)).min(1)).optional(),
});
export type WordBankExercise = z.infer<typeof wordBankExerciseSchema>;

export const matchingPairSchema = z.object({
  left: z.string().min(1),
  right: z.string().min(1),
});
export type MatchingPair = z.infer<typeof matchingPairSchema>;

export const matchingExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('matching'),
  pairs: z.array(matchingPairSchema).min(2),
});
export type MatchingExercise = z.infer<typeof matchingExerciseSchema>;

export const orderingExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('ordering'),
  items: z.array(z.string().min(1)).min(2),
  instructions: z.string().optional(),
});
export type OrderingExercise = z.infer<typeof orderingExerciseSchema>;

export const translationExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('translation'),
  source: z.string().min(1),
  sourceLanguage: z.enum(['en', 'es']),
  answers: z.array(z.string().min(1)).min(1),
  keywords: z.array(z.array(z.string().min(1)).min(1)).optional(),
});
export type TranslationExercise = z.infer<typeof translationExerciseSchema>;

export const listeningExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('listening'),
  audioText: z.string().min(1),
  context: z.string().optional(),
  options: z.array(mcqOptionSchema).min(2),
  correctOptionId: z.string().min(1),
  maxReplays: z.number().int().positive().optional(),
});
export type ListeningExercise = z.infer<typeof listeningExerciseSchema>;

export const dictationExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('dictation'),
  audioText: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1),
  acceptAccents: z.boolean().optional(),
});
export type DictationExercise = z.infer<typeof dictationExerciseSchema>;

export const errorCorrectionExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('error-correction'),
  incorrect: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1),
});
export type ErrorCorrectionExercise = z.infer<typeof errorCorrectionExerciseSchema>;

export const categorizationCategorySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});
export type CategorizationCategory = z.infer<typeof categorizationCategorySchema>;

export const categorizationItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  categoryId: z.string().min(1),
});
export type CategorizationItem = z.infer<typeof categorizationItemSchema>;

export const categorizationExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('categorization'),
  categories: z.array(categorizationCategorySchema).min(2),
  items: z.array(categorizationItemSchema).min(2),
});
export type CategorizationExercise = z.infer<typeof categorizationExerciseSchema>;

export const conjugationExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal('conjugation'),
  verb: z.string().min(1),
  focus: z.enum(['actor', 'object']),
  aspect: z.enum(['completed', 'incomplete', 'contemplated']),
  answers: z.array(z.string().min(1)).min(1),
});
export type ConjugationExercise = z.infer<typeof conjugationExerciseSchema>;

export const exerciseSchema = z.discriminatedUnion('type', [
  mcqExerciseSchema,
  multiSelectExerciseSchema,
  fillBlankExerciseSchema,
  wordBankExerciseSchema,
  matchingExerciseSchema,
  orderingExerciseSchema,
  translationExerciseSchema,
  listeningExerciseSchema,
  dictationExerciseSchema,
  errorCorrectionExerciseSchema,
  categorizationExerciseSchema,
  conjugationExerciseSchema,
]);
export type Exercise = z.infer<typeof exerciseSchema>;

export const quizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  passScore: z.number().min(0).max(100).optional(),
  questions: z.array(exerciseSchema).min(1),
  tags: z.array(exerciseTagSchema).optional(),
});
export type Quiz = z.infer<typeof quizSchema>;

export const flashcardSchema = z.object({
  id: z.string().min(1),
  front: z.string().min(1),
  back: z.string().min(1),
  hint: z.string().optional(),
  tags: z.array(z.string().min(1)).optional(),
});
export type Flashcard = z.infer<typeof flashcardSchema>;

export const lessonStatusSchema = z.enum(['draft', 'review', 'published']);
export type LessonStatus = z.infer<typeof lessonStatusSchema>;

export const lessonSchema = z.object({
  id: z.string().min(1),
  unitId: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  level: cefrLevelSchema,
  order: z.number().int().positive(),
  estimatedMinutes: z.number().int().positive(),
  objectives: z.array(z.string().min(1)).min(1),
  canDo: z.array(z.string().min(1)).min(1),
  sections: z.array(lessonSectionSchema).min(1),
  vocabulary: z.array(vocabularyEntrySchema).min(1),
  exercises: z.array(exerciseSchema).min(1),
  check: quizSchema,
  flashcards: z.array(flashcardSchema).optional(),
  sources: z.array(z.string().min(1)).optional(),
  status: lessonStatusSchema.optional(),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const unitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  level: cefrLevelSchema,
  order: z.number().int().positive(),
  canDo: z.array(z.string().min(1)).min(1),
  lessons: z.array(lessonSchema).min(1),
});
export type Unit = z.infer<typeof unitSchema>;

export const courseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  level: cefrLevelSchema,
  units: z.array(unitSchema).min(1),
});
export type Course = z.infer<typeof courseSchema>;
