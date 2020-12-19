import { useCallback, useEffect, useState } from 'react';

export const useStateWithLocalStorage = <T extends any>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key)) || initialValue);

  const clear = useCallback(() => localStorage.removeItem(key), []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue, clear] as const;
};
