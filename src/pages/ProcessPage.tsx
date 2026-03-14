import { useEffect, useState } from 'react'
import { processSteps } from '../data/site'

export function ProcessPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setProgress(Math.min(100, Math.max(0, ratio * 100)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell">
        <div className="sticky top-24 z-20 mb-10 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="eyebrow">PROCESS</span>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <h1 className="section-title">流れが見えると、依頼前の不安は減る。</h1>
            <p className="mt-6 section-copy">
              スクロールに応じて制作フローを追える構成です。どの段階で何を決めるかが明確なので、検討段階でも全体像を把握できます。
            </p>
          </div>

          <div className="relative space-y-6 pl-4 before:absolute before:left-1 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-white/10 sm:space-y-8 sm:pl-6 sm:before:left-2">
            {processSteps.map((step, index) => (
              <article key={step.step} className="relative glass-panel rounded-[2rem] p-6 sm:p-8">
                <span className="absolute -left-[0.85rem] top-10 h-3.5 w-3.5 rounded-full border border-cyan-300/50 bg-cyan-300/30 shadow-[0_0_30px_rgba(0,255,255,0.35)] sm:-left-[1.1rem] sm:h-4 sm:w-4" />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs tracking-[0.28em] text-cyan-300">{step.step}</p>
                    <h2 className="mt-4 font-['Space_Grotesk'] text-2xl sm:text-3xl">{step.title}</h2>
                  </div>
                  <p className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                </div>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}