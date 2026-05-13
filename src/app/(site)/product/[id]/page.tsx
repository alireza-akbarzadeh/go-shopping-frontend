import ProductDomain from '@/domains/product/product.domain';
import { getQueryClient } from '@/lib/query-clinet';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {
  getGetProductsIdQueryKey,
  useGetProductsIdQueryOptions
} from '~/src/services/endpoints/products';

interface ProductPagePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPagePageProps) {
  const { params } = props;
  const queryClient = getQueryClient();
  const { id } = await params;

  const queryOptions = useGetProductsIdQueryOptions(id);
  await queryClient.prefetchQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDomain productId={id} />;
    </HydrationBoundary>
  );
}
