import type { Unit } from '../../schema';
import { lesson01SoundsAndSpelling } from './lesson-01-sounds';
import { lesson02Greetings } from './lesson-02-greetings';
import { lesson03Introductions } from './lesson-03-introductions';
import { lesson04Pronouns } from './lesson-04-pronouns';
import { lesson05Numbers } from './lesson-05-numbers';
import { lesson06Survival } from './lesson-06-survival';

export const unit1: Unit = {
  id: 'unit-1',
  title: 'Sounds & Survival',
  subtitle: 'Your first Tagalog conversations',
  description:
    'Learn how Tagalog sounds, greet people politely, introduce yourself, count and ask for help. This unit gives you the survival toolkit for your first conversations.',
  level: 'A1',
  order: 1,
  canDo: [
    'I can greet someone politely and introduce myself.',
    'I can read common Tagalog words aloud with the right vowels and the ng sound.',
    'I can count, ask prices and ask someone to repeat or slow down.',
  ],
  lessons: [
    lesson01SoundsAndSpelling,
    lesson02Greetings,
    lesson03Introductions,
    lesson04Pronouns,
    lesson05Numbers,
    lesson06Survival,
  ],
};
