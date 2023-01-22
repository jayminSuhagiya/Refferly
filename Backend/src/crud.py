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

    