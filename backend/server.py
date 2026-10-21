import asyncio
import html
import logging
import os
import re
import smtplib
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB Atlas connection (MONGO_URL / DB_NAME come from backend/.env)
mongo_url = os.environ.get("MONGO_URL", "").strip()
if not mongo_url:
    raise RuntimeError("MONGO_URL is missing. Add it to backend/.env")
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[os.environ.get("DB_NAME", "creativevox")]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="CreativeVox Media API")
api_router = APIRouter(prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
FALLBACK_EMAIL = "team@creativevoxmedia.com"


# ---------------------------------------------------------------------------
# Request model (what the website form sends)
# ---------------------------------------------------------------------------
class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str
    email: str
    phone: str = ""
    service: str = ""
    budget: str = ""
    message: str
    website: str = ""  # honeypot: real users never fill this


def _one_line(value: str) -> str:
    """Collapse newlines/tabs so user text can never inject email headers."""
    return " ".join(value.split())


# ---------------------------------------------------------------------------
# Email sending (SMTP). All settings come from backend/.env
#   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD   -> your mail account
#   CONTACT_TO_EMAIL                                 -> inbox that receives enquiries
# ---------------------------------------------------------------------------
def send_enquiry_email(data: dict) -> None:
    """Send one enquiry email. Raises on any failure."""
    host = os.environ.get("SMTP_HOST", "").strip()
    user = os.environ.get("SMTP_USER", "").strip()
    password = os.environ.get("SMTP_PASSWORD", "")
    if not host or not user or not password:
        raise RuntimeError("SMTP is not configured (check SMTP_* in backend/.env)")

    port = int(os.environ.get("SMTP_PORT", "587"))
    to_email = os.environ.get("CONTACT_TO_EMAIL", "").strip() or user
    from_email = os.environ.get("SMTP_FROM_EMAIL", "").strip() or user
    from_name = os.environ.get("SMTP_FROM_NAME", "CreativeVox Website")

    name, email = data["name"], data["email"]
    phone = data["phone"] or "-"
    service = data["service"] or "-"
    budget = data["budget"] or "-"
    message = data["message"]

    plain = (
        "New enquiry from the CreativeVox Media website\n\n"
        f"Name: {name}\nEmail: {email}\nPhone: {phone}\n"
        f"Service: {service}\nBudget: {budget}\n\nMessage:\n{message}\n"
    )

    e = html.escape  # user text must never be injected as raw HTML
    rows = "".join(
        f'<tr><td style="padding:8px 0;font-weight:bold;width:90px">{label}</td>'
        f'<td style="padding:8px 0">{e(value)}</td></tr>'
        for label, value in (
            ("Name", name), ("Email", email), ("Phone", phone),
            ("Service", service), ("Budget", budget),
        )
    )
    html_body = f"""
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto">
      <h2 style="color:#E10600;margin-bottom:4px">New enquiry</h2>
      <p style="color:#888;margin-top:0">CreativeVox Media website: contact form</p>
      <table style="width:100%;border-collapse:collapse;color:#222">{rows}</table>
      <p style="font-weight:bold;margin-bottom:4px">Message</p>
      <p style="white-space:pre-wrap;background:#f6f6f6;padding:14px;border-radius:10px">{e(message)}</p>
    </div>
    """

    mail = MIMEMultipart("alternative")
    mail["Subject"] = f"New enquiry: {_one_line(name)}"
    mail["From"] = f"{from_name} <{from_email}>"
    mail["To"] = to_email
    mail["Reply-To"] = email  # hit "Reply" and you answer the customer directly
    mail.attach(MIMEText(plain, "plain", "utf-8"))
    mail.attach(MIMEText(html_body, "html", "utf-8"))

    if port == 465:
        with smtplib.SMTP_SSL(host, port, timeout=10) as server:
            server.login(user, password)
            server.sendmail(from_email, [to_email], mail.as_string())
    else:
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(user, password)
            server.sendmail(from_email, [to_email], mail.as_string())


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "CreativeVox Media API is running"}


@api_router.get("/health")
async def health():
    """Open /api/health to check the MongoDB connection."""
    try:
        await client.admin.command("ping")
        return {"status": "ok", "database": True}
    except Exception:
        logger.exception("MongoDB ping failed")
        return {"status": "degraded", "database": False}


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    # Honeypot filled -> almost certainly a bot. Pretend success, send nothing.
    if payload.website.strip():
        return {"success": True, "message": "Thanks! Your message has been received."}

    data = {
        "name": _one_line(payload.name),
        "email": payload.email.strip().lower(),
        "phone": _one_line(payload.phone),
        "service": _one_line(payload.service),
        "budget": _one_line(payload.budget),
        "message": payload.message.strip(),
    }

    if len(data["name"]) < 2:
        raise HTTPException(status_code=422, detail="Please enter your name.")
    if not EMAIL_RE.match(data["email"]):
        raise HTTPException(status_code=422, detail="Please enter a valid email address.")
    if len(data["message"]) < 10:
        raise HTTPException(status_code=422, detail="Please write a message of at least 10 characters.")
    if len(data["message"]) > 5000:
        raise HTTPException(status_code=422, detail="Your message is too long (max 5000 characters).")

    # 1) Save to MongoDB first, so the enquiry is never lost
    saved_id = None
    try:
        doc = {
            **data,
            "status": "new",  # new -> contacted -> closed
            "emailed": False,
            "created_at": datetime.now(timezone.utc),
        }
        result = await db.contact_submissions.insert_one(doc)
        saved_id = result.inserted_id
    except Exception:
        logger.exception("Could not save enquiry to MongoDB")

    # 2) Then email it (smtplib is blocking, so run it off the event loop)
    emailed = False
    try:
        await asyncio.to_thread(send_enquiry_email, data)
        emailed = True
    except Exception:
        logger.exception("Could not send enquiry email")

    if saved_id is not None and emailed:
        try:
            await db.contact_submissions.update_one(
                {"_id": saved_id}, {"$set": {"emailed": True}}
            )
        except Exception:
            logger.exception("Could not mark enquiry as emailed")

    # Only fail if BOTH the database and the email failed
    if saved_id is None and not emailed:
        to_show = os.environ.get("CONTACT_TO_EMAIL", "").strip() or FALLBACK_EMAIL
        raise HTTPException(
            status_code=500,
            detail=f"Could not send your message right now. Please email us directly at {to_show}",
        )

    logger.info("Enquiry handled (saved=%s, emailed=%s)", saved_id is not None, emailed)
    return {
        "success": True,
        "message": "Thanks! Your message has been sent. We'll get back to you within 24 hours.",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",")],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()