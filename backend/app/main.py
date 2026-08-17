from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine

from app.models.customer import Customer
from app.models.usage import Usage

from app.routers.customer import router as customer_router


app = FastAPI(
    title="Price Plan Prediction API",
    description="Customer and usage management API",
    version="1.0.0"
)


# ---------------------------------------
# CORS
# ---------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------
# Database Tables
# ---------------------------------------

Base.metadata.create_all(bind=engine)


# ---------------------------------------
# Customer Routes
# ---------------------------------------

app.include_router(customer_router)


# ---------------------------------------
# Root
# ---------------------------------------

@app.get("/")
def root():
    return {
        "message": "Price Plan Recommendation API is running"
    }


# ---------------------------------------
# Health
# ---------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }