import { useEffect, useState } from "react";

export function generateTimestampKey(prefix = "") {
  const now = new Date();
  const timestamp = now.getTime();
  const key = `${prefix}${timestamp}`;

  return key;
}

export function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
