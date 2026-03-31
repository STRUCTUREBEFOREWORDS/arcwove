import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layout, Section } from '../Common';

const STEPS = [
  {
    id: '01',
    title: 'DISCOVERY',
    desc: '思想を抽出するための対話。',
    questions: [
      'なぜそれをやるのか？',
      '誰のためか？',
      '競合との差は？',
    ],
    range: [0.1, 0.28],
  },
  {
    id: '02',
    title: 'STRUCTURE',
    desc: '情報の骨組みを設計。',
    subtitle: '情報の骨格を設計する',
    range: [0.28, 0.46],
  },
  {
    id: '03',
    title: 'DESIGN',
    desc: '視覚的な秩序の構築。',
    subtitle: '美は、構造の上にのみ成立する。',
    range: [0.46, 0.64],
  },
  {
    id: '04',
    title: 'BUILD',
    desc: '堅牢な実装。',
    subtitle: '堅牢な実装。',
    range: [0.64, 0.82],
  },
  {
    id: '05',
    title: 'DEPLOY',
    desc: '世界への公開。',
    subtitle: '世界へ。',
    range: [0.82, 1.0],
  },
];

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 中央軸の発光進行
  const axisOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.6, 1]);
  const axisGlow = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [
    '0px 0px 0px rgba(0, 255, 255, 0)',
    '0px 0px 4px rgba(0, 255, 255, 0.2)',
    '0px 0px 8px rgba(0, 255, 255, 0.3)',
    '0px 0px 12px rgba(0, 255, 255, 0.4)',
    '0px 0px 20px rgba(0, 255, 255, 0.6)',
    '0px 0px 30px rgba(0, 255, 255, 0.8)',
  ]);

  return (
    <div ref={containerRef} className="relative pt-36" style={{ height: '550vh' }}>
      {/* 中央の思想軸ライン */}
      <motion.div
        className="fixed left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,255,255,0.3), rgba(255,255,255,0.1))',
          opacity: axisOpacity,
          boxShadow: axisGlow,
        }}
      />

      {/* 進行インジケーター（右側固定） */}
      <ProgressIndicator scrollProgress={scrollYProgress} />

      {/* Hero Section (0-100vh) */}
      <Section className="sticky top-0 h-screen flex items-center justify-center border-b-0 py-0 z-20">
        <Layout>
          <motion.div
            className="col-span-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing }}
          >
            <h1 className="text-7xl tracking-[0.5em] uppercase mb-8">Process</h1>
            <p className="text-lg font-light text-white/40 tracking-[0.3em]">
              思想が形になるまでの厳格なプロセス。
            </p>
          </motion.div>
        </Layout>
      </Section>

      {/* STEP 01 DISCOVERY */}
      <StepDiscovery scrollProgress={scrollYProgress} step={STEPS[0]} />

      {/* STEP 02 STRUCTURE */}
      <StepStructure scrollProgress={scrollYProgress} step={STEPS[1]} />

      {/* STEP 03 DESIGN */}
      <StepDesign scrollProgress={scrollYProgress} step={STEPS[2]} />

      {/* STEP 04 BUILD */}
      <StepBuild scrollProgress={scrollYProgress} step={STEPS[3]} />

      {/* STEP 05 DEPLOY */}
      <StepDeploy scrollProgress={scrollYProgress} step={STEPS[4]} />
    </div>
  );
};

