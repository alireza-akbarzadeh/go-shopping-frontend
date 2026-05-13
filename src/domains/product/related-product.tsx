import Link from 'next/link';
import { ProductCard } from '../shop/components/prodcut-card';
import { useGetProductsIdRelated } from '~/src/services/endpoints/products';
import { useParams } from 'next/navigation';

export default function RelatedProduct() {
  const { id } = useParams();

  const { data } = useGetProductsIdRelated(Number(id));
  const hasProduct = Boolean(data?.data?.products?.length);
  return (
    <div>
      {hasProduct && (
        <section className='mt-20'>
          <div className='mb-8 flex items-end justify-between'>
            <h2 className='font-display text-2xl md:text-3xl'>You may also like</h2>
            <Link href='/' className='text-accent text-sm hover:underline'>
              View all
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4'>
            {data?.data?.products?.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
