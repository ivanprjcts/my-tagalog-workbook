'use client';

import type {
  CategorizationExercise,
  Exercise,
  FillBlankExercise,
  MatchingExercise,
  OrderingExercise,
  WordBankExercise,
} from '@/content/schema';
import type { ExerciseAnswer } from '@/lib/exercises/grading';
import { AudioButton } from './AudioButton';

interface ExerciseInputProps {
  exercise: Exercise;
  answer: ExerciseAnswer;
  onChange: (answer: ExerciseAnswer) => void;
  disabled?: boolean;
}

function optionList(
  exercise: { id: string; options: Array<{ id: string; text: string }> },
  multi: boolean,
  answer: ExerciseAnswer,
  onChange: (answer: ExerciseAnswer) => void,
  disabled?: boolean,
) {
  if (multi) {
    const selected = Array.isArray(answer) ? answer : [];
    return (
      <div className="space-y-2">
        {exercise.options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                checked ? 'border-accent bg-accent-soft' : 'border-line bg-white hover:border-accent/50'
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4"
                checked={checked}
                disabled={disabled}
                onChange={() => {
                  onChange(checked ? selected.filter((id) => id !== option.id) : [...selected, option.id]);
                }}
              />
              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {exercise.options.map((option) => (
        <label
          key={option.id}
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
            answer === option.id ? 'border-accent bg-accent-soft' : 'border-line bg-white hover:border-accent/50'
          }`}
        >
          <input
            type="radio"
            name={exercise.id}
            className="mt-0.5 h-4 w-4"
            checked={answer === option.id}
            disabled={disabled}
            onChange={() => onChange(option.id)}
          />
          <span>{option.text}</span>
        </label>
      ))}
    </div>
  );
}

export function ExerciseInput({ exercise, answer, onChange, disabled }: ExerciseInputProps) {
  switch (exercise.type) {
    case 'mcq':
      return optionList(exercise, false, answer, onChange, disabled);

    case 'listening':
      return (
        <div className="space-y-4">
          <AudioButton text={exercise.audioText} label="Play audio" />
          {optionList(exercise, false, answer, onChange, disabled)}
        </div>
      );

    case 'multi-select':
      return optionList(exercise, true, answer, onChange, disabled);

    case 'fill-blank': {
      const fill = exercise as FillBlankExercise;
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-ink">{fill.text}</p>
          <label className="block">
            <span className="sr-only">Your answer</span>
            <input
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
              placeholder="Type the missing word"
            />
          </label>
        </div>
      );
    }

    case 'dictation':
      return (
        <div className="space-y-3">
          <AudioButton text={exercise.audioText} label="Play dictation" />
          <label className="block">
            <span className="sr-only">Type what you hear</span>
            <input
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
              placeholder="Type what you hear"
            />
          </label>
        </div>
      );

    case 'word-bank': {
      const bank = exercise as WordBankExercise;
      const selected = Array.isArray(answer) ? answer : [];
      return (
        <div className="space-y-4">
          <div className="min-h-14 rounded-lg border border-dashed border-line bg-paper p-3">
            {selected.length === 0 ? (
              <span className="text-sm text-ink-muted">Tap words to build the sentence.</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selected.map((word, index) => (
                  <button
                    key={`${word}-${index}`}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(selected.filter((_, itemIndex) => itemIndex !== index))}
                    className="rounded-md border border-accent bg-accent-soft px-2.5 py-1.5 text-sm font-semibold text-accent-strong"
                    title="Remove word"
                  >
                    {word} <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {bank.words.map((word, index) => (
              <button
                key={`${word}-${index}`}
                type="button"
                disabled={disabled}
                onClick={() => onChange([...selected, word])}
                className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-accent hover:bg-accent-soft disabled:opacity-50"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      );
    }

    case 'matching': {
      const matching = exercise as MatchingExercise;
      const mapping = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
      return (
        <div className="space-y-3">
          {matching.pairs.map((pair) => (
            <label key={pair.left} className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
              <span className="min-w-28 font-semibold text-ink">{pair.left}</span>
              <span aria-hidden="true" className="text-ink-muted">→</span>
              <select
                value={mapping[pair.left] ?? ''}
                disabled={disabled}
                onChange={(event) => onChange({ ...mapping, [pair.left]: event.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent sm:max-w-sm"
                aria-label={`Match for ${pair.left}`}
              >
                <option value="">Choose a match</option>
                {matching.pairs.map((option) => (
                  <option key={option.right} value={option.right}>
                    {option.right}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      );
    }

    case 'categorization': {
      const categorization = exercise as CategorizationExercise;
      const mapping = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
      return (
        <div className="space-y-3">
          {categorization.items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
              <span className="min-w-20 font-semibold text-ink">{item.text}</span>
              <select
                value={mapping[item.id] ?? ''}
                disabled={disabled}
                onChange={(event) => onChange({ ...mapping, [item.id]: event.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent sm:max-w-xs"
                aria-label={`Category for ${item.text}`}
              >
                <option value="">Choose a category</option>
                {categorization.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }

    case 'ordering': {
      const ordering = exercise as OrderingExercise;
      const order = Array.isArray(answer) && answer.length === ordering.items.length ? answer : ordering.items;
      const move = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= order.length) return;
        const next = [...order];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      return (
        <ol className="space-y-2">
          {order.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center gap-2 rounded-lg border border-line bg-white p-2.5 text-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper-strong text-xs font-bold text-ink-muted">
                {index + 1}
              </span>
              <span className="flex-1">{item}</span>
              <button
                type="button"
                disabled={disabled || index === 0}
                onClick={() => move(index, -1)}
                className="rounded border border-line px-2 py-1 text-xs font-semibold disabled:opacity-30"
                aria-label={`Move ${item} up`}
              >
                ↑
              </button>
              <button
                type="button"
                disabled={disabled || index === order.length - 1}
                onClick={() => move(index, 1)}
                className="rounded border border-line px-2 py-1 text-xs font-semibold disabled:opacity-30"
                aria-label={`Move ${item} down`}
              >
                ↓
              </button>
            </li>
          ))}
        </ol>
      );
    }

    case 'translation':
      return (
        <div className="space-y-2">
          <p className="rounded-lg border border-line bg-paper p-3 text-sm font-semibold text-ink">{exercise.source}</p>
          <label className="block">
            <span className="sr-only">Your translation</span>
            <textarea
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              rows={3}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
              placeholder={`Translate into ${exercise.sourceLanguage === 'en' ? 'English' : 'Tagalog'}`}
            />
          </label>
        </div>
      );

    case 'error-correction':
      return (
        <div className="space-y-2">
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-900">
            {exercise.incorrect}
          </p>
          <label className="block">
            <span className="sr-only">Corrected sentence</span>
            <input
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
              placeholder="Write the corrected sentence"
            />
          </label>
        </div>
      );

    case 'conjugation':
      return (
        <div className="space-y-2">
          <p className="text-sm text-ink-muted">
            Verb: <strong className="text-ink">{exercise.verb}</strong> · {exercise.focus} focus · {exercise.aspect}
          </p>
          <label className="block">
            <span className="sr-only">Your answer</span>
            <input
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
              placeholder="Type the conjugated form"
            />
          </label>
        </div>
      );

    default:
      return (
        <label className="block">
          <span className="sr-only">Your answer</span>
          <input
            type="text"
            value={typeof answer === 'string' ? answer : ''}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-accent"
            placeholder="Type your answer"
          />
        </label>
      );
  }
}
