'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/components/ui/cn';

const NAV_ITEMS = [
  { href: '/units', label: 'Learn' },
  { href: '/review', label: 'Review' },
  { href: '/reference', label: 'Reference' },
  { href: '/progress', label: 'Progress' },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-sm font-black text-white">
            Ta
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-ink">My Tagalog Workbook</span>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
              A1 · step by step
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                isActive(pathname, item.href)
                  ? 'bg-accent-soft text-accent-strong'
                  : 'text-ink-muted hover:bg-paper-strong hover:text-ink',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-line bg-paper px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 text-sm font-semibold',
                    isActive(pathname, item.href)
                      ? 'bg-accent-soft text-accent-strong'
                      : 'text-ink-muted hover:bg-paper-strong hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
