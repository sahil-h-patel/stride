from db.models.event import Event, EventPublic, EventUpdate
from sqlmodel import Session
from fastapi import Depends, HTTPException, APIRouter
from db.db_config import get_session

event = APIRouter(prefix="/events", tags=["events"])

@event.post('/', response_model=EventPublic)
async def create_event(data: EventPublic, session: Session = Depends(get_session)):
    event = Event(**data.model_dump())
    session.add(event)
    session.commit()
    session.refresh(event)
    return event

@event.get('/{id}', response_model=EventPublic)
async def get_event(id: int, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    return event

@event.put('/{id}', response_model=EventPublic)
async def update_event(id: int, data: EventUpdate, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    
    session.commit()
    session.refresh(event)
    return event

@event.delete('/{id}', response_model=EventPublic)
async def delete_event(id: int, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    
    session.delete(event)
    session.commit()
    return event