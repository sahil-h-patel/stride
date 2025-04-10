# Pydantic Recommendation Schema
from sqlmodel import Field, SQLModel, Column, Integer, String
from datetime import datetime
from typing import Union
import pytz

class ReccomendationBase(SQLModel):
    reason: str = Field(max_length=1000)
    score: float = Field(ge=0.0, le=1.0)    

class Reccomendation(ReccomendationBase, table=True):
    id: int = Field(default=None, primary_key=True, nullable=False)
    user_id: int = Field(foreign_key="user.id")
    task_id: int = Field(foreign_key="task.id")
    creation_at: datetime = Field(default_factory=lambda: datetime.now(pytz.utc))
