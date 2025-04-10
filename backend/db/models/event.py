# Pydantic Event Schema
from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Annotated, Union

class EventBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=1000)
    fixed: bool = Field()
    start_datetime: datetime = Field()
    end_datetime: datetime = Field()
    
class Event(EventBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)
    creation_at: datetime = Field(default_factory=datetime.now(datetime.timezone.utc))

class EventPublic(EventBase):
    id: int

class EventUpdate(SQLModel):
    name: str = Field(max_length=100) | None
    description: str = Field(max_length=1000) | None
    fixed: bool = Field() | None
    start_datetime: datetime = Field() | None
    end_datetime: datetime = Field() | None
