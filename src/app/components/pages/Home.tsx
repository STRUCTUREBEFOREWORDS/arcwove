import { useRef } from 'react';
import { motion as Motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Layout, Section, WireframeButton, AxisLine } from '../Common';
import { WireframeBackground } from '../WireframeBackground';
import { useNavigate } from 'react-router-dom';

// ── 3D mouse-tracking structure card ──────────────────────────────────────
interface CardProps {
  number: string;
  title: string;
  titleJa: string;
  desc: string;
  items: string[];
  accent: string;
  delay: number;
}

const StructureCard3D = ({ number, title, titleJa, desc, items, accent, delay }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX  = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]),  { stiffness: 260, damping: 28 });
  const rotY  = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]),  { stiffness: 260, damping: 28 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <Motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className="relative border border-white/10 bg-white/3 backdrop-blur-sm p-6 md:p-8 cursor-default group overflow-hidden"
    >
      {/* Mouse-following glow */}
      <Motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

      {/* 3D depth layer */}
      <div className="absolute inset-0 border border-white/5" style={{ transform: 'translateZ(-4px)' }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-[10px] tracking-[0.8em] uppercase" style={{ color: `${accent}80` }}>{number}</span>
          <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase">{title}</span>
        </div>

        <h3 className="text-xl md:text-2xl tracking-[0.2em] mb-3" style={{ color: accent }}>{titleJa}</h3>
        <p className="text-xs font-light text-white/40 tracking-[0.15em] leading-relaxed mb-6">{desc}</p>

        <div className="space-y-2 pt-4 border-t border-white/5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
              <span className="text-[11px] font-light text-white/50 tracking-[0.15em]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Motion.div>
  );
};

const CARDS: CardProps[] = [
  {
    number: '01',
    title: 'IDENTITY',
    titleJa: 'アイデンティティ',
    desc: 'ブランドの本質を言語化し、視覚的な秩序として定義する。',
    items: ['ブランド核の抽出', '差別化軸の設定', 'ポジショニング定義'],
    accent: '#00ffff',
    delay: 0.1,
  },
  {
    number: '02',
    title: 'STRUCTURE',
    titleJa: '構造設計',
    desc: '情報の重力を設計し、ユーザーの思考経路を制御する。',
    items: ['情報階層の設計', '導線フローの最適化', 'コンテンツ構造化'],
    accent: '#6495ff',
    delay: 0.2,
  },
  {
    number: '03',
    title: 'EMOTION',
    titleJa: '感情設計',
    desc: '第一印象から信頼構築まで、感情の流れを意図的に設計する。',
    items: ['第一印象の制御', '信頼構築の仕組み', '行動喚起の設計'],
    accent: '#a855f7',
    delay: 0.3,
  },
  {
    number: '04',
    title: 'CONVERSION',
    titleJa: '変換設計',
    desc: '意思決定の摩擦を取り除き、行動を自然に引き出す。',
    items: ['CTA設計', '摩擦ポイントの除去', '意思決定支援'],
    accent: '#f59e0b',
    delay: 0.4,
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <AxisLine />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <WireframeBackground variant="default" />

        <Layout className="relative z-10">
          <div className="col-span-8 flex flex-col items-center justify-center text-center px-4">
            <Motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] tracking-[0.6em] text-white/30 uppercase mb-8"
            >
              Web Design Studio
            </Motion.p>

            <Motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.25em] md:tracking-[0.4em] mb-8 uppercase leading-tight"
            >
              解放せよ<br className="md:hidden" />{' '}
              感性と感覚を
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm md:text-lg font-light tracking-[0.2em] md:tracking-[0.3em] text-white/50 mb-12 leading-relaxed max-w-xl"
            >
              構造設計によってブランドの可能性を最大化する。
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <WireframeButton onClick={() => navigate('/price')} className="w-full sm:w-auto">
                PRICEを見る
              </WireframeButton>
              <WireframeButton variant="secondary" onClick={() => navigate('/contact')} className="w-full sm:w-auto">
                相談する
              </WireframeButton>
            </Motion.div>
          </div>
        </Layout>
      </section>

      {/* Structure Cards — 心理的構造分解 */}
      <Section className="relative overflow-hidden">
        <WireframeBackground variant="minimal" />

        <Layout className="relative z-10">
          <div className="col-span-8 mb-12 md:mb-20 text-center px-4">
            <Motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.6em] text-white/30 uppercase mb-4"
            >
              Psychological Architecture
            </Motion.p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6">
              構造カード
            </h2>
            <p className="text-sm font-light text-white/40 tracking-[0.15em] max-w-lg mx-auto leading-relaxed">
              心理的な視点でブランドを分解し、設計する。
            </p>
          </div>

          <div className="col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CARDS.map((card) => (
              <StructureCard3D key={card.number} {...card} />
            ))}
          </div>
        </Layout>
      </Section>

      {/* Strengths */}
      <Section className="relative overflow-hidden">
        <Layout className="relative z-10">
          <div className="col-span-8 mb-12 md:mb-20 text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6">Strengths</h2>
            <p className="text-sm font-light text-white/40 tracking-[0.2em]">
              世界観 × 具体力 × 冷静な設計
            </p>
          </div>

          <div className="col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              { title: '世界観', body: 'ブランドの思想を視覚的な秩序として表現。' },
              { title: '具体力', body: '抽象を実装可能な構造へ変換。' },
              { title: '冷静な設計', body: '感情ではなく、論理で組み上げる。' },
            ].map(({ title, body }, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border border-white/10 p-6 md:p-8 bg-white/5"
              >
                <h3 className="text-lg md:text-xl tracking-[0.3em] uppercase mb-4 md:mb-6">{title}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed tracking-wide">{body}</p>
              </Motion.div>
            ))}
          </div>
        </Layout>
      </Section>

      {/* Process */}
      <Section className="relative overflow-hidden">
        <WireframeBackground variant="minimal" />
        <Layout className="relative z-10">
          <div className="col-span-8 md:col-span-4 flex items-center mb-8 md:mb-0 px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.3em] uppercase">Process</h2>
          </div>
          <div className="col-span-8 md:col-span-4 space-y-6 md:space-y-8 md:pl-12 md:border-l border-white/5 px-4">
            <p className="text-base md:text-lg font-light leading-relaxed text-white/60 tracking-wide">
              思想が形になるまでの厳格なプロセス。<br />
              透明性効果、価格の正当化、安心の可視化。
            </p>
            <WireframeButton variant="secondary" onClick={() => navigate('/process')} className="w-full sm:w-auto">
              PROCESSを体験する
            </WireframeButton>
          </div>
        </Layout>
      </Section>

      {/* Price CTA */}
      <Section>
        <Layout>
          <div className="col-span-8 text-center py-12 md:py-20 border border-white/10 bg-white/5 mx-4 md:mx-0 relative overflow-hidden">
            <WireframeBackground variant="minimal" />
            <div className="relative z-10 px-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
                価格で勝たない。構造で圧倒する。
              </h2>
              <p className="text-sm font-light text-white/40 tracking-[0.2em] mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                完全オーダーメイドのみ。<br />
                サブスク化しない。工数と構造で説明する。
              </p>
              <WireframeButton onClick={() => navigate('/price')} className="w-full sm:w-auto">
                PRICEを見る
              </WireframeButton>
            </div>
          </div>
        </Layout>
      </Section>
    </div>
  );
};
