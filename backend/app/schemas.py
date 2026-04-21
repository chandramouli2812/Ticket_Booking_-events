from pydantic import BaseModel
from datetime import datetime

class BookingRequest(BaseModel):
    event_id: int
    user_id: int

class BookingResponse(BaseModel):
    id: int
    event_title: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
