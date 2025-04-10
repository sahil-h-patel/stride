# Google Calendar API integration
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from main import auth
import os 
import httpx

CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')

class CodeRequest(BaseModel):
    code: str

@auth.post("/google-auth")
async def google_auth(request: Request):
    try:
        if request.headers.get('content-type') != "application/json":
            return HTTPException(404, "Expected JSON request body")
        
        data = await request.json()
        code = data.get('code')
        if not code:
            return HTTPException(400, "Code not provided") 
        return JSONResponse(content={"message": "Code received successfully", "code": code})
    
    except Exception as e:
        return HTTPException(400, str(e))

@auth.post("/callback")
async def callback(request: CodeRequest):
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
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(status_code=400, detail=error_data.get('error', 'Unknown error'))
        
        return response.json()
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

