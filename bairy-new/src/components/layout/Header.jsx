import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.svg?url";

const navItems = [
  { label: "О нас", href: "#about" },
  { label: "Размещение", href: "#accommodation" },
  { label: "Услуги", href: "#activities" },
  { label: "Галерея", href: "#gallery" },
  { label: "Как добраться", href: "#directions" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#ebf2e9] bg-white px-6 py-3 md:px-10">

    <div className="flex items-center gap-4 text-[#121a0f]">
      <div className="size-7">
        <img src={logo} alt="Логотип Байры" className="w-full h-full object-contain" />
      </div>
      <a href="#hero" className="text-[#121a0f] text-lg font-bold">
        Байры
      </a>
    </div>


      {/* Навигация — desktop */}
      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {navItems.map(({ label, href }, idx) => (
            <a key={idx} className="text-sm font-medium text-[#121a0f]" href={href}>
              {label}
            </a>
          ))}
        </div>
        <button className="rounded-xl bg-[#53d22c] px-4 h-10 text-sm font-bold text-[#121a0f]">
          <a href="#contacts">
              Позвонить
            </a>
        </button>
      </nav>

      {/* Бургер — мобильный */}
      <button
        className="md:hidden p-2 z-50"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke="#121a0f" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#121a0f" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Меню справа */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white/90 backdrop-blur-lg p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col gap-5 mt-12">
          {navItems.map(({ label, href }, idx) => (
            <a
              key={idx}
              className="text-[#121a0f] text-base font-medium"
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <button className="mt-4 rounded-xl bg-[#53d22c] px-4 py-2 text-sm font-bold text-[#121a0f]">
            <a href="#contacts">
              Позвонить
            </a>
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-white/30 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
