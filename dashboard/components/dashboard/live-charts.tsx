"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { RawTelemetry } from "@/lib/api";

interface LiveChartsProps {
  history: RawTelemetry[];
}

const CustomTooltip = ({ active, payload, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high border border-outline-variant/60 p-sm rounded-lg backdrop-blur-md text-label-sm shadow-lg">
        <p className="text-on-surface-variant font-mono mb-1">{payload[0].payload.time}</p>
        <p className="font-bold text-primary text-body-md">
          {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

export function LiveCharts({ history }: LiveChartsProps) {
  // Format history for Recharts
  const chartData = history.map((item) => {
    const date = new Date(item.timestamp);
    return {
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      temp: item.temperature,
      humidity: item.humidity,
      gas: item.gas,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
      
      {/* Temperature Chart */}
      <GlassCard className="p-lg border border-outline-variant/20 flex flex-col justify-between min-h-[300px]">
        <div className="mb-md">
          <h3 className="font-headline-md text-headline-md font-bold text-on-background">Temperature History</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Last 30 readings (°C)</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -25, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424754" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                interval={Math.ceil(chartData.length / 5)}
              />
              <YAxis 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip unit="°C" />} cursor={{ stroke: 'rgba(173,198,255,0.1)', strokeWidth: 1 }} />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#60a5fa" 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#60a5fa' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Humidity Chart */}
      <GlassCard className="p-lg border border-outline-variant/20 flex flex-col justify-between min-h-[300px]">
        <div className="mb-md">
          <h3 className="font-headline-md text-headline-md font-bold text-on-background">Humidity History</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Last 30 readings (%)</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -25, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424754" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                interval={Math.ceil(chartData.length / 5)}
              />
              <YAxis 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip unit="%" />} cursor={{ stroke: 'rgba(173,198,255,0.1)', strokeWidth: 1 }} />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#adc6ff" 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#adc6ff' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Gas Chart */}
      <GlassCard className="p-lg border border-outline-variant/20 flex flex-col justify-between min-h-[300px]">
        <div className="mb-md">
          <h3 className="font-headline-md text-headline-md font-bold text-on-background">Gas History</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Last 30 readings (MQ2 value)</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424754" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                interval={Math.ceil(chartData.length / 5)}
              />
              <YAxis 
                stroke="#8c909f" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip unit="" />} cursor={{ stroke: 'rgba(173,198,255,0.1)', strokeWidth: 1 }} />
              <Line 
                type="monotone" 
                dataKey="gas" 
                stroke="#34d399" 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#34d399' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
