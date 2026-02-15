import type { Metadata } from "next";
import { getAllGlossaryTerms } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Moroccan Food Glossary",
  description: "Comprehensive glossary of Moroccan culinary terms — spices, breads, dishes, techniques, vessels, and regional vocabulary.",
};

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms();
  const categories = Array.from(new Set(terms.map((g) => g.category)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Moroccan Culinary Glossary",
    description: "Comprehensive glossary of Moroccan food terminology",
    url: "https://cuisinesofmorocco.com/glossary",
    hasDefinedTerm: terms.map((g) => ({
      "@type": "DefinedTerm",
      name: g.term,
      description: g.definition,
      inDefinedTermSet: "https://cuisinesofmorocco.com/glossary",
    })),
  };

  return (
    <div className="pt-11">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-28">
        <p className="text-caption text-terracotta font-medium mb-4">REFERENCE</p>
        <h1 className="font-display text-display-lg font-bold text-neutral-900 mb-4">Glossary</h1>
        <p className="text-lg text-neutral-500 font-light max-w-lg mb-12">
          Moroccan culinary terms — the vocabulary you need to eat with understanding.
        </p>

        {categories.map((cat) => (
          <div key={cat} className="mb-12">
            <p className="text-label text-neutral-400 mb-6">{cat.toUpperCase()}</p>
            <div className="space-y-0">
              {terms.filter((g) => g.category === cat).map((g) => (
                <div key={g.term} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 border-b border-neutral-100">
                  <div className="md:col-span-3">
                    <p className="font-display text-xl font-bold text-neutral-900">{g.term}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {g.arabic_script && <span className="font-mono">{g.arabic_script}</span>}
                      {g.arabic_script && g.pronunciation && " · "}
                      {g.pronunciation && <span className="italic">{g.pronunciation}</span>}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-body text-neutral-600">{g.definition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
