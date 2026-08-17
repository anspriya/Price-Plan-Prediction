from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Usage(Base):

    __tablename__ = "usage"

    # ---------------------------------------
    # Internal Usage ID
    # ---------------------------------------

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ---------------------------------------
    # Customer Relationship
    # ---------------------------------------

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False,
        index=True
    )

    # ---------------------------------------
    # Day Usage
    # ---------------------------------------

    day_minutes = Column(
        Float,
        default=0
    )

    day_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Evening Usage
    # ---------------------------------------

    evening_minutes = Column(
        Float,
        default=0
    )

    evening_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Night Usage
    # ---------------------------------------

    night_minutes = Column(
        Float,
        default=0
    )

    night_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # International Usage
    # ---------------------------------------

    intl_minutes = Column(
        Float,
        default=0
    )

    intl_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Customer Service Calls
    # ---------------------------------------

    customer_service_calls = Column(
        Integer,
        default=0
    )

    # ---------------------------------------
    # Customer Relationship
    # ---------------------------------------

    customer = relationship(
        "Customer",
        backref="usage_records"
    )