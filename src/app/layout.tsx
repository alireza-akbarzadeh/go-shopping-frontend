import '../styles/globals.css';
import '../styles/globals.scss';

import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import config from '~/_config';
import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google';

import RootProvider from '@/components/providers/root';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

const nunitoSans = Nunito_Sans({ variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  icons: '/favicon.svg',
  manifest: '/app.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#000'
};

type TRootLayout = Readonly<PropsWithChildren>;

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang='en' className={nunitoSans.variable} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootProvider>
          <main className='min-h-screen bg-background flex flex-col'>
            <Navbar />
            {children}
            <Footer />
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
