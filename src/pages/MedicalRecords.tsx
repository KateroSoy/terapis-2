import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Stethoscope, FileText, Search, Plus, Edit, Trash2, X, Eye } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';

function RecordModal({ record, patients, therapists, branches, onClose, onSave }: any) {
  const isEdit = !!record?.id;
  const [form, setForm] = useState({
    patientId: record?.patientId || patients[0]?.id || '',
    therapistId: record?.therapistId || therapists[0]?.id || '',
    branchId: record?.branchId || branches[0]?.id || '',
    therapyType: record?.therapyType || 'Fisioterapi',
    sessionNumber: record?.sessionNumber || 1,
    subjective: record?.subjective || '',
    objective: record?.objective || '',
    assessment: record?.assessment || '',
    plan: record?.plan || '',
    treatmentGiven: record?.treatmentGiven || '',
    homeExercise: record?.homeExercise || '',
    progressStatus: record?.progressStatus || 'STABLE',
    nextPlan: record?.nextPlan || '',
    recordDate: record?.recordDate ? record.recordDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Rekam Medis' : 'Input SOAP Baru'}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (!form.subjective) { toast.error('Subjective wajib diisi.'); return; } onSave({ ...form, sessionNumber: Number(form.sessionNumber), recordDate: new Date(form.recordDate).toISOString() }); }} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Pasien</label>
              <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.patientId} onChange={e => set('patientId', e.target.value)}>
                {patients.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Terapis</label>
              <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.therapistId} onChange={e => set('therapistId', e.target.value)}>
                {therapists.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
              <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.branchId} onChange={e => set('branchId', e.target.value)}>
                {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tipe Terapi</label>
              <input className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.therapyType} onChange={e => set('therapyType', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Sesi Ke-</label>
              <input type="number" min="1" className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.sessionNumber} onChange={e => set('sessionNumber', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tanggal</label>
              <input type="date" className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.recordDate} onChange={e => set('recordDate', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Progress</label>
              <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.progressStatus} onChange={e => set('progressStatus', e.target.value)}>
                <option value="IMPROVING">Membaik</option>
                <option value="STABLE">Stabil</option>
                <option value="NEEDS_EVALUATION">Perlu Evaluasi</option>
                <option value="DECLINING">Menurun</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-black text-sm mb-3 text-primary">SOAP Notes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-muted-foreground">S - Subjective *</label>
                <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={3} value={form.subjective} onChange={e => set('subjective', e.target.value)} placeholder="Keluhan pasien..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-muted-foreground">O - Objective</label>
                <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={3} value={form.objective} onChange={e => set('objective', e.target.value)} placeholder="Hasil pemeriksaan..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-muted-foreground">A - Assessment</label>
                <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={3} value={form.assessment} onChange={e => set('assessment', e.target.value)} placeholder="Analisis kondisi..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-muted-foreground">P - Plan</label>
                <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={3} value={form.plan} onChange={e => set('plan', e.target.value)} placeholder="Rencana terapi..." />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tindakan Diberikan</label>
              <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={2} value={form.treatmentGiven} onChange={e => set('treatmentGiven', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Home Exercise</label>
              <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={2} value={form.homeExercise} onChange={e => set('homeExercise', e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan Perubahan' : 'Simpan SOAP'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ViewRecordModal({ record, onClose }: any) {
  if (!record) return null;
  const PROGRESS_LABELS: Record<string, string> = { IMPROVING: 'Membaik', STABLE: 'Stabil', NEEDS_EVALUATION: 'Perlu Evaluasi', DECLINING: 'Menurun' };
  const PROGRESS_COLORS: Record<string, string> = { IMPROVING: 'text-emerald-600 bg-emerald-50', STABLE: 'text-blue-600 bg-blue-50', NEEDS_EVALUATION: 'text-amber-600 bg-amber-50', DECLINING: 'text-red-600 bg-red-50' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">Detail Rekam Medis</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-black text-lg">{record.patient?.name}</h4>
              <p className="text-sm text-muted-foreground">{record.therapyType} • Sesi ke-{record.sessionNumber}</p>
            </div>
            <span className={cn('px-3 py-1 rounded-lg text-[11px] font-bold', PROGRESS_COLORS[record.progressStatus] || 'bg-muted')}>
              {PROGRESS_LABELS[record.progressStatus] || record.progressStatus}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Terapis: <span className="font-bold text-foreground">{record.therapist?.name}</span> • {format(new Date(record.recordDate), 'dd MMM yyyy')}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="p-4 bg-blue-50/50 rounded-xl">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2">S - Subjective</p>
              <p className="text-sm">{record.subjective || '-'}</p>
            </div>
            <div className="p-4 bg-emerald-50/50 rounded-xl">
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">O - Objective</p>
              <p className="text-sm">{record.objective || '-'}</p>
            </div>
            <div className="p-4 bg-amber-50/50 rounded-xl">
              <p className="text-[10px] font-black text-amber-600 uppercase mb-2">A - Assessment</p>
              <p className="text-sm">{record.assessment || '-'}</p>
            </div>
            <div className="p-4 bg-purple-50/50 rounded-xl">
              <p className="text-[10px] font-black text-purple-600 uppercase mb-2">P - Plan</p>
              <p className="text-sm">{record.plan || '-'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Tindakan</p>
              <p className="text-sm">{record.treatmentGiven || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Home Exercise</p>
              <p className="text-sm">{record.homeExercise || '-'}</p>
            </div>
          </div>

          <button onClick={onClose} className="w-full mt-4 py-3 bg-muted rounded-xl font-bold text-sm">Tutup</button>
        </div>
      </div>
    </div>
  );
}

export function MedicalRecords() {
  const { medicalRecords, patients, therapists, branches, addMedicalRecord, updateMedicalRecord, deleteMedicalRecord } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = medicalRecords.filter(r =>
    (r.patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.therapist?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    r.therapyType.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (form: any) => {
    try {
      if (modal === 'add') { await addMedicalRecord(form); toast.success('Rekam medis berhasil disimpan!'); }
      else { await updateMedicalRecord(selected.id, form); toast.success('Rekam medis diperbarui!'); }
      setModal(null); setSelected(null);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus rekam medis ini?')) {
      try { await deleteMedicalRecord(id); toast.success('Rekam medis dihapus.'); }
      catch (e: any) { toast.error(e.message); }
    }
  };

  const PROGRESS_COLORS: Record<string, string> = { IMPROVING: 'bg-emerald-100 text-emerald-600', STABLE: 'bg-blue-100 text-blue-600', NEEDS_EVALUATION: 'bg-amber-100 text-amber-600', DECLINING: 'bg-red-100 text-red-600' };
  const PROGRESS_LABELS: Record<string, string> = { IMPROVING: 'Membaik', STABLE: 'Stabil', NEEDS_EVALUATION: 'Evaluasi', DECLINING: 'Menurun' };

  return (
    <div className="space-y-6">
      {(modal === 'add' || modal === 'edit') && (
        <RecordModal record={modal === 'edit' ? selected : null} patients={patients} therapists={therapists} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
      )}
      {modal === 'view' && <ViewRecordModal record={selected} onClose={() => { setModal(null); setSelected(null); }} />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Rekam Medis Digital</h2>
          <p className="text-[13px] font-medium text-muted-foreground">Arsip SOAP dan perkembangan {medicalRecords.length} sesi terapi.</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Input SOAP Baru
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 card-minimal p-5 space-y-4">
          <h3 className="font-bold text-sm">Statistik</h3>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-[11px] font-bold text-primary uppercase">Total Sesi</p>
            <p className="text-2xl font-black text-primary">{medicalRecords.length}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-[11px] font-bold text-emerald-600 uppercase">Membaik</p>
            <p className="text-2xl font-black text-emerald-600">{medicalRecords.filter(r => r.progressStatus === 'IMPROVING').length}</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-[11px] font-bold text-amber-600 uppercase">Perlu Evaluasi</p>
            <p className="text-2xl font-black text-amber-600">{medicalRecords.filter(r => r.progressStatus === 'NEEDS_EVALUATION').length}</p>
          </div>
        </Card>

        <Card className="lg:col-span-3 card-minimal overflow-hidden">
          <div className="p-4 border-b flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Cari pasien, terapis, atau tipe terapi..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-muted/30 text-muted-foreground">
                  <th className="px-6 py-4 font-bold">Pasien</th>
                  <th className="px-6 py-4 font-bold">Terapis</th>
                  <th className="px-6 py-4 font-bold">Sesi</th>
                  <th className="px-6 py-4 font-bold">Tanggal</th>
                  <th className="px-6 py-4 font-bold">Progress</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground font-bold">Belum ada rekam medis.</td></tr>
                ) : filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{r.patient?.name || '-'}</div>
                      <div className="text-[11px] text-primary font-medium">{r.therapyType}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-muted-foreground">{r.therapist?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className="bg-secondary text-primary px-2 py-0.5 rounded text-[11px] font-bold">Ke-{r.sessionNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{format(new Date(r.recordDate), 'dd MMM yyyy')}</td>
                    <td className="px-6 py-4">
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold uppercase', PROGRESS_COLORS[r.progressStatus] || 'bg-muted')}>
                        {PROGRESS_LABELS[r.progressStatus] || r.progressStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelected(r); setModal('view'); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Eye className="h-4 w-4" /></button>
                        <button onClick={() => { setSelected(r); setModal('edit'); }} className="p-2 text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(r.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
