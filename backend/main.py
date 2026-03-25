"""
arcwove Web Agency — FastAPI Backend
Conoha VPS · FastAPI · PostgreSQL · Stripe · Resend

Run:
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Endpoints:
    POST /api/checkout/session     → Create Stripe Checkout session
    POST /api/webhook/stripe       → Stripe Webhook (checkout.session.completed)
    GET  /api/counseling/{token}   → Fetch user info for counseling form
    POST /api/counseling/{token}   → Submit counseling answers
    GET  /api/admin/users          → Admin: list all users + status
    PUT  /api/admin/users/{id}/review → Admin: mark counseling as reviewed
    GET  /health                   → Health check
"""

import json
import os
import secrets
import httpx
from dotenv import load_dotenv

load_dotenv()
from datetime import datetime, timedelta, timezone
from typing import Any

import asyncpg
import stripe
from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr

# ─────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────
STRIPE_SECRET_KEY      = os.environ["STRIPE_SECRET_KEY"]
STRIPE_WEBHOOK_SECRET  = os.environ["STRIPE_WEBHOOK_SECRET"]
RESEND_API_KEY         = os.environ["RESEND_API_KEY"]
DATABASE_URL           = os.environ["DATABASE_URL"]
FRONTEND_URL           = os.getenv("FRONTEND_URL", "https://yoursite.pages.dev")
FROM_EMAIL             = os.getenv("FROM_EMAIL", "noreply@yourdomain.com")
ADMIN_SECRET           = os.environ["ADMIN_SECRET"]

stripe.api_key = STRIPE_SECRET_KEY

# Stripe price IDs per plan per currency (set in .env)
PRICE_IDS: dict[str, dict[str, str]] = {
    "starter":  {"JPY": os.environ["STRIPE_PRICE_STARTER_JPY"],  "USD": os.environ["STRIPE_PRICE_STARTER_USD"]},
    "standard": {"JPY": os.environ["STRIPE_PRICE_STANDARD_JPY"], "USD": os.environ["STRIPE_PRICE_STANDARD_USD"]},
    "growth":   {"JPY": os.environ["STRIPE_PRICE_GROWTH_JPY"],   "USD": os.environ["STRIPE_PRICE_GROWTH_USD"]},
}

FORM_DEADLINE_HOURS = 48

# ─────────────────────────────────────────────
# App
# ─────────────────────────────────────────────
app = FastAPI(title="arcwove API")

