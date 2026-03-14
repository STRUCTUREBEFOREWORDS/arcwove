import { Link } from 'react-router-dom'

const aboutLines = [
  'Webサイトは構造で変わる',
  'アート作品は 展示される空間で見え方が変わります',
  '料理は 盛り付けるお皿で印象が変わります',
  'Webサイトも同じです',
  'サイトの構造は 空間であり器です',
  'その中に置かれるのが あなたの商品やサービス',
  '私たちは その器を設計します',
]

export function AboutPage() {
  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell">
        <span className="eyebrow">ABOUT</span>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="section-title">思想から始まり、構造で価値を伝える。</h1>
            <p className="mt-6 section-copy">
              私たちが作るのは単なる見やすいサイトではありません。何をどの順番で見せるか、何を残し何を削るかを定義し、事業にとって最適な器を形にします。
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <div className="space-y-4 text-base leading-8 text-white/72 sm:space-y-5 sm:text-lg sm:leading-9 md:text-xl">
              {aboutLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <article className="glass-panel rounded-[2rem] p-8">
            <h2 className="font-['Space_Grotesk'] text-2xl">思想</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">構造を整えることが、ブランドの見え方と営業効率を変えると考えています。</p>
          </article>
          <article className="glass-panel rounded-[2rem] p-8">
            <h2 className="font-['Space_Grotesk'] text-2xl">制作の考え方</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">余白、タイポグラフィ、情報設計を通じて、静かな説得力を持つ体験を作ります。</p>
          </article>
          <article className="glass-panel rounded-[2rem] p-8">
            <h2 className="font-['Space_Grotesk'] text-2xl">このサイトについて</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">プログラミング言語をモチーフにした、構造設計会社としての世界観を前面に出しています。</p>
          </article>
        </div>

        <div className="mt-16 glass-panel rounded-[2.25rem] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="section-title text-2xl md:text-4xl">構造から作り直したいなら、対話から始めましょう。</h2>
              <p className="mt-4 max-w-2xl text-white/70">現状サイトの課題整理から、新規制作の相談まで対応します。</p>
            </div>
            <Link to="/contact" className="primary-button w-fit">
              CONTACTへ
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}