"use client";

import { useState, useEffect } from "react";
import { Settings, Volume2, VolumeX, Eye, EyeOff, Zap, ShieldAlert, Sparkles, Navigation } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { toggleSound, isSoundEnabled, playClick } from "@/utils/audio";

export default function InterfacePreferences() {
  const { isFocusMode, setIsFocusMode } = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    setIsAudioOn(isSoundEnabled());
    // Read initial reduced motion preferences
    if (typeof window !== "undefined") {
      const storedMotion = localStorage.getItem("reduce-motion") === "true";
      setIsReducedMotion(storedMotion);
      if (storedMotion) {
        document.documentElement.classList.add("reduce-motion");
      }
    }
  }, []);

  const handleToggleAudio = () => {
    playClick();
    const nextState = !isAudioOn;
    setIsAudioOn(nextState);
    toggleSound(nextState);
  };

  const handleToggleMotion = () => {
    playClick();
    const nextState = !isReducedMotion;
    setIsReducedMotion(nextState);
    if (nextState) {
      document.documentElement.classList.add("reduce-motion");
      localStorage.setItem("reduce-motion", "true");
    } else {
      document.documentElement.classList.remove("reduce-motion");
      localStorage.setItem("reduce-motion", "false");
    }
  };

  const handleToggleContrast = () => {
    playClick();
    const nextState = !highContrast;
    setHighContrast(nextState);
    if (nextState) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const handleToggleFocus = () => {
    playClick();
    setIsFocusMode(!isFocusMode);
  };

  return (
    <div className="hidden sm:block fixed bottom-6 right-6 z-[999]">
      {/* Settings toggle pill */}
      <button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 rounded-full border border-border-glow bg-bg/80 px-4 py-2 shadow-[0_0_15px_rgba(139,92,246,0.08)] backdrop-blur-md hover:border-neon-violet/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all font-mono text-[10px] tracking-wider text-fg-dim"
      >
        <Settings className={`h-3.5 w-3.5 text-neon-violet ${isOpen ? "animate-spin" : ""}`} />
        <span>PREFERENCES</span>
      </button>

      {/* Floating Preference Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-64 rounded-2xl border border-border bg-bg-card/95 p-5 shadow-2xl backdrop-blur-xl animate-fade-in font-mono text-xs space-y-4">
          <div className="border-b border-border/60 pb-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-neon-violet block font-bold">
              // Preferences
            </span>
            <span className="text-[8px] text-fg-dim">[ ACCESSIBILITY ]</span>
          </div>

          <div className="space-y-3">
            {/* 1. Telemetry Density (Focus / Full) */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-neon-cyan" />
                Mode:
              </span>
              <button
                onClick={handleToggleFocus}
                className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
                  isFocusMode
                    ? "border-yellow-500/50 bg-yellow-500/5 text-yellow-400"
                    : "border-neon-cyan/50 bg-neon-cyan/5 text-neon-cyan"
                }`}
              >
                {isFocusMode ? "FOCUS MODE" : "FULL TELEMETRY"}
              </button>
            </div>

            {/* 2. Audio Engine (Spatial / Mute) */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim flex items-center gap-1.5">
                {isAudioOn ? (
                  <Volume2 className="h-3.5 w-3.5 text-neon-cyan animate-pulse" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 text-red-400" />
                )}
                Audio:
              </span>
              <button
                onClick={handleToggleAudio}
                className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
                  isAudioOn
                    ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-400"
                    : "border-red-500/50 bg-red-500/5 text-red-400"
                }`}
              >
                {isAudioOn ? "SPATIAL" : "MUTED"}
              </button>
            </div>

            {/* 3. Motion Density (Normal / Reduced) */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-neon-cyan" />
                Motion:
              </span>
              <button
                onClick={handleToggleMotion}
                className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
                  isReducedMotion
                    ? "border-yellow-500/50 bg-yellow-500/5 text-yellow-400"
                    : "border-emerald-500/50 bg-emerald-500/5 text-emerald-400"
                }`}
              >
                {isReducedMotion ? "REDUCED" : "NORMAL"}
              </button>
            </div>

            {/* 4. High Contrast */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-neon-cyan" />
                Contrast:
              </span>
              <button
                onClick={handleToggleContrast}
                className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
                  highContrast
                    ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-400"
                    : "border-border text-fg-dim"
                }`}
              >
                {highContrast ? "HIGH" : "STANDARD"}
              </button>
            </div>
          </div>

          <div className="border-t border-border/60 pt-3 flex flex-col gap-2">
            {/* Keyboard HUD Guide */}
            <div className="text-[8px] text-fg-dim leading-relaxed">
              HOTKEYS:
              <br />
              • <span className="text-neon-cyan">Ctrl+Shift+D</span>: Dev Mode
              <br />
              • <span className="text-neon-cyan">Ctrl+Shift+H</span>: HR Mode
              <br />
              • <span className="text-neon-cyan">Ctrl+K</span>: Command CLI
            </div>

            {/* Skip to Content */}
            <button
              onClick={() => {
                playClick();
                setIsOpen(false);
                const el = document.getElementById("work");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-1 py-1 bg-neon-cyan/5 hover:bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded text-[9px] font-bold transition-all uppercase tracking-wider"
            >
              <Navigation className="h-2.5 w-2.5" />
              Skip to Work Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
