import { Card } from '../components/ui/card';
import { BarChart3, TrendingUp, Users, Wallet, Download, Calendar } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { cn } from 'src/lib/utils';

const data = [
  { name: 'JKT', revenue: 450 },
  { name: 'BDG', revenue: 320 },
  { name: 'SBY', revenue: 280 },
  { name: 'TNG', revenue: 190 },
];

const COLORS = ['#4F9FD8', '#48C7A0', '#F6B95B', '#EF6B6B'];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Laporan & Analitik</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Analisa performa bisnis dan pertumbuhan klinik Anda.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-[13px] font-bold hover:bg-muted/50">
            <Calendar className="h-4 w-4" />
            Mei 2024
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-minimal p-6">
           <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Revenue Per Cabang</h3>
           </div>
           <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="revenue" fill="#4F9FD8" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <Card className="card-minimal p-6">
           <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Distribusi Pasien</h3>
           </div>
           <div className="h-[200px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="revenue"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <Card className="card-minimal p-6">
           <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Key Performance Index</h3>
           </div>
           <div className="space-y-4">
              {[
                { label: 'Retention Rate', value: '84%', color: 'text-emerald-600' },
                { label: 'Avg. Transaction', value: 'Rp 450rb', color: 'text-blue-600' },
                { label: 'Patient Growth', value: '+12.4%', color: 'text-emerald-600' },
                { label: 'Cancel Rate', value: '2.1%', color: 'text-rose-600' },
              ].map((k, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <span className="text-[12px] font-bold text-muted-foreground">{k.label}</span>
                  <span className={cn("text-[13px] font-black", k.color)}>{k.value}</span>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
