export type Locale = "ja" | "en";

export type CurrencyCode = "JPY" | "USD" | "EUR";

export type LocalizedText = {
  ja: string;
  en: string;
};

export type NavItem = {
  label: LocalizedText;
  path: string;
};

type PlanDefinition = {
  id: "starter" | "standard" | "growth";
  name: LocalizedText;
  summary: LocalizedText;
  label: LocalizedText;
  recommended?: boolean;
  monthlyFeeJpy: number;
  minimumContractMonths: number;
  features: LocalizedText[];
};

export type Plan = {
  id: PlanDefinition["id"];
  name: string;
  summary: string;
  label: string;
  recommended: boolean;
  monthlyFee: string;
  minimumContract: string;
  features: string[];
};

export type PricingNote = {
  id: "updates" | "hosting" | "contract";
  text: string;
};

type PaymentMethodDefinition = {
  id: "card" | "apple-pay" | "google-pay";
  label: LocalizedText;
};

export type PaymentMethod = {
  id: PaymentMethodDefinition["id"];
  label: string;
};

type ProcessStepDefinition = {
  id: string;
  step: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type ProcessStep = {
  id: ProcessStepDefinition["id"];
  step: string;
  title: string;
  body: string;
};

export type SampleCategory =
  | "All"
  | "Corporate"
  | "Landing"
  | "Ecommerce"
  | "Modern"
  | "Minimal"
  | "Experimental";

type SampleProjectDefinition = {
  id: string;
  category: Exclude<SampleCategory, "All">;
  title: LocalizedText;
  catchCopy: LocalizedText;
  summary: LocalizedText;
  deliverables: LocalizedText[];
};

export type SampleProject = {
  id: string;
  category: Exclude<SampleCategory, "All">;
  title: string;
  catchCopy: string;
  summary: string;
  deliverables: string[];
};

export type ContactFieldType = "text" | "email" | "textarea" | "select";

export type ContactFieldOption = {
  value: string;
  label: string;
};

export type ContactFormField = {
  name: string;
  type: ContactFieldType;
  label: string;
  options?: ContactFieldOption[];
};

type ContactFieldOptionDefinition = {
  value: string;
  label: LocalizedText;
};

type ContactFormFieldDefinition = {
  name: string;
  type: ContactFieldType;
  label: LocalizedText;
  options?: ContactFieldOptionDefinition[];
};

export type ContactProjectRecommendation = {
  planId: PlanDefinition["id"];
  planName: string;
  monthlyFee: string;
  summary: string;
  reasons: string[];
};

const currencyRates: Record<CurrencyCode, number> = {
  JPY: 1,
  USD: 0.0068,
  EUR: 0.0062,
};

const formatLocales: Record<Locale, string> = {
  ja: "ja-JP",
  en: "en-US",
};

export function translateText(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export function formatPrice(
  basePriceJpy: number,
  currency: CurrencyCode,
  locale: Locale,
) {
  return new Intl.NumberFormat(formatLocales[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(basePriceJpy * currencyRates[currency]);
}

export const navItems: NavItem[] = [
  { label: { ja: "HOME", en: "HOME" }, path: "/" },
  { label: { ja: "PRICE", en: "PRICE" }, path: "/price" },
  { label: { ja: "PROCESS", en: "PROCESS" }, path: "/process" },
  { label: { ja: "SAMPLE", en: "SAMPLES" }, path: "/sample" },
  { label: { ja: "ABOUT", en: "ABOUT" }, path: "/about" },
  { label: { ja: "CONTACT", en: "CONTACT" }, path: "/contact" },
];

const homeSectionDefinitions = [
  {
    title: {
      ja: "見やすさではなく、構造から体験を設計する。",
      en: "Designing experience from structure, not surface readability.",
    },
    body: {
      ja: "アートは空間で見え方が変わり、料理は器で印象が変わる。Webサイトも同じです。私たちは情報の並び、導線、視線移動まで含めて、ビジネスの器そのものを設計します。",
      en: "Art changes with the room that frames it, and food changes with the plate that holds it. Websites are no different. We design the vessel of the business itself, including information order, paths, and eye movement.",
    },
  },
  {
    title: {
      ja: "完全オーダーメイドで、成果に必要な構造を選び抜く。",
      en: "Fully custom, selecting only the structure needed for results.",
    },
    body: {
      ja: "テンプレートを当て込むのではなく、事業の現在地と狙う顧客に合わせて、ページ構成と体験の流れを定義します。余白と静けさの中に、強い説得力を置く設計です。",
      en: "Instead of forcing a template, we define page composition and experience flow around the current stage of the business and the audience you want to reach. The design is quiet, spacious, and persuasive.",
    },
  },
];

export function getHomeSections(locale: Locale) {
  return homeSectionDefinitions.map((section) => ({
    title: translateText(section.title, locale),
    body: translateText(section.body, locale),
  }));
}

const planDefinitions: PlanDefinition[] = [
  {
    id: "starter",
    name: { ja: "Starter Plan", en: "Starter Plan" },
    summary: {
      ja: "サイトを公開するためのプラン。初期費用を抑えて、まずは公開したい方向けです。",
      en: "A plan for getting your website launched with a lean starting point.",
    },
    label: { ja: "Launch", en: "Launch" },
    monthlyFeeJpy: 10000,
    minimumContractMonths: 6,
    features: [
      {
        ja: "ウェブサイト制作（最大5ページ）",
        en: "Website production up to 5 pages",
      },
      {
        ja: "レスポンシブ対応（スマホ最適化）",
        en: "Responsive support for mobile optimization",
      },
      { ja: "SEO基本設定", en: "Basic SEO setup" },
      { ja: "更新（月2回まで）", en: "Content updates up to twice per month" },
      { ja: "セキュリティ管理", en: "Security management" },
      { ja: "メールサポート", en: "Email support" },
    ],
  },
  {
    id: "standard",
    name: { ja: "Standard Plan", en: "Standard Plan" },
    summary: {
      ja: "サイトを運用するためのプラン。公開後も整えながら育てたい事業向けです。",
      en: "A plan for operating the site well after launch with balanced ongoing support.",
    },
    label: { ja: "Business", en: "Business" },
    recommended: true,
    monthlyFeeJpy: 15000,
    minimumContractMonths: 6,
    features: [
      {
        ja: "ウェブサイト制作（最大8ページ）",
        en: "Website production up to 8 pages",
      },
      { ja: "レスポンシブ対応", en: "Responsive support" },
      { ja: "SEO基本設定", en: "Basic SEO setup" },
      { ja: "AIチャットボット導入", en: "AI chatbot setup" },
      {
        ja: "更新（月4回まで）",
        en: "Content updates up to four times per month",
      },
      {
        ja: "アクセス解析導入（Google Analytics / Search Console）",
        en: "Analytics setup with Google Analytics and Search Console",
      },
      { ja: "運用管理", en: "Operational management" },
      { ja: "セキュリティ管理", en: "Security management" },
      { ja: "メールサポート", en: "Email support" },
    ],
  },
  {
    id: "growth",
    name: { ja: "Growth Plan", en: "Growth Plan" },
    summary: {
      ja: "サイトで集客するためのプラン。改善とSEOを回しながら成長を狙う構成です。",
      en: "A plan for using the site as a marketing channel with SEO and ongoing optimization.",
    },
    label: { ja: "Marketing", en: "Marketing" },
    monthlyFeeJpy: 20000,
    minimumContractMonths: 6,
    features: [
      {
        ja: "ウェブサイト制作（最大12ページ）",
        en: "Website production up to 12 pages",
      },
      { ja: "レスポンシブ対応", en: "Responsive support" },
      { ja: "SEO基本設定", en: "Basic SEO setup" },
      { ja: "SEO簡易分析", en: "Light SEO analysis" },
      { ja: "キーワード分析", en: "Keyword analysis" },
      { ja: "SEOレポート（月1回）", en: "Monthly SEO report" },
      {
        ja: "更新（月8回まで）",
        en: "Content updates up to eight times per month",
      },
      { ja: "運用管理", en: "Operational management" },
      { ja: "月次サイトチェック", en: "Monthly site check" },
      { ja: "優先サポート", en: "Priority support" },
    ],
  },
];

export function getPlans(locale: Locale, currency: CurrencyCode): Plan[] {
  return planDefinitions.map((plan) => ({
    id: plan.id,
    name: translateText(plan.name, locale),
    summary: translateText(plan.summary, locale),
    label: translateText(plan.label, locale),
    recommended: Boolean(plan.recommended),
    monthlyFee: formatPrice(plan.monthlyFeeJpy, currency, locale),
    minimumContract:
      locale === "ja"
        ? `${plan.minimumContractMonths}ヶ月`
        : `${plan.minimumContractMonths} months`,
    features: plan.features.map((feature) => translateText(feature, locale)),
  }));
}

const pricingNoteDefinitions = [
  {
    id: "updates" as const,
    text: {
      ja: "※更新はテキスト変更・画像差し替えなどの軽微な内容になります",
      en: "Updates cover light changes such as text edits and image replacement.",
    },
  },
  {
    id: "hosting" as const,
    text: {
      ja: "※ドメイン・サーバー費用は別途必要です",
      en: "Domain and hosting fees are billed separately.",
    },
  },
  {
    id: "contract" as const,
    text: {
      ja: "※最低契約期間は6ヶ月となります",
      en: "The minimum contract term is six months.",
    },
  },
];

export function getPricingNotes(locale: Locale): PricingNote[] {
  return pricingNoteDefinitions.map((note) => ({
    id: note.id,
    text: translateText(note.text, locale),
  }));
}

const paymentMethodDefinitions: PaymentMethodDefinition[] = [
  {
    id: "card",
    label: { ja: "クレジットカード", en: "Credit card" },
  },
  {
    id: "apple-pay",
    label: { ja: "Apple Pay", en: "Apple Pay" },
  },
  {
    id: "google-pay",
    label: { ja: "Google Pay", en: "Google Pay" },
  },
];

export function getPaymentMethods(locale: Locale): PaymentMethod[] {
  return paymentMethodDefinitions.map((method) => ({
    id: method.id,
    label: translateText(method.label, locale),
  }));
}

const processStepDefinitions: ProcessStepDefinition[] = [
  {
    id: "inquiry",
    step: "STEP1",
    title: { ja: "問い合わせ", en: "Inquiry" },
    body: {
      ja: "フォームから相談内容を受け取り、現状と検討段階を確認します。",
      en: "We receive your inquiry through the form and confirm your current stage and goals.",
    },
  },
  {
    id: "hearing",
    step: "STEP2",
    title: { ja: "ヒアリング", en: "Hearing" },
    body: {
      ja: "事業の目的、訴求したい価値、既存課題を整理し、必要なサイト構造を明確にします。",
      en: "We organize your goals, value proposition, and current issues to define the structure the site needs.",
    },
  },
  {
    id: "plan",
    step: "STEP3",
    title: { ja: "プラン選択", en: "Plan Selection" },
    body: {
      ja: "Starter、Standard、Growth の中から事業規模と必要機能に合うプランを選び、開始条件を固めます。",
      en: "We choose between Starter, Standard, and Growth based on business stage and required features, then lock the start conditions.",
    },
  },
  {
    id: "contract",
    step: "STEP4",
    title: { ja: "契約", en: "Contract" },
    body: {
      ja: "制作範囲、最低契約期間、保守内容を明文化し、着手条件を双方で確認します。",
      en: "We document scope, minimum contract term, and maintenance details so both sides are aligned before work begins.",
    },
  },
  {
    id: "payment",
    step: "STEP5",
    title: { ja: "Stripe決済", en: "Stripe Payment" },
    body: {
      ja: "クレジットカード、Apple Pay、Google Pay に対応した Stripe 決済で着手金または月額課金を処理します。",
      en: "Stripe handles the upfront or recurring payment with credit card, Apple Pay, and Google Pay support.",
    },
  },
  {
    id: "production",
    step: "STEP6",
    title: { ja: "制作開始", en: "Production Start" },
    body: {
      ja: "構造設計、デザイン、実装を進め、公開前に確認と軽微な調整を行います。",
      en: "We move through structure, design, and implementation, then review and refine before launch.",
    },
  },
  {
    id: "launch",
    step: "STEP7",
    title: { ja: "サイト公開", en: "Launch" },
    body: {
      ja: "公開作業と初期導線確認を行い、公開直後の不具合や表示差分をチェックします。",
      en: "We launch the site, validate the initial user flow, and check for post-release issues or rendering differences.",
    },
  },
  {
    id: "maintenance",
    step: "STEP8",
    title: { ja: "月額保守", en: "Monthly Maintenance" },
    body: {
      ja: "月額保守で軽微修正、運用サポート、セキュリティ管理を継続し、改善の基盤を維持します。",
      en: "Monthly maintenance keeps minor revisions, operational support, and security management running as an ongoing baseline.",
    },
  },
];

export function getProcessSteps(locale: Locale): ProcessStep[] {
  return processStepDefinitions.map((step) => ({
    id: step.id,
    step: step.step,
    title: translateText(step.title, locale),
    body: translateText(step.body, locale),
  }));
}

export const sampleCategoryOrder: SampleCategory[] = [
  "All",
  "Corporate",
  "Landing",
  "Ecommerce",
  "Modern",
  "Minimal",
  "Experimental",
];

const sampleCategoryLabels: Record<SampleCategory, LocalizedText> = {
  All: { ja: "All", en: "All" },
  Corporate: { ja: "Corporate", en: "Corporate" },
  Landing: { ja: "Landing", en: "Landing" },
  Ecommerce: { ja: "Ecommerce", en: "Ecommerce" },
  Modern: { ja: "Modern", en: "Modern" },
  Minimal: { ja: "Minimal", en: "Minimal" },
  Experimental: { ja: "Experimental", en: "Experimental" },
};

export function getSampleCategoryLabel(
  category: SampleCategory,
  locale: Locale,
) {
  return translateText(sampleCategoryLabels[category], locale);
}

const projectBlueprints: Record<
  Exclude<SampleCategory, "All">,
  LocalizedText[]
> = {
  Corporate: [
    { ja: "会社案内刷新", en: "Corporate profile refresh" },
    { ja: "採用導線強化", en: "Recruitment flow upgrade" },
    { ja: "ブランド整理", en: "Brand clarification" },
    { ja: "信頼訴求設計", en: "Trust-building architecture" },
    { ja: "サービス構造再編", en: "Service structure redesign" },
  ],
  Landing: [
    { ja: "単一価値訴求", en: "Single-value landing page" },
    { ja: "高単価サービスLP", en: "High-ticket service LP" },
    { ja: "セミナー集客", en: "Seminar acquisition LP" },
    { ja: "教育商材訴求", en: "Education offer LP" },
    { ja: "先行予約LP", en: "Early access LP" },
  ],
  Ecommerce: [
    { ja: "D2C初期設計", en: "D2C launch design" },
    { ja: "単品販売導線", en: "Single-product sales flow" },
    { ja: "定期購入設計", en: "Subscription purchase flow" },
    { ja: "ブランドEC刷新", en: "Brand commerce redesign" },
    { ja: "商品比較導線", en: "Product comparison flow" },
  ],
  Modern: [
    { ja: "新規ブランド立ち上げ", en: "New brand launch" },
    { ja: "SaaS紹介サイト", en: "SaaS showcase site" },
    { ja: "建築スタジオ", en: "Architecture studio site" },
    { ja: "映像制作会社", en: "Film production company site" },
    { ja: "新規事業ページ", en: "New business landing page" },
  ],
  Minimal: [
    { ja: "士業サイト", en: "Professional services site" },
    { ja: "医療系コーポレート", en: "Medical corporate site" },
    { ja: "個人事務所", en: "Private office site" },
    { ja: "アトリエ紹介", en: "Atelier profile site" },
    { ja: "店舗案内", en: "Store information site" },
  ],
  Experimental: [
    { ja: "展示会特設", en: "Exhibition special site" },
    { ja: "デジタル作品集", en: "Digital portfolio site" },
    { ja: "未来志向LP", en: "Future-facing landing page" },
    { ja: "モーション重視サイト", en: "Motion-driven website" },
    { ja: "インタラクティブ案内", en: "Interactive guide site" },
  ],
};

const sampleProjectDefinitions: SampleProjectDefinition[] = Object.entries(
  projectBlueprints,
).flatMap(([category, titles]) =>
  titles.map((title, index) => ({
    id: `${category}-${index + 1}`,
    category: category as Exclude<SampleCategory, "All">,
    title,
    catchCopy: {
      ja: `${category}の文脈に合わせて構造を最適化したサンプル`,
      en: `A sample optimized for the ${category} context`,
    },
    summary: {
      ja: "PCモックとスマホモックの両軸で、視線移動、要点の配置、CTAの強弱まで検証したデモです。",
      en: "A demo tested across desktop and mobile mockups, validating eye movement, information placement, and CTA emphasis.",
    },
    deliverables: [
      { ja: "PCモック", en: "Desktop mockup" },
      { ja: "スマホモック", en: "Mobile mockup" },
      { ja: "導線設計メモ", en: "Journey design notes" },
    ],
  })),
);

export function getSampleProjects(locale: Locale): SampleProject[] {
  return sampleProjectDefinitions.map((project) => ({
    id: project.id,
    category: project.category,
    title: translateText(project.title, locale),
    catchCopy: translateText(project.catchCopy, locale),
    summary: translateText(project.summary, locale),
    deliverables: project.deliverables.map((item) =>
      translateText(item, locale),
    ),
  }));
}

const contactInquiryFieldDefinitions: ContactFormFieldDefinition[] = [
  {
    name: "company_name",
    type: "text",
    label: { ja: "会社名", en: "Company name" },
  },
  {
    name: "contact_name",
    type: "text",
    label: { ja: "お名前", en: "Your name" },
  },
  {
    name: "email",
    type: "email",
    label: { ja: "メールアドレス", en: "Email address" },
  },
  {
    name: "inquiry_details",
    type: "textarea",
    label: { ja: "お問い合わせ内容", en: "Inquiry details" },
  },
];

const contactProjectFieldDefinitions: ContactFormFieldDefinition[] = [
  {
    name: "company_name",
    type: "text",
    label: { ja: "会社名", en: "Company name" },
  },
  {
    name: "contact_name",
    type: "text",
    label: { ja: "担当者名", en: "Contact person" },
  },
  {
    name: "email",
    type: "email",
    label: { ja: "メールアドレス", en: "Email address" },
  },
  {
    name: "business_stage",
    type: "select",
    label: { ja: "現在のフェーズ", en: "Current business stage" },
    options: [
      { value: "launch", label: { ja: "立ち上げ期", en: "Launch stage" } },
      { value: "renewal", label: { ja: "既存サイトの見直し", en: "Existing site renewal" } },
      { value: "growth", label: { ja: "集客・拡張を強化したい", en: "Growth and acquisition focus" } },
    ],
  },
  { name: "industry", type: "text", label: { ja: "業種", en: "Industry" } },
  {
    name: "site_objective",
    type: "textarea",
    label: { ja: "サイト目的", en: "Site objective" },
  },
  {
    name: "page_scale",
    type: "select",
    label: { ja: "想定ページ規模", en: "Expected page scale" },
    options: [
      { value: "small", label: { ja: "1〜3ページ程度", en: "Around 1 to 3 pages" } },
      { value: "medium", label: { ja: "4〜7ページ程度", en: "Around 4 to 7 pages" } },
      { value: "large", label: { ja: "8ページ以上", en: "8 pages or more" } },
    ],
  },
  {
    name: "update_frequency",
    type: "select",
    label: { ja: "想定更新頻度", en: "Expected update frequency" },
    options: [
      { value: "rare", label: { ja: "ほぼ固定で運用する", en: "Mostly fixed after launch" } },
      { value: "monthly", label: { ja: "月1〜2回は更新したい", en: "Monthly updates are needed" } },
      { value: "frequent", label: { ja: "頻繁に更新・改善したい", en: "Frequent updates and iteration" } },
    ],
  },
  {
    name: "support_scope",
    type: "select",
    label: { ja: "必要な支援レベル", en: "Desired support level" },
    options: [
      { value: "light", label: { ja: "まずは必要最小限で始めたい", en: "Start lean with essential support" } },
      { value: "balanced", label: { ja: "設計と運用のバランスを取りたい", en: "Balanced structure and operations" } },
      { value: "strategic", label: { ja: "改善運用まで厚く伴走してほしい", en: "Need strategic ongoing support" } },
    ],
  },
  {
    name: "timeline",
    type: "text",
    label: { ja: "希望納期", en: "Desired timeline" },
  },
  {
    name: "required_features",
    type: "textarea",
    label: { ja: "必要な機能・要件", en: "Required features and requirements" },
  },
  {
    name: "reference_sites",
    type: "textarea",
    label: { ja: "参考サイト", en: "Reference sites" },
  },
  {
    name: "core_value",
    type: "textarea",
    label: { ja: "一番伝えたい価値", en: "Core value to communicate" },
  },
];

function mapContactFormFields(
  fields: ContactFormFieldDefinition[],
  locale: Locale,
): ContactFormField[] {
  return fields.map((field) => ({
    name: field.name,
    type: field.type,
    label: translateText(field.label, locale),
    options: field.options?.map((option) => ({
      value: option.value,
      label: translateText(option.label, locale),
    })),
  }));
}

export function getContactInquiryFields(locale: Locale) {
  return mapContactFormFields(contactInquiryFieldDefinitions, locale).map(
    (field) => field.label,
  );
}

export function getContactProjectFields(locale: Locale) {
  return mapContactFormFields(contactProjectFieldDefinitions, locale).map(
    (field) => field.label,
  );
}

export function getContactInquiryFormFields(locale: Locale) {
  return mapContactFormFields(contactInquiryFieldDefinitions, locale);
}

export function getContactProjectFormFields(locale: Locale) {
  return mapContactFormFields(contactProjectFieldDefinitions, locale);
}

function includesAnyKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function getContactProjectRecommendation(
  locale: Locale,
  currency: CurrencyCode,
  values: Record<string, string>,
): ContactProjectRecommendation {
  const scores: Record<PlanDefinition["id"], number> = {
    starter: 0,
    standard: 1,
    growth: 0,
  };
  const reasons: Record<PlanDefinition["id"], Array<{ weight: number; text: LocalizedText }>> = {
    starter: [],
    standard: [],
    growth: [],
  };

  const addReason = (
    planId: PlanDefinition["id"],
    weight: number,
    text: LocalizedText,
  ) => {
    scores[planId] += weight;
    reasons[planId].push({ weight, text });
  };

  switch (values.business_stage) {
    case "launch":
      addReason("starter", 2, {
        ja: "立ち上げ期のため、初動を軽く始めやすい構成が合っています。",
        en: "You are in a launch stage, so a lean setup is the best starting point.",
      });
      break;
    case "renewal":
      addReason("standard", 2, {
        ja: "既存サイトの見直しには、設計と改善のバランスが取りやすい Standard が向いています。",
        en: "A site renewal fits Standard because it balances redesign structure and operational needs.",
      });
      break;
    case "growth":
      addReason("growth", 3, {
        ja: "集客や拡張を強めたい段階なので、改善余地を大きく取れる Growth が有利です。",
        en: "Growth is the best fit because your focus is on stronger acquisition and expansion.",
      });
      break;
  }

  switch (values.page_scale) {
    case "small":
      addReason("starter", 2, {
        ja: "ページ規模が小さいため、Starter でも必要情報を十分に整理できます。",
        en: "The page scope is compact, so Starter can cover the required information well.",
      });
      break;
    case "medium":
      addReason("standard", 2, {
        ja: "中規模サイトは、構造整理と運用の両立がしやすい Standard が適しています。",
        en: "A medium-sized site aligns well with Standard for both structure and ongoing operation.",
      });
      break;
    case "large":
      addReason("growth", 3, {
        ja: "ページ数が多い構成は、情報設計と更新運用を厚く見られる Growth が向いています。",
        en: "A larger page scope benefits from Growth because it supports heavier structure and maintenance needs.",
      });
      break;
  }

  switch (values.update_frequency) {
    case "rare":
      addReason("starter", 1, {
        ja: "更新頻度が低めなので、軽い運用前提の Starter と相性が良いです。",
        en: "Because updates are infrequent, Starter is a natural fit for lean operations.",
      });
      break;
    case "monthly":
      addReason("standard", 2, {
        ja: "定期更新があるため、月次で整えやすい Standard が安定します。",
        en: "Monthly updates make Standard a stable choice for ongoing refinement.",
      });
      break;
    case "frequent":
      addReason("growth", 3, {
        ja: "更新頻度が高いので、改善サイクルを回しやすい Growth が最適です。",
        en: "Frequent updates point to Growth because it supports faster optimization cycles.",
      });
      break;
  }

  switch (values.support_scope) {
    case "light":
      addReason("starter", 3, {
        ja: "必要最小限から始めたい意向なので、Starter がもっとも無理のない導入です。",
        en: "Starter is the most practical option when you want to begin with essential support only.",
      });
      break;
    case "balanced":
      addReason("standard", 3, {
        ja: "設計と運用のバランスを重視しているため、Standard が最も適合します。",
        en: "Standard fits best because you want a balance between structure design and operations.",
      });
      break;
    case "strategic":
      addReason("growth", 4, {
        ja: "改善運用まで伴走が必要なので、支援幅の広い Growth が最適です。",
        en: "Growth is the strongest fit because you need deeper strategic and operational support.",
      });
      break;
  }

  const mergedText = [
    values.industry,
    values.site_objective,
    values.required_features,
    values.reference_sites,
    values.core_value,
  ]
    .join(" ")
    .toLowerCase();

  if (
    includesAnyKeyword(mergedText, [
      "ec",
      "ecommerce",
      "shop",
      "予約",
      "会員",
      "多言語",
      "multilingual",
      "api",
      "採用",
      "採用強化",
    ])
  ) {
    addReason("growth", 2, {
      ja: "要件に拡張性の高い機能が含まれているため、Growth の方が対応幅を持てます。",
      en: "Your requirements include more advanced capabilities, so Growth provides the right level of flexibility.",
    });
  }

  if (
    includesAnyKeyword(mergedText, [
      "seo",
      "branding",
      "brand",
      "サービス整理",
      "コーポレート",
      "corporate",
      "lp",
      "landing",
    ])
  ) {
    addReason("standard", 2, {
      ja: "訴求整理や導線設計が重要そうなので、Standard のバランス感が活きます。",
      en: "Standard is a strong fit because your project depends on balanced messaging and journey design.",
    });
  }

  if (
    includesAnyKeyword(mergedText, [
      "名刺代わり",
      "シンプル",
      "small",
      "minimum",
      "最小",
      "one page",
      "1ページ",
    ])
  ) {
    addReason("starter", 1, {
      ja: "要件が比較的シンプルなので、Starter でも過不足なく始められます。",
      en: "The scope appears relatively simple, so Starter can cover it without overbuilding.",
    });
  }

  const recommendedPlanId =
    scores.growth >= scores.standard && scores.growth >= scores.starter
      ? "growth"
      : scores.standard >= scores.starter
        ? "standard"
        : "starter";

  const defaultReasons: Record<PlanDefinition["id"], LocalizedText[]> = {
    starter: [
      {
        ja: "情報量を絞って素早く立ち上げたい案件に向いています。",
        en: "It is well suited to projects that need a quick, focused launch.",
      },
      {
        ja: "必要最小限の構成で、無理なく運用を始められます。",
        en: "It keeps the structure lean so operations can start without unnecessary overhead.",
      },
    ],
    standard: [
      {
        ja: "設計の整理と日常運用のバランスがもっとも取りやすいプランです。",
        en: "It is the most balanced plan for structure design and day-to-day operation.",
      },
      {
        ja: "中規模サイトや改善を見据えた構成に適しています。",
        en: "It fits especially well for medium-scale sites and steady iterative improvement.",
      },
    ],
    growth: [
      {
        ja: "機能要件や更新頻度が高い案件で、対応幅を広く確保できます。",
        en: "It gives the broadest support range for projects with heavier features and frequent updates.",
      },
      {
        ja: "公開後の改善運用まで視野に入れるなら Growth が最適です。",
        en: "Growth is the strongest choice when post-launch optimization matters from the start.",
      },
    ],
  };

  const plan = getPlans(locale, currency).find(
    (item) => item.id === recommendedPlanId,
  );

  const rankedReasons = reasons[recommendedPlanId]
    .sort((left, right) => right.weight - left.weight)
    .map((reason) => translateText(reason.text, locale));

  const recommendationReasons = [
    ...new Set([
      ...rankedReasons,
      ...defaultReasons[recommendedPlanId].map((reason) =>
        translateText(reason, locale),
      ),
    ]),
  ].slice(0, 3);

  return {
    planId: recommendedPlanId,
    planName: plan?.name ?? "",
    monthlyFee: plan?.monthlyFee ?? "",
    summary: plan?.summary ?? "",
    reasons: recommendationReasons,
  };
}
