"use client";

import React from "react";

export function AdPlaceholder({ slotId, className = "", adType = "monetag" }) {
  return (
    <div className={`w-full flex items-center justify-center bg-secondary/20 rounded-lg border border-border ${className}`}>
      {adType === "adsense" ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div id={`monetag-${slotId}`} className="w-full min-h-[250px] flex items-center justify-center">
          {/* Monetag ads will be injected here */}
          <div className="text-xs text-muted-foreground">Advertisement ({slotId})</div>
        </div>
      )}
    </div>
  );
}
