from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Grip(Base):
    __tablename__ = "grips"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    exercise = relationship("Exercise", back_populates="grip")

class ExperienceLevel(Base):
    __tablename__ = "experience_levels"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    exercise = relationship("Exercise", back_populates="experience_level")

class Muscle(Base):
    __tablename__ = "muscles"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    exercises = relationship("Exercise", secondary="exercises_muscles", back_populates="muscles")

class Equipment(Base):
    __tablename__ = "equipments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    exercise = relationship("Exercise", back_populates="equipment")

class Exercise(Base):
    __tablename__ = 'exercises'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    tutorial_url = Column(String)
    created_at = Column(DateTime, default=func.now())

    grip_id = Column(Integer, ForeignKey("grips.id"), nullable=False)
    grip = relationship("Grip", back_populates="exercise")

    muscles = relationship("Muscle", secondary="exercises_muscles", back_populates="exercises")
    exercise_muscles = relationship("ExercisesMuscles", back_populates="exercise")

    experience_level_id = Column(Integer, ForeignKey("experience_levels.id"), nullable=False)
    experience_level = relationship("ExperienceLevel", back_populates="exercise")

    equipment_id = Column(Integer, ForeignKey("equipments.id"), nullable=False)
    equipment = relationship("Equipment", back_populates="exercise")

    tips = relationship("ExerciseTip", back_populates="exercise")
    instructions = relationship("ExerciseInstruction", back_populates="exercise")

    def __repr__(self):
        return f"<Exercise(id={self.id} name={self.name})>"

class ExercisesMuscles(Base):
    __tablename__ = 'exercises_muscles'
    
    muscle_id = Column(Integer, ForeignKey('muscles.id'), primary_key=True)
    exercise_id = Column(Integer, ForeignKey('exercises.id'), primary_key=True)
    level_type = Column(Integer, nullable=False)
    exercise = relationship("Exercise", back_populates="exercise_muscles")

class ExerciseTip(Base):
    __tablename__ = 'exercise_tips'
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String, nullable=False)
    exercise_id = Column(Integer, ForeignKey('exercises.id'))
    exercise = relationship("Exercise", back_populates="tips")

class ExerciseInstruction(Base):
    __tablename__ = 'exercise_instructions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String, nullable=False)
    exercise_id = Column(Integer, ForeignKey('exercises.id'))
    exercise = relationship("Exercise", back_populates="instructions")