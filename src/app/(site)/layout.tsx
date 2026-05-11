import type { PropsWithChildren } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

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
