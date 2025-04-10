from sqlmodel import Field, SQLModel
from typing import Union

class UserBase(SQLModel):
    first_name: str = Field(default=None)
    last_name: str = Field(default=None)
    email: str = Field(default=None)
    password: str = Field()

class User(UserBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)

class UserUpdate(UserBase):
    first_name: str = Field(default=None) | None
    last_name: str = Field(default=None) | None
    email: str = Field(default=None) | None