from pydantic import BaseModel
class FlashcardBase(BaseModel):
    question: str
    answer: str
class FlashcardCreate(FlashcardBase):
    pass
class FlashcardUpdate(FlashcardBase):
    pass
class FlashcardResponse(FlashcardBase):
    id: int
    class Config:
        orm_mode = True