// STEP 01 DISCOVERY
const StepDiscovery = ({ scrollProgress, step }: any) => {
  const opacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.05, step.range[1] - 0.05, step.range[1]], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.08], [60, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen flex items-center"
      style={{ opacity }}
    >
      <Layout>
        <motion.div className="col-span-4" style={{ y }}>
          <div className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-6">
            Step {step.id}
          </div>
          <h2 className="text-5xl tracking-[0.4em] uppercase mb-8">{step.title}</h2>
          <p className="text-base font-light text-white/50 tracking-[0.2em] leading-relaxed">
            {step.desc}
          </p>
        </motion.div>

        {/* 問い */}
        <motion.div
          className="col-span-4 space-y-8"
          style={{ y: useTransform(scrollProgress, [step.range[0] + 0.02, step.range[0] + 0.1], [80, 0]) }}
        >
          {step.questions.map((question: string, i: number) => (
            <motion.div
              key={i}
              className="border-l border-[#00ffff]/30 pl-6 py-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: easing }}
            >
              <p className="text-sm font-light text-[#00ffff]/70 tracking-[0.2em]">
                {question}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Layout>
    </motion.div>
  );
};

// STEP 02 STRUCTURE
const StepStructure = ({ scrollProgress, step }: any) => {
  const opacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.05, step.range[1] - 0.05, step.range[1]], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.08], [60, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen flex items-center"
      style={{ opacity }}
    >
      <Layout>
        {/* 左側：抽象構造図 */}
        <motion.div
          className="col-span-4 relative"
          style={{ y }}
        >
          <StructureWireframe scrollProgress={scrollProgress} range={step.range} />
        </motion.div>

        {/* 右側：テキスト */}
        <motion.div
          className="col-span-4"
          style={{ y: useTransform(scrollProgress, [step.range[0] + 0.02, step.range[0] + 0.1], [80, 0]) }}
        >
          <div className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-6">
            Step {step.id}
          </div>
          <h2 className="text-5xl tracking-[0.4em] uppercase mb-8">{step.title}</h2>
          <p className="text-xl font-light text-white/70 tracking-[0.15em] leading-relaxed mb-8">
            {step.subtitle}
          </p>
          <p className="text-sm font-light text-white/40 tracking-[0.2em] leading-relaxed">
            {step.desc}
          </p>
        </motion.div>
      </Layout>
    </motion.div>
  );
};

