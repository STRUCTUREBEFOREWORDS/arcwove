-- ============================================================
-- STRUCTURE Web Agency — Database Schema
-- Engine: PostgreSQL 15+
-- Run: psql -U <user> -d <db> -f schema.sql
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT        NOT NULL UNIQUE,
    name          TEXT,
    company_name  TEXT,
    client_type   TEXT        NOT NULL DEFAULT 'individual',  -- individual | corporate
    language      TEXT        NOT NULL DEFAULT 'ja',          -- ja | en | es | fr | ko | zh-hans
    currency      TEXT        NOT NULL DEFAULT 'JPY',         -- JPY | USD
    plan_id       TEXT        NOT NULL,                        -- starter | standard | growth
    form_token    TEXT        NOT NULL UNIQUE,
    form_deadline TIMESTAMPTZ,
    reminder_count INTEGER    NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- payments
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
    id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id              UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_session_id    TEXT        NOT NULL UNIQUE,
    stripe_payment_intent TEXT,
    plan_id              TEXT        NOT NULL,
    amount               INTEGER     NOT NULL,
    currency             TEXT        NOT NULL,
    status               TEXT        NOT NULL DEFAULT 'pending',  -- pending | paid | failed
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- counseling_answers
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS counseling_answers (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    answers      JSONB       NOT NULL,
    status       TEXT        NOT NULL DEFAULT 'submitted',  -- submitted | reviewed
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at  TIMESTAMPTZ
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_users_form_token   ON users(form_token);
CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
CREATE INDEX IF NOT EXISTS idx_payments_session   ON payments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_counseling_user    ON counseling_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_users_reminder     ON users(form_deadline, reminder_count)
    WHERE form_deadline IS NOT NULL;
