import type { PropsWithChildren } from 'react';
import { Footer } from 'react-day-picker';
import { Navbar } from '@/components/navbar';

type TRootLayout = Readonly<PropsWithChildren>;

export default function SiteLayout({ children }: TRootLayout) {
  return (
    <main className='bg-background flex min-h-screen flex-col'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
