import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

export function AboutPage() {
  const { locale } = useSitePreferences();
  const copy = {
    ja: {
      eyebrow: "ABOUT",
      title: "思想から始まり、構造で価値を伝える。",
      lead: "私たちが作るのは単なる見やすいサイトではありません。何をどの順番で見せるか、何を残し何を削るかを定義し、事業にとって最適な器を形にします。",
      lines: [
        "Webサイトは構造で変わる",
        "アート作品は 展示される空間で見え方が変わります",
        "料理は 盛り付けるお皿で印象が変わります",
        "Webサイトも同じです",
        "サイトの構造は 空間であり器です",
        "その中に置かれるのが あなたの商品やサービス",
        "私たちは その器を設計します",
      ],
      cards: [
        {
          title: "思想",
          body: "構造を整えることが、ブランドの見え方と営業効率を変えると考えています。",
        },
        {
          title: "制作の考え方",
          body: "余白、タイポグラフィ、情報設計を通じて、静かな説得力を持つ体験を作ります。",
        },
        {
          title: "このサイトについて",
          body: "プログラミング言語をモチーフにした、構造設計会社としての世界観を前面に出しています。",
        },
      ],
      ctaTitle: "構造から作り直したいなら、対話から始めましょう。",
      ctaBody: "現状サイトの課題整理から、新規制作の相談まで対応します。",
      ctaButton: "CONTACTへ",
      seoTitle: "ABOUT",
      seoDescription:
        "STRUCTURE の思想と制作方針を紹介します。構造設計を軸に価値の伝わり方を整える Web 制作会社です。",
    },
    en: {
      eyebrow: "ABOUT",
      title: "Starting from philosophy, conveying value through structure.",
      lead: "We do not make websites that are merely easy to look at. We define what should be shown, in what order, what should remain, and what should be removed, then shape the best vessel for the business.",
      lines: [
        "A website changes with its structure.",
        "Art looks different depending on the space where it is displayed.",
        "Food feels different depending on the plate that carries it.",
        "Websites work the same way.",
        "Site structure is both space and vessel.",
        "Inside that vessel live your products and services.",
        "We design that vessel.",
      ],
      cards: [
        {
          title: "Philosophy",
          body: "We believe structure changes both how a brand is perceived and how efficiently it converts.",
        },
        {
          title: "How we make",
          body: "Through spacing, typography, and information architecture, we build experiences with quiet persuasive power.",
        },
        {
          title: "About this site",
          body: "This website foregrounds the worldview of a structure-led studio through programming-language motifs and spatial design.",
        },
      ],
      ctaTitle:
        "If you want to rebuild from structure, start with a conversation.",
      ctaBody:
        "We handle everything from diagnosing an existing site to planning a new build.",
      ctaButton: "Go to Contact",
      seoTitle: "ABOUT",
      seoDescription:
        "Learn the philosophy behind STRUCTURE, a web studio focused on structure design, information architecture, and conversion-oriented presentation.",
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
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="section-title">{copy.title}</h1>
            <p className="mt-6 section-copy">{copy.lead}</p>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <div className="space-y-4 text-base leading-8 text-white/72 sm:space-y-5 sm:text-lg sm:leading-9 md:text-xl">
              {copy.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {copy.cards.map((card) => (
            <article
              key={card.title}
              className="glass-panel rounded-[2rem] p-8"
            >
              <h2 className="font-['Space_Grotesk'] text-2xl">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 glass-panel rounded-[2.25rem] p-8 md:p-10">
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