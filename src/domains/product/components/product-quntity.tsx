import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { Dispatch, SetStateAction } from 'react';

interface ProductQuntityProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stock: number;
}

export default function ProductQuntity(props: ProductQuntityProps) {
  const { quantity, setQuantity, stock } = props;

  const isOutOfStock = stock <= 0;

  const increment = () => {
    if (!isOutOfStock && quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Helper text for stock info
  const stockMessage = () => {
    if (isOutOfStock) return 'Out of stock';
    if (stock === 1) return 'Only 1 left in stock';
    return `Only ${stock} left in stock`;
  };

  return (
    <div>
      <p className='mb-3 text-sm font-medium'>Quantity</p>

      {isOutOfStock ? (
        <div className='rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700'>
          <p className='font-medium'>Out of stock</p>
          <p className='text-xs'>This product is currently not available.</p>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <div className='border-border flex items-center rounded-full border'>
            <button
              onClick={decrement}
              className='hover:bg-secondary rounded-l-full p-3'
              aria-label='Decrease quantity'
            >
              <IconMinus className='h-4 w-4' />
            </button>
            <span className='w-10 text-center text-sm font-medium'>{quantity}</span>
            <button
              onClick={increment}
              className='hover:bg-secondary rounded-r-full p-3'
              aria-label='Increase quantity'
            >
              <IconPlus className='h-4 w-4' />
            </button>
          </div>
          <p className='text-muted-foreground text-xs'>{stockMessage()}</p>
        </div>
      )}
    </div>
  );
}
