import { useState } from 'react';
import { Card } from '../components/ui/card';
import { UserRound, Phone, Mail, MapPin, Search, Plus } from 'lucide-react';
import { cn } from 'src/lib/utils';

const therapists = [
  { id: 1, name: 'dr. Maya Lestari, Ftr', specialization: 'Fisioterapi', branch: 'Jakarta', email: 'maya@klinik.com', phone: '08123456789', status: 'ACTIVE', rating: 4.9 },
  { id: 2, name: 'Sinta Rahma, S.Tr.TW', specialization: 'Terapi Wicara', branch: 'Jakarta', email: 'sinta@klinik.com', phone: '08123456780', status: 'ACTIVE', rating: 4.8 },
  { id: 3, name: 'Dimas Aditya, S.Psi', specialization: 'Konseling', branch: 'Jakarta', email: 'dimas@klinik.com', phone: '08123456781', status: 'ON_LEAVE', rating: 4.7 },
  { id: 4, name: 'Hana Pratiwi, S.Tr.OT', specialization: 'Okupasi Terapi', branch: 'Bandung', email: 'hana@klinik.com', phone: '08123456782', status: 'ACTIVE', rating: 4.9 },
  { id: 5, name: 'Rendra Saputra, Ftr', specialization: 'Rehab Medik', branch: 'Surabaya', email: 'rendra@klinik.com', phone: '08123456783', status: 'ACTIVE', rating: 4.6 },
];

export function Therapists() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manajemen Terapis</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola jadwal dan data profesional seluruh terapis klinik.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Tambah Terapis
        </button>
      </div>

      <Card className="card-minimal p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari nama atau spesialisasi..." 
            className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {therapists.map((t) => (
          <Card key={t.id} className="card-minimal p-5 hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold text-lg shrink-0">
                {t.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[14px] truncate">{t.name}</h4>
                <p className="text-[12px] font-medium text-primary mb-2">{t.specialization}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mb-4">
                  ★ {t.rating} <span className="text-muted-foreground ml-1">(24+ Review)</span>
                </div>
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                t.status === 'ACTIVE' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
              )}>
                {t.status === 'ACTIVE' ? 'Aktif' : 'Cuti'}
              </span>
            </div>

            <div className="space-y-2.5 mt-4 pt-4 border-t">
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>Cabang: <span className="font-bold text-foreground">{t.branch}</span></span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{t.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button className="py-2 text-[11px] font-bold border rounded-lg hover:bg-muted/50 transition-all">Lihat Jadwal</button>
              <button className="py-2 text-[11px] font-bold bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-all">Profil Detail</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
