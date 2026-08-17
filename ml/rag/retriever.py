import os

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document


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

VECTORSTORE_PATH = os.path.join(
    BASE_DIR,
    "vectorstore"
)


# ============================================================
# EMBEDDINGS
# ============================================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# ============================================================
# VECTOR DATABASE
# ============================================================

vectorstore = Chroma(
    persist_directory=VECTORSTORE_PATH,
    embedding_function=embeddings
)


# ============================================================
# RETRIEVE RECOMMENDED PLANS
# ============================================================

def retrieve_recommended_plans(plan_ids):

    results = []

    for plan_id in plan_ids:

        docs = vectorstore.get(
            where={
                "plan_id": str(plan_id)
            }
        )

        if docs["documents"]:

            document = Document(
                page_content=docs["documents"][0],

                metadata=docs["metadatas"][0]
            )

            results.append(document)

    return results