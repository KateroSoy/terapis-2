import { useState } from 'react';
import { AppContext, AppUser } from './lib/api';
import {
  INITIAL_BRANCHES, INITIAL_PATIENTS, INITIAL_THERAPISTS,
  INITIAL_BOOKINGS, INITIAL_INVOICES, INITIAL_USERS,
  generateId,
  type Patient, type Therapist, type Booking, type Invoice, type Branch, type User,
} from './lib/store';
import { Login } from './pages/Login';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Bookings } from './pages/Bookings';
import { Invoices } from './pages/Invoices';
import { Therapists } from './pages/Therapists';
import { MedicalRecords } from './pages/MedicalRecords';
import { Cashier } from './pages/Cashier';
import { TherapyPackages } from './pages/TherapyPackages';
import { Reports } from './pages/Reports';
import { Branches } from './pages/Branches';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { Toaster } from 'sonner';

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [branches]      = useState<Branch[]>(INITIAL_BRANCHES);
  const [patients, setPatients]       = useState<Patient[]>(INITIAL_PATIENTS);
  const [therapists, setTherapists]   = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [bookings, setBookings]       = useState<Booking[]>(INITIAL_BOOKINGS);
  const [invoices, setInvoices]       = useState<Invoice[]>(INITIAL_INVOICES);
  const [users, setUsers]             = useState<User[]>(INITIAL_USERS);
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const login = async (email: string, pass: string) => {
    setUser({ id: 'u0', name: 'Demo Owner', email, role: 'OWNER', branchId: null });
    return true;
  };
  const logout = () => { setUser(null); setSelectedBranchId('all'); setCurrentPage('dashboard'); };

  // ---- Patient CRUD ----
  const addPatient    = (p: Omit<Patient,'id'|'createdAt'>) =>
    setPatients(prev => [...prev, { ...p, id: generateId(), createdAt: new Date().toISOString(), branch: branches.find(b=>b.id===p.branchId) as any }]);
  const updatePatient = (id: string, p: Partial<Patient>) =>
    setPatients(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  const deletePatient = (id: string) =>
    setPatients(prev => prev.filter(x => x.id !== id));

  // ---- Therapist CRUD ----
  const addTherapist    = (t: Omit<Therapist,'id'>) =>
    setTherapists(prev => [...prev, { ...t, id: generateId() }]);
  const updateTherapist = (id: string, t: Partial<Therapist>) =>
    setTherapists(prev => prev.map(x => x.id === id ? { ...x, ...t } : x));
  const deleteTherapist = (id: string) =>
    setTherapists(prev => prev.filter(x => x.id !== id));

  // ---- Booking CRUD ----
  const addBooking    = (b: Omit<Booking,'id'>) =>
    setBookings(prev => [...prev, { ...b, id: generateId(),
      patient: patients.find(p=>p.id===b.patientId) as any,
      therapist: therapists.find(t=>t.id===b.therapistId) as any }]);
  const updateBooking = (id: string, b: Partial<Booking>) =>
    setBookings(prev => prev.map(x => x.id === id ? { ...x, ...b } : x));
  const deleteBooking = (id: string) =>
    setBookings(prev => prev.filter(x => x.id !== id));

  // ---- Invoice CRUD ----
  const nextInvNo = () => `INV/2024/${String(invoices.length + 1).padStart(3,'0')}`;
  const addInvoice    = (i: Omit<Invoice,'id'>) =>
    setInvoices(prev => [...prev, { ...i, id: generateId(),
      invoiceNumber: nextInvNo(),
      patient: patients.find(p=>p.id===i.patientId) as any }]);
  const updateInvoice = (id: string, i: Partial<Invoice>) =>
    setInvoices(prev => prev.map(x => x.id === id ? { ...x, ...i } : x));
  const deleteInvoice = (id: string) =>
    setInvoices(prev => prev.filter(x => x.id !== id));

  // ---- User CRUD ----
  const addUser    = (u: Omit<User,'id'>) =>
    setUsers(prev => [...prev, { ...u, id: generateId() }]);
  const updateUser = (id: string, u: Partial<User>) =>
    setUsers(prev => prev.map(x => x.id === id ? { ...x, ...u } : x));
  const deleteUser = (id: string) =>
    setUsers(prev => prev.filter(x => x.id !== id));

  if (!user) {
    return (
      <>
        <Login onLogin={login} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':        return <Dashboard />;
      case 'patients':         return <Patients />;
      case 'bookings':         return <Bookings />;
      case 'invoices':         return <Invoices />;
      case 'therapists':       return <Therapists />;
      case 'medical-records':  return <MedicalRecords />;
      case 'cashier':          return <Cashier />;
      case 'therapy-packages': return <TherapyPackages />;
      case 'reports':          return <Reports />;
      case 'branches':         return <Branches />;
      case 'users':            return <Users />;
      case 'settings':         return <Settings />;
      default:                 return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{
      user, branches, patients, therapists, bookings, invoices, users,
      selectedBranchId, setSelectedBranchId,
      login, logout, isLoading: false,
      addPatient, updatePatient, deletePatient,
      addTherapist, updateTherapist, deleteTherapist,
      addBooking, updateBooking, deleteBooking,
      addInvoice, updateInvoice, deleteInvoice,
      addUser, updateUser, deleteUser,
    }}>
      <AppShell currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </AppShell>
      <Toaster position="top-right" richColors />
    </AppContext.Provider>
  );
}
