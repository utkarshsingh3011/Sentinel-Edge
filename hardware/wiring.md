# Hardware Wiring Guide

This document explains the hardware connections used in the Sentinel Edge IoT Monitoring System.

---

## Components

| Component | Purpose |
|-----------|---------|
| ESP32 DevKit V1 | Main microcontroller |
| DHT11 | Temperature & Humidity Sensor |
| MQ2 | Gas / Smoke Sensor |
| PIR HC-SR501 | Motion Detection |
| Active Buzzer | Audible Alert |
| LED + 220Ω Resistor | Status Indicator |
| Breadboard | Prototyping |
| Jumper Wires | Connections |

---

# Pin Connections

## DHT11

| DHT11 | ESP32 |
|--------|-------|
| VCC | 3.3V |
| GND | GND |
| DATA | GPIO 4 |

---

## MQ2 Gas Sensor

| MQ2 | ESP32 |
|------|-------|
| VCC | 5V |
| GND | GND |
| AO | GPIO 34 |

> Only the Analog Output (AO) is used in this project.

---

## PIR Motion Sensor

| PIR | ESP32 |
|------|-------|
| VCC | 5V |
| GND | GND |
| OUT | GPIO 27 |

---

## Active Buzzer

| Buzzer | ESP32 |
|---------|-------|
| + | GPIO 26 |
| - | GND |

---

## Status LED

| LED | ESP32 |
|------|-------|
| Anode (+) | GPIO 2 (through 220Ω resistor) |
| Cathode (-) | GND |

---

# Power Connections

- ESP32 powered through USB.
- Sensors share common GND.
- DHT11 operates at 3.3V.
- MQ2 and PIR operate at 5V supplied from the ESP32 VIN pin.

---

# Communication Flow

```
ESP32
│
├── Reads DHT11
├── Reads MQ2
├── Reads PIR
│
└── Sends JSON via Wi-Fi
          │
          ▼
 FastAPI Backend
          │
          ▼
 Next.js Dashboard
```

---

# Notes

- Ensure all components share a common ground.
- Verify GPIO numbers before uploading firmware.
- The MQ2 sensor requires a short warm-up period before readings stabilize.
- The PIR sensor may require 20–30 seconds to calibrate after power-on.
- Use a stable 5V USB power source for reliable operation.

---

# Hardware Preview

![Hardware Setup](../assets/hardware-setup.jpg)
