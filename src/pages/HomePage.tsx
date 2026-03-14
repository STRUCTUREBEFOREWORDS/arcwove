import { Link } from 'react-router-dom'
import { homeSections, plans, processSteps, sampleProjects } from '../data/site'

const galaxyLanguages = [
  { label: 'HTML', top: '18%', left: '20%', size: 'sm', orbit: 'slow', tone: 'cyan' },
  { label: 'CSS', top: '26%', left: '58%', size: 'sm', orbit: 'medium', tone: 'white' },
  { label: 'JavaScript', top: '36%', left: '72%', size: 'lg', orbit: 'slow', tone: 'magenta' },
  { label: 'TypeScript', top: '50%', left: '62%', size: 'lg', orbit: 'medium', tone: 'cyan' },
  { label: 'Python', top: '58%', left: '24%', size: 'md', orbit: 'fast', tone: 'white' },
  { label: 'Node.js', top: '68%', left: '74%', size: 'md', orbit: 'slow', tone: 'cyan' },
  { label: 'React', top: '42%', left: '12%', size: 'sm', orbit: 'medium', tone: 'magenta' },
  { label: 'Vite', top: '74%', left: '48%', size: 'sm', orbit: 'fast', tone: 'white' },
]

const galaxyStars = [
  { top: '12%', left: '26%', size: 4 },
  { top: '20%', left: '78%', size: 3 },
  { top: '28%', left: '40%', size: 5 },
  { top: '34%', left: '86%', size: 2 },
  { top: '48%', left: '52%', size: 6 },
  { top: '55%', left: '16%', size: 3 },
  { top: '62%', left: '66%', size: 4 },
  { top: '78%', left: '30%', size: 3 },
  { top: '82%', left: '58%', size: 2 },
]

