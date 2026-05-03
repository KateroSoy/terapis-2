import { Card } from '../components/ui/card';
import { Wallet, Search, Plus, ShoppingCart, User, CreditCard } from 'lucide-react';
import { cn } from 'src/lib/utils';

export function Cashier() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Kasir & Pembayaran</h2>
            <p className="text-[13px] font-medium text-muted-foreground">Input transaksi layanan dan penjualan paket.</p>
          </div>
        </div>

        <Card className="card-minimal p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari Pasien atau Nomor Rekam Medis..." 
                className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90">
              Cari
            </button>
          </div>

          <div className="border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <User className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-foreground">Belum Ada Pasien Terpilih</h3>
            <p className="text-[13px] text-muted-foreground max-w-xs mt-1">Silakan cari pasien untuk memulai proses pembayaran atau pembuatan invoice.</p>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
           <Card className="card-minimal p-5 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Pembayaran Layanan</h4>
                  <p className="text-[11px] text-muted-foreground font-medium">Sesi terapi tunggal / assesment</p>
                </div>
              </div>
           </Card>
           <Card className="card-minimal p-5 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Penjualan Paket</h4>
                  <p className="text-[11px] text-muted-foreground font-medium">Beli paket terapi (hemat up to 20%)</p>
                </div>
              </div>
           </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="card-minimal p-6 flex flex-col h-full bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] h-40 w-40 bg-white/5 rounded-full blur-3xl" />
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-sm">Ringkasan Keranjang</h3>
            <ShoppingCart className="h-4 w-4 opacity-50" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-center py-10 opacity-50">
              <p className="text-[12px] font-medium">Keranjang masih kosong</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="opacity-60">Subtotal</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between text-base font-black">
              <span>Total Akhir</span>
              <span className="text-primary-foreground">Rp 0</span>
            </div>
            <button className="w-full mt-4 py-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Proses Pembayaran
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
