from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import QuizResponseCreate
from ..services.quiz_services import create_quiz_response, get_quiz_responses

router = APIRouter()

@router.post("/submit_quiz/")
def submit_quiz(response: QuizResponseCreate, db: Session = Depends(get_db)):
    quiz = create_quiz_response(db, response)
    return {"message": "Quiz submitted", "data": quiz}

@router.get("/quiz_results/")
def get_results(db: Session = Depends(get_db)):
    results = get_quiz_responses(db)
    return results