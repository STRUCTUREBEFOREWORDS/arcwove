import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { Layout, Section, AxisLine, WireframeButton } from '../Common';
import { WireframeBackground } from '../WireframeBackground';

// ── 共通フィールドコンポーネント ────────────────────────────────────────────

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="text-[10px] tracking-[0.6em] text-white/40 uppercase">{children}</span>
    {required && (
      <span className="text-[8px] tracking-[0.4em] text-[#00ffff]/60 uppercase border border-[#00ffff]/20 px-1.5 py-0.5">
        必須
      </span>
    )}
  </div>
);

const inputCls = "w-full bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-wide py-3 placeholder:text-white/20 focus:border-[#00ffff]/50 transition-colors duration-300";
const selectCls = "w-full bg-[#0a0a12] border border-white/10 outline-none text-white text-sm tracking-wide py-3 px-4 focus:border-[#00ffff]/50 transition-colors duration-300 appearance-none cursor-pointer";
const textareaCls = "w-full bg-white/3 border border-white/10 outline-none text-white text-sm tracking-wide py-4 px-5 placeholder:text-white/20 min-h-[140px] resize-none focus:border-[#00ffff]/50 focus:bg-white/5 transition-colors duration-300";

// ── セクション区切り ─────────────────────────────────────────────────────────

const Divider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="flex-1 h-px bg-white/5" />
    <span className="text-[8px] tracking-[0.8em] text-white/20 uppercase">{label}</span>
    <div className="flex-1 h-px bg-white/5" />
  </div>
);

// ── お問い合わせフォーム ──────────────────────────────────────────────────────

const InquiryForm = () => {
  const [data, setData] = useState({ name: '', email: '', type: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('お問い合わせありがとうございます。\n48時間以内に返信いたします。');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* 氏名 */}
      <div>
        <FieldLabel required>名前</FieldLabel>
        <input
          type="text" name="name" value={data.name} onChange={onChange}
          placeholder="山田 太郎" className={inputCls} required
        />
      </div>

      {/* メール */}
      <div>
        <FieldLabel required>メールアドレス</FieldLabel>
        <input
          type="email" name="email" value={data.email} onChange={onChange}
          placeholder="your@email.com" className={inputCls} required
        />
      </div>

      {/* 種別 */}
      <div className="relative">
        <FieldLabel required>お問い合わせ種別</FieldLabel>
        <div className="relative">
          <select name="type" value={data.type} onChange={onChange} className={selectCls} required>
            <option value="">選択してください</option>
            <option value="service">サービスについての質問</option>
            <option value="improvement">既存サイトの改善・相談</option>
            <option value="estimate">見積もり・料金について</option>
            <option value="trouble">不具合・トラブルの報告</option>
            <option value="maintenance">運用・保守について</option>
            <option value="partner">パートナー・業務提携</option>
            <option value="media">メディア掲載・取材</option>
            <option value="other">その他</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
        </div>
      </div>

      {/* 内容 */}
      <div>
        <FieldLabel required>お問い合わせ内容</FieldLabel>
        <textarea
          name="message" value={data.message} onChange={onChange}
          placeholder="詳細をご記入ください。" className={textareaCls} required
        />
      </div>

      <div className="pt-4">
        <WireframeButton type="submit" className="w-full">送信する</WireframeButton>
        <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase text-center mt-6">Response within 48 hours.</p>
      </div>
    </form>
  );
};

// ── 制作依頼フォーム（既存） ─────────────────────────────────────────────────

