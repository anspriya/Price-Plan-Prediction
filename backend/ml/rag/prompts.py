def build_recommendation_prompt(
    recommendation_data,
    retrieved_context
):

    recommendations = (
        recommendation_data[
            "recommendations"
        ]
    )

    cluster = recommendation_data[
        "cluster"
    ]

    recommendation_text = ""

    for recommendation in recommendations:

        recommendation_text += f"""
Rank {recommendation["rank"]}

Plan ID:
{recommendation["plan_id"]}

Plan Name:
{recommendation["plan_name"]}

Recommendation Score:
{recommendation["score"]}

Coverage:
{recommendation["coverage"]}

Utilization:
{recommendation["utilization"]}

Price Score:
{recommendation["price_score"]}

Cluster Score:
{recommendation["cluster_score"]}

Overage Penalty:
{recommendation["overage_penalty"]}

Fully Covered:
{recommendation["fully_covered"]}

Monthly Price:
{recommendation["price"]}

"""


    prompt = f"""
You are a telecom tariff plan recommendation assistant.

The recommendation engine has already selected the
customer's top 3 plans.

DO NOT change the ranking.

DO NOT recommend additional plans.

DO NOT invent any values.

DO NOT calculate a new recommendation score.

Use the recommendation scores and other metrics exactly
as provided by the recommendation engine.

Customer cluster:
{cluster}


===============================
RECOMMENDATION ENGINE RESULTS
===============================

{recommendation_text}


===============================
TARIFF PLAN INFORMATION
FROM RAG
===============================

{retrieved_context}


===============================
YOUR TASK
===============================

Explain why these three plans were recommended.

For each plan explain:

1. Plan name
2. Monthly price
3. Recommendation score
4. Coverage
5. Utilization
6. Whether it fully covers the customer
7. Important trade-offs

Then give a short comparison of the three plans.

Use simple language that a telecom customer can understand.

IMPORTANT:

The recommendation engine is the authority for ranking.

The retrieved tariff information is the authority for
plan allowances and pricing.

Do not invent customer usage values if they are not present
in the supplied information.

Do not claim that a plan fully covers the customer unless
Fully Covered is True.

Do not change the recommendation ranking.
"""

    return prompt