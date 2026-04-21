from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from . import payments
from . import auth, events, bookings, notifications
from . import admin


app = FastAPI()

# Allow frontend (React dev server) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(bookings.router)
app.include_router(notifications.router)
app.include_router(admin.router)
app.include_router(payments.router)
