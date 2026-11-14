'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/cn';
import { useAudioEnabled } from './AudioContext';

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
  const audioEnabled = useAudioEnabled();

  if (!audioEnabled) return null;

  const speak = async () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setMessage('Audio is not available in this browser.');
      return;
    }

    const voice = findTagalogVoice(await getVoices());
    if (!voice) {
      setMessage('No Tagalog voice was found on this device. Use the written pronunciation guide.');
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

  return (
    <span className={cn('inline-flex flex-col items-start gap-1', className)}>
      <button
        type="button"
        onClick={() => void speak()}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-line bg-white font-semibold text-accent-strong transition-colors hover:border-accent hover:bg-accent-soft',
          compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        )}
        aria-label={`Listen to ${text}`}
      >
        <span aria-hidden="true">▶</span>
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
