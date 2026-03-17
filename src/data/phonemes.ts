import { Phoneme } from '@/types/content';

/**
 * Tagalog Alphabet & Phonemes
 * 
 * The Tagalog alphabet consists of 28 letters:
 * - 26 letters from the English alphabet (A-Z)
 * - 2 additional letters: Ñ and Ng (treated as single letters)
 */
export const PHONEMES: Phoneme[] = [
  {
    letter: 'A',
    uppercase: 'A',
    lowercase: 'a',
    pronunciation: 'ah',
    ipa: '/a/',
    examples: [
      { word: 'ama', english: 'father', emphasis: 'a-ma' },
      { word: 'araw', english: 'day', emphasis: 'a-raw' },
      { word: 'anak', english: 'child', emphasis: 'a-nak' },
    ],
    notes: 'Always pronounced as the "a" in "father", never like the "a" in "cat".',
  },
  {
    letter: 'B',
    uppercase: 'B',
    lowercase: 'b',
    pronunciation: 'beh',
    ipa: '/b/',
    examples: [
      { word: 'bahay', english: 'house', emphasis: 'ba-hay' },
      { word: 'baligtad', english: 'opposite', emphasis: 'ba-lig-tad' },
      { word: 'bata', english: 'child', emphasis: 'ba-ta' },
    ],
    notes: 'Pronounced like the "b" in "book".',
  },
  {
    letter: 'C',
    uppercase: 'C',
    lowercase: 'c',
    pronunciation: 'keh',
    ipa: '/k/',
    examples: [
      { word: 'corte', english: 'court', emphasis: 'cor-te' },
      { word: 'casa', english: 'house', emphasis: 'ca-sa' },
    ],
    notes: 'Always hard like "k" in "cat", never soft like "c" in "cent".',
  },
  {
    letter: 'D',
    uppercase: 'D',
    lowercase: 'd',
    pronunciation: 'deh',
    ipa: '/d/',
    examples: [
      { word: 'dalang', english: 'character', emphasis: 'da-lang' },
      { word: 'diwa', english: 'spirit', emphasis: 'di-wa' },
      { word: 'dako', english: 'place', emphasis: 'da-ko' },
    ],
    notes: 'Pronounced like the "d" in "dog".',
  },
  {
    letter: 'E',
    uppercase: 'E',
    lowercase: 'e',
    pronunciation: 'eh',
    ipa: '/ɛ/',
    examples: [
      { word: 'engel', english: 'angel', emphasis: 'en-gel' },
      { word: 'elemento', english: 'element', emphasis: 'e-le-men-to' },
    ],
    notes: 'Like "e" in "pet", not like the long "e" in "me".',
  },
  {
    letter: 'F',
    uppercase: 'F',
    lowercase: 'f',
    pronunciation: 'ef',
    ipa: '/f/',
    examples: [
      { word: 'fibra', english: 'fiber', emphasis: 'fi-bra' },
      { word: 'forma', english: 'form', emphasis: 'for-ma' },
    ],
    notes: 'Pronounced like the "f" in "fish".',
  },
  {
    letter: 'G',
    uppercase: 'G',
    lowercase: 'g',
    pronunciation: 'geh',
    ipa: '/g/',
    examples: [
      { word: 'ganda', english: 'beauty', emphasis: 'gan-da' },
      { word: 'gabi', english: 'night', emphasis: 'ga-bi' },
      { word: 'gura', english: 'teacher', emphasis: 'gu-ra' },
    ],
    notes: 'Always hard like the "g" in "go", never soft like "g" in "gym".',
  },
  {
    letter: 'H',
    uppercase: 'H',
    lowercase: 'h',
    pronunciation: 'etch',
    ipa: '/h/',
    examples: [
      { word: 'halad', english: 'offering', emphasis: 'ha-lad' },
      { word: 'hinahanap', english: 'looking for', emphasis: 'hi-na-ha-nap' },
    ],
    notes: 'Pronounced like the "h" in "hello".',
  },
  {
    letter: 'I',
    uppercase: 'I',
    lowercase: 'i',
    pronunciation: 'ee',
    ipa: '/i/',
    examples: [
      { word: 'isla', english: 'island', emphasis: 'is-la' },
      { word: 'iglesia', english: 'church', emphasis: 'ig-le-sia' },
      { word: 'imahe', english: 'image', emphasis: 'i-ma-he' },
    ],
    notes: 'Like the "i" in "machine", always short and crisp.',
  },
  {
    letter: 'J',
    uppercase: 'J',
    lowercase: 'j',
    pronunciation: 'hey',
    ipa: '/h/ or /dʒ/',
    examples: [
      { word: 'jueves', english: 'Thursday', emphasis: 'jue-ves' },
      { word: 'joya', english: 'jewelry', emphasis: 'jo-ya' },
    ],
    notes: 'In Tagalog, typically pronounced like "h" in older words, or like English "j" in newer borrowings.',
  },
  {
    letter: 'K',
    uppercase: 'K',
    lowercase: 'k',
    pronunciation: 'keh',
    ipa: '/k/',
    examples: [
      { word: 'kasal', english: 'wedding', emphasis: 'ka-sal' },
      { word: 'kailangan', english: 'need', emphasis: 'kai-lan-gan' },
      { word: 'kulay', english: 'color', emphasis: 'ku-lay' },
    ],
    notes: 'Hard sound like "k" in "kite". Used for clarity before "i" and "e" where "c" would be ambiguous.',
  },
  {
    letter: 'L',
    uppercase: 'L',
    lowercase: 'l',
    pronunciation: 'el',
    ipa: '/l/',
    examples: [
      { word: 'lamesa', english: 'table', emphasis: 'la-me-sa' },
      { word: 'lapis', english: 'pencil', emphasis: 'la-pis' },
      { word: 'ligaya', english: 'happiness', emphasis: 'li-ga-ya' },
    ],
    notes: 'Pronounced like the "l" in "light".',
  },
  {
    letter: 'M',
    uppercase: 'M',
    lowercase: 'm',
    pronunciation: 'em',
    ipa: '/m/',
    examples: [
      { word: 'mga', english: 'plural marker', emphasis: 'ma-' },
      { word: 'maliit', english: 'small', emphasis: 'ma-li-it' },
      { word: 'mahal', english: 'expensive/love', emphasis: 'ma-hal' },
    ],
    notes: 'Pronounced like the "m" in "mother".',
  },
  {
    letter: 'N',
    uppercase: 'N',
    lowercase: 'n',
    pronunciation: 'en',
    ipa: '/n/',
    examples: [
      { word: 'nanay', english: 'mother', emphasis: 'na-nay' },
      { word: 'nais', english: 'wants', emphasis: 'na-is' },
      { word: 'numero', english: 'number', emphasis: 'nu-me-ro' },
    ],
    notes: 'Pronounced like the "n" in "nose".',
  },
  {
    letter: 'Ñ',
    uppercase: 'Ñ',
    lowercase: 'ñ',
    pronunciation: 'ny-eh',
    ipa: '/ɲ/',
    examples: [
      { word: 'niño', english: 'boy', emphasis: 'ni-ño' },
      { word: 'año', english: 'year', emphasis: 'a-ño' },
      { word: 'pequeño', english: 'small', emphasis: 'pe-ke-ño' },
    ],
    notes: 'Like the "ny" in "canyon" or the "ñ" in Spanish "niño". A distinct Tagalog letter.',
  },
  {
    letter: 'Ng',
    uppercase: 'Ng',
    lowercase: 'ng',
    pronunciation: 'nang/ng',
    ipa: '/ŋ/ or /ŋg/',
    examples: [
      { word: 'nagbasa', english: 'read (past)', emphasis: 'nag-ba-sa' },
      { word: 'ang', english: 'the (nominative)', emphasis: 'ang' },
      { word: 'mga', english: 'plural', emphasis: 'ma' },
    ],
    notes: 'A single letter treated as one symbol. Pronounced like "ng" in "ring" at the end of words, or like "nang" at the beginning.',
  },
  {
    letter: 'O',
    uppercase: 'O',
    lowercase: 'o',
    pronunciation: 'oh',
    ipa: '/o/',
    examples: [
      { word: 'oma', english: 'grandmother', emphasis: 'o-ma' },
      { word: 'ouro', english: 'gold', emphasis: 'ou-ro' },
      { word: 'oras', english: 'time', emphasis: 'o-ras' },
    ],
    notes: 'Like the "o" in "go", not like the "o" in "pot".',
  },
  {
    letter: 'P',
    uppercase: 'P',
    lowercase: 'p',
    pronunciation: 'peh',
    ipa: '/p/',
    examples: [
      { word: 'pangarap', english: 'dream', emphasis: 'pan-ga-rap' },
      { word: 'pamilya', english: 'family', emphasis: 'pa-mil-ya' },
      { word: 'puwede', english: 'can', emphasis: 'pu-we-de' },
    ],
    notes: 'Pronounced like the "p" in "pen".',
  },
  {
    letter: 'Q',
    uppercase: 'Q',
    lowercase: 'q',
    pronunciation: 'kyu',
    ipa: '/k/',
    examples: [
      { word: 'kurso', english: 'course', emphasis: 'kur-so' },
    ],
    notes: 'Rarely used in Tagalog. Typically replaced with "K" or "Ku".',
  },
  {
    letter: 'R',
    uppercase: 'R',
    lowercase: 'r',
    pronunciation: 'ar',
    ipa: '/ɾ/ or /r/',
    examples: [
      { word: 'rebolusyon', english: 'revolution', emphasis: 're-bo-lu-syon' },
      { word: 'rosas', english: 'roses', emphasis: 'ro-sas' },
      { word: 'relo', english: 'watch', emphasis: 're-lo' },
    ],
    notes: 'Similar to the "r" in English, but sometimes softer like a flap.',
  },
  {
    letter: 'S',
    uppercase: 'S',
    lowercase: 's',
    pronunciation: 'es',
    ipa: '/s/',
    examples: [
      { word: 'sarili', english: 'self', emphasis: 'sa-ri-li' },
      { word: 'saya', english: 'happy', emphasis: 'sa-ya' },
      { word: 'sinabi', english: 'said', emphasis: 'si-na-bi' },
    ],
    notes: 'Pronounced like the "s" in "sun", never like "z".',
  },
  {
    letter: 'T',
    uppercase: 'T',
    lowercase: 't',
    pronunciation: 'teh',
    ipa: '/t/',
    examples: [
      { word: 'tahanan', english: 'home', emphasis: 'ta-ha-nan' },
      { word: 'tao', english: 'person', emphasis: 'ta-o' },
      { word: 'tinapakan', english: 'stepped on', emphasis: 'ti-na-pa-kan' },
    ],
    notes: 'Pronounced like the "t" in "top".',
  },
  {
    letter: 'U',
    uppercase: 'U',
    lowercase: 'u',
    pronunciation: 'oo',
    ipa: '/u/',
    examples: [
      { word: 'upahan', english: 'rent', emphasis: 'u-pa-han' },
      { word: 'umakyat', english: 'climbed', emphasis: 'u-ma-kyat' },
      { word: 'ulo', english: 'head', emphasis: 'u-lo' },
    ],
    notes: 'Like the "oo" in "food", not like "u" in "put".',
  },
  {
    letter: 'V',
    uppercase: 'V',
    lowercase: 'v',
    pronunciation: 'veh',
    ipa: '/v/',
    examples: [
      { word: 'bisita', english: 'visit', emphasis: 'bi-si-ta' },
    ],
    notes: 'Pronounced like the "v" in "victory". Rare in traditional Tagalog, used mainly in loanwords.',
  },
  {
    letter: 'W',
    uppercase: 'W',
    lowercase: 'w',
    pronunciation: 'double-yu',
    ipa: '/w/',
    examples: [
      { word: 'walang', english: 'none/no', emphasis: 'wa-lang' },
      { word: 'werkahan', english: 'workplace', emphasis: 'wer-ka-han' },
    ],
    notes: 'Pronounced like "w" in "window". Often interchangeable with vowels.',
  },
  {
    letter: 'X',
    uppercase: 'X',
    lowercase: 'x',
    pronunciation: 'eks',
    ipa: '/ks/ or /gz/',
    examples: [
      { word: 'examen', english: 'exam', emphasis: 'ex-a-men' },
    ],
    notes: 'Very rare in Tagalog. Used mainly in Spanish loanwords.',
  },
  {
    letter: 'Y',
    uppercase: 'Y',
    lowercase: 'y',
    pronunciation: 'wye',
    ipa: '/j/',
    examples: [
      { word: 'yaya', english: 'nanny', emphasis: 'ya-ya' },
      { word: 'yaman', english: 'wealth', emphasis: 'ya-man' },
      { word: 'pagsaya', english: 'happiness', emphasis: 'pag-sa-ya' },
    ],
    notes: 'Pronounced like "y" in "yes".',
  },
  {
    letter: 'Z',
    uppercase: 'Z',
    lowercase: 'z',
    pronunciation: 'zeh',
    ipa: '/z/',
    examples: [
      { word: 'zigzag', english: 'zigzag', emphasis: 'zig-zag' },
    ],
    notes: 'Pronounced like "z" in "zebra". Rare in Tagalog, mainly used in borrowed words.',
  },
];

