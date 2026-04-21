from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/payments", tags=["Payments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PaymentRequest(BaseModel):
    booking_id: int
    amount: float

@router.post("/")
def make_payment(data: PaymentRequest, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == data.booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "confirmed"
    db.commit()
    db.refresh(booking)

    # Create notification
    notif = models.Notification(user_id=booking.user_id, message=f"Your booking for {booking.event.title} is confirmed!")
    db.add(notif)
    db.commit()

    return {"msg": "Payment successful", "booking_id": booking.id, "status": booking.status}
