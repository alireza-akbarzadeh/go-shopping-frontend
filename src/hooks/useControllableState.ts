import { useState, useCallback, useEffect } from 'react';

export function useControllableState<T>({
  prop,
  onChange,
  defaultProp
}: {
  prop?: T;
  onChange?: (value: T) => void;
  defaultProp?: T;
}): [T, (nextValue: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultProp as T);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : internalValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (isControlled) {
        onChange?.(nextValue);
      } else {
        setInternalValue(nextValue);
        onChange?.(nextValue);
      }
    },
    [isControlled, onChange]
  );

  // Sync internal state when controlled prop changes
  useEffect(() => {
    if (isControlled && prop !== internalValue) {
      setInternalValue(prop);
    }
  }, [isControlled, prop, internalValue]);

  return [value, setValue];
}
