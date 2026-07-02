from fastapi import FastAPI

app = FastAPI(
    title="Sentinel Edge API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Sentinel Edge Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "online"
    }


@app.get("/api/status")
def status():
    return {
        "temperature": 24,
        "humidity": 45,
        "security": "Secure",
        "wifi": "Excellent",
        "device": "Online"
    }


@app.get("/api/events")
def events():
    return [
        {
            "event": "Motion detected",
            "time": "2 min ago"
        },
        {
            "event": "WiFi reconnected",
            "time": "8 min ago"
        },
        {
            "event": "Temperature stable",
            "time": "15 min ago"
        }
    ]