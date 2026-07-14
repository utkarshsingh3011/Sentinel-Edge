"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import {
  fetchRawTelemetry,
  fetchRawHistory,
  fetchRawEvents,
  fetchHealth,
  fetchSimulatorStatus,
  toggleSimulator,
  RawTelemetry,
  RawEvent
} from "./api";

export interface ToastMessage {
  id: string;
  message: string;
  type: "warning" | "critical" | "info" | "success";
}

interface TelemetryContextType {
  backendStatus: "online" | "offline";
  esp32Status: "online" | "offline";
  latestTelemetry: RawTelemetry | null;
  history: RawTelemetry[];
  events: RawEvent[];
  lastUpdated: string;
  loading: boolean;
  refreshInterval: number; // in milliseconds
  setRefreshInterval: (ms: number) => void;
  simulatorEnabled: boolean;
  toggleSimulatorEnabled: (enabled: boolean) => Promise<void>;
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

// Generate unique toast IDs safely outside component render cycles
let toastCounter = 0;
const generateToastId = (): string => {
  toastCounter += 1;
  return `toast-${toastCounter}-${Date.now()}`;
};

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [backendStatus, setBackendStatus] = useState<"online" | "offline">("offline");
  const [esp32Status, setEsp32Status] = useState<"online" | "offline">("offline");
  const [latestTelemetry, setLatestTelemetry] = useState<RawTelemetry | null>(null);
  const [history, setHistory] = useState<RawTelemetry[]>([]);
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("Never");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(2000); // Default 2 seconds
  const [simulatorEnabled, setSimulatorEnabled] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Refs to track previous status for toast transitions
  const prevBackendStatusRef = useRef<"online" | "offline" | null>(null);
  const prevEsp32StatusRef = useRef<"online" | "offline" | null>(null);
  const prevMotionRef = useRef<boolean | null>(null);
  const prevGasWarningRef = useRef<boolean | null>(null);

  // Sync ref with toasts state to prevent duplicate checks from modifying useEffect dependency arrays
  const activeToastsRef = useRef<ToastMessage[]>([]);
  useEffect(() => {
    activeToastsRef.current = toasts;
  }, [toasts]);

