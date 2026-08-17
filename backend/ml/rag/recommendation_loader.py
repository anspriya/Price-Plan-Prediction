import os
import pandas as pd


# ============================================================
# PATH
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

RECOMMENDATION_FILE = os.path.join(
    BASE_DIR,
    "data",
    "customer_recommendation.csv"
)


# ============================================================
# LOAD RECOMMENDATION DATA
# ============================================================

def load_recommendations():

    if not os.path.exists(RECOMMENDATION_FILE):
        raise FileNotFoundError(
            f"Recommendation file not found:\n"
            f"{RECOMMENDATION_FILE}"
        )

    return pd.read_csv(RECOMMENDATION_FILE)


# ============================================================
# GET RECOMMENDATIONS FOR ONE CUSTOMER
# ============================================================

def get_customer_recommendations(phone_number):

    recommendations_df = load_recommendations()

    # Convert phone numbers to strings
    recommendations_df["Phone Number"] = (
        recommendations_df["Phone Number"]
        .astype(str)
        .str.strip()
    )

    phone_number = str(phone_number).strip()

    # Find customer
    customer = recommendations_df[
        recommendations_df["Phone Number"] == phone_number
    ]

    if customer.empty:
        return None

    row = customer.iloc[0]

    recommendations = []

    # --------------------------------------------------------
    # Automatically read Rank 1, Rank 2 and Rank 3
    # --------------------------------------------------------

    for rank in range(1, 4):

        plan_id_column = f"Plan_{rank}_ID"

        if plan_id_column not in recommendations_df.columns:
            continue

        plan_id = row[plan_id_column]

        if pd.isna(plan_id):
            continue

        recommendation = {
            "rank": rank,

            "plan_id": str(plan_id),

            "plan_name": str(
                row[f"Recommended_Plan_{rank}"]
            ),

            "score": float(
                row[f"Plan_{rank}_Score"]
            ),

            "coverage": float(
                row[f"Plan_{rank}_Coverage"]
            ),

            "utilization": float(
                row[f"Plan_{rank}_Utilization"]
            ),

            "price_score": float(
                row[f"Plan_{rank}_Price_Score"]
            ),

            "cluster_score": float(
                row[f"Plan_{rank}_Cluster_Score"]
            ),

            "overage_penalty": float(
                row[f"Plan_{rank}_Overage_Penalty"]
            ),

            "fully_covered": bool(
                row[f"Plan_{rank}_Fully_Covered"]
            ),

            "price": float(
                row[f"Plan_{rank}_Price"]
            )
        }

        recommendations.append(
            recommendation
        )

    return {
        "phone_number": phone_number,

        "cluster": int(
            row["cluster"]
        ),

        "recommendations": recommendations
    }


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    phone_number = input(
        "Enter customer phone number: "
    ).strip()

    result = get_customer_recommendations(
        phone_number
    )

    if result is None:

        print(
            "\nCustomer not found."
        )

    else:

        print(
            "\nCustomer recommendations:"
        )

        print(result)