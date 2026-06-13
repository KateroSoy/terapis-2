import { createContext, useContext } from 'react';

// ============================================================
// Types
// ============================================================
export interface AppUser {
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
  address: string;
  phone: string;
  email: string;
  picName: string;
  operatingHours: string;
  status: string;
  brandColor?: string;
  _count?: { patients: number; users: number; therapists: number; bookings: number };
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  guardianName?: string;
  guardianPhone?: string;
  therapyType: string;
  mainComplaint: string;
  address: string;
  branchId: string;
  status: string;
  createdAt: string;
  lastVisitAt?: string;
  branch?: { id: string; city: string; name: string };
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  branchId: string;
  email: string;
  phone: string;
  workSchedule: string;
  status: string;
  rating: number;
  branch?: { id: string; city: string; name: string };
}

export interface Booking {
  id: string;
  patientId: string;
  therapistId: string;
  branchId: string;
  roomId?: string;
  therapyType: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentStatus?: string;
  notes?: string;
  createdAt?: string;
  patient?: { id: string; name: string };
  therapist?: { id: string; name: string };
  room?: { id: string; name: string };
  branch?: { id: string; name: string };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  branchId: string;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  paymentMethod?: string;
  issuedAt: string;
  paidAt?: string;
  patient?: { id: string; name: string };
  branch?: { id: string; name: string };
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id?: string;
  serviceName: string;
  qty: number;
  price: number;
  total: number;
}

export interface MedicalRecord {
  id: string;
  branchId: string;
  patientId: string;
  therapistId: string;
  therapyType: string;
  sessionNumber: number;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  treatmentGiven: string;
  homeExercise: string;
  progressStatus: string;
  nextPlan?: string;
  recordDate: string;
  bookingId?: string;
  patient?: { id: string; name: string };
  therapist?: { id: string; name: string };
  branch?: { id: string; name: string };
}

export interface TherapyPackage {
  id: string;
  branchId: string;
  patientId: string;
  packageName: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  price: number;
  status: string;
  expiredAt?: string;
  createdAt: string;
  patient?: { id: string; name: string };
  branch?: { id: string; name: string };
}

export interface Service {
  id: string;
  name: string;
  type: string;
  price: number;
  durationMinutes: number;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId?: string | null;
  status: string;
  branch?: { id: string; name: string; city: string } | null;
}

export interface Payment {
  id: string;
  branchId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
  patient?: { id: string; name: string };
  invoice?: { id: string; invoiceNumber: string };
}

