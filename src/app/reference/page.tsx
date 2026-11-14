import { AlphabetViewer } from '@/components/AlphabetViewer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';
import { GRAMMAR_RULES } from '@/data/grammar';

export const metadata = {
  title: 'Reference',
  description: 'Tagalog alphabet, pronunciation and A1 grammar reference.',
};

export default function ReferencePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Look things up"
        description="The alphabet, pronunciation rules and the grammar patterns taught in the A1 path. This page grows with the lessons."
        meta={
          <>
            <Badge tone="accent">A1</Badge>
            <Badge tone="neutral">Alphabet</Badge>
            <Badge tone="neutral">Grammar</Badge>
          </>
        }
      />

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 sm:px-6">
        <section id="alphabet" className="scroll-mt-24">
          <h2 className="mb-4 text-2xl font-black text-ink">Alphabet and sounds</h2>
          <Card>
            <AlphabetViewer />
          </Card>
        </section>

        <section id="grammar" className="scroll-mt-24">
          <h2 className="mb-4 text-2xl font-black text-ink">A1 grammar</h2>
          <p className="mb-5 text-sm text-ink-muted">
            These are the patterns used in the lessons. The full focus system is deliberately not here; it belongs to
            A2.
          </p>
          <div className="space-y-4">
            {GRAMMAR_RULES.map((rule) => (
              <Card key={rule.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-ink">{rule.title}</h3>
                  <Badge tone="neutral">{rule.category}</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{rule.explanation}</p>
                <div className="mt-4 space-y-2">
                  {rule.examples.map((example, index) => (
                    <div key={index} className="rounded-lg border border-line bg-paper p-3 text-sm">
                      <div className="font-semibold text-ink">{example.tagalog}</div>
                      <div className="text-ink-muted">{example.english}</div>
                      {example.explanation && <div className="mt-1 text-xs text-ink-muted">{example.explanation}</div>}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Callout variant="spanish" title="Three pronoun sets, not one">
          <p>
            English has one pronoun form for most jobs. Tagalog uses three sets: <strong>ako, ikaw/ka, siya…</strong> for
            the topic; <strong>ko, mo, niya…</strong> for possessors and non-topic actors; and <strong>akin, iyo,
            kanya…</strong> after <em>sa</em>. Learning the set, not just the translation, is the key.
          </p>
        </Callout>
      </div>
    </div>
  );
}
