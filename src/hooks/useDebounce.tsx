import { useEffect, useCallback, useRef } from "react";

export function useDebounce<T>(callback: (value: T) => void, delay: number) {
  const timer = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (value: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedCallback;
}