// ============================================================
// API Helper
// ============================================================
const BASE = '/api';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchApi<{ success: boolean; user: AppUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  // Branches
  getBranches: () => fetchApi<Branch[]>('/branches'),
  createBranch: (data: Partial<Branch>) => fetchApi<Branch>('/branches', { method: 'POST', body: JSON.stringify(data) }),
  updateBranch: (id: string, data: Partial<Branch>) => fetchApi<Branch>(`/branches/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBranch: (id: string) => fetchApi(`/branches/${id}`, { method: 'DELETE' }),

  // Patients
  getPatients: (branchId?: string) => fetchApi<Patient[]>(`/patients${branchId ? `?branchId=${branchId}` : ''}`),
  createPatient: (data: Partial<Patient>) => fetchApi<Patient>('/patients', { method: 'POST', body: JSON.stringify(data) }),
  updatePatient: (id: string, data: Partial<Patient>) => fetchApi<Patient>(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePatient: (id: string) => fetchApi(`/patients/${id}`, { method: 'DELETE' }),

  // Therapists
  getTherapists: (branchId?: string) => fetchApi<Therapist[]>(`/therapists${branchId ? `?branchId=${branchId}` : ''}`),
  createTherapist: (data: Partial<Therapist>) => fetchApi<Therapist>('/therapists', { method: 'POST', body: JSON.stringify(data) }),
  updateTherapist: (id: string, data: Partial<Therapist>) => fetchApi<Therapist>(`/therapists/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTherapist: (id: string) => fetchApi(`/therapists/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: (branchId?: string) => fetchApi<Booking[]>(`/bookings${branchId ? `?branchId=${branchId}` : ''}`),
  createBooking: (data: Partial<Booking>) => fetchApi<Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBooking: (id: string, data: Partial<Booking>) => fetchApi<Booking>(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBooking: (id: string) => fetchApi(`/bookings/${id}`, { method: 'DELETE' }),

  // Invoices
  getInvoices: (branchId?: string) => fetchApi<Invoice[]>(`/invoices${branchId ? `?branchId=${branchId}` : ''}`),
  createInvoice: (data: any) => fetchApi<Invoice>('/invoices', { method: 'POST', body: JSON.stringify(data) }),
  updateInvoice: (id: string, data: Partial<Invoice>) => fetchApi<Invoice>(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInvoice: (id: string) => fetchApi(`/invoices/${id}`, { method: 'DELETE' }),

  // Medical Records
  getMedicalRecords: (branchId?: string, patientId?: string) => {
    const params = new URLSearchParams();
    if (branchId) params.set('branchId', branchId);
    if (patientId) params.set('patientId', patientId);
    const qs = params.toString();
    return fetchApi<MedicalRecord[]>(`/medical-records${qs ? `?${qs}` : ''}`);
  },
  createMedicalRecord: (data: Partial<MedicalRecord>) => fetchApi<MedicalRecord>('/medical-records', { method: 'POST', body: JSON.stringify(data) }),
  updateMedicalRecord: (id: string, data: Partial<MedicalRecord>) => fetchApi<MedicalRecord>(`/medical-records/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMedicalRecord: (id: string) => fetchApi(`/medical-records/${id}`, { method: 'DELETE' }),

  // Therapy Packages
  getTherapyPackages: (branchId?: string) => fetchApi<TherapyPackage[]>(`/therapy-packages${branchId ? `?branchId=${branchId}` : ''}`),
  createTherapyPackage: (data: Partial<TherapyPackage>) => fetchApi<TherapyPackage>('/therapy-packages', { method: 'POST', body: JSON.stringify(data) }),
  updateTherapyPackage: (id: string, data: Partial<TherapyPackage>) => fetchApi<TherapyPackage>(`/therapy-packages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTherapyPackage: (id: string) => fetchApi(`/therapy-packages/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => fetchApi<Service[]>('/services'),
  createService: (data: Partial<Service>) => fetchApi<Service>('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: string, data: Partial<Service>) => fetchApi<Service>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: string) => fetchApi(`/services/${id}`, { method: 'DELETE' }),

  // Users
  getUsers: () => fetchApi<User[]>('/users'),
  createUser: (data: Partial<User> & { password?: string }) => fetchApi<User>('/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id: string, data: Partial<User> & { password?: string }) => fetchApi<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id: string) => fetchApi(`/users/${id}`, { method: 'DELETE' }),

  // Payments
  getPayments: (branchId?: string) => fetchApi<Payment[]>(`/payments${branchId ? `?branchId=${branchId}` : ''}`),
  createPayment: (data: Partial<Payment>) => fetchApi<Payment>('/payments', { method: 'POST', body: JSON.stringify(data) }),

  // Reports
  getDashboard: (branchId?: string) => fetchApi<any>(`/reports/dashboard${branchId ? `?branchId=${branchId}` : ''}`),
  getRevenue: (branchId?: string) => fetchApi<any>(`/reports/revenue${branchId ? `?branchId=${branchId}` : ''}`),

  // Rooms
  getRooms: (branchId?: string) => fetchApi<any[]>(`/rooms${branchId ? `?branchId=${branchId}` : ''}`),
};

// ============================================================
// App Context
// ============================================================
export interface AppContextType {
  user: AppUser | null;
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  branches: Branch[];
  patients: Patient[];
  therapists: Therapist[];
  bookings: Booking[];
  invoices: Invoice[];
  medicalRecords: MedicalRecord[];
  therapyPackages: TherapyPackage[];
  services: Service[];
  users: User[];
  payments: Payment[];
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  refreshData: () => Promise<void>;
  // CRUD
  addPatient: (p: Partial<Patient>) => Promise<void>;
  updatePatient: (id: string, p: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  addTherapist: (t: Partial<Therapist>) => Promise<void>;
  updateTherapist: (id: string, t: Partial<Therapist>) => Promise<void>;
  deleteTherapist: (id: string) => Promise<void>;
  addBooking: (b: Partial<Booking>) => Promise<void>;
  updateBooking: (id: string, b: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  addInvoice: (i: any) => Promise<void>;
  updateInvoice: (id: string, i: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  addMedicalRecord: (r: Partial<MedicalRecord>) => Promise<void>;
  updateMedicalRecord: (id: string, r: Partial<MedicalRecord>) => Promise<void>;
  deleteMedicalRecord: (id: string) => Promise<void>;
  addTherapyPackage: (p: Partial<TherapyPackage>) => Promise<void>;
  updateTherapyPackage: (id: string, p: Partial<TherapyPackage>) => Promise<void>;
  deleteTherapyPackage: (id: string) => Promise<void>;
  addUser: (u: Partial<User> & { password?: string }) => Promise<void>;
  updateUser: (id: string, u: Partial<User> & { password?: string }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addPayment: (p: Partial<Payment>) => Promise<void>;
  addBranch: (b: Partial<Branch>) => Promise<void>;
  updateBranch: (id: string, b: Partial<Branch>) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
