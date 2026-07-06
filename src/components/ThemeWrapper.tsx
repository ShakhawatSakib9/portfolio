"use client";

import { useMode } from "@/context/ModeContext";
import MatrixRain from "./MatrixRain";
import GlitchOverlay from "./GlitchOverlay";
import { useState, useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode, isHackerMode, triggerGlitch } = useMode();
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [isGodMode, setIsGodMode] = useState(false);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [isSweeping, setIsSweeping] = useState(false);
  const [prevMode, setPrevMode] = useState(mode);

  useEffect(() => {
    if (mode !== prevMode) {
      setIsSweeping(true);
      setPrevMode(mode);
      const timer = setTimeout(() => {
        setIsSweeping(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mode, prevMode]);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const targetKey = konamiCode[konamiIdx].toLowerCase();

      if (key === targetKey) {
        const nextIdx = konamiIdx + 1;
        if (nextIdx === konamiCode.length) {
          // Play god mode sweep sound
          triggerGodModeChime();
          setIsGodMode(true);
          setKonamiIdx(0);
        } else {
          setKonamiIdx(nextIdx);
        }
      } else {
        // Reset on incorrect key
        setKonamiIdx(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIdx]);

  const triggerGodModeChime = () => {
    if (typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 1.2);

    osc2.frequency.setValueAtTime(300, now);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 1.2);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.linearRampToValueAtTime(0.01, now + 1.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.5);
    osc2.stop(now + 1.5);
  };

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
      {isSweeping && <div className="wipe-overlay animate-wipe" />}
      {isGodMode && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/98 text-emerald-400 font-mono p-6 select-none">
          <div className="w-full max-w-sm border border-emerald-500/30 rounded-2xl bg-emerald-500/5 p-6 text-center space-y-5 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black tracking-widest text-emerald-400">
                ▲ ▲ ▼ ▼ ◀ ▶ ◀ ▶ B A
              </h2>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold block">
                [ GOD MODE UNLOCKED ]
              </span>
            </div>

            <pre className="text-[8px] leading-tight text-emerald-400/80 mx-auto select-none max-w-xs text-left bg-black/60 p-4 rounded-xl border border-emerald-500/10">
{`      _  _
     ( \\/ )
    . \\  / .
   /\\\\  \\\\/  /\\\\
  /  \\\\    /  \\\\
 /    \\\\  /    \\\\
/      \\\\/      \\\\
[  M S H - C O R E  ]`}
            </pre>

            <div className="space-y-1 text-[10px] text-fg-dim text-left pl-4 border-l border-emerald-500/20">
              <p>&gt; bypass_firewalls = true</p>
              <p>&gt; container_privilege = ROOT</p>
              <p>&gt; "The answer to life, universe, and everything is 42."</p>
            </div>

            <button
              onClick={() => {
                setIsGodMode(false);
              }}
              className="px-5 py-2 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-all rounded-lg uppercase tracking-wider font-bold text-[9px]"
            >
              Close Terminal Gate
            </button>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
