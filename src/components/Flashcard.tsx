'use client';

import { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
  hint?: string;
  onResponse?: (quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  isInteractive?: boolean;
}

export default function Flashcard({
  front,
  back,
  hint,
  onResponse,
  isInteractive = true,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  const handleResponse = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    setHasResponded(true);
    if (onResponse) {
      onResponse(quality);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setHasResponded(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Card Container */}
      <div
        onClick={() => !hasResponded && setIsFlipped(!isFlipped)}
        className={`
          w-full max-w-2xl h-80 rounded-xl shadow-lg cursor-pointer
          transition-all duration-300 transform
          ${isFlipped ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}
          ${isFlipped ? 'ring-2 ring-green-400' : 'ring-2 ring-blue-400'}
          flex items-center justify-center p-8
          hover:shadow-2xl hover:scale-105
        `}
      >
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-500 uppercase mb-4">
            {isFlipped ? 'Answer' : 'Question'}
          </div>
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isFlipped ? back : front}
          </div>
          {isFlipped && hint && (
            <div className="text-sm text-gray-600 mt-4 italic">
              Hint: {hint}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-8">
            {!hasResponded && `Click to ${isFlipped ? 'see question' : 'reveal answer'}`}
          </div>
        </div>
      </div>

      {/* Response Buttons */}
      {isInteractive && isFlipped && !hasResponded && (
        <div className="mt-8 w-full max-w-2xl">
          <p className="text-center text-gray-700 font-semibold mb-4">How well did you remember?</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <button
              onClick={() => handleResponse(0)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-2 rounded transition-colors"
              title="Complete failure - forgot completely"
            >
              <span className="text-lg">❌</span>
              <div className="text-xs mt-1">Again</div>
            </button>
            <button
              onClick={() => handleResponse(1)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-2 rounded transition-colors"
              title="Incorrect response, but direction correct"
            >
              <span className="text-lg">😕</span>
              <div className="text-xs mt-1">Hard</div>
            </button>
            <button
              onClick={() => handleResponse(2)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-2 rounded transition-colors"
              title="Correct, but with serious difficulty"
            >
              <span className="text-lg">😐</span>
              <div className="text-xs mt-1">Okay</div>
            </button>
            <button
              onClick={() => handleResponse(3)}
              className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-2 rounded transition-colors"
              title="Correct with some hesitation"
            >
              <span className="text-lg">🙂</span>
              <div className="text-xs mt-1">Good</div>
            </button>
            <button
              onClick={() => handleResponse(4)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-2 rounded transition-colors"
              title="Correct and quick"
            >
              <span className="text-lg">✅</span>
              <div className="text-xs mt-1">Perfect</div>
            </button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {hasResponded && (
        <div className="mt-8 w-full max-w-2xl">
          <button
            onClick={handleReset}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Next Card
          </button>
        </div>
      )}
    </div>
  );
}
