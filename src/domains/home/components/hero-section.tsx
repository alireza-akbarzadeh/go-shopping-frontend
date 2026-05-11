'use client';

import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { IconArrowRight, IconStar } from '@tabler/icons-react';
import Link from 'next/link';
import { cn } from '~/src/lib/utils';

const floatingProducts = [
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    name: 'Premium Watch',
    price: '$299'
  },
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    name: 'Headphones',
    price: '$249'
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    name: 'Leather Bag',
    price: '$189'
  }
];

export function HeroSection() {
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden pt-20'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='bg-accent/10 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl' />
        <div className='bg-accent/5 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl' />
      </div>

      <div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-center lg:text-left'
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className='bg-secondary text-secondary-foreground mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium'
            >
              <span className='relative flex h-2 w-2'>
                <span className='bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' />
                <span className='bg-accent relative inline-flex h-2 w-2 rounded-full' />
              </span>
              New Collection 2026
            </motion.div>

            {/* Headline */}
            <h1 className='text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-7xl'>
              Discover
              <br />
              <span className='text-muted-foreground'>Timeless</span>
              <br />
              Elegance
            </h1>

            <p className='text-muted-foreground mx-auto mt-6 max-w-lg text-lg leading-relaxed lg:mx-0'>
              Curated collection of premium products designed for those who appreciate the finer
              things in life.
            </p>

            {/* CTA Buttons */}
            <div className='mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
              <Link
                href='/shop'
                className={cn(
                  buttonVariants({
                    className: 'group h-14 rounded-full px-8 text-base font-medium',
                    size: 'lg'
                  })
                )}
              >
                <>
                  Shop Collection
                  <IconArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </>
              </Link>
              <Button
                variant='outline'
                size='lg'
                className='h-14 rounded-full px-8 text-base font-medium'
              >
                View Lookbook
              </Button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='mt-12 flex items-center justify-center gap-8 lg:justify-start'
            >
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className='fill-accent text-accent h-4 w-4' />
                ))}
                <span className='text-muted-foreground ml-2 text-sm'>4.9/5 (2,847 reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Product Cards */}
          <div className='relative hidden h-[500px] md:block lg:h-[600px]'>
            {floatingProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  ease: 'easeOut'
                }}
                className={`absolute ${
                  index === 0
                    ? 'top-0 right-0 lg:right-12'
                    : index === 1
                      ? 'top-1/3 left-0'
                      : 'right-1/4 bottom-0'
                }`}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className='group cursor-pointer'
                >
                  <div className='bg-card border-border/50 relative rounded-3xl border p-4 shadow-xl backdrop-blur-sm'>
                    <div className='bg-secondary relative h-40 w-40 overflow-hidden rounded-2xl lg:h-48 lg:w-48'>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    </div>
                    <div className='mt-3 px-1'>
                      <p className='text-sm font-medium'>{product.name}</p>
                      <p className='text-accent font-semibold'>{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className='border-border/30 absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border'
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className='border-border/20 absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border'
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2'
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className='border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2'
        >
          <motion.div className='bg-muted-foreground/50 mt-2 h-3 w-1.5 rounded-full' />
        </motion.div>
      </motion.div>
    </section>
  );
}
