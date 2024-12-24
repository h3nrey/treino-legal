from pydantic import BaseModel
from typing import Optional

class ExerciseBase(BaseModel):
    name: str
    description: str
    grip: str
    experience_level: str

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseUpdate(ExerciseBase):
    name: Optional[str] = None
    description: Optional[str] = None
    grip: Optional[str] = None
    experience_level: Optional[str] = None

class ExerciseResponse(ExerciseBase):
    id: int

    class Config:
        orm_mode = True
