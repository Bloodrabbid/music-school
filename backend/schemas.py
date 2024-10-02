from pydantic import BaseModel

class QuizResponseCreate(BaseModel):
    instrument: str
    goals: str
    music_genres: list
    is_for_child: bool

    class Config:
        orm_mode = True