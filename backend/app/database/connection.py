from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base


# =======================================
# DATABASE URL
# =======================================

DATABASE_URL = "sqlite:///./price_plan.db"


# =======================================
# DATABASE ENGINE
# =======================================

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)


# =======================================
# SQLAlchemy Base
# =======================================

Base = declarative_base()