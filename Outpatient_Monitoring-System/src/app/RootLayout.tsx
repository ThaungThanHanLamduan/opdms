"use client";

import React from "react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import { OutpatientTableProvider } from "./contexts/OutpatientTableContext";
import ErrorPage from "./error";

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OutpatientTableProvider>
              <div className="flex h-screen font-noto  select-none">
                {!isAuthRoute && <Sidebar />}
                <main className="w-5/6 min-h-screen">
                  <Toaster position="bottom-center" />
                  {children}
                </main>
              </div>
            </OutpatientTableProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} reset={() => {}} />;
}
