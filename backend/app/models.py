from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class SensorData(BaseModel):
    device: str
    temperature: float
    humidity: float
    gas: int
    motion: bool
    rssi: Optional[int] = None
    ip_address: Optional[str] = None

class TelemetryResponse(BaseModel):
    device: str
    temperature: float
    humidity: float
    gas: int
    motion: bool
    timestamp: datetime
    rssi: int
    ip_address: str

class Device(BaseModel):
    id: str
    name: str
    status: str  # e.g., "online", "offline"
    last_seen: datetime

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

class EventResponse(BaseModel):
    id: str
    time: datetime
    severity: str  # "info", "warning", "critical", "success"
    message: str
