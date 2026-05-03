import { createContext, useContext } from 'react';
import type { Patient, Therapist, Booking, Invoice, Branch as BranchType, User as UserType } from './store';

export type { Patient, Therapist, Booking, Invoice };

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN_CABANG' | 'TERAPIS' | 'KASIR' | 'MANAGER';
  branchId: string | null;
  branch?: any;
}

export type Branch = BranchType;

interface AppContextType {
  user: AppUser | null;
  selectedBranchId: string;
  branches: Branch[];
  patients: Patient[];
  therapists: Therapist[];
  bookings: Booking[];
  invoices: Invoice[];
  users: UserType[];
  setSelectedBranchId: (id: string) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  // CRUD
  addPatient: (p: Omit<Patient, 'id' | 'createdAt'>) => void;
  updatePatient: (id: string, p: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addTherapist: (t: Omit<Therapist, 'id'>) => void;
  updateTherapist: (id: string, t: Partial<Therapist>) => void;
  deleteTherapist: (id: string) => void;
  addBooking: (b: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, b: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addInvoice: (i: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, i: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addUser: (u: Omit<UserType, 'id'>) => void;
  updateUser: (id: string, u: Partial<UserType>) => void;
  deleteUser: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Legacy mock api shim - kept for any remaining callers
export async function api(path: string, options?: RequestInit) {
  return [];
}
