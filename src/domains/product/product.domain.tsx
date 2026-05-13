'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  IconCheck,
  IconChevronRight,
  IconHeart,
  IconMinus,
  IconPlus,
  IconRotateClockwise,
  IconShare2,
  IconShieldCheck,
  IconShoppingBag,
  IconStar,
  IconTruck
} from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import { useCart } from '~/src/hooks/useCartController';
import RelatedProduct from './related-product';
import { useGetProductsId } from '~/src/services/-products-{id}-get';

const colors = [
  { name: 'Charcoal', value: '#333333' },
  { name: 'Cream', value: '#F5F5DC' },
  { name: 'Navy', value: '#1a365d' },
  { name: 'Cognac', value: '#8B4513' }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Exceeded my expectations',
    content: "The quality is outstanding. I've received so many compliments. Worth every dollar.",
    verified: true
  },
  {
    id: 2,
    author: 'Michael R.',
    rating: 4,
    date: '1 month ago',
    title: 'Great quality, minor issues',
    content: 'Material feels premium and the design is exactly as pictured. Shipping a touch slow.',
    verified: true
  },
  {
    id: 3,
    author: 'Emma L.',
    rating: 5,
    date: '1 month ago',
    title: 'Perfect addition to my collection',
    content: 'Craftsmanship is impeccable and it looks even better in person.',
    verified: true
  }
];

