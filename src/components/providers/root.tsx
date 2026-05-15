'use client';
import type { PropsWithChildren } from 'react';

import TanstackQueryProvider from './client/tanstack-query';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ThemeProvider from './client/theme';
import { Direction } from '../ui/direction';

type TRootProvider = Readonly<PropsWithChildren>;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <ThemeProvider>
      <Direction defaultDir='ltr'>
        <NuqsAdapter>
          <Toaster />
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </NuqsAdapter>
      </Direction>
    </ThemeProvider>
  );
}
