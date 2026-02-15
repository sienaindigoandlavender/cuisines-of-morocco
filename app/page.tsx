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

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' fill='%23f0f0ee'%3E%3Crect width='800' height='500'/%3E%3C/svg%3E";

export default async function HomePage() {
  const guides = await getAllGuides();
  const stories = await getAllStories();

  const featuredGuide = guides[0];

  return (
    <div className="pt-11">

      {/* ============================================ */}
      {/* HERO — Full-bleed image, floating title       */}
      {/* ============================================ */}
      <section className="relative min-h-[92vh] bg-white">
        {/* Full image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredGuide?.hero_image || PLACEHOLDER})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />
        </div>

        {/* Floating title — bottom left, deeply inset */}
        <div className="relative z-10 min-h-[92vh] flex flex-col justify-end">
          <div className="px-8 md:px-[8%] lg:px-[12%] pb-16 md:pb-24">
            <p className="text-[9px] tracking-[0.3em] text-neutral-400 mb-6 font-mono">FEBRUARY 2026</p>
            <h1 className="font-display font-bold text-neutral-900 leading-[0.85] tracking-[-0.03em] mb-8" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
              Cuisines<br />
              <span className="italic font-normal text-neutral-400">of </span>
              Morocco
            </h1>
            <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-md mb-10">
              Where to eat. What to order. And the cultural<br className="hidden md:block" />
              intelligence behind every dish.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/#guides" className="text-[10px] tracking-[0.25em] text-terracotta font-medium hover:text-terracotta-700 transition-colors">
                GUIDES
              </Link>
              <Link href="/#stories" className="text-[10px] tracking-[0.25em] text-neutral-400 hover:text-neutral-800 transition-colors">
                STORIES
              </Link>
              <Link href="/map" className="text-[10px] tracking-[0.25em] text-neutral-400 hover:text-neutral-800 transition-colors">
                MAP
              </Link>
              <Link href="/regions" className="text-[10px] tracking-[0.25em] text-neutral-400 hover:text-neutral-800 transition-colors">
                REGIONS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED GUIDES — Asymmetric image + text    */}
      {/* ============================================ */}
      {guides.length >= 2 && (
        <section className="py-24 md:py-40">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            {guides.slice(0, 2).map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}`}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${i === 0 ? 'mb-24 md:mb-40' : ''}`}
              >
                {/* Image — alternating sides */}
                <div className={`${i === 0 ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6 md:order-2'} relative`}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${guide.hero_image || PLACEHOLDER})` }}
                    />
                  </div>
                </div>

                {/* Text — deeply offset */}
                <div className={`${i === 0 ? 'md:col-span-4 md:col-start-9' : 'md:col-span-4 md:col-start-1 md:order-1'}`}>
                  <span className="text-[9px] tracking-[0.3em] text-neutral-300 font-mono block mb-4">
                    GUIDE · {guide.city?.toUpperCase()}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-[1.05] mb-5">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-[1.8] mb-6">{guide.excerpt}</p>
                  <span className="text-[10px] tracking-[0.25em] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    READ →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* GUIDES INDEX — Clean typographic list         */}
      {/* ============================================ */}
      <section id="guides" className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="max-w-[900px]">
            <p className="text-[9px] tracking-[0.3em] text-neutral-300 font-mono mb-6">ALL GUIDES</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-[0.9] mb-4">
              Guides
            </h2>
            <p className="text-sm text-neutral-400 leading-[1.8] max-w-md mb-20">
              Practical intelligence for eating in Morocco. Where to go, what to order, what to avoid.
            </p>
          </div>

          {GUIDE_SECTIONS.map((section) => {
            const sectionGuides = guides.filter((g) => g.section === section.key);
            if (sectionGuides.length === 0) return null;

            return (
              <div key={section.key} className="mb-20 last:mb-0">
                <p className="text-[10px] tracking-[0.3em] text-neutral-300 font-mono mb-8">{section.label}</p>

                {sectionGuides.map((guide, i) => (
                  <Link
                    key={guide.slug}
                    href={`/guide/${guide.slug}`}
                    className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-6 border-b border-neutral-100 first:border-t hover:border-neutral-300 transition-colors"
                  >
                    <span className="font-mono text-[11px] text-neutral-200 group-hover:text-terracotta/40 transition-colors w-6 flex-shrink-0">
                      {String(guide.order || i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight">
                        {guide.title}
                      </h3>
                    </div>
                    <span className="hidden md:block text-xs text-neutral-300 max-w-xs leading-relaxed flex-shrink-0">
                      {guide.excerpt}
                    </span>
                    <span className="text-[10px] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* MAP + REGIONS — Side by side, no borders      */}
      {/* ============================================ */}
      <section className="py-24 md:py-40 bg-neutral-50/50">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <Link href="/map" className="group">
              <p className="text-[9px] tracking-[0.3em] text-terracotta font-mono mb-6">INTERACTIVE</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-[0.95] mb-6">
                City Map
              </h3>
              <p className="text-sm text-neutral-400 leading-[1.8] max-w-sm mb-8">
                Every restaurant and stall we recommend in Marrakech, on one map. Filter by neighbourhood, price, or what you're craving.
              </p>
              <span className="text-[10px] tracking-[0.25em] text-terracotta font-medium">OPEN MAP →</span>
            </Link>
            <Link href="/regions" className="group">
              <p className="text-[9px] tracking-[0.3em] text-terracotta font-mono mb-6">EXPLORE</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-[0.95] mb-6">
                Food by Region
              </h3>
              <p className="text-sm text-neutral-400 leading-[1.8] max-w-sm mb-8">
                Six distinct cuisines across one country. Fez court kitchens, Souss Amazigh tables, Saharan survival cooking, and the coastal fish tradition.
              </p>
              <span className="text-[10px] tracking-[0.25em] text-terracotta font-medium">EXPLORE REGIONS →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STORIES — Image grid, Kinfolk card style      */}
      {/* ============================================ */}
      {stories.length > 0 && (
        <section id="stories" className="py-24 md:py-40">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-[900px] mb-20">
              <p className="text-[9px] tracking-[0.3em] text-neutral-300 font-mono mb-6">ALL STORIES</p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-[0.9] mb-4">
                Stories
              </h2>
              <p className="text-sm text-neutral-400 leading-[1.8] max-w-md">
                The cultural intelligence behind Moroccan food. History, trade routes, and the people who shape how Morocco eats.
              </p>
            </div>

            {/* Featured stories — tall portrait ratio like Kinfolk */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
              {stories.slice(0, 3).map((story) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden mb-6" style={{ aspectRatio: '3/4' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${story.hero_image || PLACEHOLDER})` }}
                    />
                  </div>
                  <span className="text-[9px] tracking-[0.25em] text-neutral-300 font-mono block mb-3">
                    {story.category?.toUpperCase()}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors leading-tight mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{story.subtitle || story.excerpt}</p>
                </Link>
              ))}
            </div>

            {/* Remaining stories — minimal text list */}
            {stories.length > 3 && (
              <div>
                {stories.slice(3, 12).map((story, i) => (
                  <Link
                    key={story.slug}
                    href={`/story/${story.slug}`}
                    className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-6 border-b border-neutral-100 first:border-t hover:border-neutral-300 transition-colors"
                  >
                    <span className="font-mono text-[11px] text-neutral-200 group-hover:text-terracotta/40 transition-colors w-6 flex-shrink-0">
                      {String(story.entry_number || i + 4).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors">
                        {story.title}
                      </h3>
                    </div>
                    <span className="hidden md:block text-xs text-neutral-300 max-w-xs leading-relaxed flex-shrink-0">
                      {story.excerpt}
                    </span>
                    <span className="text-[9px] tracking-[0.15em] text-neutral-200 font-mono flex-shrink-0 hidden md:block">
                      {story.category?.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-terracotta opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* GLOSSARY — Floating type specimens            */}
      {/* ============================================ */}
      <section className="py-24 md:py-40 bg-neutral-50/50">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <p className="text-[9px] tracking-[0.3em] text-terracotta font-mono mb-6">REFERENCE</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 leading-[0.95] mb-6">Glossary</h2>
              <p className="text-sm text-neutral-400 leading-[1.8] mb-8">
                The vocabulary you need to eat with understanding. Every term in Arabic script, with pronunciation and context.
              </p>
              <Link href="/glossary" className="inline-block text-[10px] tracking-[0.25em] text-terracotta font-medium hover:text-terracotta-700 transition-colors">
                BROWSE THE GLOSSARY →
              </Link>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
                {[
                  { term: "طاجين", latin: "Tagine" },
                  { term: "خبز", latin: "Khobz" },
                  { term: "حريرة", latin: "Harira" },
                  { term: "أملو", latin: "Amlou" },
                  { term: "شرمولة", latin: "Chermoula" },
                  { term: "فران", latin: "Ferran" },
                ].map((g) => (
                  <div key={g.latin}>
                    <p className="text-3xl text-neutral-200 mb-2" dir="rtl">{g.term}</p>
                    <p className="text-xs text-neutral-500 tracking-wide">{g.latin}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA — Slow Morocco, minimal                   */}
      {/* ============================================ */}
      <section className="py-24 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%] text-center">
          <p className="text-[9px] tracking-[0.3em] text-neutral-300 font-mono mb-6">TASTE IT</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light italic text-neutral-900 mb-10">
            Culinary journeys through Morocco
          </p>
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 text-[10px] tracking-[0.25em] font-medium text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-white transition-all duration-300"
          >
            EXPLORE WITH SLOW MOROCCO
          </a>
        </div>
      </section>

      {/* Bottom counter */}
      <div className="px-8 md:px-[8%] lg:px-[12%] pb-16">
        <p className="text-[9px] tracking-[0.25em] text-neutral-200 font-mono">
          {guides.length} GUIDES · {stories.length} STORIES · 1 GLOSSARY
        </p>
      </div>
    </div>
  );
}
