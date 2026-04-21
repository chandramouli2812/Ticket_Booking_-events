from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/events", tags=["Events"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class EventRequest(BaseModel):
    title: str
    description: str
    capacity: int

@router.post("/")
def create_event(data: EventRequest, db: Session = Depends(get_db)):
    event = models.Event(title=data.title, description=data.description, capacity=data.capacity)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.get("/")
def list_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()

@router.get("/{event_id}")
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event