export function HomePage() {
  return (
    <>
      <section className="section-block overflow-hidden pt-20 md:pt-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="relative z-10 text-center lg:text-left">
            <span className="eyebrow">Structure Driven Creative Studio</span>
            <h1 className="title-display max-w-4xl">
              解放せよ
              <br />
              <span className="text-gradient">感性と感覚を</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-9 text-white/70 md:text-2xl lg:mx-0">
              構造から設計する
              <br />
              Web制作会社
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link to="/contact" className="primary-button">
                制作相談
              </Link>
              <Link to="/price" className="secondary-button">
                PRICEを見る
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-grid bg-[size:32px_32px] p-4 shadow-aura sm:min-h-[420px] sm:p-6 md:min-h-[460px]">
            <div className="absolute inset-6 rounded-[1.75rem] border border-cyan-300/20 bg-white/5" />
            <div className="galaxy-nebula absolute inset-0" />
            <div className="galaxy-dust absolute inset-0 opacity-80" />
            <div className="galaxy-core absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36" />
            <div className="galaxy-ring galaxy-ring-one absolute left-1/2 top-1/2 h-[10rem] w-[82vw] max-w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[12rem] md:h-[13rem]" />
            <div className="galaxy-ring galaxy-ring-two absolute left-1/2 top-1/2 h-[14rem] w-[92vw] max-w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[16rem] md:h-[17rem]" />
            <div className="galaxy-ring galaxy-ring-three absolute left-1/2 top-1/2 h-[18rem] w-[98vw] max-w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[20rem] md:h-[21rem]" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="glass-panel w-fit rounded-full px-4 py-2 text-xs tracking-[0.24em] text-white/70">
                CODE CONSTELLATION GALAXY
              </div>

              <div className="pointer-events-none absolute inset-0">
                {galaxyStars.map((star, index) => (
                  <span
                    key={`${star.top}-${star.left}`}
                    className="galaxy-star absolute rounded-full bg-white/80"
                    style={{
                      top: star.top,
                      left: star.left,
                      width: `${star.size}px`,
                      height: `${star.size}px`,
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />
                ))}

                {galaxyLanguages.map((language) => (
                  <span
                    key={language.label}
                    className={[
                      'galaxy-language absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 font-["Space_Grotesk"] text-white backdrop-blur-xl',
                      language.size === 'lg' ? 'text-base md:text-lg' : language.size === 'md' ? 'text-sm md:text-base' : 'text-xs md:text-sm',
                      language.orbit === 'slow'
                        ? 'galaxy-orbit-slow'
                        : language.orbit === 'medium'
                          ? 'galaxy-orbit-medium'
                          : 'galaxy-orbit-fast',
                      language.tone === 'cyan'
                        ? 'border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_35px_rgba(0,255,255,0.14)]'
                        : language.tone === 'magenta'
                          ? 'border border-fuchsia-400/40 bg-fuchsia-400/10 shadow-[0_0_35px_rgba(255,0,255,0.14)]'
                          : 'border border-white/20 bg-white/10 shadow-[0_0_35px_rgba(255,255,255,0.08)]',
                    ].join(' ')}
                    style={{ top: language.top, left: language.left }}
                  >
                    {language.label}
                  </span>
                ))}
              </div>

              <div className="relative ml-auto mt-auto max-w-[10rem] rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-right backdrop-blur-xl sm:max-w-[12rem]">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/45">Galaxy Reading</p>
                <p className="mt-3 font-['Space_Grotesk'] text-base text-white/90 sm:text-lg">言語が点ではなく、構造の軌道になる。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {homeSections.map((section) => (
            <article key={section.title} className="glass-panel rounded-[2rem] p-8 md:p-10">
              <h2 className="section-title text-2xl md:text-3xl">{section.title}</h2>
              <p className="mt-6 text-base leading-8 text-white/70">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">PROCESS OVERVIEW</span>
              <h2 className="section-title">制作の流れを可視化し、迷いを減らす。</h2>
            </div>
            <Link to="/process" className="secondary-button w-fit">
              詳細を見る
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
              <article key={step.step} className="glass-panel rounded-[2rem] p-6">
                <p className="text-xs tracking-[0.3em] text-cyan-300">{step.step}</p>
                <h3 className="mt-4 font-['Space_Grotesk'] text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">PRICE OVERVIEW</span>
              <h2 className="section-title">成果へ必要な構造に応じて、3つの設計プランを用意。</h2>
            </div>
            <Link to="/price" className="secondary-button w-fit">
              価格詳細へ
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={[
                  'glass-panel rounded-[2rem] p-8',
                  index === 1 ? 'border-cyan-300/40 bg-cyan-300/10' : '',
                ].join(' ')}
              >
                <p className="font-['Space_Grotesk'] text-2xl">{plan.name}</p>
                <p className="mt-3 text-4xl font-medium text-white">{plan.price}</p>
                <ul className="mt-8 space-y-3 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature} className="rounded-2xl border border-white/10 px-4 py-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">SAMPLE</span>
              <h2 className="section-title">30サンプルで、構造設計の表現幅を提示する。</h2>
            </div>
            <Link to="/sample" className="secondary-button w-fit">
              全サンプルを見る
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sampleProjects.slice(0, 6).map((project, index) => (
              <article key={project.id} className="glass-panel group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/50">
                  <span>{project.category}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
                  <div className="rounded-[1.4rem] border border-white/10 bg-[#0d0d18] p-4">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                      <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
                      <div className="h-40 rounded-[1rem] bg-white/5" />
                      <div className="h-40 rounded-[1rem] border border-dashed border-white/20 bg-white/5" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 font-['Space_Grotesk'] text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{project.catchCopy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pb-24 md:pb-32">
        <div className="container-shell">
          <div className="glass-panel rounded-[2.5rem] px-8 py-10 md:px-12 md:py-14">
            <span className="eyebrow">CALL TO ACTION</span>
            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="section-title max-w-3xl">構造から整えたいなら、まずは現状の課題を聞かせてください。</h2>
                <p className="mt-6 section-copy">
                  単なる見た目の刷新ではなく、伝わり方と導線の設計を変えたい事業者向けの相談窓口です。
                </p>
              </div>
              <Link to="/contact" className="primary-button w-fit">
                制作相談を始める
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}