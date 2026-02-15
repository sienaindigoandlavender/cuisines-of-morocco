import { NextResponse } from "next/server";
import { getAllGlossaryTerms } from "@/lib/content";

export async function GET() {
  const terms = await getAllGlossaryTerms();

  return NextResponse.json({
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Moroccan Culinary Glossary",
    url: "https://cuisinesofmorocco.com/glossary",
    terms: terms.map((t) => ({
      term: t.term,
      arabic: t.arabic_script,
      pronunciation: t.pronunciation,
      category: t.category,
      definition: t.definition,
    })),
  });
}
