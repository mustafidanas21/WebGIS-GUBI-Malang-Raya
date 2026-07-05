import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../data/navigation.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClassName = ({ isActive }) =>
    [
      'rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-ring',
      isActive
        ? 'bg-brand-100 text-brand-800'
        : 'text-carbon-700 hover:bg-carbon-100 hover:text-carbon-950',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-carbon-200/80 bg-white/90 backdrop-blur">
      <nav className="page-shell flex h-16 items-center justify-between gap-4" aria-label="Navigasi utama">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 focus-ring" onClick={() => setIsOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white shadow-soft">
            ML
          </span>
          <span className="truncate text-sm font-extrabold leading-tight text-carbon-950 sm:text-base">
            GUBI Malang Raya
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring inline-flex size-10 items-center justify-center rounded-md border border-carbon-200 text-carbon-800 lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-carbon-200 bg-white lg:hidden">
          <div className="page-shell grid gap-1 py-3">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={linkClassName} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
