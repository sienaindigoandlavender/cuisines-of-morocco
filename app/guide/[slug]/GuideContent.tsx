"use client";

import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import type { Guide } from "@/lib/content";

const GuideMap = dynamic(() => import("@/components/GuideMap"), { ssr: false });

export default function GuideContent({ guide }: { guide: Guide }) {
  return (
    <div className="px-8 md:px-[8%] lg:px-[12%]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Main content */}
        <div className="lg:col-span-7 py-4 md:py-8">
          <div className="max-w-xl prose-editorial">
            <ReactMarkdown>{guide.body}</ReactMarkdown>
          </div>
        </div>

        {/* Sidebar with map */}
        <div className="lg:col-span-5">
          {guide.locations && guide.locations.length > 0 && (
            <div className="sticky top-14">
              <GuideMap locations={guide.locations} />
              <div className="py-8">
                <p className="text-[10px] tracking-[0.25em] text-terracotta font-mono mb-6">LOCATIONS</p>
                <div className="space-y-5">
                  {guide.locations.map((loc, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terracotta text-white text-[10px] font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{loc.name}</p>
                        {loc.description && (
                          <p className="text-xs text-neutral-400 mt-1">{loc.description}</p>
                        )}
                        {loc.price_range && (
                          <p className="text-xs text-terracotta mt-1">{loc.price_range}</p>
                        )}
                        {loc.what_to_order && (
                          <p className="text-xs text-neutral-400 italic mt-1">Order: {loc.what_to_order}</p>
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
