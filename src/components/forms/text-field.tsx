import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { FieldContainer } from './form';
import { useFieldContext } from './useFormContext';
import type { TablerIcon } from '@tabler/icons-react';

interface TextFieldProps extends ComponentProps<typeof Input> {
  label?: string;
  detail?: string;
  icon?: TablerIcon;
}

export function TextField({
  label,
  detail,
  placeholder,
  icon: Icon,
  className,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <FieldContainer label={label} detail={detail}>
      <div className='relative w-full'>
        {Icon && (
          <Icon className='pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-400' />
        )}
        <Input
          {...props}
          name={field.name}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(Icon && 'pl-12', className)}
        />
      </div>
    </FieldContainer>
  );
}
