from fastapi import FastAPI
from pydantic import BaseModel

from .recommendation_loader import (
    get_customer_recommendations
)

from .chatbot import (
    generate_recommendation_explanation
)


app = FastAPI(
    title="Price Plan Recommendation API"
)


# ============================================================
# REQUEST MODEL
# ============================================================

class RecommendationRequest(BaseModel):

    phone_number: str


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Price Plan Recommendation API is running"
    }


# ============================================================
# GET RECOMMENDATIONS
# ============================================================

@app.post("/recommendation")
def get_recommendation(
    request: RecommendationRequest
):

    result = get_customer_recommendations(
        request.phone_number
    )

    if result is None:

        return {
            "error": "Customer not found"
        }

    return result


# ============================================================
# ASK WHY
# ============================================================

@app.post("/recommendation/explain")
def explain_recommendation(
    request: RecommendationRequest
):

    explanation = (
        generate_recommendation_explanation(
            request.phone_number
        )
    )

    return {
        "phone_number": request.phone_number,
        "explanation": explanation
    }