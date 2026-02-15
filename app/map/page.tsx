import type { Metadata } from "next";
import { getAllGuides } from "@/lib/content";
import CityMapClient from "./CityMapClient";

export const metadata: Metadata = {
  title: "City Map — Every Place We Recommend",
  description: "Every restaurant, stall, and food spot we recommend in Morocco, on one interactive map.",
};

export const revalidate = 60;

export default async function MapPage() {
  const guides = await getAllGuides();

  // Extract all locations from all guides, tagged with their source guide
  const allLocations = guides.flatMap((guide) =>
    (guide.locations || []).map((loc) => ({
      ...loc,
      guide_title: guide.title,
      guide_slug: guide.slug,
      guide_city: guide.city || "Morocco",
    }))
  );

  return (
    <div className="pt-11">
      <div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[9px] tracking-[0.3em] text-terracotta font-mono mb-6">INTERACTIVE</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-[0.95]">City Map</h1>
          <p className="text-sm text-neutral-400 leading-[1.8] max-w-lg mb-10">
            Every restaurant, stall, and food spot we recommend — on one map. Click a pin for details, prices, and what to order.
          </p>
        </div>
      </div>

      <CityMapClient locations={allLocations} />

      {/* Location list below map */}
      <div className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] tracking-[0.25em] text-neutral-300 font-mono mb-8">ALL LOCATIONS</p>
        <div>
          {allLocations.map((loc, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 py-5 border-b border-neutral-100 px-2 md:px-4">
              <div className="col-span-1">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terracotta text-white text-[10px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="col-span-4 md:col-span-3">
                <p className="text-sm font-medium text-neutral-800">{loc.name}</p>
              </div>
              <div className="hidden md:block md:col-span-4">
                <p className="text-xs text-neutral-400">{loc.description}</p>
              </div>
              <div className="col-span-3 md:col-span-2">
                {loc.price_range && <p className="text-xs text-terracotta">{loc.price_range}</p>}
                {loc.what_to_order && <p className="text-xs text-neutral-400 italic mt-0.5">{loc.what_to_order}</p>}
              </div>
              <div className="col-span-4 md:col-span-2 text-right">
                <a href={`/guide/${loc.guide_slug}`} className="text-[9px] tracking-[0.12em] text-neutral-300 hover:text-terracotta transition-colors">
                  {loc.guide_city?.toUpperCase()}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
