from db.models.task import TaskUpdate, TaskPublic, Task
from sqlmodel import Session
from main import app
from fastapi import Depends, HTTPException
from db.db_config import get_session

@app.post('/tasks', response_model=TaskPublic)
async def create_task(data: TaskPublic, session: Session = Depends(get_session)):
    task = Task(**data.model_dump())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@app.get('/tasks/{id}', response_model=TaskPublic)
async def get_task(id: int, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    return task

@app.put('/tasks/{id}', response_model=TaskPublic)
async def update_task(id: int, data: TaskUpdate, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    
    session.commit(task)
    session.refresh(task)
    return task

@app.delete('/tasks/{id}', response_model=TaskPublic)
async def delete_task(id: int, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    
    session.delete(task)
    session.commit()
    return task