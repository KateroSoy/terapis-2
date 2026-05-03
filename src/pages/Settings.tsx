import { Card } from '../components/ui/card';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import { cn } from 'src/lib/utils';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Pengaturan Sistem</h2>
        <p className="text-[13px] font-medium text-muted-foreground">Konfigurasi preferensi aplikasi dan profil organisasi Anda.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1 flex flex-col gap-1">
           {[
             { label: 'Profil Klinik', icon: SettingsIcon, active: true },
             { label: 'Notifikasi', icon: Bell },
             { label: 'Keamanan', icon: Shield },
             { label: 'Tampilan & Tema', icon: Palette },
             { label: 'Bahasa & Lokasi', icon: Globe },
             { label: 'Bantuan', icon: HelpCircle },
           ].map((item, i) => (
             <button key={i} className={cn(
               "flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all",
               item.active ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted/50"
             )}>
               <item.icon className="h-4 w-4" />
               {item.label}
             </button>
           ))}
        </div>

        <Card className="lg:col-span-3 card-minimal p-8">
           <div className="max-w-2xl space-y-8">
              <section>
                 <h3 className="text-base font-black mb-6">Informasi Klinik Dasar</h3>
                 <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-muted-foreground uppercase">Nama Organisasi</label>
                       <input type="text" value="KlinikTerapis Pro" className="w-full px-4 py-3 bg-muted border-none rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-muted-foreground uppercase">Website</label>
                       <input type="text" value="https://klinikterapispro.com" className="w-full px-4 py-3 bg-muted border-none rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[11px] font-black text-muted-foreground uppercase">Email Support</label>
                       <input type="email" value="hello@klinikterapispro.com" className="w-full px-4 py-3 bg-muted border-none rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20" />
                    </div>
                 </div>
              </section>

              <section className="pt-8 border-t">
                 <h3 className="text-base font-black mb-6">Logo Klinik</h3>
                 <div className="flex items-center gap-8">
                    <div className="h-24 w-24 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-3xl">
                      K
                    </div>
                    <div className="space-y-3">
                       <button className="px-4 py-2 bg-primary text-white rounded-lg text-[12px] font-bold shadow-sm">Ganti Logo</button>
                       <p className="text-[11px] text-muted-foreground">Minimal 512x512px, format PNG atau JPG.</p>
                    </div>
                 </div>
              </section>

              <div className="pt-10 flex justify-end">
                 <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[13px] font-black shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Simpan Perubahan
                 </button>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
