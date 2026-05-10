import { IconHeart } from '@tabler/icons-react';
import { mockWishlist } from '../data';
import { Button } from '@/components/ui/button';

export function AccountWhishlist() {
  return (
    <div>
      <h2 className='mb-4 text-xl font-semibold'>My Wishlist</h2>
      <div className='grid grid-cols-3 gap-4'>
        {mockWishlist.map((item) => (
          <div
            key={item.id}
            className='bg-card border-border group overflow-hidden rounded-xl border'
          >
            <div className='relative aspect-square overflow-hidden'>
              <img
                src={item.image}
                alt={item.name}
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <button className='bg-background/80 absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-red-500 backdrop-blur transition-colors hover:bg-red-500 hover:text-white'>
                <IconHeart className='h-4 w-4 fill-current' />
              </button>
            </div>
            <div className='p-4'>
              <h3 className='font-medium'>{item.name}</h3>
              <p className='text-accent font-semibold'>${item.price.toFixed(2)}</p>
              <Button size='sm' className='mt-3 w-full'>
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
