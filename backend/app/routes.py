from datetime import datetime
from typing import List
from fastapi import APIRouter, HTTPException

from app.models import SensorData, TelemetryResponse, Device, HealthResponse
from app.storage import storage

router = APIRouter()

@router.post("/telemetry")
async def receive_telemetry(data: SensorData):
    # Update telemetry in memory storage
    storage.update_telemetry(data)
    
    # Log the incoming data to the console as the original code did
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Alert from {data.device}")
    print(
    f"Temp:{data.temperature}°C | "
    f"Humidity:{data.humidity}% | "
    f"Gas:{data.gas} | "
    f"Motion:{data.motion}"
)
    
    # Return success response to the ESP32
    return {"status": "success", "message": "Data received by Sentinel Edge SOC"}

@router.get("/telemetry/latest", response_model=TelemetryResponse)
async def get_latest_telemetry():
    telemetry = storage.get_latest_telemetry()
    if not telemetry:
        raise HTTPException(status_code=404, detail="No telemetry data available yet")
    return telemetry

@router.get("/devices", response_model=List[Device])
async def get_devices():
    return storage.get_devices()

@router.get("/health", response_model=HealthResponse)
async def get_health():
    return HealthResponse(
        status="online",
        service="Sentinel Edge Backend",
        timestamp=datetime.now().isoformat()
    )
