'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { productCategories, sortOptions } from '@/lib/data';
import {
  IconArrowsHorizontal,
  IconGrid3x3,
  IconLayoutGrid,
  IconSearch,
  IconX
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from './components/prodcut-card';
import { useProductFilters } from './useProductFilters';

export function ShopDomain() {
  const {
    selectedCategories,
    sortBy,
    priceRange,
    searchQuery,
    gridCols,
    showOnlyNew,
    showOnlySale,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    setGridCols,
    setShowOnlyNew,
    setShowOnlySale,
    // Derived
    filteredProducts,
    hasActiveFilters,
    handleCategoryToggle,
    clearFilters
  } = useProductFilters();

  const FilterContent = () => (
    <div className='space-y-8'>
      {/* Categories */}
      <div>
        <h3 className='mb-4 font-semibold'>Categories</h3>
        <div className='space-y-3'>
          {productCategories.map((category) => (
            <label key={category} className='group flex cursor-pointer items-center gap-3'>
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <span className='text-muted-foreground group-hover:text-foreground text-sm transition-colors'>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className='mb-4 font-semibold'>Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className='mb-4'
        />
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 className='mb-4 font-semibold'>Quick Filters</h3>
        <div className='space-y-3'>
          <label className='group flex cursor-pointer items-center gap-3'>
            <Checkbox
              checked={showOnlyNew}
              onCheckedChange={(checked) => setShowOnlyNew(checked as boolean)}
            />
            <span className='text-muted-foreground group-hover:text-foreground text-sm transition-colors'>
              New Arrivals Only
            </span>
          </label>
          <label className='group flex cursor-pointer items-center gap-3'>
            <Checkbox
              checked={showOnlySale}
              onCheckedChange={(checked) => setShowOnlySale(checked as boolean)}
            />
            <span className='text-muted-foreground group-hover:text-foreground text-sm transition-colors'>
              On Sale Only
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant='outline' className='w-full' onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  console.log(selectedCategories);

  return (
    <div className='bg-background min-h-screen'>
      <main className='pt-24 pb-24 lg:pt-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12'
          >
            <h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>Shop All</h1>
            <p className='text-muted-foreground mt-4 max-w-2xl'>
              Explore our complete collection of premium products, curated for those who appreciate
              quality and timeless design.
            </p>
          </motion.div>

          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='border-border mb-8 flex flex-col items-start justify-between gap-4 border-b pb-8 sm:flex-row sm:items-center'
          >
            <div className='flex w-full items-center gap-4 sm:w-auto'>
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='outline' className='gap-2 lg:hidden'>
                    <IconArrowsHorizontal className='h-4 w-4' />
                    Filters
                    {hasActiveFilters && (
                      <span className='bg-accent text-accent-foreground ml-1 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-80'>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className='mt-6'>
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className='relative flex-1 sm:w-64 sm:flex-initial'>
                <IconSearch className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              {/* Results Count */}
              <span className='text-muted-foreground hidden text-sm sm:block'>
                {filteredProducts.length} products
              </span>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className='w-44 gap-2'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className='border-border hidden items-center gap-1 rounded-lg border p-1 md:flex'>
                <Button
                  variant={gridCols === 3 ? 'secondary' : 'ghost'}
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => setGridCols(3)}
                >
                  <IconGrid3x3 className='h-4 w-4' />
                </Button>
                <Button
                  variant={gridCols === 4 ? 'secondary' : 'ghost'}
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => setGridCols(4)}
                >
                  <IconLayoutGrid className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Active Filters */}
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
                    <button
                      onClick={() => setShowOnlySale(false)}
                      className='hover:text-foreground'
                    >
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
                    <button
                      onClick={() => setPriceRange([0, 500])}
                      className='hover:text-foreground'
                    >
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

          {/* Main Content */}
          <div className='flex gap-12'>
            {/* Desktop Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='hidden w-64 shrink-0 lg:block'
            >
              <div className='sticky top-32'>
                <FilterContent />
              </div>
            </motion.aside>

            {/* Product Grid */}
            <div className='flex-1'>
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='py-20 text-center'
                >
                  <p className='text-muted-foreground mb-4'>
                    No products found matching your criteria.
                  </p>
                  <Button variant='outline' onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`grid gap-6 ${
                    gridCols === 3
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                >
                  <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
