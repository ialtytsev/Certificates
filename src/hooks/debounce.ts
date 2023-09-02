import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 500) {
  const [debounced, setDebaunced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebaunced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
