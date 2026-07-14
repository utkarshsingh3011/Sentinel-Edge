from datetime import datetime
from typing import Dict, Optional, List
from app.models import SensorData, TelemetryResponse, Device

class InMemoryStorage:
    def __init__(self):
        self.latest_telemetry: Optional[TelemetryResponse] = None
        self.devices: Dict[str, Device] = {}

    def update_telemetry(self, data: SensorData) -> TelemetryResponse:
        now = datetime.now()
        
        # 1. Update latest telemetry
        telemetry = TelemetryResponse(
    device=data.device,
    temperature=data.temperature,
    humidity=data.humidity,
    gas=data.gas,
    motion=data.motion,
    timestamp=now
)
        self.latest_telemetry = telemetry

        # 2. Update or insert device status
        device_id = data.device.lower().replace(" ", "_")
        self.devices[device_id] = Device(
            id=device_id,
            name=data.device,
            status="online",
            last_seen=now
        )
        
        return telemetry

    def get_latest_telemetry(self) -> Optional[TelemetryResponse]:
        return self.latest_telemetry

    def get_devices(self) -> List[Device]:
        return list(self.devices.values())

# Global storage instance
storage = InMemoryStorage()
