import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageSeo } from "../hooks/usePageSeo";

const API_URL = import.meta.env.VITE_API_URL ?? "";

type Status = "loading" | "pending" | "submitted" | "reviewed" | "error" | "expired";

type UserInfo = {
  email: string;
  name: string | null;
  company_name: string | null;
  client_type: string;
  language: string;
  plan_id: string;
  deadline: string | null;
  status: string;
};

const copy = {
  ja: {
    title: "カウンセリングシート",
    lead: "制作を開始するにあたり、以下の内容をご記入ください。いただいた情報をもとに最適な構成を設計します。",
    deadline: "提出期限",
    alreadySubmitted: "カウンセリングシートはすでに提出済みです。",
    alreadyReviewed: "カウンセリングシートは確認済みです。制作を進めています。",
    invalidToken: "URLが無効または期限切れです。",
    sections: {
      basic: "基本情報",
      project: "プロジェクト詳細",
      design: "デザイン・スタイル",
      content: "コンテンツ・機能",
      other: "その他",
    },
    fields: {
      company_name: "会社名 / 屋号",
      contact_name: "担当者名",
      industry: "業種",
      site_objective: "サイトの目的・目標",
      target_audience: "ターゲット層",
      page_count: "希望ページ数",
      launch_date: "希望公開日",
      design_style: "好みのデザインスタイル",
      reference_sites: "参考サイトURL",
      brand_assets: "ブランドアセット（ロゴ・カラー・フォント）",
      existing_content: "既存コンテンツの有無",
      required_features: "必要な機能・要件",
      additional_notes: "その他・備考",
    },
    styleOptions: [
      { value: "minimal",    label: "ミニマル・余白重視" },
      { value: "modern",     label: "モダン・スタイリッシュ" },
      { value: "corporate",  label: "コーポレート・信頼感" },
      { value: "bold",       label: "ボールド・インパクト重視" },
      { value: "warm",       label: "温かみ・親しみやすさ" },
    ],
    contentOptions: [
      { value: "none",    label: "まだ用意していない" },
      { value: "partial", label: "一部あり" },
      { value: "ready",   label: "テキスト・画像ともに準備済み" },
    ],
    submit: "カウンセリングシートを提出する",
    submitting: "送信中...",
    successTitle: "提出完了",
    successBody: "カウンセリングシートを受け取りました。内容を確認のうえ、制作を開始いたします。",
    required: "必須",
  },
  en: {
    title: "Counseling Sheet",
    lead: "Please fill in the details below to help us start production. We will use this information to design the right structure for your site.",
    deadline: "Submission deadline",
    alreadySubmitted: "Your counseling sheet has already been submitted.",
    alreadyReviewed: "Your counseling sheet has been reviewed. Production is underway.",
    invalidToken: "The URL is invalid or has expired.",
    sections: {
      basic: "Basic Information",
      project: "Project Details",
      design: "Design & Style",
      content: "Content & Features",
      other: "Additional Notes",
    },
    fields: {
      company_name: "Company / Business name",
      contact_name: "Contact person",
      industry: "Industry",
      site_objective: "Site objective and goals",
      target_audience: "Target audience",
      page_count: "Desired number of pages",
      launch_date: "Desired launch date",
      design_style: "Preferred design style",
      reference_sites: "Reference site URLs",
      brand_assets: "Brand assets (logo, colors, fonts)",
      existing_content: "Existing content status",
      required_features: "Required features and requirements",
      additional_notes: "Additional notes",
    },
    styleOptions: [
      { value: "minimal",   label: "Minimal — spacious, quiet" },
      { value: "modern",    label: "Modern — sleek, contemporary" },
      { value: "corporate", label: "Corporate — trustworthy, structured" },
      { value: "bold",      label: "Bold — high impact, expressive" },
      { value: "warm",      label: "Warm — friendly, approachable" },
    ],
    contentOptions: [
      { value: "none",    label: "Not prepared yet" },
      { value: "partial", label: "Partially ready" },
      { value: "ready",   label: "Text and images ready" },
    ],
    submit: "Submit counseling sheet",
    submitting: "Submitting...",
    successTitle: "Submitted",
    successBody: "We have received your counseling sheet. We will review it and begin production.",
    required: "Required",
  },
} as const;

type Locale = keyof typeof copy;

function getLang(language: string): Locale {
  return language === "ja" ? "ja" : "en";
}

