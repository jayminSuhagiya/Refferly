from pydantic import BaseModel
from typing import Optional, List, Dict


class UserBase(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str]
    linkedin: str
    resume: str
    portfolio: Optional[str]
    type: str
    positions:List[str]
    about: str
    languages: Optional[str]
    skills: Optional[str]
    title: str
    affiliation: Optional[str]
    
    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    class Config:
        orm_mode = True
    
class LoginReq(BaseModel):
    email: str
    password: str

class SwipeBase(BaseModel):
    swipe_by: int
    swipe_on: int

class Swipe(SwipeBase):
    id: int
    
    class Config:
        orm_mode = True

class TokenData(BaseModel):
    id: int
    email: str
    name: str
