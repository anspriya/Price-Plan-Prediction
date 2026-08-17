from typing import Optional

from pydantic import BaseModel, ConfigDict


# =======================================
# CUSTOMER BASE SCHEMA
# =======================================

class CustomerBase(BaseModel):

    # Customer number / phone number
    phone_number: str

    # Kept for backend compatibility
    # Not required from the frontend
    customer_id: Optional[str] = None

    # Account information
    account_length: Optional[int] = None

    plan: Optional[str] = None

    # Day usage
    total_day_minutes: float = 0
    total_day_calls: int = 0

    # Evening usage
    total_evening_minutes: float = 0
    total_evening_calls: int = 0

    # Night usage
    total_night_minutes: float = 0
    total_night_calls: int = 0

    # International usage
    total_intl_minutes: float = 0
    total_intl_calls: int = 0

    # Customer service
    customer_service_calls: int = 0

    # Churn
    churn: bool = False


# =======================================
# CREATE CUSTOMER
# =======================================

class CustomerCreate(CustomerBase):
    pass


# =======================================
# CUSTOMER RESPONSE
# =======================================

class CustomerResponse(CustomerBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )
    