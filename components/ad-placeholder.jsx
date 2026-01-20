"use client";

import React from "react";

export function AdPlaceholder({ slotId, className = "", adType = "monetag" }) {
  return (
    <div className={`w-full flex items-center justify-center bg-secondary/5 rounded-lg border border-border/50 ${className}`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/30 py-2">
        Space Reserved
      </div>
    </div>
  );
}