const OrderForm = () => {
  const [data, setData] = useState({
    companyName: '', personName: '', email: '', currentPhase: '',
    industry: '', sitePurpose: '', pageScale: '', updateFrequency: '',
    supportLevel: '', deadline: '', requirements: '', referenceUrl: '', coreValue: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('制作依頼ありがとうございます。\n48時間以内に返信いたします。');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* 基本情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <FieldLabel required>会社名</FieldLabel>
          <input type="text" name="companyName" value={data.companyName} onChange={onChange}
            placeholder="会社名" className={inputCls} required />
        </div>
        <div>
          <FieldLabel required>担当者名</FieldLabel>
          <input type="text" name="personName" value={data.personName} onChange={onChange}
            placeholder="担当者名" className={inputCls} required />
        </div>
      </div>

      <div>
        <FieldLabel required>メールアドレス</FieldLabel>
        <input type="email" name="email" value={data.email} onChange={onChange}
          placeholder="メールアドレス" className={inputCls} required />
      </div>

      <Divider label="プロジェクト情報" />

      <div className="relative">
        <FieldLabel required>現在のフェーズ</FieldLabel>
        <div className="relative">
          <select name="currentPhase" value={data.currentPhase} onChange={onChange}
            className={selectCls} required>
            <option value="">選択してください</option>
            <option value="launch">立ち上げ期</option>
            <option value="renewal">既存のサイトの見直し</option>
            <option value="growth">集客・拡張を強化したい</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <FieldLabel>業種</FieldLabel>
          <input type="text" name="industry" value={data.industry} onChange={onChange}
            placeholder="業種" className={inputCls} />
        </div>
        <div>
          <FieldLabel>サイト目的</FieldLabel>
          <input type="text" name="sitePurpose" value={data.sitePurpose} onChange={onChange}
            placeholder="サイト目的" className={inputCls} />
        </div>
      </div>

      <div className="relative">
        <FieldLabel>想定ページ規模</FieldLabel>
        <div className="relative">
          <select name="pageScale" value={data.pageScale} onChange={onChange} className={selectCls}>
            <option value="">選択してください</option>
            <option value="small">1〜3ページ程度</option>
            <option value="medium">4〜7ページ程度</option>
            <option value="large">8ページ以上</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
        </div>
      </div>

      <div className="relative">
        <FieldLabel>想定更新頻度</FieldLabel>
        <div className="relative">
          <select name="updateFrequency" value={data.updateFrequency} onChange={onChange} className={selectCls}>
            <option value="">選択してください</option>
            <option value="fixed">ほぼ固定で運用する</option>
            <option value="regular">月1〜2回更新したい</option>
            <option value="frequent">頻繁に更新・改善したい</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
        </div>
      </div>

      <div className="relative">
        <FieldLabel>必要な支援レベル</FieldLabel>
        <div className="relative">
          <select name="supportLevel" value={data.supportLevel} onChange={onChange} className={selectCls}>
            <option value="">選択してください</option>
            <option value="minimum">まず、必要最小限で始めたい</option>
            <option value="balanced">設計と運用のバランスを取りたい</option>
            <option value="full">改善と運用まで厚く伴走して欲しい</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
        </div>
      </div>

      <Divider label="詳細情報" />

      <div>
        <FieldLabel>希望納期</FieldLabel>
        <input type="text" name="deadline" value={data.deadline} onChange={onChange}
          placeholder="希望納期" className={inputCls} />
      </div>

      <div>
        <FieldLabel>必要な機能・要件</FieldLabel>
        <textarea name="requirements" value={data.requirements} onChange={onChange}
          placeholder="必要な機能・要件" className={textareaCls} />
      </div>

      <div>
        <FieldLabel>参考サイト</FieldLabel>
        <input type="text" name="referenceUrl" value={data.referenceUrl} onChange={onChange}
          placeholder="参考サイト URL" className={inputCls} />
      </div>

      <div>
        <FieldLabel>一番伝えたい価値</FieldLabel>
        <textarea name="coreValue" value={data.coreValue} onChange={onChange}
          placeholder="一番伝えたい価値" className={textareaCls} />
      </div>

      <div className="pt-4">
        <WireframeButton type="submit" className="w-full">送信する</WireframeButton>
        <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase text-center mt-6">Response within 48 hours.</p>
      </div>
    </form>
  );
};

// ── タブ定義 ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'inquiry', label: 'お問い合わせ', en: 'INQUIRY' },
  { id: 'order',   label: '制作依頼',     en: 'ORDER' },
] as const;

type TabId = typeof TABS[number]['id'];

// ── メイン ───────────────────────────────────────────────────────────────────

export const Contact = () => {
  const [tab, setTab] = useState<TabId>('inquiry');

  return (
    <div className="relative pt-20 md:pt-36">
      <AxisLine />
      <WireframeBackground variant="minimal" />

      <Section className="py-0 mb-32 relative z-10">
        <Layout>

          {/* ヘッダー */}
          <div className="col-span-8 mb-16 md:mb-20 text-center px-4">
            {/* 上部アクセントライン */}
            <div className="relative inline-block mb-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[#00ffff]/40" />
              <span className="text-[9px] tracking-[1em] text-[#00ffff]/50 uppercase">Contact</span>
            </div>

            <h1 className="fs-h1 font-bold tracking-[0.3em] md:tracking-[0.4em] mb-6 uppercase leading-tight">
              {tab === 'inquiry' ? 'お問い合わせ' : '制作依頼'}
            </h1>
            <p className="text-xs font-light text-white/30 tracking-[0.3em] leading-loose">
              {tab === 'inquiry'
                ? 'ご質問・ご相談はこちらから。'
                : 'サイト制作のご依頼はこちらから。'}
            </p>
          </div>

          {/* タブ */}
          <div className="col-span-8 mb-12">
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-2 border border-white/10">
                {TABS.map(({ id, label, en }) => {
                  const active = tab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setTab(id)}
                      className={`relative py-5 flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        active ? 'bg-white/5' : 'bg-transparent hover:bg-white/3'
                      }`}
                    >
                      {/* アクティブ上部ライン */}
                      {active && (
                        <Motion.div
                          layoutId="tab-line"
                          className="absolute top-0 left-0 right-0 h-px bg-[#00ffff]"
                          style={{ boxShadow: '0 0 8px rgba(0,255,255,0.6)' }}
                        />
                      )}
                      <span className={`text-[9px] tracking-[0.8em] uppercase transition-colors duration-300 ${
                        active ? 'text-[#00ffff]/70' : 'text-white/20'
                      }`}>
                        {en}
                      </span>
                      <span className={`text-sm font-light tracking-[0.15em] transition-colors duration-300 ${
                        active ? 'text-white' : 'text-white/30'
                      }`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* フォームエリア */}
          <div className="col-span-8">
            <div className="max-w-4xl mx-auto px-4">
              {/* フォームコンテナ */}
              <div className="relative border border-white/10 overflow-hidden">
                {/* 上部グロー */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/20 to-transparent" />
                {/* 左端アクセント */}
                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-[#00ffff]/20 via-transparent to-transparent" />

                {/* コーナーマーカー */}
                {[
                  'top-3 left-3 border-t border-l',
                  'top-3 right-3 border-t border-r',
                  'bottom-3 left-3 border-b border-l',
                  'bottom-3 right-3 border-b border-r',
                ].map((cls) => (
                  <div key={cls} className={`absolute w-4 h-4 ${cls} border-white/20`} />
                ))}

                <div className="relative p-8 md:p-14 bg-white/[0.02]">
                  <AnimatePresence mode="wait">
                    <Motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {tab === 'inquiry' ? <InquiryForm /> : <OrderForm />}
                    </Motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </Layout>
      </Section>
    </div>
  );
};
