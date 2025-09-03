from passlib.context import CryptContext
from jose import jwt, JWTError
from typing import Dict, Any
from datetime import datetime, timedelta, timezone

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pw: str) -> str:
    return pwd_ctx.hash(pw)

def verify_password(pw: str, pw_hash: str) -> bool:
    return pwd_ctx.verify(pw, pw_hash)

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(
    claims: Dict[str, Any],
    expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES,
) -> str:
    to_encode = claims.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def decode_token(token: str) -> Dict[str, Any]:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload