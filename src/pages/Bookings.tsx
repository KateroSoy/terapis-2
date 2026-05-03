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
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  Clock, 
  UserRound, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { cn } from 'src/lib/utils';

export function Bookings() {
  const { selectedBranchId } = useApp();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api(`/api/bookings?branchId=${selectedBranchId}`).then(data => {
      setBookings(data);
      setLoading(false);
    });
  }, [selectedBranchId]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Booking Terapi</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Total {bookings.length} jadwal terapi terdaftar.</p>
        </div>
        <Button className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95">
          <Plus className="h-4 w-4" />
          <span className="font-bold text-xs">Booking Baru</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <Card className="card-minimal p-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
               <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Selesai</p>
               <p className="text-xl font-bold">102 Sesi</p>
            </div>
         </Card>
         <Card className="card-minimal p-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
               <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Konfirmasi</p>
               <p className="text-xl font-bold">24 Sesi</p>
            </div>
         </Card>
         <Card className="card-minimal p-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
               <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Dibatalkan</p>
               <p className="text-xl font-bold">5 Sesi</p>
            </div>
         </Card>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="p-6 border-b minimal-glass flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari booking, pasien, terapis..."
              className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" className="h-9 rounded-full text-[12px] text-primary font-bold hover:bg-secondary/20">Hari Ini</Button>
             <Button variant="ghost" className="h-9 rounded-full text-[12px] text-muted-foreground font-bold">Besok</Button>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Memuat data booking...
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => (
                  <TableRow key={b.id} className="hover:bg-muted/30 transition-colors border-none group cursor-pointer">
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
                         <div className="h-10 w-10 flex-shrink-0 bg-accent text-primary rounded-xl flex items-center justify-center font-bold">
                           {b.patient?.name[0]}
                         </div>
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
                      <Badge variant="outline" className="bg-secondary text-primary border-primary/20 font-bold uppercase text-[9px] py-1">
                        {b.therapyType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "font-bold uppercase text-[9px] py-1 border-none",
                        b.status === 'CONFIRMED' ? "bg-green-500 text-white" : 
                        b.status === 'PENDING' ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {b.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
