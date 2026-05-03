import { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN_CABANG' | 'TERAPIS' | 'KASIR' | 'MANAGER';
  branchId: string | null;
  branch?: any;
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  city: string;
}

interface AppContextType {
  user: User | null;
  selectedBranchId: string;
  branches: Branch[];
  setSelectedBranchId: (id: string) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export function api(path: string, options?: RequestInit) {
  return fetch(path, options).then(res => res.json());
}
