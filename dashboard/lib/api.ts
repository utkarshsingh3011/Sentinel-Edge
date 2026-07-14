export interface RawTelemetry {
  device: string;
  temperature: number;
  humidity: number;
  gas: number;
  motion: boolean;
  timestamp: string;
  rssi: number;
  ip_address: string;
}

export interface RawEvent {
  id: string;
  time: string;
  severity: "info" | "warning" | "critical" | "success";
  message: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

const getBackendUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  if (typeof window !== "undefined") {
    // Dynamically fallback to current host's port 8000 on client side
    const hostname = window.location.hostname;
    return `http://${hostname}:8000`;
  }
  return "http://127.0.0.1:8000";
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${getBackendUrl()}${path}`;
  const res = await fetch(url, {
    ...options,
    // Add brief timeout to fail fast on disconnects
    signal: AbortSignal.timeout(1500),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchRawTelemetry(): Promise<RawTelemetry> {
  return request<RawTelemetry>("/telemetry/latest");
}

export async function fetchRawHistory(): Promise<RawTelemetry[]> {
  return request<RawTelemetry[]>("/telemetry/history");
}

export async function fetchRawEvents(): Promise<RawEvent[]> {
  return request<RawEvent[]>("/events");
}

export async function fetchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}

export async function fetchSimulatorStatus(): Promise<{ simulator_enabled: boolean }> {
  return request<{ simulator_enabled: boolean }>("/simulator/status");
}

export async function toggleSimulator(enabled: boolean): Promise<{ simulator_enabled: boolean }> {
  return request<{ simulator_enabled: boolean }>(`/simulator/toggle?enabled=${enabled}`, {
    method: "POST",
  });
}