from typing import Union
from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from db import init_db, get_session
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

init_db()
get_session()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

auth = APIRouter("auth", tags=["auth"])

app.include_router(auth)

# class Item(BaseModel):
#     name: str
#     price: float
#     is_offer: Union[bool, None] = None

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# @app.put("/items/{item_id}")
# def update_item(item_id: int, item: Item):
#     return {"item_name": item.name, "item_id": item_id}