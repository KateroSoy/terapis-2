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
  { id: 'b1', code: 'JKT', name: 'Klinik Terapi Sehat Jakarta Sudirman', city: 'Jakarta', address: 'Jl. Sudirman No. 123, Jakarta Pusat', phone: '021-5550123', status: 'ACTIVE' },
  { id: 'b2', code: 'BDG', name: 'Klinik Tumbuh Kembang Bandung', city: 'Bandung', address: 'Jl. Dago Pakar No. 45, Bandung', phone: '022-4440123', status: 'ACTIVE' },
  { id: 'b3', code: 'SBY', name: 'Klinik Fisioterapi Surabaya', city: 'Surabaya', address: 'Jl. Pemuda No. 88, Surabaya', phone: '031-3330123', status: 'ACTIVE' },
  { id: 'b4', code: 'TNG', name: 'Klinik Rehab Medik Tangerang', city: 'Tangerang', address: 'Jl. Serpong Utama No. 200, Tangerang', phone: '021-6660123', status: 'ACTIVE' },
];

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'p1', name: 'Sarah Johanna', age: 8, gender: 'F', phone: '08123456789', therapyType: 'Fisioterapi', mainComplaint: 'Keterlambatan motorik kasar', address: 'Jakarta Selatan', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p2', name: 'Bima Aditya', age: 6, gender: 'M', phone: '08123456780', therapyType: 'Terapi Wicara', mainComplaint: 'Belum bisa bicara lancar', address: 'Jakarta Timur', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p3', name: 'Nadira Putri', age: 10, gender: 'F', phone: '08123456781', therapyType: 'Okupasi Terapi', mainComplaint: 'Gangguan fokus dan konsentrasi', address: 'Bandung', branchId: 'b2', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Bandung', name: 'Klinik Tumbuh Kembang Bandung' } },
  { id: 'p4', name: 'Rafi Mustofa', age: 34, gender: 'M', phone: '08123456782', therapyType: 'Rehab Medik', mainComplaint: 'Pemulihan pasca stroke', address: 'Surabaya', branchId: 'b3', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Surabaya', name: 'Klinik Fisioterapi Surabaya' } },
  { id: 'p5', name: 'Lintang Kusuma', age: 7, gender: 'F', phone: '08123456783', therapyType: 'Tumbuh Kembang', mainComplaint: 'ASD Level 1', address: 'Jakarta Barat', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p6', name: 'Arjun Prabowo', age: 9, gender: 'M', phone: '08123456784', therapyType: 'Fisioterapi', mainComplaint: 'Keterlambatan motorik', address: 'Jakarta Pusat', branchId: 'b1', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Jakarta', name: 'Klinik Terapi Jakarta' } },
  { id: 'p7', name: 'Mila Santoso', age: 5, gender: 'F', phone: '08123456785', therapyType: 'Terapi Wicara', mainComplaint: 'Speech delay', address: 'Bandung', branchId: 'b2', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Bandung', name: 'Klinik Tumbuh Kembang Bandung' } },
  { id: 'p8', name: 'Doni Hermawan', age: 45, gender: 'M', phone: '08123456786', therapyType: 'Rehab Medik', mainComplaint: 'Perbaikan postur tubuh', address: 'Tangerang', branchId: 'b4', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Tangerang', name: 'Klinik Rehab Medik Tangerang' } },
  { id: 'p9', name: 'Citra Dewi', age: 12, gender: 'F', phone: '08123456787', therapyType: 'Konseling', mainComplaint: 'Masalah emosional dan sosial', address: 'Surabaya', branchId: 'b3', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Surabaya', name: 'Klinik Fisioterapi Surabaya' } },
  { id: 'p10', name: 'Evan Pratama', age: 8, gender: 'M', phone: '08123456788', therapyType: 'Okupasi Terapi', mainComplaint: 'Fine motor delay', address: 'Bandung', branchId: 'b2', status: 'ACTIVE', createdAt: new Date().toISOString(), branch: { city: 'Bandung', name: 'Klinik Tumbuh Kembang Bandung' } },
];

export const INITIAL_THERAPISTS: Therapist[] = [
  { id: 't1', name: 'dr. Maya Lestari, Ftr', specialization: 'Fisioterapi', branch: 'Jakarta', branchId: 'b1', email: 'maya@klinik.com', phone: '08123456789', workSchedule: 'Senin - Jumat', status: 'ACTIVE', rating: 4.9 },
  { id: 't2', name: 'Sinta Rahma, S.Tr.TW', specialization: 'Terapi Wicara', branch: 'Jakarta', branchId: 'b1', email: 'sinta@klinik.com', phone: '08123456780', workSchedule: 'Selasa - Sabtu', status: 'ACTIVE', rating: 4.8 },
  { id: 't3', name: 'Dimas Aditya, S.Psi', specialization: 'Konseling', branch: 'Jakarta', branchId: 'b1', email: 'dimas@klinik.com', phone: '08123456781', workSchedule: 'Senin - Kamis', status: 'ACTIVE', rating: 4.7 },
  { id: 't4', name: 'Hana Pratiwi, S.Tr.OT', specialization: 'Okupasi Terapi', branch: 'Bandung', branchId: 'b2', email: 'hana@klinik.com', phone: '08123456782', workSchedule: 'Senin - Jumat', status: 'ACTIVE', rating: 4.9 },
  { id: 't5', name: 'Rendra Saputra, Ftr', specialization: 'Rehab Medik', branch: 'Surabaya', branchId: 'b3', email: 'rendra@klinik.com', phone: '08123456783', workSchedule: 'Rabu - Minggu', status: 'ACTIVE', rating: 4.6 },
  { id: 't6', name: 'Fiona Kusuma, S.Psi', specialization: 'Psikolog Anak', branch: 'Bandung', branchId: 'b2', email: 'fiona@klinik.com', phone: '08123456784', workSchedule: 'Senin - Jumat', status: 'ACTIVE', rating: 4.8 },
  { id: 't7', name: 'Rizki Pratama, S.Tr.Ft', specialization: 'Fisioterapi', branch: 'Jakarta', branchId: 'b1', email: 'rizki@klinik.com', phone: '08123456785', workSchedule: 'Senin - Sabtu', status: 'ACTIVE', rating: 4.7 },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'bk1', patientId: 'p1', therapistId: 't1', branchId: 'b1', therapyType: 'Fisioterapi', bookingDate: new Date().toISOString(), startTime: '09:00', endTime: '10:00', status: 'COMPLETED', patient: { name: 'Sarah Johanna' }, therapist: { name: 'dr. Maya Lestari, Ftr' }, room: { name: 'Ruang 1' }, branch: { name: 'Jakarta' } },
  { id: 'bk2', patientId: 'p2', therapistId: 't2', branchId: 'b1', therapyType: 'Terapi Wicara', bookingDate: new Date().toISOString(), startTime: '10:30', endTime: '11:30', status: 'IN_PROGRESS', patient: { name: 'Bima Aditya' }, therapist: { name: 'Sinta Rahma' }, room: { name: 'Ruang 2' }, branch: { name: 'Jakarta' } },
  { id: 'bk3', patientId: 'p3', therapistId: 't4', branchId: 'b2', therapyType: 'Okupasi Terapi', bookingDate: new Date().toISOString(), startTime: '13:00', endTime: '14:00', status: 'CONFIRMED', patient: { name: 'Nadira Putri' }, therapist: { name: 'Hana Pratiwi' }, room: { name: 'Ruang 1' }, branch: { name: 'Bandung' } },
  { id: 'bk4', patientId: 'p4', therapistId: 't5', branchId: 'b3', therapyType: 'Rehab Medik', bookingDate: new Date().toISOString(), startTime: '14:30', endTime: '15:30', status: 'CONFIRMED', patient: { name: 'Rafi Mustofa' }, therapist: { name: 'Rendra Saputra' }, room: { name: 'Ruang 3' }, branch: { name: 'Surabaya' } },
  { id: 'bk5', patientId: 'p5', therapistId: 't1', branchId: 'b1', therapyType: 'Tumbuh Kembang', bookingDate: new Date().toISOString(), startTime: '15:00', endTime: '16:00', status: 'CONFIRMED', patient: { name: 'Lintang Kusuma' }, therapist: { name: 'dr. Maya Lestari, Ftr' }, room: { name: 'Ruang 4' }, branch: { name: 'Jakarta' } },
  { id: 'bk6', patientId: 'p6', therapistId: 't7', branchId: 'b1', therapyType: 'Fisioterapi', bookingDate: new Date().toISOString(), startTime: '16:00', endTime: '17:00', status: 'CONFIRMED', patient: { name: 'Arjun Prabowo' }, therapist: { name: 'Rizki Pratama' }, room: { name: 'Ruang 1' }, branch: { name: 'Jakarta' } },
  { id: 'bk7', patientId: 'p7', therapistId: 't2', branchId: 'b2', therapyType: 'Terapi Wicara', bookingDate: new Date().toISOString(), startTime: '10:00', endTime: '11:00', status: 'COMPLETED', patient: { name: 'Mila Santoso' }, therapist: { name: 'Sinta Rahma' }, room: { name: 'Ruang 2' }, branch: { name: 'Bandung' } },
  { id: 'bk8', patientId: 'p8', therapistId: 't5', branchId: 'b4', therapyType: 'Rehab Medik', bookingDate: new Date().toISOString(), startTime: '11:00', endTime: '12:00', status: 'CONFIRMED', patient: { name: 'Doni Hermawan' }, therapist: { name: 'Rendra Saputra' }, room: { name: 'Ruang 1' }, branch: { name: 'Tangerang' } },
  { id: 'bk9', patientId: 'p9', therapistId: 't3', branchId: 'b3', therapyType: 'Konseling', bookingDate: new Date().toISOString(), startTime: '13:30', endTime: '14:30', status: 'CONFIRMED', patient: { name: 'Citra Dewi' }, therapist: { name: 'Dimas Aditya' }, room: { name: 'Ruang 2' }, branch: { name: 'Surabaya' } },
  { id: 'bk10', patientId: 'p10', therapistId: 't4', branchId: 'b2', therapyType: 'Okupasi Terapi', bookingDate: new Date().toISOString(), startTime: '14:00', endTime: '15:00', status: 'CONFIRMED', patient: { name: 'Evan Pratama' }, therapist: { name: 'Hana Pratiwi' }, room: { name: 'Ruang 3' }, branch: { name: 'Bandung' } },
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'JKT-INV-2026-0001', patientId: 'p1', branchId: 'b1', total: 150000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Sarah Johanna' } },
  { id: 'inv2', invoiceNumber: 'JKT-INV-2026-0002', patientId: 'p2', branchId: 'b1', total: 175000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Bima Aditya' } },
  { id: 'inv3', invoiceNumber: 'BDG-INV-2026-0001', patientId: 'p3', branchId: 'b2', total: 180000, status: 'PAID', paymentMethod: 'Cash', issuedAt: new Date().toISOString(), patient: { name: 'Nadira Putri' } },
  { id: 'inv4', invoiceNumber: 'SBY-INV-2026-0001', patientId: 'p4', branchId: 'b3', total: 250000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Rafi Mustofa' } },
  { id: 'inv5', invoiceNumber: 'JKT-INV-2026-0003', patientId: 'p5', branchId: 'b1', total: 200000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Lintang Kusuma' } },
  { id: 'inv6', invoiceNumber: 'JKT-INV-2026-0004', patientId: 'p6', branchId: 'b1', total: 200000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Arjun Prabowo' } },
  { id: 'inv7', invoiceNumber: 'BDG-INV-2026-0002', patientId: 'p7', branchId: 'b2', total: 160000, status: 'PAID', paymentMethod: 'Cash', issuedAt: new Date().toISOString(), patient: { name: 'Mila Santoso' } },
  { id: 'inv8', invoiceNumber: 'TNG-INV-2026-0001', patientId: 'p8', branchId: 'b4', total: 280000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Doni Hermawan' } },
  { id: 'inv9', invoiceNumber: 'SBY-INV-2026-0002', patientId: 'p9', branchId: 'b3', total: 220000, status: 'PAID', paymentMethod: 'Transfer', issuedAt: new Date().toISOString(), patient: { name: 'Citra Dewi' } },
  { id: 'inv10', invoiceNumber: 'BDG-INV-2026-0003', patientId: 'p10', branchId: 'b2', total: 190000, status: 'PAID', paymentMethod: 'Cash', issuedAt: new Date().toISOString(), patient: { name: 'Evan Pratama' } },
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
