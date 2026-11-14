import { PageHeader } from '@/components/layout/PageHeader';
import { ReviewSession } from '@/components/review/ReviewSession';
import { Callout } from '@/components/ui/Callout';

export const metadata = {
  title: 'Review',
  description: 'Spaced review of the vocabulary from your Tagalog lessons.',
};

export default function ReviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Spaced review"
        title="Keep what you learned"
        description="Review the vocabulary from your lessons with a simple spaced-repetition schedule. Progress is stored in this browser."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <ReviewSession />
        <Callout variant="tip" title="How to grade yourself" className="mt-8">
          <p>
            <strong>Again</strong> means you could not recall it. <strong>Hard</strong> means it took real effort.
            <strong> Good</strong> means you remembered it. <strong>Easy</strong> means it was immediate. Honest grades
            make the schedule useful.
          </p>
        </Callout>
      </div>
    </div>
  );
}
