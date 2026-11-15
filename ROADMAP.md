# My Tagalog Workbook — A1 Roadmap

A static, mobile-first interactive workbook that takes a Spanish-speaking adult with English as a second language from zero to a solid A1 exit profile in Tagalog.

The work is tracked in the GitHub epic [#1](https://github.com/ivanprjcts/my-tagalog-workbook/issues/1), split into four milestones and 28 child issues.

---

## 1. Where the project stands (November 2026)

### Implemented

- **Phase 0 implementation is complete.** Repo hygiene, metadata, README, lint, type-checking, content validation, test harness, CI and the app shell are in place. Native-speaker review remains open.
- **Units 1–2 are complete.** Unit 1 (Sounds & Survival) covers sounds, greetings, introductions, pronouns, numbers and survival phrases. Unit 2 (People & Things) covers ang/ng/sa, si/ni/kay, demonstratives, may/wala, adjectives, possession and family.
- **A real learning loop.** Each lesson has objectives, a can-do statement, vocabulary with audio buttons, grammar patterns, a dialogue with a translation toggle, eight-plus exercises, a lesson check and review cards.
- **Exercise engine and UI.** Multiple choice, multi-select, matching, fill-in-the-blank, word bank, listening, dictation, categorization, ordering, translation, error correction and conjugation.
- **Progress store v2.** Versioned localStorage, migration from the old prototype key, lesson completion, best scores, time tracking, streak, export/import and reset.
- **Spaced review.** Four-grade SM-2 variant, new/due queue, session summary, persistence and tests.
- **Reference page.** Corrected alphabet and pronunciation reference, A1 grammar rules and a guide to reading the IPA.
- **Vocabulary IPA.** Phonemic transcription for every vocabulary item and alphabet example, with stress, glottal stops and the `ng` sound marked.
- **Pre-generated audio.** 429 Tagalog recordings generated for vocabulary, dialogues, examples, listening and dictation, with a browser-voice fallback. See `docs/audio.md`.
- **Quality gates.** Vitest, React Testing Library, Playwright, `content:check`, lint, typecheck, build and GitHub Actions.
- **Current content totals:** 2 units, 12 published lessons, 120 exercises, 72 check questions, 219 vocabulary items.

### Verified locally

- `npm run check` passes: lint, typecheck, 61 unit/component tests and content validation.
- `npm run test:e2e` passes: lesson practice, lesson check, persistence after reload, review scheduling, both unit quizzes and 390px overflow.
- `npm run build` generates 28 static pages, including all twelve lessons and both unit quizzes.
- A Playwright pass through the full Unit 1 lesson check records completion and survives reload.

### Remaining

- Units 3–6 and the final A1 exam.
- Unit-level quizzes with a per-tag breakdown (lesson checks are done).
- Searchable vocabulary index and phrasebook on the reference page.
- A dedicated “Tagalog for Spanish speakers” reference page (the per-lesson notes are in place).
- PWA/offline mode, full accessibility audit and native-speaker sign-off (including the generated audio).
- The final content QA pass.

### Fixed from the prototype

The Phase 0 audit corrected or removed the original content errors:

- `ko`, `mo`, `niya` were mislabeled as oblique pronouns. They are now correctly described as ng-form pronouns; the sa-form pronouns are `akin`, `iyo`, `kanya`, `amin`, `atin`, `inyo`, `kanila`.
- The misleading verb-conjugation tables and grammar viewer were retired. Tagalog verbs do not agree with person, and the old `bibili ko` / `susulatin` / `kainan` paradigms were wrong.
- The phoneme examples were replaced with verified Tagalog or clearly labeled loanwords. The false “no diphthongs” claim was removed.
- The modern 28-letter alphabet and the 20-letter abakada are now distinguished.
- The old flashcard prototype was replaced by the new review store, which fixes the card-state, stale-stats and persistence bugs.

## 2. Audience and product principles

**Audience:** one learner, Spanish L1, English L2, beginner in Tagalog. The interface and explanations are in English. Spanish is used deliberately where it helps: cognates, sound contrasts, false friends and grammar contrasts.

**Principles**

1. **One clear path.** Six units, 36 lessons, easiest to hardest. The learner always knows what to do next.
2. **Input before output.** Listen and read, then controlled practice, then free production.
3. **Small, frequent sessions.** A lesson is 20–30 minutes; review is 10 minutes; consistency beats cramming.
4. **Tagalog as Tagalog.** Do not map every Tagalog form onto an English tense or a Spanish conjugation. The focus system is introduced gradually.
5. **A1 means A1.** Full four-focus production, complex aspect distinctions and formal literary Tagalog are deferred to A2.
6. **Spanish is an advantage.** Five clean vowels, ñ and a huge shared vocabulary make the start easier; predictable interference is taught explicitly.
7. **Static and private.** No backend, no account, no analytics by default. Progress lives in the browser and can be exported/imported.
8. **Content is data.** Lessons, exercises and answers are typed and validated at build time, not hard-coded in React pages.

---

## 3. A1 exit profile

By the end of the workbook, the learner can:

1. Read the Filipino alphabet and pronounce familiar Tagalog words with the correct vowels, `ng`, stress and glottal stop.
2. Greet, take leave and use `po` / `opo` appropriately with strangers, elders and people in authority.
3. Introduce themselves and ask or answer name, origin, residence, age and nationality.
4. Use `ang` / `si` / `sina`, `ng` / `ni` / `nina` and `sa` / `kay` / `kina` to mark the topic, possessor/actor and location/recipient.
5. Use nominative, ng-form and sa-form pronouns, including `kami` vs `tayo` and `ikaw` vs `ka`.
6. Count, use numbers for prices, time and age, and ask `Magkano?`
7. Ask and answer simple questions with `ano`, `sino`, `saan`, `kailan`, `bakit`, `paano`, `ilan` and `alin`.
8. Use `may` / `wala` / `mayroon`, `ito` / `iyan` / `iyon`, the `na` / `-ng` linker and common `ma-` adjectives.
9. Use common actor-focus verbs in completed, incomplete and contemplated aspects, and recognize a small set of object-focus phrases.
10. Use `gusto`, `ayaw`, `kailangan` and `puwede` with `ng`, a linker or a verb; make polite requests.
11. Tell the time, days and dates; describe a daily routine and hobbies; talk about the weather.
12. Order food, shop, ask prices and handle simple quantities.
13. Ask for directions, use transport and ask for help in an emergency.
14. Invite someone, accept or decline, and make simple plans.
15. Understand short, slow dialogues and simple texts; write a 5–8 sentence message about a familiar topic.
16. Recognize Spanish loanwords and cognates, and avoid the most common false friends.

This is a functional A1, not an official CEFR certification.

---

## 4. Curriculum map

Six units, six lessons each, 36 lessons.

| Unit | Lessons | Core language | Main can-do |
|---|---|---|---|
| **1. Sounds & Survival** | 1. Sounds and spelling<br>2. Greetings and politeness<br>3. Names and introductions<br>4. People and pronouns<br>5. Numbers and money<br>6. Survival phrases and review | Vowels, consonants, `ng`, stress, glottal stop; greetings; `po`/`opo`; `Ako si…`; `si`/`sina`; numbers; classroom phrases | Introduce yourself, greet politely, count and survive a slow conversation |
| **2. People & Things** | 1. `ang`, `ng`, `sa`<br>2. `si`, `ni`, `kay`<br>3. `ito`/`iyan`/`iyon`, `may`/`wala`<br>4. Adjectives and linker<br>5. Possession<br>6. Descriptions and family | Core markers; personal markers; demonstratives; existence; `na`/`-ng`; possessives; family vocabulary | Describe people, family and belongings |
| **3. Food & Market** | 1. Food and meals<br>2. Actor-focus verbs and aspects<br>3. Object focus intro<br>4. `gusto`, `ayaw`, `kailangan`, `puwede`<br>5. Ordering and shopping<br>6. Food culture and review | Food vocabulary; `-um-`, `mag-`, `ma-`; completed/incomplete/contemplated; `-in`, `i-`, `-an` recognition; quantities | Order a meal, shop and ask prices |
| **4. Daily Life & Time** | 1. Time<br>2. Days, months, dates<br>3. Daily routine<br>4. Frequency and adverbs<br>5. Hobbies and abilities<br>6. Weather and review | `Anong oras na?`; `alas-dos`; days/months; routine verbs; `araw-araw`, `madalas`; `mahilig`, `marunong` | Describe a day, hobbies and the weather |
| **5. Getting Around** | 1. Places and location<br>2. Directions and imperatives<br>3. Transport and tickets<br>4. Help and emergencies<br>5. Invitations and plans<br>6. Review | `nasa`, `sa`, `may`; `kaliwa`/`kanan`/`deretso`; transport; `Tulong!`; `Tara!`; `Gusto mo bang…?` | Ask for directions, travel and make plans |
| **6. A1 Checkpoint & Culture** | 1. Grammar map<br>2. Reading<br>3. Listening<br>4. Speaking and writing<br>5. Culture and politeness<br>6. Review and mock exam | Consolidation of markers, pronouns, aspects, questions, enclitics; short texts; culture | Demonstrate A1 through a mock exam and self-assessment |

### Grammar scope

**Taught at A1**

- Predicate-first sentences and basic `ay` inversion.
- `ang` / `ang mga`, `si` / `sina`, `ng` / `ng mga`, `ni` / `nina`, `sa` / `sa mga`, `kay` / `kina`.
- Nominative, ng-form and sa-form pronouns; `ikaw` vs `ka`; `kami` vs `tayo`.
- `may`, `wala`, `mayroon`; `ito`, `iyan`, `iyon`.
- `na` / `-ng` linker; common `ma-` adjectives; `napaka-`.
- Actor-focus verbs with `-um-`, `mag-` and common `ma-` verbs; three aspects.
- A small set of object-focus forms as fixed phrases (`kinain ko`, `binili ko`, `ginawa ko`).
- `gusto`, `ayaw`, `kailangan`, `puwede` + `ng` / linker / verb.
- Question words and the particle `ba`.
- Common enclitics: `na`, `pa`, `lang`, `po`, `din`/`rin`, `daw`/`raw`.
- Simple imperatives and polite requests with `paki-`.
- Numbers, time, dates, prices and quantities.
- Connectors: `at`, `o`, `pero`, `kasi`, `dahil`.

**Deferred to A2 or later**

- Full four-focus production (object, location, beneficiary) as a system.
- Complete affix inventory and verb classes.
- Complex aspect and mood distinctions, `ipag-`, `ipa-`, causative verbs.
- Advanced enclitic ordering.
- Formal/literary Tagalog and deep register variation.
- Taglish code-switching as a productive skill.

### The focus system at A1

The focus system is the hardest part of Tagalog for most learners. At A1 it is introduced as **“which noun is the topic?”**, not as four conjugation tables:

- `Kumain ako ng tinapay.` — I ate bread. (the actor is the topic)
- `Kinain ko ang tinapay.` — I ate the bread. (the bread is the topic)

Full four-focus tables are an A2 tool. They should not appear in A1 lessons or in the A1 reference.

---

## 5. Lesson anatomy

Every lesson follows the same rhythm, so the learner always knows what comes next:

1. **Header** — unit, lesson number, estimated time, objectives, can-do statement.
2. **Warm-up** — 2–3 review questions from earlier lessons.
3. **Input** — a short explanation with positive, negative and question examples; English explanation with Spanish contrast where useful.
4. **Vocabulary** — 12–20 items with audio, English, part of speech, example and an optional Spanish cognate note.
5. **Pattern** — one grammar point or sentence pattern, with a “why” and a common mistake.
6. **Dialogue** — 6–10 lines with audio, replay, slow speed and a translation toggle.
7. **Guided practice** — 8–12 exercises across at least five types: recognition → controlled production → free production.
8. **Culture / Spanish note** — one short, specific note; no stereotypes.
9. **Can-do check** — a 5–8 question lesson check at 80% to complete.
10. **Review** — the lesson’s flashcards enter the SRS queue; the next lesson is one click away.

A lesson file contains content, not layout. The renderer decides how to display it.

---

## 6. Exercise and assessment toolkit

| Purpose | Activities |
|---|---|
| Recognition | Multiple choice, matching, true/false, categorization, listening discrimination |
| Controlled production | Fill in the blank, word-bank sentence builder, ordering, conjugation drill, error correction, dictation |
| Free production | Translation (EN→TL and ES→TL), short answer, dialogue completion, read-aloud with self-check |
| Review | SRS flashcards, cloze, mistake bank, mixed practice |
| Assessment | Lesson check, unit quiz, final exam |

**Feedback rules**

- Always show the correct answer and a short explanation.
- Show a hint after the first wrong attempt, not before.
- Accept legitimate variants; never silently accept a wrong word.
- Link the explanation to the lesson section where the point was taught.
- Translation grading cannot be fully automatic; when an answer is semantically valid but not in the key, show the model answer and let the learner self-assess.

**Assessment blueprint**

| Assessment | Length | Pass | Notes |
|---|---|---|---|
| Lesson check | 5–8 questions | 80% | Unlimited retries; gates completion |
| Unit quiz | 15–20 questions | 80% | Per-tag breakdown; unlocks after all lessons |
| Final exam | 50–60 questions | 80% | Listening, reading, grammar/vocabulary, guided production; certificate |
| SRS | 10 new cards/day, 50 reviews/day | — | 4-grade scale mapped to SM-2 |

**Mastery**

- A vocabulary card is “known” after three successful reviews with an interval of at least seven days.
- Grammar mastery is estimated from quiz items tagged with that grammar point.
- Mistakes feed a mixed review queue; the learner can always see why an item is being reviewed.

---

## 7. Spanish-speaker strategy

Spanish is an asset and a source of interference. The workbook uses it deliberately, but the core explanation stays in English.

**Advantages**

- Five vowels with stable values, close to Spanish.
- `ñ` already exists in the learner’s alphabet.
- Thousands of Spanish loanwords: `kumusta`, `pero`, `puwede`, `gusto`, `oras`, `numero`, `mesa`, `silya`, `bintana`, `kuwarto`, `kutsara`, `tinidor`, `baso`, `plato`, `karne`, `ensalada`, `asukal`, `kape`, `tsokolate`.
- Spanish-derived numbers are common for time, prices and dates: `alas-dos`, `singkuwenta`, `uno, dos, tres…`.
- The Tagalog `r` is a flap, similar to Spanish single `r`.

**Interference to teach explicitly**

- False friends: `siyempre` (of course, not “always”), `siguro` (maybe, not “sure”), `basta` (as long as/just, not “enough”), `gusto` (want/like, not “taste”).
- Spanish loans with a shifted grammatical role: `puwede` (from Spanish `puede`) behaves as a modal in Tagalog, not as a conjugated form of “he/she can”.
- Tagalog has no grammatical gender and no adjective agreement.
- There is no copula in many predicate sentences: `Maganda ang bahay` = “The house is beautiful”, not “The house is a beautiful”.
- `ang` is a topic marker, not the definite article “the”; `ng` is not “of”; `sa` is not a one-to-one “in/at/to”.
- `po` / `opo` and `kayo` for elders are not optional politeness decorations; they are part of the grammar of respect.
- Spanish `j` is not Tagalog `h`; many Spanish loans were nativized (`Jueves` → `Huwebes`, `vapor` → `bapor`).

Every unit includes at least one “Desde el español” note and one common-mistake callout. A reference page collects the contrasts.

---

## 8. Technical architecture

### Current stack

Next.js 16 App Router, React 19, TypeScript, Tailwind 4, static export, GitHub Pages.

### Target structure

```text
src/
  app/
    page.tsx                     dashboard
    units/page.tsx               curriculum
    units/[id]/page.tsx          unit overview
    units/[id]/lessons/[lessonId]/page.tsx
    review/page.tsx              SRS
    practice/page.tsx            mixed review / mistakes
    reference/page.tsx           alphabet, vocabulary, grammar, phrasebook
    progress/page.tsx            stats and settings
    exam/a1/page.tsx             final exam
  components/
    layout/                      shell, nav, breadcrumbs, footer
    lesson/                      renderer blocks
    exercises/                   exercise UI
    review/                      flashcards and session summary
    reference/                   search and index views
  content/
    a1/
      unit-01/lesson-01.ts
      ...
      index.ts
    schema.ts                    Zod schemas and TypeScript types
    validate.ts                  content:check implementation
  lib/
    exercises/                   pure grading and normalization
    srs/                         scheduling, queue, statistics
    progress/                    store, migrations, selectors
    audio/                       TTS service and fallbacks
    search/                      normalized client-side search
  types/
```

### Content

- One TypeScript module per lesson, validated at build time.
- Exercises are data, not JSX. Answer keys, accepted alternatives, hints and explanations live with the exercise.
- Reference pages, flashcard decks and quizzes are generated from lesson content; no hand-maintained duplicates.
- `content:check` validates IDs, references, answers, audio and lesson completeness.

### State

- React context plus reducer, persisted to `localStorage`.
- Versioned schema with a migration from the current prototype key.
- Export/import JSON for backup and device transfer.
- No server, no account, no sync.

### Audio

- Web Speech API with a `fil-PH` voice as the default, with a clear fallback when no Tagalog voice exists.
- Optional pre-generated MP3s for key dialogues and pronunciation examples.
- Global audio setting, replay and slow speed; no autoplay.

### Static constraints

- `output: "export"`; no API routes, server actions or runtime SSR.
- All dynamic routes use `generateStaticParams`.
- Base path comes from an environment variable, with GitHub Pages as the default.
- Client components own interactivity; content pages stay static.

### Testing and CI

- Vitest + React Testing Library for grading, SRS, progress, search and components.
- Playwright for lesson flow, persistence, review session, quiz and offline smoke tests.
- GitHub Actions: `npm ci`, lint, typecheck, unit tests, `content:check`, build, e2e smoke.
- Deploy only from `main`, after the checks pass.

---

## 9. Delivery plan

The epic is [#1](https://github.com/ivanprjcts/my-tagalog-workbook/issues/1). Each phase has a milestone.

### Phase 0 — Foundation

**Outcome:** a reliable repository, a defined A1 curriculum, a validated content model, a shared shell and a working progress store.

| Issue | Work |
|---|---|
| [#2](https://github.com/ivanprjcts/my-tagalog-workbook/issues/2) | Fix repo hygiene, metadata and baseline lint |
| [#3](https://github.com/ivanprjcts/my-tagalog-workbook/issues/3) | Define the A1 curriculum, lesson template and assessment blueprint |
| [#4](https://github.com/ivanprjcts/my-tagalog-workbook/issues/4) | Design the content schema and build-time validation |
| [#5](https://github.com/ivanprjcts/my-tagalog-workbook/issues/5) | Audit and correct existing Tagalog content |
| [#6](https://github.com/ivanprjcts/my-tagalog-workbook/issues/6) | Build the app shell, navigation and design system |
| [#7](https://github.com/ivanprjcts/my-tagalog-workbook/issues/7) | Rebuild progress persistence with a versioned store |
| [#8](https://github.com/ivanprjcts/my-tagalog-workbook/issues/8) | Add the test harness and CI quality gates |

**Status:** implementation complete. Native-speaker sign-off in #5 remains open.

**Exit criteria:** lint, typecheck, tests and build are green in CI; the A1 blueprint is written; the schema validates the migrated alphabet lesson; progress survives reload; the new shell is used by the home, unit and lesson pages.

### Phase 1 — Engine & Unit 1

**Outcome:** a complete learning loop, proven with Unit 1. The learner can study a lesson, do varied exercises, listen, review with SRS, pass a quiz and see progress.

| Issue | Work |
|---|---|
| [#9](https://github.com/ivanprjcts/my-tagalog-workbook/issues/9) | Structured lesson renderer |
| [#10](https://github.com/ivanprjcts/my-tagalog-workbook/issues/10) | Exercise engine: grading, normalization, attempts |
| [#11](https://github.com/ivanprjcts/my-tagalog-workbook/issues/11) | Accessible exercise UI for all types |
| [#12](https://github.com/ivanprjcts/my-tagalog-workbook/issues/12) | Audio playback and TTS strategy |
| [#13](https://github.com/ivanprjcts/my-tagalog-workbook/issues/13) | Flashcards and spaced review |
| [#14](https://github.com/ivanprjcts/my-tagalog-workbook/issues/14) | Lesson checks, unit quizzes and scoring |
| [#15](https://github.com/ivanprjcts/my-tagalog-workbook/issues/15) | Learner dashboard and progress page |
| [#16](https://github.com/ivanprjcts/my-tagalog-workbook/issues/16) | Searchable reference library |
| [#17](https://github.com/ivanprjcts/my-tagalog-workbook/issues/17) | Spanish-speaker companion layer |
| [#18](https://github.com/ivanprjcts/my-tagalog-workbook/issues/18) | Author Unit 1 — Sounds & Survival (6 lessons) |

**Status:** the engine, audio, review, lesson checks, both unit quizzes and Units 1–2 are implemented. The searchable reference and the full Spanish reference page remain open. Native-speaker review is still pending.

**Exit criteria:** all six Unit 1 lessons are playable end-to-end; each has audio, exercises, a check and flashcards; the unit quiz scores and unlocks correctly; the dashboard shows real progress; `content:check` passes; a native speaker has reviewed the unit.

### Phase 2 — Full A1 content

**Outcome:** all 36 lessons, the final exam, graded reading/listening and a mixed review queue.

| Issue | Work |
|---|---|
| [#19](https://github.com/ivanprjcts/my-tagalog-workbook/issues/19) | Unit 2 — People & Things |
| [#20](https://github.com/ivanprjcts/my-tagalog-workbook/issues/20) | Unit 3 — Food & Market |
| [#21](https://github.com/ivanprjcts/my-tagalog-workbook/issues/21) | Unit 4 — Daily Life & Time |
| [#22](https://github.com/ivanprjcts/my-tagalog-workbook/issues/22) | Unit 5 — Getting Around |
| [#23](https://github.com/ivanprjcts/my-tagalog-workbook/issues/23) | Unit 6 — A1 Checkpoint & Culture |
| [#24](https://github.com/ivanprjcts/my-tagalog-workbook/issues/24) | A1 final exam and printable certificate |
| [#25](https://github.com/ivanprjcts/my-tagalog-workbook/issues/25) | Graded reading, listening and mixed review |

**Status:** Unit 2 is complete. Units 3–6, the final exam and the graded practice library remain.

**Exit criteria:** all 36 lessons pass `content:check`; every unit has a quiz; the final exam covers every unit and can-do statement; the mistake bank and mixed practice work; no full focus-system tables appear in A1.

### Phase 3 — Polish & launch

**Outcome:** an installable, accessible, printable, launch-quality static site.

| Issue | Work |
|---|---|
| [#26](https://github.com/ivanprjcts/my-tagalog-workbook/issues/26) | PWA, offline mode and installability |
| [#27](https://github.com/ivanprjcts/my-tagalog-workbook/issues/27) | Accessibility, print and mobile polish |
| [#28](https://github.com/ivanprjcts/my-tagalog-workbook/issues/28) | Launch polish: metadata, SEO, 404, performance |
| [#29](https://github.com/ivanprjcts/my-tagalog-workbook/issues/29) | Full content QA, authoring guide and launch checklist |

**Status:** not started.

**Exit criteria:** offline works after one visit; zero serious axe violations; keyboard-only lesson completion; printed worksheet and certificate are legible; Lighthouse targets met; a new author can add a lesson from the guide; launch checklist signed off.

---

## 10. Quality gates and definition of done

### Automated

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run content:check`
- `npm run test:e2e`
- `npm run build`

`npm run check` runs the first five in order; CI runs the same set plus the build.

### Content

- Every Tagalog example is verified against a source or a native speaker.
- Every exercise has at least one accepted answer and an explanation.
- Every lesson has objectives, a can-do check, a dialogue, audio and flashcards.
- Spanish notes are reviewed by a Spanish L1 speaker.
- No A2 content leaks into A1 (especially full focus tables).
- No copied textbook exercises; sources are cited.

### UX

- Mobile-first at 360px; no horizontal scroll.
- Keyboard-only completion of a lesson and a review session.
- Screen-reader labels and `aria-live` feedback.
- Reduced-motion support.
- Printed lesson and certificate fit A4 or Letter.

### Release

- All routes work under the GitHub Pages base path.
- Progress survives reload, export and import.
- 404 page is useful.
- No console errors or hydration mismatches.
- The deploy workflow uses `npm ci` and only deploys from `main`.

---

## 11. Assumptions, risks and mitigations

| Risk | Mitigation |
|---|---|
| **Content accuracy without a native speaker on the team** | Use reliable references, keep A1 scope conservative, add a native-speaker review issue and a sign-off record. When in doubt, cut the example rather than ship a doubtful one. |
| **TTS quality and voice availability** | Test `fil-PH` across browsers; provide a clear fallback, phonetic respelling and optional pre-generated audio for key dialogues. Never fake a wrong accent. |
| **36 lessons is a large authoring effort** | Build the template and Unit 1 first; author one unit per milestone; use `content:check` and a repeatable lesson checklist. |
| **The focus system overwhelms beginners** | Teach “which noun is the topic?” with actor focus and a few object-focus phrases; defer full four-focus tables to A2. |
| **False friends and Spanish contrasts can be wrong** | Verify each claim; keep a source list; have the Spanish L1 learner review the notes. |
| **Static-only means no sync** | Export/import JSON; be explicit that progress is per browser. |
| **Scope creep** | The A1 exit profile is the contract. A2, speech recognition and AI conversation are post-launch. |
| **Copyright** | Write original lessons and exercises; cite references; do not copy textbook content or audio. |
| **GitHub Pages routing and caching** | Use `generateStaticParams`, environment-based `basePath`, a custom 404 and a versioned service worker when PWA lands. |

---

## 12. Immediate next step

Phase 0 and Unit 1 are complete. The next pieces are:

1. Native-speaker review of Units 1–2.
2. [#16](https://github.com/ivanprjcts/my-tagalog-workbook/issues/16) searchable vocabulary and phrasebook.
3. [#17](https://github.com/ivanprjcts/my-tagalog-workbook/issues/17) the full Spanish-speaker reference page.
4. [#20](https://github.com/ivanprjcts/my-tagalog-workbook/issues/20) Unit 3 — Food & Market.
5. [#21](https://github.com/ivanprjcts/my-tagalog-workbook/issues/21) Unit 4 — Daily Life & Time.

Use Units 1–2 as the authoring standard. Keep every new lesson at the same density and quality.
