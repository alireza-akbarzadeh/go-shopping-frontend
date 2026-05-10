'use client';

import { useMemo } from 'react';
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
  parseAsArrayOf,
  parseAsStringLiteral
} from 'nuqs';
import { products } from '@/lib/data';

// ── Types ──────────────────────────────────────────────
type GridCols = 3 | 4;
type SortBy = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

const sortValues = ['featured', 'newest', 'price-asc', 'price-desc', 'rating'] as const;

// ── Hook ───────────────────────────────────────────────
export function useProductFilters() {
  const [params, setParams] = useQueryStates(
    {
      selectedCategories: parseAsArrayOf(parseAsString, ',').withDefault(['All']),
      sortBy: parseAsStringLiteral(sortValues).withDefault('featured'),
      priceMin: parseAsInteger.withDefault(0),
      priceMax: parseAsInteger.withDefault(500),
      searchQuery: parseAsString.withDefault(''),
      gridCols: parseAsInteger.withDefault(4),
      showOnlyNew: parseAsBoolean.withDefault(false),
      showOnlySale: parseAsBoolean.withDefault(false)
    },
    { shallow: false } // update URL but don't re-render the whole page unnecessarily
  );

  const {
    selectedCategories,
    sortBy,
    priceMin,
    priceMax,
    searchQuery,
    gridCols,
    showOnlyNew,
    showOnlySale
  } = params;

  // ── Setters (keep the same API) ──────────────────────
  const setSelectedCategories = (value: string[] | ((prev: string[]) => string[])) => {
    setParams((prev) => ({
      selectedCategories: typeof value === 'function' ? value(prev.selectedCategories) : value
    }));
  };

  const setPriceRange = (value: number[]) => setParams({ priceMin: value[0], priceMax: value[1] });

  const setSortBy = (value: SortBy) => setParams({ sortBy: value });
  const setSearchQuery = (value: string) => setParams({ searchQuery: value });
  const setGridCols = (value: GridCols) => setParams({ gridCols: value });
  const setShowOnlyNew = (value: boolean) => setParams({ showOnlyNew: value });
  const setShowOnlySale = (value: boolean) => setParams({ showOnlySale: value });

  // ── Category toggle (same logic) ─────────────────────
  const handleCategoryToggle = (category: string) => {
    setParams((prev) => {
      const cats = prev.selectedCategories;

      if (category === 'All') {
        return { selectedCategories: ['All'] };
      }

      const withoutAll = cats.filter((c) => c !== 'All');

      if (withoutAll.includes(category)) {
        const filtered = withoutAll.filter((c) => c !== category);
        return {
          selectedCategories: filtered.length === 0 ? ['All'] : filtered
        };
      }

      return { selectedCategories: [...withoutAll, category] };
    });
  };

  // ── Clear all filters ────────────────────────────────
  const clearFilters = () => {
    setParams({
      selectedCategories: ['All'],
      priceMin: 0,
      priceMax: 500,
      showOnlyNew: false,
      showOnlySale: false,
      searchQuery: ''
    });
  };

  // ── Derived: price range as array ────────────────────
  const priceRange = [priceMin, priceMax] as number[];

  // ── Derived: filtered products (identical logic) ─────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }

    // Categories
    if (!selectedCategories.includes('All')) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price
    result = result.filter((p) => Number(p.price) >= priceMin && Number(p.price) <= priceMax);

    // New / Sale
    if (showOnlyNew) {
      result = result.filter((p) => p.isNew);
    }
    if (showOnlySale) {
      result = result.filter((p) => p.originalPrice);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceMin, priceMax, showOnlyNew, showOnlySale, sortBy]);

  // ── Derived: active filters flag ─────────────────────
  const hasActiveFilters = useMemo(
    () =>
      !selectedCategories.includes('All') ||
      priceMin > 0 ||
      priceMax < 500 ||
      showOnlyNew ||
      showOnlySale ||
      Boolean(searchQuery),
    [selectedCategories, priceMin, priceMax, showOnlyNew, showOnlySale, searchQuery]
  );

  return {
    // State
    selectedCategories,
    sortBy,
    priceRange,
    searchQuery,
    gridCols,
    showOnlyNew,
    showOnlySale,

    // Setters
    setSelectedCategories,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    setGridCols,
    setShowOnlyNew,
    setShowOnlySale,

    // Helpers
    handleCategoryToggle,
    clearFilters,

    // Derived
    filteredProducts,
    hasActiveFilters
  };
}
