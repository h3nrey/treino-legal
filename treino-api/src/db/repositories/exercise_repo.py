from sqlalchemy.orm import Session, joinedload, selectinload
from db.models.exercise import Exercise, Muscle,ExercisesMuscles, ExerciseInstruction, ExercisesMuscles
from schemas.exercise import ExerciseCreate, ExerciseUpdate
from sqlalchemy import select
from sqlalchemy import and_, or_
from fastapi import Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

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
            muscle_id = muscle.id,
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

    # return new_exercise
    return "created sucessfully"

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

async def get_exercises(db: Session, skip: int = 0, limit: int = 100, sort_by: str = 'title', asc: bool = True, filters: list[str] = Query(None)):
    query = select(Exercise).options(joinedload(Exercise.experience_level), joinedload(Exercise.grip), joinedload(Exercise.muscles)).offset(skip).limit(limit)

    if sort_by in ["name", "created_at"]:
        order_by = getattr(Exercise, sort_by)
        if not asc:
            order_by = order_by.desc()
        query = query.order_by(order_by)

    if(filters):
        muscle_ids = [int(f.split(":")[1]) for f in filters if f.startswith("muscle:")]
        query = query.filter(Exercise.muscles.any(Muscle.id.in_(muscle_ids)))

    result = await db.execute(query)
    exercises = result.scalars().unique().all() 
    # print(exercises[0].equipment_id)
    return exercises

async def search_exercises(db: Session, skip: int = 0, limit: int = 100, sort_by: str = 'title', asc: bool = True, filters: list[str] = Query(None), search_query: str = None):
    query = select(Exercise).options(
        joinedload(Exercise.experience_level), 
        joinedload(Exercise.grip), 
        joinedload(Exercise.muscles)
    ).offset(skip).limit(limit)

    if sort_by in ["name", "created_at"]:
        order_by = getattr(Exercise, sort_by)
        if not asc:
            order_by = order_by.desc()
        query = query.order_by(order_by)

    if(filters):
        muscle_ids = [int(f.split(":")[1]) for f in filters if f.startswith("muscle:")]
        query = query.filter(Exercise.muscles.any(Muscle.id.in_(muscle_ids)))

    if(search_query):
        search_term = f"%{search_query}%"
        query = query.filter(
            or_(
                Exercise.name.ilike(search_term),
            )
        )

    result = await db.execute(query)
    exercises = result.scalars().unique().all()
    return exercises

async def update_exercise(db: Session, exercise_id: int, new_exercise: ExerciseUpdate):
    result = await db.execute(select(Exercise).filter(Exercise.id == exercise_id).options(joinedload(Exercise.muscles)))
    exercise = result.scalars().first()

    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    for key, value in new_exercise.dict(exclude_unset=True).items():
        setattr(exercise, key, value)

    await db.commit()
    await db.refresh(exercise)

    return exercise
    

async def delete_exercise(db: Session, exercise_id: int):
    result =  await db.execute(select(Exercise).filter(Exercise.id == exercise_id).options(joinedload(Exercise.muscles)))
    exercise = result.scalars().first()

    if exercise:
        await db.delete(exercise)
        await db.commit()
        return "Exercise sucessfully deleted"
    return None
