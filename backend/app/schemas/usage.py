from pydantic import BaseModel, ConfigDict


# =======================================
# USAGE BASE SCHEMA
# =======================================

class UsageBase(BaseModel):

    # Day usage
    day_minutes: float = 0
    day_calls: int = 0

    # Evening usage
    evening_minutes: float = 0
    evening_calls: int = 0

    # Night usage
    night_minutes: float = 0
    night_calls: int = 0

    # International usage
    intl_minutes: float = 0
    intl_calls: int = 0

    # Customer service
    customer_service_calls: int = 0


# =======================================
# CREATE USAGE
# =======================================

class UsageCreate(UsageBase):
    pass


# =======================================
# USAGE RESPONSE
# =======================================

class UsageResponse(UsageBase):

    id: int
    customer_id: int

    model_config = ConfigDict(
        from_attributes=True
    )