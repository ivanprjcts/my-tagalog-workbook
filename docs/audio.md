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
