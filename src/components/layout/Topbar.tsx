import { Search, Bell, Plus, Building2, UserRound } from 'lucide-react';
import { useApp } from '../../lib/api';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from 'src/lib/utils';

export function Topbar() {
  const { user, branches, selectedBranchId, setSelectedBranchId } = useApp();

  return (
    <header className="flex h-[72px] items-center justify-between border-b minimal-glass px-8 sticky top-0 z-10">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari pasien, invoice, jadwal..."
            className="h-10 w-full rounded-full bg-white border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
            <SelectTrigger className="h-9 bg-foreground text-white rounded-full px-4 border-none shadow-none font-bold text-xs gap-2">
              <Building2 className="h-3.5 w-3.5" />
              <SelectValue placeholder="Pilih Cabang" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-2xl">
              {user?.role === 'OWNER' && (
                <SelectItem value="all" className="rounded-lg">Semua Klinik</SelectItem>
              )}
              {branches.filter(b => user?.role === 'OWNER' || b.id === user?.branchId).map(branch => (
                <SelectItem key={branch.id} value={branch.id} className="rounded-lg">
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-5 border-l border-border pl-5">
          <div className="flex items-center gap-3">
             <div className="hidden lg:block text-right">
                <div className="text-[13px] font-bold text-foreground">{user?.name}</div>
                <div className="bg-[#F4EBDD] text-[#8A704D] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {user?.role}
                </div>
             </div>
             <div className="h-10 w-10 rounded-full bg-secondary border-2 border-white overflow-hidden flex items-center justify-center text-primary font-bold shadow-sm">
               {user?.name[0]}
             </div>
          </div>
          
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
