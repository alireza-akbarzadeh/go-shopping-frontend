'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { products } from '@/lib/data';
import { useCart } from '~/src/store/card.store';
import {
  IconArrowRight,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconRotateClockwise,
  IconShieldCheck,
  IconTag,
  IconTruck,
  IconX
} from '@tabler/icons-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = getSubtotal();
  const productDiscount = getDiscount();
  const shipping = getTotal() > 100 ? 0 : 12;
  const total = getTotal() - promoDiscount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'luxe10') {
      setPromoDiscount(getTotal() * 0.1);
      setPromoApplied(true);
    }
  };

  const suggestedProducts = products.slice(0, 4);

  return (
    <div className='bg-background min-h-screen'>
      <Navbar />

      <main className='pt-24 pb-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <nav className='text-muted-foreground mb-8 flex items-center gap-2 text-sm'>
            <Link href='/' className='hover:text-foreground transition-colors'>
              Home
            </Link>
            <IconChevronRight className='h-4 w-4' />
            <span className='text-foreground'>Shopping Cart</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-8 text-3xl font-bold md:text-4xl'
          >
            Shopping Cart
          </motion.h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='py-16 text-center'
            >
              <div className='bg-muted/50 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full'>
                <IconChevronRight className='text-muted-foreground h-12 w-12' />
              </div>
              <h2 className='mb-2 text-2xl font-semibold'>Your cart is empty</h2>
              <p className='text-muted-foreground mx-auto mb-8 max-w-md'>
                Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill
                it up!
              </p>
              <Link href='/shop'>
                <Button size='lg' className='rounded-full px-8'>
                  Continue Shopping
                  <IconChevronRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className='grid gap-8 lg:grid-cols-3 lg:gap-12'>
              {/* Cart Items */}
              <div className='space-y-4 lg:col-span-2'>
                <div className='mb-4 flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                  </span>
                  <Link href='/shop' className='text-accent text-sm font-medium hover:underline'>
                    Continue Shopping
                  </Link>
                </div>

                <AnimatePresence mode='popLayout'>
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      className='bg-card border-border/50 flex gap-4 rounded-2xl border p-4'
                    >
                      {/* Product Image */}
                      <Link href={`/product/${item.id}`} className='shrink-0'>
                        <div className='bg-muted relative h-24 w-24 overflow-hidden rounded-xl sm:h-32 sm:w-32'>
                          <Image src={item.image} alt={item.name} fill className='object-cover' />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-start justify-between gap-2'>
                          <div>
                            <Link
                              href={`/product/${item.id}`}
                              className='hover:text-accent line-clamp-1 font-semibold transition-colors'
                            >
                              {item.name}
                            </Link>
                            <div className='text-muted-foreground mt-1 flex items-center gap-2 text-sm'>
                              {item.color && <span>Color: {item.color}</span>}
                              {item.color && item.size && <span>/</span>}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                          </div>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-muted-foreground hover:text-destructive h-8 w-8 shrink-0 rounded-full'
                            onClick={() => removeItem(item.id, item.color, item.size)}
                          >
                            <IconX className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='mt-4 flex items-end justify-between'>
                          {/* Quantity */}
                          <div className='flex items-center gap-2'>
                            <Button
                              variant='outline'
                              size='icon'
                              className='h-8 w-8 rounded-full'
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1, item.color, item.size)
                              }
                            >
                              <IconMinus className='h-3 w-3' />
                            </Button>
                            <span className='w-8 text-center font-medium'>{item.quantity}</span>
                            <Button
                              variant='outline'
                              size='icon'
                              className='h-8 w-8 rounded-full'
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1, item.color, item.size)
                              }
                            >
                              <IconPlus className='h-3 w-3' />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className='text-right'>
                            <p className='font-semibold'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <p className='text-muted-foreground text-sm line-through'>
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Suggested Products */}
                <div className='mt-12'>
                  <h3 className='mb-4 text-lg font-semibold'>You might also like</h3>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {suggestedProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.id}`} className='group'>
                        <div className='bg-muted relative mb-2 aspect-square overflow-hidden rounded-xl'>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className='object-cover transition-transform duration-300 group-hover:scale-105'
                          />
                        </div>
                        <p className='group-hover:text-accent line-clamp-1 text-sm font-medium transition-colors'>
                          {product.name}
                        </p>
                        <p className='text-muted-foreground text-sm'>${product.price}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className='lg:col-span-1'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='bg-card border-border/50 sticky top-24 rounded-2xl border p-6'
                >
                  <h2 className='mb-4 text-lg font-semibold'>Order Summary</h2>

                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {productDiscount > 0 && (
                      <div className='flex justify-between text-green-600'>
                        <span>Product Discount</span>
                        <span>-${productDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className='flex justify-between text-green-600'>
                        <span>Promo Code (LUXE10)</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className='text-green-600'>Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator className='my-4' />

                  {/* Promo Code */}
                  <div className='mb-4'>
                    <label className='mb-2 block text-sm font-medium'>Promo Code</label>
                    <div className='flex gap-2'>
                      <div className='relative flex-1'>
                        <IconTag className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                        <Input
                          placeholder='Enter code'
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className='rounded-full pl-9'
                          disabled={promoApplied}
                        />
                      </div>
                      <Button
                        variant='outline'
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className='rounded-full'
                      >
                        {promoApplied ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                    <p className='text-muted-foreground mt-1 text-xs'>
                      Try &quot;LUXE10&quot; for 10% off
                    </p>
                  </div>

                  <Separator className='my-4' />

                  <div className='mb-6 flex items-center justify-between'>
                    <span className='font-semibold'>Total</span>
                    <span className='text-2xl font-bold'>${total.toFixed(2)}</span>
                  </div>

                  <Link href='/checkout' className='block'>
                    <Button className='w-full rounded-full' size='lg'>
                      Proceed to Checkout
                      <IconArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className='mt-6 grid grid-cols-3 gap-2'>
                    <div className='p-2 text-center'>
                      <IconTruck className='text-muted-foreground mx-auto mb-1 h-5 w-5' />
                      <p className='text-muted-foreground text-xs'>Free Shipping</p>
                    </div>
                    <div className='p-2 text-center'>
                      <IconShieldCheck className='text-muted-foreground mx-auto mb-1 h-5 w-5' />
                      <p className='text-muted-foreground text-xs'>Secure Pay</p>
                    </div>
                    <div className='p-2 text-center'>
                      <IconRotateClockwise className='text-muted-foreground mx-auto mb-1 h-5 w-5' />
                      <p className='text-muted-foreground text-xs'>30-Day Return</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
