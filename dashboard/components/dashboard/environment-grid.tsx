import { Thermometer, Droplets, UserSearch, Wifi, TrendingDown, CheckCircle, History, BarChart } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function EnvironmentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
      {/* Temperature */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Climate</span>
          <Thermometer className="text-primary group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <div className="flex items-baseline gap-xs">
            <span className="font-display-lg text-display-lg text-on-background">24°</span>
            <span className="font-body-lg text-body-lg text-on-surface-variant">C</span>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-1">Comfortable indoor temperature</p>
          <p className="font-label-sm text-outline mt-1">Last updated 15 seconds ago</p>
        </div>
        <div className="flex items-center gap-xs text-[#4ade80] font-label-sm text-label-sm">
          <TrendingDown className="w-4 h-4" />
          <span>Getting cooler</span>
        </div>
      </GlassCard>

      {/* Humidity */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Air Quality</span>
          <Droplets className="text-[#60a5fa] group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <div className="flex items-baseline gap-xs">
            <span className="font-display-lg text-display-lg text-on-background">45</span>
            <span className="font-body-lg text-body-lg text-on-surface-variant">%</span>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-1">Ideal humidity levels</p>
          <p className="font-label-sm text-outline mt-1">Last updated 1 minute ago</p>
        </div>
        <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Stable environment</span>
        </div>
      </GlassCard>

      {/* Motion */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Security</span>
          <UserSearch className="text-on-surface-variant group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <span className="font-headline-md text-headline-md text-on-background block h-[64px] flex items-center">No activity detected</span>
          <p className="font-body-sm text-on-surface-variant mt-1">Last motion 4 hours ago</p>
        </div>
        <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
          <History className="w-4 h-4" />
          <span>Area secure</span>
        </div>
      </GlassCard>

      {/* Network */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Connectivity</span>
          <Wifi className="text-primary group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <span className="font-headline-lg text-headline-lg text-on-background block flex items-center">Excellent</span>
          <p className="font-body-sm text-on-surface-variant mt-1">-45 dBm</p>
          <p className="font-label-sm text-outline mt-1">Connected</p>
          <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden mt-md mb-2">
            <div className="bg-primary w-[92%] h-full rounded-full"></div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
