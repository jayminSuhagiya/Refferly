from sqlalchemy.orm import Session
import models as models
import orms as orms


def get_user(db: Session, user_id: int):
    return db.query(orms.User).filter(orms.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(orms.User).filter(orms.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(orms.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: models.User):
    user = orms.User(**user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def update_user(db: Session, user: orms.User, user_data: models.UserBase):
    for var, value in vars(user_data).items():
        setattr(user, var, value) if value else None
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_feed(db: Session, user: orms.User):
    looking_for = 1 if user.type == 0 else 0
    swiped_on = db.query(orms.Swipe).filter(orms.Swipe.swipe_by == user.id).with_entities(orms.Swipe.swipe_on).all()
    swiped_on = [data.swipe_on for data in swiped_on]
    data = db.query(orms.User).filter(orms.User.type == looking_for).filter(orms.User.id.not_in(swiped_on)).all()
    result = []
    for user_data in data:
        if any(x in user.positions for x in user_data.positions):
            result.append(user_data)
    return result
    
    
def create_swipe(db: Session, swipe_data):
    data = orms.Swipe(swipe_by=swipe_data.swipe_by, swipe_on=swipe_data.swipe_on, type=swipe_data.type)
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

def get_matches(db, id):
    ids = db.query(orms.Swipe).filter(orms.Swipe.swipe_by == id).filter(orms.Swipe.type == 1).all()
    ids = [data.swipe_on for data in ids]
    ids = db.query(orms.Swipe).filter(orms.Swipe.swipe_by.in_(ids)).filter(orms.Swipe.swipe_on == id).filter(orms.Swipe.type == 1).all()
    ids = [data.swipe_by for data in ids]
    return db.query(orms.User).filter(orms.User.id.in_(ids)).all()

    
def is_matched(db, swipe_data):
    data = db.query(orms.Swipe).filter(orms.Swipe.type == 1).filter(orms.Swipe.swipe_by == swipe_data.swipe_on).filter(orms.Swipe.swipe_on == swipe_data.swipe_by).all()
    if data:
        return True
    return False
    