  // Toast management utilities
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastMessage["type"]) => {
    // 1. Prevent duplicate notifications
    const currentToasts = activeToastsRef.current;
    if (currentToasts.some((t) => t.message === message)) {
      return;
    }

    const id = generateToastId();

    setToasts((prev) => {
      const nextToasts = [...prev, { id, message, type }];
      // 2. Maximum visible notifications = 3
      if (nextToasts.length > 3) {
        return nextToasts.slice(nextToasts.length - 3);
      }
      return nextToasts;
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  // Toggle simulator utility
  const toggleSimulatorEnabled = async (enabled: boolean) => {
    try {
      const res = await toggleSimulator(enabled);
      setSimulatorEnabled(res.simulator_enabled);
    } catch (e) {
      console.error("Failed to toggle simulator", e);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function pollData() {
      const now = new Date();
      try {
        // 1. Check backend health and simulator status
        const [health, simStatus] = await Promise.all([
          fetchHealth(),
          fetchSimulatorStatus().catch(() => ({ simulator_enabled: true }))
        ]);

        if (!isMounted) return;
        
        const nextBackendStatus = health.status === "online" ? "online" : "offline";

        // Detect backend disconnected/reconnected
        if (prevBackendStatusRef.current !== null && prevBackendStatusRef.current !== nextBackendStatus) {
          if (nextBackendStatus === "online") {
            addToast("🟢 Backend reconnected", "success");
          } else {
            addToast("🔴 Backend disconnected", "critical");
          }
        }
        prevBackendStatusRef.current = nextBackendStatus;
        setBackendStatus(nextBackendStatus);

        if (health.status === "online") {
          setSimulatorEnabled(simStatus.simulator_enabled);
          
          // 2. Fetch latest telemetry, history, and events in parallel
          const [telemetry, hist, evs] = await Promise.all([
            fetchRawTelemetry().catch(() => null),
            fetchRawHistory().catch(() => [] as RawTelemetry[]),
            fetchRawEvents().catch(() => [] as RawEvent[])
          ]);

          if (!isMounted) return;

          let nextEsp32Status: "online" | "offline" = "offline";

          if (telemetry) {
            setLatestTelemetry(telemetry);
            
            // Format current time as Last Updated
            setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

            // Heartbeat: Check if telemetry was received in the last 10 seconds
            const telemetryTime = new Date(telemetry.timestamp);
            const timeDiff = Math.abs(now.getTime() - telemetryTime.getTime()) / 1000;
            
            const isDeviceConnected = timeDiff <= 10;
            nextEsp32Status = isDeviceConnected ? "online" : "offline";
            setEsp32Status(nextEsp32Status);

            // Charts and history should update only when online to prevent gaps
            if (isDeviceConnected) {
              setHistory(hist);
            }

            // Transitions checks for Motion and Gas warning states (only when device is connected)
            if (isDeviceConnected) {
              // A. Motion detected/ended transitions
              const nextMotion = telemetry.motion;
              if (prevMotionRef.current !== null && prevMotionRef.current !== nextMotion) {
                if (nextMotion) {
                  addToast("🚨 Motion detected", "critical");
                } else {
                  addToast("ℹ️ Motion ended", "info");
                }
              }
              prevMotionRef.current = nextMotion;

              // B. Dangerous gas / returned to normal warning transitions
              const nextGasWarning = telemetry.gas > 250;
              if (prevGasWarningRef.current !== null && prevGasWarningRef.current !== nextGasWarning) {
                if (nextGasWarning) {
                  if (telemetry.gas > 400) {
                    addToast(`🚨 Dangerous gas detected (${telemetry.gas})`, "critical");
                  } else {
                    addToast(`⚠️ Gas level elevated (${telemetry.gas})`, "warning");
                  }
                } else {
                  addToast("🟢 Gas level returned to normal", "success");
                }
              }
              prevGasWarningRef.current = nextGasWarning;
            } else {
              prevMotionRef.current = null;
              prevGasWarningRef.current = null;
            }
          } else {
            setEsp32Status("offline");
            nextEsp32Status = "offline";
            prevMotionRef.current = null;
            prevGasWarningRef.current = null;
          }

          // Detect ESP32 disconnected/reconnected
          if (prevEsp32StatusRef.current !== null && prevEsp32StatusRef.current !== nextEsp32Status) {
            if (nextEsp32Status === "online") {
              addToast("🟢 ESP32 reconnected", "success");
            } else {
              addToast("🔴 ESP32 disconnected", "critical");
            }
          }
          prevEsp32StatusRef.current = nextEsp32Status;

          setEvents(evs);
        } else {
          setEsp32Status("offline");
          
          // Detect ESP32 disconnected
          const nextEsp32Status = "offline";
          if (prevEsp32StatusRef.current !== null && prevEsp32StatusRef.current !== nextEsp32Status) {
            if (prevEsp32StatusRef.current === "online") {
              addToast("🔴 ESP32 disconnected", "critical");
            }
          }
          prevEsp32StatusRef.current = nextEsp32Status;

          prevMotionRef.current = null;
          prevGasWarningRef.current = null;
        }
      } catch {
        if (isMounted) {
          const nextBackendStatus = "offline";
          if (prevBackendStatusRef.current !== null && prevBackendStatusRef.current !== nextBackendStatus) {
            if (prevBackendStatusRef.current === "online") {
              addToast("🔴 Backend disconnected", "critical");
            }
          }
          prevBackendStatusRef.current = nextBackendStatus;
          setBackendStatus("offline");

          const nextEsp32Status = "offline";
          if (prevEsp32StatusRef.current !== null && prevEsp32StatusRef.current !== nextEsp32Status) {
            if (prevEsp32StatusRef.current === "online") {
              addToast("🔴 ESP32 disconnected", "critical");
            }
          }
          prevEsp32StatusRef.current = nextEsp32Status;
          setEsp32Status("offline");

          prevMotionRef.current = null;
          prevGasWarningRef.current = null;
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
    const timerId = setInterval(pollData, refreshInterval);

    return () => {
      isMounted = false;
      clearInterval(timerId);
    };
  }, [refreshInterval, addToast]);

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
        setRefreshInterval,
        simulatorEnabled,
        toggleSimulatorEnabled,
        toasts,
        addToast,
        removeToast
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
