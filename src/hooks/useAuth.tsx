"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '@/lib/types';

interface AuthContextType {
  user: IUser | null;
  login: (mockUser: IUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de sesión desde localStorage
    const savedUser = localStorage.getItem('portal_bes_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user from local storage", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (mockUser: IUser) => {
    setUser(mockUser);
    localStorage.setItem('portal_bes_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portal_bes_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
