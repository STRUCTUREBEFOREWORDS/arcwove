"""
arcwove Web Agency — Reminder Batch Script

Run via cron every 30 minutes:
    */30 * * * * /path/to/venv/bin/python /path/to/reminder.py >> /var/log/structure-reminder.log 2>&1

Logic:
    - 24h after payment  → reminder #1 (reminder_count = 0)
    - 36h after payment  → reminder #2 (reminder_count = 1)
    - 48h at deadline    → final warning (reminder_count = 2)

Only targets users with no submitted counseling_answers.
"""

import asyncio
import os
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

import asyncpg
import httpx

DATABASE_URL = os.environ["DATABASE_URL"]
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@yourdomain.com")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://yoursite.pages.dev")


def _format_deadline(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d %H:%M UTC")


def _build_email(language: str, form_url: str, deadline_str: str, reminder_num: int) -> dict[str, str]:
    is_final = reminder_num >= 3

    templates = {
        "ja": {
            "subject": (
                f"【arcwove】【最終通知】カウンセリングシートが未提出です（期限：{deadline_str}）"
                if is_final else
                f"【arcwove】【リマインド{reminder_num}】カウンセリングシートをご提出ください（期限：{deadline_str}）"
            ),
            "body": (
                f"""【最終通知】

カウンセリングシートが期限（{deadline_str}）までに提出されない場合、
制作を一時停止いたします。

▼ カウンセリングシート
{form_url}

至急のご対応をお願いいたします。

─────────────────────────
arcwove
"""
                if is_final else
                f"""【リマインド{reminder_num}】

カウンセリングシートがまだ提出されていません。
期限は {deadline_str} です。

▼ カウンセリングシート
{form_url}

お早めにご記入いただけますようお願いいたします。

─────────────────────────
arcwove
"""
            ),
        },
        "en": {
            "subject": (
                f"[arcwove] [Final Notice] Counseling sheet not submitted (deadline: {deadline_str})"
                if is_final else
                f"[arcwove] [Reminder {reminder_num}] Please submit your counseling sheet (deadline: {deadline_str})"
            ),
            "body": (
                f"""[Final Notice]

If your counseling sheet is not submitted by {deadline_str},
production will be paused.

▼ Counseling Sheet
{form_url}

Please act immediately.

─────────────────────────
arcwove
"""
                if is_final else
                f"""[Reminder {reminder_num}]

Your counseling sheet has not been submitted yet.
Deadline: {deadline_str}

▼ Counseling Sheet
{form_url}

Please complete it as soon as possible.

─────────────────────────
arcwove
"""
            ),
        },
        "es": {
            "subject": (
                f"[arcwove] [Aviso final] Ficha de consultoría no enviada (fecha límite: {deadline_str})"
                if is_final else
                f"[arcwove] [Recordatorio {reminder_num}] Envíe su ficha de consultoría (fecha límite: {deadline_str})"
            ),
            "body": (
                f"[Aviso final]\n\nSi no envía la ficha antes de {deadline_str}, la producción se pausará.\n\n{form_url}\n"
                if is_final else
                f"[Recordatorio {reminder_num}]\n\nSu ficha aún no ha sido enviada. Fecha límite: {deadline_str}\n\n{form_url}\n"
            ),
        },
        "fr": {
            "subject": (
                f"[arcwove] [Dernier rappel] Fiche de conseil non soumise (date limite : {deadline_str})"
                if is_final else
                f"[arcwove] [Rappel {reminder_num}] Soumettez votre fiche de conseil (date limite : {deadline_str})"
            ),
            "body": (
                f"[Dernier rappel]\n\nSans soumission avant {deadline_str}, la production sera suspendue.\n\n{form_url}\n"
                if is_final else
                f"[Rappel {reminder_num}]\n\nVotre fiche n'a pas encore été soumise. Date limite : {deadline_str}\n\n{form_url}\n"
            ),
        },
        "ko": {
            "subject": (
                f"[arcwove] [최종 알림] 카운슬링 시트 미제출 (마감: {deadline_str})"
                if is_final else
                f"[arcwove] [리마인드 {reminder_num}] 카운슬링 시트를 제출해 주세요 (마감: {deadline_str})"
            ),
            "body": (
                f"[최종 알림]\n\n{deadline_str}까지 제출하지 않으면 제작이 중단됩니다.\n\n{form_url}\n"
                if is_final else
                f"[리마인드 {reminder_num}]\n\n카운슬링 시트가 아직 제출되지 않았습니다. 마감: {deadline_str}\n\n{form_url}\n"
            ),
        },
        "zh-hans": {
            "subject": (
                f"[arcwove] [最终通知] 咨询表未提交（截止日期：{deadline_str}）"
                if is_final else
                f"[arcwove] [提醒 {reminder_num}] 请提交咨询表（截止日期：{deadline_str}）"
            ),
            "body": (
                f"[最终通知]\n\n如在 {deadline_str} 前未提交咨询表，制作将暂停。\n\n{form_url}\n"
                if is_final else
                f"[提醒 {reminder_num}]\n\n您的咨询表尚未提交。截止日期：{deadline_str}\n\n{form_url}\n"
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


async def run_reminders():
    now = datetime.now(timezone.utc)
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=3)

    try:
        async with pool.acquire() as conn:
            # Users who have NOT submitted and have a deadline set
            rows = await conn.fetch(
                """
                SELECT u.id, u.email, u.language, u.form_token,
                       u.form_deadline, u.reminder_count, u.created_at
                FROM users u
                LEFT JOIN counseling_answers ca ON ca.user_id = u.id
                WHERE (ca.id IS NULL)
                  AND u.form_deadline IS NOT NULL
                  AND u.reminder_count < 3
                """,
            )

        sent = 0
        for row in rows:
            created_at: datetime = row["created_at"].replace(tzinfo=timezone.utc)
            deadline: datetime   = row["form_deadline"].replace(tzinfo=timezone.utc)
            hours_elapsed        = (now - created_at).total_seconds() / 3600
            reminder_count: int  = row["reminder_count"]

            # Determine if a new reminder should be sent
            # reminder_count 0 → send at 24h
            # reminder_count 1 → send at 36h
            # reminder_count 2 → send at 48h (deadline)
            thresholds = {0: 24, 1: 36, 2: 48}
            threshold = thresholds.get(reminder_count)
            if threshold is None:
                continue
            if hours_elapsed < threshold:
                continue

            form_url = f"{FRONTEND_URL}/counseling?token={row['form_token']}"
            deadline_str = _format_deadline(deadline)
            reminder_num = reminder_count + 1
            tpl = _build_email(row["language"], form_url, deadline_str, reminder_num)

            try:
                await send_email(row["email"], tpl["subject"], tpl["body"])
            except Exception as exc:
                print(f"[reminder] email failed for {row['email']}: {exc}")
                continue

            try:
                async with pool.acquire() as conn:
                    await conn.execute(
                        "UPDATE users SET reminder_count = reminder_count + 1 WHERE id = $1",
                        row["id"],
                    )
                print(f"[reminder] sent #{reminder_num} to {row['email']}")
                sent += 1
            except Exception as exc:
                print(f"[reminder] db update failed for {row['email']}: {exc}")

        print(f"[reminder] done — {sent} email(s) sent at {now.isoformat()}")

    finally:
        await pool.close()


if __name__ == "__main__":
    asyncio.run(run_reminders())
