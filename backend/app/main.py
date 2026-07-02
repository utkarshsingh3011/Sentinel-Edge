from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

# Define the structure of the data we expect from the ESP32
class SensorData(BaseModel):
    device: str
    temperature: float
    motion: bool

@app.post("/api/telemetry")
async def receive_telemetry(data: SensorData):
    # Log the incoming data to the console
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Alert from {data.device}")
    print(f" -> Temp: {data.temperature}°C | Motion: {data.motion}")
    
    # Return a success response to the ESP32
    return {"status": "success", "message": "Data received by Sentinel Edge SOC"}