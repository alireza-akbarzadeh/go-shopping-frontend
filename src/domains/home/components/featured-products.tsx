'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IconHeart, IconShoppingCart, IconStar } from '@tabler/icons-react';
import type { GetProductsParams } from '~/src/services/-products-get.schemas';
import { useGetProducts } from '~/src/services/-products-get';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function FeaturedProducts() {
  const params: GetProductsParams = {
    limit: 8,
    offset: 1,
    status: 'active'
  };
  const { push } = useRouter();

  const { data, isLoading, error } = useGetProducts(params);

  if (isLoading) {
    return (
      <section className='py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 text-center'>Loading featured products...</div>
      </section>
    );
  }

  if (error || !data?.data?.products) {
    return (
      <section className='py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 text-center text-red-500'>
          Failed to load products. Please try again later.
        </div>
      </section>
    );
  }

  const products = data?.data?.products || [];

  if (products.length === 0) {
    return (
      <section className='py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 text-center'>No products found.</div>
      </section>
    );
  }
  return (
    <section id='products' className='py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <span className='text-accent text-sm font-medium tracking-wider uppercase'>
            Curated Selection
          </span>
          <h2 className='mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl'>
            Featured Products
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
            Discover our handpicked collection of premium items, each chosen for its exceptional
            quality and timeless design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'
        >
          {products.map((product) => (
            <motion.div key={product?.items?.id} variants={itemVariants} className='group'>
              <div className='bg-card border-border/50 hover:border-border relative overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-xl'>
                {/* Product Image */}
                <div
                  className='bg-secondary relative aspect-square cursor-pointer overflow-hidden'
                  onClick={() => push(`/product/${product?.items?.id}`)}
                >
                  <Image
                    src={product?.items?.images?.[0] as string}
                    alt={product.items?.name || ''}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />

                  {/* Badges */}
                  {product?.items?.is_new && (
                    <span className='bg-accent text-accent-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium'>
                      New
                    </span>
                  )}
                  {/* Wishlist Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className='bg-background/80 absolute top-3 right-3 rounded-full p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100'
                  >
                    <IconHeart className='h-4 w-4' />
                  </motion.button>

                  {/* Quick Add Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    className='from-background/90 absolute right-0 bottom-0 left-0 bg-linear-to-t to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                  >
                    <Button size='sm' className='w-full gap-2 rounded-full'>
                      <IconShoppingCart className='h-4 w-4' />
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className='p-4'>
                  <span className='text-muted-foreground text-xs tracking-wider uppercase'>
                    {product.items?.category?.name}
                  </span>
                  <h3 className='mt-1 line-clamp-1 text-sm font-medium'>{product.items?.name}</h3>

                  {/* Rating */}
                  <div className='mt-2 flex items-center gap-1'>
                    <IconStar className='fill-accent text-accent h-3 w-3' />
                    <span className='text-muted-foreground text-xs'>
                      {product.items?.rating} ({product.items?.reviews_count}){4} ({60})
                    </span>
                  </div>

                  {/* Price */}
                  <div className='mt-2 flex items-center gap-2'>
                    <span className='font-semibold'>${product.items?.price?.toFixed(2)}</span>
                    {product.items?.compare_at_price &&
                      product.items?.compare_at_price > product.items?.price && (
                        <span className='text-muted-foreground text-sm line-through'>
                          ${product.items?.compare_at_price.toFixed(2)}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='mt-16 text-center'
        >
          <Button variant='outline' size='lg' className='rounded-full px-8'>
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
