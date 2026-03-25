import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function PaymentSuccessPage() {
  const { locale } = useSitePreferences();

  const copy = {
    ja: {
      eyebrow: "PAYMENT COMPLETE",
      title: "お申し込みありがとうございます。",
      body: "決済が完了しました。ご登録のメールアドレスにカウンセリングシートのURLをお送りします。48時間以内にご提出ください。",
      steps: [
        { step: "01", text: "メールを確認する" },
        { step: "02", text: "カウンセリングシートを記入する" },
        { step: "03", text: "48時間以内に提出する" },
        { step: "04", text: "制作開始" },
      ],
      note: "メールが届かない場合は迷惑メールフォルダをご確認いただくか、お問い合わせください。",
      cta: "お問い合わせ",
      seoTitle: "お申し込み完了",
    },
    en: {
      eyebrow: "PAYMENT COMPLETE",
      title: "Thank you for your order.",
      body: "Your payment is confirmed. We will send the counseling sheet URL to your registered email address. Please submit it within 48 hours.",
      steps: [
        { step: "01", text: "Check your email" },
        { step: "02", text: "Fill in the counseling sheet" },
        { step: "03", text: "Submit within 48 hours" },
        { step: "04", text: "Production begins" },
      ],
      note: "If you do not receive an email, please check your spam folder or contact us.",
      cta: "Contact us",
      seoTitle: "Order Complete",
    },
  }[locale];

  usePageSeo({ title: copy.seoTitle, description: copy.body, locale });

  return (
    <section className="section-block pb-24">
      <div className="container-shell max-w-2xl">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1 className="section-title mt-2">{copy.title}</h1>
        <p className="mt-6 section-copy">{copy.body}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {copy.steps.map(({ step, text }) => (
            <div
              key={step}
              className="glass-panel rounded-[1.75rem] p-6 flex items-start gap-4"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-cyan-300/70">
                {step}
              </span>
              <p className="text-sm text-white/80">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-amber-300/20 bg-amber-300/5 px-6 py-5">
          <p className="text-sm text-amber-200/80">{copy.note}</p>
        </div>

        <div className="mt-8">
          <Link to="/contact" className="secondary-button">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
