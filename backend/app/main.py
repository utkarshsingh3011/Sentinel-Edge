from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="Sentinel Edge Backend",
    description="Production-ready API for Sentinel Edge monitoring",
    version="1.0.0"
)

# Enable CORS for frontend running on localhost:3000
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes with /api prefix
app.include_router(router, prefix="/api")