import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans


# ============================================
# 1. LOAD DATA
# ============================================

df = pd.read_csv("final_use_data.csv")


# ============================================
# 2. FEATURES FOR CLUSTERING
# ============================================

features = [
    "total_mins",
    "night_mins_share",
    "day_mins_share",
    "eve_mins_share"
]

X = df[features].copy()


# ============================================
# 3. HANDLE MISSING / INFINITE VALUES
# ============================================

X = X.replace([float("inf"), float("-inf")], pd.NA)

valid_rows = X.dropna().index

X = X.loc[valid_rows]
df_cluster = df.loc[valid_rows].copy()


# ============================================
# 4. STANDARDIZE FEATURES
# ============================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)


# ============================================
# 5. K-MEANS WITH K = 3
# ============================================

kmeans = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

df_cluster["Cluster"] = kmeans.fit_predict(X_scaled)


# ============================================
# 6. CLUSTER SIZES
# ============================================

print("\n==============================")
print("CLUSTER SIZES")
print("==============================")

print(
    df_cluster["Cluster"]
    .value_counts()
    .sort_index()
)


# ============================================
# 7. CLUSTER PROFILE
# ============================================

print("\n==============================")
print("CLUSTER PROFILE")
print("==============================")

cluster_profile = (
    df_cluster
    .groupby("Cluster")[features]
    .mean()
)

print(cluster_profile)

# ============================================
# 8. GIVE CLUSTERS MEANINGFUL SEGMENT NAMES
# ============================================

cluster_names = {
    0: "High-Volume High-Frequency Users",
    1: "Moderate Balanced Users",
    2: "Evening-Focused Moderate Users"
}

df_cluster["Segment"] = df_cluster["Cluster"].map(cluster_names)


# ============================================
# 9. SAVE CLUSTERED DATA
# ============================================

df_cluster.to_csv(
    "customer_clusters.csv",
    index=False
)

print("\nSaved: customer_clusters.csv")
