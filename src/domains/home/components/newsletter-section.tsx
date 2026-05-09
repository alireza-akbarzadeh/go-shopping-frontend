'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className='py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative'
        >
          {/* Glassmorphism Card */}
          <div className='from-card to-secondary/50 border-border/50 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 lg:p-16'>
            {/* Background Blur */}
            <div className='bg-accent/5 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl' />
            <div className='bg-accent/10 absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl' />

            <div className='relative mx-auto max-w-2xl text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className='text-accent text-sm font-medium tracking-wider uppercase'>
                  Stay Updated
                </span>
                <h2 className='mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl'>
                  Join Our Newsletter
                </h2>
                <p className='text-muted-foreground mt-4'>
                  Be the first to know about new arrivals, exclusive offers, and style inspiration.
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className='mt-10'
              >
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='text-accent flex items-center justify-center gap-3'
                  >
                    <IconCircleCheck className='h-6 w-6' />
                    <span className='font-medium'>Thank you for subscribing!</span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className='mx-auto flex max-w-md flex-col gap-3 sm:flex-row'
                  >
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='bg-background/50 border-border/50 focus-visible:ring-accent h-14 rounded-full px-6 backdrop-blur-sm'
                      required
                    />
                    <Button type='submit' size='lg' className='group h-14 rounded-full px-8'>
                      Subscribe
                      <IconArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </Button>
                  </form>
                )}

                <p className='text-muted-foreground mt-4 text-xs'>
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
