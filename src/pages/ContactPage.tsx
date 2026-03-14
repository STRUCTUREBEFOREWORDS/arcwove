import { useState, type FormEvent } from 'react'
import { contactInquiryFields, contactProjectFields } from '../data/site'

type ContactTab = 'お問い合わせ' | '制作依頼'

const textareaFields = new Set(['お問い合わせ内容', '参考サイト', '一番伝えたい価値'])

export function ContactPage() {
  const [activeTab, setActiveTab] = useState<ContactTab>('お問い合わせ')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const fields = activeTab === 'お問い合わせ' ? contactInquiryFields : contactProjectFields

  return (
    <section className="section-block pb-24 md:pb-32">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <span className="eyebrow">CONTACT</span>
          <h1 className="section-title">相談内容に応じて、窓口を切り替えられます。</h1>
          <p className="mt-6 section-copy">
            一般的な問い合わせは短いフォームで、制作依頼はカウンセリングシート形式で必要情報を整理できます。
          </p>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {(['お問い合わせ', '制作依頼'] as ContactTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  'rounded-full border px-4 py-3 text-sm tracking-[0.12em] transition sm:px-5 sm:py-4 sm:tracking-[0.18em]',
                  activeTab === tab
                    ? 'border-cyan-300/60 bg-cyan-300/20 text-white'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white',
                ].join(' ')}
              >
                {tab}
              </button>
            ))}
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            {fields.map((field) => {
              const isTextarea = textareaFields.has(field)

              return (
                <label key={field} className="grid gap-2">
                  <span className="text-sm text-white/60">{field}</span>
                  {isTextarea ? (
                    <textarea rows={5} className="input-field resize-y" placeholder={field} />
                  ) : (
                    <input className="input-field" placeholder={field} />
                  )}
                </label>
              )
            })}

            <button type="submit" className="primary-button mt-2 w-full sm:w-fit">
              送信する
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}