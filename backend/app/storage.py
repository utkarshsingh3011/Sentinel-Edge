import threading
import time
import random
import uuid
from datetime import datetime, timedelta
from typing import Dict, Optional, List
from app.models import SensorData, TelemetryResponse, Device, EventResponse

class InMemoryStorage:
    def __init__(self):
        self.latest_telemetry: Optional[TelemetryResponse] = None
        self.devices: Dict[str, Device] = {}
        self.history: List[TelemetryResponse] = []
        self.events: List[EventResponse] = []
        self.last_post_time: float = 0.0
        self.simulator_enabled: bool = True
        
        # Seed initial history and event data
        self._seed_data()
        
        # Start background simulator thread to generate live updates
        self.simulator_thread = threading.Thread(target=self._run_simulator, daemon=True)
        self.simulator_thread.start()

    def _seed_data(self):
        now = datetime.now()
        # Seed 30 past telemetry entries (2 seconds apart)
        for i in range(30, 0, -1):
            timestamp = now - timedelta(seconds=i * 2)
            # Generate realistic slow-moving random values
            temp = round(23.0 + 3.0 * random.random() + 1.5 * (1 if i % 10 > 7 else 0), 1)
            hum = round(45.0 + 10.0 * random.random(), 1)
            gas = int(120 + 40 * random.random() + (100 if i % 15 > 12 else 0))
            motion = (i % 12 == 0) # occasional motion
            rssi = -60 + random.randint(-5, 5)
            
            telemetry = TelemetryResponse(
                device="ESP32-Sentinel",
                temperature=temp,
                humidity=hum,
                gas=gas,
                motion=motion,
                timestamp=timestamp,
                rssi=rssi,
                ip_address="192.168.1.144"
            )
            self.history.append(telemetry)
        
        self.latest_telemetry = self.history[-1]
        
        # Add seed events
        start_time = now - timedelta(minutes=5)
        self.add_event("info", "Monitoring Started", start_time)
        self.add_event("success", "ESP32 Connected", start_time + timedelta(seconds=2))
        
        # Seed devices list
        self.devices["esp32_sentinel"] = Device(
            id="esp32_sentinel",
            name="ESP32-Sentinel",
            status="online",
            last_seen=now
        )

    def add_event(self, severity: str, message: str, timestamp: Optional[datetime] = None) -> EventResponse:
        event = EventResponse(
            id=str(uuid.uuid4())[:8],
            time=timestamp or datetime.now(),
            severity=severity,
            message=message
        )
        self.events.insert(0, event)
        # Cap events list at 50
        if len(self.events) > 50:
            self.events = self.events[:50]
        return event

    def _run_simulator(self):
        while True:
            try:
                time.sleep(2)
                if not self.simulator_enabled:
                    continue
                # Check if 10 seconds have passed since the last real POST
                if time.time() - self.last_post_time > 10:
                    now = datetime.now()
                    prev_telemetry = self.latest_telemetry
                    
                    # Generate new simulated reading with minor fluctuations
                    if prev_telemetry:
                        # Slight random walk
                        temp = round(prev_telemetry.temperature + random.choice([-0.2, -0.1, 0.0, 0.1, 0.2]), 1)
                        # Keep it within reasonable bounds
                        temp = max(18.0, min(36.0, temp))
                        
                        hum = round(prev_telemetry.humidity + random.choice([-0.5, 0.0, 0.5]), 1)
                        hum = max(30.0, min(80.0, hum))
                        
                        # Occasional gas spikes
                        if random.random() < 0.15:
                            gas = random.randint(210, 450) # exceed threshold
                        else:
                            gas = random.randint(110, 190)
                        
                        # Occasional motion
                        motion = random.random() < 0.20
                        rssi = prev_telemetry.rssi + random.choice([-1, 0, 1])
                        rssi = max(-90, min(-30, rssi))
                    else:
                        temp = 24.5
                        hum = 52.0
                        gas = 145
                        motion = False
                        rssi = -55

                    sim_data = SensorData(
                        device="ESP32-Sentinel",
                        temperature=temp,
                        humidity=hum,
                        gas=gas,
                        motion=motion,
                        rssi=rssi,
                        ip_address="192.168.1.144"
                    )
                    
                    # Process as telemetry
                    self._process_data(sim_data, now)
            except Exception as e:
                print(f"Error in simulator thread: {e}")

    def _process_data(self, data: SensorData, timestamp: datetime) -> TelemetryResponse:
        prev_telemetry = self.latest_telemetry
        
        telemetry = TelemetryResponse(
            device=data.device,
            temperature=data.temperature,
            humidity=data.humidity,
            gas=data.gas,
            motion=data.motion,
            timestamp=timestamp,
            rssi=data.rssi if data.rssi is not None else -55,
            ip_address=data.ip_address if data.ip_address is not None else "192.168.1.144"
        )
        
        # Append to history and enforce limit of 30
        self.history.append(telemetry)
        if len(self.history) > 30:
            self.history.pop(0)
            
        self.latest_telemetry = telemetry
        
        # Update devices status
        device_id = data.device.lower().replace(" ", "_")
        self.devices[device_id] = Device(
            id=device_id,
            name=data.device,
            status="online",
            last_seen=timestamp
        )
        
        # Detect state changes to log events
        if prev_telemetry:
            # 1. ESP32 Reconnected (if offline or simulation took over after inactivity)
            # (If the previous timestamp was more than 10 seconds ago)
            time_diff = (timestamp - prev_telemetry.timestamp).total_seconds()
            if time_diff > 10:
                self.add_event("success", "ESP32 Connected", timestamp)
            
            # 2. Motion Detection Change
            if data.motion and not prev_telemetry.motion:
                self.add_event("warning", "Motion Detected", timestamp)
            elif not data.motion and prev_telemetry.motion:
                self.add_event("info", "Motion Stopped", timestamp)
                
            # 3. Gas Threshold Change
            # Good <= 200, Warning > 200 and <= 400, Critical > 400
            if data.gas > 400 and prev_telemetry.gas <= 400:
                self.add_event("critical", f"Gas Threshold Exceeded: Dangerous levels ({data.gas})", timestamp)
            elif data.gas > 200 and prev_telemetry.gas <= 200:
                self.add_event("warning", f"Gas Threshold Exceeded: Elevated levels ({data.gas})", timestamp)
            elif data.gas <= 200 and prev_telemetry.gas > 200:
                self.add_event("success", f"Gas Levels Normal: ({data.gas})", timestamp)
                
        return telemetry

    def update_telemetry(self, data: SensorData) -> TelemetryResponse:
        self.last_post_time = time.time()
        return self._process_data(data, datetime.now())

    def get_latest_telemetry(self) -> Optional[TelemetryResponse]:
        return self.latest_telemetry

    def get_history(self) -> List[TelemetryResponse]:
        return self.history

    def get_events(self) -> List[EventResponse]:
        return self.events

    def get_devices(self) -> List[Device]:
        # Mark devices offline if they haven't sent telemetry in over 10 seconds
        now = datetime.now()
        updated_devices = []
        for dev in self.devices.values():
            status = "online"
            if (now - dev.last_seen).total_seconds() > 10:
                status = "offline"
            updated_devices.append(Device(
                id=dev.id,
                name=dev.name,
                status=status,
                last_seen=dev.last_seen
            ))
        return updated_devices

# Global storage instance
storage = InMemoryStorage()

