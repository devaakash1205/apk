"use client";

import { useState, useEffect, useRef } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Use a ref to store initialValue to prevent re-renders from non-primitive initial values.
  const initialValueRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    let value: T;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        value = JSON.parse(item);
      } else {
        value = initialValueRef.current;
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
      value = initialValueRef.current;
    }
    setStoredValue(value);
  }, [key]);

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
