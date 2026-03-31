import { useState } from 'react';
import { Layout, Section, AxisLine, WireframeButton } from '../Common';
import { WireframeBackground } from '../WireframeBackground';

export const Contact = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    email: '',
    currentPhase: '',
    industry: '',
    sitePurpose: '',
    pageScale: '',
    updateFrequency: '',
    supportLevel: '',
    deadline: '',
    requirements: '',
    referenceUrl: '',
    coreValue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('お問い合わせありがとうございます。\n48時間以内に返信いたします。');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative pt-20 md:pt-36">
      <AxisLine />
      <WireframeBackground variant="minimal" />
      <Section className="py-0 mb-32 relative z-10">
        <Layout>
          <div className="col-span-8 mb-16 md:mb-24 text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12 uppercase leading-tight">Contact</h1>
            <p className="text-lg font-light text-white/40 leading-relaxed max-w-xl mx-auto tracking-widest">
              お問い合わせ / 制作依頼
            </p>
          </div>

          <div className="col-span-8">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="p-12 border border-white/10 bg-white/5 backdrop-blur-[30px] space-y-12">
                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                      会社名
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="会社名"
                      className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                      担当者名
                    </label>
                    <input
                      type="text"
                      name="personName"
                      value={formData.personName}
                      onChange={handleChange}
                      placeholder="担当者名"
                      className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="メールアドレス"
                    className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                    required
                  />
                </div>

                <div className="h-px bg-white/5"></div>

                {/* プロジェクト情報 */}
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    現在のフェーズ
                  </label>
                  <select
                    name="currentPhase"
                    value={formData.currentPhase}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a12] border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="launch">立ち上げ期</option>
                    <option value="renewal">既存のサイトの見直し</option>
                    <option value="growth">集客・拡張を強化したい</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                      業種
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="業種"
                      className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                      サイト目的
                    </label>
                    <input
                      type="text"
                      name="sitePurpose"
                      value={formData.sitePurpose}
                      onChange={handleChange}
                      placeholder="サイト目的"
                      className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    想定ページ規模
                  </label>
                  <select
                    name="pageScale"
                    value={formData.pageScale}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a12] border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="small">1〜3ページ程度</option>
                    <option value="medium">4〜7ページ程度</option>
                    <option value="large">8ページ以上</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    想定更新頻度
                  </label>
                  <select
                    name="updateFrequency"
                    value={formData.updateFrequency}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a12] border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="fixed">ほぼ固定で運用する</option>
                    <option value="regular">月1〜2回更新したい</option>
                    <option value="frequent">頻繁に更新・改善したい</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    必要な支援レベル
                  </label>
                  <select
                    name="supportLevel"
                    value={formData.supportLevel}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a12] border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="minimum">まず、必要最小限で始めたい</option>
                    <option value="balanced">設計と運用のバランスを取りたい</option>
                    <option value="full">改善と運用まで厚く伴走して欲しい</option>
                  </select>
                </div>

                <div className="h-px bg-white/5"></div>

                {/* 詳細情報 */}
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    希望納期
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="希望納期"
                    className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    必要な機能・要件
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="必要な機能・要件"
                    className="w-full bg-transparent border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 min-h-[120px] resize-none focus:border-[#00ffff]/40 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    参考サイト
                  </label>
                  <input
                    type="text"
                    name="referenceUrl"
                    value={formData.referenceUrl}
                    onChange={handleChange}
                    placeholder="参考サイト"
                    className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-2 placeholder:text-white/20 focus:border-[#00ffff]/40 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.6em] text-white/40 uppercase block">
                    一番伝えたい価値
                  </label>
                  <textarea
                    name="coreValue"
                    value={formData.coreValue}
                    onChange={handleChange}
                    placeholder="一番伝えたい価値"
                    className="w-full bg-transparent border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 placeholder:text-white/20 min-h-[120px] resize-none focus:border-[#00ffff]/40 transition-colors"
                  />
                </div>

                <div className="pt-8">
                  <WireframeButton type="submit" className="w-full">
                    送信する
                  </WireframeButton>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase">
                    Response within 48 hours.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </Layout>
      </Section>
    </div>
  );
};