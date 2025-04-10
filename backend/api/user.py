from db.models.user import UserBase, UserUpdate, User
from sqlmodel import Session
from fastapi import Depends, HTTPException, APIRouter
from db.db_config import get_session

user = APIRouter(prefix="/users", tags=["users"])

@user.post('/', response_model=UserBase)
async def create_user(data: UserBase, session: Session = Depends(get_session)):
    user = User(**data.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@user.get('/{id}', response_model=UserBase)
async def get_user(id: int, session: Session = Depends(get_session)):
    user = session.get(User, id)
    if not user:
        raise HTTPException(404, 'User not found')
    return user

@user.put('/{id}', response_model=UserBase)
async def update_user(id: int, data: UserUpdate, session: Session = Depends(get_session)):
    user = session.get(User, id)
    if not user:
        raise HTTPException(404, 'User not found')
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    
    session.commit()
    session.refresh(user)
    return user

@user.delete('/{id}', response_model=UserBase)
async def delete_user(id: int, session: Session = Depends(get_session)):
    user = session.get(User, id)
    if not user:
        raise HTTPException(404, 'User not found')
    
    session.delete(user)
    session.commit()
    return user