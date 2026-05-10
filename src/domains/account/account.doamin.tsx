'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Address } from '@/store/auth.store';
import {
  IconCheck,
  IconChevronRight,
  IconCreditCard,
  IconEdit,
  IconHeart,
  IconLogout,
  IconMapPin,
  IconPackage,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUser
} from '@tabler/icons-react';
import { logoutAction } from '~/src/actions/auth.actions';
import { useUser } from '~/src/hooks/useUser';

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

export function AccountDomain() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [addressForm, setAddressForm] = useState<Partial<Address>>({});
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const { user } = useUser();
  console.log(user);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logoutAction();
    router.push('/');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleSaveAddress = () => {
    if (editingAddressId) {
      // updateAddress(editingAddressId, addressForm);
    } else {
      // addAddress(addressForm as Omit<Address, 'id'>);
    }
    setIsAddressDialogOpen(false);
    setAddressForm({});
    setEditingAddressId(null);
  };

  const handleEditAddress = (address: Address) => {
    setAddressForm(address);
    setEditingAddressId(address.id);
    setIsAddressDialogOpen(true);
  };

  const handleAddNewAddress = () => {
    setAddressForm({
      label: '',
      firstName: user.first_name,
      lastName: user.last_name,
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: user.phone || '',
      isDefault: false
    });
    setEditingAddressId(null);
    setIsAddressDialogOpen(true);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: IconUser },
    { id: 'orders', label: 'Orders', icon: IconPackage },
    { id: 'wishlist', label: 'Wishlist', icon: IconHeart },
    { id: 'addresses', label: 'Addresses', icon: IconMapPin },
    { id: 'payment', label: 'Payment Methods', icon: IconCreditCard },
    { id: 'settings', label: 'Settings', icon: IconSettings }
  ];

  return (
    <div className='pt-24 pb-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <h1 className='mb-2 text-3xl font-bold'>My Account</h1>
          <p className='text-muted-foreground'>
            Welcome back, {user.firstName}! Manage your account and preferences.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className='hidden gap-8 lg:grid lg:grid-cols-[250px_1fr]'>
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className='space-y-2'
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                    activeTab === item.id ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Icon className='h-5 w-5' />
                  {item.label}
                </button>
              );
            })}

            <hr className='border-border my-4' />

            <button
              onClick={handleLogout}
              className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20'
            >
              <IconLogout className='h-5 w-5' />
              Sign out
            </button>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className='space-y-6'>
                {/* Profile Card */}
                <div className='bg-card border-border rounded-2xl border p-6'>
                  <div className='mb-6 flex items-start justify-between'>
                    <h2 className='text-xl font-semibold'>Profile Information</h2>
                    <Button variant='ghost' size='sm' onClick={() => setIsEditing(!isEditing)}>
                      <IconEdit className='mr-2 h-4 w-4' />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label>First Name</Label>
                        <Input
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label>Last Name</Label>
                        <Input
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label>Email</Label>
                        <Input value={editForm.email} disabled />
                      </div>
                      <div className='space-y-2'>
                        <Label>Phone</Label>
                        <Input
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder='+1 (555) 000-0000'
                        />
                      </div>
                      <div className='col-span-2 flex justify-end'>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center gap-6'>
                      <div className='bg-accent/20 flex h-20 w-20 items-center justify-center rounded-full'>
                        <span className='text-accent text-2xl font-semibold'>
                          {user.first_name[0]}
                          {user.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium'>
                          {user.first_name} {user.last_name}
                        </h3>
                        <p className='text-muted-foreground'>{user.email}</p>
                        {user.phone && <p className='text-muted-foreground'>{user.phone}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className='grid grid-cols-3 gap-4'>
                  {[
                    { label: 'Total Orders', value: mockOrders.length, icon: IconPackage },
                    { label: 'Wishlist Items', value: mockWishlist.length, icon: IconHeart },
                    {
                      label: 'Saved Addresses',
                      value: user?.addresses?.length || 0,
                      icon: IconMapPin
                    }
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className='bg-card border-border rounded-xl border p-6 text-center'
                      >
                        <Icon className='text-accent mx-auto mb-3 h-8 w-8' />
                        <p className='text-3xl font-bold'>{stat.value}</p>
                        <p className='text-muted-foreground text-sm'>{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Orders */}
                <div className='bg-card border-border rounded-2xl border p-6'>
                  <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Recent Orders</h2>
                    <Button variant='ghost' size='sm' onClick={() => setActiveTab('orders')}>
                      View All
                      <IconChevronRight className='ml-1 h-4 w-4' />
                    </Button>
                  </div>
                  <div className='space-y-4'>
                    {mockOrders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className='bg-muted/50 flex items-center justify-between rounded-xl p-4'
                      >
                        <div>
                          <p className='font-medium'>{order.id}</p>
                          <p className='text-muted-foreground text-sm'>
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className='text-right'>
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <p className='mt-1 text-sm font-medium'>${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className='space-y-4'>
                <h2 className='mb-4 text-xl font-semibold'>Order History</h2>
                {mockOrders.map((order) => (
                  <div key={order.id} className='bg-card border-border rounded-2xl border p-6'>
                    <div className='mb-4 flex items-start justify-between'>
                      <div>
                        <p className='text-lg font-semibold'>{order.id}</p>
                        <p className='text-muted-foreground text-sm'>
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className='mb-4 space-y-3'>
                      {order.items.map((item, idx) => (
                        <div key={idx} className='flex items-center justify-between text-sm'>
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className='border-border flex items-center justify-between border-t pt-4'>
                      <span className='font-medium'>Total</span>
                      <span className='text-lg font-semibold'>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className='mb-4 text-xl font-semibold'>My Wishlist</h2>
                <div className='grid grid-cols-3 gap-4'>
                  {mockWishlist.map((item) => (
                    <div
                      key={item.id}
                      className='bg-card border-border group overflow-hidden rounded-xl border'
                    >
                      <div className='relative aspect-square overflow-hidden'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                        <button className='bg-background/80 absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-red-500 backdrop-blur transition-colors hover:bg-red-500 hover:text-white'>
                          <IconHeart className='h-4 w-4 fill-current' />
                        </button>
                      </div>
                      <div className='p-4'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <p className='text-accent font-semibold'>${item.price.toFixed(2)}</p>
                        <Button size='sm' className='mt-3 w-full'>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-xl font-semibold'>Saved Addresses</h2>
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddNewAddress}>
                        <IconPlus className='mr-2 h-4 w-4' />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-lg'>
                      <DialogHeader>
                        <DialogTitle>
                          {editingAddressId ? 'Edit Address' : 'Add New Address'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className='mt-4 grid grid-cols-2 gap-4'>
                        <div className='col-span-2 space-y-2'>
                          <Label>Label</Label>
                          <Input
                            value={addressForm.label || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, label: e.target.value })
                            }
                            placeholder='Home, Work, etc.'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>First Name</Label>
                          <Input
                            value={addressForm.firstName || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, firstName: e.target.value })
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>Last Name</Label>
                          <Input
                            value={addressForm.lastName || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, lastName: e.target.value })
                            }
                          />
                        </div>
                        <div className='col-span-2 space-y-2'>
                          <Label>Street Address</Label>
                          <Input
                            value={addressForm.street || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, street: e.target.value })
                            }
                          />
                        </div>
                        <div className='col-span-2 space-y-2'>
                          <Label>Apartment, suite, etc. (optional)</Label>
                          <Input
                            value={addressForm.apartment || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, apartment: e.target.value })
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>City</Label>
                          <Input
                            value={addressForm.city || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, city: e.target.value })
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>State</Label>
                          <Input
                            value={addressForm.state || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, state: e.target.value })
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>ZIP Code</Label>
                          <Input
                            value={addressForm.zipCode || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, zipCode: e.target.value })
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>Phone</Label>
                          <Input
                            value={addressForm.phone || ''}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, phone: e.target.value })
                            }
                          />
                        </div>
                        <div className='col-span-2 mt-4 flex justify-end gap-2'>
                          <Button variant='outline' onClick={() => setIsAddressDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveAddress}>Save Address</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {user.addresses && user.addresses.length > 0 ? (
                  <div className='grid grid-cols-2 gap-4'>
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`bg-card relative rounded-xl border p-6 ${
                          address.isDefault ? 'border-accent' : 'border-border'
                        }`}
                      >
                        {address.isDefault && (
                          <span className='text-accent absolute top-4 right-4 flex items-center gap-1 text-xs font-medium'>
                            <IconCheck className='h-3 w-3' />
                            Default
                          </span>
                        )}
                        <h3 className='mb-2 font-semibold'>{address.label}</h3>
                        <p className='text-muted-foreground text-sm'>
                          {address.firstName} {address.lastName}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {address.street}
                          {address.apartment && `, ${address.apartment}`}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className='text-muted-foreground text-sm'>{address.phone}</p>

                        <div className='border-border mt-4 flex items-center gap-2 border-t pt-4'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleEditAddress(address)}
                          >
                            <IconEdit className='mr-1 h-4 w-4' />
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='text-red-600 hover:bg-red-50 hover:text-red-700'
                              >
                                <IconTrash className='h-4 w-4' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this
                                  address from your account.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeAddress(address.id)}
                                  className='bg-red-600 hover:bg-red-700'
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='bg-muted/50 rounded-2xl py-12 text-center'>
                    <IconMapPin className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
                    <h3 className='mb-2 font-semibold'>No saved addresses</h3>
                    <p className='text-muted-foreground mb-4'>
                      Add an address to speed up checkout
                    </p>
                    <Button onClick={handleAddNewAddress}>
                      <IconPlus className='mr-2 h-4 w-4' />
                      Add Address
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div>
                <h2 className='mb-4 text-xl font-semibold'>Payment Methods</h2>
                <div className='bg-muted/50 rounded-2xl py-12 text-center'>
                  <IconCreditCard className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
                  <h3 className='mb-2 font-semibold'>No payment methods</h3>
                  <p className='text-muted-foreground mb-4'>
                    Add a payment method for faster checkout
                  </p>
                  <Button>
                    <IconPlus className='mr-2 h-4 w-4' />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className='space-y-6'>
                <h2 className='mb-4 text-xl font-semibold'>Account Settings</h2>

                {/* Email Preferences */}
                <div className='bg-card border-border rounded-2xl border p-6'>
                  <h3 className='mb-4 font-semibold'>Email Preferences</h3>
                  <div className='space-y-4'>
                    {[
                      { label: 'Order updates', desc: 'Receive updates about your orders' },
                      { label: 'Promotions', desc: 'Get notified about sales and promotions' },
                      { label: 'New arrivals', desc: 'Be the first to know about new products' },
                      { label: 'Newsletter', desc: 'Weekly style tips and inspiration' }
                    ].map((pref) => (
                      <div key={pref.label} className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium'>{pref.label}</p>
                          <p className='text-muted-foreground text-sm'>{pref.desc}</p>
                        </div>
                        <Button variant='outline' size='sm'>
                          Enabled
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className='rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20'>
                  <h3 className='mb-4 font-semibold text-red-600'>Danger Zone</h3>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>Delete Account</p>
                      <p className='text-muted-foreground text-sm'>
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='outline'
                          className='border-red-300 text-red-600 hover:bg-red-100'
                        >
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className='bg-red-600 hover:bg-red-700'>
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Mobile Tabs */}
        <div className='lg:hidden'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='flex w-full overflow-x-auto'>
              {menuItems.slice(0, 4).map((item) => (
                <TabsTrigger key={item.id} value={item.id} className='flex-1'>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
