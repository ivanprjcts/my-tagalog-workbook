import type { ReactNode } from 'react';

/**
 * Lightweight inline emphasis for content strings.
 *
 * **bold** -> strong
 * ==highlight== -> highlighted mark
 *
 * Content remains a plain string, validated by the content schema, and the
 * renderer handles the emphasis without dangerouslySetInnerHTML.
 */
export function InlineText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('==') && part.endsWith('==')) {
          return (
            <mark
              key={index}
              className="rounded bg-accent-soft px-1 py-0.5 font-semibold text-ink"
            >
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
