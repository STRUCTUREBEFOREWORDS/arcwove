import { Link, useSearchParams } from 'react-router-dom'
import { getPlans, getPricingNotes } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function PricePage() {
  const { locale, currency } = useSitePreferences();
  const [searchParams] = useSearchParams();
  const plans = getPlans(locale, currency);
  const pricingNotes = getPricingNotes(locale);
  const selectedPlanId = searchParams.get("recommended");

  const copy = {
    ja: {
      eyebrow: "PRICE",
      title: "選びやすく、続けやすい3つの料金プラン。",
      lead: "Starter は公開、Standard は運用、Growth は集客という役割で分けています。機能数ではなく、サイトをどう使いたいかで選びやすい構成です。",
      monthlyFee: "月額",
      minimumContract: "最低契約期間",
      included: "含まれる内容",
      recommendation: "MOST POPULAR",
      yourFit: "YOUR FIT",
      noteTitle: "ご確認事項",
      compareTitle: "プラン比較表",
      compareLead:
        "3つのプランを、公開・運用・集客という役割で横並びに比較できます。迷ったときは、まず役割の違いから見るのが最短です。",
      selectedLead:
        "カウンセリングシートの内容をもとに、このプランを中心に比較しやすい状態にしています。",
      rowLabel: "比較項目",
      rows: {
        role: "役割",
        bestFor: "向いている用途",
        pageScale: "制作ページ数",
        updates: "更新頻度",
        analytics: "解析・計測",
        seo: "SEO支援",
        support: "サポート体制",
      },
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
      yourFit: "YOUR FIT",
      noteTitle: "Important notes",
      compareTitle: "Plan comparison",
      compareLead:
        "Compare the three plans side by side through their actual role: launch, operations, and marketing.",
      selectedLead:
        "Based on your counseling sheet inputs, this view is centered on the recommended plan for easier comparison.",
      rowLabel: "Comparison point",
      rows: {
        role: "Role",
        bestFor: "Best for",
        pageScale: "Page scope",
        updates: "Update frequency",
        analytics: "Analytics",
        seo: "SEO support",
        support: "Support level",
      },
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

  const comparisonRows = {
    starter: {
      role: locale === "ja" ? "公開" : "Launch",
      bestFor:
        locale === "ja"
          ? "まずはサイトを公開したい事業"
          : "Businesses that need to launch a site quickly",
      pageScale: locale === "ja" ? "最大5ページ" : "Up to 5 pages",
      updates: locale === "ja" ? "月2回まで" : "Up to 2 times / month",
      analytics: locale === "ja" ? "基本なし" : "Not included",
      seo: locale === "ja" ? "SEO基本設定" : "Basic SEO setup",
      support: locale === "ja" ? "メールサポート" : "Email support",
    },
    standard: {
      role: locale === "ja" ? "運用" : "Operations",
      bestFor:
        locale === "ja"
          ? "公開後も整えながら運用したい事業"
          : "Businesses that want stable post-launch operations",
      pageScale: locale === "ja" ? "最大8ページ" : "Up to 8 pages",
      updates: locale === "ja" ? "月4回まで" : "Up to 4 times / month",
      analytics:
        locale === "ja"
          ? "GA / Search Console 導入"
          : "GA and Search Console setup",
      seo: locale === "ja" ? "SEO基本設定" : "Basic SEO setup",
      support:
        locale === "ja" ? "運用管理 + メールサポート" : "Operations support + email",
    },
    growth: {
      role: locale === "ja" ? "集客" : "Marketing",
      bestFor:
        locale === "ja"
          ? "SEO改善と集客を回したい事業"
          : "Businesses using the site for SEO and acquisition",
      pageScale: locale === "ja" ? "最大12ページ" : "Up to 12 pages",
      updates: locale === "ja" ? "月8回まで" : "Up to 8 times / month",
      analytics:
        locale === "ja" ? "計測基盤 + レポート" : "Tracking setup + reporting",
      seo:
        locale === "ja"
          ? "SEO分析 / キーワード分析 / 月次レポート"
          : "SEO review, keyword analysis, and monthly reporting",
      support:
        locale === "ja" ? "優先サポート" : "Priority support",
    },
  };

  const rowOrder = ["role", "bestFor", "pageScale", "updates", "analytics", "seo", "support"] as const;

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
                selectedPlanId === plan.id
                  ? "border-emerald-300/50 bg-emerald-300/10"
                  : plan.recommended
                  ? "border-cyan-300/50 bg-cyan-300/10"
                  : "border-white/10 bg-white/[0.045]",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                  {plan.label}
                </span>
                {selectedPlanId === plan.id ? (
                  <span className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-100">
                    {copy.yourFit}
                  </span>
                ) : null}
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
            {copy.compareTitle}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
            {selectedPlanId ? copy.selectedLead : copy.compareLead}
          </p>

          <div className="mt-8 hidden overflow-hidden rounded-[1.8rem] border border-white/10 lg:block">
            <div className="grid grid-cols-[1.15fr_repeat(3,minmax(0,1fr))] bg-black/20">
              <div className="border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.22em] text-white/45">
                {copy.rowLabel}
              </div>
              {plans.map((plan) => (
                <div
                  key={`header-${plan.id}`}
                  className={[
                    "border-b border-l border-white/10 px-5 py-4",
                    selectedPlanId === plan.id ? "bg-emerald-300/10" : "",
                  ].join(" ")}
                >
                  <p className="font-['Space_Grotesk'] text-xl text-white">{plan.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                    {plan.label}
                  </p>
                </div>
              ))}

              {rowOrder.map((rowKey) => (
                <>
                  <div
                    key={`label-${rowKey}`}
                    className="border-b border-white/10 px-5 py-4 text-sm text-white/60"
                  >
                    {copy.rows[rowKey]}
                  </div>
                  {plans.map((plan) => (
                    <div
                      key={`${rowKey}-${plan.id}`}
                      className={[
                        "border-b border-l border-white/10 px-5 py-4 text-sm leading-7 text-white/75",
                        selectedPlanId === plan.id ? "bg-emerald-300/10" : "",
                      ].join(" ")}
                    >
                      {comparisonRows[plan.id][rowKey]}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:hidden">
            {plans.map((plan) => (
              <article
                key={`mobile-${plan.id}`}
                className={[
                  "rounded-[1.8rem] border border-white/10 bg-black/10 p-5",
                  selectedPlanId === plan.id ? "border-emerald-300/30 bg-emerald-300/10" : "",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-['Space_Grotesk'] text-xl text-white">{plan.name}</p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-white/55">
                    {plan.label}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {rowOrder.map((rowKey) => (
                    <div key={`mobile-${rowKey}-${plan.id}`} className="rounded-2xl border border-white/10 px-4 py-3">
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
                        {copy.rows[rowKey]}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        {comparisonRows[plan.id][rowKey]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
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