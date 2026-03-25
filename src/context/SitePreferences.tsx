import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CurrencyCode, Locale } from '../data/site'

type SitePreferencesContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null)

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('arcwove-locale')
    return saved === 'en' ? 'en' : 'ja'
  })
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('arcwove-currency')
    return saved === 'USD' || saved === 'EUR' ? saved : 'JPY'
  })

  useEffect(() => {
    localStorage.setItem('arcwove-locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    localStorage.setItem('arcwove-currency', currency)
  }, [currency])

  const value = useMemo(
    () => ({ locale, setLocale, currency, setCurrency }),
    [locale, currency],
  )

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext)

  if (!context) {
    throw new Error('useSitePreferences must be used within SitePreferencesProvider')
  }

  return context
}