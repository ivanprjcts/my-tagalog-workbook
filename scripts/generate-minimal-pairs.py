#!/usr/bin/env python3
"""
Build the four stress/glottal-stop minimal pairs with a Spanish voice.

The main Filipino TTS voice ignores the written stress marks, and its syllable
rendering can sound English-influenced. For these four words the important
contrast is stress plus the final glottal stop, and Spanish vowels/consonants
are closer to the target sounds.

First-stress words are synthesized as whole words with the written accent
(bása, túbo). Final-stress words are assembled from two Spanish-voice syllables
so the second syllable is clearly longer and louder (ba-SAH, tu-BOH), then given
a short glottal-like cut.

Requirements:
  python3 -m pip install --user edge-tts
  ffmpeg in PATH, or FFMPEG=/path/to/ffmpeg

Run:
  npm run audio:pairs
"""

import asyncio
import os
import subprocess
import tempfile
from pathlib import Path

import edge_tts

VOICE = os.environ.get("TAGALOG_PAIR_VOICE", "es-ES-ElviraNeural")
RATE = os.environ.get("TAGALOG_PAIR_RATE", "-8%")
FFMPEG = os.environ.get("FFMPEG", "ffmpeg")
OUT_DIR = Path("public/audio/custom")
OVERRIDES_PATH = Path("src/content/audio-overrides.ts")
TEMP_DIR = Path(tempfile.mkdtemp(prefix="tagalog-pairs-"))


def run(args: list[str]) -> None:
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", *args], check=True)


async def synthesize(text: str, path: Path, attempts: int = 3) -> None:
    for attempt in range(1, attempts + 1):
        try:
            await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(path))
            if path.exists() and path.stat().st_size > 500:
                return
        except Exception:
            pass
        await asyncio.sleep(0.8 * attempt)
    raise RuntimeError(f"Could not generate audio for: {text}")


def trim_silence(src: Path, dst: Path) -> None:
    run(
        [
            "-i", str(src),
            "-af",
            "silenceremove=start_periods=1:start_duration=0.01:start_threshold=-45dB,"
            "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-45dB,areverse",
            "-ar", "24000",
            "-ac", "1",
            str(dst),
        ]
    )


def encode(src: Path, dst: Path) -> None:
    run(
        [
            "-i", str(src),
            "-codec:a", "libmp3lame",
            "-b:a", "48k",
            "-ar", "24000",
            "-ac", "1",
            str(dst),
        ]
    )


async def build_whole_word(word: str, spoken_text: str, filename: str) -> str:
    mp3 = TEMP_DIR / f"{word}.mp3"
    trimmed = TEMP_DIR / f"{word}-trimmed.wav"
    output = OUT_DIR / filename

    await synthesize(spoken_text, mp3)
    trim_silence(mp3, trimmed)
    encode(trimmed, output)
    print(f"{word}: {output} (whole word {spoken_text!r}, voice {VOICE})")
    return f"/audio/custom/{filename}"


async def build_final_stress(word: str, first: str, second: str, filename: str) -> str:
    first_mp3 = TEMP_DIR / f"{word}-first.mp3"
    second_mp3 = TEMP_DIR / f"{word}-second.mp3"
    first_wav = TEMP_DIR / f"{word}-first.wav"
    second_wav = TEMP_DIR / f"{word}-second.wav"
    first_out = TEMP_DIR / f"{word}-first-out.wav"
    second_out = TEMP_DIR / f"{word}-second-out.wav"
    joined = TEMP_DIR / f"{word}-joined.wav"
    cut = TEMP_DIR / f"{word}-cut.wav"
    output = OUT_DIR / filename

    await synthesize(first, first_mp3)
    await synthesize(second, second_mp3)
    trim_silence(first_mp3, first_wav)
    trim_silence(second_mp3, second_wav)

    # Keep the first syllable light; make the second syllable longer and louder.
    run(["-i", str(first_wav), "-af", "atempo=1.05,volume=-2dB", "-ar", "24000", "-ac", "1", str(first_out)])
    run(["-i", str(second_wav), "-af", "atempo=0.9,volume=6dB", "-ar", "24000", "-ac", "1", str(second_out)])
    run(
        [
            "-i", str(first_out),
            "-i", str(second_out),
            "-filter_complex",
            "[0:a]apad=pad_dur=0.01[a0];[a0][1:a]concat=n=2:v=0:a=1[out]",
            "-map", "[out]",
            "-ar", "24000",
            "-ac", "1",
            str(joined),
        ]
    )

    # A short, abrupt cut plus silence approximates a final glottal stop.
    run(
        [
            "-i", str(joined),
            "-af", "areverse,atrim=start=0.02,areverse,apad=pad_dur=0.04",
            "-ar", "24000",
            "-ac", "1",
            str(cut),
        ]
    )
    encode(cut, output)
    print(f"{word}: {output} (final stress {first}-{second}, voice {VOICE})")
    return f"/audio/custom/{filename}"


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    overrides: dict[str, str] = {}
    overrides["bása"] = await build_whole_word("bása", "bása", "basa-first-stress.mp3")
    overrides["basâ"] = await build_final_stress("basâ", "ba", "sa", "basa-final-stress.mp3")
    overrides["túbo"] = await build_whole_word("túbo", "túbo", "tubo-first-stress.mp3")
    overrides["tubò"] = await build_final_stress("tubò", "tu", "bo", "tubo-final-stress.mp3")

    lines = [
        "// Generated by scripts/generate-minimal-pairs.py. Do not edit by hand.",
        "export const AUDIO_OVERRIDES: Record<string, string> = {",
    ]
    for word, path in overrides.items():
        lines.append(f"  {word!r}: {path!r},")
    lines.append("};")
    OVERRIDES_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Overrides written to {OVERRIDES_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
