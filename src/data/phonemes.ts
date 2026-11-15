import { Phoneme, PronunciationRule } from '@/types/content';

/**
 * The modern Filipino alphabet has 28 letters: the 26 Latin letters plus Ñ and
 * Ng. The older abakada has 20 letters: a b k d e g h i l m n ng o p r s t u w y.
 *
 * Several letters are used mainly in Spanish or English loanwords and proper
 * nouns. The `usage` field makes that visible instead of pretending every
 * letter is equally common in native Tagalog.
 */
export const PHONEMES: Phoneme[] = [
  {
    letter: 'A',
    uppercase: 'A',
    lowercase: 'a',
    pronunciation: 'ah',
    ipa: '/a/',
    usage: 'native',
    examples: [
      { word: 'ama', english: 'father', emphasis: 'a-ma' },
      { word: 'araw', english: 'day / sun', emphasis: 'a-raw' },
      { word: 'anak', english: 'child', emphasis: 'a-nak' },
    ],
    notes:
      'Like the a in Spanish casa or English father. Never like the a in English cat.',
  },
  {
    letter: 'B',
    uppercase: 'B',
    lowercase: 'b',
    pronunciation: 'b',
    ipa: '/b/',
    usage: 'native',
    examples: [
      { word: 'bahay', english: 'house', emphasis: 'ba-hay' },
      { word: 'bata', english: 'child', emphasis: 'ba-ta' },
      { word: 'buhay', english: 'life', emphasis: 'bu-hay' },
    ],
    notes: 'Like the b in Spanish bien or English book. No aspiration is needed.',
  },
  {
    letter: 'C',
    uppercase: 'C',
    lowercase: 'c',
    pronunciation: 'k or s',
    ipa: '/k/ or /s/',
    usage: 'loanword',
    examples: [
      { word: 'Cebu', english: 'Cebu (place name)', emphasis: 'se-bu' },
      { word: 'cellphone', english: 'cellphone (English loan)', emphasis: 'sel-pon' },
      { word: 'camera', english: 'camera (English loan)', emphasis: 'ka-me-ra' },
    ],
    notes:
      'Not used in native Tagalog; native /k/ is written K. In Spanish loans, C is usually /k/ before a, o, u (casa) and /s/ before e, i (centro); English loans vary. Do not use Spanish spellings like casa or corte as native Tagalog examples.',
  },
  {
    letter: 'D',
    uppercase: 'D',
    lowercase: 'd',
    pronunciation: 'd',
    ipa: '/d/',
    usage: 'native',
    examples: [
      { word: 'dagat', english: 'sea', emphasis: 'da-gat' },
      { word: 'dalawa', english: 'two', emphasis: 'da-la-wa' },
      { word: 'dakila', english: 'great / noble', emphasis: 'da-ki-la' },
    ],
    notes: 'Like the d in Spanish dedo or English dog, but softer between vowels.',
  },
  {
    letter: 'E',
    uppercase: 'E',
    lowercase: 'e',
    pronunciation: 'eh',
    ipa: '/ɛ/ or /e/',
    usage: 'common',
    examples: [
      { word: 'eroplano', english: 'airplane (Spanish loan)', emphasis: 'e-ro-pla-no', spanish: 'eroplano' },
      { word: 'elepante', english: 'elephant (Spanish loan)', emphasis: 'e-le-pan-te', spanish: 'elefante' },
      { word: 'eskwela', english: 'school (Spanish loan)', emphasis: 'es-kwe-la', spanish: 'escuela' },
    ],
    notes:
      'Like the e in Spanish mesa, without the long English ee. Many E words are Spanish loans; the sound is still native Tagalog.',
  },
  {
    letter: 'F',
    uppercase: 'F',
    lowercase: 'f',
    pronunciation: 'f',
    ipa: '/f/',
    usage: 'loanword',
    examples: [
      { word: 'Filipinas', english: 'Philippines', emphasis: 'fi-li-pi-nas' },
      { word: 'Filipino', english: 'Filipino', emphasis: 'fi-li-pi-no' },
      { word: 'fiesta', english: 'fiesta / festival (Spanish loan)', emphasis: 'fyes-ta', spanish: 'fiesta' },
    ],
    notes:
      'Mainly in proper nouns and loans. Spanish f is the same sound; older native words often use P where Spanish had F.',
  },
  {
    letter: 'G',
    uppercase: 'G',
    lowercase: 'g',
    pronunciation: 'g',
    ipa: '/ɡ/',
    usage: 'native',
    examples: [
      { word: 'gabi', english: 'night', emphasis: 'ga-bi' },
      { word: 'gulay', english: 'vegetable', emphasis: 'gu-lay' },
      { word: 'ganda', english: 'beauty', emphasis: 'gan-da' },
    ],
    notes: 'Always hard, like the g in Spanish gato or English go. Never soft as in gym.',
  },
  {
    letter: 'H',
    uppercase: 'H',
    lowercase: 'h',
    pronunciation: 'h',
    ipa: '/h/',
    usage: 'native',
    examples: [
      { word: 'halaman', english: 'plant', emphasis: 'ha-la-man' },
      { word: 'hangin', english: 'wind / air', emphasis: 'ha-ngin' },
      { word: 'hapon', english: 'afternoon / Japanese', emphasis: 'ha-pon' },
    ],
    notes:
      'A light /h/, not the raspy Spanish j. English hello is a close comparison. Many Spanish j loans became Tagalog h (Jueves → Huwebes).',
  },
  {
    letter: 'I',
    uppercase: 'I',
    lowercase: 'i',
    pronunciation: 'ee',
    ipa: '/i/',
    usage: 'native',
    examples: [
      { word: 'isda', english: 'fish', emphasis: 'is-da' },
      { word: 'ilog', english: 'river', emphasis: 'i-log' },
      { word: 'itlog', english: 'egg', emphasis: 'it-log' },
    ],
    notes: 'Like the i in Spanish sí or English machine, but shorter and crisper.',
  },
  {
    letter: 'J',
    uppercase: 'J',
    lowercase: 'j',
    pronunciation: 'j or h',
    ipa: '/dʒ/ or /h/',
    usage: 'loanword',
    examples: [
      { word: 'jeep', english: 'jeep (English loan)', emphasis: 'dyip' },
      { word: 'jazz', english: 'jazz (English loan)', emphasis: 'dyas' },
      { word: 'juice', english: 'juice (English loan)', emphasis: 'dyus' },
    ],
    notes:
      'Not native. Spanish j is /x/ and did not pass into Tagalog as /x/; older Spanish j loans became H (Jueves → Huwebes). English loans usually use /dʒ/. Do not use jueves or joya as Tagalog examples.',
  },
  {
    letter: 'K',
    uppercase: 'K',
    lowercase: 'k',
    pronunciation: 'k',
    ipa: '/k/',
    usage: 'native',
    examples: [
      { word: 'kain', english: 'eat', emphasis: 'ka-in' },
      { word: 'kape', english: 'coffee (Spanish loan)', emphasis: 'ka-pe', spanish: 'café' },
      { word: 'kulay', english: 'color', emphasis: 'ku-lay' },
    ],
    notes: 'Hard k, like Spanish casa or English kite. The default spelling for the /k/ sound.',
  },
  {
    letter: 'L',
    uppercase: 'L',
    lowercase: 'l',
    pronunciation: 'l',
    ipa: '/l/',
    usage: 'native',
    examples: [
      { word: 'lapis', english: 'pencil', emphasis: 'la-pis' },
      { word: 'lupa', english: 'land / earth', emphasis: 'lu-pa' },
      { word: 'ligaya', english: 'happiness', emphasis: 'li-ga-ya' },
    ],
    notes: 'Like the l in Spanish luna or English light.',
  },
  {
    letter: 'M',
    uppercase: 'M',
    lowercase: 'm',
    pronunciation: 'm',
    ipa: '/m/',
    usage: 'native',
    examples: [
      { word: 'mata', english: 'eye', emphasis: 'ma-ta' },
      { word: 'manok', english: 'chicken', emphasis: 'ma-nok' },
      { word: 'maliit', english: 'small', emphasis: 'ma-li-it' },
    ],
    notes: 'Like the m in Spanish mano or English mother.',
  },
  {
    letter: 'N',
    uppercase: 'N',
    lowercase: 'n',
    pronunciation: 'n',
    ipa: '/n/',
    usage: 'native',
    examples: [
      { word: 'nanay', english: 'mother', emphasis: 'na-nay' },
      { word: 'niyog', english: 'coconut', emphasis: 'ni-yog' },
      { word: 'nawawala', english: 'lost / missing', emphasis: 'na-wa-wa-la' },
    ],
    notes: 'Like the n in Spanish nada or English nose.',
  },
  {
    letter: 'Ñ',
    uppercase: 'Ñ',
    lowercase: 'ñ',
    pronunciation: 'ny',
    ipa: '/ɲ/',
    usage: 'loanword',
    examples: [
      { word: 'niño', english: 'child / Christ child (Spanish loan)', emphasis: 'ni-nyo', spanish: 'niño' },
      { word: 'España', english: 'Spain', emphasis: 'es-pa-nya', spanish: 'España' },
      { word: 'señorita', english: 'miss (Spanish loan)', emphasis: 'se-nyo-ri-ta', spanish: 'señorita' },
    ],
    notes:
      'The same sound as Spanish ñ in niño. English canyon is a close comparison. Appears mainly in Spanish loans and proper nouns; native Tagalog uses the ny sequence.',
  },
  {
    letter: 'Ng',
    uppercase: 'Ng',
    lowercase: 'ng',
    pronunciation: 'ng',
    ipa: '/ŋ/',
    usage: 'native',
    examples: [
      { word: 'ng', english: 'marker for objects and possessors', emphasis: 'ng' },
      { word: 'ngayon', english: 'now / today', emphasis: 'nga-yon' },
      { word: 'ngiti', english: 'smile', emphasis: 'ngi-ti' },
    ],
    notes:
      'A single letter and a single sound, /ŋ/. Spanish has this sound before g in tengo. At the start of a syllable there is no hard g. The common word mga is pronounced ma-nga, not ma-ga.',
  },
  {
    letter: 'O',
    uppercase: 'O',
    lowercase: 'o',
    pronunciation: 'oh',
    ipa: '/o/',
    usage: 'native',
    examples: [
      { word: 'oras', english: 'time / hour (Spanish loan)', emphasis: 'o-ras', spanish: 'horas' },
      { word: 'oo', english: 'yes', emphasis: 'o-o' },
      { word: 'totoo', english: 'true', emphasis: 'to-to-o' },
    ],
    notes: 'Like the o in Spanish no or English go, but shorter and without a glide.',
  },
  {
    letter: 'P',
    uppercase: 'P',
    lowercase: 'p',
    pronunciation: 'p',
    ipa: '/p/',
    usage: 'native',
    examples: [
      { word: 'pusa', english: 'cat', emphasis: 'pu-sa' },
      { word: 'pagkain', english: 'food', emphasis: 'pag-ka-in' },
      { word: 'parke', english: 'park (Spanish loan)', emphasis: 'par-ke', spanish: 'parque' },
    ],
    notes: 'Like the p in Spanish perro or English pen, with little aspiration.',
  },
  {
    letter: 'Q',
    uppercase: 'Q',
    lowercase: 'q',
    pronunciation: 'k',
    ipa: '/k/',
    usage: 'rare',
    examples: [
      { word: 'Quezon', english: 'Quezon (place name)', emphasis: 'ke-son' },
      { word: 'quiz', english: 'quiz (English loan)', emphasis: 'kwiz' },
      { word: 'quota', english: 'quota (English loan)', emphasis: 'kwo-ta' },
    ],
    notes:
      'Rare. Native Tagalog writes /k/ with K. Spanish que and qui use the same /k/ sound; English quiz and quota are loans. Q appears mainly in proper nouns and recent loans.',
  },
  {
    letter: 'R',
    uppercase: 'R',
    lowercase: 'r',
    pronunciation: 'r (flap)',
    ipa: '/ɾ/',
    usage: 'native',
    examples: [
      { word: 'rosas', english: 'roses (Spanish loan)', emphasis: 'ro-sas', spanish: 'rosas' },
      { word: 'marami', english: 'many / much', emphasis: 'ma-ra-mi' },
      { word: 'rin', english: 'also (variant of din)', emphasis: 'rin' },
    ],
    notes:
      'A flap, like the single r in Spanish pero or the tt in American English butter. Not the English r.',
  },
  {
    letter: 'S',
    uppercase: 'S',
    lowercase: 's',
    pronunciation: 's',
    ipa: '/s/',
    usage: 'native',
    examples: [
      { word: 'saging', english: 'banana', emphasis: 'sa-ging' },
      { word: 'simbahan', english: 'church', emphasis: 'sim-ba-han' },
      { word: 'susi', english: 'key', emphasis: 'su-si' },
    ],
    notes: 'Always like the s in Spanish sol or English sun, never like z.',
  },
  {
    letter: 'T',
    uppercase: 'T',
    lowercase: 't',
    pronunciation: 't',
    ipa: '/t/',
    usage: 'native',
    examples: [
      { word: 'tao', english: 'person', emphasis: 'ta-o' },
      { word: 'tinapay', english: 'bread', emphasis: 'ti-na-pay' },
      { word: 'tubig', english: 'water', emphasis: 'tu-big' },
    ],
    notes: 'Like the t in Spanish tomar or English top, but softer between vowels.',
  },
  {
    letter: 'U',
    uppercase: 'U',
    lowercase: 'u',
    pronunciation: 'oo',
    ipa: '/u/',
    usage: 'native',
    examples: [
      { word: 'ulo', english: 'head', emphasis: 'u-lo' },
      { word: 'upuan', english: 'chair', emphasis: 'u-pu-an' },
      { word: 'ulan', english: 'rain', emphasis: 'u-lan' },
    ],
    notes: 'Like the u in Spanish luna or the oo in English food, but shorter.',
  },
  {
    letter: 'V',
    uppercase: 'V',
    lowercase: 'v',
    pronunciation: 'v or b',
    ipa: '/v/ or /b/',
    usage: 'rare',
    examples: [
      { word: 'Vigan', english: 'Vigan (place name)', emphasis: 'vi-gan' },
      { word: 'video', english: 'video (English loan)', emphasis: 'vi-de-o' },
      { word: 'volleyball', english: 'volleyball (English loan)', emphasis: 'vol-yibol' },
    ],
    notes:
      'Rare. Spanish v is pronounced like b, and older Spanish loans often use B in Tagalog (vapor → bapor, verde → berde). Modern English loans may keep /v/.',
  },
  {
    letter: 'W',
    uppercase: 'W',
    lowercase: 'w',
    pronunciation: 'w',
    ipa: '/w/',
    usage: 'native',
    examples: [
      { word: 'wala', english: 'none / nothing', emphasis: 'wa-la' },
      { word: 'wika', english: 'language', emphasis: 'wi-ka' },
      { word: 'walang', english: 'without / no', emphasis: 'wa-lang' },
    ],
    notes: 'Like the u in Spanish hueso/agua when it glides, or the w in English water. Often appears before a or e in native words.',
  },
  {
    letter: 'X',
    uppercase: 'X',
    lowercase: 'x',
    pronunciation: 'ks',
    ipa: '/ks/',
    usage: 'rare',
    examples: [
      { word: 'Xavier', english: 'Xavier (name)', emphasis: 'ksa-vyer' },
      { word: 'taxi', english: 'taxi (English loan)', emphasis: 'tak-si' },
      { word: 'examen', english: 'exam (Spanish loan)', emphasis: 'ek-sa-men', spanish: 'examen' },
    ],
    notes:
      'Rare. Spanish x in examen and taxi is close; native Tagalog writes the ks sound with ks or k. X appears mainly in names and loans.',
  },
  {
    letter: 'Y',
    uppercase: 'Y',
    lowercase: 'y',
    pronunciation: 'y',
    ipa: '/j/',
    usage: 'native',
    examples: [
      { word: 'yelo', english: 'ice (Spanish loan)', emphasis: 'ye-lo', spanish: 'hielo' },
      { word: 'yaya', english: 'nanny / caregiver', emphasis: 'ya-ya' },
      { word: 'yaman', english: 'wealth', emphasis: 'ya-man' },
    ],
    notes: 'Like the y in Spanish yeso or English yes. It is a consonant, not a vowel.',
  },
  {
    letter: 'Z',
    uppercase: 'Z',
    lowercase: 'z',
    pronunciation: 'z or s',
    ipa: '/z/ or /s/',
    usage: 'rare',
    examples: [
      { word: 'Zamboanga', english: 'Zamboanga (place name)', emphasis: 'sam-bo-ang-ga' },
      { word: 'zebra', english: 'zebra (English loan)', emphasis: 'se-bra' },
      { word: 'zigzag', english: 'zigzag (English loan)', emphasis: 'sig-sag' },
    ],
    notes:
      'Rare. Spanish z loans often become S (zapatos → sapatos). Modern English loans may keep /z/.',
  },
];

