from sqlalchemy.orm import Session
from ..models import QuizResponse
from ..schemas import QuizResponseCreate

def create_quiz_response(db: Session, response: QuizResponseCreate):
    db_response = QuizResponse(
        instrument=response.instrument,
        goals=response.goals,
        music_genres=",".join(response.music_genres),
        is_for_child=response.is_for_child
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

def get_quiz_responses(db: Session):
    return db.query(QuizResponse).all()