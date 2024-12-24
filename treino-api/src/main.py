from fastapi import FastAPI
from routers.exercise import router as exercise_router

app = FastAPI()

app.include_router(exercise_router, prefix="/exercises", tags=["exercises"])