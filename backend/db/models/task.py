# Pydantic Task Schema
from sqlmodel import Field, Enum, SQLModel
from datetime import datetime
from typing import Union

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
    status: str = Enum(Progress)
    priority: str = Enum(Priority)
    tag: str
    
class Task(TaskBase, table=True):
    tid: Union[int, None] = Field(default=None, primary_key=True)
    uid: Union[int, None] = Field(default=None, foreign_key='user.id')
    parent_id: Union[int, None] = Field(default=None, foreign_key=True)
    eid: Union[int, None] = Field(default=None, foreign_key='event.id')
    source: str = Field(max=20)
    creation_at: datetime = Field(default_factory=datetime.now(datetime.timezone.utc))
    updated_at: datetime = Field(default_factory=datetime.now(datetime.timezone.utc))

class TaskPublic(TaskBase):
    id: int

class TaskUpdate(TaskBase):
    name: str = Field(max_length=100) | None
    description: str = Field(max_length=1000) | None
    start_datetime: datetime = Field() | None
    end_datetime: datetime = Field() | None
    status: str = Enum(Progress) | None
    priority: str = Enum(Priority) | None
    tag: str | None

