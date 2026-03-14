import { Link } from 'react-router-dom'
import {
  getHomeSections,
  getPlans,
  getProcessSteps,
  getSampleCategoryLabel,
  getSampleProjects,
} from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

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

const codeRainColumns = [
  ["<html>", "<body>", "<section>", "<h1>", "<p>", "<Link>", "</section>"],
  ["const", "layout", "=", "{", "grid:", '"2col"', "}"],
  ["function", "render()", "{", "return", "<Hero />", "}"],
  ["import", "React", "from", '"react"', ";", "export"],
  ["type", "Flow", "=", '"design"', "|", '"build"'],
  ["npm", "run", "build", "git", "push", "origin"],
  ["schema", "logic", "motion", "ui", "ux", "launch"],
  ["API", "Route", "State", "Node", "Vite", "TS"],
];

const pageScatterLanguages = [
  { label: "HTML", top: "4%", left: "10%", tone: "cyan", motion: "slow" },
  { label: "CSS", top: "7%", left: "78%", tone: "white", motion: "medium" },
  {
    label: "TypeScript",
    top: "13%",
    left: "60%",
    tone: "magenta",
    motion: "slow",
  },
  { label: "React", top: "18%", left: "16%", tone: "cyan", motion: "fast" },
  { label: "Schema", top: "23%", left: "88%", tone: "white", motion: "medium" },
  { label: "Motion", top: "29%", left: "8%", tone: "magenta", motion: "slow" },
  { label: "Build", top: "34%", left: "72%", tone: "cyan", motion: "medium" },
  { label: "Node.js", top: "39%", left: "24%", tone: "white", motion: "fast" },
  { label: "Grid", top: "44%", left: "92%", tone: "cyan", motion: "slow" },
  { label: "UI", top: "49%", left: "14%", tone: "magenta", motion: "medium" },
  { label: "UX", top: "54%", left: "82%", tone: "white", motion: "fast" },
  { label: "Deploy", top: "59%", left: "32%", tone: "cyan", motion: "slow" },
  { label: "Route", top: "64%", left: "6%", tone: "white", motion: "medium" },
  { label: "API", top: "69%", left: "74%", tone: "magenta", motion: "slow" },
  { label: "Design", top: "74%", left: "18%", tone: "cyan", motion: "fast" },
  { label: "Code", top: "79%", left: "90%", tone: "white", motion: "medium" },
  { label: "Vision", top: "84%", left: "58%", tone: "magenta", motion: "slow" },
  { label: "Launch", top: "90%", left: "12%", tone: "cyan", motion: "medium" },
  { label: "Future", top: "95%", left: "80%", tone: "white", motion: "fast" },
  {
    label: "JavaScript",
    top: "10%",
    left: "30%",
    tone: "magenta",
    motion: "medium",
  },
  { label: "Layout", top: "16%", left: "92%", tone: "cyan", motion: "slow" },
  { label: "Render", top: "26%", left: "42%", tone: "white", motion: "fast" },
  {
    label: "Studio",
    top: "32%",
    left: "56%",
    tone: "magenta",
    motion: "medium",
  },
  { label: "Flow", top: "46%", left: "44%", tone: "cyan", motion: "slow" },
  { label: "Scale", top: "52%", left: "66%", tone: "white", motion: "medium" },
  { label: "System", top: "61%", left: "48%", tone: "magenta", motion: "fast" },
  { label: "State", top: "72%", left: "38%", tone: "cyan", motion: "slow" },
  { label: "Scroll", top: "81%", left: "26%", tone: "white", motion: "medium" },
  { label: "Signal", top: "88%", left: "70%", tone: "magenta", motion: "fast" },
] as const;

