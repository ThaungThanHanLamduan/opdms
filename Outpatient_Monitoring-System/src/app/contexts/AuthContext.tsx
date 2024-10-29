import { authService } from "@/service";
import { authContextType } from "@/types/userTypes";
import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = authService.getToken() || null;

  const login = async (token: string) => {
    authService.login(token);
    toast.success("Login successfully");
  };

  const logout = () => {
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): authContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
