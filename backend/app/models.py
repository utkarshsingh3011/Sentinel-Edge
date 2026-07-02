from datetime import datetime
from pydantic import BaseModel

class SensorData(BaseModel):
    device: str
    temperature: float
    motion: bool

class TelemetryResponse(BaseModel):
    device: str
    temperature: float
    motion: bool
    timestamp: datetime

class Device(BaseModel):
    id: str
    name: str
    status: str  # e.g., "online", "offline"
    last_seen: datetime

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
