from fastapi import FastAPI, HTTPException, Depends
import models as model
from database import db
import crud as crud
from auth import create_access_token, get_current_user
import utils as utils
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/sign-up", response_model=model.User)
def home(user: model.UserBase):
    user.type = utils.ref_type(user.type)
    is_available = crud.get_user_by_email(db, user.email)
    if is_available:
        raise HTTPException(status_code=404, detail="User already exists.")
    return crud.create_user(db, user)


@app.post("/login")
def login(login_req: model.LoginReq):
    user = crud.get_user_by_email(db, login_req.email)
    if not user:
        raise HTTPException(status_code=400, detail="Email is not registered.")
    if user.password != login_req.password:
        raise HTTPException(status_code=400, detail="Password does not match.")
    access_token = create_access_token(
        {"id": user.id, "email": user.email, "name": user.name}
    )
    return {"token": access_token, "type": "Bearer"}


@app.get("/user/{user_id}", response_model=model.User)
def get_user(curr_user=Depends(get_current_user)):
    user = crud.get_user(db, curr_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user


@app.put("/user/{user_id}", response_model=model.User)
def update_user(
    user_data: model.UserBase, curr_user=Depends(get_current_user)
):
    user_data.type = utils.ref_type(user_data.type)
    user = crud.get_user(db, curr_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return crud.update_user(db, user, user_data)


@app.get("/feed/{user_id}")
def feed(curr_user=Depends(get_current_user)):
    user = crud.get_user(db, curr_user.id)
    return crud.get_feed(db, user)
