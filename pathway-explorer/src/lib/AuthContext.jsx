import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '@/api/client';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Pick up token from WorkOS callback URL fragment
    const hash = window.location.hash;
    const isCallback = window.location.pathname === '/auth/callback';
    if (hash.startsWith('#token=')) {
      const token = hash.slice(7);
      localStorage.setItem('biocircuit_token', token);
      // If we landed on /auth/callback, redirect to home; otherwise just clean the hash
      window.history.replaceState(null, '', isCallback ? '/' : window.location.pathname);
      if (isCallback) {
        // Force a re-render at the new path so React Router shows Home, not 404
        window.location.replace('/');
        return;
      }
    } else if (isCallback) {
      // Callback hit without a token — bounce to home
      window.location.replace('/');
      return;
    }
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('biocircuit_token');
      if (!token) {
        setIsLoadingAuth(false);
        return;
      }
      const currentUser = await api.get('/api/auth/me');
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('biocircuit_token');
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('biocircuit_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = `${API_URL}/api/auth/login`;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError: null,
      logout,
      navigateToLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
