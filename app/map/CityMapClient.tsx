"use client";

import { useEffect, useRef } from "react";

interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  price_range?: string;
  what_to_order?: string;
  guide_title: string;
  guide_slug: string;
  guide_city: string;
}

export default function CityMapClient({ locations }: { locations: Location[] }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (typeof window === "undefined") return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || locations.length === 0) return;

    import("mapbox-gl").then((mapboxgl) => {
      (mapboxgl as any).accessToken = token;

      const centerLng = locations.reduce((s, l) => s + l.lng, 0) / locations.length;
      const centerLat = locations.reduce((s, l) => s + l.lat, 0) / locations.length;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [centerLng, centerLat],
        zoom: 13,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");

      locations.forEach((loc, i) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 30px; height: 30px; border-radius: 50%;
          background: #C2410C; color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
        `;
        el.textContent = String(i + 1);

        const popup = new mapboxgl.default.Popup({ offset: 20, maxWidth: "280px" }).setHTML(`
          <div style="font-family: 'DM Sans', sans-serif;">
            <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px;">${loc.name}</p>
            ${loc.description ? `<p style="font-size: 12px; color: #737373; margin: 0 0 6px;">${loc.description}</p>` : ""}
            ${loc.price_range ? `<p style="font-size: 11px; color: #C2410C; margin: 0 0 2px;">${loc.price_range}</p>` : ""}
            ${loc.what_to_order ? `<p style="font-size: 11px; color: #737373; margin: 0 0 6px;"><em>Order: ${loc.what_to_order}</em></p>` : ""}
            <a href="/guide/${loc.guide_slug}" style="font-size: 10px; color: #C2410C; text-decoration: none; letter-spacing: 0.1em;">FROM: ${loc.guide_title.toUpperCase()}</a>
          </div>
        `);

        new mapboxgl.default.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .setPopup(popup)
          .addTo(map);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [locations]);

  return (
    <div className="w-full border-t border-b border-neutral-200" style={{ height: "65vh" }}>
      <div ref={mapContainer} className="w-full h-full" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
    </div>
  );
}
