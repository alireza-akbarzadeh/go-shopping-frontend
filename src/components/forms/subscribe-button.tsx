import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useFormContext } from './useFormContext';
import { IconLoader2 } from '@tabler/icons-react';

export function SubscribeButton({
  className,
  children,
  label,
  ...props
}: ComponentProps<typeof Button> & { label?: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      children={([canSubmit, isSubmitting]) => (
        <Button
          type='submit'
          disabled={!canSubmit || isSubmitting}
          className={cn(
            'h-12 w-full rounded-xl text-[10px] font-black tracking-widest uppercase',
            className
          )}
          {...props}
        >
          {isSubmitting && <IconLoader2 className='mr-2 h-5 w-5 animate-spin' />}
          {children || label}
        </Button>
      )}
    />
  );
}
