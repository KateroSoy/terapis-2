import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { UserPlus, Search, Shield, Lock, Edit, Trash2, X } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';

const ROLES = ['OWNER', 'ADMIN_CABANG', 'MANAGER', 'KASIR', 'TERAPIS'];

function UserModal({ user, branches, onClose, onSave }: any) {
  const isEdit = !!user?.id;
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'KASIR',
    branchId: user?.branchId || branches[0]?.id || '',
    branch: user?.branch || branches[0]?.city || '',
    status: user?.status || 'ACTIVE',
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit User' : 'Tambah User Baru'}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (!form.name || !form.email) { toast.error('Nama dan email wajib diisi.'); return; } onSave(form); }} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Nama Lengkap *</label>
            <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Email *</label>
            <input type="email" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Role</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.role} onChange={e => set('role', e.target.value)}>
                {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Status</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Nonaktif</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
            <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.branchId}
              onChange={e => {
                const b = branches.find((x: any) => x.id === e.target.value);
                set('branchId', e.target.value);
                set('branch', b?.city || 'All');
              }}>
              {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan' : 'Tambah User'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Users() {
  const { users, branches, addUser, updateUser, deleteUser } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form: any) => {
    if (modal === 'add') { addUser(form); toast.success('User berhasil ditambahkan!'); }
    else { updateUser(selected.id, form); toast.success('User berhasil diperbarui!'); }
    setModal(null); setSelected(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus user "${name}"?`)) { deleteUser(id); toast.success('User dihapus.'); }
  };

  return (
    <div className="space-y-6">
      {modal && (
        <UserModal user={modal === 'edit' ? selected : null} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">User Access Management</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola hak akses dan staf operasional klinik.</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <UserPlus className="h-4 w-4" />
          Tambah User
        </button>
      </div>

      <Card className="card-minimal p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari nama atau email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </Card>

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
              {filtered.map((u) => (
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
                    <div className={cn('flex items-center gap-1.5 font-bold text-[12px]',
                      u.status === 'ACTIVE' ? 'text-emerald-600' : 'text-muted-foreground')}>
                      <div className={cn('h-1.5 w-1.5 rounded-full', u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-muted-foreground')} />
                      {u.status === 'ACTIVE' ? 'Aktif' : 'Nonaktif'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelected(u); setModal('edit'); }}
                        className="p-2 text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(u.id, u.name)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
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
