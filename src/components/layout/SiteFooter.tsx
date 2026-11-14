import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-line bg-paper-strong/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-sm font-bold text-ink">My Tagalog Workbook</div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
            A static, private workbook for a Spanish speaker learning Tagalog through English. Progress stays in your
            browser.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Study</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-accent-strong" href="/units">Lessons</Link></li>
            <li><Link className="hover:text-accent-strong" href="/review">Review</Link></li>
            <li><Link className="hover:text-accent-strong" href="/reference">Reference</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">About</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-accent-strong" href="/progress">Progress</Link></li>
            <li><span className="text-ink-muted">No accounts. No tracking.</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-ink-muted sm:px-6">
        Made for one learner, shared as an open workbook. Not an official certification.
      </div>
    </footer>
  );
}
