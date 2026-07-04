import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Inter_Tight } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { PostHogProvider } from '@/components/providers/posthog-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://optumusanalytics.com'),
  title: {
    default: 'Optumus Analytics',
    template: '%s | Optumus Analytics',
  },
  description:
    'Track your visibility across ChatGPT, Claude, Gemini, Google AI Overviews, Google AI Mode, Perplexity, Grok, and Copilot with AI Search & LLM Visibility intelligence.',
  openGraph: {
    title: 'Optumus Analytics',
    description:
      'Monitor AI Search & LLM Visibility with enterprise-grade visibility scoring, competitor intelligence, and content opportunities.',
    url: '/',
    siteName: 'Optumus Analytics',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optumus Analytics',
    description:
      'Monitor AI Search & LLM Visibility with enterprise-grade visibility scoring, competitor intelligence, and content opportunities.',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${interTight.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased">
        <PostHogProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
