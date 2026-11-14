import { PageHeader } from '@/components/layout/PageHeader';
import { ProgressPanel } from '@/components/progress/ProgressPanel';

export const metadata = {
  title: 'Progress',
  description: 'Your lesson progress, study streak, review queue and backup controls.',
};

export default function ProgressPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Your workbook"
        title="Progress"
        description="Everything here is stored in this browser. No account, no server and no tracking."
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ProgressPanel />
      </div>
    </div>
  );
}
