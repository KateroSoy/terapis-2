import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { UserRound, Phone, Mail, MapPin, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';

const SPECIALIZATIONS = ['Fisioterapi', 'Terapi Wicara', 'Okupasi Terapi', 'Konseling', 'Rehab Medik', 'Tumbuh Kembang'];

function TherapistModal({ therapist, branches, onClose, onSave }: any) {
  const isEdit = !!therapist?.id;
  const [form, setForm] = useState({
    name: therapist?.name || '',
    specialization: therapist?.specialization || SPECIALIZATIONS[0],
    branchId: therapist?.branchId || branches[0]?.id || '',
    branch: therapist?.branch || branches[0]?.city || '',
    email: therapist?.email || '',
    phone: therapist?.phone || '',
    workSchedule: therapist?.workSchedule || 'Senin - Jumat',
    status: therapist?.status || 'ACTIVE',
    rating: therapist?.rating || 5.0,
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Terapis' : 'Tambah Terapis'}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (!form.name) { toast.error('Nama wajib diisi.'); return; } onSave(form); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Nama Lengkap *</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nama + Gelar" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Spesialisasi</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.specialization} onChange={e => set('specialization', e.target.value)}>
                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.branchId}
                onChange={e => {
                  const b = branches.find((x: any) => x.id === e.target.value);
                  set('branchId', e.target.value);
                  set('branch', b?.city || '');
                }}>
                {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Email</label>
              <input type="email" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">No. HP</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Jadwal Kerja</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.workSchedule} onChange={e => set('workSchedule', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Status</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="ACTIVE">Aktif</option>
                <option value="ON_LEAVE">Cuti</option>
                <option value="INACTIVE">Nonaktif</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan Perubahan' : 'Tambah Terapis'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Therapists() {
  const { branches, therapists, addTherapist, updateTherapist, deleteTherapist } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = therapists.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form: any) => {
    if (modal === 'add') { addTherapist(form); toast.success('Terapis berhasil ditambahkan!'); }
    else { updateTherapist(selected.id, form); toast.success('Data terapis diperbarui!'); }
    setModal(null); setSelected(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus terapis "${name}"?`)) { deleteTherapist(id); toast.success('Terapis dihapus.'); }
  };

  return (
    <div className="space-y-6">
      {modal && (
        <TherapistModal therapist={modal === 'edit' ? selected : null} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manajemen Terapis</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Kelola {therapists.length} terapis profesional di seluruh cabang.</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Tambah Terapis
        </button>
      </div>

      <Card className="card-minimal p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari nama atau spesialisasi..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.id} className="card-minimal p-5 hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold text-lg shrink-0">{t.name[0]}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[14px] truncate">{t.name}</h4>
                <p className="text-[12px] font-medium text-primary mb-2">{t.specialization}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mb-4">
                  ★ {t.rating} <span className="text-muted-foreground ml-1">(review)</span>
                </div>
              </div>
              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded uppercase',
                t.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600')}>
                {t.status === 'ACTIVE' ? 'Aktif' : 'Cuti'}
              </span>
            </div>

            <div className="space-y-2.5 mt-4 pt-4 border-t">
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>Cabang: <span className="font-bold text-foreground">{t.branch}</span></span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{t.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button onClick={() => { setSelected(t); setModal('edit'); }}
                className="py-2 text-[11px] font-bold bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-all flex items-center justify-center gap-1.5">
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(t.id, t.name)}
                className="py-2 text-[11px] font-bold border rounded-lg hover:bg-red-50 hover:text-destructive transition-all flex items-center justify-center gap-1.5">
                <Trash2 className="h-3.5 w-3.5" /> Hapus
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
