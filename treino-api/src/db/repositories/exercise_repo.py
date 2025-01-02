from sqlalchemy.orm import Session, joinedload, selectinload
from db.models.exercise import Exercise, Muscle,ExercisesMuscles, ExerciseInstruction, ExercisesMuscles
from schemas.exercise import ExerciseCreate, ExerciseUpdate
from sqlalchemy import select

async def create_exercise(db: Session, exercise: ExerciseCreate):
    new_exercise = Exercise(
        name=exercise.name,
        description=exercise.description,
        tutorial_url=exercise.tutorial_url,
        grip_id=exercise.grip_id,
        experience_level_id=exercise.experience_level_id,
        equipment_id=exercise.equipment_id,
    )
    db.add(new_exercise)
    await db.commit()
    await db.refresh(new_exercise)

    for muscle in exercise.muscles:
        new_exercise_muscle = ExercisesMuscles(
            exercise_id = new_exercise.id,
            muscle_id = muscle.muscle_id,
            level_type = muscle.level_type
        )
        db.add(new_exercise_muscle)

    for instruction in exercise.instructions:
        new_instruction = ExerciseInstruction(
            text = instruction.text,
            exercise_id = new_exercise.id
        )
        db.add(new_instruction)

    await db.commit()

    return new_exercise

async def get_exercise(db: Session, exercise_id: int):
    query = select(Exercise).filter(Exercise.id == exercise_id).options(
        joinedload(Exercise.muscles),joinedload(Exercise.exercise_muscles), joinedload(Exercise.experience_level), joinedload(Exercise.grip)
    )
    result = await db.execute(query)
    exercise = result.scalars().first()

    new_exercise = {
        "id": exercise.id,
        "name": exercise.name,
        "description": exercise.description,
        "experience_level": exercise.experience_level.name,
        "grip": exercise.grip.name,
        "muscles": [
            {
                "id": muscle.id,
                "name": muscle.name,
                "level_type": exercise.exercise_muscles[i].level_type,
            }
            for i, muscle in enumerate(exercise.muscles)
        ],
    }
    return new_exercise

async def get_exercises(db: Session, skip: int = 0, limit: int = 100, sort_by: str = 'title', asc: bool = True):
    query = select(Exercise).options(joinedload(Exercise.experience_level), joinedload(Exercise.grip), joinedload(Exercise.muscles)).offset(skip).limit(limit)

    if sort_by in ["name", "created_at"]:
        order_by = getattr(Exercise, sort_by)
        if not asc:
            order_by = order_by.desc()
        query = query.order_by(order_by)

    result = await db.execute(query)
    exercises = result.scalars().unique().all() 
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
