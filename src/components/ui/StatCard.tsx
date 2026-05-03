import { Card } from './card';
import { cn } from 'src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendValue?: string;
  isTrendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendValue, isTrendUp, className }: StatCardProps) {
  return (
    <Card className={cn("card-minimal p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{value}</h3>
          {trend && (
            <div className={cn(
              "flex items-center gap-1.5 text-[11px] font-bold",
              isTrendUp ? "text-success" : "text-destructive"
            )}>
              <span>{isTrendUp ? '↑' : '↓'}</span>
              <span>{trendValue}</span>
              <span className="text-muted-foreground opacity-60 font-medium lowercase">/ {trend}</span>
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
