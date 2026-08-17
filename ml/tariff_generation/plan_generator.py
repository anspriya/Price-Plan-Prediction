import pandas as pd
import numpy as np

# ----------------------------------------------------------------------
# CONFIG
# ----------------------------------------------------------------------
INPUT_CSV = "customer_clusters.csv"
OUTPUT_CSV = "25_tariff_plans.csv"
TOTAL_PLANS = 25

RATES = {"Day": 0.087, "Eve": 0.065, "Night": 0.052, "Intl": 0.30}
COMP_MAP = {"Day": "Day Mins", "Eve": "Eve Mins", "Night": "Night Mins", "Intl": "Intl Mins"}

# Rounding step (minutes) applied per component when converting a raw
# percentile value into a customer-friendly allowance.
ROUND_STEP = {"Day": 10, "Eve": 10, "Night": 10, "Intl": 5}

# Cosmetic labels only - cluster id -> (plan-id prefix, plan-name prefix)
CLUSTER_TAGS = {}          # filled in dynamically from the data, see build_cluster_tags()
NAME_LADDER = [
    "Starter", "Basic", "Standard", "Value", "Plus", "Select", "Advance",
    "Pro", "Elite", "Premium", "Max", "Ultra", "Supreme",
]


# ----------------------------------------------------------------------
# STEP 1 - allocate how many plans each cluster gets (sums to TOTAL_PLANS)
# ----------------------------------------------------------------------
def allocate_plans(df: pd.DataFrame, total_plans: int = TOTAL_PLANS) -> dict:
    """Allocate plan counts to clusters proportional to customer population."""
    counts = df["Cluster"].value_counts().sort_index()
    raw = counts / counts.sum() * total_plans
    alloc = raw.round().astype(int).to_dict()

    # Safety net: rounding can occasionally miss the target sum by 1.
    # If so, add/remove a plan from the largest cluster.
    diff = total_plans - sum(alloc.values())
    if diff != 0:
        biggest = counts.idxmax()
        alloc[biggest] += diff
    return alloc


def build_cluster_tags(df: pd.DataFrame) -> dict:
    """Assign a short plan-id prefix (C1, C2, C3...) and a name prefix
    derived from the first letters of the cluster's Segment label, if present."""
    tags = {}
    clusters = sorted(df["Cluster"].unique())
    for idx, cl in enumerate(clusters, start=1):
        plan_id_prefix = f"C{idx}"
        if "Segment" in df.columns:
            seg = df.loc[df["Cluster"] == cl, "Segment"].iloc[0]
            name_prefix = "".join(w[0] for w in str(seg).split()[:2]).upper()
        else:
            name_prefix = f"CL{idx}"
        tags[cl] = (plan_id_prefix, name_prefix)
    return tags


# ----------------------------------------------------------------------
# STEP 2 - build allowances for one cluster
# ----------------------------------------------------------------------
def round_up(value: float, step: int) -> int:
    return int(np.ceil(value / step) * step)


def build_cluster_plans(sub: pd.DataFrame, n_plans: int, tag: str, prefix: str) -> pd.DataFrame:
    """Create n_plans tariff plans for one cluster using evenly spaced
    percentiles of that cluster's own usage distributions."""
    percentiles = [(k / (n_plans + 1)) * 100 for k in range(1, n_plans + 1)]

    rows = []
    for i, p in enumerate(percentiles):
        allowances = {}
        for key, col in COMP_MAP.items():
            raw_val = np.percentile(sub[col], p)
            allowances[key] = round_up(raw_val, ROUND_STEP[key])
        allowances["Intl"] = max(allowances["Intl"], ROUND_STEP["Intl"])  # never 0

        rows.append({
            "Plan ID": f"{tag}-P{i + 1}",
            "Cluster": sub["Cluster"].iloc[0],
            "Plan Name": f"{prefix} {NAME_LADDER[i % len(NAME_LADDER)]}",
            "Percentile": round(p, 1),
            "Day Mins": allowances["Day"],
            "Evening Mins": allowances["Eve"],
            "Night Mins": allowances["Night"],
            "International Mins": allowances["Intl"],
        })
    return pd.DataFrame(rows)


def dedupe_cluster_plans(g: pd.DataFrame) -> pd.DataFrame:
    """If two adjacent tiers land on an identical (or lower) allowance
    combination after rounding, bump the higher tier up by one rounding
    step per component so every plan stays strictly distinct."""
    g = g.sort_values("Percentile").reset_index(drop=True)
    cols = ["Day Mins", "Evening Mins", "Night Mins", "International Mins"]
    steps = [ROUND_STEP["Day"], ROUND_STEP["Eve"], ROUND_STEP["Night"], ROUND_STEP["Intl"]]
    for idx in range(1, len(g)):
        if (g.loc[idx, cols] <= g.loc[idx - 1, cols]).all():
            for c, step in zip(cols, steps):
                if g.loc[idx, c] <= g.loc[idx - 1, c]:
                    g.loc[idx, c] = g.loc[idx - 1, c] + step
    return g


# ----------------------------------------------------------------------
# STEP 3 - pricing
# ----------------------------------------------------------------------
def price_plans(plans: pd.DataFrame) -> pd.DataFrame:
    plans["Day Cost"] = (plans["Day Mins"] * RATES["Day"]).round(2)
    plans["Evening Cost"] = (plans["Evening Mins"] * RATES["Eve"]).round(2)
    plans["Night Cost"] = (plans["Night Mins"] * RATES["Night"]).round(2)
    plans["International Cost"] = (plans["International Mins"] * RATES["Intl"]).round(2)
    plans["Benchmark Monthly Price"] = (
        plans["Day Cost"] + plans["Evening Cost"] + plans["Night Cost"] + plans["International Cost"]
    ).round(2)
    return plans


# ----------------------------------------------------------------------
# MAIN
# ----------------------------------------------------------------------
def generate_25_tariff_plans(input_csv: str = INPUT_CSV) -> pd.DataFrame:
    df = pd.read_csv(input_csv)

    required = {"Cluster", "Day Mins", "Eve Mins", "Night Mins", "Intl Mins"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    alloc = allocate_plans(df)
    tags = build_cluster_tags(df)

    all_plans = []
    for cl in sorted(df["Cluster"].unique()):
        sub = df[df["Cluster"] == cl]
        n_plans = alloc[cl]
        tag, prefix = tags[cl]

        cluster_plans = build_cluster_plans(sub, n_plans, tag, prefix)
        cluster_plans = dedupe_cluster_plans(cluster_plans)
        all_plans.append(cluster_plans)

    plans = pd.concat(all_plans, ignore_index=True)
    plans = price_plans(plans)

    assert len(plans) == TOTAL_PLANS, f"Expected {TOTAL_PLANS} plans, got {len(plans)}"
    assert plans["Plan ID"].is_unique, "Duplicate Plan IDs found"
    dup_combos = plans[["Day Mins", "Evening Mins", "Night Mins", "International Mins"]].duplicated().sum()
    assert dup_combos == 0, f"Found {dup_combos} duplicate allowance combinations"

    return plans


if __name__ == "__main__":
    result = generate_25_tariff_plans(INPUT_CSV)
    result.to_csv(OUTPUT_CSV, index=False)

    print(f"Generated {len(result)} tariff plans -> {OUTPUT_CSV}\n")
    print(result[[
        "Plan ID", "Plan Name", "Day Mins", "Evening Mins", "Night Mins",
        "International Mins", "Benchmark Monthly Price",
    ]].to_string(index=False))
