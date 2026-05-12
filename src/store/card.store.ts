import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '@/lib/data';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number, color?: string, size?: string) => void;
  updateQuantity: (id: number, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (open) => set({ isOpen: open }),
      addItem: (newItem) =>
        set((state) => {
          const index = state.items.findIndex(
            (item) =>
              item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
          );
          const quantity = newItem.quantity || 1;
          if (index > -1) {
            return {
              items: state.items.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isOpen: true
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity }],
            isOpen: true
          };
        }),
      removeItem: (id, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.color === color && item.size === size)
          )
        })),
      updateQuantity: (id, quantity, color, size) =>
        set((state) => {
          if (quantity < 1) {
            return {
              items: state.items.filter(
                (item) => !(item.id === id && item.color === color && item.size === size)
              )
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === id && item.color === color && item.size === size
                ? { ...item, quantity }
                : item
            )
          };
        }),
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((t, i) => t + i.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.id);
          const originalPrice = product?.originalPrice || item.price;
          return total + originalPrice * item.quantity;
        }, 0),
      getDiscount: () =>
        get().items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.id);
          const originalPrice = product?.originalPrice || item.price;
          return total + (originalPrice - item.price) * item.quantity;
        }, 0),
      getTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: 'luxe-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);
