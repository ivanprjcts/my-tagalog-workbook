import GrammarViewer from '@/components/GrammarViewer';
import Link from 'next/link';

export default function GrammarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Grammar Reference</h1>
          <p className="text-gray-600 mt-2">Interactive guide to Tagalog verb conjugations and the focus system</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tagalog Verb Conjugation System</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Tagalog verbs are complex and powerful. Unlike English, Tagalog verbs change not just for tense, but also for
              <strong> focus</strong> - which noun in the sentence is the main topic. This is one of the most distinctive features of
              Tagalog grammar.
            </p>
            <p className="text-gray-700">
              Below, explore how the verb "kain" (eat) changes across different focuses and aspects. Try selecting different combinations
              to understand the subtle differences in meaning.
            </p>
          </div>

          <GrammarViewer verbRoot="kain" initialFocus="actor" />
        </div>

        <div className="mt-16 pt-12 border-t-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Understanding the Focus System</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Actor Focus (Nominative)</h3>
              <p className="text-gray-700 mb-4">
                The person performing the action is the main topic. This is the most common focus in everyday speech.
              </p>
              <div className="bg-blue-50 p-4 rounded text-sm font-mono">
                <div>Kumain kami ng tinapay.</div>
                <div className="text-gray-600 mt-2">We ate bread.</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-green-600 mb-3">Object Focus (Accusative)</h3>
              <p className="text-gray-700 mb-4">
                The thing being acted upon is the main topic. Emphasizes what is happening to something.
              </p>
              <div className="bg-green-50 p-4 rounded text-sm font-mono">
                <div>Ang tinapay ay kinain ng mga bata.</div>
                <div className="text-gray-600 mt-2">The bread was eaten by the children.</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Location Focus (Locative)</h3>
              <p className="text-gray-700 mb-4">
                The place where the action occurs is the main topic. Common with verbs about being or staying somewhere.
              </p>
              <div className="bg-purple-50 p-4 rounded text-sm font-mono">
                <div>Sa bahay, kumain kami.</div>
                <div className="text-gray-600 mt-2">At home, we ate.</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Beneficiary Focus (Dative)</h3>
              <p className="text-gray-700 mb-4">
                The person who benefits from or is affected by the action is the main topic.
              </p>
              <div className="bg-orange-50 p-4 rounded text-sm font-mono">
                <div>Kainan ka namin.</div>
                <div className="text-gray-600 mt-2">We will treat/feed you.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-lg font-bold text-amber-900 mb-2">Tip: Why Focus Matters</h3>
          <p className="text-amber-800">
            In English, we use passive voice to shift what's the main topic (e.g., "The bread was eaten"). In Tagalog, you use focus
            to achieve a similar effect while keeping the active voice construction. This makes Tagalog feel more concise and natural to
            native speakers!
          </p>
        </div>
      </main>
    </div>
  );
}
