from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError
from typing import Annotated
from .db import get_db
from .security import decode_token
from . import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Session = Depends(get_db),
) -> models.User:
    cred_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        uid = payload.get("uid")
        if uid is None:
            raise cred_exception
    except JWTError:
        raise cred_exception
    
    user = db.query(models.User).filter(models.User.id == uid).first()
    if user is None:
        raise cred_exception
    return user