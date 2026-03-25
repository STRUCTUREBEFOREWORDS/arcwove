"""
arcwove — Stripe Product / Price 自動作成スクリプト

実行:
    python create_products.py

動作:
    1. Product を3つ作成（重複チェックあり）
    2. 各 Product に JPY / USD の月額 Price を作成
    3. price_id を stripe_prices.json に保存
    4. backend/.env を自動更新
"""

import json
import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
import stripe

load_dotenv()

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
if not stripe.api_key or not stripe.api_key.startswith("sk_"):
    sys.exit("ERROR: STRIPE_SECRET_KEY が .env に設定されていません")

# ─────────────────────────────────────────────
# プラン定義
# ─────────────────────────────────────────────
PLANS = [
    {
        "key":      "starter",
        "name":     "arcwove Starter",
        "jpy":      10000,    # 円（整数）
        "usd":      6800,     # セント（$68.00）
    },
    {
        "key":      "standard",
        "name":     "arcwove Standard",
        "jpy":      15000,
        "usd":      10200,    # $102.00
    },
    {
        "key":      "growth",
        "name":     "arcwove Growth",
        "jpy":      20000,
        "usd":      13600,    # $136.00
    },
]

# ─────────────────────────────────────────────
# 重複チェック用ヘルパー
# ─────────────────────────────────────────────
def find_existing_product(name: str) -> stripe.Product | None:
    products = stripe.Product.list(limit=100, active=True)
    for p in products.auto_paging_iter():
        if p.name == name:
            return p
    return None

def find_existing_price(product_id: str, currency: str, amount: int) -> stripe.Price | None:
    prices = stripe.Price.list(product=product_id, currency=currency, active=True)
    for p in prices.auto_paging_iter():
        if p.unit_amount == amount and p.recurring and p.recurring.interval == "month":
            return p
    return None

# ─────────────────────────────────────────────
# メイン処理
# ─────────────────────────────────────────────
result = {}

print(f"\nStripe モード: {'TEST' if 'test' in stripe.api_key else 'LIVE'}")
print("─" * 48)

for plan in PLANS:
    print(f"\n▼ {plan['name']}")

    # Product
    product = find_existing_product(plan["name"])
    if product:
        print(f"  Product: {product.id}  (既存)")
    else:
        product = stripe.Product.create(name=plan["name"])
        print(f"  Product: {product.id}  (新規作成)")

    # Price JPY
    price_jpy = find_existing_price(product.id, "jpy", plan["jpy"])
    if price_jpy:
        print(f"  Price JPY: {price_jpy.id}  (既存)")
    else:
        price_jpy = stripe.Price.create(
            product=product.id,
            unit_amount=plan["jpy"],
            currency="jpy",
            recurring={"interval": "month"},
            metadata={"plan_key": plan["key"]},
        )
        print(f"  Price JPY: {price_jpy.id}  (新規作成)")

    # Price USD
    price_usd = find_existing_price(product.id, "usd", plan["usd"])
    if price_usd:
        print(f"  Price USD: {price_usd.id}  (既存)")
    else:
        price_usd = stripe.Price.create(
            product=product.id,
            unit_amount=plan["usd"],
            currency="usd",
            recurring={"interval": "month"},
            metadata={"plan_key": plan["key"]},
        )
        print(f"  Price USD: {price_usd.id}  (新規作成)")

    result[plan["key"]] = {
        "product_id": product.id,
        "price_jpy":  price_jpy.id,
        "price_usd":  price_usd.id,
    }

# ─────────────────────────────────────────────
# stripe_prices.json に保存
# ─────────────────────────────────────────────
json_path = Path(__file__).parent / "stripe_prices.json"
with open(json_path, "w") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
print(f"\n✓ {json_path} に保存しました")

# ─────────────────────────────────────────────
# backend/.env を自動更新
# ─────────────────────────────────────────────
env_path = Path(__file__).parent / ".env"
env_text = env_path.read_text()

replacements = {
    "STRIPE_PRICE_STARTER_JPY":  result["starter"]["price_jpy"],
    "STRIPE_PRICE_STARTER_USD":  result["starter"]["price_usd"],
    "STRIPE_PRICE_STANDARD_JPY": result["standard"]["price_jpy"],
    "STRIPE_PRICE_STANDARD_USD": result["standard"]["price_usd"],
    "STRIPE_PRICE_GROWTH_JPY":   result["growth"]["price_jpy"],
    "STRIPE_PRICE_GROWTH_USD":   result["growth"]["price_usd"],
}

for key, value in replacements.items():
    env_text = re.sub(
        rf"^{key}=.*$",
        f"{key}={value}",
        env_text,
        flags=re.MULTILINE,
    )

env_path.write_text(env_text)
print(f"✓ {env_path} を自動更新しました")

# ─────────────────────────────────────────────
# 結果サマリー
# ─────────────────────────────────────────────
print("\n" + "=" * 48)
print("price_id サマリー")
print("=" * 48)
print(json.dumps(result, indent=2, ensure_ascii=False))
print("\n次のステップ: uvicorn を再起動してください")
