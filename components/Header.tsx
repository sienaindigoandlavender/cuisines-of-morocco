"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Guides", href: "/#guides" },
  { label: "Stories", href: "/#stories" },
  { label: "Map", href: "/map" },
  { label: "Regions", href: "/regions" },
  { label: "Glossary", href: "/glossary" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 md:px-[8%] lg:px-[12%] h-11">
        <Link href="/" className="text-[10px] tracking-[0.2em] font-medium text-neutral-400 hover:text-neutral-800 transition-colors">
          CUISINES OF MOROCCO
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[10px] tracking-[0.15em] px-4 py-3 text-neutral-400 hover:text-neutral-800 transition-colors"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.15em] text-neutral-300 hover:text-terracotta transition-colors ml-4"
          >
            SLOW MOROCCO ↗
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-neutral-400"
          aria-label="Menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — full screen overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-11 bg-white z-40 flex flex-col justify-center px-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-4 font-display text-3xl font-bold text-neutral-900 hover:text-terracotta transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-4 text-sm text-neutral-400 hover:text-terracotta mt-8"
          >
            Slow Morocco ↗
          </a>
        </div>
      )}
    </header>
  );
}
