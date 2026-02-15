import Link from "next/link";

const CONTENT_SITES = [
  { label: "Architecture of Morocco", url: "https://architectureofmorocco.com" },
  { label: "Festivals in Morocco", url: "https://festivalsinmorocco.com" },
  { label: "Music in Morocco", url: "https://musicinmorocco.com" },
  { label: "Before the Word", url: "https://beforetheword.com" },
  { label: "derb", url: "https://derb.so" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer>
      {/* Level 1: Navigation */}
      <div style={{ backgroundColor: "#1f1f1f" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[10px]">
            <div>
              <p className="tracking-[0.2em] text-white/40 mb-4">CUISINES OF MOROCCO</p>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                The intelligence behind<br />Moroccan food.
              </p>
              <p className="text-white/30 text-xs">Marrakech, Morocco</p>
            </div>
            <div>
              <p className="tracking-[0.2em] text-white/40 mb-4">GUIDES</p>
              <div className="space-y-2 text-white/50">
                <Link href="/guide/you-just-arrived-marrakech" className="block hover:text-white transition-colors">You Just Arrived</Link>
                <Link href="/guide/jemaa-el-fna-eating-guide" className="block hover:text-white transition-colors">Jemaa el-Fna</Link>
                <Link href="/guide/best-tagine-marrakech" className="block hover:text-white transition-colors">Best Tagine</Link>
                <Link href="/guide/spice-shopping-guide" className="block hover:text-white transition-colors">Spice Shopping</Link>
              </div>
            </div>
            <div>
              <p className="tracking-[0.2em] text-white/40 mb-4">STORIES</p>
              <div className="space-y-2 text-white/50">
                <Link href="/story/tagine" className="block hover:text-white transition-colors">Tagine</Link>
                <Link href="/story/saffron" className="block hover:text-white transition-colors">Saffron</Link>
                <Link href="/story/the-ferran" className="block hover:text-white transition-colors">The Ferran</Link>
                <Link href="/glossary" className="block hover:text-white transition-colors">Glossary</Link>
              </div>
            </div>
            <div>
              <p className="tracking-[0.2em] text-white/40 mb-4">CONNECT</p>
              <div className="space-y-2 text-white/50">
                <a href="https://www.slowmorocco.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Slow Morocco ↗</a>
                <a href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Riad di Siena ↗</a>
                <a href="https://derb.so" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">derb ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level 2: Content Network */}
      <div style={{ backgroundColor: "#161616" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[9px] tracking-[0.2em] text-white/25">EXPLORE</span>
            {CONTENT_SITES.map((site) => (
              <a
                key={site.label}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-white/35 hover:text-white/70 transition-colors"
              >
                {site.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Level 3: Legal + Google Translate */}
      <div style={{ backgroundColor: "#0e0e0e" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link href={link.href} className="text-[10px] text-white/25 hover:text-white/50 transition-colors">
                    {link.label}
                  </Link>
                  {i < LEGAL_LINKS.length - 1 && <span className="text-white/10">·</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {/* Google Translate widget placeholder */}
              <div id="google_translate_element" className="text-[10px]" />
              <p className="text-[9px] tracking-[0.15em] text-white/20">
                © {new Date().getFullYear()} CUISINES OF MOROCCO
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
