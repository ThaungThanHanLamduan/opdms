"use client"
import { authService } from "@/service";
import { authContextType } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(authService.getToken() || null);
  // const [isLogin, setIsLogin] = useState(false)
  const router = useRouter();


  const login = async (newToken: string) => {
    authService.login(newToken);
    setToken(newToken);
    toast.success("Login successfully");
    router.push("/");
  };

  const logout = () => {
    authService.logout();
    setToken(null); 
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): authContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
