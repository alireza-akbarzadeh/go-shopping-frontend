import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '../store/card.store';
import { IconMinus, IconPlus, IconShoppingBag, IconTrash } from '@tabler/icons-react';

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, getSubtotal, getDiscount, getTotal } =
    useCartStore();

  const newLocal = 'bg-muted h-24 w-20 flex-shrink-0 overflow-hidden rounded-md';
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className='flex w-full flex-col gap-0 p-0 sm:max-w-md'>
        <SheetHeader className='border-border border-b px-6 py-5'>
          <SheetTitle className='font-display text-xl'>
            Your Bag · {items.reduce((s, i) => s + i.quantity, 0)}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center'>
            <div className='bg-secondary rounded-full p-5'>
              <IconShoppingBag className='text-muted-foreground h-7 w-7' />
            </div>
            <p className='font-display text-lg'>Your bag is empty</p>
            <p className='text-muted-foreground text-sm'>
              Discover pieces designed to last a decade.
            </p>
            <Button onClick={() => setOpen(false)} className='mt-2'>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className='flex-1 overflow-y-auto px-6 py-4'>
              <ul className='divide-border divide-y'>
                {items.map((item) => (
                  <li key={`${item.id}-${item.color}-${item.size}`} className='flex gap-4 py-4'>
                    <div className={newLocal}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex flex-1 flex-col'>
                      <div className='flex items-start justify-between gap-2'>
                        <div>
                          <p className='leading-tight font-medium'>{item.name}</p>
                          <p className='text-muted-foreground mt-0.5 text-xs'>
                            {[item.color, item.size].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className='text-muted-foreground hover:text-destructive transition-colors'
                          aria-label='Remove'
                        >
                          <IconTrash className='h-4 w-4' />
                        </button>
                      </div>
                      <div className='mt-auto flex items-center justify-between'>
                        <div className='border-border flex items-center rounded-full border'>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1, item.color, item.size)
                            }
                            className='hover:bg-secondary rounded-l-full p-1.5'
                          >
                            <IconMinus className='h-3 w-3' />
                          </button>
                          <span className='w-7 text-center text-sm'>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1, item.color, item.size)
                            }
                            className='hover:bg-secondary rounded-r-full p-1.5'
                          >
                            <IconPlus className='h-3 w-3' />
                          </button>
                        </div>
                        <p className='text-sm font-semibold'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className='border-border bg-secondary/50 border-t p-6'>
              <div className='w-full space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Discount</span>
                    <span className='text-accent'>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}
                <Separator className='my-2' />
                <div className='flex justify-between text-base font-semibold'>
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <p className='text-muted-foreground text-xs'>Shipping calculated at checkout.</p>
                <Button className='mt-3 w-full' size='lg'>
                  Checkout
                </Button>
                <Button variant='ghost' className='w-full' onClick={() => setOpen(false)}>
                  Continue shopping
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
