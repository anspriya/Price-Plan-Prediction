from sqlalchemy.orm import sessionmaker

from app.database.connection import engine


# =======================================
# DATABASE SESSION
# =======================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =======================================
# DATABASE DEPENDENCY
# =======================================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()