from urllib.parse import urlparse
_origin = urlparse(FRONTEND_URL)
_base = f"{_origin.scheme}://{_origin.netloc}"
# ローカル開発時はViteのポートが5173〜5175の範囲でずれる場合があるため複数許可
CORS_ORIGINS = [_base] + (
    [f"{_origin.scheme}://localhost:5173",
     f"{_origin.scheme}://localhost:5174",
     f"{_origin.scheme}://localhost:5175"]
    if "localhost" in _origin.netloc else []
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_pool: asyncpg.Pool | None = None

@app.on_event("startup")
async def startup():
    global _pool
    _pool = await asyncpg.create_pool(DATABASE_URL, min_size=2, max_size=10)

@app.on_event("shutdown")
async def shutdown():
    if _pool:
        await _pool.close()

def pool() -> asyncpg.Pool:
    assert _pool is not None, "DB pool not initialised"
    return _pool

# ─────────────────────────────────────────────
# Email templates (ja / en / es / fr / ko / zh-hans)
# ─────────────────────────────────────────────
def _email_content(language: str, form_url: str, deadline_str: str, plan_id: str) -> dict[str, str]:
    plan_labels = {
        "ja":      {"starter": "Starter プラン", "standard": "Standard プラン", "growth": "Growth プラン"},
        "en":      {"starter": "Starter Plan",   "standard": "Standard Plan",   "growth": "Growth Plan"},
        "es":      {"starter": "Plan Starter",   "standard": "Plan Standard",   "growth": "Plan Growth"},
        "fr":      {"starter": "Formule Starter","standard": "Formule Standard","growth": "Formule Growth"},
        "ko":      {"starter": "스타터 플랜",      "standard": "스탠다드 플랜",    "growth": "그로스 플랜"},
        "zh-hans": {"starter": "入门方案",         "standard": "标准方案",         "growth": "成长方案"},
    }
    lang = language if language in plan_labels else "en"
    plan_name = plan_labels[lang].get(plan_id, plan_id)

    templates: dict[str, dict[str, str]] = {
        "ja": {
            "subject": f"【arcwove】カウンセリングシートのご提出をお願いします（期限：{deadline_str}）",
            "body": f"""この度は arcwove をご利用いただきありがとうございます。

{plan_name} のお申し込みを確認いたしました。
制作を開始するにあたり、以下のURLからカウンセリングシートのご入力をお願いいたします。

▼ カウンセリングシート
{form_url}

■ 期限：{deadline_str} まで
期限内にご提出いただけない場合、制作を一時停止させていただく場合があります。

ご不明な点はメールにてお気軽にご連絡ください。
どうぞよろしくお願いいたします。

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
        "en": {
            "subject": f"[arcwove] Please submit your counseling sheet (deadline: {deadline_str})",
            "body": f"""Thank you for choosing arcwove.

We have confirmed your {plan_name} subscription.
To begin production, please complete the counseling sheet at the link below.

▼ Counseling Sheet
{form_url}

■ Deadline: {deadline_str}
If we do not receive your submission by the deadline, production may be paused.

Please feel free to reply to this email with any questions.

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
        "es": {
            "subject": f"[arcwove] Por favor envíe su ficha de consultoría (fecha límite: {deadline_str})",
            "body": f"""Gracias por elegir arcwove.

Hemos confirmado su suscripción al {plan_name}.
Para comenzar la producción, complete la ficha de consultoría en el enlace de abajo.

▼ Ficha de consultoría
{form_url}

■ Fecha límite: {deadline_str}
Si no recibimos su envío antes de la fecha límite, la producción podrá pausarse.

No dude en responder a este correo si tiene alguna pregunta.

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
        "fr": {
            "subject": f"[arcwove] Veuillez soumettre votre fiche de conseil (date limite : {deadline_str})",
            "body": f"""Merci de choisir arcwove.

Nous avons confirmé votre abonnement à la {plan_name}.
Pour démarrer la production, veuillez remplir la fiche de conseil via le lien ci-dessous.

▼ Fiche de conseil
{form_url}

■ Date limite : {deadline_str}
Sans réception de votre fiche avant l'échéance, la production pourra être suspendue.

N'hésitez pas à nous répondre pour toute question.

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
        "ko": {
            "subject": f"[arcwove] 카운슬링 시트를 제출해 주세요 (마감: {deadline_str})",
            "body": f"""arcwove를 이용해 주셔서 감사합니다.

{plan_name} 구독을 확인했습니다.
제작을 시작하기 위해 아래 링크에서 카운슬링 시트를 작성해 주세요.

▼ 카운슬링 시트
{form_url}

■ 마감: {deadline_str}
마감 내에 제출하지 않으시면 제작이 일시 중단될 수 있습니다.

궁금한 점은 이 이메일로 회신해 주세요.

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
        "zh-hans": {
            "subject": f"[arcwove] 请提交咨询表（截止日期：{deadline_str}）",
            "body": f"""感谢您选择 arcwove。

我们已确认您的 {plan_name} 订阅。
为了开始制作，请通过以下链接填写咨询表。

▼ 咨询表
{form_url}

■ 截止日期：{deadline_str}
如未在截止日期前提交，制作可能会暂停。

如有任何疑问，请直接回复本邮件。

─────────────────────────
arcwove
{FROM_EMAIL}
─────────────────────────
""",
        },
    }
    return templates.get(lang, templates["en"])


def _reminder_content(language: str, form_url: str, deadline_str: str, reminder_num: int) -> dict[str, str]:
    is_final = reminder_num >= 3

    templates: dict[str, dict[str, str]] = {
        "ja": {
            "subject": (
                f"【arcwove】【最終通知】カウンセリングシートの未提出を確認しました（期限：{deadline_str}）"
                if is_final else
                f"【arcwove】【リマインド】カウンセリングシートの提出をお願いします（期限：{deadline_str}）"
            ),
            "body": (
                f"""【最終通知】カウンセリングシートが未提出です。

期限（{deadline_str}）を過ぎると制作を停止いたします。

▼ カウンセリングシート
{form_url}

お急ぎのご対応をお願いいたします。
"""
                if is_final else
                f"""カウンセリングシートがまだ提出されていません。

▼ カウンセリングシート
{form_url}

期限は {deadline_str} です。お早めにご入力ください。
"""
            ),
        },
        "en": {
            "subject": (
                f"[arcwove] [Final Notice] Counseling sheet not yet submitted (deadline: {deadline_str})"
                if is_final else
                f"[arcwove] [Reminder] Please submit your counseling sheet (deadline: {deadline_str})"
            ),
            "body": (
                f"""[Final Notice] Your counseling sheet has not been submitted.

Production will be paused after the deadline ({deadline_str}).

▼ Counseling Sheet
{form_url}

Please submit as soon as possible.
"""
                if is_final else
                f"""Your counseling sheet has not been submitted yet.

▼ Counseling Sheet
{form_url}

Deadline: {deadline_str}. Please complete it at your earliest convenience.
"""
            ),
        },
    }
    lang = language if language in templates else "en"
    return templates[lang]


async def send_email(to: str, subject: str, body: str) -> None:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": f"arcwove <{FROM_EMAIL}>",
                "to": [to],
                "subject": subject,
                "text": body,
            },
            timeout=10,
        )
    if resp.status_code not in (200, 201):
        raise RuntimeError(f"Resend error {resp.status_code}: {resp.text}")

# ─────────────────────────────────────────────
# Schemas
# ─────────────────────────────────────────────
class CheckoutRequest(BaseModel):
    plan_id: str        # starter | standard | growth
    currency: str       # JPY | USD
    locale: str         # ja | en | es | fr | ko | zh-hans
    client_type: str    # individual | corporate


class CounselingSubmit(BaseModel):
    answers: dict[str, Any]


class InquiryBody(BaseModel):
    name: str
    email: EmailStr
    plan: str | None = None   # starter | standard | growth | None
    message: str

# ─────────────────────────────────────────────
# Health
# ─────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok"}

# ─────────────────────────────────────────────
# POST /api/checkout/session
# ─────────────────────────────────────────────
@app.post("/api/checkout/session")
async def create_checkout_session(req: CheckoutRequest):
    if req.plan_id not in PRICE_IDS:
        raise HTTPException(400, "Invalid plan_id")
    if req.currency not in ("JPY", "USD"):
        raise HTTPException(400, "Invalid currency")

    price_id = PRICE_IDS[req.plan_id].get(req.currency)
    if not price_id:
        raise HTTPException(400, "Price not configured for this plan/currency")

    session = stripe.checkout.Session.create(
        mode="subscription",
        payment_method_types=["card"],
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=f"{FRONTEND_URL}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{FRONTEND_URL}/price",
        metadata={
            "plan_id":     req.plan_id,
            "currency":    req.currency,
            "locale":      req.locale,
            "client_type": req.client_type,
        },
        locale=req.locale if req.locale in ("ja", "en", "es", "fr", "ko", "zh") else "auto",
    )
    return {"url": session.url}


# ─────────────────────────────────────────────
# POST /api/webhook/stripe
# ─────────────────────────────────────────────
@app.post("/api/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid Stripe signature")

    if event["type"] != "checkout.session.completed":
        return {"received": True}

    session = event["data"]["object"]
    email       = session.get("customer_details", {}).get("email") or session.get("customer_email")
    customer_name = session.get("customer_details", {}).get("name")
    meta        = session.get("metadata", {})
    plan_id     = meta.get("plan_id", "starter")
    currency    = meta.get("currency", "JPY")
    locale      = meta.get("locale", "ja")
    client_type = meta.get("client_type", "individual")
    amount      = session.get("amount_total", 0)
    stripe_pi   = session.get("payment_intent") or session.get("subscription")

    if not email:
        return {"received": True}

    form_token    = secrets.token_urlsafe(32)
    form_deadline = datetime.now(timezone.utc) + timedelta(hours=FORM_DEADLINE_HOURS)

    async with pool().acquire() as conn:
        # Upsert user (idempotent on re-delivery)
        user = await conn.fetchrow(
            """
            INSERT INTO users (email, name, client_type, language, currency, plan_id, form_token, form_deadline)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (email) DO UPDATE
              SET plan_id       = EXCLUDED.plan_id,
                  form_token    = EXCLUDED.form_token,
                  form_deadline = EXCLUDED.form_deadline,
                  reminder_count = 0
            RETURNING id, form_token, form_deadline
            """,
            email, customer_name, client_type, locale, currency, plan_id, form_token, form_deadline,
        )

        await conn.execute(
            """
            INSERT INTO payments (user_id, stripe_session_id, stripe_payment_intent, plan_id, amount, currency, status)
            VALUES ($1, $2, $3, $4, $5, $6, 'paid')
            ON CONFLICT (stripe_session_id) DO NOTHING
            """,
            user["id"], session["id"], stripe_pi, plan_id, amount, currency,
        )

    deadline_str = form_deadline.strftime("%Y-%m-%d %H:%M UTC")
    form_url     = f"{FRONTEND_URL}/counseling?token={user['form_token']}"
    tpl          = _email_content(locale, form_url, deadline_str, plan_id)

    try:
        await send_email(email, tpl["subject"], tpl["body"])
    except Exception as exc:
        print(f"[email error] {exc}")

    return {"received": True}


# ─────────────────────────────────────────────
# GET /api/counseling/{token}
# ─────────────────────────────────────────────
@app.get("/api/counseling/{token}")
async def get_counseling(token: str):
    async with pool().acquire() as conn:
        user = await conn.fetchrow(
            """
            SELECT u.id, u.email, u.name, u.company_name, u.client_type,
                   u.language, u.plan_id, u.form_deadline,
                   ca.status AS answer_status
            FROM users u
            LEFT JOIN counseling_answers ca ON ca.user_id = u.id
            WHERE u.form_token = $1
            """,
            token,
        )

    if not user:
        raise HTTPException(404, "Invalid or expired token")

    status = user["answer_status"] or "pending"
    return {
        "email":        user["email"],
        "name":         user["name"],
        "company_name": user["company_name"],
        "client_type":  user["client_type"],
        "language":     user["language"],
        "plan_id":      user["plan_id"],
        "deadline":     user["form_deadline"].isoformat() if user["form_deadline"] else None,
        "status":       status,
    }


# ─────────────────────────────────────────────
# POST /api/counseling/{token}
# ─────────────────────────────────────────────
@app.post("/api/counseling/{token}")
async def submit_counseling(token: str, body: CounselingSubmit):
    async with pool().acquire() as conn:
        user = await conn.fetchrow(
            "SELECT id FROM users WHERE form_token = $1",
            token,
        )
        if not user:
            raise HTTPException(404, "Invalid or expired token")

        existing = await conn.fetchrow(
            "SELECT id, status FROM counseling_answers WHERE user_id = $1",
            user["id"],
        )
        if existing and existing["status"] == "reviewed":
            raise HTTPException(409, "Already reviewed — contact support to update")

        answers_json = json.dumps(body.answers, ensure_ascii=False)
        if existing:
            await conn.execute(
                "UPDATE counseling_answers SET answers = $1, submitted_at = NOW(), status = 'submitted' WHERE user_id = $2",
                answers_json, user["id"],
            )
        else:
            await conn.execute(
                "INSERT INTO counseling_answers (user_id, answers) VALUES ($1, $2)",
                user["id"], answers_json,
            )

    return {"success": True}


# ─────────────────────────────────────────────
# POST /api/inquiry  (public — pre-sales contact)
# ─────────────────────────────────────────────
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", FROM_EMAIL)

@app.post("/api/inquiry")
async def post_inquiry(body: InquiryBody):
    plan_label = {"starter": "Starter ¥10,000", "standard": "Standard ¥15,000", "growth": "Growth ¥20,000"}.get(body.plan or "", "未選択")
    text = f"""arcwove 無料相談フォームに問い合わせがありました。

━━━━━━━━━━━━━━━━━━━━━━━━
お名前    : {body.name}
メール    : {body.email}
興味プラン: {plan_label}
━━━━━━━━━━━━━━━━━━━━━━━━

【メッセージ】
{body.message}

─────────────────────────
arcwove 自動通知
─────────────────────────
"""
    try:
        await send_email(ADMIN_EMAIL, f"【arcwove 相談】{body.name} 様より", text)
    except Exception as exc:
        print(f"[inquiry email error] {exc}")

    return {"ok": True}


# ─────────────────────────────────────────────
# GET /api/admin/users  (protected)
# ─────────────────────────────────────────────
@app.get("/api/admin/users")
async def admin_list_users(x_admin_secret: str = Header(None)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(403, "Forbidden")

    async with pool().acquire() as conn:
        rows = await conn.fetch(
            """
            SELECT u.id, u.email, u.name, u.company_name, u.client_type,
                   u.language, u.plan_id, u.form_deadline, u.reminder_count,
                   u.created_at,
                   ca.status AS answer_status,
                   ca.submitted_at
            FROM users u
            LEFT JOIN counseling_answers ca ON ca.user_id = u.id
            ORDER BY u.created_at DESC
            """,
        )

    return [dict(r) for r in rows]


# ─────────────────────────────────────────────
# PUT /api/admin/users/{user_id}/review  (protected)
# ─────────────────────────────────────────────
@app.put("/api/admin/users/{user_id}/review")
async def admin_mark_reviewed(user_id: int, x_admin_secret: str = Header(None)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(403, "Forbidden")

    async with pool().acquire() as conn:
        updated_id = await conn.fetchval(
            "UPDATE counseling_answers SET status = 'reviewed', reviewed_at = NOW() WHERE user_id = $1 RETURNING id",
            user_id,
        )
    if updated_id is None:
        raise HTTPException(404, "No counseling answer found for this user")

    return {"success": True}
