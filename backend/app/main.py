import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="Sentinel Edge API",
    version="1.0.0"
)

# Enable CORS for specified origins (comma separated) or default to "*"
origins_raw = os.getenv("CORS_ALLOWED_ORIGINS", "*")
origins = [origin.strip() for origin in origins_raw.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)