from fastapi import FastAPI
from .routers import quiz
from .database import engine
from .models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(quiz.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)