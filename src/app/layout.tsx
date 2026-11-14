import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteName = 'My Tagalog Workbook';

export const metadata: Metadata = {
  applicationName: siteName,
  title: {
    default: `${siteName} — Learn Tagalog A1 step by step`,
    template: `%s · ${siteName}`,
  },
  description:
    'An interactive Tagalog workbook for Spanish speakers learning English: 36 A1 lessons, dialogues, audio, exercises, spaced review and progress tracking.',
  keywords: ['Tagalog', 'Filipino', 'A1', 'language learning', 'workbook', 'Spanish speakers'],
  authors: [{ name: 'Ivan Martin Vedriel' }],
  openGraph: {
    type: 'website',
    siteName,
    title: `${siteName} — Learn Tagalog A1 step by step`,
    description:
      'A static, interactive Tagalog workbook: 36 A1 lessons, dialogues, audio, exercises and spaced review.',
  },
  twitter: {
    card: 'summary',
    title: `${siteName} — Learn Tagalog A1 step by step`,
    description:
      'A static, interactive Tagalog workbook: 36 A1 lessons, dialogues, audio, exercises and spaced review.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f1e7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
