// ============================================================
// In-memory data store for UI-only demo
// All CRUD operations mutate these arrays via React state
// lifted to App context.
// ============================================================

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  therapyType: string;
  mainComplaint: string;
  address: string;
  branchId: string;
  status: string;
  createdAt: string;
  branch?: { city: string; name: string };
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  branch: string;
  branchId: string;
  email: string;
  phone: string;
  workSchedule: string;
  status: string;
  rating: number;
}

export interface Booking {
  id: string;
  patientId: string;
  therapistId: string;
  branchId: string;
  therapyType: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  patient?: { name: string };
  therapist?: { name: string };
  room?: { name: string };
  branch?: { name: string };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  branchId: string;
  total: number;
  status: string;
  paymentMethod?: string;
  issuedAt: string;
  patient?: { name: string };
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  branchId?: string;
  status: string;
}

// ---- Seed Data ----

export const INITIAL_BRANCHES: Branch[] = [
  { id: 'b1', code: 'JKT', name: 'Klinik Terapi Jakarta', city: 'Jakarta', address: 'Jl. Sudirman No. 123', phone: '021-5550123', status: 'ACTIVE' },
  { id: 'b2', code: 'BDG', name: 'Klinik Tumbuh Kembang Bandung', city: 'Bandung', address: 'Jl. Dago No. 45', phone: '022-4440123', status: 'ACTIVE' },
  { id: 'b3', code: 'SBY', name: 'Klinik Fisioterapi Surabaya', city: 'Surabaya', address: 'Jl. Tunjungan No. 88', phone: '031-3330123', status: 'ACTIVE' },
];

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'p1', name: 'Sarah J.', age: 8, gender: 'F', phone: '08123456789', therapyType: 'Fisioterapi', mainComplaint: 'Keterlambatan motorik kasar', address: 'Jakarta Selatan', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p2', name: 'Bima A.', age: 6, gender: 'M', phone: '08123456780', therapyType: 'Terapi Wicara', mainComplaint: 'Belum bisa bicara lancar', address: 'Jakarta Timur', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p3', name: 'Nadira P.', age: 10, gender: 'F', phone: '08123456781', therapyType: 'Okupasi Terapi', mainComplaint: 'Gangguan fokus', address: 'Bandung', branchId: 'b2', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Bandung', name: 'Klinik Tumbuh Kembang Bandung' } },
  { id: 'p4', name: 'Rafi M.', age: 34, gender: 'M', phone: '08123456782', therapyType: 'Rehab Medik', mainComplaint: 'Pemulihan pasca stroke', address: 'Surabaya', branchId: 'b3', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Surabaya', name: 'Klinik Fisioterapi Surabaya' } },
  { id: 'p5', name: 'Lintang K.', age: 7, gender: 'F', phone: '08123456783', therapyType: 'Tumbuh Kembang', mainComplaint: 'ASD', address: 'Tangerang', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
];

export const INITIAL_THERAPISTS: Therapist[] = [
  { id: 't1', name: 'dr. Maya Lestari, Ftr', specialization: 'Fisioterapi', branch: 'Jakarta', branchId: 'b1', email: 'maya@klinik.com', phone: '08123456789', workSchedule: 'Senin - Jumat', status: 'ACTIVE', rating: 4.9 },
  { id: 't2', name: 'Sinta Rahma, S.Tr.TW', specialization: 'Terapi Wicara', branch: 'Jakarta', branchId: 'b1', email: 'sinta@klinik.com', phone: '08123456780', workSchedule: 'Selasa - Sabtu', status: 'ACTIVE', rating: 4.8 },
  { id: 't3', name: 'Dimas Aditya, S.Psi', specialization: 'Konseling', branch: 'Jakarta', branchId: 'b1', email: 'dimas@klinik.com', phone: '08123456781', workSchedule: 'Senin - Kamis', status: 'ON_LEAVE', rating: 4.7 },
  { id: 't4', name: 'Hana Pratiwi, S.Tr.OT', specialization: 'Okupasi Terapi', branch: 'Bandung', branchId: 'b2', email: 'hana@klinik.com', phone: '08123456782', workSchedule: 'Senin - Jumat', status: 'ACTIVE', rating: 4.9 },
  { id: 't5', name: 'Rendra Saputra, Ftr', specialization: 'Rehab Medik', branch: 'Surabaya', branchId: 'b3', email: 'rendra@klinik.com', phone: '08123456783', workSchedule: 'Rabu - Minggu', status: 'ACTIVE', rating: 4.6 },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'bk1', patientId: 'p1', therapistId: 't1', branchId: 'b1', therapyType: 'Fisioterapi', bookingDate: new Date().toISOString(), startTime: '09:00', endTime: '10:00', status: 'CONFIRMED', patient: { name: 'Sarah J.' }, therapist: { name: 'dr. Maya Lestari, Ftr' }, room: { name: 'Ruang 1' }, branch: { name: 'Jakarta' } },
  { id: 'bk2', patientId: 'p2', therapistId: 't2', branchId: 'b1', therapyType: 'Terapi Wicara', bookingDate: new Date().toISOString(), startTime: '10:00', endTime: '11:00', status: 'PENDING', patient: { name: 'Bima A.' }, therapist: { name: 'Sinta Rahma' }, room: { name: 'Ruang 2' }, branch: { name: 'Jakarta' } },
  { id: 'bk3', patientId: 'p3', therapistId: 't4', branchId: 'b2', therapyType: 'Okupasi Terapi', bookingDate: new Date().toISOString(), startTime: '13:00', endTime: '14:00', status: 'CONFIRMED', patient: { name: 'Nadira P.' }, therapist: { name: 'Hana Pratiwi' }, room: { name: 'Ruang 1' }, branch: { name: 'Bandung' } },
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'INV/2024/001', patientId: 'p1', branchId: 'b1', total: 150000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Sarah J.' } },
  { id: 'inv2', invoiceNumber: 'INV/2024/002', patientId: 'p2', branchId: 'b1', total: 175000, status: 'UNPAID', issuedAt: new Date().toISOString(), patient: { name: 'Bima A.' } },
  { id: 'inv3', invoiceNumber: 'INV/2024/003', patientId: 'p3', branchId: 'b2', total: 180000, status: 'PAID', paymentMethod: 'Cash', issuedAt: new Date().toISOString(), patient: { name: 'Nadira P.' } },
];

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Owner', email: 'owner@klinik.com', role: 'OWNER', branch: 'All', status: 'ACTIVE' },
  { id: 'u2', name: 'Admin Jakarta', email: 'admin.jkt@klinik.com', role: 'ADMIN_CABANG', branch: 'Jakarta', branchId: 'b1', status: 'ACTIVE' },
  { id: 'u3', name: 'Kasir Jakarta', email: 'kasir.jkt@klinik.com', role: 'KASIR', branch: 'Jakarta', branchId: 'b1', status: 'ACTIVE' },
  { id: 'u4', name: 'Manager Bandung', email: 'manager.bdg@klinik.com', role: 'MANAGER', branch: 'Bandung', branchId: 'b2', status: 'ACTIVE' },
];

export function generateId() {
  return Math.random().toString(36).slice(2, 10);
}
