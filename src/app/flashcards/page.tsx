import FlashcardDeck from '@/components/FlashcardDeck';
import Link from 'next/link';
import { VOCABULARY } from '@/data';

export default function FlashcardsPage() {
  // Create flashcard deck from vocabulary
  const vocabularyCards = VOCABULARY.map((item) => ({
    id: item.id,
    front: item.word,
    back: `${item.meaning}\n\n${item.partOfSpeech}`,
    hint: item.example ? `Hint: "${item.exampleEnglish}"` : undefined,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Flashcard Deck</h1>
          <p className="text-gray-600 mt-2">Study vocabulary with spaced repetition</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-2">How Spaced Repetition Works</h2>
          <p className="text-blue-800 mb-4">
            This flashcard system uses the Leitner method combined with SM-2 algorithm for optimal learning:
          </p>
          <ul className="text-blue-800 space-y-2 list-disc list-inside">
            <li>Cards you struggle with appear more frequently</li>
            <li>Cards you know well are reviewed less often</li>
            <li>Your progress is automatically saved</li>
            <li>Review intervals increase as you master content</li>
          </ul>
        </div>

        <FlashcardDeck
          deckId="vocabulary-beginner"
          title="Vocabulary - Beginner Level"
          description="Learn essential Tagalog words and phrases"
          cards={vocabularyCards}
        />

        <div className="mt-12 pt-12 border-t-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Tips for Effective Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Be Honest</h3>
              <p className="text-gray-700">
                Rate your answers honestly. The algorithm only works if it knows your true level.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">⏰ Consistency</h3>
              <p className="text-gray-700">
                Study regularly, even if just 5-10 minutes daily. This is more effective than cramming.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💭 Active Recall</h3>
              <p className="text-gray-700">
                Try to remember before flipping the card. Effort strengthens memory formation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