export const PRONUNCIATION_RULES: PronunciationRule[] = [
  {
    title: 'Five vowels, close to Spanish',
    description:
      'Tagalog has ==a==, ==e==, ==i==, ==o== and ==u==. Start from the Spanish values: they are short and clear. The letters e and o have open variants in some words, but the spelling does not change.',
    examples: ['ama (father)', 'mesa (table)', 'isda (fish)', 'oras (time)', 'ulo (head)'],
    spanish: 'You already have the five vowels. Keep them short and clean; do not turn them into a glide.',
  },
  {
    title: 'Stress changes meaning',
    description:
      'Stress can fall on different syllables and change the word. Written accents are a teaching aid, not normal everyday spelling. Listen for the stressed syllable and mark it in your notes.',
    examples: ['báka (cow) vs baká (maybe)', 'bása (read) vs basâ (wet) — stress and glottal stop both change'],
    spanish: 'Spanish also uses stress, but Tagalog stress is not always written. Learn the pair, not just the accent mark.',
  },
  {
    title: 'Glottal stop',
    description:
      'A glottal stop is a catch in the throat. Spanish does not use it as a regular contrast, so it needs practice; English has it in “uh-oh”. At the end of a word it can distinguish words even when the stress is the same.',
    examples: ['tubó (sugarcane) vs tubò (growth) — same final stress, different ending', 'basâ (wet) ends with a catch'],
    spanish: 'Practise the catch separately: bása… basâ. The stress and the glottal stop both matter; do not replace the catch with a pause or an extra vowel.',
  },
  {
    title: 'The ng sound',
    description:
      'Ng is one letter and one sound, /ŋ/. Spanish has it before g in tengo. At the beginning of a word there is no hard g. The word mga is pronounced ma-nga, not ma-ga.',
    examples: ['ngayon (now)', 'ngiti (smile)', 'mga (plural marker)'],
    spanish: 'Spanish has this sound before g (tengo), but not at the start of a syllable. Practise “nga” without a g.',
  },
  {
    title: 'Diphthongs and vowel sequences',
    description:
      'Tagalog has diphthongs such as ay, aw, ey, iw, oy and uy, and adjacent vowels that belong to separate syllables. Spanish also has diphthongs; the main task is to respect Tagalog syllable boundaries. Do not force every pair into one English-style glide.',
    examples: ['bahay (house)', 'araw (day)', 'ilaw (light)', 'kulay (color)', 'tao (person: ta-o)'],
    spanish: 'Spanish speakers can use their clean vowels, but watch syllable boundaries: ta-o, not “tao” as one blob.',
  },
  {
    title: 'R is a flap',
    description:
      'The Tagalog r is a single flap, like the r in Spanish pero. The tt in American English butter is a close comparison; it is not the English r.',
    examples: ['marami (many)', 'rosas (roses)', 'rin (also)'],
    spanish: 'Use the Spanish single r, not the trilled rr unless a loanword requires it.',
  },
  {
    title: 'H is not Spanish J',
    description:
      'Tagalog h is a light /h/ (English hello is close). Spanish j is a stronger, raspier sound. Many Spanish j loans became h in Tagalog.',
    examples: ['hapon (afternoon)', 'halaman (plant)', 'Jueves → Huwebes'],
    spanish: 'Do not pronounce Tagalog h with the back-of-the-throat Spanish j.',
  },
  {
    title: 'Spelling is mostly phonemic',
    description:
      'Tagalog spelling generally matches pronunciation, and letters are normally pronounced. Loanwords can keep foreign spellings, so learn those as vocabulary rather than as exceptions to a rule.',
    examples: ['bahay (ba-hay)', 'tinapay (ti-na-pay)', 'simbahan (sim-ba-han)'],
  },
  {
    title: 'Loanword letters',
    description:
      'C, F, J, Ñ, Q, V, X and Z appear mainly in Spanish or English loans and proper nouns. Native words usually use K, P, B, S and the native vowel spellings. This is why the modern 28-letter alphabet and the older 20-letter abakada are both worth knowing.',
    examples: ['Cebu, Filipinas, jeep, España, Quezon, Vigan, Xavier, Zamboanga'],
    spanish: 'Spanish loans are everywhere, but Tagalog often nativizes them: parque → parke, zapatos → sapatos, vapor → bapor.',
  },
  {
    title: 'ng and nang are not the same word',
    description:
      'The marker ng is not the adverb/connector nang. They sound similar, but they have different jobs and spellings. Learn the phrase, not just the sound.',
    examples: ['Kumain ako ng tinapay. (ng marks the object)', 'Kumain ako nang mabilis. (nang describes how)'],
  },
];
