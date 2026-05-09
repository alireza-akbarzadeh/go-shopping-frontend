'use client';

import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/data';
import {
  IconCheck,
  IconChevronRight,
  IconHeart,
  IconMinus,
  IconPlus,
  IconRotateClockwise,
  IconShare2,
  IconShield,
  IconShoppingCart,
  IconStar,
  IconTruck
} from '@tabler/icons-react';
import { ProductCard } from '~/src/domains/shop/components/prodcut-card';
import { useCart } from '~/src/store/card.store';

const colors = [
  { name: 'Charcoal', value: '#333333' },
  { name: 'Cream', value: '#F5F5DC' },
  { name: 'Navy', value: '#1a365d' },
  { name: 'Brown', value: '#8B4513' }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Exceeded my expectations',
    content:
      "The quality is outstanding. I've received so many compliments on this product. Definitely worth the investment.",
    verified: true
  },
  {
    id: 2,
    author: 'Michael R.',
    rating: 4,
    date: '1 month ago',
    title: 'Great quality, minor issues',
    content:
      'Overall very happy with the purchase. The material feels premium and the design is exactly as pictured. Shipping took a bit longer than expected.',
    verified: true
  },
  {
    id: 3,
    author: 'Emma L.',
    rating: 5,
    date: '1 month ago',
    title: 'Perfect addition to my collection',
    content:
      "I've been looking for something like this for a while. The craftsmanship is impeccable and it looks even better in person.",
    verified: true
  }
];

