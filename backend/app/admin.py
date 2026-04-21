from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import models

router = APIRouter(prefix="/admin/analytics", tags=["Admin Analytics"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/events")
def event_stats(db: Session = Depends(get_db)):
    """Return total number of events created"""
    total_events = db.query(models.Event).count()
    return {"total_events": total_events}

@router.get("/revenue")
def revenue_stats(db: Session = Depends(get_db)):
    """Return total revenue from bookings (example: assume each booking = 100 units)"""
    total_bookings = db.query(models.Booking).count()
    total_revenue = total_bookings * 100  # adjust logic as needed
    return {"total_revenue": total_revenue}

# ✅ Admin endpoint to delete an event
@router.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    """Delete an event and cascade delete its bookings"""
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()
    return {"msg": f"Event {event_id} deleted successfully"}
