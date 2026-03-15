import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { getPaymentMethods, getProcessSteps } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";
import hearingImage from "../../画像/ヒアリング.webp";
import structureImage from "../../画像/設計.webp";
import designImage from "../../画像/デザイン設計.webp";
import developmentImage from "../../画像/開発.webp";
import launchImage from "../../画像/公開.webp";

const processImages: Partial<
  Record<string, { src: string; alt: { ja: string; en: string } }>
> = {
  hearing: {
    src: hearingImage,
    alt: { ja: "ヒアリング工程のイメージ", en: "Discovery phase visual" },
  },
  plan: {
    src: structureImage,
    alt: { ja: "プラン選択工程のイメージ", en: "Plan selection phase visual" },
  },
  contract: {
    src: designImage,
    alt: {
      ja: "契約工程のイメージ",
      en: "Contract phase visual",
    },
  },
  production: {
    src: developmentImage,
    alt: { ja: "制作開始工程のイメージ", en: "Production phase visual" },
  },
  launch: {
    src: launchImage,
    alt: { ja: "公開工程のイメージ", en: "Launch phase visual" },
  },
};

export function ProcessPage() {
  const { locale } = useSitePreferences();
  const processSteps = getProcessSteps(locale);
  const paymentMethods = getPaymentMethods(locale);
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
      title: "問い合わせから月額保守まで、契約と決済も含めて見せる。",
      lead: "制作だけでなく、プラン選択、契約、Stripe決済、公開後の保守までを一本の流れで可視化しています。依頼前に全体像が見えるほど、意思決定は速くなります。",
      paymentTitle: "対応決済",
      paymentBody: "契約後の決済は Stripe で処理し、クレジットカード、Apple Pay、Google Pay に対応します。",
      seoTitle: "PROCESS",
      seoDescription:
        "STRUCTURE の契約から制作、Stripe 決済、公開後の月額保守までの流れを確認できます。",
    },
    en: {
      eyebrow: "PROCESS",
      title:
        "Show the path from inquiry to monthly maintenance, including contract and payment.",
      lead: "This flow covers not only production, but also plan selection, contract, Stripe payment, and post-launch maintenance in one visible sequence. The clearer the path, the faster the decision.",
      paymentTitle: "Supported payments",
      paymentBody: "After the contract, Stripe handles billing with credit card, Apple Pay, and Google Pay support.",
      seoTitle: "PROCESS",
      seoDescription:
        "Review the STRUCTURE flow from inquiry and contract through Stripe payment, launch, and monthly maintenance.",
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
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                {copy.paymentTitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {copy.paymentBody}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <span
                    key={method.id}
                    className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-white/75"
                  >
                    {method.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="process-timeline relative space-y-6 pl-4 before:absolute before:left-1 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-white/10 sm:space-y-8 sm:pl-6 sm:before:left-2">
            {processSteps.map((step, index) => {
              const processImage = processImages[step.id];

              return (
                <article
                  key={step.step}
                  className="process-card relative glass-panel rounded-[2rem] p-6 sm:p-8"
                  style={{
                    transform: `translate3d(${pointerState.shiftX * ((index + 1) * 0.08)}px, ${pointerState.shiftY * ((index + 1) * 0.12)}px, 0)`,
                  }}
                >
                  {processImage ? (
                    <div className="process-media mb-6 overflow-hidden rounded-[1.5rem] border border-white/10">
                      <img
                        src={processImage.src}
                        alt={processImage.alt[locale]}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
