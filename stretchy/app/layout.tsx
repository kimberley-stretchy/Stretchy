import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stretchy — Community movement classes. Price drops as the room fills.',
  description:
    'Community movement classes where the price drops as more people join. Yoga, pilates, HIIT, breathwork, run clubs — with a pricing model that rewards community.',
  openGraph: {
    title: 'Stretchy',
    description: 'The more who move together, the better value for everyone.',
    url: 'https://stretchy.social',
    siteName: 'Stretchy',
    locale: 'en_NZ',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
