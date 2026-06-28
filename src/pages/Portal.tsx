import { motion } from 'motion/react';
import { UserCircle, Building2, Stethoscope, ArrowRight } from 'lucide-react';

interface PortalProps {
  onSelectMode: (mode: 'customer' | 'business') => void;
}

export function Portal({ onSelectMode }: PortalProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFB] overflow-hidden relative p-4">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#DFF7F8] rounded-full blur-[120px] opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#CDEAF7] rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#F4EBDD] rounded-full blur-[80px] opacity-40 mix-blend-multiply pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary shadow-2xl shadow-primary/30 mb-6 transition-transform hover:scale-110">
            <Stethoscope className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">Selamat Datang di KlinikTerapis Pro</h1>
          <p className="text-muted-foreground text-lg font-medium max-w-xl mx-auto">
            Silakan pilih portal akses Anda untuk melanjutkan ke dalam sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Portal */}
          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('customer')}
            className="glass-panel p-8 rounded-[32px] text-left group hover:shadow-2xl hover:shadow-primary/10 transition-all border-2 border-transparent hover:border-primary/20 flex flex-col h-full bg-white/60"
          >
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <UserCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Portal Pasien</h2>
            <p className="text-muted-foreground font-medium mb-8 flex-1">
              Daftar online, booking jadwal terapi, dan lihat riwayat sesi Anda dengan mudah tanpa perlu antre.
            </p>
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Akses Portal Pasien <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </motion.button>

          {/* Business Portal */}
          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('business')}
            className="glass-panel p-8 rounded-[32px] text-left group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all border-2 border-transparent hover:border-emerald-500/20 flex flex-col h-full bg-white/60"
          >
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Portal Bisnis & Klinik</h2>
            <p className="text-muted-foreground font-medium mb-8 flex-1">
              Akses dashboard admin, kelola cabang, staf, jadwal, dan laporan keuangan klinik Anda.
            </p>
            <div className="flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
              Akses Portal Bisnis <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </motion.button>
        </div>
        
        <p className="text-center mt-12 text-muted-foreground/60 text-sm font-medium">
          &copy; 2026 KlinikTerapis Pro. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
