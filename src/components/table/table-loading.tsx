import { Skeleton } from '../ui/skeleton';

export const TableLoading = ({
  columnsCount,
  rowsCount = 5
}: {
  columnsCount: number;
  rowsCount?: number;
}) => {
  return (
    <div className='border-border/40 bg-card/20 overflow-hidden rounded-4xl border shadow-2xl backdrop-blur-2xl'>
      <div className='w-full'>
        {/* Skeleton Header */}
        <div className='bg-muted/50 border-border/40 flex border-b p-4'>
          {Array.from({ length: columnsCount }).map((_, i) => (
            <div key={i + columnsCount} className='flex-1 px-2'>
              <Skeleton className='bg-muted-foreground/20 h-3 w-20' />
            </div>
          ))}
        </div>
        {/* Skeleton Body */}
        <div className='divide-border/20 divide-y'>
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <div key={rowIndex + rowsCount} className='flex p-4'>
              {Array.from({ length: columnsCount }).map((_, colIndex) => (
                <div key={colIndex + columnsCount} className='flex-1 px-2'>
                  <Skeleton className='bg-muted/40 h-4 w-[80%]' />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
