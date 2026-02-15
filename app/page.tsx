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

// Placeholder image until real images are loaded into Supabase
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' fill='%23f5f5f4'%3E%3Crect width='800' height='500'/%3E%3C/svg%3E";

export default async function HomePage() {
  const guides = await getAllGuides();
  const stories = await getAllStories();

  const featuredGuide = guides[0];
  const secondGuide = guides[1];

  return (
    <div className="pt-11">

      {/* ============================================ */}
      {/* HERO — Split: type left, featured image right */}
      {/* ============================================ */}
      <section className="min-h-[88vh] bg-white border-b border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[88vh]">
          {/* Left: title */}
          <div className="md:col-span-5 flex flex-col justify-between p-8 md:p-14 lg:p-20 xl:pl-28">
            <div className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-6 h-[1px] bg-terracotta" />
                <p className="text-[9px] tracking-[0.25em] text-neutral-300 font-mono">FEBRUARY 2026</p>
              </div>
            </div>

            <div>
              <h1 className="font-display font-bold text-neutral-900 leading-[0.85] tracking-[-0.02em] mb-8" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                Cuisines<br />
                <span className="italic font-normal text-neutral-300">of</span>{" "}
                Morocco
              </h1>
              <div className="w-12 h-[2px] bg-terracotta mb-6" />
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-8">
                Where to eat. What to order. And the cultural intelligence behind every dish.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/#guides" className="text-[10px] tracking-[0.2em] text-terracotta font-medium hover:text-terracotta-700 transition-colors">
                  GUIDES →
                </Link>
                <Link href="/#stories" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-neutral-700 transition-colors">
                  STORIES
                </Link>
                <Link href="/map" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-neutral-700 transition-colors">
                  MAP
                </Link>
                <Link href="/regions" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-neutral-700 transition-colors">
                  REGIONS
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono">
                25 GUIDES · 30 STORIES · 1 GLOSSARY
              </p>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="md:col-span-7 relative min-h-[50vh] md:min-h-0 bg-stone-100 md:border-l border-neutral-200">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${featuredGuide?.hero_image || PLACEHOLDER})` }}
            />
            {/* Overlay card bottom-left */}
            {featuredGuide && (
              <Link href={`/guide/${featuredGuide.slug}`} className="group absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                <span className="text-[9px] tracking-[0.25em] text-white/50 font-mono block mb-2">LATEST GUIDE</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-terracotta-200 transition-colors leading-tight mb-2">
                  {featuredGuide.title}
                </h2>
                <p className="text-xs text-white/60 max-w-sm">{featuredGuide.excerpt}</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED PAIR — Two guides, image + text     */}
      {/* ============================================ */}
      {guides.length >= 2 && (
        <section className="border-b border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {guides.slice(0, 2).map((guide, i) => (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className={`group flex flex-col ${i === 1 ? 'md:border-l border-neutral-200' : ''}`}
                >
                  {/* Image */}
                  <div className="relative h-64 md:h-80 bg-stone-100 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-500"
                      style={{ backgroundImage: `url(${guide.hero_image || PLACEHOLDER})` }}
                    />
                  </div>
                  {/* Text */}
                  <div className="p-8 md:p-10 lg:p-12 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[9px] tracking-[0.25em] text-terracotta font-mono">GUIDE</span>
                        <span className="text-[9px] tracking-[0.15em] text-neutral-300">{guide.city?.toUpperCase()}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight mb-3">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{guide.excerpt}</p>
                    </div>
                    <div className="mt-6">
                      <span className="text-[10px] tracking-[0.2em] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                        READ →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* GUIDES INDEX — Table rows by section         */}
      {/* ============================================ */}
      <section id="guides" className="bg-white">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-32">
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
                      className="group grid grid-cols-12 gap-4 py-6 border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors px-2 md:px-6"
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
                          <span className="text-[9px] tracking-[0.12em] text-neutral-300 hidden md:inline">{guide.city.toUpperCase()}</span>
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
      {/* MAP + REGIONS PROMO                          */}
      {/* ============================================ */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <Link href="/map" className="group py-14 md:py-20 pr-8 md:pr-16 hover:bg-white/50 transition-colors">
              <p className="text-[9px] tracking-[0.25em] text-terracotta font-mono mb-4">INTERACTIVE</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight mb-4">
                City Map
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
                Every restaurant and stall we recommend in Marrakech, on one map. Filter by neighbourhood, price, or what you're craving.
              </p>
              <span className="text-[10px] tracking-[0.2em] text-terracotta font-medium">OPEN MAP →</span>
            </Link>
            <Link href="/regions" className="group py-14 md:py-20 pl-8 md:pl-16 md:border-l border-neutral-200 hover:bg-white/50 transition-colors">
              <p className="text-[9px] tracking-[0.25em] text-terracotta font-mono mb-4">EXPLORE</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight mb-4">
                Food by Region
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
                Six distinct cuisines across one country. Fez court kitchens, Souss Amazigh tables, Saharan survival cooking, and the coastal fish tradition.
              </p>
              <span className="text-[10px] tracking-[0.2em] text-terracotta font-medium">EXPLORE REGIONS →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STORIES — With images                        */}
      {/* ============================================ */}
      {stories.length > 0 && (
        <section id="stories" className="bg-white">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-32">
            <div className="flex items-baseline gap-6 mb-16">
              <h2 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 leading-none">Stories</h2>
              <div className="flex-1 h-[1px] bg-neutral-200 relative top-[-4px]" />
              <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono">{stories.length} ENTRIES</span>
            </div>

            {/* Featured stories with images: 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-neutral-200 mb-12">
              {stories.slice(0, 3).map((story) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className="group bg-white flex flex-col"
                >
                  <div className="relative h-56 bg-stone-100 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-500"
                      style={{ backgroundImage: `url(${story.hero_image || PLACEHOLDER})` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="font-display text-4xl font-bold text-white/20 leading-none select-none">
                        {String(story.entry_number || 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] tracking-[0.2em] text-neutral-300 font-mono block mb-3">{story.category?.toUpperCase()}</span>
                      <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight mb-2">
                        {story.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{story.subtitle || story.excerpt}</p>
                    </div>
                    <div className="mt-4">
                      {story.region && (
                        <span className="text-[9px] tracking-[0.12em] text-neutral-300">{story.region.toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Remaining stories: index rows */}
            {stories.length > 3 && (
              <div className="border-t border-neutral-200">
                {stories.slice(3, 12).map((story, i) => (
                  <Link
                    key={story.slug}
                    href={`/story/${story.slug}`}
                    className="group grid grid-cols-12 gap-4 py-6 border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors px-2 md:px-6"
                  >
                    <div className="col-span-1">
                      <span className="font-mono text-xs text-neutral-200 group-hover:text-terracotta/50 transition-colors">
                        {String(story.entry_number || i + 4).padStart(2, "0")}
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
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <p className="text-[9px] tracking-[0.25em] text-terracotta font-mono mb-4">REFERENCE</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 leading-[0.95] mb-4">Glossary</h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
                The vocabulary you need to eat with understanding. Every term in Arabic script, with pronunciation and context.
              </p>
              <Link href="/glossary" className="inline-block text-[10px] tracking-[0.2em] text-terracotta font-medium hover:text-terracotta-700 transition-colors">
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
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-white/50 font-mono mb-2">TASTE IT</p>
            <p className="font-display text-2xl md:text-3xl font-light italic">Culinary journeys through Morocco</p>
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
