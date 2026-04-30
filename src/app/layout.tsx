import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default:  'EduReach Global Foundation – Education, Aid & Opportunity',
    template: '%s | EduReach',
  },
  description: 'EduReach democratizes education and opportunity for underserved communities worldwide. Free courses, scholarships, emergency aid, and mentorship programs.',
  keywords: ['education', 'non-profit', 'scholarship', 'online courses', 'mentorship', 'aid', 'volunteer'],
  authors: [{ name: 'EduReach Foundation', url: 'https://edureach.org' }],
  creator: 'EduReach Foundation',
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://edureach.org',
    siteName:    'EduReach Global Foundation',
    title:       'EduReach – Democratizing Education & Opportunity',
    description: 'Free courses, scholarships, emergency aid, and mentorship for 12,000+ learners across 47 countries.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'EduReach Global Foundation' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@edureach',
    creator:     '@edureach',
    title:       'EduReach – Democratizing Education & Opportunity',
    description: 'Free courses, scholarships, emergency aid, and mentorship for 12,000+ learners worldwide.',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: '/manifest.json',
  icons: {
    icon:    [{ url: '/favicon.ico' }, { url: '/icon-32.png', sizes: '32x32', type: 'image/png' }],
    apple:   [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut:[{ url: '/favicon.ico' }],
  },
};

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor:   [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#080d14' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="noise-overlay">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
