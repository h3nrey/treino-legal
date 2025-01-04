from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from schemas.exercise import ExerciseCreate, ExerciseUpdate, ExerciseResponse, ExercisePage, ExerciseBase
from db.repositories.exercise_repo import create_exercise, get_exercise, get_exercises, update_exercise, delete_exercise
router = APIRouter()

@router.get("/{exercise_id}", response_model=ExercisePage)
async def read_exercise(exercise_id: int, db: Session = Depends(get_db)):
    db_exercise = await get_exercise(db, exercise_id)
    print(db_exercise)
    if db_exercise is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_exercise

@router.get("/", response_model=list[ExerciseResponse])
async def read_exercises(skip: int = 0, limit: int = 100, sort_by: str = "name", asc: bool = True, filters: list[str] = Query(None), db: Session = Depends(get_db)):
    exercises = await get_exercises(db, skip, limit, sort_by, asc, filters)
    return exercises

@router.post("/", response_model=str)
async def create_new_exercise(exercise: ExerciseCreate, db: Session = Depends(get_db)):
    created_exercise = await create_exercise(db, exercise)
    return created_exercise

@router.put("/{exercise_id}", response_model=ExerciseResponse)
async def update_existing_exercise(exercise_id: int, exercise: ExerciseUpdate, db: Session = Depends(get_db)):
    db_exercise = await update_exercise(db, exercise_id, exercise)
    if db_exercise is None:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return db_exercise

@router.delete("/{exercise_id}", response_model=str)
async def delete_existing_exercise(exercise_id: int, db: Session = Depends(get_db)):
    db_exercise = await delete_exercise(db, exercise_id)
    if db_exercise is None:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return db_exercise
