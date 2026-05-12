'use client';

import * as React from 'react';
import { Direction as DirectionPrimitive } from 'radix-ui';
import {} from 'radix-ui';
import { cn } from '@/lib/utils';
export const DirectionProvider = DirectionPrimitive.DirectionProvider;
export const useRawDirection = DirectionPrimitive.useDirection;

export function useDirection() {
  const context = React.useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a Direction component');
  }
  const { dir, setDir } = context;
  const isRtl = dir === 'rtl';

  const toggleDirection = React.useCallback(() => {
    setDir(isRtl ? 'ltr' : 'rtl');
  }, [isRtl, setDir]);

  return { dir, isRtl, toggleDirection, setDir };
}

interface DirectionProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: 'ltr' | 'rtl';
  defaultDir?: 'ltr' | 'rtl';
  onDirChange?: (dir: 'ltr' | 'rtl') => void;
  asChild?: boolean;
}

export function Direction({
  dir,
  defaultDir = 'ltr',
  onDirChange,
  className,
  children,
  asChild = false,
  ...divProps
}: DirectionProps) {
  const [internalDir, setInternalDir] = React.useState(defaultDir);
  const effectiveDir = dir ?? internalDir;

  const handleDirChange = React.useCallback(
    (newDir: 'ltr' | 'rtl') => {
      if (!dir) setInternalDir(newDir);
      onDirChange?.(newDir);
    },
    [dir, onDirChange]
  );

  const contextValue = React.useMemo(
    () => ({ dir: effectiveDir, setDir: handleDirChange }),
    [effectiveDir, handleDirChange]
  );

  const Comp = asChild ? React.Fragment : 'div';
  const wrapperProps = asChild
    ? {}
    : { className: cn(effectiveDir === 'rtl' && 'rtl', className), ...divProps };

  return (
    <DirectionPrimitive.DirectionProvider dir={effectiveDir}>
      <Comp {...wrapperProps}>
        <DirectionContext.Provider value={contextValue}>{children}</DirectionContext.Provider>
      </Comp>
    </DirectionPrimitive.DirectionProvider>
  );
}

type DirectionContextType = {
  dir: 'ltr' | 'rtl';
  setDir: (dir: 'ltr' | 'rtl') => void;
};
const DirectionContext = React.createContext<DirectionContextType | undefined>(undefined);

export function useDirectionContext() {
  const context = React.useContext(DirectionContext);
  if (!context) throw new Error('useDirectionContext must be used within a Direction component');
  return context;
}

export function DirectionToggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { dir, setDir } = useDirectionContext();
  const nextDir = dir === 'ltr' ? 'rtl' : 'ltr';
  return (
    <button
      onClick={() => setDir(nextDir)}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm',
        className
      )}
      {...props}
    >
      {dir === 'ltr' ? '🌐 LTR' : '🔄 RTL'}
    </button>
  );
}
