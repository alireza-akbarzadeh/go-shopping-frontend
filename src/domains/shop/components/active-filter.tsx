'use client';

import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProductFilters } from '../useProductFilters';

export function ActiveFilter() {
  const {
    selectedCategories,
    priceRange,
    showOnlyNew,
    showOnlySale,
    hasActiveFilters,
    setPriceRange,
    setShowOnlyNew,
    setShowOnlySale,
    handleCategoryToggle,
    clearFilters
  } = useProductFilters();

  return (
    <AnimatePresence>
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='mb-8 flex flex-wrap gap-2'
        >
          {!selectedCategories.includes('All') &&
            selectedCategories.map((category) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className='bg-secondary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm'
              >
                {category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className='hover:text-foreground'
                >
                  <IconX className='h-3 w-3' />
                </button>
              </motion.span>
            ))}
          {showOnlyNew && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='bg-secondary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm'
            >
              New Arrivals
              <button onClick={() => setShowOnlyNew(false)} className='hover:text-foreground'>
                <IconX className='h-3 w-3' />
              </button>
            </motion.span>
          )}
          {showOnlySale && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='bg-secondary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm'
            >
              On Sale
              <button onClick={() => setShowOnlySale(false)} className='hover:text-foreground'>
                <IconX className='h-3 w-3' />
              </button>
            </motion.span>
          )}
          {(Number(priceRange[0]) > 0 || Number(priceRange[1]) < 500) && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='bg-secondary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm'
            >
              ${Number(priceRange[0])} - ${Number(priceRange[1])}
              <button onClick={() => setPriceRange([0, 500])} className='hover:text-foreground'>
                <IconX className='h-3 w-3' />
              </button>
            </motion.span>
          )}
          <button
            onClick={clearFilters}
            className='text-muted-foreground hover:text-foreground text-sm underline transition-colors'
          >
            Clear all
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