const sectionLanguages = {
  concept: [
    { label: "Grid", top: "8%", left: "74%", tone: "cyan", motion: "slow" },
    { label: "Flow", top: "58%", left: "14%", tone: "white", motion: "medium" },
    { label: "UX", top: "80%", left: "84%", tone: "magenta", motion: "fast" },
    {
      label: "Layout",
      top: "18%",
      left: "18%",
      tone: "cyan",
      motion: "medium",
    },
    { label: "Wire", top: "84%", left: "44%", tone: "white", motion: "slow" },
  ],
  process: [
    { label: "Logic", top: "12%", left: "10%", tone: "white", motion: "slow" },
    {
      label: "Schema",
      top: "30%",
      left: "88%",
      tone: "cyan",
      motion: "medium",
    },
    {
      label: "Motion",
      top: "78%",
      left: "18%",
      tone: "magenta",
      motion: "fast",
    },
    { label: "Build", top: "18%", left: "64%", tone: "cyan", motion: "slow" },
    {
      label: "Deploy",
      top: "86%",
      left: "82%",
      tone: "white",
      motion: "medium",
    },
  ],
  pricing: [
    { label: "HTML", top: "18%", left: "84%", tone: "white", motion: "slow" },
    { label: "CSS", top: "72%", left: "8%", tone: "cyan", motion: "medium" },
    { label: "TS", top: "84%", left: "72%", tone: "magenta", motion: "fast" },
    { label: "React", top: "14%", left: "18%", tone: "cyan", motion: "medium" },
    { label: "Route", top: "64%", left: "88%", tone: "white", motion: "slow" },
  ],
  sample: [
    { label: "React", top: "10%", left: "12%", tone: "cyan", motion: "slow" },
    { label: "Node", top: "24%", left: "88%", tone: "white", motion: "medium" },
    { label: "API", top: "86%", left: "22%", tone: "magenta", motion: "fast" },
    { label: "UI", top: "78%", left: "82%", tone: "cyan", motion: "medium" },
    {
      label: "Design",
      top: "16%",
      left: "58%",
      tone: "magenta",
      motion: "slow",
    },
    { label: "Code", top: "90%", left: "60%", tone: "white", motion: "medium" },
  ],
  cta: [
    {
      label: "Launch",
      top: "18%",
      left: "80%",
      tone: "magenta",
      motion: "slow",
    },
    {
      label: "Design",
      top: "70%",
      left: "12%",
      tone: "cyan",
      motion: "medium",
    },
    { label: "Code", top: "82%", left: "68%", tone: "white", motion: "fast" },
    { label: "Future", top: "14%", left: "20%", tone: "cyan", motion: "slow" },
    {
      label: "Vision",
      top: "54%",
      left: "86%",
      tone: "magenta",
      motion: "medium",
    },
  ],
} as const;

