from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine
models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@app.get("/flashcards", response_model=list[schemas.FlashcardResponse])
def read_flashcards(db: Session = Depends(get_db)):
    return crud.get_flashcards(db)
@app.post("/flashcards", response_model=schemas.FlashcardResponse)
def create_flashcard(flashcard: schemas.FlashcardCreate, db: Session = Depends(get_db)):
    return crud.create_flashcard(db, flashcard)
@app.put("/flashcards/{flashcard_id}", response_model=schemas.FlashcardResponse)
def update_flashcard(flashcard_id: int, flashcard: schemas.FlashcardUpdate, db: Session = Depends(get_db)):
    updated = crud.update_flashcard(db, flashcard_id, flashcard)
    if not updated:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return updated
@app.delete("/flashcards/{flashcard_id}")
def delete_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_flashcard(db, flashcard_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return {"message": "Flashcard deleted"}