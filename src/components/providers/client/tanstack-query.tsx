'use client';

import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '~/src/lib/query-clinet';

type TTanstackQueryProvider = Readonly<PropsWithChildren>;

export default function TanstackQueryProvider({ children }: TTanstackQueryProvider) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
