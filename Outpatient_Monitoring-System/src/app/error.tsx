// app/error.tsx
'use client';

import React from 'react';
import { useEffect } from 'react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error('An error occurred:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-xl text-gray-600 mb-4">Please try again later.</p>
      <button
        onClick={reset}
        className="px-6 py-2 text-white bg-primary hover:bg-primaryhover rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
