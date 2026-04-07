from sqlalchemy.orm import Session
import models, schemas
def get_flashcards(db: Session):
    return db.query(models.Flashcard).order_by(models.Flashcard.id.desc()).all()
def create_flashcard(db: Session, flashcard: schemas.FlashcardCreate):
    db_flashcard = models.Flashcard(question=flashcard.question, answer=flashcard.answer)
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard
def delete_flashcard(db: Session, flashcard_id: int):
    db_flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == flashcard_id).first()
    if db_flashcard:
        db.delete(db_flashcard)
        db.commit()
    return db_flashcard
