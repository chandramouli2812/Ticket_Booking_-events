from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from pydantic import BaseModel
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "secret"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str = "user"

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    hashed_pw = pwd_context.hash(data.password)
    user = models.User(username=data.username, password=hashed_pw, role=data.role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User registered", "user": user.username}

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == data.username).first()
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode(
        {"sub": user.username, "exp": datetime.utcnow() + timedelta(hours=1)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return {"access_token": token}

@router.get("/me")
def me(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"user": payload["sub"]}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import jwt, JWTError
# from datetime import datetime, timedelta
# from pydantic import BaseModel
# from .database import SessionLocal
# from . import models

# router = APIRouter(prefix="/auth", tags=["Auth"])

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# SECRET_KEY = "secret"   # replace with a secure key in production
# ALGORITHM = "HS256"

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # -----------------------------
# # Pydantic Schemas
# # -----------------------------
# class RegisterRequest(BaseModel):
#     username: str
#     password: str
#     role: str = "user"

# class LoginRequest(BaseModel):
#     username: str
#     password: str

# # -----------------------------
# # Endpoints
# # -----------------------------
# # @router.post("/register")
# # def register(data: RegisterRequest, db: Session = Depends(get_db)):
# #     if len(data.password) > 72:
# #         raise HTTPException(status_code=400, detail="Password too long (max 72 characters)")
# #     hashed_pw = pwd_context.hash(data.password)
# #     user = models.User(username=data.username, password=hashed_pw, role=data.role)
# #     db.add(user)
# #     db.commit()
# #     db.refresh(user)
# #     return {"msg": "User registered", "user": user.username}
# @router.post("/register")
# def register(data: RegisterRequest, db: Session = Depends(get_db)):
#     # Check if username already exists
#     existing_user = db.query(models.User).filter(models.User.username == data.username).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already taken")

#     if len(data.password) > 72:
#         raise HTTPException(status_code=400, detail="Password too long (max 72 characters)")

#     hashed_pw = pwd_context.hash(data.password)
#     user = models.User(username=data.username, password=hashed_pw, role=data.role)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return {"msg": "User registered", "user": user.username}

# @router.post("/login")
# def login(data: LoginRequest, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.username == data.username).first()
#     if not user or not pwd_context.verify(data.password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     token = jwt.encode(
#         {"sub": user.username, "exp": datetime.utcnow() + timedelta(hours=1)},
#         SECRET_KEY,
#         algorithm=ALGORITHM,
#     )
#     return {"access_token": token}

# @router.get("/me")
# def me(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return {"user": payload["sub"]}
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")
