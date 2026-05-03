import { useApp } from '../lib/api';
import { StatCard } from '../components/ui/StatCard';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Wallet, 
  Activity, 
  Clock, 
  Star 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card } from '../components/ui/card';
import { cn } from 'src/lib/utils';

export function Dashboard() {
  const { selectedBranchId, branches, patients, bookings, therapists, invoices } = useApp();

  const branchPatients = selectedBranchId === 'all' ? patients : patients.filter(p => p.branchId === selectedBranchId);
  const branchBookings = selectedBranchId === 'all' ? bookings : bookings.filter(b => b.branchId === selectedBranchId);
  const branchTherapists = selectedBranchId === 'all' ? therapists : therapists.filter(t => t.branchId === selectedBranchId);
  const paidRevenue = (selectedBranchId === 'all' ? invoices : invoices.filter(i => i.branchId === selectedBranchId))
    .filter(i => i.status === 'PAID').reduce((s, i) => s + i.total, 0);

  const stats = {
    patientCount: branchPatients.length,
    bookingCount: branchBookings.length,
    therapistCount: branchTherapists.length,
    revenue: paidRevenue,
  };

  const chartData = [
    { name: 'Jan', revenue: 45000000 },
    { name: 'Feb', revenue: 52000000 },
    { name: 'Mar', revenue: 61000000 },
    { name: 'Apr', revenue: 58000000 },
    { name: 'May', revenue: 75000000 },
  ];

  const branchData = branches.map(b => ({
    name: b.name.replace('Klinik ', ''),
    pasien: Math.floor(Math.random() * 100) + 50,
    revenue: Math.floor(Math.random() * 50) + 20
  }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Ringkasan Operasional</h2>
        <p className="text-[13px] font-medium text-muted-foreground">
          {selectedBranchId === 'all' 
            ? `Menampilkan data konsolidasi dari ${branches.length} cabang aktif hari ini.` 
            : `Ringkasan operasional cabang ${branches.find(b => b.id === selectedBranchId)?.name} hari ini.`}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Pasien" 
          value={stats.patientCount} 
          icon={Users} 
          trend="bulan ini" 
          trendValue="12%" 
          isTrendUp={true}
        />
        <StatCard 
          title="Jadwal Hari Ini" 
          value={stats.bookingCount} 
          icon={Calendar} 
          trend="booking baru" 
          trendValue="+24" 
          isTrendUp={true}
        />
        <StatCard 
          title="Pendapatan (IDR)" 
          value={new Intl.NumberFormat('id-ID', { notation: 'compact', compactDisplay: 'short' }).format(stats.revenue)} 
          icon={TrendingUp} 
          trend="vs target" 
          trendValue="8%" 
          isTrendUp={true}
        />
        <StatCard 
          title="Terapis Aktif" 
          value={stats.therapistCount} 
          icon={Activity} 
          trend="work-load" 
          trendValue="85%" 
          isTrendUp={true}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2 card-minimal p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-foreground">Kinerja Cabang (Pendapatan Bulanan)</h3>
            <button className="text-[12px] font-bold text-primary hover:underline transition-all">Lihat Detail</button>
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F9FD8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F9FD8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#5D7078' }} 
                  dy={10} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F9FD8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-muted-foreground border-b-2 border-background">
                  <th className="pb-3 font-semibold">Cabang</th>
                  <th className="pb-3 font-semibold">Pasien</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background">
                {branchData.slice(0, 3).map((b, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-bold text-foreground">{b.name}</td>
                    <td className="py-4 text-muted-foreground font-medium">{b.pasien}</td>
                    <td className="py-4 font-bold text-foreground">Rp {b.revenue}M</td>
                    <td className="py-4 text-right">
                      <span className={cn(
                        "badge-minimal px-2 py-0.5 rounded inline-block",
                        i === 2 ? "bg-[#FFF4E5] text-[#F6B95B]" : "bg-[#E6F8F3] text-[#48C7A0]"
                      )}>
                        {i === 2 ? 'Sibuk' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="card-minimal p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold">Antrian Terapi</h3>
            <span className="badge-minimal bg-secondary text-primary px-2 py-1 rounded">8 Pasien</span>
          </div>
          
          <div className="space-y-3">
             {[
               { name: 'Sarah J.', time: '14:00 - 15:00', type: 'Fisioterapi', clinic: 'Jakarta', color: 'primary' },
               { name: 'Bima A.', time: '14:30 - 15:30', type: 'Terapi Wicara', clinic: 'Jakarta', color: 'success' },
               { name: 'Nadira P.', time: '15:00 - 16:00', type: 'Okupasi Terapi', clinic: 'Bandung', color: 'warning' },
               { name: 'Rafi M.', time: '15:00 - 16:00', type: 'Rehab Medik', clinic: 'Surabaya', color: 'primary' },
             ].map((booking, i) => (
               <div key={i} className="p-4 bg-background border-l-4 rounded-r-xl transition-all hover:bg-muted/30" style={{ borderColor: `var(--color-${booking.color})` }}>
                  <div className="text-[13px] font-bold text-foreground">{booking.name}</div>
                  <div className="text-[11px] font-medium text-muted-foreground">{booking.type} • {booking.time}</div>
                  <div className="text-[10px] mt-1 font-bold text-primary uppercase">{booking.clinic}</div>
               </div>
             ))}
          </div>
          
          <button className="w-full mt-6 py-3 bg-secondary text-primary font-bold text-[12px] rounded-xl transition-colors hover:bg-secondary/70">
            Lihat Semua Jadwal
          </button>
        </Card>
      </div>
    </div>
  );
}
