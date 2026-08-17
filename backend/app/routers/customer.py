from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

from app.schemas.usage import (
    UsageCreate,
    UsageResponse
)

from app.services import customer_service


# =======================================
# CUSTOMER ROUTER
# =======================================

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


# =======================================
# CREATE CUSTOMER
# =======================================

@router.post(
    "/",
    response_model=CustomerResponse
)
def create_customer(
    customer_data: CustomerCreate,
    db: Session = Depends(get_db)
):

    return customer_service.create_customer(
        db,
        customer_data
    )


# =======================================
# GET ALL CUSTOMERS
# =======================================

@router.get(
    "/",
    response_model=list[CustomerResponse]
)
def get_customers(
    db: Session = Depends(get_db)
):

    return customer_service.get_all_customers(
        db
    )


# =======================================
# CREATE CUSTOMER USAGE
# =======================================

@router.post(
    "/{customer_number}/usage",
    response_model=UsageResponse
)
def create_customer_usage(
    customer_number: str,
    usage_data: UsageCreate,
    db: Session = Depends(get_db)
):

    usage = customer_service.create_customer_usage(
        db,
        customer_number,
        usage_data
    )

    if usage is None:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return usage


# =======================================
# GET CUSTOMER USAGE
# =======================================

@router.get(
    "/{customer_number}/usage"
)
def get_customer_usage(
    customer_number: str,
    db: Session = Depends(get_db)
):

    usage = customer_service.get_customer_usage(
        db,
        customer_number
    )

    if usage is None:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return usage


# =======================================
# GET ONE CUSTOMER
# =======================================

@router.get(
    "/{customer_number}",
    response_model=CustomerResponse
)
def get_customer(
    customer_number: str,
    db: Session = Depends(get_db)
):

    customer = customer_service.get_customer(
        db,
        customer_number
    )

    if customer is None:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


# =======================================
# UPDATE CUSTOMER
# =======================================

@router.put(
    "/{customer_number}",
    response_model=CustomerResponse
)
def update_customer(
    customer_number: str,
    customer_data: CustomerCreate,
    db: Session = Depends(get_db)
):

    customer = customer_service.update_customer(
        db,
        customer_number,
        customer_data
    )

    if customer is None:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


# =======================================
# DELETE CUSTOMER
# =======================================

@router.delete(
    "/{customer_number}"
)
def delete_customer(
    customer_number: str,
    db: Session = Depends(get_db)
):

    customer = customer_service.delete_customer(
        db,
        customer_number
    )

    if customer is None:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer deleted successfully",
        "customer_number": customer_number
    }