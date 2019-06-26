import { Dispatch, useEffect, useState } from "react";

export function GetData<P>(key: string) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as P;
  } else {
    return null;
  }
}

export function SaveData<P>(key: string, blob: P) {
  return localStorage.setItem(key, JSON.stringify(blob));
}

/**
 *
 *
 * @export
 * @template T
 * @param {string} key
 * @param {T} fallBackInitialValue
 * @param {boolean} [forceOveride] used when the local value should be
 *     forcefully overwritten (mainly used in dev mode)
 * @returns {[T, Dispatch<T>]}
 */
export function useLocalStorage<T>(
  key: string,
  fallBackInitialValue: T,
  forceOveride?: boolean
): [T, Dispatch<T>] {
  let initialValue = GetData<T>(key);

  if (forceOveride) {
    initialValue = fallBackInitialValue;
  } else if (initialValue == null) {
    initialValue = fallBackInitialValue;
  }

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    SaveData(key, value);
  }, [value]);

  return [value, setValue];
}
