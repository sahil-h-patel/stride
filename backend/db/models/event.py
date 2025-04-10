# Pydantic Event Schema
from sqlmodel import Field, SQLModel, Column, Integer, String
from datetime import datetime
from typing import Optional
import pytz

class EventBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=1000)
    fixed: bool = Field()
    start_datetime: datetime = Field()
    end_datetime: datetime = Field()
    
class Event(EventBase, table=True):
    id: int = Field(default=None, primary_key=True, nullable=False)
    creation_at: datetime = Field(default_factory=lambda: datetime.now(pytz.utc))

class EventPublic(EventBase):
    id: int

class EventUpdate(SQLModel):
    name: Optional[str] = Field(max_length=100) or None
    description: Optional[str] = Field(max_length=1000) or None
    fixed: Optional[bool] = Field() or None
    start_datetime: Optional[datetime] = Field() or None
    end_datetime: Optional[datetime] = Field() or None
