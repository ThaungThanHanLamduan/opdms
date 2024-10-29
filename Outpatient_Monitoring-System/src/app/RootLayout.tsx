"use client";

import React from "react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="flex h-screen font-noto  select-none">
              {!isAuthRoute && <Sidebar />}
              <main className="w-full min-h-screen">
                <Toaster position="bottom-center" />
                {children}
              </main>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
