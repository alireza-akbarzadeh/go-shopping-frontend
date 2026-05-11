import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { GetUsers200DataUsersItem } from '~/src/services/models';
import {
  IconAlertCircle,
  IconCheck,
  IconFingerprint,
  IconGlobe,
  IconMapPin,
  IconPhone,
  IconShieldCheck
} from '@tabler/icons-react';
import { UserActions } from './user-actions';

export const userColumns: ColumnDef<GetUsers200DataUsersItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className='border-muted-foreground/30 translate-y-0.5 rounded-md'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className='border-muted-foreground/30 translate-y-0.5 rounded-md'
      />
    )
  },
  // 1. IDENTITY & CONTACT
  {
    accessorKey: 'name',
    id: 'name', // Explicit ID for Table.Search
    header: 'User Identity',
    cell: ({ row }) => {
      const { name, email, avatar, role, emailVerified, phone, phoneVerified } = row.original;
      return (
        <div className='flex items-center gap-3 py-1'>
          <div className='relative shrink-0'>
            <img
              src={avatar}
              alt={name}
              className='bg-muted border-border/50 h-10 w-10 rounded-xl border object-cover'
            />
            {role !== 'User' && (
              <div
                className={cn(
                  'border-background absolute -top-1 -right-1 rounded-full border p-0.5 shadow-sm',
                  role === 'Admin' ? 'bg-primary text-primary-foreground' : 'bg-blue-500 text-white'
                )}
              >
                <IconShieldCheck className='h-2.5 w-2.5' />
              </div>
            )}
          </div>
          <div className='flex max-w-45 min-w-0 flex-col'>
            <div className='flex items-center gap-1.5'>
              <span className='truncate text-sm font-bold'>{name}</span>
              {emailVerified && <IconCheck className='h-3 w-3 shrink-0 text-emerald-500' />}
            </div>
            <span className='text-muted-foreground truncate text-[10px]'>{email}</span>
            {phone && (
              <span
                className={cn(
                  'flex items-center gap-1 text-[9px] font-medium',
                  phoneVerified ? 'text-emerald-600/70' : 'text-amber-600/70'
                )}
              >
                <IconPhone className='h-2.5 w-2.5' /> {phone}
              </span>
            )}
          </div>
        </div>
      );
    }
  },
  // 2. LOCATION & LOCALE
  {
    accessorKey: 'location',
    header: 'Region',
    cell: ({ row }) => {
      const { city, country, locale, timezone } = row.original;
      return (
        <div className='flex min-w-[100px] flex-col gap-0.5'>
          <div className='flex items-center gap-1.5 text-xs font-semibold'>
            <IconMapPin className='text-muted-foreground h-3 w-3' />
            <span>
              {city || 'N/A'}, {country}
            </span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2 text-[9px] font-bold tracking-tight uppercase'>
            <IconGlobe className='h-2.5 w-2.5' /> {locale} • {timezone?.split('/').pop()}
          </div>
        </div>
      );
    }
  },
  // 3. SECURITY & DEVICES
  {
    accessorKey: 'security',
    header: 'Security Audit',
    cell: ({ row }) => {
      const { twoFactorEnabled, mfaMethods, devices, failedLoginAttempts } = row.original;
      return (
        <div className='flex items-center gap-3'>
          <div className='flex -space-x-2'>
            {mfaMethods?.map((method) => (
              <div
                key={method}
                className='bg-background border-muted flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-sm'
              >
                {method === 'authenticator' ? (
                  <IconFingerprint className='text-primary h-3.5 w-3.5' />
                ) : (
                  <IconPhone className='h-3.5 w-3.5 text-blue-500' />
                )}
              </div>
            ))}
            {!twoFactorEnabled && (
              <div className='bg-destructive/10 border-background flex h-7 w-7 items-center justify-center rounded-full border-2'>
                <IconAlertCircle className='text-destructive h-3.5 w-3.5' />
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <span className='text-foreground text-[10px] font-bold'>
              {devices?.length || 0} Connected
            </span>
            {failedLoginAttempts && failedLoginAttempts > 0 ? (
              <span className='text-destructive text-[9px] font-black tracking-tighter uppercase'>
                {failedLoginAttempts} Failures
              </span>
            ) : (
              <span className='text-[9px] font-bold text-emerald-500'>Secure</span>
            )}
          </div>
        </div>
      );
    }
  },
  // 4. USAGE & METRICS

  {
    accessorKey: 'joinedAt',
    id: 'joinedAt',
    header: 'Join Date',
    filterFn: 'dateRange' as any,
    cell: ({ row }) => {
      const date = row.original.created_at;
      return (
        <div className='flex flex-col'>
          <span className='text-[10px] font-bold'>
            {date ? new Date(date).toLocaleDateString() : 'N/A'}
          </span>
          <span className='text-muted-foreground text-[9px] font-medium uppercase'>
            Original Member
          </span>
        </div>
      );
    }
  },
  //   {
  //     accessorKey: 'plan',
  //     id: 'plan',
  //     header: 'Plan & Billing',
  //     filterFn: 'fuzzy' as any,
  //     cell: ({ row }) => {
  //       const { plan, billingStatus, accountBalance, credits, subscriptionEnd } = row.original;
  //       return (
  //         <div className='flex min-w-[120px] flex-col gap-1'>
  //           <div className='flex items-center gap-2'>
  //             <Badge
  //               className={cn(
  //                 'px-1.5 py-0 text-[9px] font-black uppercase',
  //                 plan === 'Premium' ? 'bg-primary' : 'bg-muted text-muted-foreground'
  //               )}
  //             >
  //               {plan}
  //             </Badge>
  //             <span
  //               className={cn(
  //                 'text-[10px] font-bold uppercase',
  //                 billingStatus === 'active' ? 'text-emerald-600' : 'text-destructive'
  //               )}
  //             >
  //               {billingStatus}
  //             </span>
  //           </div>
  //           <div className='text-muted-foreground flex flex-col text-[10px] leading-tight font-medium'>
  //             <span className='text-foreground flex items-center gap-1 font-bold'>
  //               <CreditCard className='h-3 w-3' /> ${accountBalance?.toFixed(2)}
  //             </span>
  //             <span>{credits} Credits</span>
  //             {subscriptionEnd && (
  //               <span className='text-[9px] opacity-70'>
  //                 Ends: {new Date(subscriptionEnd).toLocaleDateString()}
  //               </span>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     }
  //   },
  // 6. STATUS & METADATA
  {
    accessorKey: 'status',
    id: 'status',
    header: 'System Status',
    filterFn: 'multiSelect' as any,
    cell: ({ row }) => {
      const { is_active } = row.original;
      const config = {
        active: { color: 'bg-emerald-500', label: 'Active' },
        pending: { color: 'bg-amber-500', label: 'Pending' },
        suspended: { color: 'bg-destructive', label: 'Banned' },
        flagged: { color: 'bg-orange-500', label: 'Review' },
        deactivated: { color: 'bg-muted-foreground', label: 'Ghost' }
      }[status] || { color: 'bg-muted', label: status };

      return (
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center gap-2'>
            <div className={cn('h-2 w-2 rounded-full', config.color)} />
            <span className='text-xs font-bold tracking-tighter uppercase'>{config.label}</span>
          </div>
          <div className='flex max-w-[120px] flex-wrap gap-1'>
            {/* {tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className='bg-muted text-muted-foreground rounded px-1 text-[8px] font-bold'
              >
                #{tag}
              </span>
            ))} */}
          </div>
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActions user={row.original} />
  }
];
