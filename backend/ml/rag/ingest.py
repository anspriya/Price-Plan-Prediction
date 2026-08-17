import os
import pandas as pd

from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma


# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

CSV_PATH = os.path.join(
    BASE_DIR,
    "data",
    "25_tariff_plans_sample_output.csv"
)

VECTORSTORE_PATH = os.path.join(
    BASE_DIR,
    "vectorstore"
)


# --------------------------------------------------
# Read tariff plans
# --------------------------------------------------

df = pd.read_csv(CSV_PATH)

print(f"Number of tariff plans: {len(df)}")


# --------------------------------------------------
# Convert each tariff plan into a document
# --------------------------------------------------

documents = []

for _, row in df.iterrows():

    text = f"""
Tariff Plan Information

Plan ID: {row['Plan ID']}
Plan Name: {row['Plan Name']}
Cluster: {row['Cluster']}
Percentile: {row['Percentile']}

Included Usage:
- Day Minutes: {row['Day Mins']}
- Evening Minutes: {row['Evening Mins']}
- Night Minutes: {row['Night Mins']}
- International Minutes: {row['International Mins']}

Cost Breakdown:
- Day Cost: {row['Day Cost']}
- Evening Cost: {row['Evening Cost']}
- Night Cost: {row['Night Cost']}
- International Cost: {row['International Cost']}

Benchmark Monthly Price: {row['Benchmark Monthly Price']}
"""

    document = Document(
        page_content=text,
        metadata={
            "plan_id": row["Plan ID"],
            "plan_name": row["Plan Name"],
            "cluster": int(row["Cluster"])
        }
    )

    documents.append(document)


print(f"Documents created: {len(documents)}")


# --------------------------------------------------
# Create embeddings
# --------------------------------------------------

print("Creating embeddings...")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# --------------------------------------------------
# Create Chroma vector database
# --------------------------------------------------

print("Creating vector database...")

vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory=VECTORSTORE_PATH
)


print("\nRAG knowledge base created successfully!")
print(f"Vector store location: {VECTORSTORE_PATH}")