import { useEffect, useState } from 'react';
import { useApp } from '../lib/api';
import { api } from '../lib/api';
import { StatCard } from '../components/ui/StatCard';
import { Users, Calendar, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../components/ui/card';
import { cn } from 'src/lib/utils';
import { format } from 'date-fns';

export function Dashboard() {
  const { selectedBranchId, branches, patients, bookings, therapists, invoices } = useApp();
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [branchData, setBranchData] = useState<any[]>([]);

  useEffect(() => {
    const branchFilter = selectedBranchId === 'all' ? undefined : selectedBranchId;
    api.getRevenue(branchFilter).then(data => {
      setRevenueData(data.monthlyRevenue || []);
      setBranchData(data.branchRevenue || []);
    }).catch(() => {});
  }, [selectedBranchId]);

  const branchPatients = selectedBranchId === 'all' ? patients : patients.filter(p => p.branchId === selectedBranchId);
  const branchBookings = selectedBranchId === 'all' ? bookings : bookings.filter(b => b.branchId === selectedBranchId);
  const branchTherapists = selectedBranchId === 'all' ? therapists : therapists.filter(t => t.branchId === selectedBranchId);
  const paidRevenue = (selectedBranchId === 'all' ? invoices : invoices.filter(i => i.branchId === selectedBranchId))
    .filter(i => i.status === 'PAID').reduce((s, i) => s + i.total, 0);

  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().slice(0, 10);
    return b.bookingDate.slice(0, 10) === today;
  });

  const upcomingBookings = bookings
    .filter(b => b.status !== 'CANCELLED' && b.status !== 'COMPLETED')
    .slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Ringkasan Operasional</h2>
        <p className="text-[13px] font-medium text-muted-foreground">
          {selectedBranchId === 'all'
            ? `Menampilkan data konsolidasi dari ${branches.length} cabang aktif.`
            : `Ringkasan operasional cabang ${branches.find(b => b.id === selectedBranchId)?.name}.`}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pasien"
          value={branchPatients.length}
          icon={Users}
          trend="terdaftar"
          trendValue={`${branchPatients.filter(p => p.status === 'ACTIVE').length} aktif`}
          isTrendUp={true}
        />
        <StatCard
          title="Booking Hari Ini"
          value={todayBookings.length}
          icon={Calendar}
          trend="total booking"
          trendValue={String(branchBookings.length)}
          isTrendUp={true}
        />
        <StatCard
          title="Pendapatan (IDR)"
          value={new Intl.NumberFormat('id-ID', { notation: 'compact', compactDisplay: 'short' }).format(paidRevenue)}
          icon={TrendingUp}
          trend="lunas"
          trendValue={`${invoices.filter(i => i.status === 'PAID').length} invoice`}
          isTrendUp={true}
        />
        <StatCard
          title="Terapis Aktif"
          value={branchTherapists.filter(t => t.status === 'ACTIVE').length}
          icon={Activity}
          trend="total"
          trendValue={String(branchTherapists.length)}
          isTrendUp={true}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2 card-minimal p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-foreground">Pendapatan Bulanan</h3>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData.length > 0 ? revenueData : [{ name: '-', revenue: 0 }]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F9FD8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F9FD8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#5D7078' }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }} formatter={(value: number) => [`IDR ${new Intl.NumberFormat('id-ID').format(value)}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#4F9FD8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {branchData.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="text-muted-foreground border-b-2 border-background">
                    <th className="pb-3 font-semibold">Cabang</th>
                    <th className="pb-3 font-semibold">Pasien</th>
                    <th className="pb-3 font-semibold">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background">
                  {branchData.map((b: any, i: number) => (
                    <tr key={i} className="group">
                      <td className="py-4 font-bold text-foreground">{b.name}</td>
                      <td className="py-4 text-muted-foreground font-medium">{b.patients}</td>
                      <td className="py-4 font-bold text-foreground">IDR {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(b.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="card-minimal p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold">Antrian Terapi</h3>
            <span className="badge-minimal bg-secondary text-primary px-2 py-1 rounded text-xs font-bold">{upcomingBookings.length} Pasien</span>
          </div>

          <div className="space-y-3">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Belum ada booking.</div>
            ) : upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-background border-l-4 border-primary rounded-r-xl transition-all hover:bg-muted/30">
                <div className="text-[13px] font-bold text-foreground">{booking.patient?.name || '-'}</div>
                <div className="text-[11px] font-medium text-muted-foreground">{booking.therapyType} • {booking.startTime} - {booking.endTime}</div>
                <div className="text-[10px] mt-1 font-bold text-primary uppercase">
                  {booking.branch?.name || '-'} • {format(new Date(booking.bookingDate), 'dd MMM')}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
