from db.models.task import TaskUpdate, TaskBase, Task
from sqlmodel import Session
from fastapi import Depends, HTTPException, APIRouter
from db.db_config import get_session

task = APIRouter(prefix="/tasks", tags=["events"])

@task.post('/', response_model=TaskBase)
async def create_task(data: TaskBase, session: Session = Depends(get_session)):
    task = Task(**data.model_dump())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@task.get('/{id}', response_model=TaskBase)
async def get_task(id: int, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    return task

@task.put('/{id}', response_model=TaskBase)
async def update_task(id: int, data: TaskUpdate, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    
    session.commit()
    session.refresh(task)
    return task

@task.delete('/{id}', response_model=TaskBase)
async def delete_task(id: int, session: Session = Depends(get_session)):
    task = session.get(Task, id)
    if not task:
        raise HTTPException(404, 'task not found')
    
    session.delete(task)
    session.commit()
    return task