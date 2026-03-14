import { Link } from 'react-router-dom'
import { getPlans } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function PricePage() {
  const { locale, currency } = useSitePreferences();
  const plans = getPlans(locale, currency);

  const copy = {
    ja: {
      eyebrow: "PRICE",
      title: "構造設計の深さに応じた、3つのプラン。",
      lead: "すべてのプランでレスポンシブ対応と構造設計を含みます。事業の伸ばし方に応じて、導線と体験の粒度を調整します。",
      ctaTitle:
        "どのプランが合うか分からない場合は、相談ベースで整理できます。",
      ctaBody: "目的、現在の課題、ページ数感から適切な設計レベルを提案します。",
      ctaButton: "相談する",
      seoTitle: "PRICE",
      seoDescription:
        "STRUCTURE の制作プランを多通貨で比較できます。構造設計、SEO 初期設計、多言語対応を含む各プランを確認できます。",
    },
    en: {
      eyebrow: "PRICE",
      title: "Three plans matched to the depth of structure design you need.",
      lead: "Every plan includes responsive implementation and structural planning. We adjust flow and experience depth to fit how your business needs to grow.",
      ctaTitle:
        "If you are unsure which plan fits, we can map it out in consultation.",
      ctaBody:
        "We recommend the right design level based on your goals, current challenges, and expected page volume.",
      ctaButton: "Talk to us",
      seoTitle: "PRICE",
      seoDescription:
        "Compare STRUCTURE web production plans in multiple currencies, including structure design, initial SEO setup, and multilingual support.",
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={[
                "glass-panel rounded-[2rem] p-8",
                index === 1 ? "border-cyan-300/50 bg-cyan-300/10" : "",
              ].join(" ")}
            >
              <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl">
                {plan.name}
              </p>
              <p className="mt-4 text-4xl font-medium sm:text-5xl">
                {plan.price}
              </p>
              <div className="mt-8 space-y-3">
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