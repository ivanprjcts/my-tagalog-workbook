# My Tagalog Workbook

A static, mobile-first interactive workbook for a Spanish speaker learning Tagalog through English. The target is a functional **A1** level: sounds, survival conversations, core grammar, everyday situations and a final checkpoint.

- **Live site:** https://ivanprjcts.github.io/my-tagalog-workbook/
- **Roadmap and analysis:** [ROADMAP.md](ROADMAP.md)
- **A1 curriculum:** [docs/curriculum.md](docs/curriculum.md)
- **Content sources and review policy:** [docs/content-sources.md](docs/content-sources.md)
- **Pronunciation and IPA:** [docs/pronunciation.md](docs/pronunciation.md)
- **Work tracker:** [Epic #1](https://github.com/ivanprjcts/my-tagalog-workbook/issues/1)

## What is implemented

- Next.js 16 App Router, React 19, TypeScript, Tailwind 4.
- Static export for GitHub Pages.
- A1 content schema with build-time validation (`npm run content:check`).
- Pre-generated Tagalog audio for every vocabulary item, dialogue line, pattern example, listening prompt and dictation prompt, with a browser-voice fallback. See [docs/audio.md](docs/audio.md).
- Units 1–2 — **Sounds & Survival** and **People & Things**: twelve complete lessons with vocabulary, dialogues, 120 exercises and twelve lesson checks.
- Exercise engine and UI for multiple choice, multi-select, matching, fill-in-the-blank, word bank, listening, dictation, categorization, ordering, translation, error correction and conjugation.
- Answer-key tests: every practice and check answer in the course is graded as correct.
- Lesson progress, time tracking, streak, best score and completion.
- Spaced review with a four-grade SM-2 variant.
- Progress export/import and reset.
- Alphabet and pronunciation reference with a corrected 28-letter / abakada explanation.
- Phonemic IPA for every vocabulary item, plus IPA on minimal-pair examples and review cards. See [docs/pronunciation.md](docs/pronunciation.md).
- A1 grammar reference.
- Vitest + React Testing Library suite and CI.
- App shell with responsive navigation, accessible focus states, print styles and Spanish-speaker callouts.

## Not implemented yet

- Units 3–6 and the final A1 exam.
- Graded reading/listening library and mistake bank.
- PWA/offline mode.
- Native-speaker review of the shipped lessons and audio (see the review log in `docs/content-sources.md`).

The roadmap issues describe each remaining piece. Unit 1 is the reference implementation. Unit 2 follows the same template; use both as the authoring standard for Units 3–6.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the static export into `out/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run test` | Run Vitest |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run content:check` | Validate all lesson content |
| `npm run audio:generate` | Regenerate the pre-recorded Tagalog audio and manifest |
| `npm run audio:pairs` | Rebuild the custom stress/glottal-stop minimal-pair recordings |
| `npm run check` | Lint, typecheck, test and content-check |
| `npm start` | Serve the production build |

`npm run check` is the pre-commit gate. CI runs the same checks plus `npm run build`.

## Project structure

```text
src/
  app/                    routes (home, units, lesson, review, reference, progress)
  components/             layout, lesson, exercises, review, progress, UI
  content/
    schema.ts             typed content model + Zod validation
    validate.ts           cross-reference and quality checks
    a1/                   authored A1 units and lessons
  data/                   legacy alphabet/grammar reference data
  lib/
    exercises/            pure grading and normalization
    progress/             store, storage, migrations, SRS, selectors
  test/                   Vitest setup
scripts/
  content-check.ts        CLI for content validation
docs/
  curriculum.md           A1 scope, 36-lesson map, lesson template
  content-sources.md      references and review policy
```

## Content authoring

1. Read [docs/curriculum.md](docs/curriculum.md) and the lesson template.
2. Add or edit a lesson module under `src/content/a1/`.
3. Keep the lesson data typed with the `Lesson` type from `src/content/schema.ts`.
4. Run:

```bash
npm run content:check
npm run typecheck
npm run test
```

The validator checks unique IDs, unit/lesson references, answer keys, MCQ options, word-bank tokens, matching pairs, categorization references and published-lesson quality gates (vocabulary count, exercise count, listening/production requirements, callout).

Every example must be verified against a source or a native speaker. The review log is in [docs/content-sources.md](docs/content-sources.md).

## Progress and privacy

- Progress is stored in `localStorage` under `tagalog-workbook-progress-v2`.
- The old `tagalog-learning-progress` key is migrated automatically.
- There is no backend, account, analytics or tracking.
- Use **Progress → Export progress** to back up or move your data.

## Deployment

The site is exported statically and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

- The production base path is `/my-tagalog-workbook` (see `next.config.ts`).
- `npm ci` is used in CI and deploy.
- Deploy only runs from `main` and requires the checks to pass.

## License and content

The code is a personal learning project. Tagalog lesson content is original unless a source is cited. Do not copy textbook exercises or copyrighted audio into the repository.
