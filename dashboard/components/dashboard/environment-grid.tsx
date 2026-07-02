import { Thermometer, Droplets, UserSearch, Wifi, TrendingDown, CheckCircle, History, TrendingUp, Minus } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { TelemetryData } from "@/lib/mock-data";

interface EnvironmentGridProps {
  telemetry: TelemetryData;
}

export function EnvironmentGrid({ telemetry }: EnvironmentGridProps) {
  const TrendIcon = telemetry.temperature.trend === "down" ? TrendingDown : telemetry.temperature.trend === "up" ? TrendingUp : Minus;

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
            <span className="font-display-lg text-display-lg text-on-background">{telemetry.temperature.value}°</span>
            <span className="font-body-lg text-body-lg text-on-surface-variant">{telemetry.temperature.unit}</span>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-1">{telemetry.temperature.description}</p>
          <p className="font-label-sm text-outline mt-1">Last updated {telemetry.temperature.lastUpdated}</p>
        </div>
        <div className="flex items-center gap-xs text-[#4ade80] font-label-sm text-label-sm">
          <TrendIcon className="w-4 h-4" />
          <span>{telemetry.temperature.trendText}</span>
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
            <span className="font-display-lg text-display-lg text-on-background">{telemetry.humidity.value}</span>
            <span className="font-body-lg text-body-lg text-on-surface-variant">{telemetry.humidity.unit}</span>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-1">{telemetry.humidity.description}</p>
          <p className="font-label-sm text-outline mt-1">Last updated {telemetry.humidity.lastUpdated}</p>
        </div>
        <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
          <CheckCircle className="w-4 h-4" />
          <span>{telemetry.humidity.statusText}</span>
        </div>
      </GlassCard>

      {/* Motion */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Security</span>
          <UserSearch className="text-on-surface-variant group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <span className="font-headline-md text-headline-md text-on-background block h-[64px] flex items-center">{telemetry.security.status}</span>
          <p className="font-body-sm text-on-surface-variant mt-1">Last motion {telemetry.security.lastMotion}</p>
        </div>
        <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
          <History className="w-4 h-4" />
          <span>{telemetry.security.stateText}</span>
        </div>
      </GlassCard>

      {/* Network */}
      <GlassCard ambientGlow className="p-lg hover:bg-surface-container-high transition-all group">
        <div className="flex items-center justify-between mb-lg">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Connectivity</span>
          <Wifi className="text-primary group-hover:scale-110 transition-transform w-6 h-6" />
        </div>
        <div className="mb-md">
          <span className="font-headline-lg text-headline-lg text-on-background block flex items-center">{telemetry.connectivity.status}</span>
          <p className="font-body-sm text-on-surface-variant mt-1">{telemetry.connectivity.signalStrength}</p>
          <p className="font-label-sm text-outline mt-1">{telemetry.connectivity.stateText}</p>
          <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden mt-md mb-2">
            <div className={`bg-primary h-full rounded-full`} style={{ width: `${telemetry.connectivity.quality}%` }}></div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
