import { motion } from 'motion/react';
import { ArrowRight, HeartPulse, Activity, Baby, Sparkles, Star, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface CustomerLandingProps {
  onBooking: () => void;
  onBack: () => void;
}

export function CustomerLanding({ onBooking, onBack }: CustomerLandingProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans text-foreground overflow-x-hidden">
      {/* Decorative Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#DFF7F8] rounded-full blur-[150px] opacity-50 mix-blend-multiply pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#CDEAF7] rounded-full blur-[120px] opacity-40 mix-blend-multiply pointer-events-none translate-y-1/4" />

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors bg-white/50 px-4 py-2 rounded-xl backdrop-blur-md"
        >
          <ArrowLeft size={16} className="mr-2" /> Portal Utama
        </button>
        <button
          onClick={onBooking}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-primary/25 hover:bg-primary/95 transition-all active:scale-95"
        >
          Booking Sekarang
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-12 pb-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase">
            <Sparkles size={14} className="animate-pulse" /> Klinik Terapi Terpercaya
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#172B4D] leading-[1.1]">
            Pulihkan Diri Anda, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Jalani Hidup Lebih Baik.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
            Layanan terapi profesional dengan tenaga medis bersertifikat. Fasilitas lengkap, nyaman, dan ramah anak.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={onBooking}
              className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 group flex items-center justify-center"
            >
              Daftar & Booking Jadwal
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-8 pt-6 border-t border-slate-200/60 mt-8">
            <div className="text-left">
              <p className="text-3xl font-black text-[#172B4D]">4.9</p>
              <div className="flex text-amber-400 gap-0.5"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
              <p className="text-xs font-bold text-muted-foreground mt-1">2,500+ Pasien</p>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-left">
              <p className="text-3xl font-black text-[#172B4D]">4</p>
              <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest">Cabang Klinik</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative w-full"
        >
          <div className="aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070" 
              alt="Physiotherapy session" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Terapis Ahli & Ramah</p>
                  <p className="text-xs font-medium text-slate-500">Pendampingan 1-on-1 personal</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-24 bg-white/60 backdrop-blur-lg border-y border-white/40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-[#172B4D] tracking-tight">Layanan Unggulan Kami</h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto">Kami menyediakan berbagai layanan terapi yang disesuaikan dengan kebutuhan pemulihan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#172B4D] mb-3">Fisioterapi</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                Pemulihan gerak dan fungsi tubuh akibat cedera, penyakit, atau faktor usia menggunakan metode modern.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <HeartPulse size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#172B4D] mb-3">Terapi Wicara</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                Penanganan gangguan bahasa, bicara, dan menelan pada anak maupun dewasa oleh ahlinya.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100"
            >
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Baby size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#172B4D] mb-3">Tumbuh Kembang</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                Stimulasi dan evaluasi perkembangan motorik, kognitif, dan sosial untuk buah hati Anda.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#172B4D] to-primary rounded-[40px] p-12 text-center text-white shadow-2xl shadow-primary/20 overflow-hidden relative">
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Mulai Perjalanan Sehat Anda!</h2>
            <p className="text-white/80 font-medium max-w-xl mx-auto mb-10 text-lg">
              Jangan tunda proses pemulihan Anda. Jadwalkan sesi konsultasi dan terapi bersama spesialis kami sekarang.
            </p>
            <button
              onClick={onBooking}
              className="bg-white text-primary hover:bg-slate-50 px-10 py-5 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105"
            >
              Booking Jadwal Terapi
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-slate-200/50 py-8 text-center bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-500 mb-4">
          <span className="flex items-center gap-1.5"><MapPin size={16} /> Tersedia di 4 Kota</span>
          <span className="flex items-center gap-1.5"><Clock size={16} /> Buka Senin - Sabtu</span>
        </div>
        <p className="text-xs font-bold text-slate-400">&copy; 2026 KlinikTerapis Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
