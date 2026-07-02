import { telemetryData, eventsList, devicesList, summaryData, TelemetryData, TimelineEvent, Device } from "./mock-data";

// Helper to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTelemetry(): Promise<TelemetryData> {
  await delay(800); // 800ms artificial delay
  return telemetryData;
}

export async function fetchEvents(): Promise<TimelineEvent[]> {
  await delay(1200); // 1.2s artificial delay
  return eventsList;
}

export async function fetchDevices(): Promise<Device[]> {
  await delay(1000); // 1s artificial delay
  return devicesList;
}

export async function fetchSummary(): Promise<string[]> {
  await delay(600);
  return summaryData;
}
