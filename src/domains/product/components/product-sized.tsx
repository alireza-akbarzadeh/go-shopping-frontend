interface ProductSizeProps {
  selected: string | null;
  onSetSelected: (select: string) => void;
  sizes: string[];
}
export function ProductSized(props: ProductSizeProps) {
  const { onSetSelected, selected, sizes } = props;
  return (
    <div>
      <div className='mb-3 flex items-center justify-between'>
        <p className='text-sm font-medium'>Size</p>
        <button className='text-accent text-xs hover:underline'>Size guide</button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {sizes?.map((size) => (
          <button
            key={size}
            onClick={() => onSetSelected(size)}
            className={`h-11 min-w-11 rounded-md border px-4 text-sm font-medium transition-all ${
              selected === size
                ? 'border-foreground bg-foreground text-background'
                : 'border-border hover:border-foreground'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
