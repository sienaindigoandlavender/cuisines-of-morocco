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
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[9px] tracking-[0.25em] text-terracotta font-mono">INTERACTIVE</span>
          <div className="w-8 h-[1px] bg-neutral-200" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-3">City Map</h1>
        <p className="text-sm text-neutral-400 max-w-lg mb-10">
          Every restaurant, stall, and food spot we recommend — on one map. Click a pin for details, prices, and what to order.
        </p>
      </div>

      <CityMapClient locations={allLocations} />

      {/* Location list below map */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <p className="text-caption text-neutral-400 font-medium mb-6">ALL LOCATIONS</p>
        <div className="border-t border-neutral-200">
          {allLocations.map((loc, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 py-4 border-b border-neutral-100 px-2">
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
