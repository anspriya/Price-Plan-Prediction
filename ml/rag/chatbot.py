import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from .recommendation_loader import (
    get_customer_recommendations
)

from .retriever import (
    retrieve_recommended_plans
)

from .prompts import (
    build_recommendation_prompt
)


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in .env")

# ============================================================
# GEMINI
# ============================================================

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=GROQ_API_KEY,
    temperature=0
)


# ============================================================
# CHATBOT
# ============================================================

def generate_recommendation_explanation(
    phone_number
):

    # --------------------------------------------------------
    # 1. Get ACTUAL recommendations
    # --------------------------------------------------------

    recommendation_data = (
        get_customer_recommendations(
            phone_number
        )
    )

    if recommendation_data is None:

        return (
            "Sorry, I could not find "
            "recommendations for this customer."
        )


    # --------------------------------------------------------
    # 2. Extract ACTUAL plan IDs
    # --------------------------------------------------------

    plan_ids = [
        recommendation["plan_id"]
        for recommendation
        in recommendation_data[
            "recommendations"
        ]
    ]


    # --------------------------------------------------------
    # 3. Retrieve exact plans from RAG
    # --------------------------------------------------------

    documents = (
        retrieve_recommended_plans(
            plan_ids
        )
    )


    # --------------------------------------------------------
    # 4. Build RAG context
    # --------------------------------------------------------

    retrieved_context = "\n\n".join(
        document.page_content
        for document in documents
    )


    # --------------------------------------------------------
    # 5. Build prompt
    # --------------------------------------------------------

    prompt = build_recommendation_prompt(
        recommendation_data,
        retrieved_context
    )


    # --------------------------------------------------------
    # 6. Gemini
    # --------------------------------------------------------

    response = llm.invoke(prompt)

    content = response.content

    # Gemini may return content as a list of dictionaries
    if isinstance(content, list):

        text_parts = []

        for item in content:

            if (
                isinstance(item, dict)
                and item.get("type") == "text"
            ):
                text_parts.append(
                    item.get("text", "")
                )

        content = "\n".join(text_parts)

    return content

# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    phone_number = input(
        "Enter customer phone number: "
    ).strip()

    print(
        "\n========================================"
    )

    print(
        "CHATBOT RESPONSE"
    )

    print(
        "========================================\n"
    )

    response = (
        generate_recommendation_explanation(
            phone_number
        )
    )

    print(response)