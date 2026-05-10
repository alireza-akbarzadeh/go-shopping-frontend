import { motion } from 'framer-motion';

export function LoginSidebar() {
  return (
    <div className='bg-accent/5 relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex'>
      <div className='from-accent/10 to-accent/5 absolute inset-0 bg-linear-to-br via-transparent' />
      <div className='bg-accent/10 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl' />
      <div className='bg-accent/20 absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full blur-3xl' />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className='relative z-10 max-w-md text-center'
      >
        <div className='mb-8'>
          <span className='text-6xl font-bold tracking-tight'>LUXE</span>
        </div>
        <h2 className='mb-4 text-2xl font-semibold'>Premium Shopping Experience</h2>
        <p className='text-muted-foreground leading-relaxed'>
          Discover exclusive collections and enjoy personalized recommendations tailored just for
          you. Sign in to access your wishlist, track orders, and more.
        </p>
        <div className='mt-12 grid grid-cols-3 gap-6'>
          {[
            { label: 'Secure Checkout', value: '256-bit SSL' },
            { label: 'Free Returns', value: '30 Days' },
            { label: 'Support', value: '24/7' }
          ].map((feature) => (
            <div key={feature.label} className='text-center'>
              <p className='text-lg font-semibold'>{feature.value}</p>
              <p className='text-muted-foreground text-xs'>{feature.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
