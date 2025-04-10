# Pydantic Task Schema
from sqlmodel import Field, Enum, SQLModel, Column, Integer, String
from datetime import datetime
from typing import Union, Optional
import pytz

class Progress(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    DONE = "done"
    
class Priority(str, Enum):
    LOW = "low"
    NORMAL = "normal"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TaskBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=1000)
    start_datetime: datetime = Field()
    end_datetime: datetime = Field()
    status: str = Progress
    priority: str = Priority
    tag: str
    
class Task(TaskBase, table=True):
    id: int = Field(primary_key=True, nullable=False)
    uid: Union[int, None] = Field(default=None, foreign_key='user.id')
    pid: Union[int, None] = Field(default=None, foreign_key='task.id')
    eid: Union[int, None] = Field(default=None, foreign_key='event.id')
    source: str = Field(max_length=20, nullable=True)
    creation_at: datetime = Field(default_factory=lambda: datetime.now(pytz.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(pytz.utc))

class TaskUpdate(TaskBase):
    name: Optional[str] = Field(max_length=100) or None
    description: Optional[str] = Field(max_length=1000) or None
    start_datetime: Optional[datetime] = Field() or None
    end_datetime: Optional[datetime] = Field() or None
    status: Optional[str] = Progress or None
    priority: Optional[str] = Priority or None
    tag: Optional[str] = Field() or None

