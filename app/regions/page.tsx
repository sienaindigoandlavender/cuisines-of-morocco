import type { Metadata } from "next";
import Link from "next/link";
import RegionsMapClient from "./RegionsMapClient";

export const metadata: Metadata = {
  title: "Food Regions of Morocco",
  description: "Six distinct cuisines across one country — from Fez court kitchens to Saharan survival cooking.",
};

const REGIONS = [
  {
    id: "fez",
    name: "Fez",
    subtitle: "Court Cuisine",
    description: "1,300 years of refinement. Andalusian influence, preserved techniques, and the most sophisticated kitchen in North Africa.",
    dishes: ["Pastilla", "Mechoui", "Mrouzia"],
    story_slug: "fez-kitchen",
    guide_slug: "eating-in-fez",
    lat: 34.0331,
    lng: -5.0003,
    color: "#C2410C",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    subtitle: "Street & Spice",
    description: "The loudest kitchen in Morocco. Jemaa el-Fna smoke, souk spice, and the tanjia buried in hammam ashes.",
    dishes: ["Tanjia", "Kefta", "Tagine"],
    story_slug: "marrakech-kitchen",
    guide_slug: "you-just-arrived-marrakech",
    lat: 31.6295,
    lng: -7.9811,
    color: "#E85D26",
  },
  {
    id: "souss",
    name: "Souss-Massa",
    subtitle: "The Amazigh Table",
    description: "Argan oil, barley bread, amlou, and a food culture that predates Arabic-speaking Morocco by centuries.",
    dishes: ["Amlou", "Tafarnout", "Argan dishes"],
    story_slug: "souss-kitchen",
    guide_slug: null,
    lat: 30.4278,
    lng: -9.5981,
    color: "#9A3412",
  },
  {
    id: "coast",
    name: "Atlantic Coast",
    subtitle: "Fish & Chermoula",
    description: "Portuguese walls, Jewish merchants, and the best grilled sardines in the Mediterranean world.",
    dishes: ["Grilled sardines", "Chermoula fish", "Seafood pastilla"],
    story_slug: "essaouira-kitchen",
    guide_slug: "eating-in-essaouira",
    lat: 31.5085,
    lng: -9.7595,
    color: "#C2410C",
  },
  {
    id: "rif",
    name: "The Rif",
    subtitle: "Where Spain Meets the Mountains",
    description: "Spanish omelettes, fried trout, fresh goat cheese, and a culinary identity distinct from the rest of Morocco.",
    dishes: ["Fried trout", "Goat cheese", "Bisara"],
    story_slug: "rif-kitchen",
    guide_slug: "eating-in-chefchaouen",
    lat: 35.1688,
    lng: -5.2636,
    color: "#E85D26",
  },
  {
    id: "sahara",
    name: "The Sahara",
    subtitle: "Survival Cooking",
    description: "Sand bread, dates, camel milk, and the logic of feeding people where nothing grows.",
    dishes: ["Medfouna", "Sand bread", "Date dishes"],
    story_slug: "saharan-kitchen",
    guide_slug: null,
    lat: 31.0500,
    lng: -4.0000,
    color: "#9A3412",
  },
];

export default function RegionsPage() {
  return (
    <div className="pt-11">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[9px] tracking-[0.25em] text-terracotta font-mono">EXPLORE</span>
          <div className="w-8 h-[1px] bg-neutral-200" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-3">Food by Region</h1>
        <p className="text-sm text-neutral-400 max-w-lg mb-6">
          Morocco is not one cuisine. It's at least six, shaped by geography, trade routes, and who conquered what. Click a region to explore.
        </p>
      </div>

      {/* Map */}
      <RegionsMapClient regions={REGIONS} />

      {/* Region cards */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-neutral-200">
          {REGIONS.map((region) => (
            <div key={region.id} className="bg-white p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-[9px] tracking-[0.25em] text-neutral-300 font-mono">{region.subtitle.toUpperCase()}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-neutral-900 leading-tight mb-3">
                  {region.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">{region.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {region.dishes.map((d) => (
                    <span key={d} className="text-[9px] tracking-[0.1em] text-neutral-400 bg-neutral-50 px-2 py-1">{d}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {region.story_slug && (
                  <Link href={`/story/${region.story_slug}`} className="text-[10px] tracking-[0.15em] text-terracotta hover:text-terracotta-700 transition-colors">
                    READ STORY →
                  </Link>
                )}
                {region.guide_slug && (
                  <Link href={`/guide/${region.guide_slug}`} className="text-[10px] tracking-[0.15em] text-neutral-400 hover:text-neutral-700 transition-colors">
                    GUIDE
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
