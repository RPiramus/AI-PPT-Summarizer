from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from ..db import get_db
from .. import models, schemas
from ..security import hash_password, verify_password, create_access_token, decode_token
from ..dependency import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    exists = db.query(models.User).filter(models.User.email == payload.email).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user = models.User(
        email=payload.email,
        full_name=payload.full_name,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=schemas.TokenOut)
def login (
    payload: schemas.UserLogin,
    db: Session = Depends(get_db)
):
   user = db.query(models.User).filter(models.User.email == payload.email).first()
   if not user or not verify_password(payload.password, user.password_hash):
       raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
   token = create_access_token({"sub": user.email, "uid": user.id})
   return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
async def read_me(current_user: Annotated[models.User, Depends(get_current_user)]):
    return schemas.UserOut.model_validate(current_user)

@router.post("/token", response_model=schemas.TokenOut)
def login_form(
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(models.User).filter(models.User.email == form.username).first()
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": user.email, "uid": user.id})
    return {"access_token": token, "token_type": "bearer"}

    