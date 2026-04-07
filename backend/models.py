from sqlalchemy import  Column, Integer, Text, TIMESTAMP, text
from database import Base
class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    user_id = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))