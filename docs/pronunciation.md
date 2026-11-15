# Pronunciation and IPA

Every vocabulary entry shows a phonemic IPA transcription under the Tagalog word. The same transcription appears on review cards, on the minimal-pair examples and on the alphabet example cards (for example `ama`, `mesa`, `isda`, `oras` and `ulo`).

## Conventions

| Symbol | Meaning |
|---|---|
| `/.../` | Phonemic transcription, not a narrow phonetic one |
| `ˈ` | Primary stress on the following syllable |
| `ˌ` | Secondary stress |
| `ʔ` | Meaningful glottal stop (medial or final; word-initial glottal stops are omitted) |
| `ŋ` | The `ng` sound |
| `ɾ` | The Tagalog `r` flap |
| `j` | The `y` sound |
| `ɡ` | Hard `g` |
| `a e i o u` | The five Tagalog vowels |

Word-initial glottal stops are not shown. They are predictable in Tagalog and would add visual noise without changing which word is meant. A glottal stop is written only when it is meaningful inside or at the end of a word.

In the short descriptions, the stressed syllable is written in capitals: `a-MA`, `ME-sa`, `is-DA`. The IPA also marks it with `ˈ`.

Examples:

- `ama` — `/aˈma/` (not `/ʔaˈma/`)
- `bahay` — `/ˈbahaj/`
- `mga` — `/maˈŋa/`
- `bása` — `/ˈbasa/` (read; first-syllable stress)
- `basâ` — `/baˈsaʔ/` (wet; final stress + glottal stop)
- `oo` — `/ˈoʔo/` (the medial glottal stop is kept; the initial one is omitted)
- `tubò` — `/tuˈboʔ/` (growth; final stress + glottal stop)
- `tubó` — `/tuˈbo/` (sugarcane; final stress, no glottal)

## Sources and review

The base data comes from Wiktionary/Kaikki machine-readable Tagalog entries. It was reviewed and corrected by hand where the automatic extraction picked a colloquial or wrong-sense pronunciation.

The key native-speaker correction is:

- **`bása`** (read) has first-syllable stress. The learner’s Filipino consultant confirmed this form on 15 November 2026.

Some dictionaries list a final-stress variant `basá` for “read”. The workbook follows the native-speaker form `bása`; the variant is recorded in `docs/content-sources.md`.

## Maintenance

- Add new vocabulary to `src/content/pronunciations.ts` when adding a lesson.
- Run `npm test`; the pronunciation test fails if a published vocabulary item has no IPA.
- Prefer the standard form over a colloquial variant. If a word has multiple standard pronunciations, use the one matching the part of speech and meaning taught in the lesson.
- This is a learner aid, not a full phonological analysis. Native-speaker review still matters.
