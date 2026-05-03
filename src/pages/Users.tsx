import { Card } from '../components/ui/card';
import { ShieldCheck, UserPlus, Search, Shield, Lock } from 'lucide-react';
import { cn } from 'src/lib/utils';

const users = [
  { id: 1, name: 'Admin Jakarta', email: 'admin.jkt@klinik.com', role: 'ADMIN_CABANG', branch: 'Jakarta' },
  { id: 2, name: 'Kasir Jakarta', email: 'kasir.jkt@klinik.com', role: 'KASIR', branch: 'Jakarta' },
  { id: 3, name: 'Manager Bandung', email: 'manager.bdg@klinik.com', role: 'MANAGER', branch: 'Bandung' },
  { id: 4, name: 'Owner', email: 'owner@klinik.com', role: 'OWNER', branch: 'All' },
];

export function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">User Access Management</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola hak akses dan staf operasional klinik.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <UserPlus className="h-4 w-4" />
          Tambah User
        </button>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground">
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Cabang</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{u.name}</div>
                    <div className="text-[11px] text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-black uppercase">
                      <Shield className="h-3 w-3" />
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">{u.branch}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                       Aktif
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Lock className="h-4 w-4" />
                       </button>
                       <button className="p-2 text-muted-foreground hover:text-primary transition-colors font-bold">
                          Edit
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
