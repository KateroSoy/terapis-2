import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Search, Plus, Eye, Edit, Trash2, MapPin, Baby, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { cn } from 'src/lib/utils';

const THERAPY_TYPES = ['Fisioterapi', 'Terapi Wicara', 'Okupasi Terapi', 'Rehab Medik', 'Tumbuh Kembang', 'Konseling'];

function PatientModal({ patient, branches, onClose, onSave }: any) {
  const isEdit = !!patient?.id;
  const [form, setForm] = useState({
    name: patient?.name || '',
    age: patient?.age || '',
    gender: patient?.gender || 'M',
    phone: patient?.phone || '',
    therapyType: patient?.therapyType || THERAPY_TYPES[0],
    mainComplaint: patient?.mainComplaint || '',
    address: patient?.address || '',
    branchId: patient?.branchId || branches[0]?.id || '',
    status: patient?.status || 'ACTIVE',
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error('Nama dan nomor HP wajib diisi.'); return; }
    onSave({ ...form, age: Number(form.age) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Pasien' : 'Tambah Pasien Baru'}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Nama Lengkap *</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Masukkan nama pasien" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Usia</label>
              <input type="number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.age} onChange={e => set('age', e.target.value)} placeholder="Tahun" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Gender</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">No. HP *</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="08xx" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white" value={form.branchId} onChange={e => set('branchId', e.target.value)}>
                {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tipe Terapi</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white" value={form.therapyType} onChange={e => set('therapyType', e.target.value)}>
                {THERAPY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Keluhan Utama</label>
              <textarea className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={2} value={form.mainComplaint} onChange={e => set('mainComplaint', e.target.value)} placeholder="Deskripsikan keluhan utama pasien" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Alamat</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Kota, Provinsi" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan Perubahan' : 'Tambah Pasien'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ViewModal({ patient, onClose }: any) {
  if (!patient) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">Detail Pasien</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-2xl">{patient.name[0]}</div>
            <div>
              <h4 className="font-black text-lg">{patient.name}</h4>
              <p className="text-sm text-primary font-bold">{patient.therapyType}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t text-sm">
            {[
              ['Usia', `${patient.age} Tahun`],
              ['Gender', patient.gender === 'M' ? 'Laki-laki' : 'Perempuan'],
              ['No. HP', patient.phone],
              ['Cabang', patient.branch?.city || '-'],
              ['Status', patient.status],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-0.5">{k}</p>
                <p className="font-bold">{v}</p>
              </div>
            ))}
            <div className="col-span-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase mb-0.5">Keluhan Utama</p>
              <p className="font-bold">{patient.mainComplaint}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-full mt-4 py-3 bg-muted rounded-xl font-bold text-sm">Tutup</button>
        </div>
      </div>
    </div>
  );
}

export function Patients() {
  const { branches, patients, addPatient, updatePatient, deletePatient } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    (p.branch?.city || '').toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (p: any) => { setSelected(p); setModal('edit'); };
  const openView = (p: any) => { setSelected(p); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleSave = (form: any) => {
    if (modal === 'add') {
      addPatient(form);
      toast.success('Pasien berhasil ditambahkan!');
    } else {
      updatePatient(selected.id, form);
      toast.success('Data pasien berhasil diperbarui!');
    }
    closeModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus pasien "${name}"?`)) {
      deletePatient(id);
      toast.success('Pasien berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {(modal === 'add' || modal === 'edit') && (
        <PatientModal patient={modal === 'edit' ? selected : null} branches={branches} onClose={closeModal} onSave={handleSave} />
      )}
      {modal === 'view' && <ViewModal patient={selected} onClose={closeModal} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Database Pasien</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Kelola total {patients.length} pasien terdaftar di klinik.</p>
        </div>
        <Button onClick={() => setModal('add')} className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95 text-xs">
          <Plus className="h-4 w-4" />
          <span className="font-bold">Tambah Pasien</span>
        </Button>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="p-6 border-b minimal-glass flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Cari nama, kota, atau nomor HP..."
              className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span className="text-[12px] font-bold text-muted-foreground">{filtered.length} pasien</span>
        </div>

        <div className="px-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14">Nama Pasien</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14">Cabang</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14">Tipe Terapi</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14">Usia / Gender</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14">Keluhan Utama</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground h-14 text-right">Opsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="h-32 text-center font-bold text-muted-foreground">Tidak ada pasien ditemukan.</TableCell></TableRow>
              ) : filtered.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/30 transition-colors rounded-2xl border-none">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-accent flex items-center justify-center font-bold text-primary">{p.name[0]}</div>
                      <div>
                        <p className="font-bold text-sm">{p.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{p.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3 text-primary" />
                      {p.branch?.city || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/50 text-primary border-primary/20 font-bold uppercase text-[9px] py-1">{p.therapyType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Baby className="h-3 w-3 text-muted-foreground" />
                      {p.age} th · {p.gender}
                    </div>
                  </TableCell>
                  <TableCell><p className="text-xs font-medium text-muted-foreground truncate max-w-[200px]">{p.mainComplaint}</p></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openView(p)} className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => openEdit(p)} className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
