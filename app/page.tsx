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

  return (
    <div className="pt-11">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-end relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=1800&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
          <p className="text-caption text-white/50 mb-4">THE DEFINITIVE GUIDE</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-6">
            Cuisines of<br />Morocco
          </h1>
          <div className="w-16 h-[2px] bg-terracotta mb-6" />
          <p className="text-lg md:text-xl font-light text-white/70 max-w-lg leading-relaxed">
            Where to eat. What to order. And the cultural intelligence behind every dish.
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-center gap-4 mb-12">
          <p className="text-caption text-terracotta font-medium">GUIDES</p>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        {GUIDE_SECTIONS.map((section) => {
          const sectionGuides = guides.filter((g) => g.section === section.key);
          if (sectionGuides.length === 0) return null;

          return (
            <div key={section.key} className="mb-12">
              <p className="text-label text-neutral-400 mb-6">{section.label}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {sectionGuides.map((guide, i) => (
                  <Link
                    key={guide.slug}
                    href={`/guide/${guide.slug}`}
                    className={`group block p-6 hover:bg-neutral-50 transition-colors border-b border-neutral-100 ${
                      i % 3 === 1 || i % 3 === 2 ? "lg:border-l" : ""
                    } ${i % 2 === 1 ? "md:border-l lg:border-l-0" : ""}`}
                  >
                    <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{guide.excerpt}</p>
                    {guide.city && (
                      <span className="inline-block mt-3 text-[9px] tracking-[0.15em] text-neutral-300">
                        {guide.city.toUpperCase()}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Stories Section */}
      {stories.length > 0 && (
        <section id="stories" className="border-t border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex items-center gap-4 mb-12">
              <p className="text-caption text-terracotta font-medium">STORIES</p>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {stories.slice(0, 8).map((story, i) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className={`group block p-6 md:p-8 hover:bg-neutral-50 transition-colors border-b md:border-b-0 border-neutral-100 ${
                    i > 0 ? "md:border-l border-neutral-100" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    {story.entry_number && (
                      <span className="text-caption text-terracotta/40">
                        № {String(story.entry_number).padStart(2, "0")}
                      </span>
                    )}
                    <span className="text-[9px] tracking-[0.12em] text-neutral-300">
                      {story.category?.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{story.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA to Slow Morocco */}
      <section className="bg-ink text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-caption text-terracotta mb-3">TASTE IT</p>
            <p className="font-display text-2xl md:text-3xl font-light">
              Culinary journeys through Morocco
            </p>
          </div>
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-caption font-medium border border-white/20 hover:bg-terracotta hover:border-terracotta transition-all"
          >
            EXPLORE WITH SLOW MOROCCO
          </a>
        </div>
      </section>
    </div>
  );
}
