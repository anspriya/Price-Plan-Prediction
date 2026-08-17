from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.connection import Base


class Customer(Base):

    __tablename__ = "customers"

    # ---------------------------------------
    # Internal database ID
    # ---------------------------------------

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ---------------------------------------
    # Customer ID
    # ---------------------------------------
    # Kept internally for compatibility.
    # User-facing lookup uses phone_number.

    customer_id = Column(
        String(50),
        unique=True,
        index=True,
        nullable=True
    )

    # ---------------------------------------
    # Customer Number
    # ---------------------------------------
    # Example: 327-6764

    phone_number = Column(
        String(30),
        unique=True,
        index=True,
        nullable=False
    )

    # ---------------------------------------
    # Account Information
    # ---------------------------------------

    account_length = Column(
        Integer,
        nullable=True
    )

    plan = Column(
        String(100),
        nullable=True
    )

    # ---------------------------------------
    # Day Usage
    # ---------------------------------------

    total_day_minutes = Column(
        Float,
        default=0
    )

    total_day_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Evening Usage
    # ---------------------------------------

    total_evening_minutes = Column(
        Float,
        default=0
    )

    total_evening_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Night Usage
    # ---------------------------------------

    total_night_minutes = Column(
        Float,
        default=0
    )

    total_night_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # International Usage
    # ---------------------------------------

    total_intl_minutes = Column(
        Float,
        default=0
    )

    total_intl_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Customer Service
    # ---------------------------------------

    customer_service_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Churn
    # ---------------------------------------

    churn = Column(
        Boolean,
        default=False
    )