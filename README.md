# Sentinel Edge

An IoT edge monitoring system that I built to understand how hardware and software communicate in a real-world application.

Instead of displaying simulated values, Sentinel Edge reads live environmental data from an ESP32 connected to multiple sensors, sends it to a FastAPI backend, and visualizes everything through a modern dashboard built with Next.js.

It started as an experiment with sensors and gradually evolved into a complete full-stack IoT project.

---

## What it does

Sentinel Edge continuously monitors:

- 🌡️ Temperature
- 💧 Humidity
- 🌫️ Air Quality (MQ2)
- 🚶 Motion Detection
- 📶 Device Connectivity

The ESP32 sends telemetry over Wi-Fi to the backend, and the dashboard updates automatically to reflect the latest sensor readings.

---

## Built With

**Hardware**

- ESP32 DevKit V1
- DHT11
- MQ2 Gas Sensor
- PIR Motion Sensor
- Active Buzzer

**Software**

- Next.js
- TypeScript
- Tailwind CSS
- FastAPI
- Python
- Recharts

---

## Project Preview

### Dashboard


![Dashboard](assets/dashboard.jpg)



### Hardware Setup


![Hardware](assets/hardware-setup.jpg)

---

## How it works

```text
ESP32
   │
Reads sensor data
   │
   ▼
FastAPI Backend
   │
Stores latest telemetry
   │
   ▼
Next.js Dashboard
   │
Displays live monitoring
```

---

## Why I built this

As an Electronics & Communication Engineering student, I wanted to move beyond individual Arduino experiments and build something that felt closer to a real IoT product.

This project helped me understand how embedded systems, backend APIs, and modern frontend applications work together to create a complete monitoring solution.

---

## Running locally

Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Dashboard

```bash
cd dashboard
npm install
npm run dev
```

---

Thanks for stopping by!

If you have suggestions or ideas to improve the project, feel free to open an issue or reach out.
