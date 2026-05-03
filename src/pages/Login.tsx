import { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('owner@klinikterapispro.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await onLogin(email, password);
    if (success) {
      toast.success('Selamat Datang Kembali!');
    } else {
      toast.error('Gagal login. Coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFB] overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#DFF7F8] rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#CDEAF7] rounded-full blur-[100px] opacity-50 mix-blend-multiply" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#F4EBDD] rounded-full blur-[80px] opacity-40 mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 z-10"
      >
        <div className="glass-panel p-10 rounded-[32px]">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-primary shadow-2xl shadow-primary/30 mb-6 group transition-transform hover:scale-110">
              <Stethoscope className="h-9 w-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">KlinikTerapis Pro</h1>
            <p className="text-muted-foreground mt-2 font-medium">Sistem Manajemen Klinik Terpadu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-14 bg-white/50 rounded-2xl pl-12 pr-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-14 bg-white/50 rounded-2xl pl-12 pr-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:bg-white focus:ring-4 border-none shadow-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/95 hover:shadow-primary/35 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center group"
            >
              {loading ? (
                <div className="h-6 w-6 border-b-2 border-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground font-medium">Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { setEmail('owner@klinikterapispro.com'); setPassword('demo123'); }}
                className="text-[10px] uppercase font-bold tracking-wider py-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                type="button"
              >
                Owner
              </button>
              <button 
                onClick={() => { setEmail('admin.jakarta@klinikterapispro.com'); setPassword('demo123'); }}
                className="text-[10px] uppercase font-bold tracking-wider py-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                type="button"
              >
                Admin JKT
              </button>
              <button 
                onClick={() => { setEmail('terapis@klinikterapispro.com'); setPassword('demo123'); }}
                className="text-[10px] uppercase font-bold tracking-wider py-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                type="button"
              >
                Terapis
              </button>
              <button 
                onClick={() => { setEmail('kasir@klinikterapispro.com'); setPassword('demo123'); }}
                className="text-[10px] uppercase font-bold tracking-wider py-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                type="button"
              >
                Kasir
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-12 text-muted-foreground/60 text-sm font-medium">
          &copy; 2026 KlinikTerapis Pro. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
