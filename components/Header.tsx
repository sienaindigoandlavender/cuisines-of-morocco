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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 h-11">
          <Link href="/" className="text-caption font-medium text-neutral-400 hover:text-terracotta transition-colors">
            CUISINES OF MOROCCO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-caption px-4 py-3 text-neutral-400 hover:text-neutral-800 transition-colors"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white px-8 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-label text-neutral-500 hover:text-neutral-800"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <a
              href="https://www.slowmorocco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-label text-neutral-300 hover:text-terracotta"
            >
              SLOW MOROCCO ↗
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
