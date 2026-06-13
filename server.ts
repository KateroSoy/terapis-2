import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // ============================================================
  // AUTH
  // ============================================================
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: { branch: true }
    });
    if (user && user.passwordDemo === password) {
      await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, branchId: user.branchId, branch: user.branch } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // ============================================================
  // BRANCHES
  // ============================================================
  app.get("/api/branches", async (req, res) => {
    const branches = await prisma.branch.findMany({
      include: { _count: { select: { patients: true, users: true, therapists: true, bookings: true } } },
      orderBy: { createdAt: 'asc' }
    });
    res.json(branches);
  });

  app.post("/api/branches", async (req, res) => {
    try {
      const branch = await prisma.branch.create({ data: req.body });
      res.json(branch);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/branches/:id", async (req, res) => {
    try {
      const branch = await prisma.branch.update({ where: { id: req.params.id }, data: req.body });
      res.json(branch);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/branches/:id", async (req, res) => {
    try {
      await prisma.branch.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // PATIENTS
  // ============================================================
  app.get("/api/patients", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const patients = await prisma.patient.findMany({
      where,
      include: { branch: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(patients);
  });

  app.post("/api/patients", async (req, res) => {
    try {
      const patient = await prisma.patient.create({
        data: req.body,
        include: { branch: true }
      });
      res.json(patient);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/patients/:id", async (req, res) => {
    try {
      const patient = await prisma.patient.update({
        where: { id: req.params.id },
        data: req.body,
        include: { branch: true }
      });
      res.json(patient);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/patients/:id", async (req, res) => {
    try {
      await prisma.patient.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // THERAPISTS
  // ============================================================
  app.get("/api/therapists", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const therapists = await prisma.therapist.findMany({
      where,
      include: { branch: true },
      orderBy: { name: 'asc' }
    });
    res.json(therapists);
  });

  app.post("/api/therapists", async (req, res) => {
    try {
      const therapist = await prisma.therapist.create({
        data: req.body,
        include: { branch: true }
      });
      res.json(therapist);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/therapists/:id", async (req, res) => {
    try {
      const therapist = await prisma.therapist.update({
        where: { id: req.params.id },
        data: req.body,
        include: { branch: true }
      });
      res.json(therapist);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/therapists/:id", async (req, res) => {
    try {
      await prisma.therapist.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // BOOKINGS
  // ============================================================
  app.get("/api/bookings", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const bookings = await prisma.booking.findMany({
      where,
      include: { patient: true, therapist: true, room: true, branch: true },
      orderBy: { bookingDate: 'desc' }
    });
    res.json(bookings);
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      // Auto-assign first available room if not provided
      let roomId = req.body.roomId;
      if (!roomId) {
        const room = await prisma.room.findFirst({ where: { branchId: req.body.branchId, status: 'AVAILABLE' } });
        roomId = room?.id || null;
      }
      if (!roomId) {
        // Create a default room
        const room = await prisma.room.create({ data: { name: 'Ruang Terapi', type: 'Umum', branchId: req.body.branchId } });
        roomId = room.id;
      }
      const booking = await prisma.booking.create({
        data: { ...req.body, roomId },
        include: { patient: true, therapist: true, room: true, branch: true }
      });
      res.json(booking);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const { patient, therapist, room, branch, ...data } = req.body;
      const booking = await prisma.booking.update({
        where: { id: req.params.id },
        data,
        include: { patient: true, therapist: true, room: true, branch: true }
      });
      res.json(booking);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      await prisma.booking.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // INVOICES
  // ============================================================
  app.get("/api/invoices", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const invoices = await prisma.invoice.findMany({
      where,
      include: { patient: true, branch: true, items: true },
      orderBy: { issuedAt: 'desc' }
    });
    res.json(invoices);
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const { items, ...invoiceData } = req.body;
      // Generate invoice number
      const count = await prisma.invoice.count();
      const invoiceNumber = `INV/${new Date().getFullYear()}/${String(count + 1).padStart(4, '0')}`;
      const invoice = await prisma.invoice.create({
        data: {
          ...invoiceData,
          invoiceNumber,
          subtotal: invoiceData.subtotal || invoiceData.total,
          discount: invoiceData.discount || 0,
          items: items ? { create: items } : undefined,
        },
        include: { patient: true, branch: true, items: true }
      });
      res.json(invoice);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/invoices/:id", async (req, res) => {
    try {
      const { patient, branch, items, ...data } = req.body;
      const updateData: any = { ...data };
      if (data.status === 'PAID' && !data.paidAt) {
        updateData.paidAt = new Date();
      }
      const invoice = await prisma.invoice.update({
        where: { id: req.params.id },
        data: updateData,
        include: { patient: true, branch: true, items: true }
      });
      res.json(invoice);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/invoices/:id", async (req, res) => {
    try {
      // Delete related items first
      await prisma.invoiceItem.deleteMany({ where: { invoiceId: req.params.id } });
      await prisma.payment.deleteMany({ where: { invoiceId: req.params.id } });
      await prisma.invoice.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // MEDICAL RECORDS
  // ============================================================
  app.get("/api/medical-records", async (req, res) => {
    const { branchId, patientId } = req.query;
    const where: any = {};
    if (branchId && branchId !== "all") where.branchId = String(branchId);
    if (patientId) where.patientId = String(patientId);
    const records = await prisma.medicalRecord.findMany({
      where,
      include: { patient: true, therapist: true, branch: true },
      orderBy: { recordDate: 'desc' }
    });
    res.json(records);
  });

  app.post("/api/medical-records", async (req, res) => {
    try {
      const record = await prisma.medicalRecord.create({
        data: req.body,
        include: { patient: true, therapist: true, branch: true }
      });
      res.json(record);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/medical-records/:id", async (req, res) => {
    try {
      const { patient, therapist, branch, ...data } = req.body;
      const record = await prisma.medicalRecord.update({
        where: { id: req.params.id },
        data,
        include: { patient: true, therapist: true, branch: true }
      });
      res.json(record);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/medical-records/:id", async (req, res) => {
    try {
      await prisma.medicalRecord.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // THERAPY PACKAGES
  // ============================================================
  app.get("/api/therapy-packages", async (req, res) => {
    const { branchId, patientId } = req.query;
    const where: any = {};
    if (branchId && branchId !== "all") where.branchId = String(branchId);
    if (patientId) where.patientId = String(patientId);
    const packages = await prisma.therapyPackage.findMany({
      where,
      include: { patient: true, branch: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(packages);
  });

  app.post("/api/therapy-packages", async (req, res) => {
    try {
      const pkg = await prisma.therapyPackage.create({
        data: {
          ...req.body,
          remainingSessions: req.body.totalSessions - (req.body.usedSessions || 0),
        },
        include: { patient: true, branch: true }
      });
      res.json(pkg);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/therapy-packages/:id", async (req, res) => {
    try {
      const { patient, branch, ...data } = req.body;
      if (data.usedSessions !== undefined && data.totalSessions !== undefined) {
        data.remainingSessions = data.totalSessions - data.usedSessions;
      }
      const pkg = await prisma.therapyPackage.update({
        where: { id: req.params.id },
        data,
        include: { patient: true, branch: true }
      });
      res.json(pkg);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/therapy-packages/:id", async (req, res) => {
    try {
      await prisma.therapyPackage.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // SERVICES
  // ============================================================
  app.get("/api/services", async (req, res) => {
    const services = await prisma.service.findMany({ where: { status: 'ACTIVE' } });
    res.json(services);
  });

  app.post("/api/services", async (req, res) => {
    try {
      const service = await prisma.service.create({ data: req.body });
      res.json(service);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const service = await prisma.service.update({ where: { id: req.params.id }, data: req.body });
      res.json(service);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      await prisma.service.update({ where: { id: req.params.id }, data: { status: 'INACTIVE' } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // USERS
  // ============================================================
  app.get("/api/users", async (req, res) => {
    const users = await prisma.user.findMany({
      include: { branch: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users.map(u => ({ ...u, passwordDemo: undefined })));
  });

  app.post("/api/users", async (req, res) => {
    try {
      const user = await prisma.user.create({
        data: { ...req.body, passwordDemo: req.body.password || 'demo123' },
        include: { branch: true }
      });
      res.json({ ...user, passwordDemo: undefined });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const { branch, password, ...data } = req.body;
      if (password) (data as any).passwordDemo = password;
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data,
        include: { branch: true }
      });
      res.json({ ...user, passwordDemo: undefined });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      await prisma.user.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // PAYMENTS
  // ============================================================
  app.get("/api/payments", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const payments = await prisma.payment.findMany({
      where,
      include: { patient: true, invoice: true, branch: true },
      orderBy: { paidAt: 'desc' }
    });
    res.json(payments);
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const payment = await prisma.payment.create({
        data: req.body,
        include: { patient: true, invoice: true, branch: true }
      });
      // Mark invoice as paid
      if (req.body.invoiceId) {
        await prisma.invoice.update({
          where: { id: req.body.invoiceId },
          data: { status: 'PAID', paidAt: new Date(), paymentMethod: req.body.method }
        });
      }
      res.json(payment);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ============================================================
  // ROOMS
  // ============================================================
  app.get("/api/rooms", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const rooms = await prisma.room.findMany({ where });
    res.json(rooms);
  });

  // ============================================================
  // DASHBOARD / REPORTS
  // ============================================================
  app.get("/api/reports/dashboard", async (req, res) => {
    const { branchId } = req.query;
    const whereClause: any = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};

    const [patientCount, bookingCount, therapistCount, totalRevenue, todayBookings, recentBookings] = await Promise.all([
      prisma.patient.count({ where: whereClause }),
      prisma.booking.count({ where: whereClause }),
      prisma.therapist.count({ where: whereClause }),
      prisma.invoice.aggregate({ where: { ...whereClause, status: "PAID" }, _sum: { total: true } }),
      prisma.booking.count({
        where: {
          ...whereClause,
          bookingDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)), lte: new Date(new Date().setHours(23, 59, 59, 999)) }
        }
      }),
      prisma.booking.findMany({
        where: whereClause,
        include: { patient: true, therapist: true, branch: true },
        orderBy: { bookingDate: 'desc' },
        take: 5
      })
    ]);

    res.json({
      patientCount,
      bookingCount,
      therapistCount,
      revenue: totalRevenue._sum.total || 0,
      todayBookings,
      recentBookings
    });
  });

  app.get("/api/reports/revenue", async (req, res) => {
    const { branchId } = req.query;
    const whereClause: any = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};

    // Get monthly revenue for current year
    const invoices = await prisma.invoice.findMany({
      where: { ...whereClause, status: 'PAID' },
      select: { total: true, paidAt: true, issuedAt: true, branchId: true }
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRevenue = months.map((name, i) => {
      const monthInvoices = invoices.filter(inv => {
        const d = inv.paidAt || inv.issuedAt;
        return d.getMonth() === i;
      });
      return { name, revenue: monthInvoices.reduce((s, inv) => s + inv.total, 0) };
    });

    // Revenue per branch
    const branches = await prisma.branch.findMany();
    const branchRevenue = await Promise.all(branches.map(async (b) => {
      const rev = await prisma.invoice.aggregate({
        where: { branchId: b.id, status: 'PAID' },
        _sum: { total: true }
      });
      const patientCount = await prisma.patient.count({ where: { branchId: b.id } });
      return { name: b.name.replace('Klinik ', ''), code: b.code, revenue: rev._sum.total || 0, patients: patientCount };
    }));

    res.json({ monthlyRevenue, branchRevenue });
  });

  // ============================================================
  // AUDIT LOGS
  // ============================================================
  app.get("/api/audit-logs", async (req, res) => {
    const logs = await prisma.auditLog.findMany({
      include: { user: true, branch: true },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(logs);
  });

  // ============================================================
  // VITE / STATIC
  // ============================================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
