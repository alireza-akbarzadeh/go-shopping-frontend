// containers/account-profile-form.tsx
'use client';

import { useTransition } from 'react';
import { Button } from '~/src/components/ui/button';
import { useAppForm } from '~/src/components/forms/useAppForm';
import { toast } from 'sonner';
import { useUser } from '~/src/hooks/useUser';
import { profileFormSchema } from '../account.schema';

interface AccountProfileFormProps {
  onCancel: () => void;
}

export function AccountProfileForm({ onCancel }: AccountProfileFormProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();

  const form = useAppForm({
    defaultValues: {
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? ''
    },
    validators: {
      onChange: profileFormSchema,
      onBlur: profileFormSchema
    },
    onSubmit: async () => {
      startTransition(async () => {
        try {
          // await updateProfileAction(value);
          toast.success('Profile updated');
          onCancel(); // exit editing mode
        } catch (error) {
          toast.error('Something went wrong');
        }
      });
    }
  });

  return (
    <form.AppForm>
      <form.Root
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className='grid grid-cols-2 gap-4'
      >
        <form.AppField name='firstName'>
          {(field) => <field.TextField label='First Name' />}
        </form.AppField>
        <form.AppField name='lastName'>
          {(field) => <field.TextField label='Last Name' />}
        </form.AppField>
        <form.AppField name='email'>
          {(field) => <field.TextField label='Email' disabled />}
        </form.AppField>
        <form.AppField name='phone'>
          {(field) => <field.TextField label='Phone' placeholder='+1 (555) 000-0000' />}
        </form.AppField>
        <div className='col-span-2 flex justify-end gap-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <form.Submit isPending={isPending} label='Save Changes' />
        </div>
      </form.Root>
    </form.AppForm>
  );
}
