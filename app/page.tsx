import Link from "next/link";
import { getAllGuides, getAllStories } from "@/lib/content";

const GUIDE_SECTIONS = [
  { key: "just-landed", label: "YOU JUST LANDED" },
  { key: "hungry-now", label: "YOU'RE HUNGRY RIGHT NOW" },
  { key: "the-best", label: "YOU WANT THE BEST" },
  { key: "specific-need", label: "YOU HAVE A SPECIFIC NEED" },
  { key: "other-cities", label: "OTHER CITIES" },
];

export const revalidate = 60;

export default async function HomePage() {
  const guides = await getAllGuides();
  const stories = await getAllStories();

  const featuredGuide = guides[0];

  return (
    <div className="pt-11">

      {/* ============================================ */}
      {/* HERO — Type-driven, light, magazine cover    */}
      {/* ============================================ */}
      <section className="min-h-[88vh] bg-white flex flex-col relative border-b border-neutral-200">
        <div className="flex-1 flex flex-col justify-between max-w-[1400px] mx-auto w-full px-6 md:px-10">
          {/* Top rule */}
          <div className="pt-16 md:pt-20">
            <div className="flex items-center gap-6">
              <div className="w-8 h-[1px] bg-terracotta" />
              <p className="text-[9px] tracking-[0.3em] text-neutral-300 font-mono">ISSUE 001 — FEBRUARY 2026</p>
            </div>
          </div>

          {/* Main title block */}
          <div className="py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-display font-bold text-neutral-900 leading-[0.85] tracking-[-0.03em]" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}>
                  Cuisines<br />
                  <span className="italic font-normal text-neutral-300">of</span>{" "}
                  Morocco
                </h1>
              </div>
              <div className="md:col-span-4 pb-2 md:pb-4">
                <div className="w-full h-[1px] bg-neutral-200 mb-6" />
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                  Where to eat. What to order. And the cultural intelligence behind every dish.
                </p>
                <p className="text-[9px] tracking-[0.2em] text-terracotta mt-6 font-mono">
                  25 GUIDES · 30 STORIES · 1 GLOSSARY
                </p>
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div className="pb-8 md:pb-12">
            <div className="w-full h-[1px] bg-neutral-200 mb-6" />
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {["TAGINE", "SAFFRON", "COUSCOUS", "THE FERRAN", "PRESERVED LEMONS", "RAS EL HANOUT", "PASTILLA", "TANJIA"].map((t) => (
                <span key={t} className="text-[9px] tracking-[0.2em] text-neutral-300 hover:text-terracotta transition-colors cursor-default">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED GUIDE — Asymmetric treatment        */}
      {/* ============================================ */}
      {featuredGuide && (
        <section className="border-b border-neutral-200 bg-neutral-50/50">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[45vh]">
              <div className="md:col-span-1 flex md:flex-col items-center md:items-start justify-start p-6 md:p-8 md:pt-14 md:border-r border-neutral-100">
                <span className="font-display text-8xl md:text-9xl font-bold text-neutral-100 leading-none select-none">01</span>
              </div>
              <div className="md:col-span-11 p-8 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[9px] tracking-[0.25em] text-terracotta font-mono">GUIDE</span>
                  <div className="w-12 h-[1px] bg-neutral-200" />
                  <span className="text-[9px] tracking-[0.2em] text-neutral-400">{featuredGuide.section?.replace(/-/g, " ").toUpperCase()}</span>
                </div>
                <Link href={`/guide/${featuredGuide.slug}`} className="group">
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-[0.95] mb-6 max-w-3xl">
                    {featuredGuide.title}
                  </h2>
                </Link>
                <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-xl mb-8">
                  {featuredGuide.subtitle || featuredGuide.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/guide/${featuredGuide.slug}`}
                    className="text-[10px] tracking-[0.2em] text-terracotta font-medium hover:text-terracotta-700 transition-colors"
                  >
                    READ THE GUIDE →
                  </Link>
                  {featuredGuide.city && (
                    <span className="text-[9px] tracking-[0.15em] text-neutral-300">{featuredGuide.city.toUpperCase()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* GUIDES INDEX — Table rows by section         */}
      {/* ============================================ */}
      <section id="guides" className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex items-baseline gap-6 mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 leading-none">Guides</h2>
            <div className="flex-1 h-[1px] bg-neutral-200 relative top-[-4px]" />
            <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono">{guides.length} ENTRIES</span>
          </div>

          {GUIDE_SECTIONS.map((section) => {
            const sectionGuides = guides.filter((g) => g.section === section.key);
            if (sectionGuides.length === 0) return null;

            return (
              <div key={section.key} className="mb-14 last:mb-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2 bg-terracotta" />
                  <p className="text-[10px] tracking-[0.25em] text-neutral-400 font-mono">{section.label}</p>
                </div>

                <div className="border-t border-neutral-200">
                  {sectionGuides.map((guide, i) => (
                    <Link
                      key={guide.slug}
                      href={`/guide/${guide.slug}`}
                      className="group grid grid-cols-12 gap-4 py-5 border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors px-2 md:px-4"
                    >
                      <div className="col-span-1 flex items-baseline">
                        <span className="font-mono text-xs text-neutral-200 group-hover:text-terracotta/50 transition-colors">
                          {String(guide.order || i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="col-span-7 md:col-span-5">
                        <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight">
                          {guide.title}
                        </h3>
                      </div>
                      <div className="hidden md:block md:col-span-4">
                        <p className="text-xs text-neutral-400 leading-relaxed pt-1">{guide.excerpt}</p>
                      </div>
                      <div className="col-span-4 md:col-span-2 flex items-baseline justify-end gap-4">
                        {guide.city && (
                          <span className="text-[9px] tracking-[0.12em] text-neutral-300 hidden md:inline">
                            {guide.city.toUpperCase()}
                          </span>
                        )}
                        <span className="text-[10px] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* STORIES — Light cards, asymmetric            */}
      {/* ============================================ */}
      {stories.length > 0 && (
        <section id="stories" className="bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex items-baseline gap-6 mb-16">
              <h2 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 leading-none">Stories</h2>
              <div className="flex-1 h-[1px] bg-neutral-200 relative top-[-4px]" />
              <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono">{stories.length} ENTRIES</span>
            </div>

            {/* First row: 2 stories, asymmetric */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-neutral-200 mb-[1px]">
              {stories.slice(0, 1).map((story) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className="md:col-span-7 group bg-white p-8 md:p-12 min-h-[260px] flex flex-col justify-between hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl font-bold text-neutral-100 leading-none select-none">
                      {String(story.entry_number || 1).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono">{story.category?.toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-3">
                      {story.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-md">{story.subtitle || story.excerpt}</p>
                  </div>
                </Link>
              ))}
              {stories.slice(1, 2).map((story) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className="md:col-span-5 group bg-white p-8 md:p-12 min-h-[260px] flex flex-col justify-between hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-display text-5xl font-bold text-neutral-100 leading-none select-none">
                    {String(story.entry_number || 2).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono mb-3 block">{story.category?.toUpperCase()}</span>
                    <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-2">
                      {story.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{story.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Remaining stories: index rows */}
            {stories.length > 2 && (
              <div className="bg-white border-t border-neutral-200 mt-8">
                {stories.slice(2, 10).map((story, i) => (
                  <Link
                    key={story.slug}
                    href={`/story/${story.slug}`}
                    className="group grid grid-cols-12 gap-4 py-5 border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors px-4"
                  >
                    <div className="col-span-1">
                      <span className="font-mono text-xs text-neutral-200 group-hover:text-terracotta/50 transition-colors">
                        {String(story.entry_number || i + 3).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="col-span-5 md:col-span-3">
                      <h3 className="text-base font-display font-bold text-neutral-900 group-hover:text-terracotta transition-colors">
                        {story.title}
                      </h3>
                    </div>
                    <div className="hidden md:block md:col-span-5">
                      <p className="text-xs text-neutral-400 leading-relaxed">{story.excerpt}</p>
                    </div>
                    <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-4">
                      <span className="text-[9px] tracking-[0.12em] text-neutral-300 font-mono">{story.category?.toUpperCase()}</span>
                      <span className="text-[10px] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* GLOSSARY TEASER                              */}
      {/* ============================================ */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <p className="text-[9px] tracking-[0.25em] text-terracotta font-mono mb-4">REFERENCE</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 leading-[0.95] mb-4">
                Glossary
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
                The vocabulary you need to eat with understanding. Every term in Arabic script, with pronunciation and context.
              </p>
              <Link
                href="/glossary"
                className="inline-block text-[10px] tracking-[0.2em] text-terracotta font-medium hover:text-terracotta-700 transition-colors"
              >
                BROWSE THE GLOSSARY →
              </Link>
            </div>
            <div className="md:col-span-7 md:border-l border-neutral-200 md:pl-12">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {[
                  { term: "طاجين", latin: "Tagine" },
                  { term: "خبز", latin: "Khobz" },
                  { term: "حريرة", latin: "Harira" },
                  { term: "أملو", latin: "Amlou" },
                  { term: "شرمولة", latin: "Chermoula" },
                  { term: "فران", latin: "Ferran" },
                ].map((g) => (
                  <div key={g.latin}>
                    <p className="text-2xl text-neutral-200 mb-1" dir="rtl">{g.term}</p>
                    <p className="text-xs text-neutral-500">{g.latin}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA — Slow Morocco                           */}
      {/* ============================================ */}
      <section className="bg-terracotta text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-white/50 font-mono mb-2">TASTE IT</p>
            <p className="font-display text-2xl md:text-3xl font-light italic">
              Culinary journeys through Morocco
            </p>
          </div>
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-[10px] tracking-[0.2em] font-medium border border-white/30 hover:bg-white hover:text-terracotta transition-all"
          >
            EXPLORE WITH SLOW MOROCCO
          </a>
        </div>
      </section>
    </div>
  );
}
