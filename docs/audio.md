# Audio

The workbook ships pre-generated Tagalog audio so playback does not depend on the learner's device having a Filipino speech voice.

## How it works

- `scripts/generate-audio.ts` collects every text the UI can play:
  - vocabulary entries
  - dialogue lines
  - pattern examples
  - listening and dictation prompts
- It renders each unique text to `public/audio/<sha1>.mp3`.
- It writes `src/content/audio-manifest.ts`, mapping the exact text to the file.
- `AudioButton` plays the recording first. If a file is missing or fails, it falls back to the browser's `fil-PH`/`tl-PH` voice, then shows a message if neither is available.

## Stress and glottal-stop minimal pairs

The main Filipino TTS voice ignores written stress marks, and its syllable rendering can sound English-influenced. Six words are therefore generated with a Spanish voice, using the written accent to place stress:

- `báka` (cow) / `baká` (maybe) — stress only
- `bása` (read) / `basâ` (wet) — first stress vs final stress + glottal stop
- `tubò` (growth) / `tubó` (sugarcane) — final stress; the difference is the glottal stop

`scripts/generate-minimal-pairs.py` uses `es-ES-ElviraNeural` (override with `TAGALOG_PAIR_VOICE`). It synthesizes the whole word with the written accent to place stress. `bása` is generated with first-syllable stress. `basâ` and `tubò` use the final-stressed base and add a short glottal-like cut.

Spanish vowels and unaspirated consonants are closer to the target sounds than the English-influenced syllable clips. The results live in `public/audio/custom/` and are mapped in `src/content/audio-overrides.ts`.

Run it with:

```bash
python3 -m pip install --user edge-tts
npm run audio:pairs
```

It requires `ffmpeg` in `PATH`, or set `FFMPEG=/path/to/ffmpeg`.

## Regenerating

Requirements: Python 3 and the `edge-tts` package.

```bash
python3 -m pip install --user edge-tts
npm run audio:generate
```

The script skips files that already exist and is safe to re-run. Change the voice or speed with:

```bash
TAGALOG_TTS_VOICE=fil-PH-AngeloNeural TAGALOG_TTS_RATE=-10% npm run audio:generate
```

Available Filipino voices at the time of writing: `fil-PH-BlessicaNeural` and `fil-PH-AngeloNeural`.

## Licensing and quality

- The recordings are synthetic, not human-reviewed. They are a pronunciation aid, not an official reference.
- `edge-tts` uses Microsoft's online speech service. Check the applicable service terms before commercial redistribution.
- Keep the generated files in `public/audio/` so the static export works offline and on GitHub Pages.
- If a recording is wrong, fix the text or regenerate that file. Do not edit MP3s by hand.
- Native-speaker review should still cover the written pronunciation notes and, ideally, the audio.
