'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';

export function PromoSection() {
  return (
    <section className='py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative overflow-hidden rounded-3xl'
        >
          {/* Background */}
          <div className='from-foreground via-foreground/95 to-foreground/90 absolute inset-0 bg-gradient-to-br' />

          {/* Decorative Elements */}
          <div className='bg-accent/20 absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl' />
          <div className='bg-accent/10 absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl' />

          {/* Content */}
          <div className='relative px-8 py-16 text-center lg:px-16 lg:py-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className='bg-accent/20 text-accent mb-6 inline-block rounded-full px-4 py-2 text-sm font-medium'>
                Limited Time Offer
              </span>

              <h2 className='text-primary-foreground mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-6xl'>
                Get 30% Off Your First Order
              </h2>

              <p className='text-primary-foreground/70 mx-auto mb-10 max-w-2xl text-lg'>
                Join thousands of satisfied customers and experience the Luxe difference. Use code
                WELCOME30 at checkout.
              </p>

              <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                <Button
                  size='lg'
                  className='bg-accent hover:bg-accent/90 text-accent-foreground group h-14 rounded-full px-8 text-base font-medium'
                >
                  Shop Now
                  <IconArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-14 rounded-full px-8 text-base font-medium'
                >
                  Learn More
                </Button>
              </div>

              {/* Countdown-style elements */}
              <div className='mt-12 flex flex-wrap items-center justify-center gap-8'>
                {[
                  { value: '48', label: 'Hours' },
                  { value: '23', label: 'Minutes' },
                  { value: '59', label: 'Seconds' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className='text-center'
                  >
                    <div className='text-primary-foreground text-3xl font-bold lg:text-4xl'>
                      {item.value}
                    </div>
                    <div className='text-primary-foreground/50 text-sm tracking-wider uppercase'>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
