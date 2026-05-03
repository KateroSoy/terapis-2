import { createContext, useContext } from 'react';

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

// --- MOCK DATA ---

const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', code: 'JKT', name: 'Klinik Terapi Jakarta', city: 'Jakarta' },
  { id: 'b2', code: 'BDG', name: 'Klinik Tumbuh Kembang Bandung', city: 'Bandung' },
  { id: 'b3', code: 'SBY', name: 'Klinik Fisioterapi Surabaya', city: 'Surabaya' },
];

const MOCK_PATIENTS = [
  { id: 'p1', name: 'Sarah J.', age: 8, gender: 'F', phone: '08123456789', therapyType: 'Fisioterapi', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Bima A.', age: 6, gender: 'M', phone: '08123456780', therapyType: 'Terapi Wicara', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Nadira P.', age: 10, gender: 'F', phone: '08123456781', therapyType: 'Okupasi Terapi', branchId: 'b2', status: 'ACTIVE', createdAt: new Date().toISOString() },
];

const MOCK_BOOKINGS = [
  { id: 'bk1', patient: { name: 'Sarah J.' }, therapist: { name: 'dr. Maya Lestari' }, room: { name: 'Ruang 1' }, branch: { name: 'Jakarta' }, bookingDate: new Date().toISOString(), status: 'CONFIRMED' },
  { id: 'bk2', patient: { name: 'Bima A.' }, therapist: { name: 'Sinta Rahma' }, room: { name: 'Ruang 2' }, branch: { name: 'Jakarta' }, bookingDate: new Date().toISOString(), status: 'PENDING' },
];

const MOCK_INVOICES = [
  { id: 'inv1', invoiceNumber: 'INV/2024/001', patient: { name: 'Sarah J.' }, total: 150000, status: 'PAID', issuedAt: new Date().toISOString() },
  { id: 'inv2', invoiceNumber: 'INV/2024/002', patient: { name: 'Bima A.' }, total: 175000, status: 'UNPAID', issuedAt: new Date().toISOString() },
];

// --- MOCK API FUNCTION ---

export async function api(path: string, options?: RequestInit) {
  console.log(`Mock API call: ${path}`, options);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (path.startsWith('/api/branches')) {
    return MOCK_BRANCHES;
  }

  if (path.startsWith('/api/auth/login')) {
    const { email } = JSON.parse(options?.body as string || '{}');
    return {
      success: true,
      user: {
        id: 'u1',
        name: 'Demo User',
        email: email || 'demo@example.com',
        role: 'OWNER',
        branchId: null
      }
    };
  }

  if (path.startsWith('/api/reports/dashboard')) {
    return {
      patientCount: 124,
      bookingCount: 45,
      therapistCount: 12,
      revenue: 15750000
    };
  }

  if (path.startsWith('/api/patients')) {
    return MOCK_PATIENTS;
  }

  if (path.startsWith('/api/bookings')) {
    return MOCK_BOOKINGS;
  }

  if (path.startsWith('/api/invoices')) {
    return MOCK_INVOICES;
  }

  return [];
}
