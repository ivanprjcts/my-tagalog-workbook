import { GrammarRule } from '@/types/content';

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'grammar-markers',
    title: 'Sentence Markers: Ang, Ng, Sa',
    category: 'markers',
    level: 'Beginner',
    explanation:
      'Tagalog uses three main markers to indicate the function of nouns in sentences. "Ang" marks the nominative case (subject or object of certain verbs), "ng" marks the genitive case (possessive or object of transitive verbs), and "sa" marks the oblique case (location, direction, or beneficiary).',
    examples: [
      {
        tagalog: 'Ang lalaki ay kumain ng tinapay.',
        english: 'The man ate bread.',
        explanation:
          '"Ang" marks the subject (lalaki), "ng" marks the object (tinapay)',
      },
      {
        tagalog: 'Sa bahay niya, kumain kami.',
        english: 'At his/her house, we ate.',
        explanation: '"Sa" marks the location (bahay)',
      },
      {
        tagalog: 'Ang aking libro ay sa mesa.',
        english: 'My book is on the table.',
        explanation: '"Ang" marks the subject (libro), "sa" marks the location (mesa)',
      },
    ],
  },
  {
    id: 'grammar-pronouns',
    title: 'Tagalog Pronouns',
    category: 'pronouns',
    level: 'Beginner',
    explanation:
      'Tagalog pronouns change based on their function in the sentence. The nominative pronouns (ako, ikaw, siya, kami, tayo, kayo, sila) are used as subjects with "ang", while oblique forms (ko, mo, niya, namin, natin, ninyo, nila) function as objects or possessives with "ng".',
    examples: [
      {
        tagalog: 'Ako ay bumili ng libro.',
        english: 'I bought a book.',
        explanation: '"Ako" is the nominative form used as the subject',
      },
      {
        tagalog: 'Binili ko ang libro.',
        english: 'I bought the book.',
        explanation:
          '"Ko" is the oblique form of "ako" used as the agent with "ng"',
      },
      {
        tagalog: 'Siya ay aking kaibigan.',
        english: 'He/She is my friend.',
        explanation:
          '"Siya" is nominative, "aking" (from ako + possessive marker) shows possession',
      },
    ],
  },
  {
    id: 'grammar-actor-focus',
    title: 'Actor Focus (Nominative Verbs)',
    category: 'verbs',
    level: 'Intermediate',
    explanation:
      'Actor focus places the emphasis on the person performing the action. The actor becomes the subject (marked with "ang") and the verb shows the action through affixes and prefixes. This is the most commonly used focus in Tagalog.',
    examples: [
      {
        tagalog: 'Kumain ang lalaki ng tinapay.',
        english: 'The man ate bread.',
        explanation:
          '"Kumain" (from "kain" + actor focus prefix "k-um-") emphasizes the man as the agent',
      },
      {
        tagalog: 'Bumili kami ng mga libro.',
        english: 'We bought books.',
        explanation:
          '"Bumili" (from "bili" + actor focus prefix "b-um-") shows we performed the action',
      },
    ],
  },
  {
    id: 'grammar-object-focus',
    title: 'Object Focus (Accusative Verbs)',
    category: 'verbs',
    level: 'Intermediate',
    explanation:
      'Object focus emphasizes the person/thing receiving the action. The object becomes the subject (marked with "ang") and the verb shows the object-oriented action through different affixes. This is used when the object is the topic of discussion.',
    examples: [
      {
        tagalog: 'Kinain ng lalaki ang tinapay.',
        english: 'The bread was eaten by the man.',
        explanation:
          '"Kinain" (from "kain" + object focus infix "-in-") emphasizes the bread as what was eaten',
      },
      {
        tagalog: 'Binili namin ang mga libro.',
        english: 'The books were bought by us.',
        explanation:
          '"Binili" (from "bili" + object focus infix "-in-") emphasizes the books as what was bought',
      },
    ],
  },
  {
    id: 'grammar-present-incomplete',
    title: 'Present Tense / Incomplete Aspect',
    category: 'verbs',
    level: 'Beginner',
    explanation:
      'The incomplete aspect in Tagalog represents ongoing, habitual, or future actions. It is typically formed using the prefix "nag-", "mag-", or through reduplication depending on the verb type and focus.',
    examples: [
      {
        tagalog: 'Kumakain siya ng tinapay ngayon.',
        english: 'He/She is eating bread now.',
        explanation: 'Reduplication of "ka-" shows the incomplete/ongoing action',
      },
      {
        tagalog: 'Bumibili kami ng mga libro.',
        english: 'We buy books. (habitually)',
        explanation: 'Reduplication shows habitual action',
      },
    ],
  },
  {
    id: 'grammar-past-completed',
    title: 'Past Tense / Completed Aspect',
    category: 'verbs',
    level: 'Beginner',
    explanation:
      'The completed aspect represents finished actions. It is typically formed by inserting the infix "-in-" or using the prefix "na-" depending on the verb type and focus.',
    examples: [
      {
        tagalog: 'Kumain siya ng tinapay.',
        english: 'He/She ate bread.',
        explanation: 'No vowel doubling indicates completed action',
      },
      {
        tagalog: 'Nabili namin ang mga libro.',
        english: 'We bought the books.',
        explanation: 'The prefix "na-" indicates completed object focus action',
      },
    ],
  },
];
