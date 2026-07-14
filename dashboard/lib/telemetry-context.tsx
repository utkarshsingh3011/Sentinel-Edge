"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  fetchRawTelemetry,
  fetchRawHistory,
  fetchRawEvents,
  fetchHealth,
  RawTelemetry,
  RawEvent
} from "./api";

interface TelemetryContextType {
  backendStatus: "online" | "offline";
  esp32Status: "connected" | "disconnected";
  latestTelemetry: RawTelemetry | null;
  history: RawTelemetry[];
  events: RawEvent[];
  lastUpdated: string;
  loading: boolean;
  refreshInterval: number; // in milliseconds
  setRefreshInterval: (ms: number) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [backendStatus, setBackendStatus] = useState<"online" | "offline">("offline");
  const [esp32Status, setEsp32Status] = useState<"connected" | "disconnected">("disconnected");
  const [latestTelemetry, setLatestTelemetry] = useState<RawTelemetry | null>(null);
  const [history, setHistory] = useState<RawTelemetry[]>([]);
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("Never");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(2000); // Default 2 seconds

  useEffect(() => {
    let isMounted = true;
    let timerId: NodeJS.Timeout;

    async function pollData() {
      try {
        // 1. Check backend health
        const health = await fetchHealth();
        if (!isMounted) return;
        
        if (health.status === "online") {
          setBackendStatus("online");
          
          // 2. Fetch latest telemetry, history, and events in parallel
          const [telemetry, hist, evs] = await Promise.all([
            fetchRawTelemetry().catch(() => null),
            fetchRawHistory().catch(() => [] as RawTelemetry[]),
            fetchRawEvents().catch(() => [] as RawEvent[])
          ]);

          if (!isMounted) return;

          if (telemetry) {
            setLatestTelemetry(telemetry);
            
            // Format current time as Last Updated
            const now = new Date();
            setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

            // Check if ESP32 is active (telemetry received in last 10 seconds)
            const telemetryTime = new Date(telemetry.timestamp);
            const timeDiff = Math.abs(now.getTime() - telemetryTime.getTime()) / 1000;
            
            if (timeDiff < 15) {
              setEsp32Status("connected");
            } else {
              setEsp32Status("disconnected");
            }
          } else {
            setEsp32Status("disconnected");
          }

          setHistory(hist);
          setEvents(evs);
        } else {
          setBackendStatus("offline");
          setEsp32Status("disconnected");
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus("offline");
          setEsp32Status("disconnected");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // Run first fetch immediately
    pollData();

    // Start interval
    timerId = setInterval(pollData, refreshInterval);

    return () => {
      isMounted = false;
      clearInterval(timerId);
    };
  }, [refreshInterval]);

  return (
    <TelemetryContext.Provider
      value={{
        backendStatus,
        esp32Status,
        latestTelemetry,
        history,
        events,
        lastUpdated,
        loading,
        refreshInterval,
        setRefreshInterval
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return context;
}
