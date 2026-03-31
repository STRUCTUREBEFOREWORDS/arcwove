import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'HOME',    path: '/' },
  { name: 'PROCESS', path: '/process' },
  { name: 'PRICE',   path: '/price' },
  { name: 'SAMPLE',  path: '/sample' },
  { name: 'CONTACT', path: '/contact' },
];

export const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 px-8 py-3 flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative text-[10px] tracking-[0.2em] font-light transition-colors"
            >
              <span className={location.pathname === item.path ? 'text-white' : 'text-white/40 hover:text-white'}>
                {item.name}
              </span>
              {location.pathname === item.path && (
                <Motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/70 border-b border-white/10">
          <span className="text-[10px] tracking-[0.5em] uppercase font-light">arcwove</span>
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="メニュー"
          >
            <Motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
            <Motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-5 h-px bg-white"
            />
            <Motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <Motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="backdrop-blur-xl bg-black/90 border-b border-white/10"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/5 transition-colors ${
                    location.pathname === item.path ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
