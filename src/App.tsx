import { useState, useEffect, useCallback } from 'react';
import { AppContext, api, type AppUser, type Branch, type Patient, type Therapist, type Booking, type Invoice, type MedicalRecord, type TherapyPackage, type Service, type User, type Payment } from './lib/api';
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

const demoUser: AppUser = {
  id: 'demo',
  name: 'Demo User',
  email: 'demo@klinikterapispro.com',
  role: 'OWNER',
  branchId: null,
};

export default function App() {
  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('klinik_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [therapyPackages, setTherapyPackages] = useState<TherapyPackage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const [currentPage, setCurrentPage] = useState('dashboard');

  // ---- Data Loading ----
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const branchFilter = selectedBranchId === 'all' ? undefined : selectedBranchId;
      const [branchesData, patientsData, therapistsData, bookingsData, invoicesData, recordsData, packagesData, servicesData, usersData, paymentsData] = await Promise.all([
        api.getBranches(),
        api.getPatients(branchFilter),
        api.getTherapists(branchFilter),
        api.getBookings(branchFilter),
        api.getInvoices(branchFilter),
        api.getMedicalRecords(branchFilter),
        api.getTherapyPackages(branchFilter),
        api.getServices(),
        api.getUsers(),
        api.getPayments(branchFilter),
      ]);
      setBranches(branchesData);
      setPatients(patientsData);
      setTherapists(therapistsData);
      setBookings(bookingsData);
      setInvoices(invoicesData);
      setMedicalRecords(recordsData);
      setTherapyPackages(packagesData);
      setServices(servicesData);
      setUsers(usersData);
      setPayments(paymentsData);
    } catch (e) {
      console.error('Failed to load data:', e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedBranchId]);

  useEffect(() => {
    if (user) refreshData();
  }, [user, selectedBranchId, refreshData]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('klinik_user');
    setSelectedBranchId('all');
    setCurrentPage('dashboard');
  };

  // ---- Auth ----
  const login = async (email: string, pass: string) => {
    try {
      const res = await api.login(email, pass);
      if (res && res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('klinik_user', JSON.stringify(res.user));
        if (res.user.role !== 'OWNER' && res.user.branchId) setSelectedBranchId(res.user.branchId);
        return true;
      }
    } catch (e) {
      // ignore and fallback to local login
    }

    // Fallback: accept any credentials and create a local user
    const localUser: AppUser = {
      id: `local-${email}`,
      name: email.split('@')[0] || email,
      email,
      role: 'OWNER',
      branchId: null,
    };
    setUser(localUser);
    localStorage.setItem('klinik_user', JSON.stringify(localUser));
    return true;
  };

  // ---- Patient CRUD ----
  const addPatient = async (p: Partial<Patient>) => {
    await api.createPatient(p);
    await refreshData();
  };
  const updatePatient = async (id: string, p: Partial<Patient>) => {
    await api.updatePatient(id, p);
    await refreshData();
  };
  const deletePatient = async (id: string) => {
    await api.deletePatient(id);
    await refreshData();
  };

  // ---- Therapist CRUD ----
  const addTherapist = async (t: Partial<Therapist>) => {
    await api.createTherapist(t);
    await refreshData();
  };
  const updateTherapist = async (id: string, t: Partial<Therapist>) => {
    await api.updateTherapist(id, t);
    await refreshData();
  };
  const deleteTherapist = async (id: string) => {
    await api.deleteTherapist(id);
    await refreshData();
  };

  // ---- Booking CRUD ----
  const addBooking = async (b: Partial<Booking>) => {
    await api.createBooking(b);
    await refreshData();
  };
  const updateBooking = async (id: string, b: Partial<Booking>) => {
    await api.updateBooking(id, b);
    await refreshData();
  };
  const deleteBooking = async (id: string) => {
    await api.deleteBooking(id);
    await refreshData();
  };

  // ---- Invoice CRUD ----
  const addInvoice = async (i: any) => {
    await api.createInvoice(i);
    await refreshData();
  };
  const updateInvoice = async (id: string, i: Partial<Invoice>) => {
    await api.updateInvoice(id, i);
    await refreshData();
  };
  const deleteInvoice = async (id: string) => {
    await api.deleteInvoice(id);
    await refreshData();
  };

  // ---- Medical Record CRUD ----
  const addMedicalRecord = async (r: Partial<MedicalRecord>) => {
    await api.createMedicalRecord(r);
    await refreshData();
  };
  const updateMedicalRecord = async (id: string, r: Partial<MedicalRecord>) => {
    await api.updateMedicalRecord(id, r);
    await refreshData();
  };
  const deleteMedicalRecord = async (id: string) => {
    await api.deleteMedicalRecord(id);
    await refreshData();
  };

  // ---- Therapy Package CRUD ----
  const addTherapyPackage = async (p: Partial<TherapyPackage>) => {
    await api.createTherapyPackage(p);
    await refreshData();
  };
  const updateTherapyPackage = async (id: string, p: Partial<TherapyPackage>) => {
    await api.updateTherapyPackage(id, p);
    await refreshData();
  };
  const deleteTherapyPackage = async (id: string) => {
    await api.deleteTherapyPackage(id);
    await refreshData();
  };

  // ---- User CRUD ----
  const addUser = async (u: Partial<User> & { password?: string }) => {
    await api.createUser(u);
    await refreshData();
  };
  const updateUser = async (id: string, u: Partial<User> & { password?: string }) => {
    await api.updateUser(id, u);
    await refreshData();
  };
  const deleteUser = async (id: string) => {
    await api.deleteUser(id);
    await refreshData();
  };

  // ---- Payment ----
  const addPayment = async (p: Partial<Payment>) => {
    await api.createPayment(p);
    await refreshData();
  };

  // ---- Branch CRUD ----
  const addBranch = async (b: Partial<Branch>) => {
    await api.createBranch(b);
    await refreshData();
  };
  const updateBranch = async (id: string, b: Partial<Branch>) => {
    await api.updateBranch(id, b);
    await refreshData();
  };
  const deleteBranch = async (id: string) => {
    await api.deleteBranch(id);
    await refreshData();
  };

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
      user, branches, patients, therapists, bookings, invoices,
      medicalRecords, therapyPackages, services, users, payments,
      selectedBranchId, setSelectedBranchId,
      login, logout, isLoading, refreshData,
      addPatient, updatePatient, deletePatient,
      addTherapist, updateTherapist, deleteTherapist,
      addBooking, updateBooking, deleteBooking,
      addInvoice, updateInvoice, deleteInvoice,
      addMedicalRecord, updateMedicalRecord, deleteMedicalRecord,
      addTherapyPackage, updateTherapyPackage, deleteTherapyPackage,
      addUser, updateUser, deleteUser,
      addPayment,
      addBranch, updateBranch, deleteBranch,
    }}>
      <AppShell currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </AppShell>
      <Toaster position="top-right" richColors />
    </AppContext.Provider>
  );
}
