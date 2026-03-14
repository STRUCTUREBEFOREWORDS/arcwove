import { useState, type FormEvent } from 'react'
import {
  getContactInquiryFormFields,
  getContactProjectFormFields,
} from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";
import { usePageSeo } from "../hooks/usePageSeo";

type ContactTab = "inquiry" | "project";
type SubmitStatus = "idle" | "sending" | "success" | "error";

export function ContactPage() {
  const { locale } = useSitePreferences();
  const [activeTab, setActiveTab] = useState<ContactTab>("inquiry");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const configuredEndpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() ?? "";
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";

  const copy = {
    ja: {
      eyebrow: "CONTACT",
      title: "相談内容に応じて、窓口を切り替えられます。",
      lead: "一般的な問い合わせは短いフォームで、制作依頼はカウンセリングシート形式で必要情報を整理できます。",
      tabs: {
        inquiry: "お問い合わせ",
        project: "制作依頼",
      },
      submit: "送信する",
      sending: "送信中...",
      seoTitle: "CONTACT",
      seoDescription:
        "STRUCTURE へのお問い合わせと制作相談フォームです。一般問い合わせと制作依頼を切り替えて送信できます。",
      subject: {
        inquiry: "STRUCTURE お問い合わせ",
        project: "STRUCTURE 制作依頼",
      },
      status: {
        success: "送信を受け付けました。折り返し連絡します。",
        fallback:
          "メールアプリを起動しました。内容を確認して送信してください。",
        error: "送信に失敗しました。時間を置いて再度お試しください。",
        notConfigured:
          "送信先が未設定です。VITE_CONTACT_FORM_ENDPOINT または VITE_CONTACT_EMAIL を設定してください。",
      },
      helper: "フォーム送信先は環境変数で切り替えできます。",
    },
    en: {
      eyebrow: "CONTACT",
      title: "Switch the intake form based on what you need to discuss.",
      lead: "General inquiries use a short form, while production requests use a structured briefing sheet so the right information is organized upfront.",
      tabs: {
        inquiry: "Inquiry",
        project: "Project Request",
      },
      submit: "Send",
      sending: "Sending...",
      seoTitle: "CONTACT",
      seoDescription:
        "Contact STRUCTURE for general inquiries or structured website production requests through multilingual intake forms.",
      subject: {
        inquiry: "STRUCTURE Inquiry",
        project: "STRUCTURE Project Request",
      },
      status: {
        success:
          "Your message has been received. We will get back to you soon.",
        fallback:
          "Your mail app has been opened. Review the message and send it from there.",
        error: "Sending failed. Please try again shortly.",
        notConfigured:
          "No contact destination is configured. Set VITE_CONTACT_FORM_ENDPOINT or VITE_CONTACT_EMAIL.",
      },
      helper: "The destination can be switched with environment variables.",
    },
  }[locale];

  usePageSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    locale,
  });

  const fields =
    activeTab === "inquiry"
      ? getContactInquiryFormFields(locale)
      : getContactProjectFormFields(locale);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = copy.subject[activeTab];

    formData.append("form_type", activeTab);
    formData.append("locale", locale);
    formData.append("_subject", subject);
    formData.append("_captcha", "false");

    if (configuredEndpoint) {
      try {
        setSubmitStatus("sending");
        setSubmitMessage("");

        const response = await fetch(configuredEndpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        form.reset();
        setSubmitStatus("success");
        setSubmitMessage(copy.status.success);
        return;
      } catch {
        setSubmitStatus("error");
        setSubmitMessage(copy.status.error);
        return;
      }
    }

    if (contactEmail) {
      const body = fields
        .map(
          (field) =>
            `${field.label}: ${String(formData.get(field.name) ?? "")}`,
        )
        .join("\n");

      window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitStatus("success");
      setSubmitMessage(copy.status.fallback);
      return;
    }

    setSubmitStatus("error");
    setSubmitMessage(copy.status.notConfigured);
  };

  const statusClassName =
    submitStatus === "success"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
      : submitStatus === "error"
        ? "border-rose-400/30 bg-rose-400/10 text-rose-100"
        : "border-white/10 bg-white/5 text-white/65";

  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 className="section-title">{copy.title}</h1>
          <p className="mt-6 section-copy">{copy.lead}</p>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["inquiry", "project"] as ContactTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  "rounded-full border px-4 py-3 text-sm tracking-[0.12em] transition sm:px-5 sm:py-4 sm:tracking-[0.18em]",
                  activeTab === tab
                    ? "border-cyan-300/60 bg-cyan-300/20 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white",
                ].join(" ")}
              >
                {copy.tabs[tab]}
              </button>
            ))}
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            {fields.map((field) => {
              return (
                <label key={field.name} className="grid gap-2">
                  <span className="text-sm text-white/60">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={5}
                      className="input-field resize-y"
                      placeholder={field.label}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      className="input-field"
                      placeholder={field.label}
                    />
                  )}
                </label>
              );
            })}

            <div
              className={[
                "rounded-2xl border px-4 py-3 text-sm",
                statusClassName,
              ].join(" ")}
            >
              {submitStatus === "sending"
                ? copy.sending
                : submitMessage || copy.helper}
            </div>

            <button
              type="submit"
              className="primary-button mt-2 w-full sm:w-fit"
              disabled={submitStatus === "sending"}
            >
              {submitStatus === "sending" ? copy.sending : copy.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}