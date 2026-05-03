import { useEffect, useState } from 'react';
import { useApp, api } from '../lib/api';
import { Card } from '../components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  FileText, 
  Download, 
  Printer, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { cn } from 'src/lib/utils';

export function Invoices() {
  const { selectedBranchId } = useApp();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api(`/api/invoices?branchId=${selectedBranchId}`).then(data => {
      setInvoices(data);
      setLoading(false);
    });
  }, [selectedBranchId]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Invoice & Tagihan</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Kelola transaksi dan pembayaran layanan terapi.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-full gap-2 border-border bg-white shadow-none font-bold text-xs px-5">
            <Download className="h-3.5 w-3.5" />
            Laporan Keuangan
          </Button>
          <Button className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95 text-xs">
            <Wallet className="h-4 w-4" />
            <span className="font-bold">Kasir / POS</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
         <Card className="card-minimal p-6 overflow-hidden relative group cursor-pointer hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <CheckCircle2 className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Lunas</p>
            <p className="text-xl font-bold">IDR 125.4M</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-success uppercase">
               ↑ 14% dari bulan lalu
            </div>
         </Card>
         <Card className="card-minimal p-6 overflow-hidden relative group cursor-pointer hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Clock className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Menunggu</p>
            <p className="text-xl font-bold">IDR 18.2M</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-warning uppercase">
               18 invoice outstanding
            </div>
         </Card>
         <Card className="card-minimal p-6 overflow-hidden relative group cursor-pointer hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Wallet className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Promo Paket</p>
            <p className="text-xl font-bold">IDR 4.2M</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase">
               84 Paket aktif
            </div>
         </Card>
         <Card className="card-minimal p-6 overflow-hidden relative bg-primary text-white shadow-lg shadow-primary/20 border-none">
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
              <input 
                type="text" 
                placeholder="Cari nomor invoice, pasien..."
                className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="ghost" className="h-9 px-4 rounded-full text-[12px] font-bold text-primary bg-secondary/20 hover:bg-secondary/30">Semua</Button>
              <Button variant="ghost" className="h-9 px-4 rounded-full text-[12px] font-bold text-muted-foreground hover:text-foreground">Lunas</Button>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center font-bold text-muted-foreground uppercase text-xs">Memuat data invoice...</TableCell>
                </TableRow>
              ) : (
                invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center font-bold text-muted-foreground">Belum ada transaksi di cabang ini.</TableCell>
                  </TableRow>
                ) : (
                  invoices.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-muted/30 transition-colors border-none group">
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2">
                           <FileText className="h-4 w-4 text-primary opacity-50" />
                           <span className="font-black text-xs text-foreground tracking-tight">{inv.invoiceNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-muted-foreground">
                          {format(new Date(inv.issuedAt), 'dd MMM yyyy')}
                        </span>
                      </TableCell>
                      <TableCell>
                         <div className="font-bold text-sm">{inv.patient?.name}</div>
                      </TableCell>
                      <TableCell>
                         <div className="font-black text-sm text-primary">
                           IDR {new Intl.NumberFormat('id-ID').format(inv.total)}
                         </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full w-fit">
                            {inv.paymentMethod || 'N/A'}
                         </div>
                      </TableCell>
                      <TableCell>
                         <Badge className={cn(
                           "font-bold uppercase text-[9px] py-1 border-none",
                           inv.status === 'PAID' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                         )}>
                           {inv.status === 'PAID' ? 'Lunas' : 'Belum Lunas'}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <div className="flex justify-end gap-2">
                            <button className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                               <ExternalLink className="h-4 w-4" />
                            </button>
                            <button className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                               <Printer className="h-4 w-4" />
                            </button>
                         </div>
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
