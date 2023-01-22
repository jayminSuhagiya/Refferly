from fastapi import FastAPI
import models as model
from database import db
from orms import User
import crud as crud


app = FastAPI()


@app.post("/sign-up", response_model = model.User)
def home(user: model.User):
    try:
        user = crud.get_user_by_email(db, user.email)
        print(user)
        # return crud.create_user(db, user)
    except:
        pass