export default function ProductDomain() {
  const params = useParams();
  const productId = Number(params['id']);
  const product = products.find((p) => p.id === productId);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    notFound();
  }

  // Generate additional images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    product.image.replace('w=600', 'w=601'),
    product.image.replace('w=600', 'w=602'),
    product.image.replace('w=600', 'w=603')
  ];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: selectedColor?.name,
      size: selectedSize || undefined,
      quantity
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <main className='container mx-auto mt-20 px-4 py-8 lg:py-12'>
        <div className=''>
          <div className='container mx-auto px-4 py-4'>
            <nav className='flex items-center gap-2 text-sm'>
              <Link
                href='/'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Home
              </Link>
              <IconChevronRight className='text-muted-foreground h-4 w-4' />
              <Link
                href='/shop'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Shop
              </Link>
              <IconChevronRight className='text-muted-foreground h-4 w-4' />
              <Link
                href={`/shop?category=${product.category}`}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                {product.category}
              </Link>
              <IconChevronRight className='text-muted-foreground h-4 w-4' />
              <span className='text-foreground font-medium'>{product.name}</span>
            </nav>
          </div>
        </div>
        {/* Product Section */}
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-4'
          >
            {/* Main Image */}
            <div className='bg-secondary relative aspect-square overflow-hidden rounded-2xl'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='relative h-full w-full'
                >
                  <Image
                    src={productImages[selectedImage] || ''}
                    alt={product.name}
                    fill
                    className='object-cover'
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className='absolute top-4 left-4 flex flex-col gap-2'>
                {product.isNew && (
                  <Badge className='bg-accent text-accent-foreground'>New Arrival</Badge>
                )}
                {discount > 0 && <Badge variant='destructive'>-{discount}% Off</Badge>}
              </div>

              {/* Share Button */}
              <button className='bg-background/80 hover:bg-background absolute top-4 right-4 rounded-full p-3 backdrop-blur-sm transition-colors'>
                <IconShare2 className='h-5 w-5' />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className='flex gap-3'>
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-accent'
                      : 'hover:border-border border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='space-y-6'
          >
            {/* Category & Title */}
            <div>
              <p className='text-muted-foreground mb-2 text-sm tracking-wider uppercase'>
                {product.category}
              </p>
              <h1 className='text-3xl font-bold text-balance lg:text-4xl'>{product.name}</h1>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <IconStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className='text-muted-foreground text-sm'>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold'>${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className='text-muted-foreground text-xl line-through'>
                    ${product.originalPrice}
                  </span>
                  <Badge variant='secondary' className='text-accent'>
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className='text-muted-foreground leading-relaxed'>{product.description}</p>

            {/* Color Selection */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='font-medium'>Color</span>
                <span className='text-muted-foreground text-sm'>{selectedColor?.name}</span>
              </div>
              <div className='flex gap-3'>
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-accent scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <IconCheck className='absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md' />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='font-medium'>Size</span>
                <button className='text-accent text-sm hover:underline'>Size Guide</button>
              </div>
              <div className='flex gap-2'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-12 rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className='space-y-3'>
              <span className='font-medium'>Quantity</span>
              <div className='flex items-center gap-4'>
                <div className='border-border flex items-center rounded-lg border'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='hover:bg-secondary rounded-l-lg p-3 transition-colors'
                  >
                    <IconMinus className='h-4 w-4' />
                  </button>
                  <span className='w-12 text-center font-medium'>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='hover:bg-secondary rounded-r-lg p-3 transition-colors'
                  >
                    <IconPlus className='h-4 w-4' />
                  </button>
                </div>
                <span className='text-muted-foreground text-sm'>Only 12 items left</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 pt-4'>
              <Button
                size='lg'
                className='h-14 flex-1 gap-2 rounded-full text-base'
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <IconCheck className='h-5 w-5' />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <IconShoppingCart className='h-5 w-5' />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size='lg'
                variant='outline'
                className={`h-14 w-14 rounded-full p-0 ${
                  isWishlisted ? 'border-red-500 text-red-500' : ''
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <IconHeart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className='border-border grid grid-cols-3 gap-4 border-t pt-6'>
              <div className='flex flex-col items-center gap-2 text-center'>
                <div className='bg-secondary rounded-full p-3'>
                  <IconTruck className='h-5 w-5' />
                </div>
                <span className='text-muted-foreground text-xs'>Free Shipping</span>
              </div>
              <div className='flex flex-col items-center gap-2 text-center'>
                <div className='bg-secondary rounded-full p-3'>
                  <IconShield className='h-5 w-5' />
                </div>
                <span className='text-muted-foreground text-xs'>2-Year Warranty</span>
              </div>
              <div className='flex flex-col items-center gap-2 text-center'>
                <div className='bg-secondary rounded-full p-3'>
                  <IconRotateClockwise className='h-5 w-5' />
                </div>
                <span className='text-muted-foreground text-xs'>30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-16'
        >
          <Tabs defaultValue='description' className='w-full'>
            <TabsList className='border-border h-auto w-full justify-start rounded-none border-b bg-transparent p-0'>
              <TabsTrigger
                value='description'
                className='data-[state=active]:border-accent rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:bg-transparent'
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value='specifications'
                className='data-[state=active]:border-accent rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:bg-transparent'
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value='reviews'
                className='data-[state=active]:border-accent rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:bg-transparent'
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value='description' className='pt-8'>
              <div className='prose prose-neutral dark:prose-invert max-w-none'>
                <p className='text-muted-foreground leading-relaxed'>{product.description}</p>
                <p className='text-muted-foreground mt-4 leading-relaxed'>
                  Crafted with meticulous attention to detail, this product represents the pinnacle
                  of modern design and functionality. Each piece undergoes rigorous quality control
                  to ensure it meets our exacting standards.
                </p>
                <h3 className='mt-6 mb-3 text-lg font-semibold'>Key Features</h3>
                <ul className='text-muted-foreground space-y-2'>
                  <li>Premium materials sourced from trusted suppliers</li>
                  <li>Designed for durability and everyday use</li>
                  <li>Timeless aesthetic that complements any style</li>
                  <li>Eco-friendly packaging and sustainable practices</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value='specifications' className='pt-8'>
              <div className='grid gap-8 md:grid-cols-2'>
                <div className='space-y-4'>
                  <h3 className='font-semibold'>Product Details</h3>
                  <dl className='space-y-3'>
                    {[
                      ['SKU', `LUX-${product.id.toString().padStart(4, '0')}`],
                      ['Category', product.category],
                      ['Material', 'Premium Quality'],
                      ['Weight', '0.5 kg'],
                      ['Dimensions', '10" x 8" x 4"']
                    ].map(([label, value]) => (
                      <div key={label} className='border-border flex justify-between border-b py-2'>
                        <dt className='text-muted-foreground'>{label}</dt>
                        <dd className='font-medium'>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className='space-y-4'>
                  <h3 className='font-semibold'>Care Instructions</h3>
                  <ul className='text-muted-foreground space-y-2'>
                    <li>Clean with a soft, dry cloth</li>
                    <li>Store in a cool, dry place</li>
                    <li>Avoid direct sunlight and moisture</li>
                    <li>Handle with care to maintain finish</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='reviews' className='pt-8'>
              <div className='space-y-8'>
                {/* Review Summary */}
                <div className='border-border flex flex-col gap-8 border-b pb-8 md:flex-row'>
                  <div className='text-center md:text-left'>
                    <div className='text-5xl font-bold'>{product.rating}</div>
                    <div className='mt-2 flex items-center justify-center gap-1 md:justify-start'>
                      {[...Array(5)].map((_, i) => (
                        <IconStar
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-accent text-accent'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                  <div className='flex-1 space-y-2'>
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage =
                        stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className='flex items-center gap-3'>
                          <span className='w-12 text-sm'>{stars} stars</span>
                          <div className='bg-secondary h-2 flex-1 overflow-hidden rounded-full'>
                            <div
                              className='bg-accent h-full rounded-full'
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className='text-muted-foreground w-12 text-sm'>{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className='space-y-6'>
                  {reviews.map((review) => (
                    <div key={review.id} className='bg-card border-border rounded-xl border p-6'>
                      <div className='mb-3 flex items-start justify-between'>
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>{review.author}</span>
                            {review.verified && (
                              <Badge variant='secondary' className='gap-1 text-xs'>
                                <IconCheck className='h-3 w-3' />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className='text-muted-foreground text-sm'>{review.date}</p>
                        </div>
                        <div className='flex gap-0.5'>
                          {[...Array(5)].map((_, i) => (
                            <IconStar
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-accent text-accent'
                                  : 'fill-muted text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className='mb-2 font-medium'>{review.title}</h4>
                      <p className='text-muted-foreground'>{review.content}</p>
                    </div>
                  ))}
                </div>

                <Button variant='outline' className='w-full'>
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mt-20'
          >
            <div className='mb-8 flex items-center justify-between'>
              <h2 className='text-2xl font-bold lg:text-3xl'>You May Also Like</h2>
              <Link
                href={`/shop?category=${product.category}`}
                className='text-accent text-sm hover:underline'
              >
                View All
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </>
  );
}
