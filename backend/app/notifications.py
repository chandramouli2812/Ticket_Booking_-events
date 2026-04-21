from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/notifications", tags=["Notifications"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    """
    Fetch notifications for a given user.
    """
    notifications = db.query(models.Notification).filter(models.Notification.user_id == user_id).all()
    return notifications
@router.get("/")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).all()

@router.post("/")
def create_notification(user_id: int, message: str, db: Session = Depends(get_db)):
    """
    Create a new notification for a user.
    """
    notif = models.Notification(user_id=user_id, message=message)
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return {"msg": "Notification created", "notification": notif}
