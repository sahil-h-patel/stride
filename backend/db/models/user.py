from sqlmodel import Field, SQLModel, Column, Integer, String
from typing import Optional
import bcrypt

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

def hash_pswd(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(stored_hashed_password: str, input_password: str) -> bool:
    return bcrypt.checkpw(input_password.encode('utf-8'), stored_hashed_password.encode('utf-8'))
