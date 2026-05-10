import { IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export function RegisterSidebar() {
  return (
    <div className='bg-accent/5 relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex'>
      <div className='from-accent/10 to-accent/5 absolute inset-0 bg-linear-to-br via-transparent' />

      <div className='bg-accent/10 absolute top-1/3 right-1/4 h-72 w-72 rounded-full blur-3xl' />
      <div className='bg-accent/20 absolute bottom-1/3 left-1/4 h-56 w-56 rounded-full blur-3xl' />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className='relative z-10 max-w-md text-center'
      >
        <div className='mb-8'>
          <span className='text-6xl font-bold tracking-tight'>LUXE</span>
        </div>

        <h2 className='mb-4 text-2xl font-semibold'>Join Our Community</h2>

        <p className='text-muted-foreground leading-relaxed'>
          Create an account to unlock exclusive benefits, early access to new collections, and
          personalized shopping experiences.
        </p>

        <div className='mt-12 space-y-4 text-left'>
          {[
            'Exclusive member-only discounts',
            'Early access to new arrivals',
            'Save items to your wishlist',
            'Faster checkout experience',
            'Order tracking & history'
          ].map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className='flex items-center gap-3'
            >
              <div className='bg-accent/20 flex size-6 items-center justify-center rounded-full'>
                <IconCheck className='text-accent size-4' />
              </div>

              <span className='text-sm'>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
