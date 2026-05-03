import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserRound, 
  Stethoscope, 
  Wallet, 
  FileText, 
  Package, 
  BarChart3, 
  Building2, 
  ShieldCheck, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../lib/api';
import { cn } from 'src/lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Booking Pasien', icon: Calendar },
  { id: 'patients', label: 'Data Pasien', icon: Users },
  { id: 'medical-records', label: 'Rekam Medis', icon: Stethoscope },
  { id: 'therapists', label: 'Terapis', icon: UserRound },
  { id: 'cashier', label: 'Kasir', icon: Wallet },
  { id: 'invoices', label: 'Invoice', icon: FileText },
  { id: 'therapy-packages', label: 'Paket Terapi', icon: Package },
  { id: 'reports', label: 'Laporan', icon: BarChart3 },
  { id: 'branches', label: 'Manajemen Cabang', icon: Building2 },
  { id: 'users', label: 'User Access', icon: ShieldCheck },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const { user, logout } = useApp();

  return (
    <aside className="hidden w-60 flex-col border-r sidebar-gradient md:flex">
      <div className="flex h-[72px] items-center border-b px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
            K
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">KlinikTerapis <span className="text-primary">Pro</span></h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "group flex w-full items-center gap-3 px-6 py-3 text-[13px] font-medium transition-all",
                currentPage === item.id 
                  ? "bg-secondary/40 text-primary border-r-4 border-primary font-bold" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-4.5 w-4.5 transition-colors",
                currentPage === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t p-4 px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-secondary border-2 border-white flex items-center justify-center font-bold text-primary shadow-sm">
            {user?.name[0]}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold">{user?.name}</p>
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">SUPER ADMIN</p>
          </div>
          <button 
            onClick={logout}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
