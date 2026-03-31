import React, { useState } from 'react';
import { Layout, Section, WireframeBox, AxisLine } from '../Common';

const CATEGORIES = ['Corporate', 'LP', 'EC', 'Brand', 'Experimental'];

export const Sample = () => {
  const [activeCategory, setActiveCategory] = useState('Corporate');

  return (
    <div className="relative pt-36">
      <AxisLine />
      <Section className="py-0 mb-32">
        <Layout>
          <div className="col-span-8 mb-24 text-center">
            <h1 className="fs-h1 font-semibold tracking-[0.3em] md:tracking-[0.4em] mb-12 uppercase leading-tight">Sample</h1>
            <p className="text-sm font-light text-white/40 tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
              実績ではない。設計思想の提示。<br />
              量ではなく構造力を見せる。
            </p>
          </div>

          {/* カテゴリータブ */}
          <div className="col-span-8 mb-16">
            <div className="flex gap-8 justify-center border-b border-white/5 pb-4 overflow-x-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.5em] uppercase font-light transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat ? 'text-white' : 'text-white/20 hover:text-white/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* サンプルグリッド - 1カテゴリー10想定 */}
          <div className="col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="group aspect-[3/4] border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer">
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-6">
                  <div className="text-[10px] tracking-[0.5em] text-white/30 uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="w-8 h-px bg-white/10" />
                  <div className="text-[10px] tracking-[0.2em] text-white/20 uppercase text-center">
                    {activeCategory}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 補足説明 */}
          <div className="col-span-8 mt-20 text-center">
            <p className="text-xs font-light text-white/30 tracking-[0.2em] leading-relaxed">
              カテゴリー別に設計思想を提示。<br />
              実績羅列型にしない。思想と設計力で勝つ。
            </p>
          </div>
        </Layout>
      </Section>
    </div>
  );
};