import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CoreAdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: 'admin' | 'staff' | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsStaff: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const CoreAdminContext = createContext<CoreAdminContextType | undefined>(undefined);

const STORAGE_KEY = 'core_admin_auth';
const USER_TYPE_KEY = 'core_admin_type';

const CORE_ADMIN_CREDENTIALS = {
  email: 'coreadmin@example.com',
  password: 'admin123!@#'
};

export function CoreAdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [userType, setUserType] = useState<'admin' | 'staff' | null>(() => {
    return localStorage.getItem(USER_TYPE_KEY) as 'admin' | 'staff' | null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        throw new Error('メールアドレスとパスワードを入力してください');
      }
      
      if (email === CORE_ADMIN_CREDENTIALS.email && password === CORE_ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        setUserType('admin');
        localStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(USER_TYPE_KEY, 'admin');
        navigate('/coreadmin/dashboard');
      } else {
        throw new Error('メールアドレスまたはパスワードが正しくありません');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserType(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_TYPE_KEY);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsStaff = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        throw new Error('メールアドレスとパスワードを入力してください');
      }
      
      if (email === 'staff@example.com' && password === 'staff123') {
        setIsAuthenticated(true);
        setUserType('staff');
        localStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(USER_TYPE_KEY, 'staff');
        navigate('/dashboard');
      } else {
        throw new Error('メールアドレスまたはパスワードが正しくありません');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserType(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_TYPE_KEY);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password || !fullName) {
        throw new Error('すべての必須項目を入力してください');
      }
      
      setIsAuthenticated(true);
      setUserType('admin');
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(USER_TYPE_KEY, 'admin');
      navigate('/coreadmin/dashboard');
    } catch (error) {
      setIsAuthenticated(false);
      setUserType(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_TYPE_KEY);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
    navigate('/coreadmin/login');
  };

  return (
    <CoreAdminContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userType,
        login,
        loginAsStaff,
        register,
        logout
      }}
    >
      {children}
    </CoreAdminContext.Provider>
  );
}

export function useCoreAdmin() {
  const context = useContext(CoreAdminContext);
  if (context === undefined) {
    throw new Error('useCoreAdmin must be used within a CoreAdminProvider');
  }
  return context;
}