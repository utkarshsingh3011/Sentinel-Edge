import { telemetryData, eventsList, devicesList, summaryData, TelemetryData, TimelineEvent, Device } from "./mock-data";

const BACKEND_URL = "http://127.0.0.1:8000";

// Helper to check response or throw
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    // Add custom signal for timeout if supported, otherwise standard fetch
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
      motion: boolean;
      timestamp: string;
    }>("/api/telemetry/latest");
    
    // Map the Backend Sensor Schema back to Frontend telemetryData schema
    return {
      temperature: {
        value: data.temperature,
        unit: "C",
        description: data.temperature > 28 ? "High temperature warning" : "Comfortable indoor temperature",
        trend: data.temperature > 24 ? "up" : "down",
        trendText: data.temperature > 24 ? "Getting warmer" : "Getting cooler",
        lastUpdated: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      },
      humidity: telemetryData.humidity, // Fallback/default humidity
      security: {
        status: data.motion ? "Activity detected" : "No activity detected",
        lastMotion: data.motion ? "Just now" : telemetryData.security.lastMotion,
        state: data.motion ? "unsecure" : "secure",
        stateText: data.motion ? "Motion detected" : "Area secure",
      },
      connectivity: telemetryData.connectivity, // Fallback/default connectivity
    };
  } catch (error) {
    console.warn("Telemetry fetch failed, using fallback mock data:", error);
    return telemetryData;
  }
}

export async function fetchDevices(): Promise<Device[]> {
  try {
    const devices = await request<Array<{
      id: string;
      name: string;
      status: string;
      last_seen: string;
    }>>("/api/devices");
    
    if (devices.length === 0) {
      // If backend is online but list is empty, return empty list
      return [];
    }

    // Map Backend device schema to Frontend device schema
    return devices.map((d) => ({
      id: d.id,
      name: d.name,
      status: d.status as "online" | "offline",
      lastSeen: new Date(d.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  } catch (error) {
    console.warn("Devices fetch failed, using fallback mock data:", error);
    return devicesList;
  }
}

export async function fetchHealth(): Promise<{ status: string }> {
  return request<{ status: string }>("/health");
}

// Keep mock fetching for logs & summary since they are frontend only
export async function fetchEvents(): Promise<TimelineEvent[]> {
  return eventsList;
}

export async function fetchSummary(): Promise<string[]> {
  return summaryData;
}