/**
 * Tagalog Pronunciation Rules
 */
export const PRONUNCIATION_RULES = [
  {
    title: 'Stress/Accent',
    description: 'Words may have a stress mark (´) over the stressed syllable. The stressed syllable is pronounced with more emphasis.',
    examples: ['salita´ (word)', 'ka´pit (nearby)'],
  },
  {
    title: 'Vowels',
    description: 'Tagalog has 5 vowels (a, e, i, o, u), each with a consistent, pure sound.',
    examples: ['ama (father)', 'elemento (element)', 'isla (island)', 'oras (time)', 'upahan (rent)'],
  },
  {
    title: 'Consonants',
    description: 'Most consonants are pronounced similarly to English. The key is to avoid silent letters.',
    examples: ['bahay (house)', 'kulay (color)', 'rosas (roses)'],
  },
  {
    title: 'No Silent Letters',
    description: 'Unlike English, Tagalog has no silent letters. Every letter is pronounced.',
    examples: ['salita (word)', 'kasal (wedding)', 'ligaya (happiness)'],
  },
  {
    title: 'Final Consonants',
    description: 'Final consonants are pronounced fully, not dropped or softened as sometimes in English.',
    examples: ['kasal (wedding - sal is pronounced)', 'mangga (mango - ga is pronounced)'],
  },
];
