from sqlalchemy import  column, Integer, Text, TIMESTAMP, text
from database import Base
class Flashcard(Base):
    __tablename__ = "flashcards"
    id = column(Integer, primary_key=True, index=True)
    question = column(Text, nullable=False)
    answer = column(Text, nullable=False)
    user_id = column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))