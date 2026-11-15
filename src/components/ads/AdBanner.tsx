"use client";

import React, { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slotId: string;
  format?: "horizontal" | "rectangle" | "leaderboard" | "inline";
  className?: string;
  adClient?: string;
  adSlot?: string;
}

export function AdBanner({
  slotId,
  format = "horizontal",
  className = "",
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot,
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // If a real Google AdSense client ID is provided in production
    if (adClient && adSlot && typeof window !== "undefined") {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.warn("AdSense script load error:", err);
      }
    }
  }, [adClient, adSlot]);

  // Dimensions & aspect ratios depending on format
  const formatStyles = {
    leaderboard: "min-h-[90px] max-w-[728px] w-full",
    horizontal: "min-h-[100px] w-full max-w-4xl",
    rectangle: "min-h-[250px] max-w-[300px] w-full",
    inline: "min-h-[90px] w-full",
  };

  return (
    <div
      ref={adRef}
      className={`no-print my-6 mx-auto flex flex-col items-center justify-center ${formatStyles[format]} ${className}`}
      data-ad-slot-id={slotId}
      aria-label="Advertisement"
    >
      {/* Google AdSense or Real Ad Network Integration */}
      {adClient && adSlot ? (
        <div className="w-full text-center">
          <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Advertisement
          </span>
          <ins
            className="adsbygoogle block"
            style={{ display: "block" }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* Professional Placeholder when AdSense ID is pending or in development */
        <div className="w-full rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4 transition hover:border-slate-300">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/70">
              Advertisement Space
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {format === "leaderboard"
                ? "728 × 90 Responsive"
                : format === "rectangle"
                ? "300 × 250 Medium"
                : "Responsive Fluid Banner"}
            </span>
          </div>

          <div className="py-2.5 px-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Grow Your Business & Invoice Faster
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Targeted commercial ad placement space for software, banking, or business tools.
              </p>
            </div>
            <a
              href="mailto:nestmategroup@gmail.com?subject=Advertise%20on%20QuoteCraft%20-%20Slot%20"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition"
            >
              <span>Promote Here</span>
              <span className="text-slate-500">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
