interface WireframeBackgroundProps {
  className?: string;
  variant?: 'default' | 'dense' | 'minimal';
}

export const WireframeBackground = ({ className = '', variant = 'default' }: WireframeBackgroundProps) => {
  const opacity = variant === 'dense' ? 0.5 : variant === 'minimal' ? 0.2 : 0.35;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes wf-flow {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -2400; }
          }
          @keyframes wf-flow-rev {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: 2400; }
          }
          @keyframes wf-pulse {
            0%, 100% { opacity: 0.2; }
            50%       { opacity: 0.7; }
          }
          .wf-a { stroke-dasharray: 500 180; animation: wf-flow     20s linear infinite; }
          .wf-b { stroke-dasharray: 380 260; animation: wf-flow-rev 26s linear infinite; }
          .wf-c { stroke-dasharray: 650 120; animation: wf-flow     32s linear infinite 6s; }
          .wf-d { stroke-dasharray: 280 350; animation: wf-flow-rev 19s linear infinite 3s; }
          .wf-e { stroke-dasharray: 480 200; animation: wf-flow     24s linear infinite 10s; }
          .wf-f { stroke-dasharray: 720 100; animation: wf-flow-rev 30s linear infinite 1s; }
          .wf-g { stroke-dasharray: 340 300; animation: wf-flow     17s linear infinite 8s; }
          .wf-dot { animation: wf-pulse 4s ease-in-out infinite; }
        `}</style>

        {/* Cyan sweeping curves */}
        <path className="wf-a" d="M-200,430 C150,30  480,870 760,390 C1040,-90 1320,720 1680,340"  stroke="rgba(0,255,255,0.55)"   strokeWidth="0.9"/>
        <path className="wf-b" d="M-80,200  C260,620 640,80  960,520 C1280,960 1460,190 1760,410"  stroke="rgba(0,255,255,0.3)"    strokeWidth="0.5"/>

        {/* Blue arcs */}
        <path className="wf-c" d="M0,720   C340,280 720,920 1040,410 C1360,-100 1520,640 1440,900" stroke="rgba(80,140,255,0.45)"  strokeWidth="0.8"/>
        <path className="wf-d" d="M280,0   C520,420 920,110 1140,530 C1360,950 1380,420 1440,620"  stroke="rgba(60,120,255,0.28)"  strokeWidth="0.5"/>

        {/* Purple traces */}
        <path className="wf-e" d="M-320,600 C40,80  440,940 840,300 C1240,-340 1540,720 1820,400" stroke="rgba(160,90,255,0.38)"  strokeWidth="0.7"/>
        <path className="wf-f" d="M80,920   C420,500 840,1020 1140,610 C1440,200 1520,820 1640,710" stroke="rgba(190,110,255,0.22)" strokeWidth="0.4"/>

        {/* White hairlines */}
        <path className="wf-g" d="M-100,50  C300,450 700,200  1100,580 C1500,960 1600,400 1700,300" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4"/>

        {/* Short connectors — static, very faint */}
        <path d="M180,140 L320,260"   stroke="rgba(0,255,255,0.18)"   strokeWidth="0.4"/>
        <path d="M740,70  L900,185"   stroke="rgba(80,140,255,0.18)"  strokeWidth="0.4"/>
        <path d="M1080,380 L1230,300" stroke="rgba(160,90,255,0.18)"  strokeWidth="0.4"/>
        <path d="M380,680 L530,630"   stroke="rgba(0,255,255,0.14)"   strokeWidth="0.3"/>
        <path d="M580,280 L680,360"   stroke="rgba(80,140,255,0.14)"  strokeWidth="0.3"/>
        <path d="M1300,150 L1400,240" stroke="rgba(255,255,255,0.1)"  strokeWidth="0.3"/>

        {/* Scattered dots */}
        {([
          [140, 170, 'rgba(0,255,255,0.55)',   2.0, 0.0],
          [460, 310, 'rgba(80,140,255,0.50)',  1.5, 0.6],
          [730, 110, 'rgba(160,90,255,0.45)',  2.5, 1.2],
          [1040,270, 'rgba(0,255,255,0.50)',   1.8, 1.8],
          [1270,460, 'rgba(80,140,255,0.45)',  2.0, 2.4],
          [190, 590, 'rgba(160,90,255,0.40)',  1.5, 3.0],
          [530, 740, 'rgba(0,255,255,0.45)',   2.2, 0.4],
          [880, 590, 'rgba(255,255,255,0.30)', 1.2, 1.0],
          [1130,690, 'rgba(80,140,255,0.40)',  2.0, 1.6],
          [340, 440, 'rgba(0,255,255,0.35)',   1.5, 2.2],
          [660, 510, 'rgba(160,90,255,0.35)',  1.8, 2.8],
          [1340,190, 'rgba(255,255,255,0.25)', 1.2, 3.4],
          [90,  820, 'rgba(0,255,255,0.30)',   2.0, 0.8],
          [800, 840, 'rgba(80,140,255,0.35)',  1.5, 1.4],
          [1410,740, 'rgba(160,90,255,0.30)',  2.0, 2.0],
        ] as [number, number, string, number, number][]).map(([cx, cy, fill, r, delay], i) => (
          <circle
            key={i}
            className="wf-dot"
            cx={cx}
            cy={cy}
            r={r}
            fill={fill}
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
};
