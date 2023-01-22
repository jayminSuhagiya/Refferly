from database import Base, engine
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import ARRAY

class User(Base):
    __tablename__ = "r_user"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    phone = Column(String(100), nullable=True)
    linkedin = Column(String(100), nullable=False)
    resume = Column(String(100), nullable=False)
    portfolio = Column(String(100), nullable=True)
    type = Column(Integer, nullable=True)
    positions= Column(ARRAY(String,dimensions=1), nullable=True)
    about = Column(String(100), nullable=False)
    languages = Column(String(100), nullable=True)
    skills = Column(String(100), nullable=True)
    title = Column(String(100), nullable=False)
    affiliation = Column(String(100), nullable=True)

class Swipe(Base):
    __tablename__ = "swipe"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    swipe_by: Column(Integer, nullable=False)
    swipe_on: Column(Integer, nullable=False)


Base.metadata.create_all(bind=engine)
