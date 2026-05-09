import { create } from 'zustand';

import { products } from '@/lib/data';

type GridCols = 3 | 4;

type SortBy =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating';

type ShopStore = {
  selectedCategories: string[];
  sortBy: SortBy;
  priceRange: number[];
  searchQuery: string;
  gridCols: GridCols;
  showOnlyNew: boolean;
  showOnlySale: boolean;

  setSelectedCategories: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;

  setSortBy: (value: SortBy) => void;
  setPriceRange: (value: number[]) => void;
  setSearchQuery: (value: string) => void;
  setGridCols: (value: GridCols) => void;
  setShowOnlyNew: (value: boolean) => void;
  setShowOnlySale: (value: boolean) => void;

  handleCategoryToggle: (category: string) => void;
  clearFilters: () => void;

  filteredProducts: typeof products;

  hasActiveFilters: boolean;
};

export const useShopStore = create<ShopStore>((set, get) => ({
  selectedCategories: ['All'],
  sortBy: 'featured',
  priceRange: [0, 500],
  searchQuery: '',
  gridCols: 4,
  showOnlyNew: false,
  showOnlySale: false,

  setSelectedCategories: (value) =>
    set((state) => ({
      selectedCategories:
        typeof value === 'function'
          ? value(state.selectedCategories)
          : value
    })),

  setSortBy: (value) => set({ sortBy: value }),

  setPriceRange: (value) => set({ priceRange: value }),

  setSearchQuery: (value) => set({ searchQuery: value }),

  setGridCols: (value) => set({ gridCols: value }),

  setShowOnlyNew: (value) => set({ showOnlyNew: value }),

  setShowOnlySale: (value) => set({ showOnlySale: value }),

  handleCategoryToggle: (category) => {
    const { selectedCategories } = get();

    if (category === 'All') {
      set({
        selectedCategories: ['All']
      });

      return;
    }

    const newCategories = selectedCategories.filter((c) => c !== 'All');

    if (newCategories.includes(category)) {
      const filtered = newCategories.filter((c) => c !== category);

      set({
        selectedCategories:
          filtered.length === 0 ? ['All'] : filtered
      });

      return;
    }

    set({
      selectedCategories: [...newCategories, category]
    });
  },

  clearFilters: () =>
    set({
      selectedCategories: ['All'],
      priceRange: [0, 500],
      showOnlyNew: false,
      showOnlySale: false,
      searchQuery: ''
    }),

  get filteredProducts() {
    const {
      selectedCategories,
      sortBy,
      priceRange,
      searchQuery,
      showOnlyNew,
      showOnlySale
    } = get();

    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (!selectedCategories.includes('All')) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    result = result.filter(
      (product) =>
        Number(product.price) >= Number(priceRange?.[0]) &&
        Number(product.price) <= Number(priceRange?.[1])
    );

    if (showOnlyNew) {
      result = result.filter((product) => product.isNew);
    }

    if (showOnlySale) {
      result = result.filter((product) => product.originalPrice);
    }

    switch (sortBy) {
      case 'newest':
        result = result
          .filter((p) => p.isNew)
          .concat(result.filter((p) => !p.isNew));
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

      default:
        break;
    }

    return result;
  },

  get hasActiveFilters() {
    const {
      selectedCategories,
      priceRange,
      showOnlyNew,
      showOnlySale,
      searchQuery
    } = get();

    return (
      !selectedCategories.includes('All') ||
      Number(priceRange[0]) > 0 ||
      Number(priceRange[1]) < 500 ||
      showOnlyNew ||
      showOnlySale ||
      Boolean(searchQuery)
    );
  }
}));
