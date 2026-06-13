import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Package, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';

function PackageModal({ pkg, patients, branches, onClose, onSave }: any) {
  const isEdit = !!pkg?.id;
  const [form, setForm] = useState({
    patientId: pkg?.patientId || patients[0]?.id || '',
    branchId: pkg?.branchId || branches[0]?.id || '',
    packageName: pkg?.packageName || 'Paket Hemat 4 Sesi',
    totalSessions: pkg?.totalSessions || 4,
    usedSessions: pkg?.usedSessions || 0,
    price: pkg?.price || 550000,
    status: pkg?.status || 'ACTIVE',
    expiredAt: pkg?.expiredAt ? pkg.expiredAt.slice(0, 10) : '',
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Paket' : 'Tambah Paket Pasien'}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave({ ...form, totalSessions: Number(form.totalSessions), usedSessions: Number(form.usedSessions), price: Number(form.price), expiredAt: form.expiredAt ? new Date(form.expiredAt).toISOString() : null }); }} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Pasien</label>
            <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.patientId} onChange={e => set('patientId', e.target.value)}>
              {patients.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
            <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.branchId} onChange={e => set('branchId', e.target.value)}>
              {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Nama Paket</label>
            <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.packageName} onChange={e => set('packageName', e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Total Sesi</label>
              <input type="number" min="1" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.totalSessions} onChange={e => set('totalSessions', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Terpakai</label>
              <input type="number" min="0" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.usedSessions} onChange={e => set('usedSessions', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Harga (IDR)</label>
              <input type="number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Status</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="ACTIVE">Aktif</option>
                <option value="COMPLETED">Selesai</option>
                <option value="EXPIRED">Kadaluarsa</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Expired</label>
              <input type="date" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.expiredAt} onChange={e => set('expiredAt', e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan' : 'Tambah Paket'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TherapyPackages() {
  const { therapyPackages, patients, branches, addTherapyPackage, updateTherapyPackage, deleteTherapyPackage } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = therapyPackages.filter(p =>
    (p.patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    p.packageName.toLowerCase().includes(search.toLowerCase())
  );

  const activePackages = therapyPackages.filter(p => p.status === 'ACTIVE');
  const totalValue = therapyPackages.reduce((s, p) => s + p.price, 0);

  const handleSave = async (form: any) => {
    try {
      if (modal === 'add') { await addTherapyPackage(form); toast.success('Paket berhasil ditambahkan!'); }
      else { await updateTherapyPackage(selected.id, form); toast.success('Paket diperbarui!'); }
      setModal(null); setSelected(null);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus paket ini?')) {
      try { await deleteTherapyPackage(id); toast.success('Paket dihapus.'); }
      catch (e: any) { toast.error(e.message); }
    }
  };

  return (
    <div className="space-y-6">
      {modal && (
        <PackageModal pkg={modal === 'edit' ? selected : null} patients={patients} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Paket Terapi</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola {therapyPackages.length} paket layanan pasien.</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Tambah Paket
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Card className="card-minimal p-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Paket Aktif</p>
          <p className="text-2xl font-bold">{activePackages.length}</p>
          <p className="text-[11px] text-primary font-bold mt-2">dari {therapyPackages.length} total</p>
        </Card>
        <Card className="card-minimal p-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Nilai Paket</p>
          <p className="text-2xl font-bold">IDR {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(totalValue)}</p>
        </Card>
        <Card className="card-minimal p-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Sesi Tersisa</p>
          <p className="text-2xl font-bold">{activePackages.reduce((s, p) => s + p.remainingSessions, 0)}</p>
          <p className="text-[11px] text-muted-foreground font-bold mt-2">dari {activePackages.reduce((s, p) => s + p.totalSessions, 0)} total sesi</p>
        </Card>
      </div>

      <Card className="card-minimal p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari nama pasien atau paket..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </Card>

      <Card className="card-minimal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground">
                <th className="px-6 py-4 font-bold">Pasien</th>
                <th className="px-6 py-4 font-bold">Paket</th>
                <th className="px-6 py-4 font-bold">Progress</th>
                <th className="px-6 py-4 font-bold">Harga</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground font-bold">Belum ada paket.</td></tr>
              ) : filtered.map((p) => {
                const progress = p.totalSessions > 0 ? (p.usedSessions / p.totalSessions) * 100 : 0;
                return (
                  <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{p.patient?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{p.packageName}</div>
                      <div className="text-[11px] text-muted-foreground">{p.expiredAt ? `Exp: ${format(new Date(p.expiredAt), 'dd MMM yyyy')}` : 'Tanpa batas'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">{p.usedSessions}/{p.totalSessions}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">IDR {new Intl.NumberFormat('id-ID').format(p.price)}</td>
                    <td className="px-6 py-4">
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                        p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' :
                        p.status === 'COMPLETED' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600')}>
                        {p.status === 'ACTIVE' ? 'Aktif' : p.status === 'COMPLETED' ? 'Selesai' : 'Expired'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelected(p); setModal('edit'); }} className="p-2 text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
