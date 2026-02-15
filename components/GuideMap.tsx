"use client";

import { useEffect, useRef } from "react";

interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  price_range?: string;
  what_to_order?: string;
}

interface GuideMapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
}

export default function GuideMap({ locations, center, zoom = 14 }: GuideMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (typeof window === "undefined") return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    import("mapbox-gl").then((mapboxgl) => {
      (mapboxgl as any).accessToken = token;

      const defaultCenter = center || [
        locations.reduce((sum, l) => sum + l.lng, 0) / locations.length,
        locations.reduce((sum, l) => sum + l.lat, 0) / locations.length,
      ];

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: defaultCenter as [number, number],
        zoom,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");

      locations.forEach((loc, i) => {
        // Custom marker
        const el = document.createElement("div");
        el.className = "guide-marker";
        el.style.cssText = `
          width: 28px; height: 28px; border-radius: 50%;
          background: #C2410C; color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
        `;
        el.textContent = String(i + 1);

        // Popup
        const popupHtml = `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 220px;">
            <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px;">${loc.name}</p>
            ${loc.description ? `<p style="font-size: 12px; color: #737373; margin: 0 0 4px;">${loc.description}</p>` : ""}
            ${loc.price_range ? `<p style="font-size: 11px; color: #C2410C; margin: 0 0 2px;">${loc.price_range}</p>` : ""}
            ${loc.what_to_order ? `<p style="font-size: 11px; color: #737373; margin: 0;"><em>Order: ${loc.what_to_order}</em></p>` : ""}
          </div>
        `;

        new mapboxgl.default.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .setPopup(new mapboxgl.default.Popup({ offset: 20 }).setHTML(popupHtml))
          .addTo(map);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [locations, center, zoom]);

  return (
    <div className="relative w-full" style={{ height: "400px" }}>
      <div ref={mapContainer} className="absolute inset-0" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
    </div>
  );
}
