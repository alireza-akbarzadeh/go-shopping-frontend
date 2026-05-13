import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { ModelsProduct } from '~/src/services/models';
import Link from 'next/link';
import { IconHeart, IconShoppingBag, IconStar } from '@tabler/icons-react';
import { useCartStore } from '~/src/store/card.store';

interface ProductCardProps {
  product: ModelsProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id as number,
      name: product.name,
      price: product.price,
      originalPrice: product.price,
      image: product.images?.[0] || ''
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className='group block'>
        <div className='bg-muted relative aspect-4/5 overflow-hidden rounded-xl'>
          <img
            src={product?.images?.[0]}
            alt={product.name}
            loading='lazy'
            className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />

          <div className='absolute top-3 left-3 flex flex-col gap-1.5'>
            {product.is_new && (
              <Badge className='bg-foreground text-background hover:bg-foreground'>New</Badge>
            )}
            {product.price && (
              <Badge
                variant='outline'
                className='border-accent bg-background/90 text-accent backdrop-blur'
              >
                -{Math.round(((product.price - product.price) / product.price) * 100)}%
              </Badge>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast('Saved to wishlist');
            }}
            aria-label='Save to wishlist'
            className='bg-background/80 hover:bg-background absolute top-3 right-3 rounded-full p-2 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100'
          >
            <IconHeart className='h-4 w-4' />
          </button>

          <div className='absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
            <Button onClick={handleQuickAdd} className='w-full gap-2 shadow-lg' size='sm'>
              <IconShoppingBag className='h-4 w-4' />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className='mt-4 space-y-1.5'>
          <p className='text-muted-foreground text-xs tracking-widest uppercase'>
            {product.category?.name}
          </p>
          <h3 className='font-display group-hover:text-accent text-lg leading-tight transition-colors'>
            {product.name}
          </h3>
          <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
            <IconStar className='fill-foreground text-foreground h-3.5 w-3.5' />
            <span>{product.rating}</span>
            <span>· {product.reviews_count} reviews</span>
          </div>
          <div className='flex items-baseline gap-2 pt-1'>
            <span className='text-base font-semibold'>${product.price}</span>
            {product.price && (
              <span className='text-muted-foreground text-sm line-through'>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
