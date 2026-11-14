export type OutlineStatus = 'available' | 'in-progress' | 'planned';

export interface OutlineUnit {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  status: OutlineStatus;
  lessonTitles: string[];
}

/**
 * The public A1 path. Unit 1 is authored first; the rest is visible so the
 * learner can see the route without being promised content that does not exist.
 */
export const A1_OUTLINE: OutlineUnit[] = [
  {
    id: 'unit-1',
    order: 1,
    title: 'Sounds & Survival',
    subtitle: 'Your first Tagalog conversations',
    description:
      'Sounds and spelling, greetings, introductions, pronouns, numbers and the phrases that keep a conversation going.',
    status: 'available',
    lessonTitles: [
      'Sounds and spelling',
      'Greetings and politeness',
      'Names and introductions',
      'People and pronouns',
      'Numbers and money',
      'Survival phrases and review',
    ],
  },
  {
    id: 'unit-2',
    order: 2,
    title: 'People & Things',
    subtitle: 'Describe the world around you',
    description:
      'The core markers ang, ng and sa, personal names, demonstratives, adjectives, possession and family.',
    status: 'planned',
    lessonTitles: [
      'Ang, ng, sa',
      'Si, ni, kay',
      'Ito, iyan, iyon',
      'Adjectives and the linker',
      'Possession',
      'Descriptions and family',
    ],
  },
  {
    id: 'unit-3',
    order: 3,
    title: 'Food & Market',
    subtitle: 'Eat, shop and ask prices',
    description:
      'Food, actor-focus verbs and aspects, a first look at object focus, ordering, quantities and market conversations.',
    status: 'planned',
    lessonTitles: [
      'Food and meals',
      'Actor-focus verbs',
      'Object focus intro',
      'Gusto, ayaw, kailangan, puwede',
      'Ordering and shopping',
      'Food culture and review',
    ],
  },
  {
    id: 'unit-4',
    order: 4,
    title: 'Daily Life & Time',
    subtitle: 'Talk about your day',
    description:
      'Time, dates, daily routines, frequency, hobbies, abilities and the weather.',
    status: 'planned',
    lessonTitles: [
      'Time',
      'Days, months, dates',
      'Daily routine',
      'Frequency and adverbs',
      'Hobbies and abilities',
      'Weather and review',
    ],
  },
  {
    id: 'unit-5',
    order: 5,
    title: 'Getting Around',
    subtitle: 'Travel and ask for help',
    description:
      'Places, directions, transport, emergencies, invitations and plans.',
    status: 'planned',
    lessonTitles: [
      'Places and location',
      'Directions and imperatives',
      'Transport and tickets',
      'Help and emergencies',
      'Invitations and plans',
      'Review',
    ],
  },
  {
    id: 'unit-6',
    order: 6,
    title: 'A1 Checkpoint & Culture',
    subtitle: 'Put it all together',
    description:
      'A grammar map, reading and listening practice, speaking and writing tasks, culture and a mock exam.',
    status: 'planned',
    lessonTitles: [
      'Grammar map',
      'Reading',
      'Listening',
      'Speaking and writing',
      'Culture and politeness',
      'Review and mock exam',
    ],
  },
];
