import { Layout, Section, WireframeButton, AxisLine } from '../Common';
import { WireframeBackground } from '../WireframeBackground';
import { useNavigate } from 'react-router-dom';

export const Price = () => {
  const navigate = useNavigate();

  const handleStripeCheckout = (planType: string) => {
    // Stripe Checkoutへの遷移（実際のStripe連動時はここにStripe Checkout URLを設定）
    console.log(`Stripe checkout for plan: ${planType}`);
    // window.location.href = `YOUR_STRIPE_CHECKOUT_URL_FOR_${planType}`;
    alert(`Stripe決済ページへ移動します（${planType}プラン）\n※実装時は実際のStripe URLを設定してください`);
  };

  return (
    <div className="relative pt-20 md:pt-36">
      <AxisLine />
      <WireframeBackground variant="minimal" />
      <Section className="py-0 mb-32 relative z-10">
        <Layout>
          <div className="col-span-8 mb-16 md:mb-24 text-center px-4">
            <h1 className="fs-h1 font-bold tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12 uppercase leading-tight">Price</h1>
            <p className="fs-base font-light text-white/40 tracking-widest max-w-xl mx-auto leading-relaxed">
              価格で勝たない。構造で圧倒する。
            </p>
            <p className="text-sm font-light text-white/30 tracking-[0.2em] mt-6">
              月額プランで、あなたのサイトを継続的に支援。
            </p>
          </div>

          <div className="col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-stretch px-4 md:px-0">
            {/* Launch - Starter Plan */}
            <div className="p-8 border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-2">Launch</h3>
              <h4 className="text-lg font-light tracking-wide text-white/80 mb-8">Starter Plan</h4>
              <p className="text-xs font-light text-white/40 leading-relaxed tracking-wide mb-8">
                サイトを公開するためのプラン。初期費用を抑えて、まずは公開したい方向けです。
              </p>
              
              <div className="mb-2">
                <div className="text-[10px] tracking-[0.8em] text-white/30 uppercase mb-2">月額</div>
                <div className="text-4xl font-light tracking-tighter">¥10,000</div>
              </div>
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.8em] text-white/30 uppercase mb-2">最低契約期間</div>
                <div className="text-sm font-light text-white/60">6ヶ月</div>
              </div>
              <div className="h-px w-16 bg-white/20 mb-8"></div>
              
              <div className="flex-1 space-y-4 mb-12">
                <div className="text-[10px] tracking-[0.8em] text-white/40 uppercase mb-4">含まれる内容</div>
                <div className="space-y-3 text-xs font-light text-white/50 tracking-wider leading-relaxed">
                  <div>・ウェブサイト制作（最大5ページ）</div>
                  <div>・レスポンシブ対応（スマホ最適化）</div>
                  <div>・SEO対策</div>
                  <div>・更新（月4回まで）</div>
                  <div>・セキュリティ管理</div>
                  <div>・メールサポート</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <WireframeButton className="w-full" onClick={() => handleStripeCheckout('Starter')}>
                  このプランで申し込む
                </WireframeButton>
                <WireframeButton variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                  相談する
                </WireframeButton>
              </div>
            </div>

            {/* Business - Standard Plan (MOST POPULAR) */}
            <div className="p-10 border border-[#00ffff]/30 bg-[#00ffff]/5 flex flex-col relative scale-105">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent"></div>
              <h3 className="text-[10px] tracking-[0.8em] text-[#00ffff]/60 uppercase mb-2">Business</h3>
              <div className="flex items-center gap-3 mb-8">
                <h4 className="text-lg font-light tracking-wide text-white/90">Standard Plan</h4>
                <span className="text-[8px] tracking-[0.6em] text-[#00ffff] uppercase border border-[#00ffff]/40 px-2 py-1">Most Popular</span>
              </div>
              <p className="text-xs font-light text-white/50 leading-relaxed tracking-wide mb-8">
                サイトを運用するためのプラン。公開後も整えながら育てたい事業向けです。
              </p>
              
              <div className="mb-2">
                <div className="text-[10px] tracking-[0.8em] text-[#00ffff]/40 uppercase mb-2">月額</div>
                <div className="text-4xl font-light tracking-tighter text-white">¥15,000</div>
              </div>
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.8em] text-[#00ffff]/40 uppercase mb-2">最低契約期間</div>
                <div className="text-sm font-light text-white/70">6ヶ月</div>
              </div>
              <div className="h-px w-16 bg-[#00ffff]/40 mb-8"></div>
              
              <div className="flex-1 space-y-4 mb-12">
                <div className="text-[10px] tracking-[0.8em] text-[#00ffff]/50 uppercase mb-4">含まれる内容</div>
                <div className="space-y-3 text-xs font-light text-white/60 tracking-wider leading-relaxed">
                  <div>・ウェブサイト制作（最大8ページ）</div>
                  <div>・レスポンシブ対応</div>
                  <div>・SEO対策</div>
                  <div>・AIチャットボット導入</div>
                  <div>・更新（月4回まで）</div>
                  <div>・アクセス解析導入（Google Analytics / Search Console）</div>
                  <div>・運用管理</div>
                  <div>・セキュリティ管理</div>
                  <div>・メールサポート</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <WireframeButton className="w-full" onClick={() => handleStripeCheckout('Standard')}>
                  このプランで申し込む
                </WireframeButton>
                <WireframeButton variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                  相談する
                </WireframeButton>
              </div>
            </div>

            {/* Marketing - Growth Plan */}
            <div className="p-8 border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-2">Marketing</h3>
              <h4 className="text-lg font-light tracking-wide text-white/80 mb-8">Growth Plan</h4>
              <p className="text-xs font-light text-white/40 leading-relaxed tracking-wide mb-8">
                サイトで集客するためのプラン。改善とSEOを回しながら成長を狙う構成です。
              </p>
              
              <div className="mb-2">
                <div className="text-[10px] tracking-[0.8em] text-white/30 uppercase mb-2">月額</div>
                <div className="text-4xl font-light tracking-tighter">¥20,000</div>
              </div>
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.8em] text-white/30 uppercase mb-2">最低契約期間</div>
                <div className="text-sm font-light text-white/60">6ヶ月</div>
              </div>
              <div className="h-px w-16 bg-white/20 mb-8"></div>
              
              <div className="flex-1 space-y-4 mb-12">
                <div className="text-[10px] tracking-[0.8em] text-white/40 uppercase mb-4">含まれる内容</div>
                <div className="space-y-3 text-xs font-light text-white/50 tracking-wider leading-relaxed">
                  <div>・ウェブサイト制作（最大12ページ）</div>
                  <div>・レスポンシブ対応</div>
                  <div>・SEO対策</div>
                  <div>・修正（月4回まで）</div>
                  <div>・キーワード分析</div>
                  <div>・SEOレポート（月1回）</div>
                  <div>・更新（月4回まで）</div>
                  <div>・運用管理</div>
                  <div>・月次サイトチェック</div>
                  <div>・優先サポート</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <WireframeButton className="w-full" onClick={() => handleStripeCheckout('Growth')}>
                  このプランで申し込む
                </WireframeButton>
                <WireframeButton variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                  相談する
                </WireframeButton>
              </div>
            </div>
          </div>

          {/* 価格の正当化 */}
          <div className="col-span-8 mt-32 text-center">
            <p className="text-sm font-light text-white/40 tracking-[0.2em] mb-8 leading-relaxed">
              価格の正当化はPROCESS体験で行う。<br />
              安売りしない。サブスク化しない。工数と構造で説明する。
            </p>
            <WireframeButton variant="secondary" onClick={() => navigate('/process')}>
              PROCESSを体験する
            </WireframeButton>
          </div>
        </Layout>
      </Section>
    </div>
  );
};