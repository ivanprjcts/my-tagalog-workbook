import type { Exercise, Lesson, Quiz } from './schema';
import { courseSchema, type Course } from './schema';

export interface ContentProblem {
  path: string;
  message: string;
}

export interface ValidationResult {
  course: Course | null;
  problems: ContentProblem[];
}

function add(problems: ContentProblem[], path: string, message: string) {
  problems.push({ path, message });
}

function checkUnique(problems: ContentProblem[], path: string, values: string[], label: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      add(problems, path, `Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function validateExercise(exercise: Exercise, path: string, problems: ContentProblem[]) {
  switch (exercise.type) {
    case 'mcq': {
      const optionIds = exercise.options.map((option) => option.id);
      checkUnique(problems, `${path}.options`, optionIds, 'option id');
      if (!optionIds.includes(exercise.correctOptionId)) {
        add(problems, path, `correctOptionId "${exercise.correctOptionId}" is not one of the options`);
      }
      break;
    }
    case 'multi-select': {
      const optionIds = exercise.options.map((option) => option.id);
      checkUnique(problems, `${path}.options`, optionIds, 'option id');
      for (const id of exercise.correctOptionIds) {
        if (!optionIds.includes(id)) {
          add(problems, path, `correctOptionId "${id}" is not one of the options`);
        }
      }
      const correctSet = new Set(exercise.correctOptionIds);
      if (correctSet.size !== exercise.correctOptionIds.length) {
        add(problems, path, 'correctOptionIds contains duplicates');
      }
      if (correctSet.size === optionIds.length) {
        add(problems, path, 'every option is correct; use a different exercise type or add distractors');
      }
      break;
    }
    case 'fill-blank': {
      if (!/_{3,}/.test(exercise.text)) {
        add(problems, path, 'fill-blank text must contain a blank such as ___');
      }
      for (const answer of exercise.answers) {
        if (answer.trim().length === 0) add(problems, path, 'answer cannot be empty');
      }
      break;
    }
    case 'word-bank': {
      const available = new Map<string, number>();
      for (const word of exercise.words) {
        available.set(word, (available.get(word) ?? 0) + 1);
      }
      for (const word of exercise.answer) {
        const remaining = available.get(word) ?? 0;
        if (remaining === 0) {
          add(problems, path, `answer token "${word}" is not available in words`);
        } else {
          available.set(word, remaining - 1);
        }
      }
      for (const alternative of exercise.alternatives ?? []) {
        for (const word of alternative) {
          if (!exercise.words.includes(word)) {
            add(problems, path, `alternative token "${word}" is not available in words`);
          }
        }
      }
      break;
    }
    case 'matching': {
      checkUnique(problems, `${path}.pairs`, exercise.pairs.map((pair) => pair.left), 'left item');
      checkUnique(problems, `${path}.pairs`, exercise.pairs.map((pair) => pair.right), 'right item');
      break;
    }
    case 'ordering': {
      checkUnique(problems, `${path}.items`, exercise.items, 'item');
      break;
    }
    case 'translation': {
      for (const answer of exercise.answers) {
        if (answer.trim().length === 0) add(problems, path, 'translation answer cannot be empty');
      }
      break;
    }
    case 'listening': {
      const optionIds = exercise.options.map((option) => option.id);
      checkUnique(problems, `${path}.options`, optionIds, 'option id');
      if (!optionIds.includes(exercise.correctOptionId)) {
        add(problems, path, `correctOptionId "${exercise.correctOptionId}" is not one of the options`);
      }
      break;
    }
    case 'dictation':
    case 'error-correction':
    case 'conjugation': {
      for (const answer of exercise.answers) {
        if (answer.trim().length === 0) add(problems, path, 'answer cannot be empty');
      }
      break;
    }
    case 'categorization': {
      checkUnique(problems, `${path}.categories`, exercise.categories.map((category) => category.id), 'category id');
      const categoryIds = new Set(exercise.categories.map((category) => category.id));
      checkUnique(problems, `${path}.items`, exercise.items.map((item) => item.id), 'item id');
      for (const item of exercise.items) {
        if (!categoryIds.has(item.categoryId)) {
          add(problems, path, `item "${item.id}" points at unknown category "${item.categoryId}"`);
        }
      }
      break;
    }
  }
}

function validateQuiz(quiz: Quiz, path: string, problems: ContentProblem[]) {
  checkUnique(problems, `${path}.questions`, quiz.questions.map((question) => question.id), 'question id');
  quiz.questions.forEach((question, index) => {
    validateExercise(question, `${path}.questions[${index}]`, problems);
  });
  if (quiz.passScore !== undefined && (quiz.passScore < 0 || quiz.passScore > 100)) {
    add(problems, path, 'passScore must be between 0 and 100');
  }
}

function validateLesson(lesson: Lesson, path: string, problems: ContentProblem[]) {
  if (lesson.sections.length === 0) add(problems, path, 'lesson must have at least one section');
  checkUnique(problems, `${path}.vocabulary`, lesson.vocabulary.map((entry) => entry.id), 'vocabulary id');
  checkUnique(problems, `${path}.exercises`, lesson.exercises.map((exercise) => exercise.id), 'exercise id');

  lesson.exercises.forEach((exercise, index) => {
    validateExercise(exercise, `${path}.exercises[${index}]`, problems);
  });

  validateQuiz(lesson.check, `${path}.check`, problems);

  if (lesson.flashcards) {
    checkUnique(problems, `${path}.flashcards`, lesson.flashcards.map((card) => card.id), 'flashcard id');
  }

  if (lesson.status === 'published') {
    if (lesson.objectives.length < 1) add(problems, path, 'published lesson needs at least one objective');
    if (lesson.canDo.length < 1) add(problems, path, 'published lesson needs at least one can-do statement');
    if (lesson.vocabulary.length < 8) add(problems, path, 'published lesson needs at least 8 vocabulary items');
    if (lesson.exercises.length < 6) add(problems, path, 'published lesson needs at least 6 exercises');
    if (lesson.check.questions.length < 4) add(problems, path, 'published lesson needs at least 4 check questions');
    if (!lesson.exercises.some((exercise) => (exercise.tags ?? []).includes('listening'))) {
      add(problems, path, 'published lesson needs at least one listening exercise');
    }
    if (
      !lesson.exercises.some((exercise) =>
        ['fill-blank', 'word-bank', 'translation', 'dictation', 'error-correction', 'conjugation'].includes(
          exercise.type,
        ),
      )
    ) {
      add(problems, path, 'published lesson needs at least one production exercise');
    }
    if (!lesson.sections.some((section) => section.type === 'callout')) {
      add(problems, path, 'published lesson needs at least one callout');
    }
  }
}

export function validateCourse(input: unknown): ValidationResult {
  const parsed = courseSchema.safeParse(input);
  if (!parsed.success) {
    return {
      course: null,
      problems: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.') || '(root)',
        message: issue.message,
      })),
    };
  }

  const course = parsed.data;
  const problems: ContentProblem[] = [];

  checkUnique(problems, 'course.units', course.units.map((unit) => unit.id), 'unit id');

  const lessonIds: string[] = [];
  const lessonSlugs: string[] = [];
  const lessonCheckIds: string[] = [];

  course.units.forEach((unit, unitIndex) => {
    const unitPath = `course.units[${unitIndex}]`;
    if (unit.order !== unitIndex + 1) {
      add(problems, unitPath, `unit order should be ${unitIndex + 1}, got ${unit.order}`);
    }
    checkUnique(problems, `${unitPath}.lessons`, unit.lessons.map((lesson) => lesson.id), 'lesson id');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const lessonPath = `${unitPath}.lessons[${lessonIndex}]`;
      if (lesson.unitId !== unit.id) {
        add(problems, lessonPath, `lesson unitId "${lesson.unitId}" does not match parent unit "${unit.id}"`);
      }
      if (lesson.order !== lessonIndex + 1) {
        add(problems, lessonPath, `lesson order should be ${lessonIndex + 1}, got ${lesson.order}`);
      }
      if (lesson.level !== unit.level) {
        add(problems, lessonPath, `lesson level ${lesson.level} does not match unit level ${unit.level}`);
      }
      lessonIds.push(lesson.id);
      lessonSlugs.push(`${lesson.unitId}/${lesson.slug}`);
      lessonCheckIds.push(lesson.check.id);
      validateLesson(lesson, lessonPath, problems);
    });
  });

  checkUnique(problems, 'course', lessonIds, 'lesson id');
  checkUnique(problems, 'course', lessonSlugs, 'lesson route');
  checkUnique(problems, 'course', lessonCheckIds, 'lesson check id');

  return { course, problems };
}

export function formatProblems(problems: ContentProblem[]): string {
  return problems.map((problem) => `- ${problem.path}: ${problem.message}`).join('\n');
}
