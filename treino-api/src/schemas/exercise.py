from pydantic import BaseModel
from typing import Optional

class GripBase(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class MuscleBase(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class MuscleCreate(BaseModel):
    id: int
    level_type: int

    class Config:
        from_attributes = True

class MuscleExercise(MuscleBase):
    level_type: int

    class Config:
        from_attributes = True

class ExerciseInstructionBase(BaseModel):
    text: str
    class Config:
        from_attributes = True

class ExperienceLevelBase(BaseModel):
    name: str
    class Config:
        from_attributes = True

class ExerciseBase(BaseModel):
    name: str
    # muscles: list[MuscleSchema]
    # description: str
    # equipment_id: int

    
class ExerciseCreate(ExerciseBase):
    experience_level_id: int
    equipment_id: int
    grip_id: int
    tutorial_url: Optional[str] = None
    description: str
    instructions: Optional[list[ExerciseInstructionBase]]
    muscles: list[MuscleCreate]

class ExerciseUpdate(ExerciseBase):
    name: Optional[str] = None
    description: Optional[str] = None
    grip: Optional[str] = None
    experience_level: Optional[str] = None

class ExerciseResponse(ExerciseBase):
    id: int
    muscles: list[MuscleBase]
    
    class Config:
        from_attributes = True

class ExercisePage(ExerciseBase):
    description: str
    experience_level: str
    grip: str
    muscles: list[MuscleExercise]