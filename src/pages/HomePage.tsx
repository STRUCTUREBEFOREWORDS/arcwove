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

type LanguageTone = "cyan" | "white" | "magenta";
type LanguageMotion = "slow" | "medium" | "fast";

type HeroProfileToken = {
  label: string;
  top: string;
  left: string;
  tone: LanguageTone;
  motion: LanguageMotion;
  size: "sm" | "md" | "lg";
};

const heroProfileTokens: HeroProfileToken[] = [
  {
    label: "HTML",
    top: "12%",
    left: "32%",
    tone: "white",
    motion: "slow",
    size: "sm",
  },
  {
    label: "CSS",
    top: "18%",
    left: "27%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "TS",
    top: "9%",
    left: "45%",
    tone: "magenta",
    motion: "fast",
    size: "sm",
  },
  {
    label: "React",
    top: "15%",
    left: "58%",
    tone: "cyan",
    motion: "medium",
    size: "lg",
  },
  {
    label: "JS",
    top: "20%",
    left: "70%",
    tone: "white",
    motion: "slow",
    size: "sm",
  },
  {
    label: "API",
    top: "24%",
    left: "80%",
    tone: "magenta",
    motion: "fast",
    size: "sm",
  },
  {
    label: "Go",
    top: "30%",
    left: "84%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Rust",
    top: "35%",
    left: "86%",
    tone: "white",
    motion: "slow",
    size: "sm",
  },
  {
    label: "C++",
    top: "42%",
    left: "89%",
    tone: "magenta",
    motion: "medium",
    size: "sm",
  },
  {
    label: "SQL",
    top: "48%",
    left: "84%",
    tone: "cyan",
    motion: "fast",
    size: "sm",
  },
  {
    label: "PHP",
    top: "54%",
    left: "87%",
    tone: "white",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Ruby",
    top: "60%",
    left: "83%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "Kotlin",
    top: "67%",
    left: "71%",
    tone: "cyan",
    motion: "medium",
    size: "md",
  },
  {
    label: "Swift",
    top: "74%",
    left: "62%",
    tone: "white",
    motion: "fast",
    size: "md",
  },
  {
    label: "Java",
    top: "80%",
    left: "52%",
    tone: "magenta",
    motion: "slow",
    size: "md",
  },
  {
    label: "Node",
    top: "77%",
    left: "40%",
    tone: "cyan",
    motion: "medium",
    size: "md",
  },
  {
    label: "Vite",
    top: "70%",
    left: "29%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "GraphQL",
    top: "84%",
    left: "43%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "Docker",
    top: "66%",
    left: "47%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Python",
    top: "58%",
    left: "52%",
    tone: "white",
    motion: "fast",
    size: "md",
  },
  {
    label: "Next",
    top: "52%",
    left: "59%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "Vue",
    top: "47%",
    left: "62%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Nuxt",
    top: "41%",
    left: "64%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "Sass",
    top: "35%",
    left: "66%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "JSON",
    top: "27%",
    left: "50%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Linux",
    top: "24%",
    left: "61%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "Git",
    top: "21%",
    left: "52%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "Rails",
    top: "30%",
    left: "45%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Astro",
    top: "36%",
    left: "43%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "C#",
    top: "42%",
    left: "41%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "UI",
    top: "48%",
    left: "39%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "UX",
    top: "54%",
    left: "36%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "CLI",
    top: "60%",
    left: "34%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "SSR",
    top: "66%",
    left: "33%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "SPA",
    top: "58%",
    left: "30%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "CMS",
    top: "48%",
    left: "29%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
  {
    label: "SEO",
    top: "39%",
    left: "31%",
    tone: "cyan",
    motion: "medium",
    size: "sm",
  },
  {
    label: "Figma",
    top: "29%",
    left: "33%",
    tone: "white",
    motion: "fast",
    size: "sm",
  },
  {
    label: "Node.js",
    top: "23%",
    left: "39%",
    tone: "magenta",
    motion: "slow",
    size: "md",
  },
  {
    label: "ML",
    top: "45%",
    left: "74%",
    tone: "white",
    motion: "medium",
    size: "sm",
  },
  {
    label: "WASM",
    top: "63%",
    left: "68%",
    tone: "cyan",
    motion: "fast",
    size: "sm",
  },
  {
    label: "AI",
    top: "72%",
    left: "55%",
    tone: "magenta",
    motion: "slow",
    size: "sm",
  },
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

function CodeProfilePortrait() {
  return (
    <div
      className="code-profile-shell relative w-full max-w-[34rem] home-reveal"
      style={{ animationDelay: "0.18s" }}
      aria-hidden="true"
    >
      <div className="code-profile-glow code-profile-glow-cyan" />
      <div className="code-profile-glow code-profile-glow-magenta" />
      <div className="code-profile-grid" />
      <svg
        className="code-profile-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M27 13C20 18 17 29 17 41C17 54 21 67 29 77C35 85 45 91 57 93C65 94 72 92 76 89C71 83 69 77 70 71C77 68 81 63 83 58C78 56 74 54 71 51C78 49 83 46 88 43C81 40 76 37 71 34C73 29 72 23 67 19C61 13 49 11 38 11C34 11 30 12 27 13Z" />
        <path className="code-profile-detail" d="M57 29C61 27 65 28 67 31" />
        <path className="code-profile-detail" d="M61 35C64 40 64 45 61 50" />
        <path className="code-profile-detail" d="M63 49C67 48 70 49 72 51" />
        <path className="code-profile-detail" d="M64 56C69 56 73 58 75 61" />
        <path className="code-profile-detail" d="M60 63C65 65 68 68 69 73" />
      </svg>
      <svg
        className="code-profile-outline code-profile-outline-secondary"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M66 71C68 78 72 84 79 88" />
      </svg>
      <div className="code-profile-signature">
        <span className="code-profile-signature-label">Synthetic Mood</span>
        <strong className="code-profile-signature-value">
          Sharp / Silent / Precise
        </strong>
      </div>
      {heroProfileTokens.map((token, index) => (
        <span
          key={`${token.label}-${token.top}-${token.left}`}
          style={{
            top: token.top,
            left: token.left,
            animationDelay: `${index * -0.22}s`,
          }}
          className={[
            "code-profile-token",
            token.motion === "slow"
              ? "floating-slow"
              : token.motion === "medium"
                ? "floating-medium"
                : "floating-fast",
            token.tone === "cyan"
              ? "code-profile-token-cyan"
              : token.tone === "magenta"
                ? "code-profile-token-magenta"
                : "code-profile-token-white",
            token.size === "lg"
              ? "code-profile-token-lg"
              : token.size === "md"
                ? "code-profile-token-md"
                : "code-profile-token-sm",
          ].join(" ")}
        >
          {token.label}
        </span>
      ))}
      <div className="code-profile-meta">
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>TypeScript</span>
        <span>React</span>
        <span>Node.js</span>
      </div>
    </div>
  );
}

function LanguageScatter({
  items,
}: {
  items: ReadonlyArray<{
    label: string;
    top: string;
    left: string;
    tone: LanguageTone;
    motion: LanguageMotion;
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
          <div className="hero-stage-nebula galaxy-nebula" aria-hidden="true" />
          <div
            className="hero-stage-dust galaxy-dust opacity-80"
            aria-hidden="true"
          />
          <div className="container-shell relative">
            <div className="home-hero-layout relative z-10 min-h-[32rem] items-center gap-12 sm:min-h-[38rem] md:min-h-[42rem] lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.9fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(28rem,0.92fr)]">
              <div className="home-hero-copy relative z-10 flex min-h-[20rem] max-w-3xl flex-col items-center justify-center text-center lg:min-h-[42rem] lg:items-start lg:justify-center lg:text-left">
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
                    <span className="matrix-title-copy">
                      {copy.heroTitleTop}
                    </span>
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
                  className="home-reveal mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
                  style={{ animationDelay: "0.32s" }}
                >
                  <Link to="/contact" className="primary-button">
                    {copy.contactCta}
                  </Link>
                  <Link to="/price" className="secondary-button">
                    {copy.priceCta}
                  </Link>
                </div>
              </div>
              <div className="relative z-10 flex justify-center pb-6 lg:justify-end lg:pb-0">
                <CodeProfilePortrait />
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