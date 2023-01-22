from fastapi import FastAPI, HTTPException
import models as model
from database import db
import crud as crud
from auth import create_access_token



app = FastAPI()


@app.post("/sign-up", response_model=model.User)
def home(user: model.UserBase):
    is_available = crud.get_user_by_email(db, user.email)
    if(is_available):
        raise HTTPException(status_code=404, detail="User Not Found")
    return crud.create_user(db, user)

@app.post("/login")
def login(login_req: model.LoginReq):
    user = crud.get_user_by_email(db, login_req.email)
    if not user:
        raise HTTPException(status_code=400, detail="Email is not registered.")
    if user.password != login_req.password:
        raise HTTPException(status_code=400, detail="Password does not match.")
    access_token = create_access_token({"email": user.email, "name": user.name})
    return {"token": access_token, "type": "Bearer"}

@app.get("/user/{user_id}", response_model=model.User)
def get_user(user_id: int):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@app.put("/user/{user_id}", response_model=model.User)
def update_user(user_id: int, user_data: model.UserBase):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return crud.update_user(db, user, user_data)
    
