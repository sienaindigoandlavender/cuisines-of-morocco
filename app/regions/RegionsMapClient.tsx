"use client";

import { useEffect, useRef } from "react";

interface Region {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
  color: string;
  description: string;
}

export default function RegionsMapClient({ regions }: { regions: Region[] }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (typeof window === "undefined") return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    import("mapbox-gl").then((mapboxgl) => {
      (mapboxgl as any).accessToken = token;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-6.5, 32.5],
        zoom: 5.2,
        attributionControl: false,
        maxBounds: [[-15, 27], [0, 37]],
      });

      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");

      regions.forEach((region) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 14px; height: 14px; border-radius: 50%;
          background: ${region.color};
          box-shadow: 0 0 0 4px ${region.color}33, 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s;
        `;
        el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.4)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

        const popup = new mapboxgl.default.Popup({ offset: 16, maxWidth: "260px" }).setHTML(`
          <div style="font-family: 'DM Sans', sans-serif;">
            <p style="font-size: 9px; letter-spacing: 0.15em; color: #a3a3a3; margin: 0 0 4px;">${region.subtitle.toUpperCase()}</p>
            <p style="font-size: 16px; font-weight: 700; margin: 0 0 6px; font-family: 'Playfair Display', serif;">${region.name}</p>
            <p style="font-size: 11px; color: #737373; margin: 0; line-height: 1.5;">${region.description}</p>
          </div>
        `);

        new mapboxgl.default.Marker(el)
          .setLngLat([region.lng, region.lat])
          .setPopup(popup)
          .addTo(map);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [regions]);

  return (
    <div className="w-full border-t border-b border-neutral-200" style={{ height: "55vh" }}>
      <div ref={mapContainer} className="w-full h-full" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
    </div>
  );
}
