import { describe, expect, it } from 'vitest';
import { A1_COURSE } from '../a1';
import { PRONUNCIATIONS } from '../pronunciations';
import { PHONEMES } from '@/data/phonemes';

describe('vocabulary IPA', () => {
  it('has a phonemic transcription for every published vocabulary item', () => {
    const missing: string[] = [];
    const malformed: string[] = [];

    for (const unit of A1_COURSE.units) {
      for (const lesson of unit.lessons) {
        if (lesson.status !== 'published') continue;
        for (const entry of lesson.vocabulary) {
          const ipa = PRONUNCIATIONS[entry.tagalog];
          if (!ipa) {
            missing.push(`${entry.tagalog} (${lesson.id})`);
            continue;
          }
          if (!ipa.startsWith('/') || !ipa.endsWith('/')) {
            malformed.push(`${entry.tagalog}: ${ipa}`);
          }
        }
      }
    }

    expect(missing).toEqual([]);
    expect(malformed).toEqual([]);
  });

  it('has IPA for every alphabet example word', () => {
    const missing: string[] = [];
    for (const phoneme of PHONEMES) {
      for (const example of phoneme.examples) {
        if (!PRONUNCIATIONS[example.word]) missing.push(example.word);
      }
    }
    expect(missing).toEqual([]);
  });
});
