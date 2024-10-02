from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class QuizResponse(Base):
    __tablename__ = "quiz_responses"

    id = Column(Integer, primary_key=True, index=True)
    instrument = Column(String)
    goals = Column(String)
    music_genres = Column(String)  # Сохраняем список жанров через запятую
    is_for_child = Column(Boolean)