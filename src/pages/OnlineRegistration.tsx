import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../lib/api';
import { Calendar, User, Phone, MapPin, Building2, CheckCircle2, Clock, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface OnlineRegistrationProps {
  onBack: () => void;
}

export function OnlineRegistration({ onBack }: OnlineRegistrationProps) {
  const { branches, therapists, addPatient, addBooking } = useApp();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'L',
    phone: '',
    address: '',
    branchId: branches[0]?.id || '',
    therapyType: 'Fisioterapi',
    date: '',
    time: '09:00',
  });

  const therapyTypes = ['Fisioterapi', 'Terapi Wicara', 'Okupasi Terapi', 'Konseling', 'Tumbuh Kembang'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create Patient
      const patientId = `pat-${Date.now()}`;
      await addPatient({
        id: patientId,
        name: formData.name,
        age: parseInt(formData.age) || 0,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        branchId: formData.branchId,
        therapyType: formData.therapyType,
        mainComplaint: '-',
        status: 'Aktif',
        createdAt: new Date().toISOString(),
      });

      // Find a therapist for this branch (dummy selection)
      const branchTherapists = therapists.filter(t => t.branchId === formData.branchId);
      const therapistId = branchTherapists.length > 0 ? branchTherapists[0].id : therapists[0]?.id || 't1';

      // Create Booking
      await addBooking({
        id: `bk-${Date.now()}`,
        patientId,
        therapistId,
        branchId: formData.branchId,
        therapyType: formData.therapyType,
        bookingDate: formData.date,
        startTime: formData.time,
        endTime: `${parseInt(formData.time.split(':')[0]) + 1}:00`,
        status: 'Menunggu',
        paymentStatus: 'Belum Bayar',
      });

      setSuccess(true);
      toast.success('Pendaftaran dan booking jadwal berhasil!');
    } catch (err) {
      toast.error('Gagal melakukan pendaftaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFB] p-4 relative overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#DFF7F8] rounded-full blur-[120px] opacity-60 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#CDEAF7] rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel rounded-[32px] p-10 text-center relative z-10 bg-white/80"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h2 className="text-3xl font-black text-foreground mb-3">Pendaftaran Berhasil!</h2>
          <p className="text-muted-foreground mb-8 font-medium">
            Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal Anda.
          </p>
          <button
            onClick={onBack}
            className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/95 transition-all active:scale-[0.98]"
          >
            Kembali ke Portal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-12 px-4 sm:px-6 lg:px-8 font-sans text-foreground relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#DFF7F8] rounded-full blur-[120px] opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#CDEAF7] rounded-full blur-[100px] opacity-30 mix-blend-multiply pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Portal
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-primary shadow-2xl shadow-primary/30 mb-6">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Daftar Pasien Baru & Booking</h2>
          <p className="text-muted-foreground font-medium">Silakan isi formulir di bawah ini untuk pendaftaran terapi</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-[32px] p-6 md:p-10 space-y-8 bg-white/80">
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-muted pb-3 flex items-center gap-2">
              <User size={20} className="text-primary"/> Data Pasien
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                  placeholder="Nama Pasien"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Usia</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                  placeholder="Contoh: 8"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Jenis Kelamin</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm appearance-none"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-muted-foreground"/> No. WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                  placeholder="0812..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-muted-foreground"/> Alamat
              </label>
              <textarea
                required
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-white/50 rounded-xl px-4 py-3 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm min-h-[100px] resize-none"
                placeholder="Alamat domisili"
              />
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold border-b border-muted pb-3 flex items-center gap-2">
              <Calendar size={20} className="text-primary"/> Detail Terapi & Jadwal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Building2 size={14} className="text-muted-foreground"/> Cabang Klinik
                </label>
                <select
                  value={formData.branchId}
                  onChange={e => setFormData({...formData, branchId: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm appearance-none"
                >
                  {branches.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Jenis Terapi</label>
                <select
                  value={formData.therapyType}
                  onChange={e => setFormData({...formData, therapyType: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm appearance-none"
                >
                  {therapyTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} className="text-muted-foreground"/> Tanggal
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-muted-foreground"/> Jam
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full h-12 bg-white/50 rounded-xl px-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/95 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> Memproses...
                </>
              ) : (
                'Daftar & Booking Jadwal'
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground font-medium mt-4">
              Dengan mendaftar, Anda menyetujui syarat & ketentuan KlinikTerapisPro
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
