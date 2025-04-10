# API Routing for Event model
from db.models.event import Event, EventPublic, EventUpdate
from sqlmodel import Session
from main import app
from fastapi import Depends, HTTPException
from db.db_config import get_session

@app.post('/events', response_model=EventPublic)
async def create_event(data: EventPublic, session: Session = Depends(get_session)):
    event = Event(**data.model_dump())
    session.add(event)
    session.commit()
    session.refresh(event)
    return event

@app.get('/events/{id}', response_model=EventPublic)
async def get_event(id: int, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    return event

@app.put('/events/{id}', response_model=EventPublic)
async def update_event(id: int, data: EventUpdate, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    
    session.commit(event)
    session.refresh(event)
    return event

@app.delete('/events/{id}', response_model=EventPublic)
async def delete_event(id: int, session: Session = Depends(get_session)):
    event = session.get(Event, id)
    if not event:
        raise HTTPException(404, 'event not found')
    
    session.delete(event)
    session.commit()
    return event