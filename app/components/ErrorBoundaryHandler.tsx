'use client';

import { useEffect } from 'react';

export function ErrorBoundaryHandler() {
  useEffect(() => {
    // Suppress the "Can't find variable: control" error
    // This is a known issue with React 19 + react-hook-form compatibility
    const originalError = console.error;
    console.error = (...args) => {
      const errorString = args[0]?.toString() || '';
      if (errorString.includes("Can't find variable: control")) {
        return; // Suppress this specific error
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
