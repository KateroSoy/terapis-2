import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Calendar as CalendarIcon, Clock, UserRound, CheckCircle2, XCircle, AlertCircle, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';

const STATUSES = ['PENDING', 'CONFIRMED', 'CHECK_IN', 'COMPLETED', 'CANCELLED'];

function BookingModal({ booking, patients, therapists, branches, onClose, onSave }: any) {
  const isEdit = !!booking?.id;
  const [form, setForm] = useState({
    patientId: booking?.patientId || patients[0]?.id || '',
    therapistId: booking?.therapistId || therapists[0]?.id || '',
    branchId: booking?.branchId || branches[0]?.id || '',
    therapyType: booking?.therapyType || 'Fisioterapi',
    bookingDate: booking?.bookingDate ? booking.bookingDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
    startTime: booking?.startTime || '09:00',
    endTime: booking?.endTime || '10:00',
    status: booking?.status || 'PENDING',
    notes: booking?.notes || '',
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Booking' : 'Booking Terapi Baru'}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Pasien</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.patientId} onChange={e => set('patientId', e.target.value)}>
                {patients.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Terapis</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.therapistId} onChange={e => set('therapistId', e.target.value)}>
                {therapists.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Cabang</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.branchId} onChange={e => set('branchId', e.target.value)}>
                {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tipe Terapi</label>
              <input className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.therapyType} onChange={e => set('therapyType', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Tanggal</label>
              <input type="date" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.bookingDate} onChange={e => set('bookingDate', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Status</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Mulai</label>
              <input type="time" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.startTime} onChange={e => set('startTime', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Selesai</label>
              <input type="time" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.endTime} onChange={e => set('endTime', e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Catatan</label>
              <textarea className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none" rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan Perubahan' : 'Tambah Booking'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const STATUS_STYLE: Record<string, string> = {
  CONFIRMED: 'bg-green-500 text-white',
  PENDING: 'bg-amber-500 text-white',
  CHECK_IN: 'bg-blue-500 text-white',
  COMPLETED: 'bg-emerald-700 text-white',
  CANCELLED: 'bg-muted text-muted-foreground',
};

export function Bookings() {
  const { patients, therapists, branches, bookings, addBooking, updateBooking, deleteBooking } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = bookings.filter(b =>
    (b.patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.therapist?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form: any) => {
    if (modal === 'add') {
      addBooking({ ...form, bookingDate: new Date(form.bookingDate).toISOString() });
      toast.success('Booking berhasil ditambahkan!');
    } else {
      updateBooking(selected.id, { ...form, bookingDate: new Date(form.bookingDate).toISOString() });
      toast.success('Booking berhasil diperbarui!');
    }
    setModal(null); setSelected(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus booking ini?')) { deleteBooking(id); toast.success('Booking dihapus.'); }
  };

  const confirmed = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED').length;
  const pending = bookings.filter(b => b.status === 'PENDING').length;
  const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;

  return (
    <div className="space-y-6 pb-12">
      {modal && (
        <BookingModal
          booking={modal === 'edit' ? selected : null}
          patients={patients} therapists={therapists} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }}
          onSave={handleSave}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Booking Terapi</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Total {bookings.length} jadwal terapi terdaftar.</p>
        </div>
        <Button onClick={() => setModal('add')} className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95">
          <Plus className="h-4 w-4" />
          <span className="font-bold text-xs">Booking Baru</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="card-minimal p-6 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
          <div><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Selesai / Confirmed</p><p className="text-xl font-bold">{confirmed} Sesi</p></div>
        </Card>
        <Card className="card-minimal p-6 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center"><AlertCircle className="h-5 w-5 text-amber-500" /></div>
          <div><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Menunggu Konfirmasi</p><p className="text-xl font-bold">{pending} Sesi</p></div>
        </Card>
        <Card className="card-minimal p-6 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center"><XCircle className="h-5 w-5 text-destructive" /></div>
          <div><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Dibatalkan</p><p className="text-xl font-bold">{cancelled} Sesi</p></div>
        </Card>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="p-6 border-b minimal-glass flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Cari pasien atau terapis..." value={search} onChange={e => setSearch(e.target.value)}
              className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div className="px-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Tanggal / Waktu</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Pasien</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Terapis</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Terapi</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Status</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="h-32 text-center font-bold text-muted-foreground">Belum ada booking.</TableCell></TableRow>
              ) : filtered.map((b) => (
                <TableRow key={b.id} className="hover:bg-muted/30 transition-colors border-none cursor-pointer">
                  <TableCell className="py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm font-extrabold text-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                        {format(new Date(b.bookingDate), 'dd MMM yyyy')}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {b.startTime} - {b.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 bg-accent text-primary rounded-xl flex items-center justify-center font-bold">{b.patient?.name?.[0] || '?'}</div>
                      <div className="font-bold text-sm tracking-tight">{b.patient?.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-full ring-1 ring-primary/5">
                      <UserRound className="h-3 w-3 text-primary" />
                      {b.therapist?.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary text-primary border-primary/20 font-bold uppercase text-[9px] py-1">{b.therapyType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('font-bold uppercase text-[9px] py-1 border-none', STATUS_STYLE[b.status] || 'bg-muted text-muted-foreground')}>{b.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelected(b); setModal('edit'); }} className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(b.id)} className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
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
