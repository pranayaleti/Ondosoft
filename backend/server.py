import os
import logging
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "ondosoft")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]


class NewsletterSubscribe(BaseModel):
    email: EmailStr


class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    message: str = ""
    source: str = "website"


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/newsletter/subscribe")
async def newsletter_subscribe(payload: NewsletterSubscribe):
    email = payload.email.lower().strip()

    existing = db.newsletter_subscribers.find_one({"email": email}, {"_id": 0})
    if existing:
        return {"status": "already_subscribed", "message": "You're already subscribed!"}

    subscriber = {
        "email": email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
        "status": "active",
        "source": "homepage",
    }
    db.newsletter_subscribers.insert_one(subscriber)

    if RESEND_API_KEY:
        try:
            import resend
            resend.api_key = RESEND_API_KEY
            resend.Emails.send({
                "from": SENDER_EMAIL,
                "to": [email],
                "subject": "Welcome to Ondosoft Engineering Insights",
                "html": f"""
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#0a0a0a;color:#f5f5f5;">
                  <h1 style="color:#f97316;margin-bottom:16px;">Welcome to Ondosoft!</h1>
                  <p style="color:#d1d5db;line-height:1.6;">
                    Thanks for subscribing to our Engineering Insights newsletter.
                    You'll receive bi-weekly updates on product engineering, scaling strategies, and AI integration.
                  </p>
                  <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
                    Ondosoft &mdash; Custom Software &amp; AI Development
                  </p>
                </div>
                """,
            })
            logger.info(f"Welcome email sent to {email}")
        except Exception as e:
            logger.warning(f"Resend email failed (non-blocking): {e}")

    return {"status": "subscribed", "message": "You're in! Check your inbox."}


@app.get("/api/newsletter/subscribers")
async def get_subscribers():
    subs = list(db.newsletter_subscribers.find({}, {"_id": 0}))
    return {"subscribers": subs, "total": len(subs)}


@app.post("/api/contact/submit")
async def contact_submit(payload: ContactSubmission):
    lead = {
        "name": payload.name,
        "email": payload.email.lower().strip(),
        "phone": payload.phone,
        "company": payload.company,
        "message": payload.message,
        "source": payload.source,
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    db.contact_leads.insert_one(lead)
    return {"status": "success", "message": "Thank you! We'll get back to you within 24 hours."}
