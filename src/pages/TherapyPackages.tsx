import { Card } from '../components/ui/card';
import { Package, CheckCircle2, Star, Plus, Search } from 'lucide-react';
import { cn } from 'src/lib/utils';

const packages = [
  { id: 1, name: 'Paket Hemat 4 Sesi', sessions: 4, price: 550000, discount: '10%', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 2, name: 'Paket Intensif 8 Sesi', sessions: 8, price: 1000000, discount: '15%', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', popular: true },
  { id: 3, name: 'Paket Premium 12 Sesi', sessions: 12, price: 1400000, discount: '20%', color: 'bg-amber-50 text-amber-600 border-amber-100' },
];

export function TherapyPackages() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Paket Terapi Hemat</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola paket layanan untuk loyalitas pasien.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Buat Paket Baru
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((p) => (
          <Card key={p.id} className={cn("card-minimal p-6 flex flex-col relative overflow-hidden transition-all hover:shadow-xl", p.popular && "border-primary ring-2 ring-primary/10")}>
            {p.popular && (
              <div className="absolute top-4 right-[-35px] bg-primary text-white text-[10px] font-black px-10 py-1 rotate-45 shadow-sm">
                POPULER
              </div>
            )}
            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 border", p.color)}>
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-black text-lg mb-1">{p.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-2xl font-black">Rp {(p.price / 1000).toLocaleString('id-ID')}rb</span>
              <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Hemat {p.discount}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {p.sessions} Sesi Pertemuan
              </li>
              <li className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Berlaku 3 Bulan
              </li>
              <li className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Semua Jenis Terapi
              </li>
            </ul>

            <button className={cn(
              "w-full py-3 rounded-xl font-bold text-[13px] transition-all",
              p.popular ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary text-primary hover:bg-secondary/70"
            )}>
              Pilih Paket
            </button>
          </Card>
        ))}
      </div>

      <Card className="card-minimal p-6 mt-8">
         <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-sm">Status Paket Aktif Pasien</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input type="text" placeholder="Cari nama pasien..." className="w-full pl-9 pr-4 py-2 bg-muted border-none rounded-lg text-[12px] focus:outline-none" />
            </div>
         </div>
         <div className="space-y-4">
            {[
              { name: 'Sarah J.', package: 'Paket Intensif', remaining: '3 / 8 Sesi', progress: 37.5 },
              { name: 'Nadira P.', package: 'Paket Hemat', remaining: '1 / 4 Sesi', progress: 25 },
              { name: 'Lintang K.', package: 'Paket Premium', remaining: '10 / 12 Sesi', progress: 83.3 },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-bold">{s.name[0]}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="font-bold">{s.name} - <span className="text-primary">{s.package}</span></span>
                    <span className="font-bold text-muted-foreground">{s.remaining}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}
