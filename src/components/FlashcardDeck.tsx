'use client';

import { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { calculateNextReviewDate, initializeCardProgress, getCardsForReview } from '@/lib/spaced-repetition';
import { FlashcardProgress } from '@/lib/spaced-repetition';

interface Card {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

interface FlashcardDeckProps {
  deckId: string;
  title: string;
  description?: string;
  cards: Card[];
}

export default function FlashcardDeck({ deckId, title, description, cards }: FlashcardDeckProps) {
  const [progress, setProgress] = useState<Map<string, FlashcardProgress>>(new Map());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });
  const [sessionActive, setSessionActive] = useState(false);
  const [reviewCards, setReviewCards] = useState<Card[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`flashcard-progress-${deckId}`);
    if (saved) {
      const data = JSON.parse(saved) as [string, FlashcardProgress][];
      const progressMap = new Map(data);
      setProgress(progressMap);

      // Get cards for review
      const cardIdsForReview = getCardsForReview(Array.from(progressMap.values()));
      const cardsToReview = cards.filter((c) =>
        cardIdsForReview.includes(c.id) || !progressMap.has(c.id)
      );
      setReviewCards(cardsToReview);
    } else {
      // Initialize all cards for first-time learners
      setReviewCards(cards);
    }
  }, [deckId, cards]);

  // Save progress to localStorage
  useEffect(() => {
    const data = Array.from(progress.entries());
    localStorage.setItem(`flashcard-progress-${deckId}`, JSON.stringify(data));
  }, [progress, deckId]);

  const handleCardResponse = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    const currentCard = reviewCards[currentCardIndex];
    const currentProgress = progress.get(currentCard.id) || initializeCardProgress(currentCard.id);

    // Calculate new progress
    const newProgressData = calculateNextReviewDate(currentProgress, quality);
    const updatedProgress = { ...currentProgress, ...newProgressData };

    // Update progress map
    const newProgress = new Map(progress);
    newProgress.set(currentCard.id, updatedProgress);
    setProgress(newProgress);

    // Update session stats
    setSessionStats({
      reviewed: sessionStats.reviewed + 1,
      correct: sessionStats.correct + (quality >= 3 ? 1 : 0),
    });

    // Move to next card
    if (currentCardIndex < reviewCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Session complete
      setSessionActive(false);
    }
  };

  const startSession = () => {
    setSessionActive(true);
    setCurrentCardIndex(0);
    setSessionStats({ reviewed: 0, correct: 0 });
  };

  const endSession = () => {
    setSessionActive(false);
  };

  if (reviewCards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg mb-4">No cards to review right now!</p>
        <p className="text-gray-500">You're all caught up. Come back later for more practice.</p>
      </div>
    );
  }

  if (!sessionActive) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          {description && <p className="text-gray-700 mb-4">{description}</p>}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{reviewCards.length}</div>
              <div className="text-sm text-gray-600">Cards to review</div>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{progress.size}</div>
              <div className="text-sm text-gray-600">In progress</div>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((progress.size / cards.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        <button
          onClick={startSession}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
        >
          Start Study Session
        </button>
      </div>
    );
  }

  // Active session
  const currentCard = reviewCards[currentCardIndex];

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Card {currentCardIndex + 1} of {reviewCards.length}
          </span>
          <button
            onClick={endSession}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            End Session
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentCardIndex + 1) / reviewCards.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        hint={currentCard.hint}
        onResponse={handleCardResponse}
        isInteractive={true}
      />

      {/* Session Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
          <div className="text-sm text-green-800">Remembered</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{sessionStats.reviewed - sessionStats.correct}</div>
          <div className="text-sm text-orange-800">Forgot</div>
        </div>
      </div>
    </div>
  );
}
