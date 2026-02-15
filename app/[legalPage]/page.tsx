import { getNexusLegalPages, getNexusSiteConfig } from "@/lib/nexus";
import { notFound } from "next/navigation";

const LEGAL_SLUGS: Record<string, string> = {
  privacy: "privacy",
  terms: "terms",
  disclaimer: "disclaimer",
  "intellectual-property": "intellectual-property",
};

interface Props {
  params: { legalPage: string };
}

export default async function LegalPage({ params }: Props) {
  const slug = LEGAL_SLUGS[params.legalPage];
  if (!slug) notFound();

  const pages = await getNexusLegalPages();
  const siteConfig = await getNexusSiteConfig();

  let page = pages.find((p: any) => p.slug === slug);
  if (!page) {
    // Fallback
    return (
      <div className="pt-11">
        <div className="max-w-3xl mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <h1 className="font-display text-display-md font-bold text-neutral-900 mb-8 capitalize">
            {params.legalPage.replace(/-/g, " ")}
          </h1>
          <p className="text-body text-neutral-500">Content loading from Nexus. Please check back.</p>
        </div>
      </div>
    );
  }

  // Resolve {{variables}} from site config
  let content = page.content || "";
  if (siteConfig) {
    Object.entries(siteConfig).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
    });
  }

  return (
    <div className="pt-11">
      <div className="max-w-3xl mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <h1 className="font-display text-display-md font-bold text-neutral-900 mb-8">
          {page.title}
        </h1>
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
