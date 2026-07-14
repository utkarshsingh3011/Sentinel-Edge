"use client";

import { useTelemetry } from "@/lib/telemetry-context";
import { GlassCard } from "@/components/ui/glass-card";
import { LiveCharts } from "@/components/dashboard/live-charts";
import { Thermometer, Droplets, Wind, LineChart } from "lucide-react";

export default function AnalyticsPage() {
  const { history, backendStatus, esp32Status } = useTelemetry();

  // Extract numerical arrays
  const temps = history.map(h => h.temperature);
  const hums = history.map(h => h.humidity);
  const gases = history.map(h => h.gas);

  // Compute metrics
  const avgTemp = temps.length ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : "--";
  const minTemp = temps.length ? Math.min(...temps).toFixed(1) : "--";
  const maxTemp = temps.length ? Math.max(...temps).toFixed(1) : "--";

  const avgHum = hums.length ? (hums.reduce((a, b) => a + b, 0) / hums.length).toFixed(1) : "--";
  const minHum = hums.length ? Math.min(...hums).toFixed(1) : "--";
  const maxHum = hums.length ? Math.max(...hums).toFixed(1) : "--";

  const avgGas = gases.length ? (gases.reduce((a, b) => a + b, 0) / gases.length).toFixed(0) : "--";
  const minGas = gases.length ? Math.min(...gases).toString() : "--";
  const maxGas = gases.length ? Math.max(...gases).toString() : "--";

  const isConnected = backendStatus === "online" && esp32Status === "connected";

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full space-y-md">
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Telemetry Analytics</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Detailed metrics analysis, historical trends, and sensor performance summaries.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {/* Temperature Stats */}
        <GlassCard className="p-lg border border-outline-variant/20">
          <div className="flex items-center gap-sm mb-md text-primary">
            <Thermometer className="w-5 h-5 text-primary" />
            <h3 className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Temperature Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-sm text-center">
            <div>
              <p className="font-label-sm text-on-surface-variant">Min</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? `${minTemp}°C` : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Avg</p>
              <p className="font-headline-md font-bold text-primary">{isConnected ? `${avgTemp}°C` : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Max</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? `${maxTemp}°C` : "--"}</p>
            </div>
          </div>
        </GlassCard>

        {/* Humidity Stats */}
        <GlassCard className="p-lg border border-outline-variant/20">
          <div className="flex items-center gap-sm mb-md text-primary">
            <Droplets className="w-5 h-5 text-primary" />
            <h3 className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Humidity Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-sm text-center">
            <div>
              <p className="font-label-sm text-on-surface-variant">Min</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? `${minHum}%` : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Avg</p>
              <p className="font-headline-md font-bold text-primary">{isConnected ? `${avgHum}%` : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Max</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? `${maxHum}%` : "--"}</p>
            </div>
          </div>
        </GlassCard>

        {/* Gas / Air Quality Stats */}
        <GlassCard className="p-lg border border-outline-variant/20">
          <div className="flex items-center gap-sm mb-md text-primary">
            <Wind className="w-5 h-5 text-primary" />
            <h3 className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Air Quality Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-sm text-center">
            <div>
              <p className="font-label-sm text-on-surface-variant">Min</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? minGas : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Avg</p>
              <p className="font-headline-md font-bold text-primary">{isConnected ? avgGas : "--"}</p>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant">Max</p>
              <p className="font-headline-md font-bold text-on-background">{isConnected ? maxGas : "--"}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Historical Line Charts */}
      <div className="space-y-sm">
        <div className="flex items-center gap-sm text-primary mb-sm">
          <LineChart className="w-5 h-5" />
          <h3 className="font-label-sm uppercase tracking-wider font-bold">Historical Trends</h3>
        </div>
        <LiveCharts history={history} />
      </div>
    </main>
  );
}
