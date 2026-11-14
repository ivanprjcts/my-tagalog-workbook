import { A1_COURSE } from '../src/content/a1';
import { formatProblems, validateCourse } from '../src/content/validate';

const { course, problems } = validateCourse(A1_COURSE);

if (problems.length > 0 || !course) {
  console.error('Content check failed:\n');
  console.error(formatProblems(problems));
  process.exit(1);
}

const lessons = course.units.flatMap((unit) => unit.lessons);
const published = lessons.filter((lesson) => lesson.status === 'published');
const exercises = lessons.reduce((total, lesson) => total + lesson.exercises.length, 0);
const checkQuestions = lessons.reduce((total, lesson) => total + lesson.check.questions.length, 0);
const vocabulary = lessons.reduce((total, lesson) => total + lesson.vocabulary.length, 0);

console.log('Content check passed.');
console.log(`Units: ${course.units.length}`);
console.log(`Lessons: ${lessons.length} (${published.length} published)`);
console.log(`Exercises: ${exercises}`);
console.log(`Check questions: ${checkQuestions}`);
console.log(`Vocabulary items: ${vocabulary}`);
