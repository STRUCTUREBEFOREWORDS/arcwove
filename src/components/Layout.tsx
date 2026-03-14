import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navItems } from '../data/site'

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="page-shell">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between py-5">
          <NavLink to="/" className="font-['Space_Grotesk'] text-lg tracking-[0.4em] text-white">
            STRUCTURE
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'text-xs tracking-[0.24em] transition hover:text-white',
                    isActive ? 'text-white' : 'text-white/60',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="secondary-button px-4 py-2 md:hidden"
          >
            MENU
          </button>
        </div>

        {menuOpen ? (
          <div className="container-shell pb-5 md:hidden">
            <div className="glass-panel rounded-3xl p-4">
              <div className="grid gap-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm tracking-[0.16em] text-white/72 transition hover:border-cyan-300/50 hover:text-white"
                  >
                    {item.label}
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
            <p className="font-['Space_Grotesk'] text-lg tracking-[0.35em]">STRUCTURE</p>
            <p className="mt-2 text-sm text-white/50">構造から設計する Web制作会社</p>
          </div>
          <p className="text-sm text-white/40">© 2026 STRUCTURE. Minimal structure for meaningful conversion.</p>
        </div>
      </footer>
    </div>
  )
}