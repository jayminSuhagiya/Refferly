from database import Base, engine
from sqlalchemy import Column, String, Integer

class User(Base):
    __tablename__ = "r_user"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    phone = Column(String(100), nullable=True)
    linkedin = Column(String(100), nullable=False)
    resume = Column(String(100), nullable=False)
    portfolio_link = Column(String(100), nullable=True)
    about_me = Column(String(100), nullable=False)
    languages = Column(String(100), nullable=False)
    my_skills = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    university = Column(String(100), nullable=True)

Base.metadata.create_all(bind=engine)
