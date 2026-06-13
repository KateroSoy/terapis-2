import { useState } from 'react';
import { useApp } from '../lib/api';
import { Card } from '../components/ui/card';
import { Wallet, Search, ShoppingCart, User, CreditCard, CheckCircle2, X, Plus, Trash2 } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  total: number;
}

export function Cashier() {
  const { patients, services, branches, addInvoice, addPayment } = useApp();
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [discount, setDiscount] = useState(0);
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );

  const subtotal = cart.reduce((s, item) => s + item.total, 0);
  const discountAmount = subtotal * (discount / 100);
  const grandTotal = subtotal - discountAmount;

  const addToCart = (service: any) => {
    const existing = cart.find(c => c.id === service.id);
    if (existing) {
      setCart(cart.map(c => c.id === service.id ? { ...c, qty: c.qty + 1, total: (c.qty + 1) * c.price } : c));
    } else {
      setCart([...cart, { id: service.id, name: service.name, qty: 1, price: service.price, total: service.price }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(cart.map(c => c.id === id ? { ...c, qty, total: qty * c.price } : c));
  };

  const processPayment = async () => {
    if (!selectedPatient) { toast.error('Pilih pasien terlebih dahulu.'); return; }
    if (cart.length === 0) { toast.error('Keranjang masih kosong.'); return; }

    try {
      const branchId = selectedPatient.branchId || branches[0]?.id;
      await addInvoice({
        patientId: selectedPatient.id,
        branchId,
        subtotal,
        discount: discountAmount,
        total: grandTotal,
        status: 'PAID',
        paymentMethod,
        issuedAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
        items: cart.map(c => ({ serviceName: c.name, qty: c.qty, price: c.price, total: c.total })),
      });

      toast.success(`Pembayaran IDR ${new Intl.NumberFormat('id-ID').format(grandTotal)} berhasil!`);
      setCart([]);
      setSelectedPatient(null);
      setDiscount(0);
      setSearch('');
    } catch (e: any) {
      toast.error(e.message || 'Gagal memproses pembayaran.');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Kasir & Pembayaran</h2>
            <p className="text-[13px] font-medium text-muted-foreground">Input transaksi layanan dan penjualan paket.</p>
          </div>
        </div>

        {/* Patient Selection */}
        <Card className="card-minimal p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari Pasien (nama atau nomor HP)..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowPatientSearch(true); }}
                onFocus={() => setShowPatientSearch(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {showPatientSearch && search && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
                  {filteredPatients.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">Tidak ditemukan</div>
                  ) : filteredPatients.slice(0, 8).map(p => (
                    <button key={p.id} onClick={() => { setSelectedPatient(p); setShowPatientSearch(false); setSearch(''); }}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-center gap-3 text-sm">
                      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-xs">{p.name[0]}</div>
                      <div>
                        <div className="font-bold">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground">{p.phone} • {p.therapyType}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedPatient ? (
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="h-12 w-12 bg-secondary rounded-xl flex items-center justify-center text-primary font-bold text-lg">{selectedPatient.name[0]}</div>
              <div className="flex-1">
                <h4 className="font-bold">{selectedPatient.name}</h4>
                <p className="text-[12px] text-muted-foreground">{selectedPatient.phone} • {selectedPatient.therapyType} • {selectedPatient.branch?.city || '-'}</p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="text-muted-foreground hover:text-destructive"><X className="h-5 w-5" /></button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="h-14 w-14 bg-muted rounded-full flex items-center justify-center mb-3 text-muted-foreground">
                <User className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-foreground">Belum Ada Pasien Terpilih</h3>
              <p className="text-[13px] text-muted-foreground max-w-xs mt-1">Cari pasien untuk memulai transaksi.</p>
            </div>
          )}
        </Card>

        {/* Services */}
        <Card className="card-minimal p-6">
          <h3 className="font-bold text-sm mb-4">Pilih Layanan</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {services.length === 0 ? (
              <p className="text-sm text-muted-foreground col-span-2 text-center py-4">Belum ada layanan. Tambahkan di pengaturan.</p>
            ) : services.map(s => (
              <button key={s.id} onClick={() => addToCart(s)}
                className="p-4 border rounded-xl text-left hover:border-primary/30 hover:bg-primary/5 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{s.name}</h4>
                    <p className="text-[11px] text-muted-foreground">{s.type} • {s.durationMinutes} menit</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-primary">IDR {new Intl.NumberFormat('id-ID').format(s.price)}</p>
                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary ml-auto mt-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Cart Sidebar */}
      <div className="space-y-6">
        <Card className="card-minimal p-6 flex flex-col bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] h-40 w-40 bg-white/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-sm">Ringkasan Keranjang</h3>
            <ShoppingCart className="h-4 w-4 opacity-50" />
          </div>

          <div className="flex-1 space-y-3 min-h-[200px]">
            {cart.length === 0 ? (
              <div className="text-center py-10 opacity-50">
                <p className="text-[12px] font-medium">Keranjang masih kosong</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <p className="text-[12px] font-bold truncate">{item.name}</p>
                  <p className="text-[11px] opacity-60">IDR {new Intl.NumberFormat('id-ID').format(item.price)} x {item.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-xs hover:bg-white/20">-</button>
                    <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-xs hover:bg-white/20">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="opacity-60">Subtotal</span>
              <span>IDR {new Intl.NumberFormat('id-ID').format(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm font-medium text-emerald-400">
                <span>Diskon ({discount}%)</span>
                <span>- IDR {new Intl.NumberFormat('id-ID').format(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black">
              <span>Total Akhir</span>
              <span>IDR {new Intl.NumberFormat('id-ID').format(grandTotal)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 uppercase">Metode</label>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-2 py-2 bg-white/10 border-none rounded-lg text-[12px] text-white focus:outline-none">
                  <option value="Cash" className="text-black">Cash</option>
                  <option value="Transfer" className="text-black">Transfer</option>
                  <option value="QRIS" className="text-black">QRIS</option>
                  <option value="Kartu Debit" className="text-black">Kartu Debit</option>
                  <option value="Kartu Kredit" className="text-black">Kartu Kredit</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 uppercase">Diskon %</label>
                <input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(Number(e.target.value))}
                  className="w-full px-2 py-2 bg-white/10 border-none rounded-lg text-[12px] text-white focus:outline-none" />
              </div>
            </div>

            <button onClick={processPayment} disabled={cart.length === 0 || !selectedPatient}
              className="w-full mt-4 py-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Proses Pembayaran
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
