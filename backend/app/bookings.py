from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/bookings", tags=["Bookings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class BookingRequest(BaseModel):
    event_id: int
    user_id: int

@router.post("/")
def create_booking(data: BookingRequest, db: Session = Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id == data.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if len(event.bookings) >= event.capacity:
        raise HTTPException(status_code=400, detail="Event full")

    booking = models.Booking(event_id=data.event_id, user_id=data.user_id, status="pending")
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return {"msg": "Booking created", "booking_id": booking.id, "status": booking.status}

@router.get("/my-bookings")
def my_bookings(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Booking).filter(models.Booking.user_id == user_id).all()

# ✅ New endpoint to change booking status
class StatusUpdateRequest(BaseModel):
    status: str  # e.g. "confirmed", "cancelled"

@router.put("/{booking_id}/status")
def update_booking_status(booking_id: int, data: StatusUpdateRequest, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = data.status
    db.commit()
    db.refresh(booking)
    return {"msg": "Status updated", "booking_id": booking.id, "status": booking.status}
