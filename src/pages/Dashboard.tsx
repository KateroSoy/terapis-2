import { useEffect, useState } from 'react';
import { useApp } from '../lib/api';
import { api } from '../lib/api';
import { StatCard } from '../components/ui/StatCard';
import { Users, Calendar, TrendingUp, Activity, CheckCircle2, Clock, AlertCircle, ArrowUpRight, BarChart3, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
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

  const BRANCH_COLORS = ['#155EEF', '#7EE7F2', '#42C7A5', '#F59E0B', '#EC4899', '#8B5CF6'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Operasional</h2>
            <p className="text-[13px] font-medium text-muted-foreground mt-1">
              {selectedBranchId === 'all'
                ? `Konsolidasi data dari ${branches.length} cabang aktif`
                : `Ringkasan operasional cabang ${branches.find(b => b.id === selectedBranchId)?.name}`}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-700">Sistem Aktif</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
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
          title="Pendapatan"
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

      {/* Charts Section */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 card-minimal p-6 border border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Tren Pendapatan Bulanan
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">Proyeksi revenue dari semua cabang</p>
            </div>
            <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors">
              6M
            </button>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData.length > 0 ? revenueData : [{ name: '-', revenue: 0 }]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#155EEF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#155EEF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 30px rgba(0,0,0,0.15)', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#F8FAFC' }} formatter={(value: number) => [`IDR ${new Intl.NumberFormat('id-ID').format(value)}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#155EEF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" dot={{fill: '#155EEF', r: 5, strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 7}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Branch Revenue Table */}
          {branchData.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="text-muted-foreground border-b-2 border-background/50">
                    <th className="pb-3 font-bold text-xs uppercase tracking-wider">Cabang</th>
                    <th className="pb-3 font-bold text-xs uppercase tracking-wider">Pasien</th>
                    <th className="pb-3 font-bold text-xs uppercase tracking-wider text-right">Revenue</th>
                    <th className="pb-3 font-bold text-xs uppercase tracking-wider text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background">
                  {branchData.map((b: any, i: number) => (
                    <tr key={i} className="group hover:bg-muted/50 transition-colors">
                      <td className="py-4 font-bold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: BRANCH_COLORS[i % BRANCH_COLORS.length]}}></div>
                        {b.name}
                      </td>
                      <td className="py-4 text-muted-foreground font-semibold">{b.patients}</td>
                      <td className="py-4 font-bold text-foreground text-right">IDR {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(b.revenue)}</td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                          <ArrowUpRight size={14} /> +12%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Upcoming Bookings Sidebar */}
        <Card className="card-minimal p-6 border border-border/50 max-h-[510px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-background pb-4 -mx-6 px-6 border-b border-border/30">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Zap size={18} className="text-primary" />
              Antrian Terapi
            </h3>
            <span className="badge-minimal bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-xs font-bold">{upcomingBookings.length}</span>
          </div>

          <div className="space-y-3">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <Clock size={32} className="mx-auto mb-2 opacity-30" />
                <p>Belum ada booking</p>
              </div>
            ) : upcomingBookings.map((booking, idx) => (
              <div key={booking.id} className="p-4 bg-background border-l-4 border-primary rounded-r-xl transition-all hover:bg-primary/5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold text-foreground truncate">{booking.patient?.name || '-'}</div>
                    <div className="text-[11px] font-medium text-muted-foreground mt-1">{booking.therapyType}</div>
                    <div className="text-[10px] mt-2 font-bold text-primary uppercase">
                      {booking.branch?.name || '-'}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs font-bold text-slate-600">{booking.startTime}</div>
                    <div className="text-[10px] text-muted-foreground">{format(new Date(booking.bookingDate), 'dd MMM')}</div>
                  </div>
                </div>
                {booking.status === 'CONFIRMED' && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">
                    <CheckCircle2 size={12} /> Terkonfirmasi
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Performance Highlights */}
        <Card className="card-minimal p-6 border border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Performa Hari Ini
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">Sesi Selesai</p>
                  <p className="text-[10px] text-emerald-700">Produktivitas tinggi</p>
                </div>
              </div>
              <span className="text-base font-bold text-emerald-600">{todayBookings.filter(b => b.status === 'COMPLETED').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-blue-900">Sesi Berlangsung</p>
                  <p className="text-[10px] text-blue-700">Butuh monitoring</p>
                </div>
              </div>
              <span className="text-base font-bold text-blue-600">{todayBookings.filter(b => b.status === 'IN_PROGRESS').length}</span>
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="card-minimal p-6 border border-border/50">
          <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600" />
            Notifikasi Penting
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Jadwal Bentrok</p>
                <p className="text-[10px] text-amber-700 mt-0.5">2 sesi tumpang tindih di Jakarta</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-rose-50 rounded-lg border border-rose-200">
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-rose-900">Tagihan Jatuh Tempo</p>
                <p className="text-[10px] text-rose-700 mt-0.5">5 invoice belum lunas di Bandung</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
