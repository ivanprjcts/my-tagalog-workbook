import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { McqExercise } from '@/content/schema';
import { ExerciseRunner } from '../ExerciseRunner';

const mcq: McqExercise = {
  id: 'mcq-1',
  type: 'mcq',
  prompt: 'Which is a vowel?',
  options: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
  ],
  correctOptionId: 'a',
  explanation: 'A is a vowel.',
};

describe('ExerciseRunner', () => {
  it('checks an answer, shows feedback and finishes with a score', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<ExerciseRunner exercises={[mcq]} title="Test" mode="check" onFinish={onFinish} />);

    await user.click(screen.getByLabelText('A'));
    await user.click(screen.getByRole('button', { name: 'Check answer' }));

    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('A is a vowel.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Finish' }));

    expect(screen.getByText(/100%/)).toBeInTheDocument();
    expect(screen.getByText(/Passed/)).toBeInTheDocument();
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish.mock.calls[0][0].score).toBe(100);
  });

  it('shows the model answer and explanation after a wrong answer', async () => {
    const user = userEvent.setup();
    render(<ExerciseRunner exercises={[mcq]} title="Test" />);

    await user.click(screen.getByLabelText('B'));
    await user.click(screen.getByRole('button', { name: 'Check answer' }));

    expect(screen.getByText('Not quite')).toBeInTheDocument();
    expect(screen.getByText(/Model answer/)).toBeInTheDocument();
    expect(screen.getByText('A is a vowel.')).toBeInTheDocument();
  });

  it('does not allow checking before an answer is selected', () => {
    render(<ExerciseRunner exercises={[mcq]} title="Test" />);
    expect(screen.getByRole('button', { name: 'Check answer' })).toBeDisabled();
  });
});
