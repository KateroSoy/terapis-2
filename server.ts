import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Auth Demo
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { branch: true }
    });
    
    if (user && user.passwordDemo === password) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Branches
  app.get("/api/branches", async (req, res) => {
    const branches = await prisma.branch.findMany({
      include: {
        _count: {
          select: { patients: true, users: true, therapists: true }
        }
      }
    });
    res.json(branches);
  });

  // Dashboard Stats
  app.get("/api/reports/dashboard", async (req, res) => {
    const { branchId } = req.query;
    const whereClause = branchId ? { branchId: String(branchId) } : {};
    
    const [patientCount, bookingCount, therapistCount, totalRevenue] = await Promise.all([
      prisma.patient.count({ where: whereClause }),
      prisma.booking.count({ where: whereClause }),
      prisma.therapist.count({ where: whereClause }),
      prisma.invoice.aggregate({
        where: { ...whereClause, status: "PAID" },
        _sum: { total: true }
      })
    ]);

    res.json({
      patientCount,
      bookingCount,
      therapistCount,
      revenue: totalRevenue._sum.total || 0
    });
  });

  // Patients
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

  // Bookings
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

  // Therapists
  app.get("/api/therapists", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const therapists = await prisma.therapist.findMany({
      where,
      include: { branch: true }
    });
    res.json(therapists);
  });

  // Invoices
  app.get("/api/invoices", async (req, res) => {
    const { branchId } = req.query;
    const where = branchId && branchId !== "all" ? { branchId: String(branchId) } : {};
    const invoices = await prisma.invoice.findMany({
      where,
      include: { patient: true, branch: true },
      orderBy: { issuedAt: 'desc' }
    });
    res.json(invoices);
  });

  // Vite middleware for development
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
