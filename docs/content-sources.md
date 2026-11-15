# Content sources and review policy

Tagalog content in this workbook must be verifiable. A plausible-sounding example is not enough. When a form cannot be verified, cut it or simplify the lesson.

## Preferred references

- **Komisyon sa Wikang Filipino (KWF)** — https://kwf.gov.ph — official ortography, grammar guidance and language policy. Use for spelling, alphabet and terminology questions.
- **Tagalog.com dictionary** — https://www.tagalog.com — dictionary entries, example sentences, audio and affix information. Use as a first practical check.
- **Wiktionary (Tagalog entries)** — https://en.wiktionary.org — etymology, loanwords and conjugation tables. Use with care; verify affix labels against a second source.
- **Omniglot — Tagalog** — https://omniglot.com/writing/tagalog.htm — alphabet history, abakada and modern Filipino alphabet.
- **A reference grammar** — e.g. Teresita V. Ramos and Maria Lourdes S. Bautista, *Handbook of Tagalog Verbs: Inflections, Modes, and Aspects*. Use for aspect and focus questions, not for copying exercises.
- **A learner dictionary** — e.g. a current Tagalog–English dictionary. Use for glosses and parts of speech.
- **Pimsleur Tagalog 1 guide** — https://d1enwirvb3djmg.cloudfront.net/Pimsleur-Guides-Booklets/Tagalog1-Bklt-MP3_9781442323445.pdf — explicit stress and glottal-stop minimal pairs. It lists a final-stress variant `basá` for “read”; a native-speaker consultation for this workbook confirmed the first-stress form `bása` used here. Use it with that caveat, and for `tubó` (sugarcane) vs `tubò` (growth).

For Spanish-influence claims, prefer named sources (etymology dictionaries, KWF materials, academic articles) over unsourced blog posts. If a claim is uncertain, mark it as a hypothesis or remove it.

## Review workflow

1. **Draft** the lesson or data change.
2. **Self-check** every Tagalog sentence:
   - Is the affix correct for the intended focus and aspect?
   - Is the pronoun form correct (`ko` vs `akin`, `ka` vs `ikaw`)?
   - Is `ng` vs `nang` correct?
   - Is the spelling standard? (`parque` → `parke`, `gura` → `guro`.)
   - Is the example natural, or is it grammatical but odd?
3. **Dictionary check** every new word and affix.
4. **Native-speaker review** for any lesson that will ship. Record reviewer, date, scope and unresolved questions.
5. **Run** `npm run content:check`.
6. **Sign off** in the table below.

## Native-speaker review log

| Date | Reviewer | Scope | Result | Notes |
|---|---|---|---|---|
| 2026-11-15 | Learner-provided native-speaker consultation | Pronunciation of `basa` | Confirmed `bása` (read) with first-syllable stress | Dictionaries may list a final-stress variant `basá`; the workbook follows the native-speaker form. |
| — | — | — | Pending | Full lesson and audio review still pending. |

## Known simplifications at A1

These are deliberate simplifications, not errors. They must be labeled as simplifications in the lesson where they appear.

- The focus system is introduced as “which noun is the topic?”. Full four-focus production is deferred to A2.
- `ang` is explained as a topic marker, not as a one-to-one definite article.
- Only common actor-focus affixes and a few object-focus fixed phrases are taught at A1.
- Aspect is explained as completed, incomplete and contemplated, not as a direct mapping of English or Spanish tenses.
- Regional variation, code-switching and formal/literary registers are acknowledged but not taught as productive skills.

## Stress and glottal-check notes

- `bása` (read/reading) has first-syllable stress and no glottal stop. `basâ` (wet) has final-syllable stress plus a final glottal stop. The native-speaker consultation for this workbook confirmed `bása`; some dictionaries list a final-stress variant `basá`. The workbook uses `bása`.
- `tubó` (sugarcane) has final stress and no glottal stop. `tubò` (growth/sprout) has final stress plus a final glottal stop.
- `báka` (cow) and `baká` (maybe) are a stress-only pair.
- `basa` is the root of the verb family (`bumasa`, `basahin`); derived forms have their own stress patterns, so do not use them to infer the citation form.

## Corrections applied in Phase 0

The following errors were found in the original prototype and corrected or removed:

- `ko`, `mo`, `niya` were labeled oblique pronouns. They are ng-form pronouns; the sa-form pronouns are `akin`, `iyo`, `kanya`, `amin`, `atin`, `inyo`, `kanila`.
- The verb tables appended pronouns to verb forms and presented them as conjugations. Tagalog verbs do not agree with person; the misleading verb data and grammar viewer were retired.
- `bibili ko` was removed; the object-focus contemplated form of `bili` is `bibilhin` (or `bibilihin`).
- `sinulat` / `sinusulat` / `susulatin` mixed paradigms. The standard object focus is `isinulat` / `isinusulat` / `isusulat`.
- The `kain` location and beneficiary tables were not valid paradigms and were removed.
- Phoneme examples such as `corte`, `casa`, `engel`, `jueves`, `joya`, `oma`, `ouro`, `gura`, `dalang` and `werkahan` were replaced with verified examples.
- “Tagalog vowels are pure and consistent — no diphthongs” was false and was removed.
- The modern 28-letter Filipino alphabet and the 20-letter abakada are now distinguished.
- `Tumatak siya sa parque` was removed; `parque` was corrected to `parke` and the example replaced.
- The full four-focus tables were removed from A1. They belong to A2.
