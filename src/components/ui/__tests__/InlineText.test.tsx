import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineText } from '../InlineText';

describe('InlineText', () => {
  it('renders highlighted vowels and bold text safely', () => {
    const { container } = render(
      <InlineText text="Start with ==a==, ==e== and ==i==, then **continue**." />,
    );

    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(3);
    expect(marks[0]).toHaveTextContent('a');
    expect(screen.getByText('continue').tagName).toBe('STRONG');
    expect(container.textContent).toContain('Start with a, e and i, then continue.');
  });
});
