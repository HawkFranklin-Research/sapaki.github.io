import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sapaki.github.io'),
  title: 'Sapaki — Europe’s route into the robot age',
  description: 'The investor story for Europe’s independent robot distribution, approval and service platform.',
  openGraph: {
    title: 'Sapaki — Europe’s route into the robot age',
    description: 'Distribution · Approval · Service for the next generation of robots in Europe.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Sapaki — Europe’s route into the robot age' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapaki — Europe’s route into the robot age',
    description: 'Distribution · Approval · Service for the next generation of robots in Europe.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
