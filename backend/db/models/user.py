from sqlmodel import Field, SQLModel, Column, Integer, String
from typing import Optional

class UserBase(SQLModel):
    first_name: str = Field()
    last_name: str = Field()
    email: str = Field()
    password: str = Field()

class User(UserBase, table=True):
    id: int = Field(default=None, primary_key=True, nullable=False)

class UserUpdate(UserBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None    
    password: Optional[str] = None