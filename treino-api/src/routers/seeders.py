from db.models.exercise import Grip
from sqlalchemy.orm import Session
from database import get_db
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

async def seed_grip(db: AsyncSession):
    grips = [
        Grip(name="Supinada"),
        Grip(name="Pronada"),
        Grip(name="Neutra"),
        Grip(name="Nenhuma")
    ]
    for grip in grips:
        await db.add(grip)
    await db.commit()
    # db.add_all(grips)
    print("Seeded grip sucessfully :)")


async def run_seeds():
    db = Depends(get_db)
    await seed_grip(db)
    return "Database seeded sucessfully :))"