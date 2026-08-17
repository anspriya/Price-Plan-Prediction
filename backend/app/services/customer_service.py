from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.usage import Usage
from app.schemas.customer import CustomerCreate


# =======================================
# CREATE CUSTOMER
# =======================================

def create_customer(
    db: Session,
    customer_data: CustomerCreate
):
    """
    Create a customer using the customer number
    / phone number.
    """

    existing_customer = (
        db.query(Customer)
        .filter(
            Customer.phone_number == customer_data.phone_number
        )
        .first()
    )

    if existing_customer:
        return existing_customer

    customer = Customer(
        **customer_data.model_dump()
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


# =======================================
# GET CUSTOMER BY CUSTOMER NUMBER
# =======================================

def get_customer(
    db: Session,
    customer_number: str
):
    """
    Find customer using phone number.

    Example:
        327-6764
    """

    return (
        db.query(Customer)
        .filter(
            Customer.phone_number == customer_number
        )
        .first()
    )


# =======================================
# GET ALL CUSTOMERS
# =======================================

def get_all_customers(
    db: Session
):
    """
    Return all customers.
    """

    return db.query(Customer).all()


# =======================================
# UPDATE CUSTOMER
# =======================================

def update_customer(
    db: Session,
    customer_number: str,
    customer_data: CustomerCreate
):
    """
    Update customer using customer number.
    """

    customer = get_customer(
        db,
        customer_number
    )

    if not customer:
        return None

    data = customer_data.model_dump()

    for field, value in data.items():
        setattr(customer, field, value)

    db.commit()
    db.refresh(customer)

    return customer


# =======================================
# DELETE CUSTOMER
# =======================================

def delete_customer(
    db: Session,
    customer_number: str
):
    """
    Delete customer using customer number.
    """

    customer = get_customer(
        db,
        customer_number
    )

    if not customer:
        return None

    db.delete(customer)
    db.commit()

    return customer


# =======================================
# CREATE CUSTOMER USAGE
# =======================================

def create_customer_usage(
    db: Session,
    customer_number: str,
    usage_data
):
    """
    Create a usage record for a customer.
    """

    customer = get_customer(
        db,
        customer_number
    )

    if not customer:
        return None

    usage = Usage(
        customer_id=customer.id,
        **usage_data.model_dump()
    )

    db.add(usage)
    db.commit()
    db.refresh(usage)

    return usage


# =======================================
# GET CUSTOMER USAGE
# =======================================

def get_customer_usage(
    db: Session,
    customer_number: str
):
    """
    Calculate total usage for a customer.
    """

    customer = get_customer(
        db,
        customer_number
    )

    if not customer:
        return None

    usage = (
        db.query(
            func.coalesce(
                func.sum(Usage.day_minutes),
                0
            ).label("total_day_minutes"),

            func.coalesce(
                func.sum(Usage.day_calls),
                0
            ).label("total_day_calls"),

            func.coalesce(
                func.sum(Usage.evening_minutes),
                0
            ).label("total_evening_minutes"),

            func.coalesce(
                func.sum(Usage.evening_calls),
                0
            ).label("total_evening_calls"),

            func.coalesce(
                func.sum(Usage.night_minutes),
                0
            ).label("total_night_minutes"),

            func.coalesce(
                func.sum(Usage.night_calls),
                0
            ).label("total_night_calls"),

            func.coalesce(
                func.sum(Usage.intl_minutes),
                0
            ).label("total_intl_minutes"),

            func.coalesce(
                func.sum(Usage.intl_calls),
                0
            ).label("total_intl_calls"),

            func.coalesce(
                func.sum(Usage.customer_service_calls),
                0
            ).label("customer_service_calls")
        )
        .filter(
            Usage.customer_id == customer.id
        )
        .first()
    )

    return {
        "customer_id": customer.id,

        "total_day_minutes": float(
            usage.total_day_minutes
        ),

        "total_day_calls": int(
            usage.total_day_calls
        ),

        "total_evening_minutes": float(
            usage.total_evening_minutes
        ),

        "total_evening_calls": int(
            usage.total_evening_calls
        ),

        "total_night_minutes": float(
            usage.total_night_minutes
        ),

        "total_night_calls": int(
            usage.total_night_calls
        ),

        "total_intl_minutes": float(
            usage.total_intl_minutes
        ),

        "total_intl_calls": int(
            usage.total_intl_calls
        ),

        "customer_service_calls": int(
            usage.customer_service_calls
        )
    }