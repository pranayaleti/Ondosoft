import { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { authAPI, tokenStorage } from '../utils/auth.js';

const defaultAuthContext = {
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  signup: async () => {
    throw new Error('AuthProvider is not ready yet. Please wait for initialization.');
  },
  signin: async () => {
    throw new Error('AuthProvider is not ready yet. Please wait for initialization.');
  },
  signout: async () => {
    throw new Error('AuthProvider is not ready yet. Please wait for initialization.');
  },
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCheckedSessionRef = useRef(false);
  const isCheckingSessionRef = useRef(false);
  const isMountedRef = useRef(true);
  const sessionTimeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (!hasCheckedSessionRef.current && !isCheckingSessionRef.current) {
      hasCheckedSessionRef.current = true;
      checkSession();
    }
    return () => {
      isMountedRef.current = false;
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
        sessionTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && loading) {
      setLoading(false);
    }
  }, [user, loading]);

  const safeSetUser = (next) => {
    if (isMountedRef.current) setUser(next);
  };
  const safeSetLoading = (next) => {
    if (isMountedRef.current) setLoading(next);
  };

  const checkSession = async () => {
    if (isCheckingSessionRef.current) return;
    isCheckingSessionRef.current = true;

    sessionTimeoutRef.current = setTimeout(() => {
      if (isCheckingSessionRef.current && isMountedRef.current) {
        console.warn('Session check taking too long, setting loading to false');
        safeSetLoading(false);
      }
      sessionTimeoutRef.current = null;
    }, 10000);

    try {
      const data = await authAPI.getSession();
      if (!isMountedRef.current) return;
      safeSetUser(data && data.user ? data.user : null);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Session check failed:', error);
      }
      safeSetUser(null);
    } finally {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
        sessionTimeoutRef.current = null;
      }
      safeSetLoading(false);
      isCheckingSessionRef.current = false;
    }
  };

  const signup = async (email, password, name, additionalData = {}) => {
    try {
      const data = await authAPI.signup(email, password, name, additionalData);
      setUser(data.user);
      // Ensure loading is set to false after successful signup
      setLoading(false);
      return data;
    } catch (error) {
      // Ensure loading is set to false even on error
      setLoading(false);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const data = await authAPI.signin(email, password);
      setUser(data.user);
      // Ensure loading is set to false after successful signin
      setLoading(false);
      return data;
    } catch (error) {
      // Ensure loading is set to false even on error
      setLoading(false);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await authAPI.signout();
      setUser(null);
      tokenStorage.remove();
    } catch (error) {
      console.error('Signout failed:', error);
      // Always clear user and token even if request fails
      setUser(null);
      tokenStorage.remove();
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    signup,
    signin,
    signout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

