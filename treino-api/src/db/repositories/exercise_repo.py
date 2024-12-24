from sqlalchemy.orm import Session
from db.models.exercise import Exercise
from schemas.exercise import ExerciseCreate, ExerciseUpdate
from sqlalchemy import select

def create_exercise(db: Session, exercise: ExerciseCreate):
    db_exercise = Exercise(**exercise.dict())
    db.add(db_exercise)
    db.commit()
    db.refresh(db_exercise)
    return db_exercise

def get_exercise(db: Session, exercise_id: int):
    return db.query(Exercise).filter(Exercise.id == exercise_id).first()

async def get_exercises(db: Session, skip: int = 0, limit: int = 100):
    query = select(Exercise).offset(skip).limit(limit)
    result = await db.execute(query)
    exercises = result.scalars().all() 
    return exercises

def update_exercise(db: Session, exercise_id: int, exercise: ExerciseUpdate):
    db_exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if db_exercise:
        for key, value in exercise.dict(exclude_unset=True).items():
            setattr(db_exercise, key, value)
        db.commit()
        db.refresh(db_exercise)
    return db_exercise

def delete_exercise(db: Session, exercise_id: int):
    db_exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if db_exercise:
        db.delete(db_exercise)
        db.commit()
    return db_exercise
