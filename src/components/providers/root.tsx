import type { PropsWithChildren } from 'react';

import TanstackQueryProvider from './client/tanstack-query';
import ThemeProvider from './client/theme';
import { Toaster } from '@/components/ui/sonner';

type TRootProvider = Readonly<PropsWithChildren>;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <div>
      <Toaster />
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </div>
  );
}
