import {
  IconCheckbox,
  IconInfoCircle,
  IconLoader2,
  IconTriangleSquareCircle
} from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useTheme();

  return (
    <Sonner
      theme={theme.value}
      className='toaster group'
      icons={{
        success: <IconCheckbox className='size-4' />,
        info: <IconInfoCircle className='size-4' />,
        warning: <IconTriangleSquareCircle className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <IconLoader2 className='size-4 animate-spin' />
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)'
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