export function CounselingPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus]     = useState<Status>("loading");
  const [user, setUser]         = useState<UserInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const locale: Locale = user ? getLang(user.language) : "ja";
  const t = copy[locale];

  usePageSeo({ title: t.title, description: t.lead, locale });

  useEffect(() => {
    if (!token) { setStatus("error"); return; }

    const controller = new AbortController();

    fetch(`${API_URL}/api/counseling/${token}`, { signal: controller.signal })
      .then((r) => {
        if (r.status === 404) throw new Error("not_found");
        if (!r.ok) throw new Error("error");
        return r.json();
      })
      .then((data: UserInfo) => {
        setUser(data);
        if (data.status === "reviewed")  { setStatus("reviewed"); return; }
        if (data.status === "submitted") { setStatus("submitted"); return; }
        setStatus("pending");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [token]);

  const [form, setForm] = useState<Record<string, string>>({});

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const resp = await fetch(`${API_URL}/api/counseling/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: form }),
      });
      if (!resp.ok) throw new Error();
      setSubmitDone(true);
      setStatus("submitted");
    } catch {
      alert(locale === "ja" ? "送信に失敗しました。再度お試しください。" : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Loading ──────────────────────────────────────────────
  if (status === "loading") {
    return (
      <section className="section-block">
        <div className="container-shell">
          <div className="h-64 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        </div>
      </section>
    );
  }

  // ── Error / no token → show public inquiry form ───────────
  if (status === "error") {
    return <InquiryForm searchParams={searchParams} />;
  }

  // ── Already reviewed ─────────────────────────────────────
  if (status === "reviewed") {
    return (
      <section className="section-block">
        <div className="container-shell">
          <div className="glass-panel rounded-[2rem] p-10 text-center max-w-lg mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">REVIEWED</p>
            <p className="mt-4 text-white/70">{t.alreadyReviewed}</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Success after submit ──────────────────────────────────
  if (submitDone || status === "submitted") {
    return (
      <section className="section-block">
        <div className="container-shell">
          <div className="glass-panel rounded-[2rem] p-10 text-center max-w-lg mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
              {t.successTitle}
            </p>
            <p className="mt-4 text-white/70">{t.successBody}</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Form ──────────────────────────────────────────────────
  const deadline = user?.deadline
    ? new Date(user.deadline).toLocaleString(locale === "ja" ? "ja-JP" : "en-US", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", timeZoneName: "short",
      })
    : null;

  return (
    <section className="section-block pb-24">
      <div className="container-shell max-w-2xl">
        <span className="eyebrow">COUNSELING</span>
        <h1 className="section-title mt-2">{t.title}</h1>
        <p className="mt-4 section-copy">{t.lead}</p>

        {deadline && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2.5 text-sm text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            {t.deadline}：{deadline}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-10">

          {/* ── Section 1: Basic ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-5">
              {t.sections.basic}
            </p>
            <div className="space-y-4">
              <Field label={t.fields.company_name} required>
                <input
                  type="text" required
                  value={form.company_name ?? ""}
                  onChange={(e) => set("company_name", e.target.value)}
                  className="input-field"
                />
              </Field>
              <Field label={t.fields.contact_name} required>
                <input
                  type="text" required
                  value={form.contact_name ?? ""}
                  onChange={(e) => set("contact_name", e.target.value)}
                  className="input-field"
                />
              </Field>
              <Field label={t.fields.industry} required>
                <input
                  type="text" required
                  value={form.industry ?? ""}
                  onChange={(e) => set("industry", e.target.value)}
                  className="input-field"
                />
              </Field>
            </div>
          </div>

          {/* ── Section 2: Project ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-5">
              {t.sections.project}
            </p>
            <div className="space-y-4">
              <Field label={t.fields.site_objective} required>
                <textarea
                  rows={4} required
                  value={form.site_objective ?? ""}
                  onChange={(e) => set("site_objective", e.target.value)}
                  className="input-field resize-none"
                />
              </Field>
              <Field label={t.fields.target_audience} required>
                <input
                  type="text" required
                  value={form.target_audience ?? ""}
                  onChange={(e) => set("target_audience", e.target.value)}
                  className="input-field"
                />
              </Field>
              <Field label={t.fields.page_count}>
                <input
                  type="text"
                  value={form.page_count ?? ""}
                  onChange={(e) => set("page_count", e.target.value)}
                  className="input-field"
                />
              </Field>
              <Field label={t.fields.launch_date}>
                <input
                  type="text"
                  value={form.launch_date ?? ""}
                  onChange={(e) => set("launch_date", e.target.value)}
                  className="input-field"
                  placeholder={locale === "ja" ? "例：2ヶ月後、2025年8月" : "e.g. August 2025, in 2 months"}
                />
              </Field>
            </div>
          </div>

          {/* ── Section 3: Design ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-5">
              {t.sections.design}
            </p>
            <div className="space-y-4">
              <Field label={t.fields.design_style}>
                <div className="flex flex-wrap gap-2">
                  {t.styleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set("design_style", opt.value)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition",
                        form.design_style === opt.value
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={t.fields.reference_sites}>
                <textarea
                  rows={3}
                  value={form.reference_sites ?? ""}
                  onChange={(e) => set("reference_sites", e.target.value)}
                  className="input-field resize-none"
                  placeholder="https://..."
                />
              </Field>
              <Field label={t.fields.brand_assets}>
                <textarea
                  rows={2}
                  value={form.brand_assets ?? ""}
                  onChange={(e) => set("brand_assets", e.target.value)}
                  className="input-field resize-none"
                  placeholder={locale === "ja" ? "例：ロゴあり、カラーはブランドガイドラインあり" : "e.g. logo ready, brand color guidelines available"}
                />
              </Field>
            </div>
          </div>

          {/* ── Section 4: Content & Features ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-5">
              {t.sections.content}
            </p>
            <div className="space-y-4">
              <Field label={t.fields.existing_content}>
                <div className="flex flex-wrap gap-2">
                  {t.contentOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set("existing_content", opt.value)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition",
                        form.existing_content === opt.value
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={t.fields.required_features}>
                <textarea
                  rows={4}
                  value={form.required_features ?? ""}
                  onChange={(e) => set("required_features", e.target.value)}
                  className="input-field resize-none"
                  placeholder={locale === "ja" ? "例：お問い合わせフォーム、FAQ、会員ページ、多言語対応" : "e.g. contact form, FAQ, member area, multilingual support"}
                />
              </Field>
            </div>
          </div>

          {/* ── Section 5: Other ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-5">
              {t.sections.other}
            </p>
            <Field label={t.fields.additional_notes}>
              <textarea
                rows={4}
                value={form.additional_notes ?? ""}
                onChange={(e) => set("additional_notes", e.target.value)}
                className="input-field resize-none"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="primary-button w-full sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Public inquiry form (no token) ─────────────────────────
function InquiryForm({ searchParams }: { searchParams: URLSearchParams }) {
  const initialPlan = searchParams.get("plan") ?? "";
  const [form, setForm]     = useState({ name: "", email: "", plan: initialPlan, message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const resp = await fetch(`${API_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error();
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <section className="section-block">
        <div className="container-shell">
          <div className="glass-panel rounded-[2rem] p-10 text-center max-w-lg mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300 mb-4">送信完了</p>
            <p className="text-white/70">お問い合わせを受け付けました。<br />2営業日以内にご連絡いたします。</p>
          </div>
        </div>
      </section>
    );
  }

  const planOptions = [
    { value: "",         label: "未定 / 相談したい" },
    { value: "starter",  label: "Starter ¥10,000/月" },
    { value: "standard", label: "Standard ¥15,000/月" },
    { value: "growth",   label: "Growth ¥20,000/月" },
  ];

  return (
    <section className="section-block pb-24">
      <div className="container-shell max-w-xl">
        <span className="eyebrow">FREE CONSULTATION</span>
        <h1 className="section-title mt-2">無料相談フォーム</h1>
        <p className="mt-4 section-copy">
          費用・スケジュール・構成について、お気軽にご相談ください。<br />
          2営業日以内にご返答いたします。
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <Field label="お名前" required>
            <input
              type="text" required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="input-field"
              placeholder="山田 太郎"
            />
          </Field>

          <Field label="メールアドレス" required>
            <input
              type="email" required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="input-field"
              placeholder="your@email.com"
            />
          </Field>

          <Field label="興味のあるプラン">
            <div className="flex flex-wrap gap-2">
              {planOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, plan: opt.value }))}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    form.plan === opt.value
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="ご相談内容" required>
            <textarea
              rows={5} required
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="input-field resize-none"
              placeholder="現在のサイトの課題、作りたいサイトのイメージ、ご予算など、なんでもお書きください。"
            />
          </Field>

          {error && (
            <p className="text-sm text-red-400">送信に失敗しました。再度お試しください。</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="primary-button w-full sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "送信中..." : "送信する"}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Field wrapper ──────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
        {label}
        {required && (
          <span className="ml-2 text-[0.6rem] text-cyan-300/80">REQUIRED</span>
        )}
      </label>
      {children}
    </div>
  );
}
