import { notFound } from "next/navigation";
import { getStoryBySlug, getAllStorySlugs, getRelatedStories, getRelatedGuides } from "@/lib/content";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      images: story.hero_image ? [{ url: story.hero_image }] : [],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const story = await getStoryBySlug(params.slug);
  if (!story) notFound();

  const relatedStories = await getRelatedStories(story.related_stories || []);
  const relatedGuides = await getRelatedGuides(story.related_guides || []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    author: { "@type": "Organization", name: "Cuisines of Morocco" },
    publisher: { "@type": "Organization", name: "Cuisines of Morocco", url: "https://cuisinesofmorocco.com" },
  };

  return (
    <div className="pt-11">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero — full-bleed image */}
      {story.hero_image && (
        <div className="relative w-full" style={{ height: '70vh' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${story.hero_image})` }}
          />
        </div>
      )}

      {/* Title block — floating in whitespace */}
      <div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            {story.entry_number && (
              <span className="text-[10px] tracking-[0.25em] text-terracotta font-mono">
                № {String(story.entry_number).padStart(2, "0")}
              </span>
            )}
            <span className="text-[10px] tracking-[0.25em] text-neutral-300 font-mono">{story.category?.toUpperCase()}</span>
          </div>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-neutral-900 mb-6">
            {story.title}
          </h1>
          <p className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed max-w-lg mb-8">
            {story.subtitle || story.excerpt}
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] text-neutral-300">
            {story.region && <span>{story.region.toUpperCase()}</span>}
            {story.read_time && <><span className="text-neutral-200">·</span><span>{story.read_time}</span></>}
          </div>
        </div>
      </div>

      {/* Body — generous inset */}
      <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          <div className="md:col-span-7">
            <div className="max-w-xl prose-editorial">
              <ReactMarkdown>{story.body}</ReactMarkdown>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            {relatedGuides.length > 0 && (
              <div className="mb-12">
                <p className="text-[10px] tracking-[0.25em] text-terracotta font-mono mb-6">PRACTICAL GUIDES</p>
                <div className="space-y-5">
                  {relatedGuides.map((g) => (
                    <Link key={g.slug} href={`/guide/${g.slug}`} className="block group">
                      <p className="text-sm font-medium text-neutral-800 group-hover:text-terracotta transition-colors">
                        {g.title}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{g.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] tracking-[0.25em] text-neutral-300 font-mono mb-10">CONTINUE READING</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {relatedStories.slice(0, 3).map((rs) => (
              <Link
                key={rs.slug}
                href={`/story/${rs.slug}`}
                className="group"
              >
                {rs.entry_number && (
                  <span className="text-[10px] tracking-[0.25em] text-terracotta/30 font-mono">
                    № {String(rs.entry_number).padStart(2, "0")}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mt-2 mb-3">
                  {rs.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{rs.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