function LanguageScatter({
  items,
}: {
  items: ReadonlyArray<{
    label: string;
    top: string;
    left: string;
    tone: "cyan" | "white" | "magenta";
    motion: "slow" | "medium" | "fast";
  }>;
}) {
  return (
    <div
      className="home-language-field pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={`${item.label}-${item.top}-${item.left}`}
          style={{ top: item.top, left: item.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span
            className={[
              "home-language-orb absolute left-1/2 top-1/2",
              item.tone === "cyan"
                ? "home-language-orb-cyan"
                : item.tone === "magenta"
                  ? "home-language-orb-magenta"
                  : "home-language-orb-white",
            ].join(" ")}
          />
          <span
            className={[
              'home-language-chip relative z-10 rounded-full px-3.5 py-2 font-["Space_Grotesk"] text-[0.74rem] uppercase tracking-[0.28em] backdrop-blur-xl',
              item.motion === "slow"
                ? "floating-slow"
                : item.motion === "medium"
                  ? "floating-medium"
                  : "floating-fast",
              item.tone === "cyan"
                ? "home-language-chip-cyan"
                : item.tone === "magenta"
                  ? "home-language-chip-magenta"
                  : "home-language-chip-white",
            ].join(" ")}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HomePage() {
  const { locale, currency } = useSitePreferences();
  const homeSections = getHomeSections(locale);
  const plans = getPlans(locale, currency);
  const processSteps = getProcessSteps(locale);
  const sampleProjects = getSampleProjects(locale);

  const copy = {
    ja: {
      eyebrow: "Structure Driven Creative Studio",
      heroTitleTop: "解放せよ",
      heroTitleBottom: "感性と感覚を",
      heroLead: "構造から設計する\nWeb制作会社",
      contactCta: "制作相談",
      priceCta: "PRICEを見る",
      processEyebrow: "PROCESS OVERVIEW",
      processTitle: "制作の流れを可視化し、迷いを減らす。",
      processLink: "詳細を見る",
      priceEyebrow: "PRICE OVERVIEW",
      priceTitle: "成果へ必要な構造に応じて、3つの設計プランを用意。",
      priceLink: "価格詳細へ",
      sampleEyebrow: "SAMPLE",
      sampleTitle: "30サンプルで、構造設計の表現幅を提示する。",
      sampleLink: "全サンプルを見る",
      ctaEyebrow: "CALL TO ACTION",
      ctaTitle: "構造から整えたいなら、まずは現状の課題を聞かせてください。",
      ctaBody:
        "単なる見た目の刷新ではなく、伝わり方と導線の設計を変えたい事業者向けの相談窓口です。",
      ctaButton: "制作相談を始める",
      seoTitle: "HOME",
      seoDescription:
        "STRUCTURE は構造設計から始める Web制作会社です。多言語対応、SEO 初期設計、多通貨価格表示を備えたサイト制作を行います。",
    },
    en: {
      eyebrow: "Structure Driven Creative Studio",
      heroTitleTop: "UNLOCK",
      heroTitleBottom: "SENSE AND INSTINCT",
      heroLead: "A web studio\ndesigned from structure",
      contactCta: "Start a project",
      priceCta: "View PRICE",
      processEyebrow: "PROCESS OVERVIEW",
      processTitle: "Make the production flow visible and remove hesitation.",
      processLink: "View details",
      priceEyebrow: "PRICE OVERVIEW",
      priceTitle:
        "Three design plans matched to the structure required for results.",
      priceLink: "Pricing details",
      sampleEyebrow: "SAMPLES",
      sampleTitle:
        "Thirty samples showing the expressive range of structure design.",
      sampleLink: "See all samples",
      ctaEyebrow: "CALL TO ACTION",
      ctaTitle:
        "If you want to refine from structure, start by telling us the current challenge.",
      ctaBody:
        "This is a consultation line for businesses that want to change not just appearance, but how the message and user flow actually work.",
      ctaButton: "Begin consultation",
      seoTitle: "HOME",
      seoDescription:
        "STRUCTURE is a web studio that starts with structure design, multilingual support, initial SEO planning, and multi-currency pricing visibility.",
    },
  }[locale];

  usePageSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    locale,
  });

  return (
    <div className="home-page-shell relative overflow-hidden">
      <LanguageScatter items={pageScatterLanguages} />
      <div className="relative z-10">
        <section className="home-hero-stage section-block overflow-hidden pt-20 md:pt-28">
          <div className="hero-scanline" aria-hidden="true" />
          <div className="hero-code-rain" aria-hidden="true">
            {codeRainColumns.map((column, index) => (
              <div
                key={`column-${index}`}
                className={[
                  "code-rain-column",
                  index % 2 === 0 ? "code-rain-fast" : "code-rain-slow",
                  index % 3 === 0
                    ? "code-rain-cyan"
                    : index % 3 === 1
                      ? "code-rain-white"
                      : "code-rain-magenta",
                ].join(" ")}
                style={{
                  left: `${4 + index * 11.5}%`,
                  animationDelay: `${index * -1.8}s`,
                }}
              >
                {[...column, ...column, ...column].map((token, tokenIndex) => (
                  <span
                    key={`${token}-${tokenIndex}`}
                    className="code-rain-token"
                  >
                    {token}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="hero-stage-nebula galaxy-nebula" aria-hidden="true" />
          <div
            className="hero-stage-dust galaxy-dust opacity-80"
            aria-hidden="true"
          />
          <div className="galaxy-core absolute left-1/2 top-[42%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-36 sm:w-36 md:h-40 md:w-40" />
          <div className="galaxy-ring galaxy-ring-one absolute left-1/2 top-[42%] h-[12rem] w-[70vw] max-w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[14rem] md:h-[16rem]" />
          <div className="galaxy-ring galaxy-ring-two absolute left-1/2 top-[42%] h-[18rem] w-[88vw] max-w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[22rem] md:h-[24rem]" />
          <div className="galaxy-ring galaxy-ring-three absolute left-1/2 top-[42%] h-[26rem] w-[96vw] max-w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />

          <div className="container-shell relative min-h-[32rem] sm:min-h-[38rem] md:min-h-[42rem]">
            <div className="home-hero-copy relative z-10 mx-auto flex min-h-[32rem] max-w-4xl flex-col items-center justify-center text-center sm:min-h-[38rem] md:min-h-[42rem]">
              <div
                className="home-hero-aura home-hero-aura-left"
                aria-hidden="true"
              />
              <div
                className="home-hero-aura home-hero-aura-right"
                aria-hidden="true"
              />
              <span
                className="eyebrow home-reveal"
                style={{ animationDelay: "0.08s" }}
              >
                {copy.eyebrow}
              </span>
              <h1
                className="title-display home-reveal max-w-4xl"
                style={{ animationDelay: "0.16s" }}
              >
                <span className="matrix-title-line">
                  <span className="matrix-title-copy">{copy.heroTitleTop}</span>
                </span>
                <br />
                <span className="matrix-title-line matrix-title-line-accent">
                  <span className="matrix-title-copy">
                    {copy.heroTitleBottom}
                  </span>
                </span>
              </h1>
              <p
                className="home-reveal mx-auto mt-6 max-w-xl text-xl leading-9 text-white/70 md:text-2xl lg:mx-0"
                style={{ animationDelay: "0.24s" }}
              >
                {copy.heroLead.split("\n").map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
              <div
                className="home-reveal mt-10 flex flex-wrap justify-center gap-4"
                style={{ animationDelay: "0.32s" }}
              >
                <Link to="/contact" className="primary-button">
                  {copy.contactCta}
                </Link>
                <Link to="/price" className="secondary-button">
                  {copy.priceCta}
                </Link>
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
              </div>
            </div>
          </div>
        </section>

        <section className="section-block overflow-hidden">
          <div className="container-shell relative grid gap-6 lg:grid-cols-2">
            <LanguageScatter items={sectionLanguages.concept} />
            {homeSections.map((section, index) => (
              <article
                key={section.title}
                className="glass-panel home-panel-reveal relative z-10 rounded-[2rem] p-8 md:p-10"
                style={{ animationDelay: `${0.12 + index * 0.08}s` }}
              >
                <h2 className="section-title text-2xl md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-6 text-base leading-8 text-white/70">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block overflow-hidden">
          <div className="container-shell relative">
            <LanguageScatter items={sectionLanguages.process} />
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">{copy.processEyebrow}</span>
                <h2 className="section-title">{copy.processTitle}</h2>
              </div>
              <Link to="/process" className="secondary-button w-fit">
                {copy.processLink}
              </Link>
            </div>

            <div className="relative z-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {processSteps.map((step, index) => (
                <article
                  key={step.step}
                  className="glass-panel home-panel-reveal rounded-[2rem] p-6"
                  style={{ animationDelay: `${0.08 + index * 0.06}s` }}
                >
                  <p className="text-xs tracking-[0.3em] text-cyan-300">
                    {step.step}
                  </p>
                  <h3 className="mt-4 font-['Space_Grotesk'] text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block overflow-hidden">
          <div className="container-shell relative">
            <LanguageScatter items={sectionLanguages.pricing} />
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">{copy.priceEyebrow}</span>
                <h2 className="section-title">{copy.priceTitle}</h2>
              </div>
              <Link to="/price" className="secondary-button w-fit">
                {copy.priceLink}
              </Link>
            </div>

            <div className="relative z-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <article
                  key={plan.name}
                  className={[
                    "glass-panel home-panel-reveal rounded-[2rem] p-8",
                    index === 1 ? "border-cyan-300/40 bg-cyan-300/10" : "",
                  ].join(" ")}
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <p className="font-['Space_Grotesk'] text-2xl">{plan.name}</p>
                  <p className="mt-3 text-4xl font-medium text-white">
                    {plan.price}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-white/70">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-2xl border border-white/10 px-4 py-3"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block overflow-hidden">
          <div className="container-shell relative">
            <LanguageScatter items={sectionLanguages.sample} />
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">{copy.sampleEyebrow}</span>
                <h2 className="section-title">{copy.sampleTitle}</h2>
              </div>
              <Link to="/sample" className="secondary-button w-fit">
                {copy.sampleLink}
              </Link>
            </div>

            <div className="relative z-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sampleProjects.slice(0, 6).map((project, index) => (
                <article
                  key={project.id}
                  className="glass-panel home-panel-reveal group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${0.08 + index * 0.06}s` }}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/50">
                    <span>
                      {getSampleCategoryLabel(project.category, locale)}
                    </span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="sample-preview-shell mt-6 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
                    <div className="sample-preview-core rounded-[1.4rem] border border-white/10 bg-[#0d0d18] p-4">
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
                  <h3 className="mt-6 font-['Space_Grotesk'] text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {project.catchCopy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block pb-24 md:pb-32">
          <div className="container-shell relative overflow-hidden">
            <LanguageScatter items={sectionLanguages.cta} />
            <div
              className="glass-panel home-panel-reveal relative z-10 rounded-[2.5rem] px-8 py-10 md:px-12 md:py-14"
              style={{ animationDelay: "0.12s" }}
            >
              <span className="eyebrow">{copy.ctaEyebrow}</span>
              <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="section-title max-w-3xl">{copy.ctaTitle}</h2>
                  <p className="mt-6 section-copy">{copy.ctaBody}</p>
                </div>
                <Link to="/contact" className="primary-button w-fit">
                  {copy.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}