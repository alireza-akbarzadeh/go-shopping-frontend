import {
  IconCreditCard,
  IconHeart,
  IconMapPin,
  IconPackage,
  IconSettings,
  IconUser,
  type TablerIcon
} from '@tabler/icons-react';
// Mock order data

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'delivered',
    total: 459.99,
    items: [
      { name: 'Premium Leather Jacket', quantity: 1, price: 299.99 },
      { name: 'Silk Scarf', quantity: 2, price: 80.0 }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-10',
    status: 'shipped',
    total: 189.99,
    items: [{ name: 'Designer Sunglasses', quantity: 1, price: 189.99 }]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-01',
    status: 'processing',
    total: 649.99,
    items: [
      { name: 'Cashmere Sweater', quantity: 1, price: 299.99 },
      { name: 'Leather Belt', quantity: 1, price: 150.0 },
      { name: 'Wool Socks Pack', quantity: 2, price: 100.0 }
    ]
  }
];

// Mock wishlist data
const mockWishlist = [
  {
    id: 1,
    name: 'Premium Watch',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'
  },
  {
    id: 2,
    name: 'Leather Bag',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200'
  },
  {
    id: 3,
    name: 'Silk Tie',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=200'
  }
];

const statusColors: Record<string, string> = {
  processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

export type AccountTab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'payment' | 'settings';

type MenuItems = {
  id: AccountTab;
  label: string;
  icon: TablerIcon;
};

const menuItems: MenuItems[] = [
  { id: 'overview', label: 'Overview', icon: IconUser },
  { id: 'orders', label: 'Orders', icon: IconPackage },
  { id: 'wishlist', label: 'Wishlist', icon: IconHeart },
  { id: 'addresses', label: 'Addresses', icon: IconMapPin },
  { id: 'payment', label: 'Payment Methods', icon: IconCreditCard },
  { id: 'settings', label: 'Settings', icon: IconSettings }
];

export { menuItems, mockOrders, mockWishlist, statusColors };
