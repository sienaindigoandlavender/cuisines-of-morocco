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

      <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <div className="max-w-2xl mb-20">
          <p className="text-[10px] tracking-[0.25em] text-terracotta font-mono mb-6">REFERENCE</p>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-neutral-900 mb-6">Glossary</h1>
          <p className="text-lg text-neutral-600 max-w-lg leading-relaxed">
            Moroccan culinary terms — the vocabulary you need to eat with understanding.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-16 last:mb-0">
            <p className="text-[10px] tracking-[0.3em] text-neutral-300 font-mono mb-8">{cat.toUpperCase()}</p>
            <div className="space-y-0">
              {terms.filter((g) => g.category === cat).map((g) => (
                <div key={g.term} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-12 py-6 border-b border-neutral-100">
                  <div className="md:col-span-3">
                    <p className="font-display text-xl font-bold text-neutral-900">{g.term}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {g.arabic_script && <span className="font-mono">{g.arabic_script}</span>}
                      {g.arabic_script && g.pronunciation && " · "}
                      {g.pronunciation && <span className="italic">{g.pronunciation}</span>}
                    </p>
                  </div>
                  <div className="md:col-span-8 md:col-start-5">
                    <p className="text-body text-neutral-700 leading-relaxed">{g.definition}</p>
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
