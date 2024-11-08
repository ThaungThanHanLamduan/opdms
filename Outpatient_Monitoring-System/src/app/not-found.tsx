"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-black py-6">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops!  Page not found.</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-2 text-white bg-primary hover:bg-primaryhover rounded"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
