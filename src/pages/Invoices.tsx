import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Search, FileText, Download, Printer, CheckCircle2, Clock, Wallet, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';

const PAYMENT_METHODS = ['Transfer', 'Cash', 'QRIS', 'Kartu Debit', 'Kartu Kredit'];

function InvoiceModal({ invoice, patients, branches, onClose, onSave }: any) {
  const isEdit = !!invoice?.id;
  const [form, setForm] = useState({
    patientId: invoice?.patientId || patients[0]?.id || '',
    branchId: invoice?.branchId || branches[0]?.id || '',
    total: invoice?.total || '',
    status: invoice?.status || 'UNPAID',
    paymentMethod: invoice?.paymentMethod || '',
    issuedAt: invoice?.issuedAt ? invoice.issuedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-black text-lg">{isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (!form.total) { toast.error('Nominal harus diisi.'); return; } onSave(form); }}
          className="p-6 space-y-4">
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
            <label className="text-[11px] font-black uppercase text-muted-foreground">Total (IDR)</label>
            <input type="number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.total} onChange={e => set('total', e.target.value)} placeholder="150000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Status</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="UNPAID">Belum Lunas</option>
                <option value="PAID">Lunas</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-muted-foreground">Metode Bayar</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.paymentMethod} onChange={e => set('paymentMethod', e.target.value)}>
                <option value="">-</option>
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase text-muted-foreground">Tanggal Invoice</label>
            <input type="date" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" value={form.issuedAt} onChange={e => set('issuedAt', e.target.value)} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold text-sm hover:bg-muted/30">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90">{isEdit ? 'Simpan' : 'Buat Invoice'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Invoices() {
  const { patients, branches, invoices, addInvoice, updateInvoice, deleteInvoice } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      (inv.patient?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || inv.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPaid = invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + i.total, 0);
  const totalUnpaid = invoices.filter(i => i.status !== 'PAID').reduce((s, i) => s + i.total, 0);

  const handleSave = (form: any) => {
    if (modal === 'add') {
      addInvoice({ ...form, total: Number(form.total), issuedAt: new Date(form.issuedAt).toISOString() });
      toast.success('Invoice berhasil dibuat!');
    } else {
      updateInvoice(selected.id, { ...form, total: Number(form.total) });
      toast.success('Invoice berhasil diperbarui!');
    }
    setModal(null); setSelected(null);
  };

  const handleDelete = (id: string, num: string) => {
    if (confirm(`Hapus invoice ${num}?`)) { deleteInvoice(id); toast.success('Invoice dihapus.'); }
  };

  return (
    <div className="space-y-6 pb-12">
      {modal && (
        <InvoiceModal invoice={modal === 'edit' ? selected : null} patients={patients} branches={branches}
          onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Invoice & Tagihan</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Kelola transaksi dan pembayaran layanan terapi.</p>
        </div>
        <Button onClick={() => setModal('add')} className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95 text-xs">
          <Plus className="h-4 w-4" />
          <span className="font-bold">Buat Invoice</span>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <Card className="card-minimal p-6 relative overflow-hidden hover:translate-y-[-2px] transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Lunas</p>
          <p className="text-xl font-bold">IDR {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(totalPaid)}</p>
          <div className="mt-3 text-[10px] font-bold text-emerald-500 uppercase">{invoices.filter(i => i.status === 'PAID').length} invoice lunas</div>
        </Card>
        <Card className="card-minimal p-6 relative overflow-hidden hover:translate-y-[-2px] transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Menunggu</p>
          <p className="text-xl font-bold">IDR {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(totalUnpaid)}</p>
          <div className="mt-3 text-[10px] font-bold text-amber-500 uppercase">{invoices.filter(i => i.status !== 'PAID').length} outstanding</div>
        </Card>
        <Card className="card-minimal p-6 relative overflow-hidden hover:translate-y-[-2px] transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Invoice</p>
          <p className="text-xl font-bold">{invoices.length}</p>
          <div className="mt-3 text-[10px] font-bold text-primary uppercase">Semua cabang</div>
        </Card>
        <Card className="card-minimal p-6 relative overflow-hidden bg-primary text-white shadow-lg shadow-primary/20 border-none">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Target Bulan Ini</p>
          <p className="text-xl font-bold">IDR 200M</p>
          <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-3/4" />
          </div>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-tight opacity-80">75% Tercapai</p>
        </Card>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="p-6 border-b minimal-glass flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Cari nomor invoice, pasien..." value={search} onChange={e => setSearch(e.target.value)}
              className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-center gap-2">
            {(['ALL', 'PAID', 'UNPAID'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn('h-9 px-4 rounded-full text-[12px] font-bold transition-all',
                  filter === f ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground')}>
                {f === 'ALL' ? 'Semua' : f === 'PAID' ? 'Lunas' : 'Belum Lunas'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Nomor Invoice</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Tanggal</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Pasien</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Total Tagihan</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Metode</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14">Status</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest h-14 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="h-32 text-center font-bold text-muted-foreground">Tidak ada invoice ditemukan.</TableCell></TableRow>
              ) : filtered.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-muted/30 transition-colors border-none group">
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary opacity-50" />
                      <span className="font-black text-xs text-foreground tracking-tight">{inv.invoiceNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-xs font-bold text-muted-foreground">{format(new Date(inv.issuedAt), 'dd MMM yyyy')}</span></TableCell>
                  <TableCell><div className="font-bold text-sm">{inv.patient?.name}</div></TableCell>
                  <TableCell><div className="font-black text-sm text-primary">IDR {new Intl.NumberFormat('id-ID').format(inv.total)}</div></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full w-fit">
                      {inv.paymentMethod || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('font-bold uppercase text-[9px] py-1 border-none',
                      inv.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600')}>
                      {inv.status === 'PAID' ? 'Lunas' : 'Belum Lunas'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelected(inv); setModal('edit'); }}
                        className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-emerald-500 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
                        className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
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
