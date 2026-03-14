import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { getProcessSteps } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";
import hearingImage from "../../画像/ヒアリング.webp";
import structureImage from "../../画像/設計.webp";
import designImage from "../../画像/デザイン設計.webp";
import developmentImage from "../../画像/開発.webp";
import launchImage from "../../画像/公開.webp";

const processImages = {
  hearing: {
    src: hearingImage,
    alt: { ja: "ヒアリング工程のイメージ", en: "Discovery phase visual" },
  },
  structure: {
    src: structureImage,
    alt: { ja: "構造設計工程のイメージ", en: "Structure design phase visual" },
  },
  design: {
    src: designImage,
    alt: {
      ja: "デザイン設計工程のイメージ",
      en: "Design direction phase visual",
    },
  },
  development: {
    src: developmentImage,
    alt: { ja: "開発工程のイメージ", en: "Development phase visual" },
  },
  launch: {
    src: launchImage,
    alt: { ja: "公開工程のイメージ", en: "Launch phase visual" },
  },
} as const;

export function ProcessPage() {
  const { locale } = useSitePreferences();
  const processSteps = getProcessSteps(locale);
  const [progress, setProgress] = useState(0);
  const [pointerState, setPointerState] = useState({
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    active: false,
  });
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const copy = {
    ja: {
      eyebrow: "PROCESS",
      title: "流れが見えると、依頼前の不安は減る。",
      lead: "スクロールに応じて制作フローを追える構成です。どの段階で何を決めるかが明確なので、検討段階でも全体像を把握できます。",
      seoTitle: "PROCESS",
      seoDescription:
        "STRUCTURE の制作フローを確認できます。ヒアリングから構造設計、デザイン、開発、公開までの進行を可視化しています。",
    },
    en: {
      eyebrow: "PROCESS",
      title:
        "When the flow is visible, uncertainty drops before the project starts.",
      lead: "This page lets you follow the production flow as you scroll. Each decision point is clear, so you can understand the whole picture even during early planning.",
      seoTitle: "PROCESS",
      seoDescription:
        "Review the STRUCTURE production flow from discovery and structure design through design direction, development, and launch.",
    },
  }[locale];

  usePageSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    locale,
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(100, Math.max(0, ratio * 100)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const rect = shell.getBoundingClientRect();
    setPointerState({
      x: rect.width * 0.5,
      y: rect.height * 0.28,
      shiftX: 0,
      shiftY: 0,
      active: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const rect = shell.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    const normalizedX = (nextX / rect.width - 0.5) * 24;
    const normalizedY = (nextY / rect.height - 0.5) * 18;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setPointerState({
        x: nextX,
        y: nextY,
        shiftX: normalizedX,
        shiftY: normalizedY,
        active: true,
      });
    });
  };

  const handlePointerLeave = () => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const rect = shell.getBoundingClientRect();
    setPointerState({
      x: rect.width * 0.5,
      y: rect.height * 0.28,
      shiftX: 0,
      shiftY: 0,
      active: false,
    });
  };

  const processStyle = {
    "--process-x": `${pointerState.x}px`,
    "--process-y": `${pointerState.y}px`,
    "--process-shift-x": `${pointerState.shiftX}px`,
    "--process-shift-y": `${pointerState.shiftY}px`,
  } as CSSProperties;

  return (
    <section
      ref={shellRef}
      className="process-shell section-block overflow-hidden pb-24 md:pb-32"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={processStyle}
    >
      <div
        className={[
          "process-pointer-glow",
          pointerState.active ? "is-active" : "",
        ].join(" ")}
        aria-hidden="true"
      />
      <div className="process-grid-wash" aria-hidden="true" />
      <div className="container-shell">
        <div className="sticky top-24 z-20 mb-10 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="eyebrow">{copy.eyebrow}</span>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <h1 className="section-title">{copy.title}</h1>
            <p className="mt-6 section-copy">{copy.lead}</p>
          </div>

          <div className="process-timeline relative space-y-6 pl-4 before:absolute before:left-1 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-white/10 sm:space-y-8 sm:pl-6 sm:before:left-2">
            {processSteps.map((step, index) => (
              <article
                key={step.step}
                className="process-card relative glass-panel rounded-[2rem] p-6 sm:p-8"
                style={{
                  transform: `translate3d(${pointerState.shiftX * ((index + 1) * 0.08)}px, ${pointerState.shiftY * ((index + 1) * 0.12)}px, 0)`,
                }}
              >
                {processImages[step.id] ? (
                  <div className="process-media mb-6 overflow-hidden rounded-[1.5rem] border border-white/10">
                    <img
                      src={processImages[step.id].src}
                      alt={processImages[step.id].alt[locale]}
                      className="h-52 w-full object-cover sm:h-64"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <span className="absolute -left-[0.85rem] top-10 h-3.5 w-3.5 rounded-full border border-cyan-300/50 bg-cyan-300/30 shadow-[0_0_30px_rgba(0,255,255,0.35)] sm:-left-[1.1rem] sm:h-4 sm:w-4" />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs tracking-[0.28em] text-cyan-300">
                      {step.step}
                    </p>
                    <h2 className="mt-4 font-['Space_Grotesk'] text-2xl sm:text-3xl">
                      {step.title}
                    </h2>
                  </div>
                  <p className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
