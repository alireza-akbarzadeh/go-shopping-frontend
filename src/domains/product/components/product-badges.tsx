import { IconRotateClockwise, IconShieldCheck, IconTruck } from '@tabler/icons-react';

export function ProductBadges() {
  return (
    <div className='border-border bg-secondary/40 grid grid-cols-3 gap-2 rounded-xl border p-4'>
      {[
        [IconTruck, 'Free shipping'],
        [IconShieldCheck, '2-year warranty'],
        [IconRotateClockwise, '30-day returns']
      ].map(([Icon, label]) => {
        const I = Icon as typeof IconTruck;
        return (
          <div key={label as string} className='flex flex-col items-center gap-1.5 text-center'>
            <I className='text-accent h-5 w-5' />
            <p className='text-xs'>{label as string}</p>
          </div>
        );
      })}
    </div>
  );
}
