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

      {/* Hero — generous whitespace, content floats */}
      <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/#guides" className="text-[10px] tracking-[0.25em] text-terracotta font-medium hover:underline underline-offset-4">
              GUIDES
            </Link>
            <span className="text-neutral-200">→</span>
            <span className="text-[10px] tracking-[0.25em] text-neutral-300">{guide.section?.replace(/-/g, " ").toUpperCase()}</span>
          </div>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-neutral-900 mb-6">
            {guide.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed mb-10 max-w-lg">
            {guide.subtitle || guide.excerpt}
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] text-neutral-300">
            {guide.city && <span>{guide.city.toUpperCase()}</span>}
            {guide.budget_range && <><span className="text-neutral-200">·</span><span>{guide.budget_range}</span></>}
            {guide.read_time && <><span className="text-neutral-200">·</span><span>{guide.read_time}</span></>}
            {guide.last_updated && <><span className="text-neutral-200">·</span><span>Updated {guide.last_updated}</span></>}
          </div>
        </div>
      </div>

      {/* Body + Map */}
      <GuideContent guide={guide} />

      {/* Related */}
      {relatedGuides.length > 0 && (
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] tracking-[0.25em] text-neutral-300 font-mono mb-10">RELATED GUIDES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {relatedGuides.slice(0, 3).map((rg) => (
              <Link
                key={rg.slug}
                href={`/guide/${rg.slug}`}
                className="group"
              >
                <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-terracotta transition-colors mb-3">
                  {rg.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{rg.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
