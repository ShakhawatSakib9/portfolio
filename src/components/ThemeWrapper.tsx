"use client";

import { useMode } from "@/context/ModeContext";
import MatrixRain from "./MatrixRain";
import GlitchOverlay from "./GlitchOverlay";
import { useState, useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode, isHackerMode, triggerGlitch } = useMode();
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  const handleGlobalClick = () => {
    const now = Date.now();
    setClickTimes((prev) => {
      const recent = [...prev, now].filter((t) => now - t < 3000);
      if (recent.length > 7) {
        triggerGlitch();
        return [];
      }
      return recent;
    });
  };

  return (
    <div
      onClick={handleGlobalClick}
      className={`min-h-screen transition-colors duration-500 ${
        isHackerMode
          ? "theme-hacker text-[#00ff70] bg-black font-mono select-text"
          : mode === "recruiter"
          ? "theme-recruiter bg-[#f8fafc] text-[#1e293b] select-text"
          : "theme-engineer bg-bg text-fg select-text"
      }`}
    >
      <MatrixRain />
      <GlitchOverlay />
      {children}
    </div>
  );
}
