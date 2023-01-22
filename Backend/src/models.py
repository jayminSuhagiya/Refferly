from pydantic import BaseModel
from typing import Optional, List, Dict


class User(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str]
    linkedin: str
    resume: str
    portfolio_link: Optional[str]
    about_me: str
    languages: Optional[str]
    my_skills: Optional[str]
    title: str
    company: Optional[str]
    university: Optional[str]
    
    class Config:
        orm_mode = True


# class User()
