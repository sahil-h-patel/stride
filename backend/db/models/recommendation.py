# Pydantic Recommendation Schema
from sqlmodel import Field, SQLModel
from datetime import datetime

class ReccomendationBase(SQLModel):
    reason: str = Field(max_length=1000)
    score: float = Field(ge=0.0, le=1.0)    

class Reccomendation(ReccomendationBase, table=True):
    user_id: int = Field(foreign_key="user.id")
    task_id: int = Field(foreign_key="task.id")
    creation_at: datetime = Field(default_factory=datetime.now(datetime.timezone.utc))
