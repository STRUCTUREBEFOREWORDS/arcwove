import { Link } from 'react-router-dom'
import { getPaymentMethods, getPlans, getProcessSteps } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function PricePage() {
  const { locale, currency } = useSitePreferences();
  const plans = getPlans(locale, currency);
  const paymentMethods = getPaymentMethods(locale);
  const processSteps = getProcessSteps(locale);

  const copy = {
    ja: {
      eyebrow: "PRICE",
      title: "選択肢は2つだけ。契約構造を明快にする。",
      lead: "初期費用0円で始めるサブスクリプション型と、制作費＋月額保守で始めるスタンダード型の2パターンです。どちらも最低契約は6ヶ月、運用とセキュリティ管理まで含めて設計します。",
      monthlyFee: "月額",
      setupFee: "初期費用 / 制作費",
      minimumContract: "最低契約期間",
      minimumTotal: "最低支払総額",
      included: "含まれる内容",
      paymentTitle: "決済は Stripe で一元管理",
      paymentBody:
        "契約後の決済は Stripe で処理します。クレジットカード、Apple Pay、Google Pay に対応し、サブスクリプション型は月額課金、制作＋保守型は制作費と月額保守を同じ基盤で管理します。",
      flowTitle: "契約の流れ",
      flowBody:
        "問い合わせから公開後の月額保守まで、判断ポイントを増やしすぎずに一本の流れで進めます。",
      ctaTitle:
        "どちらの契約形態が合うか曖昧でも、そのまま相談で問題ありません。",
      ctaBody:
        "現状、予算感、公開後にどこまで伴走が必要かを聞いたうえで、適切なプランへ整理します。",
      ctaButton: "相談する",
      seoTitle: "PRICE",
      seoDescription:
        "STRUCTURE の2つの契約プランと Stripe 決済フローを確認できます。サブスクリプション型と制作＋保守型を比較できます。",
    },
    en: {
      eyebrow: "PRICE",
      title: "Only two options. Clear contract structure wins.",
      lead: "Choose between a zero-upfront subscription model and a production plus monthly maintenance model. Both include a six-month minimum term, operational support, and security management.",
      monthlyFee: "Monthly fee",
      setupFee: "Upfront / production fee",
      minimumContract: "Minimum term",
      minimumTotal: "Minimum total",
      included: "Included",
      paymentTitle: "Payments are centralized with Stripe",
      paymentBody:
        "After the contract is signed, Stripe handles the payment flow. Credit card, Apple Pay, and Google Pay are supported, with recurring billing for the subscription plan and unified billing for production plus maintenance.",
      flowTitle: "Contract flow",
      flowBody:
        "From inquiry to monthly maintenance after launch, the process stays in one simple path instead of forcing too many decisions.",
      ctaTitle:
        "If the right contract model is still unclear, we can sort it out in consultation.",
      ctaBody:
        "We recommend the right plan after understanding your current site, budget range, and how much ongoing support you want after launch.",
      ctaButton: "Talk to us",
      seoTitle: "PRICE",
      seoDescription:
        "Compare STRUCTURE's two contract plans and Stripe payment flow for subscription and production plus maintenance projects.",
    },
  }[locale];

  usePageSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    locale,
  });

  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell">
        <span className="eyebrow">{copy.eyebrow}</span>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="section-title">{copy.title}</h1>
            <p className="mt-6 section-copy">{copy.lead}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={[
                "glass-panel rounded-[2rem] p-8",
                plan.id === "subscription"
                  ? "border-cyan-300/50 bg-cyan-300/10"
                  : "border-white/10 bg-white/[0.045]",
              ].join(" ")}
            >
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                {plan.label}
              </span>
              <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl">
                {plan.name}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                {plan.summary}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {copy.monthlyFee}
                  </p>
                  <p className="mt-3 text-3xl font-medium text-white">
                    {plan.monthlyFee}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {copy.setupFee}
                  </p>
                  <p className="mt-3 text-3xl font-medium text-white">
                    {plan.setupFee}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {copy.minimumContract}
                  </p>
                  <p className="mt-3 text-xl font-medium text-white">
                    {plan.minimumContract}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {copy.minimumTotal}
                  </p>
                  <p className="mt-3 text-xl font-medium text-white">
                    {plan.minimumTotal}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                  {copy.included}
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm text-white/70"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-panel rounded-[2rem] p-8">
            <span className="eyebrow mb-6">STRIPE PAYMENT</span>
            <h2 className="section-title text-2xl md:text-4xl">
              {copy.paymentTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">{copy.paymentBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {paymentMethods.map((method) => (
                <span
                  key={method.id}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
                >
                  {method.label}
                </span>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-8">
            <span className="eyebrow mb-6">CONTRACT FLOW</span>
            <h2 className="section-title text-2xl md:text-4xl">
              {copy.flowTitle}
            </h2>
            <p className="mt-4 text-white/70">{copy.flowBody}</p>
            <ol className="mt-8 grid gap-3 text-sm text-white/70">
              {processSteps.map((step) => (
                <li
                  key={step.step}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="mr-3 text-cyan-300">{step.step}</span>
                  {step.title}
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="mt-20 glass-panel rounded-[2.25rem] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="section-title text-2xl md:text-4xl">
                {copy.ctaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-white/70">{copy.ctaBody}</p>
            </div>
            <Link to="/contact" className="primary-button w-fit">
              {copy.ctaButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}