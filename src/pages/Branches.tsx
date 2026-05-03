import { Card } from '../components/ui/card';
import { Building2, MapPin, Phone, Plus, MoreHorizontal } from 'lucide-react';
import { useApp } from '../lib/api';

export function Branches() {
  const { branches } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manajemen Cabang</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola outlet dan pengaturan operasional tiap wilayah.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Tambah Cabang
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {branches.map((b) => (
          <Card key={b.id} className="card-minimal p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-xl">
                  {b.code}
                </div>
                <div>
                  <h3 className="font-bold text-base">{b.name}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Operasional
                  </div>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y py-6 my-6">
               <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Kota</p>
                  <p className="text-[13px] font-bold">{b.city}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Pasien Aktif</p>
                  <p className="text-[13px] font-bold">1,248 Pasien</p>
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-3 text-[12px] text-muted-foreground font-medium">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">Jl. Sudirman No. 123, Jakarta Selatan</span>
               </div>
               <div className="flex items-center gap-3 text-[12px] text-muted-foreground font-medium">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>021-5550123</span>
               </div>
            </div>

            <div className="mt-8 flex gap-3">
               <button className="flex-1 py-3 text-[12px] font-bold bg-secondary text-primary rounded-xl hover:bg-secondary/70">
                 Dashboard Cabang
               </button>
               <button className="flex-1 py-3 text-[12px] font-bold border rounded-xl hover:bg-muted/50">
                 Edit Detail
               </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
