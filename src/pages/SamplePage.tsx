import { useMemo, useState } from 'react'
import { sampleCategories, sampleProjects, type SampleCategory, type SampleProject } from '../data/site'

export function SamplePage() {
  const [activeCategory, setActiveCategory] = useState<SampleCategory>('All')
  const [activeProject, setActiveProject] = useState<SampleProject | null>(null)

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? sampleProjects
        : sampleProjects.filter((project) => project.category === activeCategory),
    [activeCategory],
  )

  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell">
        <span className="eyebrow">SAMPLE</span>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="section-title">30サンプルを、カテゴリー別に整理。</h1>
            <p className="mt-6 section-copy">
              Corporate、Landing、Ecommerce などの文脈ごとに、PCモックとスマホモックを持つカードとして展開します。
            </p>
          </div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/40">Total 30 Samples</p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {sampleCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={[
                'rounded-full border px-5 py-3 text-sm tracking-[0.18em] transition',
                activeCategory === category
                  ? 'border-cyan-300/60 bg-cyan-300/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white',
              ].join(' ')}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project)}
              className="glass-panel group rounded-[2rem] p-6 text-left transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/50">
                <span>{project.category}</span>
                <span>{project.id}</span>
              </div>
              <div className="mt-5 grid gap-3 rounded-[1.8rem] border border-white/10 bg-white/5 p-4 md:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-[1.2rem] border border-white/10 bg-[#11111a] p-3">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                  </div>
                  <div className="mt-4 h-40 rounded-[1rem] bg-gradient-to-br from-cyan-300/10 to-white/5" />
                </div>
                <div className="rounded-[1.2rem] border border-dashed border-white/20 bg-[#11111a] p-3">
                  <div className="mx-auto h-40 w-24 rounded-[1rem] border border-white/10 bg-gradient-to-b from-fuchsia-400/10 to-white/5" />
                </div>
              </div>
              <h2 className="mt-6 font-['Space_Grotesk'] text-xl sm:text-2xl">{project.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">{project.catchCopy}</p>
            </button>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="glass-panel max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] p-5 sm:p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">{activeProject.category}</p>
                <h2 className="mt-4 font-['Space_Grotesk'] text-3xl sm:text-4xl">{activeProject.title}</h2>
                <p className="mt-4 max-w-2xl text-white/70">{activeProject.summary}</p>
              </div>
              <button type="button" onClick={() => setActiveProject(null)} className="secondary-button w-fit px-5 py-2">
                CLOSE
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.8rem] border border-white/10 bg-[#11111a] p-4 sm:p-5">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                </div>
                <div className="mt-5 h-48 rounded-[1.2rem] bg-gradient-to-br from-cyan-300/10 via-transparent to-fuchsia-400/10 sm:h-64 lg:h-72" />
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-[#11111a] p-4 sm:p-5">
                <div className="mx-auto h-52 w-32 rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-fuchsia-400/10 via-transparent to-cyan-300/10 sm:h-64 sm:w-40 lg:h-72 lg:w-44" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {activeProject.deliverables.map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}