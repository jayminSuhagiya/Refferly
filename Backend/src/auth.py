from jose import jwt
from datetime import timedelta, datetime
from typing import Optional
from config import SECRET_KEY, ALGORITHM
from fastapi import Header, HTTPException
from models import TokenData


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token = Header()):
    try:
        data = jwt.decode(token, key=SECRET_KEY, algorithms=ALGORITHM)
    except:
        raise HTTPException(status_code=400, detail="Token is not verified.")
    return TokenData(id=data["id"], email=data["email"], name=data["name"])