export default function ProductPage({ productId }: { productId: string }) {
  const { addItem } = useCart();

  const { data, isLoading, error } = useGetProductsId(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const product = data?.data?.product;

  if (!data?.data?.product) throw notFound();

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.id) return;

    try {
      await addItem(product.id, 1);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='text-muted-foreground flex items-center gap-1.5 text-xs'>
        <Link href='/' className='hover:text-foreground'>
          Home
        </Link>
        <IconChevronRight className='h-3 w-3' />
        <Link href='/' className='hover:text-foreground'>
          Shop
        </Link>
        <IconChevronRight className='h-3 w-3' />
        <span className='hover:text-foreground'>{product.category?.name}</span>
        <IconChevronRight className='h-3 w-3' />
        <span className='text-foreground'>{product.name}</span>
      </nav>

      {/* Main */}
      <div className='mt-6 grid gap-10 lg:grid-cols-2'>
        {/* Gallery */}
        <div className='lg:sticky lg:top-32 lg:self-start'>
          <div className='bg-muted relative aspect-4/5 overflow-hidden rounded-2xl'>
            <AnimatePresence mode='wait'>
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product?.images?.[selectedImage]}
                alt={product.name}
                className='h-full w-full object-cover'
              />
            </AnimatePresence>

            <div className='absolute top-4 left-4 flex flex-col gap-2'>
              {product.is_new && (
                <Badge className='bg-foreground text-background'>New Arrival</Badge>
              )}
              {discount > 0 && (
                <Badge className='bg-accent text-accent-foreground'>-{discount}% Off</Badge>
              )}
            </div>

            <button
              onClick={() => toast('Link copied')}
              className='bg-background/85 hover:bg-background absolute top-4 right-4 rounded-full p-2.5 backdrop-blur transition'
            >
              <IconShare2 className='h-4 w-4' />
            </button>
          </div>

          <div className='mt-4 grid grid-cols-4 gap-3'>
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                  selectedImage === i ? 'border-accent' : 'hover:border-border border-transparent'
                }`}
              >
                <img src={img} alt='' className='h-full w-full object-cover' />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className='flex flex-col gap-6'>
          <div>
            <p className='text-muted-foreground text-xs tracking-widest uppercase'>
              {product.category?.name}
            </p>
            <h1 className='font-display mt-2 text-3xl leading-tight md:text-4xl'>{product.name}</h1>

            <div className='mt-3 flex items-center gap-3'>
              <div className='flex items-center'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating || 0)
                        ? 'fill-foreground text-foreground'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                ))}
              </div>
              <p className='text-muted-foreground text-sm'>
                {product.rating} · {product.reviews_count} reviews
              </p>
            </div>

            <div className='mt-4 flex items-baseline gap-3'>
              <span className='text-3xl font-semibold'>${product.price}</span>
              {product.compare_at_price && (
                <>
                  <span className='text-muted-foreground text-lg line-through'>
                    ${product.compare_at_price}
                  </span>
                  <Badge variant='outline' className='border-accent text-accent'>
                    Save ${product.compare_at_price - product.price}
                  </Badge>
                </>
              )}
            </div>
          </div>

          <p className='text-muted-foreground text-base'>{product.description}</p>

          <Separator />

          {/* Color */}
          <div>
            <div className='mb-3 flex items-center justify-between'>
              <p className='text-sm font-medium'>Color</p>
              <p className='text-muted-foreground text-sm'>{selectedColor?.name}</p>
            </div>
            <div className='flex gap-2.5'>
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                    selectedColor?.name === color.name
                      ? 'border-accent scale-110'
                      : 'border-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor?.name === color.name && (
                    <IconCheck className='text-background absolute inset-0 m-auto h-4 w-4 mix-blend-difference' />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className='mb-3 flex items-center justify-between'>
              <p className='text-sm font-medium'>Size</p>
              <button className='text-accent text-xs hover:underline'>Size guide</button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 min-w-11 rounded-md border px-4 text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className='mb-3 text-sm font-medium'>Quantity</p>
            <div className='flex items-center gap-4'>
              <div className='border-border flex items-center rounded-full border'>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='hover:bg-secondary rounded-l-full p-3'
                >
                  <IconMinus className='h-4 w-4' />
                </button>
                <span className='w-10 text-center text-sm font-medium'>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className='hover:bg-secondary rounded-r-full p-3'
                >
                  <IconPlus className='h-4 w-4' />
                </button>
              </div>
              <p className='text-muted-foreground text-xs'>Only 12 left in stock</p>
            </div>
          </div>

          {/* CTAs */}
          <div className='flex gap-2'>
            <Button onClick={handleAdd} size='lg' className='flex-1 gap-2'>
              {true ? (
                <>
                  <IconCheck className='h-4 w-4' /> Added to cart
                </>
              ) : (
                <>
                  <IconShoppingBag className='h-4 w-4' /> Add to cart · $
                  {(product?.price * quantity).toFixed(2)}
                </>
              )}
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={() => setWishlisted(!wishlisted)}
              aria-label='Wishlist'
            >
              <IconHeart className={`h-4 w-4 ${wishlisted ? 'fill-accent text-accent' : ''}`} />
            </Button>
          </div>

          {/* Trust badges */}
          <div className='border-border bg-secondary/40 grid grid-cols-3 gap-2 rounded-xl border p-4'>
            {[
              [IconTruck, 'Free shipping'],
              [IconShieldCheck, '2-year warranty'],
              [IconRotateClockwise, '30-day returns']
            ].map(([Icon, label]) => {
              const I = Icon as typeof IconTruck;
              return (
                <div
                  key={label as string}
                  className='flex flex-col items-center gap-1.5 text-center'
                >
                  <I className='text-accent h-5 w-5' />
                  <p className='text-xs'>{label as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mt-20'>
        <Tabs defaultValue='description'>
          <TabsList className='border-border h-auto w-full justify-start gap-2 rounded-none border-b bg-transparent p-0'>
            {[
              ['description', 'Description'],
              ['specs', 'Specifications'],
              ['reviews', `Reviews (${product.reviews_count})`]
            ].map(([v, l]) => (
              <TabsTrigger
                key={v}
                value={v || ''}
                className='data-[state=active]:border-foreground rounded-none border-b-2 border-transparent bg-transparent px-4 pt-2 pb-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
              >
                {l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value='description'
            className='text-muted-foreground mt-8 max-w-3xl space-y-4'
          >
            <p>{product.description}</p>
            <p>
              Crafted with meticulous attention to detail, this product represents the pinnacle of
              modern design and functionality. Each piece undergoes rigorous quality control.
            </p>
            <h3 className='font-display text-foreground mt-6 text-xl'>Key features</h3>
            <ul className='space-y-2'>
              {[
                'Premium materials sourced from trusted suppliers',
                'Designed for durability and everyday use',
                'Timeless aesthetic that complements any wardrobe',
                'Eco-friendly packaging and sustainable practices'
              ].map((f) => (
                <li key={f} className='flex gap-2'>
                  <IconCheck className='text-accent mt-0.5 h-4 w-4' />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value='specs' className='mt-8 max-w-3xl'>
            <dl className='divide-border divide-y'>
              {[
                ['SKU', `LUX-${product?.id?.toString().padStart(4, '0')}`],
                ['Category', product.category],
                ['Material', 'Premium quality blend'],
                ['Weight', '0.5 kg'],
                ['Dimensions', '10" x 8" x 4"'],
                ['Origin', 'Italy']
              ].map(([k, v]) => (
                <div key={k} className='flex justify-between py-3 text-sm'>
                  <dt className='text-muted-foreground'>{k}</dt>
                  <dd className='font-medium'>{v}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>

          <TabsContent value='reviews' className='mt-8 grid gap-10 lg:grid-cols-[280px_1fr]'>
            <div>
              <p className='font-display text-5xl'>{product.rating}</p>
              <div className='mt-2 flex'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating || 0)
                        ? 'fill-foreground text-foreground'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                ))}
              </div>
              <p className='text-muted-foreground mt-2 text-sm'>
                Based on {product.reviews_count} reviews
              </p>
              <div className='mt-6 space-y-1.5'>
                {[5, 4, 3, 2, 1].map((stars) => {
                  const pct =
                    stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                  return (
                    <div key={stars} className='flex items-center gap-2 text-xs'>
                      <span className='text-muted-foreground w-12'>{stars} star</span>
                      <div className='bg-muted h-1.5 flex-1 overflow-hidden rounded-full'>
                        <div className='bg-foreground h-full' style={{ width: `${pct}%` }} />
                      </div>
                      <span className='text-muted-foreground w-8 text-right'>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ul className='space-y-6'>
              {reviews.map((r) => (
                <li key={r.id} className='border-border border-b pb-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>{r.author}</p>
                      {r.verified && (
                        <Badge variant='outline' className='gap-1 text-[10px]'>
                          <IconCheck className='h-2.5 w-2.5' /> Verified
                        </Badge>
                      )}
                    </div>
                    <p className='text-muted-foreground text-xs'>{r.date}</p>
                  </div>
                  <div className='mt-2 flex'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < r.rating
                            ? 'fill-foreground text-foreground'
                            : 'text-muted-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                  <p className='mt-2 font-medium'>{r.title}</p>
                  <p className='text-muted-foreground mt-1 text-sm'>{r.content}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
      {/* Related */}
      <RelatedProduct />
    </div>
  );
}
