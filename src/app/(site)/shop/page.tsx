import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '~/src/lib/query-clinet';
import { getGetProductsQueryOptions } from '~/src/services/-products-get';
import { ShopDomain } from '~/src/domains/shop/shop.domain';

export default async function ShopPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getGetProductsQueryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopDomain />
    </HydrationBoundary>
  );
}
