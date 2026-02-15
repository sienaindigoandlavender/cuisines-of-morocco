import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuideSlugs, getRelatedGuides } from "@/lib/content";
import Link from "next/link";
import type { Metadata } from "next";
import GuideContent from "./GuideContent";

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      images: guide.hero_image ? [{ url: guide.hero_image }] : [],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) notFound();

  const relatedGuides = await getRelatedGuides(guide.related_guides || []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    dateModified: guide.last_updated,
    author: { "@type": "Organization", name: "Cuisines of Morocco" },
    publisher: { "@type": "Organization", name: "Cuisines of Morocco", url: "https://cuisinesofmorocco.com" },
  };

  return (
    <div className="pt-11">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24">
          <div className="max-w-2xl mx-auto md:mx-0 md:ml-[8%]">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/#guides" className="text-caption text-terracotta font-medium hover:underline">
                GUIDES
              </Link>
              <span className="text-neutral-300">→</span>
              <span className="text-caption text-neutral-400">{guide.section?.replace(/-/g, " ").toUpperCase()}</span>
            </div>
            <h1 className="font-display text-display-lg md:text-display-xl font-bold text-neutral-900 mb-4">
              {guide.title}
            </h1>
            <p className="text-lg text-neutral-500 font-light leading-relaxed mb-6">
              {guide.subtitle || guide.excerpt}
            </p>
            <div className="flex items-center gap-4 text-caption text-neutral-300">
              {guide.city && <span>{guide.city.toUpperCase()}</span>}
              {guide.budget_range && <><span>·</span><span>{guide.budget_range}</span></>}
              {guide.read_time && <><span>·</span><span>{guide.read_time}</span></>}
              {guide.last_updated && <><span>·</span><span>Updated {guide.last_updated}</span></>}
            </div>
          </div>
        </div>
      </div>

      {/* Body + Map */}
      <GuideContent guide={guide} />

      {/* Related */}
      {relatedGuides.length > 0 && (
        <div className="border-t border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-16">
            <p className="text-caption text-neutral-400 font-medium mb-8">RELATED GUIDES</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {relatedGuides.slice(0, 3).map((rg, i) => (
                <Link
                  key={rg.slug}
                  href={`/guide/${rg.slug}`}
                  className={`group block p-6 hover:bg-neutral-50 transition-colors ${
                    i > 0 ? "md:border-l border-neutral-200" : ""
                  }`}
                >
                  <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-2">
                    {rg.title}
                  </h3>
                  <p className="text-xs text-neutral-400">{rg.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
