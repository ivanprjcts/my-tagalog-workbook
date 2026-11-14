import type { Unit } from '../../schema';
import { lesson01Markers } from './lesson-01-markers';
import { lesson02PersonalMarkers } from './lesson-02-personal-markers';
import { lesson03Demonstratives } from './lesson-03-demonstratives';
import { lesson04Adjectives } from './lesson-04-adjectives';
import { lesson05Possession } from './lesson-05-possession';
import { lesson06Descriptions } from './lesson-06-descriptions';

export const unit2: Unit = {
  id: 'unit-2',
  title: 'People & Things',
  subtitle: 'Describe the world around you',
  description:
    'The core markers ang, ng and sa, personal names, demonstratives, adjectives, possession and family. Learn to describe people and things with confidence.',
  level: 'A1',
  order: 2,
  canDo: [
    'I can describe people, family and belongings.',
    'I can use ang/ng/sa and si/ni/kay correctly.',
    'I can ask and answer simple questions about what exists and what belongs to whom.',
  ],
  lessons: [
    lesson01Markers,
    lesson02PersonalMarkers,
    lesson03Demonstratives,
    lesson04Adjectives,
    lesson05Possession,
    lesson06Descriptions,
  ],
};
