import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navItems, translateText } from "../data/site";
import { useSitePreferences } from "../context/SitePreferences";

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale, setLocale, currency, setCurrency } = useSitePreferences();

  const ui = {
    ja: {
      menu: "MENU",
      language: "言語",
      currency: "通貨",
      tagline: "構造から設計する Web制作会社",
      copyright: "© 2026 arcwove. Meaningful conversion のための構造設計。",
    },
    en: {
      menu: "MENU",
      language: "LANG",
      currency: "CUR",
      tagline: "A web studio designing from structure.",
      copyright:
        "© 2026 arcwove. Structure design for meaningful conversion.",
    },
  }[locale];

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="page-shell">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between py-5">
          <NavLink to="/" aria-label="arcwove">
            <img src="/logo.svg" alt="arcwove" className="h-8 w-auto brightness-0 invert" />
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "text-xs tracking-[0.24em] transition hover:text-white",
                    isActive ? "text-white" : "text-white/60",
                  ].join(" ")
                }
              >
                {translateText(item.label, locale)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-white/10 bg-white/5 p-1">
              {(["ja", "en"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLocale(value)}
                  className={[
                    "rounded-full px-3 py-2 text-[0.65rem] tracking-[0.22em] transition",
                    locale === value
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                  aria-label={`${ui.language} ${value.toUpperCase()}`}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 p-1">
              {(["JPY", "USD", "EUR"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCurrency(value)}
                  className={[
                    "rounded-full px-3 py-2 text-[0.65rem] tracking-[0.18em] transition",
                    currency === value
                      ? "bg-cyan-300/90 text-black"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                  aria-label={`${ui.currency} ${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="secondary-button px-4 py-2 md:hidden"
          >
            {ui.menu}
          </button>
        </div>

        {menuOpen ? (
          <div className="container-shell pb-5 md:hidden">
            <div className="glass-panel rounded-3xl p-4">
              <div className="mb-4 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 p-1">
                  {(["ja", "en"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLocale(value)}
                      className={[
                        "rounded-full px-3 py-2 text-[0.65rem] tracking-[0.22em] transition",
                        locale === value
                          ? "bg-white text-black"
                          : "text-white/60 hover:text-white",
                      ].join(" ")}
                    >
                      {value.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-1">
                  {(["JPY", "USD", "EUR"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCurrency(value)}
                      className={[
                        "rounded-full px-3 py-2 text-[0.65rem] tracking-[0.18em] transition",
                        currency === value
                          ? "bg-cyan-300/90 text-black"
                          : "text-white/60 hover:text-white",
                      ].join(" ")}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm tracking-[0.16em] text-white/72 transition hover:border-cyan-300/50 hover:text-white"
                  >
                    {translateText(item.label, locale)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10 pt-24">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="container-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <img src="/logo.svg" alt="arcwove" className="h-7 w-auto brightness-0 invert" />
            <p className="mt-2 text-sm text-white/50">{ui.tagline}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a
              href="/legal.html"
              className="text-xs tracking-[0.1em] text-white/30 transition hover:text-white/60"
            >
              {locale === "ja" ? "特定商取引法に基づく表記" : "Legal Disclosure"}
            </a>
            <p className="text-sm text-white/40">{ui.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}