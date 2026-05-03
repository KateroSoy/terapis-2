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
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Baby 
} from 'lucide-react';
import { Button } from '../components/ui/button';

export function Patients() {
  const { selectedBranchId } = useApp();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api(`/api/patients?branchId=${selectedBranchId}`).then(data => {
      setPatients(data);
      setLoading(false);
    });
  }, [selectedBranchId]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Database Pasien</h2>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">Kelola total {patients.length} pasien terdaftar di klinik.</p>
        </div>
        <Button className="h-10 gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/20 transition-transform active:scale-95 text-xs">
          <Plus className="h-4 w-4" />
          <span className="font-bold">Tambah Pasien</span>
        </Button>
      </div>

      <Card className="card-minimal overflow-hidden">
        <div className="p-6 border-b minimal-glass flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari nama, kota, atau nomor HP..."
              className="h-10 w-full rounded-full bg-muted/30 border border-border pl-10 pr-4 text-[13px] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-9 rounded-full gap-2 border-border bg-white shadow-none font-bold text-xs px-4 text-muted-foreground">
               <Filter className="h-3.5 w-3.5" />
               Filter
             </Button>
          </div>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center font-bold text-muted-foreground">Loading patient data...</TableCell>
                </TableRow>
              ) : patients.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/30 transition-colors rounded-2xl border-none">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-accent flex items-center justify-center font-bold text-primary">
                        {p.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{p.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{p.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3 text-primary" />
                      {p.branch?.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/50 text-primary border-primary/20 font-bold uppercase text-[9px] py-1">
                      {p.therapyType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Baby className="h-3 w-3 text-muted-foreground" />
                      {p.age} th · {p.gender}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs font-medium text-muted-foreground truncate max-w-[200px]">{p.mainComplaint}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                         <Eye className="h-4 w-4" />
                       </button>
                       <button className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-emerald-500 transition-colors">
                         <Edit className="h-4 w-4" />
                       </button>
                       <button className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                         <Trash2 className="h-4 w-4" />
                       </button>
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
