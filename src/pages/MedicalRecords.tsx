import { Card } from '../components/ui/card';
import { Stethoscope, FileText, Calendar, Search, Filter } from 'lucide-react';
import { cn } from 'src/lib/utils';

const records = [
  { id: 1, patient: 'Sarah J.', therapist: 'dr. Maya Lestari', date: '2024-05-02', type: 'Fisioterapi', session: 4, status: 'DONE' },
  { id: 2, patient: 'Bima A.', therapist: 'Sinta Rahma', date: '2024-05-02', type: 'Terapi Wicara', session: 2, status: 'DONE' },
  { id: 3, patient: 'Nadira P.', therapist: 'Hana Pratiwi', date: '2024-05-01', type: 'Okupasi Terapi', session: 8, status: 'DONE' },
  { id: 4, patient: 'Rafi M.', therapist: 'Rendra Saputra', date: '2024-05-01', type: 'Rehab Medik', session: 1, status: 'DONE' },
  { id: 5, patient: 'Sarah J.', therapist: 'dr. Maya Lestari', date: '2024-04-28', type: 'Fisioterapi', session: 3, status: 'DONE' },
];

export function MedicalRecords() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Rekam Medis Digital</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Arsip SOAP dan perkembangan pasien secara real-time.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-[13px] font-bold hover:bg-muted/50 transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
            <Search className="h-4 w-4" />
            Cari Pasien
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 card-minimal p-5 space-y-4">
          <h3 className="font-bold text-sm">Statistik Rekam Medis</h3>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-[11px] font-bold text-primary uppercase">Total Sesi Bulan Ini</p>
            <p className="text-2xl font-black text-primary">248</p>
            <p className="text-[10px] text-muted-foreground mt-1">↑ 12% dari bulan lalu</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-[11px] font-bold text-emerald-600 uppercase">Input SOAP Selesai</p>
            <p className="text-2xl font-black text-emerald-600">98%</p>
            <p className="text-[10px] text-muted-foreground mt-1">Sesuai standar operasional</p>
          </div>
        </Card>

        <Card className="lg:col-span-3 card-minimal overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-muted/30 text-muted-foreground">
                  <th className="px-6 py-4 font-bold">Pasien</th>
                  <th className="px-6 py-4 font-bold">Terapis</th>
                  <th className="px-6 py-4 font-bold">Sesi</th>
                  <th className="px-6 py-4 font-bold">Tanggal</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{r.patient}</div>
                      <div className="text-[11px] text-primary font-medium">{r.type}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-muted-foreground">{r.therapist}</td>
                    <td className="px-6 py-4">
                      <span className="bg-secondary text-primary px-2 py-0.5 rounded text-[11px] font-bold">Ke-{r.session}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{r.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-bold text-[12px]">Lihat SOAP</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
