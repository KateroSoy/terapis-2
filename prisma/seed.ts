import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Branches
  const bJakarta = await prisma.branch.create({
    data: {
      code: 'JKT',
      name: 'Klinik Terapi Jakarta',
      city: 'Jakarta',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      phone: '021-5550123',
      email: 'jakarta@klinikterapispro.com',
      picName: 'Andi Pratama',
      operatingHours: '08:00 - 20:00',
      status: 'ACTIVE',
      brandColor: '#4F9FD8'
    }
  });

  const bBandung = await prisma.branch.create({
    data: {
      code: 'BDG',
      name: 'Klinik Tumbuh Kembang Bandung',
      city: 'Bandung',
      address: 'Jl. Dago No. 45, Bandung',
      phone: '022-4440123',
      email: 'bandung@klinikterapispro.com',
      picName: 'Siti Aminah',
      operatingHours: '08:00 - 18:00',
      status: 'ACTIVE',
      brandColor: '#48C7A0'
    }
  });

  const bSurabaya = await prisma.branch.create({
    data: {
      code: 'SBY',
      name: 'Klinik Fisioterapi Surabaya',
      city: 'Surabaya',
      address: 'Jl. Tunjungan No. 88, Surabaya',
      phone: '031-3330123',
      email: 'surabaya@klinikterapispro.com',
      picName: 'Budi Santoso',
      operatingHours: '09:00 - 21:00',
      status: 'ACTIVE',
      brandColor: '#F6B95B'
    }
  });

  const bTangerang = await prisma.branch.create({
    data: {
      code: 'TNG',
      name: 'Klinik Rehab Tangerang',
      city: 'Tangerang',
      address: 'Jl. BSD Utama No. 10, Tangerang',
      phone: '021-7770123',
      email: 'tangerang@klinikterapispro.com',
      picName: 'Rina Wijaya',
      operatingHours: '08:00 - 17:00',
      status: 'ACTIVE',
      brandColor: '#EF6B6B'
    }
  });

  // Users
  const users = [
    { name: 'Owner', email: 'owner@klinikterapispro.com', role: 'OWNER', branchId: null },
    { name: 'Admin Jakarta', email: 'admin.jakarta@klinikterapispro.com', role: 'ADMIN_CABANG', branchId: bJakarta.id },
    { name: 'Terapis Jakarta', email: 'terapis@klinikterapispro.com', role: 'TERAPIS', branchId: bJakarta.id },
    { name: 'Kasir Jakarta', email: 'kasir@klinikterapispro.com', role: 'KASIR', branchId: bJakarta.id },
    { name: 'Manager Jakarta', email: 'manager@klinikterapispro.com', role: 'MANAGER', branchId: bJakarta.id },
  ];

  for (const u of users) {
    await prisma.user.create({ data: { ...u, passwordDemo: 'demo123' } });
  }

  // Therapists
  const therapists = [
    { name: 'dr. Maya Lestari, Ftr', specialization: 'Fisioterapi', branchId: bJakarta.id, email: 'maya@klinik.com', phone: '08123456789', workSchedule: 'Senin - Jumat' },
    { name: 'Sinta Rahma, S.Tr.TW', specialization: 'Terapi Wicara', branchId: bJakarta.id, email: 'sinta@klinik.com', phone: '08123456780', workSchedule: 'Selasa - Sabtu' },
    { name: 'Dimas Aditya, S.Psi', specialization: 'Konseling', branchId: bJakarta.id, email: 'dimas@klinik.com', phone: '08123456781', workSchedule: 'Senin - Kamis' },
    { name: 'Hana Pratiwi', specialization: 'Okupasi Terapi', branchId: bBandung.id, email: 'hana@klinik.com', phone: '08123456782', workSchedule: 'Senin - Jumat' },
    { name: 'Rendra Saputra, Ftr', specialization: 'Rehab Medik', branchId: bSurabaya.id, email: 'rendra@klinik.com', phone: '08123456783', workSchedule: 'Rabu - Minggu' },
  ];

  for (const t of therapists) {
    await prisma.therapist.create({ data: t });
  }

  // Patients
  const patients = [
    { name: 'Sarah J.', age: 8, gender: 'F', phone: '08991234567', branchId: bJakarta.id, therapyType: 'Fisioterapi', mainComplaint: 'Keterlambatan motorik kasar', address: 'Jakarta Selatan' },
    { name: 'Bima A.', age: 6, gender: 'M', phone: '08991234568', branchId: bJakarta.id, therapyType: 'Terapi Wicara', mainComplaint: 'Belum bisa bicara lancar', address: 'Jakarta Timur' },
    { name: 'Nadira P.', age: 10, gender: 'F', phone: '08991234569', branchId: bBandung.id, therapyType: 'Okupasi Terapi', mainComplaint: 'Gangguan fokus', address: 'Bandung' },
    { name: 'Rafi M.', age: 34, gender: 'M', phone: '08991234570', branchId: bSurabaya.id, therapyType: 'Rehab Medik', mainComplaint: 'Pemulihan pasca stroke', address: 'Surabaya' },
    { name: 'Lintang K.', age: 7, gender: 'F', phone: '08991234571', branchId: bTangerang.id, therapyType: 'Tumbuh Kembang', mainComplaint: 'ASD', address: 'Tangerang' },
  ];

  for (const p of patients) {
    await prisma.patient.create({ data: p });
  }

  // Rooms
  const rooms = [
    { name: 'Ruang Terapi 1', type: 'Umum', branchId: bJakarta.id },
    { name: 'Ruang Terapi 2', type: 'Umum', branchId: bJakarta.id },
    { name: 'Gimnasium Anak', type: 'Fisik', branchId: bJakarta.id },
    { name: 'Ruang Konseling', type: 'Psikologi', branchId: bJakarta.id },
  ];

  for (const r of rooms) {
    await prisma.room.create({ data: r });
  }

  // Services
  const services = [
    { name: 'Fisioterapi Sesi Tunggal', type: 'Therapy', price: 150000, durationMinutes: 60, branchId: null },
    { name: 'Terapi Wicara', type: 'Therapy', price: 175000, durationMinutes: 45, branchId: null },
    { name: 'Okupasi Terapi', type: 'Therapy', price: 180000, durationMinutes: 60, branchId: null },
    { name: 'Konseling', type: 'Therapy', price: 200000, durationMinutes: 60, branchId: null },
    { name: 'Evaluasi Tumbuh Kembang', type: 'Assessment', price: 250000, durationMinutes: 90, branchId: null },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
