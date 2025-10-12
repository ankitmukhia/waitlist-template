import React from "react";

export function useStickyState<T>(
  defaultValue: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return defaultValue;
    }

    const persistedValue = window.localStorage.getItem(key);

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
