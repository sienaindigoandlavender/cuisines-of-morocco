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

      {/* Hero - split layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80vh]">
        <div className="md:col-span-5 flex flex-col justify-end p-8 md:p-14 pb-14 md:pb-20 bg-white relative">
          {story.entry_number && (
            <div className="absolute top-8 left-8 md:top-14 md:left-14">
              <span className="text-caption text-terracotta font-medium">
                № {String(story.entry_number).padStart(2, "0")}
              </span>
            </div>
          )}
          <div>
            <p className="text-caption text-neutral-400 mb-4">{story.category?.toUpperCase()}</p>
            <h1 className="font-display text-display-xl font-bold text-neutral-900 mb-6">
              {story.title}
            </h1>
            <div className="w-16 h-[2px] bg-terracotta mb-6" />
            <p className="text-lg md:text-xl font-light text-neutral-500 leading-relaxed max-w-sm">
              {story.subtitle || story.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-8 text-caption text-neutral-300">
              {story.region && <span>{story.region.toUpperCase()}</span>}
              {story.read_time && <><span>·</span><span>{story.read_time}</span></>}
            </div>
          </div>
        </div>
        <div className="md:col-span-7 relative min-h-[50vh] md:min-h-0 bg-neutral-100">
          {story.hero_image && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${story.hero_image})` }}
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-neutral-200">
          <div className="md:col-span-8 p-8 md:p-14">
            <div className="max-w-xl prose-editorial">
              <ReactMarkdown>{story.body}</ReactMarkdown>
            </div>
          </div>
          <div className="md:col-span-4 p-8 md:p-14 md:border-l border-neutral-200">
            {relatedGuides.length > 0 && (
              <div className="mb-10">
                <p className="text-caption text-terracotta font-medium mb-4">PRACTICAL GUIDES</p>
                <div className="space-y-4">
                  {relatedGuides.map((g) => (
                    <Link key={g.slug} href={`/guide/${g.slug}`} className="block group">
                      <p className="text-sm font-medium text-neutral-800 group-hover:text-terracotta transition-colors">
                        {g.title}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">{g.excerpt}</p>
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
        <div className="border-t border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
            <p className="text-caption text-neutral-400 font-medium mb-8">CONTINUE READING</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {relatedStories.slice(0, 3).map((rs, i) => (
                <Link
                  key={rs.slug}
                  href={`/story/${rs.slug}`}
                  className={`group block p-6 md:p-8 hover:bg-neutral-50 transition-colors ${
                    i > 0 ? "md:border-l border-neutral-200" : ""
                  }`}
                >
                  {rs.entry_number && (
                    <span className="text-caption text-terracotta/40">
                      № {String(rs.entry_number).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mt-2 mb-2">
                    {rs.title}
                  </h3>
                  <p className="text-xs text-neutral-400">{rs.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
