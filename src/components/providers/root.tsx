import type { PropsWithChildren } from 'react';

import TanstackQueryProvider from './client/tanstack-query';
import ThemeProvider from './client/theme';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

type TRootProvider = Readonly<PropsWithChildren>;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <ThemeProvider>
      <Toaster />
      <NuqsAdapter>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
