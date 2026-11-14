import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { A1_COURSE } from '../a1';
import { AUDIO_MANIFEST } from '../audio-manifest';

function publishedTexts(): string[] {
  const texts = new Set<string>();
  for (const unit of A1_COURSE.units) {
    for (const lesson of unit.lessons) {
      if (lesson.status !== 'published') continue;
      for (const entry of lesson.vocabulary) texts.add(entry.audioText ?? entry.tagalog);
      for (const section of lesson.sections) {
        if (section.type === 'dialogue') {
          for (const line of section.lines) texts.add(line.audioText ?? line.tagalog);
        }
        if (section.type === 'pattern') {
          for (const example of section.examples) texts.add(example.tagalog);
        }
      }
      for (const exercise of lesson.exercises) {
        if (exercise.type === 'listening' || exercise.type === 'dictation') texts.add(exercise.audioText);
      }
      for (const question of lesson.check.questions) {
        if (question.type === 'listening' || question.type === 'dictation') texts.add(question.audioText);
      }
    }
  }
  return [...texts];
}

describe('audio manifest', () => {
  it('has a non-empty recording for every published playable text', () => {
    const missing: string[] = [];
    for (const text of publishedTexts()) {
      const path = AUDIO_MANIFEST[text];
      if (!path) {
        missing.push(`${text} (no manifest entry)`);
        continue;
      }
      const file = resolve('public', path.replace(/^\//, ''));
      if (!existsSync(file) || statSync(file).size < 500) {
        missing.push(`${text} (${path})`);
      }
    }
    expect(missing).toEqual([]);
  });
});
