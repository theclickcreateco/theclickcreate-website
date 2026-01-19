"use client";

import React from "react";

export function AdPlaceholder({ slotId, className = "" }) {
  return (
    <div className={`w-full flex items-center justify-center bg-secondary/20 rounded-lg border border-border ${className}`}>
      <div id={`monetag-${slotId}`} className="w-full min-h-[250px] flex items-center justify-center">
        {/* Monetag ads will be injected here */}
        <div className="text-xs text-muted-foreground">Advertisement</div>
      </div>
    </div>
  );
}
