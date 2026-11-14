import { GrammarRule } from '@/types/content';

/**
 * A1 grammar reference.
 *
 * These rules are deliberately conservative. The full focus system belongs to
 * A2; this file only teaches the patterns used in the A1 lessons.
 */
export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'grammar-topic-markers',
    title: 'Ang, Ng and Sa: topic, non-topic and location',
    category: 'markers',
    level: 'Beginner',
    explanation:
      'Tagalog marks the role of a noun with small words, not with word endings. Ang marks the topic: the noun the sentence is about. Ng marks a non-topic object or possessor. Sa marks a location, direction or recipient. Do not translate them as “the”, “of” and “in” every time; translate the whole sentence.',
    examples: [
      {
        tagalog: 'Kumain ang lalaki ng tinapay.',
        english: 'The man ate bread.',
        explanation: 'Ang marks the topic (lalaki); ng marks the object (tinapay).',
      },
      {
        tagalog: 'Pumunta ako sa palengke.',
        english: 'I went to the market.',
        explanation: 'Sa marks the destination (palengke).',
      },
      {
        tagalog: 'Nagbigay ako ng libro sa bata.',
        english: 'I gave a book to the child.',
        explanation: 'Ng marks the object (libro); sa marks the recipient (bata).',
      },
    ],
    relatedRules: ['grammar-personal-markers', 'grammar-pronouns'],
  },
  {
    id: 'grammar-personal-markers',
    title: 'Si, Ni and Kay for people',
    category: 'markers',
    level: 'Beginner',
    explanation:
      'Use si, ni and kay with personal names, and sina, nina and kina for groups of people. Si marks the topic, ni marks a non-topic actor or possessor, and kay marks a location or recipient who is a person.',
    examples: [
      {
        tagalog: 'Si Ana ang guro.',
        english: 'Ana is the teacher.',
        explanation: 'Si marks Ana as the topic.',
      },
      {
        tagalog: 'Binili ni Ana ang libro.',
        english: 'Ana bought the book.',
        explanation: 'Ni marks Ana as the non-topic actor; ang libro is the topic.',
      },
      {
        tagalog: 'Pumunta kami kay Lola.',
        english: 'We went to Grandma’s place.',
        explanation: 'Kay marks a person as the destination.',
      },
      {
        tagalog: 'Kumain sina Ana at Ben.',
        english: 'Ana and Ben ate.',
        explanation: 'Sina marks a group of people as the topic.',
      },
    ],
    relatedRules: ['grammar-topic-markers'],
  },
  {
    id: 'grammar-pronouns',
    title: 'Three pronoun sets',
    category: 'pronouns',
    level: 'Beginner',
    explanation:
      'Tagalog pronouns change form depending on their job. The ang-form is used for the topic: ako, ikaw/ka, siya, kami, tayo, kayo, sila. The ng-form is used for possessors and non-topic actors: ko, mo, niya, namin, natin, ninyo, nila. The sa-form is used after sa and other prepositions: akin, iyo, kanya, amin, atin, inyo, kanila. Ikaw is used before ay or as a topic; ka is used after the predicate. Kami excludes the listener; tayo includes the listener.',
    examples: [
      {
        tagalog: 'Ako ay Pilipino.',
        english: 'I am Filipino.',
        explanation: 'Ako is the ang-form topic.',
      },
      {
        tagalog: 'Kumain ako ng kanin.',
        english: 'I ate rice.',
        explanation: 'Ako is still the topic; the verb comes first.',
      },
      {
        tagalog: 'Kinain ko ang kanin.',
        english: 'I ate the rice.',
        explanation: 'The rice is the topic; ko is the ng-form actor.',
      },
      {
        tagalog: 'Ibigay mo ito sa akin.',
        english: 'Give this to me.',
        explanation: 'Akin is the sa-form after sa.',
      },
      {
        tagalog: 'Ang libro ko.',
        english: 'My book.',
        explanation: 'Ko marks the possessor.',
      },
      {
        tagalog: 'Kumain ka na ba?',
        english: 'Have you eaten?',
        explanation: 'Ka is the form used after the predicate.',
      },
    ],
    relatedRules: ['grammar-topic-markers', 'grammar-gusto'],
  },
  {
    id: 'grammar-sentence-order',
    title: 'Predicate first, not subject first',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'A neutral Tagalog sentence usually starts with the predicate, then the topic. English often does the opposite. The particle ay can move the topic to the front, but it is more formal and less common in everyday speech. There is often no word for “is” or “are”.',
    examples: [
      {
        tagalog: 'Maganda ang bahay.',
        english: 'The house is beautiful.',
        explanation: 'Predicate (maganda) first; topic (ang bahay) second.',
      },
      {
        tagalog: 'Ang bahay ay maganda.',
        english: 'The house is beautiful.',
        explanation: 'Ay-inversion; more formal, useful in writing.',
      },
      {
        tagalog: 'Guro siya.',
        english: 'He/She is a teacher.',
        explanation: 'No copula is needed.',
      },
      {
        tagalog: 'Hindi maganda ang bahay.',
        english: 'The house is not beautiful.',
        explanation: 'Hindi comes before the predicate.',
      },
    ],
    relatedRules: ['grammar-topic-markers'],
  },
  {
    id: 'grammar-aspect',
    title: 'Aspect, not tense',
    category: 'verbs',
    level: 'Beginner',
    explanation:
      'Tagalog verbs show aspect: whether an action is completed, incomplete (ongoing or habitual), or contemplated (not yet started). Time words and context tell you whether to translate it as past, present or future. Learn the three forms together, not as a translation of English tenses.',
    examples: [
      {
        tagalog: 'Kumain ako ng tinapay.',
        english: 'I ate bread.',
        explanation: 'Completed aspect: the action is finished.',
      },
      {
        tagalog: 'Kumakain ako ng tinapay.',
        english: 'I am eating bread. / I eat bread.',
        explanation: 'Incomplete aspect: ongoing or habitual.',
      },
      {
        tagalog: 'Kakain ako ng tinapay.',
        english: 'I will eat bread.',
        explanation: 'Contemplated aspect: not yet started.',
      },
      {
        tagalog: 'Kumakain ako ng tinapay araw-araw.',
        english: 'I eat bread every day.',
        explanation: 'The incomplete form can describe a habit.',
      },
    ],
    relatedRules: ['grammar-object-focus-preview'],
  },
  {
    id: 'grammar-object-focus-preview',
    title: 'Object focus: a first look',
    category: 'verbs',
    level: 'Beginner',
    explanation:
      'When the object is the topic, the verb changes and the actor moves to the ng-form. At A1, learn a few high-frequency object-focus phrases as whole patterns. You do not need the full four-focus system yet.',
    examples: [
      {
        tagalog: 'Kinain ko ang tinapay.',
        english: 'I ate the bread.',
        explanation: 'The bread is the topic; ko is the ng-form actor.',
      },
      {
        tagalog: 'Binili ko ang libro.',
        english: 'I bought the book.',
        explanation: 'The book is the topic; binili is the object-focus form.',
      },
      {
        tagalog: 'Ginawa ko ang proyekto.',
        english: 'I did the project.',
        explanation: 'A common fixed phrase; learn it as a pattern.',
      },
    ],
    relatedRules: ['grammar-aspect', 'grammar-pronouns'],
  },
  {
    id: 'grammar-linker',
    title: 'The linker na and -ng',
    category: 'adjectives',
    level: 'Beginner',
    explanation:
      'When an adjective or a number comes before a noun, link them with na or -ng. If the first word ends in a vowel, add -ng. If it ends in a consonant, use na. This is one of the most common patterns in Tagalog.',
    examples: [
      {
        tagalog: 'magandang bahay',
        english: 'beautiful house',
        explanation: 'Maganda ends in a vowel, so add -ng.',
      },
      {
        tagalog: 'mabait na bata',
        english: 'kind child',
        explanation: 'Mabait ends in a consonant, so use na.',
      },
      {
        tagalog: 'malaking aso',
        english: 'big dog',
        explanation: 'Malaki ends in a vowel, so add -ng.',
      },
      {
        tagalog: 'tatlong piso',
        english: 'three pesos',
        explanation: 'Tatlo ends in a vowel, so add -ng.',
      },
    ],
  },
  {
    id: 'grammar-questions',
    title: 'Question words and ba',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'Question words usually come first: ano (what), sino (who), saan (where), kailan (when), bakit (why), paano (how), ilan (how many) and alin (which). For a yes/no question, use ba after the predicate or first word. The rest of the sentence follows the normal predicate-first order.',
    examples: [
      {
        tagalog: 'Ano ang pangalan mo?',
        english: 'What is your name?',
        explanation: 'Ano first; the topic is ang pangalan mo.',
      },
      {
        tagalog: 'Saan ka nakatira?',
        english: 'Where do you live?',
        explanation: 'Saan first; ka is the topic pronoun.',
      },
      {
        tagalog: 'Kumain ka ba?',
        english: 'Did you eat?',
        explanation: 'Ba marks a yes/no question.',
      },
      {
        tagalog: 'May kape ba?',
        english: 'Is there coffee?',
        explanation: 'Ba comes after the predicate may kape.',
      },
      {
        tagalog: 'Ilan ang kapatid mo?',
        english: 'How many siblings do you have?',
        explanation: 'Ilan asks for a number.',
      },
    ],
    relatedRules: ['grammar-may-wala'],
  },
  {
    id: 'grammar-may-wala',
    title: 'May, mayroon and wala',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'May says that something exists or is available. Mayroon is the standalone or more formal form. Wala says that something does not exist or is not there. With wala, the person who lacks something is in the ng-form: wala akong pera, not wala ako pera.',
    examples: [
      {
        tagalog: 'May kape ba?',
        english: 'Is there coffee?',
        explanation: 'May + noun.',
      },
      {
        tagalog: 'Mayroon ba kayong tubig?',
        english: 'Do you have water?',
        explanation: 'Mayroon can stand alone; kayong is the ng-form of kayo.',
      },
      {
        tagalog: 'Wala akong pera.',
        english: 'I have no money.',
        explanation: 'Wala + ng-form pronoun akong.',
      },
      {
        tagalog: 'Wala siya sa bahay.',
        english: 'He/She is not at home.',
        explanation: 'Wala + topic + location.',
      },
    ],
    relatedRules: ['grammar-questions', 'grammar-pronouns'],
  },
  {
    id: 'grammar-politeness',
    title: 'Po, opo and kayo',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'Politeness is part of Tagalog grammar. Use po in polite sentences, opo for a polite “yes”, and kayo for an elder, a stranger or a person in authority, even when you mean one person. Use ikaw or ka with peers, friends and children. These are not optional decorations; they signal respect.',
    examples: [
      {
        tagalog: 'Kumusta po kayo?',
        english: 'How are you? (polite)',
        explanation: 'Po and kayo make the question respectful.',
      },
      {
        tagalog: 'Mabuti naman po.',
        english: 'I am fine, thank you. (polite)',
        explanation: 'Po softens the answer.',
      },
      {
        tagalog: 'Opo.',
        english: 'Yes. (polite)',
        explanation: 'Opo is the polite form of oo.',
      },
      {
        tagalog: 'Salamat po.',
        english: 'Thank you. (polite)',
        explanation: 'Po is common in thanks.',
      },
    ],
  },
  {
    id: 'grammar-enclitics',
    title: 'Small words: na, pa, lang, din and ba',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'Tagalog uses short particles after the first word of the predicate. Na means “already” or “now”; pa means “still” or “more”; lang means “only” or “just”; din/rin means “also”; ba marks a question. At A1, learn common combinations as phrases rather than trying to master the full ordering rules.',
    examples: [
      {
        tagalog: 'Kumain na ako.',
        english: 'I already ate.',
        explanation: 'Na = already.',
      },
      {
        tagalog: 'Kumain pa ako.',
        english: 'I ate more.',
        explanation: 'Pa = still/more.',
      },
      {
        tagalog: 'Kumain lang ako.',
        english: 'I just ate.',
        explanation: 'Lang = only/just.',
      },
      {
        tagalog: 'Kumain din ako.',
        english: 'I ate too.',
        explanation: 'Din = also; rin after a vowel.',
      },
    ],
  },
  {
    id: 'grammar-gusto',
    title: 'Gusto, ayaw, kailangan and puwede',
    category: 'verbs',
    level: 'Beginner',
    explanation:
      'These words express wants, dislikes, needs and permission. The person who wants or needs something is in the ng-form: gusto ko, not gusto ako. Follow the word with ng + noun, or with the linker + verb. Puwede is a modal: puwede ba akong…? means “may I…?”.',
    examples: [
      {
        tagalog: 'Gusto ko ng kape.',
        english: 'I want coffee.',
        explanation: 'Gusto + ko + ng + noun.',
      },
      {
        tagalog: 'Gusto kong kumain.',
        english: 'I want to eat.',
        explanation: 'Gusto + ko + linker -ng + verb.',
      },
      {
        tagalog: 'Ayaw ko ng asukal.',
        english: 'I do not want sugar.',
        explanation: 'Ayaw is the negative counterpart of gusto.',
      },
      {
        tagalog: 'Kailangan ko ng tulong.',
        english: 'I need help.',
        explanation: 'Kailangan + ko + ng + noun.',
      },
      {
        tagalog: 'Puwede ba akong umupo?',
        english: 'May I sit down?',
        explanation: 'Puwede ba + ang-form pronoun + linker + verb.',
      },
    ],
    relatedRules: ['grammar-pronouns', 'grammar-linker'],
  },
  {
    id: 'grammar-numbers',
    title: 'Native and Spanish-derived numbers',
    category: 'sentence-structure',
    level: 'Beginner',
    explanation:
      'Tagalog has native numbers and a set of Spanish-derived numbers. Native numbers are common for counting and quantities. Spanish-derived numbers are common for time, prices and dates. Learn both sets, and use the linker when a number comes before a noun.',
    examples: [
      {
        tagalog: 'isa, dalawa, tatlo, apat, lima',
        english: 'one, two, three, four, five',
        explanation: 'Native numbers.',
      },
      {
        tagalog: 'uno, dos, tres, kuwatro, singko',
        english: 'one, two, three, four, five',
        explanation: 'Spanish-derived numbers, common in time and prices.',
      },
      {
        tagalog: 'Tatlong piso.',
        english: 'Three pesos.',
        explanation: 'Tatlo + linker -ng before the noun.',
      },
      {
        tagalog: 'Alas-dos na.',
        english: 'It is two o’clock.',
        explanation: 'A Spanish-derived time expression.',
      },
    ],
    relatedRules: ['grammar-linker'],
  },
];
