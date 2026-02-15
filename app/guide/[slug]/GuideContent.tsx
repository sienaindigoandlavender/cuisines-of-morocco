"use client";

import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import type { Guide } from "@/lib/content";

const GuideMap = dynamic(() => import("@/components/GuideMap"), { ssr: false });

export default function GuideContent({ guide }: { guide: Guide }) {
  return (
    <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main content */}
        <div className="lg:col-span-7 py-12 md:py-16 pr-0 lg:pr-16">
          <div className="max-w-xl mx-auto lg:mx-0 prose-editorial">
            <ReactMarkdown>{guide.body}</ReactMarkdown>
          </div>
        </div>

        {/* Sidebar with map */}
        <div className="lg:col-span-5 lg:border-l border-neutral-200">
          {guide.locations && guide.locations.length > 0 && (
            <div className="sticky top-14">
              <GuideMap locations={guide.locations} />
              <div className="p-8">
                <p className="text-caption text-terracotta font-medium mb-4">LOCATIONS</p>
                <div className="space-y-4">
                  {guide.locations.map((loc, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terracotta text-white text-[10px] font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{loc.name}</p>
                        {loc.description && (
                          <p className="text-xs text-neutral-400 mt-0.5">{loc.description}</p>
                        )}
                        {loc.price_range && (
                          <p className="text-xs text-terracotta mt-0.5">{loc.price_range}</p>
                        )}
                        {loc.what_to_order && (
                          <p className="text-xs text-neutral-400 italic mt-0.5">Order: {loc.what_to_order}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
