'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/components/ui/cn';
import { AUDIO_MANIFEST } from '@/content/audio-manifest';
import { useAudioEnabled } from './AudioContext';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
let activeAudio: HTMLAudioElement | null = null;

function findTagalogVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return (
    voices.find((voice) => /^fil/i.test(voice.lang)) ??
    voices.find((voice) => /^tl/i.test(voice.lang)) ??
    voices.find((voice) => /^en-PH/i.test(voice.lang))
  );
}

function getVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return Promise.resolve([]);
  const current = window.speechSynthesis.getVoices();
  if (current.length > 0) return Promise.resolve(current);

  return new Promise((resolve) => {
    const finish = () => resolve(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    window.setTimeout(finish, 600);
  });
}

export function AudioButton({
  text,
  label = 'Listen',
  rate = 0.9,
  compact = false,
  className,
}: {
  text: string;
  label?: string;
  rate?: number;
  compact?: boolean;
  className?: string;
}) {
  const [message, setMessage] = useState('');
  const [playing, setPlaying] = useState(false);
  const audioEnabled = useAudioEnabled();

  useEffect(() => {
    return () => {
      activeAudio?.pause();
    };
  }, []);

  if (!audioEnabled) return null;

  const speakWithDevice = async () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setMessage('Audio is not available in this browser.');
      return;
    }

    const voice = findTagalogVoice(await getVoices());
    if (!voice) {
      setMessage('This recording could not be loaded and no Tagalog device voice is available.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
    setMessage('');
  };

  const play = async () => {
    if (playing && activeAudio) {
      activeAudio.pause();
      setPlaying(false);
      return;
    }

    const recorded = AUDIO_MANIFEST[text];
    if (!recorded) {
      await speakWithDevice();
      return;
    }

    activeAudio?.pause();
    const audio = new Audio(`${BASE_PATH}${recorded}`);
    activeAudio = audio;
    audio.onplay = () => setPlaying(true);
    audio.onended = () => setPlaying(false);
    audio.onpause = () => setPlaying(false);
    audio.onerror = () => {
      setPlaying(false);
      setMessage('The recording could not be loaded; trying the device voice.');
      void speakWithDevice();
    };

    try {
      await audio.play();
      setMessage('');
    } catch {
      setMessage('Audio playback was blocked. Tap again or use the written guide.');
      setPlaying(false);
    }
  };

  return (
    <span className={cn('inline-flex flex-col items-start gap-1', className)}>
      <button
        type="button"
        onClick={() => void play()}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-line bg-white font-semibold text-accent-strong transition-colors hover:border-accent hover:bg-accent-soft',
          compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        )}
        aria-label={`Listen to ${text}`}
        aria-pressed={playing}
      >
        <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        {label}
      </button>
      {message && (
        <span role="status" className="max-w-xs text-xs text-amber-800">
          {message}
        </span>
      )}
    </span>
  );
}
