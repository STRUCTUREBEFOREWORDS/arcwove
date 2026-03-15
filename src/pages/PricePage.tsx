import { Link } from 'react-router-dom'
import { getPlans, getPricingNotes } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function PricePage() {
  const { locale, currency } = useSitePreferences();
  const plans = getPlans(locale, currency);
  const pricingNotes = getPricingNotes(locale);

  const copy = {
    ja: {
      eyebrow: "PRICE",
      title: "選びやすく、続けやすい3つの料金プラン。",
      lead: "Starter は公開、Standard は運用、Growth は集客という役割で分けています。機能数ではなく、サイトをどう使いたいかで選びやすい構成です。",
      monthlyFee: "月額",
      minimumContract: "最低契約期間",
      included: "含まれる内容",
      recommendation: "MOST POPULAR",
      noteTitle: "ご確認事項",
      ctaTitle: "どのプランが合うか迷う場合は、現状に合わせて整理します。",
      ctaBody:
        "公開したいのか、運用を整えたいのか、集客まで見たいのかを整理しながら、最適なプランを相談ベースで決められます。",
      ctaButton: "相談する",
      seoTitle: "PRICE",
      seoDescription:
        "STRUCTURE の Starter、Standard、Growth の3つの料金プランを確認できます。",
    },
    en: {
      eyebrow: "PRICE",
      title: "Three plans designed to be easy to compare and easy to choose.",
      lead: "Starter is for launch, Standard is for operations, and Growth is for marketing. The plans are separated by role, not just by feature count.",
      monthlyFee: "Monthly fee",
      minimumContract: "Minimum term",
      included: "Included",
      recommendation: "MOST POPULAR",
      noteTitle: "Important notes",
      ctaTitle:
        "If you're unsure which plan fits, we can map it to your current needs.",
      ctaBody:
        "We can recommend the right plan after clarifying whether you need launch support, operational support, or marketing support.",
      ctaButton: "Talk to us",
      seoTitle: "PRICE",
      seoDescription:
        "Compare STRUCTURE's Starter, Standard, and Growth website plans.",
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

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={[
                "glass-panel rounded-[2rem] p-8",
                plan.recommended
                  ? "border-cyan-300/50 bg-cyan-300/10"
                  : "border-white/10 bg-white/[0.045]",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                  {plan.label}
                </span>
                {plan.recommended ? (
                  <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">
                    {copy.recommendation}
                  </span>
                ) : null}
              </div>
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
                    {copy.minimumContract}
                  </p>
                  <p className="mt-3 text-xl font-medium text-white">
                    {plan.minimumContract}
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

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
            {copy.noteTitle}
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/65">
            {pricingNotes.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
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