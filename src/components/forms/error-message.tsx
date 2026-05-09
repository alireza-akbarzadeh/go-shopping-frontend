import { cn } from '@/lib/utils';
import { useFormContext } from './useFormContext';

export function ErrorMessages({ className }: { className?: string }) {
  const form = useFormContext();
  // Access the store's useStore hook. Adjust property name if needed: baseStore or store
  const errors = form.baseStore.useStore((state) => state.errors) ?? [];
  // Alternatively: form.useStore? but error says baseStore
  if (!errors.length) return null;
  return (
    <>
      {errors.map((error, idx) => (
        <div key={idx} className={cn('mt-1 text-xs font-bold text-red-500', className)}>
          {typeof error === 'string' ? error : error?.message}
        </div>
      ))}
    </>
  );
}
