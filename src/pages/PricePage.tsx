import { Link } from 'react-router-dom'
import { plans, priceOptions } from '../data/site'

export function PricePage() {
  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell">
        <span className="eyebrow">PRICE</span>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="section-title">構造設計の深さに応じた、3つのプラン。</h1>
            <p className="mt-6 section-copy">
              すべてのプランでレスポンシブ対応と構造設計を含みます。事業の伸ばし方に応じて、導線と体験の粒度を調整します。
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={[
                'glass-panel rounded-[2rem] p-8',
                index === 1 ? 'border-cyan-300/50 bg-cyan-300/10' : '',
              ].join(' ')}
            >
              <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl">{plan.name}</p>
              <p className="mt-4 text-4xl font-medium sm:text-5xl">{plan.price}</p>
              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 px-4 py-4 text-sm text-white/70">
                    {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">OPTIONS</span>
            <h2 className="section-title">必要機能を後から拡張できる設計。</h2>
            <p className="mt-6 section-copy">
              初期段階ではコア構造を整え、運用段階で多言語、EC、SEO、アニメーションを段階的に追加できます。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {priceOptions.map((option) => (
              <article key={option.name} className="glass-panel rounded-[1.75rem] p-6">
                <p className="text-sm tracking-[0.22em] text-white/50">OPTION</p>
                <h3 className="mt-3 font-['Space_Grotesk'] text-2xl">{option.name}</h3>
                <p className="mt-4 text-lg text-cyan-300">{option.price}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 glass-panel rounded-[2.25rem] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="section-title text-2xl md:text-4xl">どのプランが合うか分からない場合は、相談ベースで整理できます。</h2>
              <p className="mt-4 max-w-2xl text-white/70">
                目的、現在の課題、ページ数感から適切な設計レベルを提案します。
              </p>
            </div>
            <Link to="/contact" className="primary-button w-fit">
              相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}