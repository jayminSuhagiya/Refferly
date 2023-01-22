from fastapi import FastAPI, HTTPException, Depends
import models as model
from database import db
import crud as crud
from auth import create_access_token, get_current_user
import utils as utils


app = FastAPI()


@app.post("/sign-up", response_model=model.User)
def home(user: model.UserBase):
    user.type = utils.ref_type(user.type)
    is_available = crud.get_user_by_email(db, user.email)
    if(is_available):
        raise HTTPException(status_code=404, detail="User already exists.")
    return crud.create_user(db, user)

@app.post("/login")
def login(login_req: model.LoginReq):
    user = crud.get_user_by_email(db, login_req.email)
    if not user:
        raise HTTPException(status_code=400, detail="Email is not registered.")
    if user.password != login_req.password:
        raise HTTPException(status_code=400, detail="Password does not match.")
    access_token = create_access_token({"id": user.id,"email": user.email, "name": user.name})
    return {"token": access_token, "type": "Bearer"}

@app.get("/user", response_model=model.User)
def get_user(curr_user = Depends(get_current_user)):
    user = crud.get_user(db, curr_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@app.put("/user", response_model=model.User)
def update_user(user_data: model.UserBase, curr_user = Depends(get_current_user)):
    user_data.type = utils.ref_type(user_data.type)
    user = crud.get_user(db, curr_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return crud.update_user(db, user, user_data)

@app.get("/feed")
def feed(curr_user = Depends(get_current_user)):
    user = crud.get_user(db, curr_user.id)
    return crud.get_feed(db, user)

@app.post("/swipe")
def swipe(swipe_data: model.SwipeBase, curr_user = Depends(get_current_user)):
    swipe_data.swipe_by = curr_user.id
    crud.create_swipe(db, swipe_data)
    return {"message": "Swiped"}

@app.get("/matched")
def get_mathches(curr_user = Depends(get_current_user)):
    return crud.get_matches(db, curr_user.id)
    
    
