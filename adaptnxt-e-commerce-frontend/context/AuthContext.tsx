
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { Role } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: Role) => {
    // Simulate login and JWT
    const mockUser: User = {
      id: 'user-123',
      name: role === Role.ADMIN ? 'Admin User' : 'Valued Customer',
      role: role,
      token: `fake-jwt-token-for-${role}`,
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
