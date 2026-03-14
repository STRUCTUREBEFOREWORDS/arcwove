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
  name: string;
  basePriceJpy: number;
  features: LocalizedText[];
};

export type Plan = {
  name: string;
  price: string;
  features: string[];
};

type ProcessStepDefinition = {
  id: "hearing" | "structure" | "design" | "development" | "launch";
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

export type ContactFieldType = "text" | "email" | "textarea";

export type ContactFormField = {
  name: string;
  type: ContactFieldType;
  label: string;
};

type ContactFormFieldDefinition = {
  name: string;
  type: ContactFieldType;
  label: LocalizedText;
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
    name: "STRUCTURE",
    basePriceJpy: 300000,
    features: [
      { ja: "構造設計", en: "Structure design" },
      { ja: "最大5ページ", en: "Up to 5 pages" },
      { ja: "基本導線設計", en: "Core journey design" },
      { ja: "レスポンシブ対応", en: "Responsive support" },
      { ja: "更新サポート込み", en: "Includes update support" },
      { ja: "SEO初期設計込み", en: "Includes initial SEO setup" },
    ],
  },
  {
    name: "CORE",
    basePriceJpy: 400000,
    features: [
      { ja: "構造設計", en: "Structure design" },
      { ja: "最大7ページ", en: "Up to 7 pages" },
      { ja: "価格導線設計", en: "Pricing conversion flow" },
      { ja: "コンバージョン導線調整", en: "Conversion journey refinement" },
      { ja: "更新サポート込み", en: "Includes update support" },
      { ja: "SEO初期設計込み", en: "Includes initial SEO setup" },
      { ja: "多言語対応込み", en: "Includes multilingual support" },
      { ja: "アニメーション設計込み", en: "Includes animation direction" },
    ],
  },
  {
    name: "SIGNATURE",
    basePriceJpy: 500000,
    features: [
      { ja: "構造設計", en: "Structure design" },
      { ja: "最大8ページ", en: "Up to 8 pages" },
      { ja: "ブランド再整理", en: "Brand repositioning" },
      { ja: "CV構造最適化", en: "Conversion architecture optimization" },
      { ja: "PROCESS体験強化", en: "Enhanced process storytelling" },
      { ja: "更新サポート込み", en: "Includes update support" },
      { ja: "SEO初期設計込み", en: "Includes initial SEO setup" },
      { ja: "多言語対応込み", en: "Includes multilingual support" },
      { ja: "EC機能込み", en: "Includes e-commerce features" },
      { ja: "アニメーション設計込み", en: "Includes animation direction" },
      { ja: "追加1ページ込み", en: "Includes 1 additional page" },
    ],
  },
];

export function getPlans(locale: Locale, currency: CurrencyCode): Plan[] {
  return planDefinitions.map((plan) => ({
    name: plan.name,
    price: formatPrice(plan.basePriceJpy, currency, locale),
    features: plan.features.map((feature) => translateText(feature, locale)),
  }));
}

const processStepDefinitions: ProcessStepDefinition[] = [
  {
    id: "hearing",
    step: "STEP1",
    title: { ja: "ヒアリング", en: "Discovery" },
    body: {
      ja: "事業の目的、伝えたい価値、既存課題を整理し、サイトに必要な役割を言語化します。",
      en: "We clarify business goals, the value you need to communicate, and current issues to define what role the website must play.",
    },
  },
  {
    id: "structure",
    step: "STEP2",
    title: { ja: "構造設計", en: "Structure Design" },
    body: {
      ja: "ページの役割分担、導線、情報階層を設計し、成果につながる流れを組み立てます。",
      en: "We assign page roles, user paths, and information hierarchy to build a flow that supports results.",
    },
  },
  {
    id: "design",
    step: "STEP3",
    title: { ja: "デザイン設計", en: "Design Direction" },
    body: {
      ja: "タイポグラフィ、余白、視線誘導を設計し、構造の強さを見た目へ翻訳します。",
      en: "Typography, spacing, and visual guidance are shaped to translate the strength of the structure into form.",
    },
  },
  {
    id: "development",
    step: "STEP4",
    title: { ja: "開発", en: "Development" },
    body: {
      ja: "レスポンシブ、軽量性、動きの質感まで含めてフロントエンドを実装します。",
      en: "We implement the frontend with responsiveness, performance, and motion quality all considered.",
    },
  },
  {
    id: "launch",
    step: "STEP5",
    title: { ja: "公開", en: "Launch" },
    body: {
      ja: "公開後の導線確認と改善視点を共有し、運用の基準線を整えます。",
      en: "After launch, we review journeys and improvement points so operations start from a clear baseline.",
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
  { name: "industry", type: "text", label: { ja: "業種", en: "Industry" } },
  {
    name: "site_objective",
    type: "textarea",
    label: { ja: "サイト目的", en: "Site objective" },
  },
  {
    name: "target_audience",
    type: "text",
    label: { ja: "ターゲット", en: "Target audience" },
  },
  {
    name: "page_count",
    type: "text",
    label: { ja: "必要ページ数", en: "Required page count" },
  },
  {
    name: "budget",
    type: "text",
    label: { ja: "希望予算", en: "Preferred budget" },
  },
  {
    name: "timeline",
    type: "text",
    label: { ja: "希望納期", en: "Desired timeline" },
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
