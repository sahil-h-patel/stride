# Google Calendar API integration
from fastapi import HTTPException, Depends
from pydantic import BaseModel
from db.models import UserBase, User, hash_pswd
from db import get_session
from main import auth
from sqlmodel import Session
import os 
import httpx
from api.user import create_user

CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')

class CodeRequest(BaseModel):
    code: str

@auth.post("/google")
async def google_auth(request: CodeRequest, session: Session = Depends(get_session())):
    try:
        code = request.code


        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code',
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(token_url, data=token_data)
            response.raise_for_status()
            tokens = response.json()
            access_token = tokens["access_token"]

        async with httpx.AsyncClient() as clinet:
            user_response = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo", 
                headers={"Authorization": f"Bearer {access_token}"})
            user_response.raise_for_status()
            user = user_response.json()

            # if user:
            #     return {"user": user}

            # existing_user = session.exec(User).filter(User.email == user.get('email')).first()
            # if existing_user:
            #     return {"message": "User already exists", "user": existing_user}

            # # create user in db
            # new_user = UserBase(
            #     first_name=user.get('given_name'),
            #     last_name=user.get('family_name'),
            #     email=user.get('email'),
            #     password=hash_pswd("uninit")
            # )
            # session.add(new_user)
            # session.commit()
            # session.refresh(new_user)

            # return {"message": "User created successfully", "user": new_user}

        return user
    
    except Exception as e:
        return HTTPException(400, str(e))

