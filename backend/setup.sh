#!/usr/bin/env bash
# ================================================================
# arcwove — ローカル / VPS セットアップスクリプト
# 実行: bash setup.sh
# ================================================================
set -e

VENV_DIR="$(dirname "$0")/venv"
BACKEND_DIR="$(dirname "$0")"
DB_NAME="arcwove_db"
DB_USER="arcwove_user"
DB_PASS="arcwove_local_pass"   # ← 本番では必ず変更してください

echo ""
echo "=== [1/6] PostgreSQL インストール ==="
sudo apt-get update -qq
sudo apt-get install -y postgresql postgresql-client

echo ""
echo "=== [2/6] PostgreSQL 起動 ==="
sudo systemctl enable postgresql
sudo systemctl start postgresql

echo ""
echo "=== [3/6] DB / ユーザー 作成 ==="
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || \
  sudo -u postgres psql -c "ALTER USER $DB_USER WITH PASSWORD '$DB_PASS';"

sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || \
  echo "DB $DB_NAME は既に存在します（スキップ）"

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

echo ""
echo "=== [4/6] スキーマ適用 ==="
PGPASSWORD="$DB_PASS" psql -U "$DB_USER" -d "$DB_NAME" -h 127.0.0.1 \
  -f "$BACKEND_DIR/schema.sql"
echo "スキーマ適用完了"

echo ""
echo "=== [5/6] Python 仮想環境 + 依存パッケージ ==="
python3 -m venv "$VENV_DIR"
"$VENV_DIR/bin/pip" install -q --upgrade pip
"$VENV_DIR/bin/pip" install -r "$BACKEND_DIR/requirements.txt"
echo "パッケージインストール完了"

echo ""
echo "=== [6/6] .env ファイル生成 ==="
ENV_FILE="$BACKEND_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<EOF
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@127.0.0.1:5432/$DB_NAME

# ── Stripe ──────────────────────────────────
# テスト用キーは Stripe Dashboard → Developers → API keys で取得
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX

# プランごとに Stripe Dashboard で月額価格を作成して price_id を記入
STRIPE_PRICE_STARTER_JPY=price_XXXXXXXXXXXXXXXX
STRIPE_PRICE_STARTER_USD=price_XXXXXXXXXXXXXXXX
STRIPE_PRICE_STANDARD_JPY=price_XXXXXXXXXXXXXXXX
STRIPE_PRICE_STANDARD_USD=price_XXXXXXXXXXXXXXXX
STRIPE_PRICE_GROWTH_JPY=price_XXXXXXXXXXXXXXXX
STRIPE_PRICE_GROWTH_USD=price_XXXXXXXXXXXXXXXX

# ── Resend ──────────────────────────────────
# https://resend.com でAPIキーを取得
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
FROM_EMAIL=noreply@arcwove.com

# ── App ─────────────────────────────────────
# ローカルテスト時は http://localhost:5174/VELIRO
FRONTEND_URL=http://localhost:5174/VELIRO
ADMIN_SECRET=$(openssl rand -hex 32)
EOF
  echo ".env 生成完了: $ENV_FILE"
else
  echo ".env は既に存在します（スキップ）"
fi

echo ""
echo "=================================================="
echo "セットアップ完了！"
echo ""
echo "次のステップ："
echo "  1. $ENV_FILE を編集して Stripe / Resend キーを入力"
echo "  2. バックエンド起動:"
echo "     source $VENV_DIR/bin/activate"
echo "     uvicorn main:app --host 0.0.0.0 --port 8000 --reload --app-dir $BACKEND_DIR"
echo ""
echo "  3. Stripe Webhook ローカルテスト（stripe-cli が必要）:"
echo "     stripe listen --forward-to http://localhost:8000/api/webhook/stripe"
echo ""
echo "  4. フロント dev サーバーは別ターミナルで既に起動中 (http://localhost:5174/VELIRO/)"
echo "=================================================="