// STEP 03 DESIGN
const StepDesign = ({ scrollProgress, step }: any) => {
  const opacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.05, step.range[1] - 0.05, step.range[1]], [0, 1, 1, 0]);
  const gridOpacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.1], [0, 0.15]);

  return (
    <motion.div
      className="sticky top-0 h-screen flex items-center"
      style={{ opacity }}
    >
      {/* 背景グリッド */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: gridOpacity }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </motion.div>

      <Layout>
        <motion.div className="col-span-8 text-center">
          <motion.div
            style={{ y: useTransform(scrollProgress, [step.range[0], step.range[0] + 0.08], [60, 0]) }}
          >
            <div className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-6">
              Step {step.id}
            </div>
            <h2 className="text-6xl tracking-[0.4em] uppercase mb-12">{step.title}</h2>
            <p className="text-2xl font-light text-white/80 tracking-[0.15em] leading-relaxed mb-6 max-w-3xl mx-auto">
              {step.subtitle}
            </p>
            <p className="text-sm font-light text-white/40 tracking-[0.2em]">
              {step.desc}
            </p>
          </motion.div>

          {/* タイポグラフィの整列アニメーション */}
          <motion.div
            className="mt-20 space-y-4"
            style={{ 
              opacity: useTransform(scrollProgress, [step.range[0] + 0.05, step.range[0] + 0.15], [0, 1])
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-px bg-white/10 mx-auto"
                style={{
                  width: useTransform(scrollProgress, [step.range[0] + 0.08 + i * 0.03, step.range[0] + 0.16 + i * 0.03], ['0%', '60%'])
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </Layout>
    </motion.div>
  );
};

// STEP 04 BUILD
const StepBuild = ({ scrollProgress, step }: any) => {
  const opacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.05, step.range[1] - 0.05, step.range[1]], [0, 1, 1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen flex items-center overflow-hidden"
      style={{ opacity }}
    >
      {/* 抽象コードライン */}
      <CodeLinesBackground scrollProgress={scrollProgress} range={step.range} />

      <Layout>
        <motion.div
          className="col-span-8 text-center z-10 relative"
          style={{ y: useTransform(scrollProgress, [step.range[0], step.range[0] + 0.08], [60, 0]) }}
        >
          <div className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-6">
            Step {step.id}
          </div>
          <h2 className="text-6xl tracking-[0.4em] uppercase mb-12">{step.title}</h2>
          <p className="text-2xl font-light text-white/80 tracking-[0.15em] leading-relaxed mb-6">
            {step.subtitle}
          </p>
          <p className="text-sm font-light text-white/40 tracking-[0.2em]">
            {step.desc}
          </p>
        </motion.div>
      </Layout>
    </motion.div>
  );
};

// STEP 05 DEPLOY
const StepDeploy = ({ scrollProgress, step }: any) => {
  const opacity = useTransform(scrollProgress, [step.range[0], step.range[0] + 0.05, step.range[1]], [0, 1, 1]);
  const brightness = useTransform(scrollProgress, [step.range[0], step.range[1]], [1, 1.2]);
  const filter = useTransform(brightness, (v) => `brightness(${v})`);
  const scale = useTransform(scrollProgress, [step.range[0], step.range[1]], [1, 1.05]);

  return (
    <motion.div
      className="sticky top-0 h-screen flex items-center"
      style={{ opacity, filter }}
    >
      <Layout>
        <motion.div
          className="col-span-8 text-center"
          style={{ 
            y: useTransform(scrollProgress, [step.range[0], step.range[0] + 0.08], [60, 0]),
            scale
          }}
        >
          <div className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-6">
            Step {step.id}
          </div>
          <h2 className="text-7xl tracking-[0.5em] uppercase mb-12">{step.title}</h2>
          <motion.p 
            className="text-4xl font-light tracking-[0.2em] leading-relaxed"
            style={{
              color: useTransform(scrollProgress, [step.range[0] + 0.05, step.range[1]], ['rgba(255,255,255,0.8)', 'rgba(0,255,255,1)'])
            }}
          >
            {step.subtitle}
          </motion.p>
        </motion.div>
      </Layout>
    </motion.div>
  );
};

// 進行インジケーター
const ProgressIndicator = ({ scrollProgress }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v: number) => {
      if (v < 0.1) setActiveStep(0);
      else if (v < 0.28) setActiveStep(1);
      else if (v < 0.46) setActiveStep(2);
      else if (v < 0.64) setActiveStep(3);
      else if (v < 0.82) setActiveStep(4);
      else setActiveStep(5);
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full border transition-all duration-300 ${
            index === activeStep
              ? 'bg-[#00ffff] border-[#00ffff] shadow-[0_0_8px_rgba(0,255,255,0.6)]'
              : 'bg-transparent border-white/20'
          }`}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: index === activeStep ? 1.2 : 0.8,
            opacity: index === activeStep ? 1 : 0.5
          }}
          transition={{ duration: 0.3, ease: easing }}
        />
      ))}
    </div>
  );
};

// 構造図ワイヤーフレーム
const StructureWireframe = ({ scrollProgress, range }: any) => {
  return (
    <div className="relative w-full h-80">
      {/* 3つの矩形が段階的に描画 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-white/20"
          style={{
            left: `${i * 15}%`,
            top: `${i * 20}%`,
            width: '60%',
            height: '50%',
            opacity: useTransform(scrollProgress, [range[0] + i * 0.04, range[0] + i * 0.04 + 0.1], [0, 0.6])
          }}
        />
      ))}

      {/* 接続線 */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-white/20"
        style={{
          height: useTransform(scrollProgress, [range[0] + 0.05, range[0] + 0.15], ['0%', '100%'])
        }}
      />
    </div>
  );
};

// 抽象コードライン
const CodeLinesBackground = ({ scrollProgress, range }: any) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#00ffff]/20 to-transparent"
          style={{
            left: `${Math.random() * 30 + 10}%`,
            width: `${Math.random() * 40 + 20}%`,
            top: useTransform(
              scrollProgress,
              [range[0], range[1]],
              [`${-10 + i * 8}%`, `${100 + i * 8}%`]
            ),
            opacity: useTransform(scrollProgress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 0.3, 0.3, 0]),
          }}
        />
      ))}
    </div>
  );
};