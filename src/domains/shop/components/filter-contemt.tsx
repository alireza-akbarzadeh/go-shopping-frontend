import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { productCategories } from '@/lib/data';
import { useProductFilters } from '../useProductFilters';

export function FilterContent() {
  const {
    selectedCategories,
    priceRange,
    showOnlyNew,
    showOnlySale,
    setPriceRange,
    setShowOnlyNew,
    setShowOnlySale,
    hasActiveFilters,
    handleCategoryToggle,
    clearFilters
  } = useProductFilters();

  return (
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
}
