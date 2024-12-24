from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.exercise import ExerciseCreate, ExerciseUpdate, ExerciseResponse
from db.repositories.exercise_repo import create_exercise, get_exercise, get_exercises, update_exercise, delete_exercise

router = APIRouter()


# @router.post("/", response_model=ProductResponse)
# def create_new_product(product: ProductCreate, db: Session = Depends(get_db)):
#     return create_product(db, product)

# @router.get("/{product_id}", response_model=ProductResponse)
# def read_product(product_id: int, db: Session = Depends(get_db)):
#     db_product = get_product(db, product_id)
#     if db_product is None:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return db_product

@router.get("/", response_model=list[ExerciseResponse])
async def read_exercises(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    exercises = await get_exercises(db, skip, limit)
    return exercises

# @router.put("/{product_id}", response_model=ProductResponse)
# def update_existing_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
#     db_product = update_product(db, product_id, product)
#     if db_product is None:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return db_product

# @router.delete("/{product_id}", response_model=ProductResponse)
# def delete_existing_product(product_id: int, db: Session = Depends(get_db)):
#     db_product = delete_product(db, product_id)
#     if db_product is None:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return db_product
