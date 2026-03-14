export type NavItem = {
  label: string
  path: string
}

export type Plan = {
  name: string
  price: string
  features: string[]
}

export type PriceOption = {
  name: string
  price: string
}

export type ProcessStep = {
  step: string
  title: string
  body: string
}

export type SampleCategory =
  | 'All'
  | 'Corporate'
  | 'Landing'
  | 'Ecommerce'
  | 'Modern'
  | 'Minimal'
  | 'Experimental'

export type SampleProject = {
  id: string
  category: Exclude<SampleCategory, 'All'>
  title: string
  catchCopy: string
  summary: string
  deliverables: string[]
}

export const navItems: NavItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'PRICE', path: '/price' },
  { label: 'PROCESS', path: '/process' },
  { label: 'SAMPLE', path: '/sample' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

export const homeSections = [
  {
    title: '見やすさではなく、構造から体験を設計する。',
    body:
      'アートは空間で見え方が変わり、料理は器で印象が変わる。Webサイトも同じです。私たちは情報の並び、導線、視線移動まで含めて、ビジネスの器そのものを設計します。',
  },
  {
    title: '完全オーダーメイドで、成果に必要な構造を選び抜く。',
    body:
      'テンプレートを当て込むのではなく、事業の現在地と狙う顧客に合わせて、ページ構成と体験の流れを定義します。余白と静けさの中に、強い説得力を置く設計です。',
  },
]

export const plans: Plan[] = [
  {
    name: 'STRUCTURE',
    price: '¥300,000',
    features: ['構造設計', '最大5ページ', '基本導線設計', 'レスポンシブ対応'],
  },
  {
    name: 'CORE',
    price: '¥400,000',
    features: ['構造設計', '最大7ページ', '価格導線設計', 'コンバージョン導線調整'],
  },
  {
    name: 'SIGNATURE',
    price: '¥500,000',
    features: ['構造設計', '最大7ページ', 'ブランド再整理', 'CV構造最適化', 'PROCESS体験強化'],
  },
]

export const priceOptions: PriceOption[] = [
  { name: 'ページ追加', price: '¥30,000 / page' },
  { name: '更新サポート', price: '¥5,000 / 月' },
  { name: '多言語対応', price: '¥30,000' },
  { name: 'EC機能', price: '¥100,000' },
  { name: 'アニメーション設計', price: '¥50,000' },
  { name: 'SEO初期設計', price: '¥30,000' },
]

export const processSteps: ProcessStep[] = [
  {
    step: 'STEP1',
    title: 'ヒアリング',
    body: '事業の目的、伝えたい価値、既存課題を整理し、サイトに必要な役割を言語化します。',
  },
  {
    step: 'STEP2',
    title: '構造設計',
    body: 'ページの役割分担、導線、情報階層を設計し、成果につながる流れを組み立てます。',
  },
  {
    step: 'STEP3',
    title: 'デザイン設計',
    body: 'タイポグラフィ、余白、視線誘導を設計し、構造の強さを見た目へ翻訳します。',
  },
  {
    step: 'STEP4',
    title: '開発',
    body: 'レスポンシブ、軽量性、動きの質感まで含めてフロントエンドを実装します。',
  },
  {
    step: 'STEP5',
    title: '公開',
    body: '公開後の導線確認と改善視点を共有し、運用の基準線を整えます。',
  },
]

export const sampleCategories: SampleCategory[] = [
  'All',
  'Corporate',
  'Landing',
  'Ecommerce',
  'Modern',
  'Minimal',
  'Experimental',
]

const projectBlueprints: Record<Exclude<SampleCategory, 'All'>, string[]> = {
  Corporate: ['会社案内刷新', '採用導線強化', 'ブランド整理', '信頼訴求設計', 'サービス構造再編'],
  Landing: ['単一価値訴求', '高単価サービスLP', 'セミナー集客', '教育商材訴求', '先行予約LP'],
  Ecommerce: ['D2C初期設計', '単品販売導線', '定期購入設計', 'ブランドEC刷新', '商品比較導線'],
  Modern: ['新規ブランド立ち上げ', 'SaaS紹介サイト', '建築スタジオ', '映像制作会社', '新規事業ページ'],
  Minimal: ['士業サイト', '医療系コーポレート', '個人事務所', 'アトリエ紹介', '店舗案内'],
  Experimental: ['展示会特設', 'デジタル作品集', '未来志向LP', 'モーション重視サイト', 'インタラクティブ案内'],
}

export const sampleProjects: SampleProject[] = Object.entries(projectBlueprints).flatMap(
  ([category, titles]) =>
    titles.map((title, index) => ({
      id: `${category}-${index + 1}`,
      category: category as Exclude<SampleCategory, 'All'>,
      title,
      catchCopy: `${category}の文脈に合わせて構造を最適化したサンプル`,
      summary:
        'PCモックとスマホモックの両軸で、視線移動、要点の配置、CTAの強弱まで検証したデモです。',
      deliverables: ['PCモック', 'スマホモック', '導線設計メモ'],
    })),
)

export const contactInquiryFields = ['会社名', 'お名前', 'メールアドレス', 'お問い合わせ内容']

export const contactProjectFields = [
  '会社名',
  '担当者名',
  'メールアドレス',
  '業種',
  'サイト目的',
  'ターゲット',
  '必要ページ数',
  '希望予算',
  '希望納期',
  '参考サイト',
  '一番伝えたい価値',
]