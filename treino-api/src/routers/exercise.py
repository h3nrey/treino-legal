from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from db.session import get_db
# from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
# from app.db.repositories.product_repo import create_product, get_product, get_products, update_product, delete_product

router = APIRouter()

@router.get("/")
def get_exercises():
    return "supino reto articulado"

# @router.post("/", response_model=ProductResponse)
# def create_new_product(product: ProductCreate, db: Session = Depends(get_db)):
#     return create_product(db, product)

# @router.get("/{product_id}", response_model=ProductResponse)
# def read_product(product_id: int, db: Session = Depends(get_db)):
#     db_product = get_product(db, product_id)
#     if db_product is None:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return db_product

# @router.get("/", response_model=list[ProductResponse])
# def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return get_products(db, skip, limit)

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
