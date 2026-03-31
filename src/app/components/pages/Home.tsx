import { useRef } from 'react';
import { motion as Motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Layout, Section, WireframeButton, AxisLine } from '../Common';
import { WireframeBackground } from '../WireframeBackground';
import { useNavigate } from 'react-router-dom';

// ── 立体的 Structure Card ──────────────────────────────────────────────────
interface CardProps {
  number: string;
  title: string;
  titleJa: string;
  desc: string;
  items: { label: string; value: string }[];
  accent: string;
  delay: number;
}

const StructureCard3D = ({ number, title, titleJa, desc, items, accent, delay }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 240, damping: 26 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 240, damping: 26 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['10%', '90%']);
  const shadowX = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const shadowY = useTransform(my, [-0.5, 0.5], [-10, 10]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* 背面レイヤー3（最深部） */}
      <Motion.div
        style={{ x: shadowX, y: shadowY }}
        className="absolute inset-0 border opacity-20"
        style={{ borderColor: accent, x: shadowX, y: shadowY, scale: 0.96 }}
      />
      {/* 背面レイヤー2 */}
      <Motion.div
        style={{
          borderColor: accent,
          x: useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 }),
          y: useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 }),
          scale: 0.98,
        }}
        className="absolute inset-0 border opacity-30"
      />

      {/* メインカード */}
      <Motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', borderColor: `${accent}40` }}
        className="relative border bg-[#0a0a12] overflow-hidden cursor-default group"
      >
        {/* スキャンライン背景 */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 1px, transparent 8px)`,
          }}
        />

        {/* 上部アクセントライン */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        {/* マウス追従グロー */}
        <Motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse 60% 50% at ${glowX} ${glowY}, ${accent}20, transparent)`,
          }}
        />

        {/* コーナーマーカー */}
        {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'], ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, border]) => (
          <div key={pos} className={`absolute w-3 h-3 ${pos} ${border} opacity-40`} style={{ borderColor: accent }} />
        ))}

        <div className="relative z-10 p-6 md:p-7">
          {/* ヘッダー行 */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
            <span
              className="text-[9px] tracking-[1em] uppercase font-mono"
              style={{ color: `${accent}90` }}
            >
              {number}
            </span>
            <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-mono">{title}</span>
          </div>

          {/* タイトル */}
          <h3
            className="text-xl md:text-2xl font-bold tracking-[0.12em] mb-3 leading-tight"
            style={{ color: accent, fontFamily: 'Syne, sans-serif' }}
          >
            {titleJa}
          </h3>
          <p className="text-[11px] font-light text-white/40 tracking-[0.1em] leading-relaxed mb-6">
            {desc}
          </p>

          {/* 分解テーブル */}
          <div className="space-y-0 border border-white/5">
            {items.map(({ label, value }, i) => (
              <div
                key={i}
                className="grid grid-cols-5 border-b border-white/5 last:border-b-0 group/row hover:bg-white/3 transition-colors"
              >
                <div className="col-span-2 px-3 py-2.5 border-r border-white/5">
                  <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase block">{label}</span>
                </div>
                <div className="col-span-3 px-3 py-2.5">
                  <span className="text-[11px] font-light tracking-[0.1em]" style={{ color: `${accent}cc` }}>
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

const CARDS: CardProps[] = [
  {
    number: '01',
    title: 'IDENTITY',
    titleJa: 'アイデンティティ',
    desc: 'ブランドの本質を言語化し、視覚的な秩序として定義する。',
    items: [
      { label: 'CORE',     value: 'ブランド核の抽出' },
      { label: 'AXIS',     value: '差別化軸の設定' },
      { label: 'POSITION', value: 'ポジショニング定義' },
    ],
    accent: '#00ffff',
    delay: 0.1,
  },
  {
    number: '02',
    title: 'STRUCTURE',
    titleJa: '構造設計',
    desc: '情報の重力を設計し、ユーザーの思考経路を制御する。',
    items: [
      { label: 'LAYER',  value: '情報階層の設計' },
      { label: 'FLOW',   value: '導線フローの最適化' },
      { label: 'MAP',    value: 'コンテンツ構造化' },
    ],
    accent: '#6495ff',
    delay: 0.2,
  },
  {
    number: '03',
    title: 'EMOTION',
    titleJa: '感情設計',
    desc: '第一印象から信頼構築まで、感情の流れを意図的に設計する。',
    items: [
      { label: 'FIRST',  value: '第一印象の制御' },
      { label: 'TRUST',  value: '信頼構築の仕組み' },
      { label: 'ACTION', value: '行動喚起の設計' },
    ],
    accent: '#a855f7',
    delay: 0.3,
  },
  {
    number: '04',
    title: 'CONVERSION',
    titleJa: '変換設計',
    desc: '意思決定の摩擦を取り除き、行動を自然に引き出す。',
    items: [
      { label: 'CTA',      value: 'CTA設計' },
      { label: 'FRICTION', value: '摩擦ポイントの除去' },
      { label: 'DECISION', value: '意思決定支援' },
    ],
    accent: '#f59e0b',
    delay: 0.4,
  },
];

// ── Main ───────────────────────────────────────────────────────────────────
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
              className="fs-display font-bold tracking-[0.2em] md:tracking-[0.35em] mb-8 uppercase leading-tight"
            >
              解放せよ<br className="md:hidden" />{' '}感性と感覚を
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="fs-base font-light tracking-[0.2em] text-white/50 mb-12 leading-relaxed max-w-xl"
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

      {/* Structure Cards */}
      <Section className="relative overflow-hidden">
        <WireframeBackground variant="minimal" />
        <Layout className="relative z-10">
          <div className="col-span-8 mb-12 md:mb-16 text-center px-4">
            <Motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.6em] text-white/30 uppercase mb-4"
            >
              Psychological Architecture
            </Motion.p>
            <h2 className="fs-h2 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4">
              構造カード
            </h2>
            <p className="text-xs font-light text-white/30 tracking-[0.15em]">
              心理的な視点でブランドを分解し、設計する。
            </p>
          </div>
          <div className="col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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
            <h2 className="fs-h2 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6">
              Strengths
            </h2>
            <p className="text-sm font-light text-white/40 tracking-[0.2em]">
              世界観 × 具体力 × 冷静な設計
            </p>
          </div>

          <div className="col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              {
                num: '01',
                title: '世界観',
                en: 'WORLD VIEW',
                body: 'ブランドの思想を視覚的な秩序として表現。',
              },
              {
                num: '02',
                title: '具体力',
                en: 'CONCRETENESS',
                body: '抽象を実装可能な構造へ変換。',
              },
              {
                num: '03',
                title: '冷静な設計',
                en: 'CALM DESIGN',
                body: '感情ではなく、論理で組み上げる。',
              },
            ].map(({ num, title, en, body }, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative border border-white/10 p-6 md:p-8 bg-white/5 overflow-hidden group"
              >
                {/* 背景に大きなEN文字 */}
                <div
                  className="absolute -right-4 -bottom-4 text-[80px] md:text-[100px] font-black tracking-tighter leading-none pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {num}
                </div>
                <div className="relative z-10">
                  <div className="text-[9px] tracking-[0.8em] text-white/20 uppercase mb-3">{en}</div>
                  <h3
                    className="text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase mb-5"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {title}
                  </h3>
                  <div className="h-px w-8 bg-white/20 mb-5" />
                  <p className="text-sm font-light text-white/50 leading-relaxed tracking-wide">{body}</p>
                </div>
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
            <h2 className="fs-h2 font-bold tracking-[0.3em] uppercase">Process</h2>
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
              <h2 className="fs-h3 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
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
