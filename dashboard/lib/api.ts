import {
  telemetryData,
  eventsList,
  devicesList,
  summaryData,
  TelemetryData,
  TimelineEvent,
  Device,
} from "./mock-data";

const BACKEND_URL = "http://127.0.0.1:8000";

// Helper to check response or throw
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    signal: AbortSignal.timeout(3000),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchTelemetry(): Promise<TelemetryData> {
  try {
    const data = await request<{
      device: string;
      temperature: number;
      humidity: number;
      gas: number;
      motion: boolean;
      timestamp: string;
    }>("/telemetry/latest");

    return {
      temperature: {
        value: data.temperature,
        unit: "°C",
        description:
          data.temperature > 28
            ? "High temperature warning"
            : "Comfortable indoor temperature",
        trend: data.temperature > 24 ? "up" : "down",
        trendText:
          data.temperature > 24
            ? "Getting warmer"
            : "Getting cooler",
        lastUpdated: new Date(data.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      },

      humidity: {
        value: data.humidity,
        unit: "%",
        description:
          data.humidity > 70
            ? "High humidity"
            : "Normal humidity",

        status:
          data.humidity > 70
            ? "unstable"
            : "stable",

        statusText:
          data.humidity > 70
            ? "Humidity is high"
            : "Stable environment",

        lastUpdated: new Date(data.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      },

      security: {
        status: data.motion
          ? "Activity detected"
          : "No activity detected",

        lastMotion: data.motion
          ? "Just now"
          : "No movement",

        state: data.motion
          ? "unsecure"
          : "secure",

        stateText: data.motion
          ? "Motion detected"
          : "Area secure",
      },

      connectivity: {
        status: "Excellent",

        signalStrength: "-45 dBm",

        state: "connected",

        stateText: "Connected",

        quality: 100,
      },
    } catch (error) {
      console.warn(
        "Telemetry fetch failed, using fallback mock data:",
        error
      );
      return telemetryData;
    }
  }

export async function fetchDevices(): Promise<Device[]> {
    try {
      const devices = await request<
        Array<{
          id: string;
          name: string;
          status: string;
          last_seen: string;
        }>
      >("/devices");

      if (devices.length === 0) {
        return [];
      }

      return devices.map((d) => ({
        id: d.id,
        name: d.name,
        status: d.status as "online" | "offline",
        lastSeen: new Date(d.last_seen).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    } catch (error) {
      console.warn(
        "Devices fetch failed, using fallback mock data:",
        error
      );
      return devicesList;
    }
  }

  export async function fetchHealth(): Promise<{ status: string }> {
    return request<{ status: string }>("/health");
  }

  export async function fetchEvents(): Promise<TimelineEvent[]> {
    return eventsList;
  }

  export async function fetchSummary(): Promise<string[]> {
    return summaryData;
  }