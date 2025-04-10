from fastapi import FastAPI, APIRouter
from db.db_config import init_db, get_session
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from api.event import event
from api.task import task
from api.user import user

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

auth = APIRouter()

app.include_router(auth, prefix="/auth")
app.include_router(event)
app.include_router(task)
app.include_router(user)
