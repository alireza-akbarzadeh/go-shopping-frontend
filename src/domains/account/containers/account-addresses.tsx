'use client';

import { useState, useTransition } from 'react';
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
import { IconCheck, IconEdit, IconMapPin, IconPlus, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';

import { useAppForm } from '~/src/components/forms/useAppForm';
import type { Address } from '@/store/auth.store';
import { addressFormSchema } from '../account.schema';
import { useUser } from '~/src/hooks/useUser';

export function AccountAddresses() {
  const { user } = useUser();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!user) return;

  const form = useAppForm({
    defaultValues: {
      label: '',
      firstName: '',
      lastName: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    },
    validators: {
      onChange: addressFormSchema,
      onBlur: addressFormSchema
    },
    onSubmit: async ({ formApi }) => {
      startTransition(async () => {
        try {
          if (editingAddressId) {
            toast.success('Address updated');
          } else {
            toast.success('Address added');
          }
          setIsAddressDialogOpen(false);
          setEditingAddressId(null);
          formApi.reset();
        } catch (error) {
          toast.error('Something went wrong');
        }
      });
    }
  });

  const handleAddNewAddress = () => {
    setEditingAddressId(null);
    form.reset({
      label: '',
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: user.phone || '',
      isDefault: false
    });
    setIsAddressDialogOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddressId(address.id);
    form.reset({
      label: address.label || '',
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.street,
      apartment: address.apartment || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setIsAddressDialogOpen(true);
  };

  return (
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
              <DialogTitle>{editingAddressId ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            </DialogHeader>

            <form.AppForm>
              <form.Root
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className='mt-4 grid grid-cols-2 gap-4'
              >
                {/* Label */}
                <form.AppField name='label'>
                  {(field) => (
                    <field.TextField
                      label='Label'
                      placeholder='Home, Work, etc.'
                      className='col-span-2'
                    />
                  )}
                </form.AppField>

                {/* First Name */}
                <form.AppField name='firstName'>
                  {(field) => <field.TextField label='First Name' />}
                </form.AppField>

                {/* Last Name */}
                <form.AppField name='lastName'>
                  {(field) => <field.TextField label='Last Name' />}
                </form.AppField>

                {/* Street */}
                <form.AppField name='street'>
                  {(field) => <field.TextField label='Street Address' className='col-span-2' />}
                </form.AppField>

                {/* Apartment */}
                <form.AppField name='apartment'>
                  {(field) => (
                    <field.TextField
                      label='Apartment, suite, etc. (optional)'
                      className='col-span-2'
                    />
                  )}
                </form.AppField>

                {/* City */}
                <form.AppField name='city'>
                  {(field) => <field.TextField label='City' />}
                </form.AppField>

                {/* State */}
                <form.AppField name='state'>
                  {(field) => <field.TextField label='State' />}
                </form.AppField>

                {/* ZIP Code */}
                <form.AppField name='zipCode'>
                  {(field) => <field.TextField label='ZIP Code' />}
                </form.AppField>

                {/* Phone */}
                <form.AppField name='phone'>
                  {(field) => <field.InputPhone label='Phone' />}
                </form.AppField>

                {/* Country */}
                <form.AppField name='country'>
                  {(field) => <field.TextField label='Country' />}
                </form.AppField>

                {/* Default toggle */}
                <form.AppField name='isDefault'>
                  {(field) => (
                    <field.Checkbox label='Set as default address' className='col-span-2 mt-2' />
                  )}
                </form.AppField>

                {/* Buttons */}
                <div className='col-span-2 mt-4 flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => setIsAddressDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <form.Submit isPending={isPending} label='Save Address' />
                </div>
              </form.Root>
            </form.AppForm>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address list – unchanged from original */}
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
                <Button variant='ghost' size='sm' onClick={() => handleEditAddress(address)}>
                  <IconEdit className='mr-1 h-4 w-4' />
                  Edit
                </Button>
                {!address.isDefault && (
                  <Button
                    variant='ghost'
                    size='sm'
                    // onClick={() => setDefaultAddress(address.id)}
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
                        This action cannot be undone. This will permanently delete this address from
                        your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        // onClick={() => removeAddress(address.id)}
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
          <p className='text-muted-foreground mb-4'>Add an address to speed up checkout</p>
          <Button onClick={handleAddNewAddress}>
            <IconPlus className='mr-2 h-4 w-4' />
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
}
