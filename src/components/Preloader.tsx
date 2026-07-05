"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const LOGS = [
  "Initializing MSH Core Kernel v2.1...",
  "Establishing MySQL connection pools...",
  "Caching audit histories via Redis...",
  "Bootstrapping React 19 Server Components...",
  "Configuring Tailwind v4 theme engines...",
  "Initiating Three.js 3D gyroscope scene...",
  "Loading GSAP ScrollTrigger animations...",
  "Reconciliation systems online...",
  "SYSTEM ONLINE. Launching workspace...",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Tick progress from 0 to 100
    const progressDuration = 1800; // 1.8 seconds
    const intervalTime = 30;
    const steps = progressDuration / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    // 2. Add log lines progressively
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < LOGS.length) {
        setCurrentLogs((prev) => [...prev, LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 180);

    // 3. Final slide out animation
    const timeout = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(".preloader-panel", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, progressDuration + 400);

    // Lock body scroll during preloading
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div className="preloader-panel fixed inset-0 z-[99999] flex flex-col justify-between bg-[#050508] p-8 font-mono text-[11px] text-neon-cyan sm:text-xs">
      {/* Top Bar info */}
      <div className="flex justify-between border-b border-neon-cyan/20 pb-4 text-fg-dim">
        <span>HOST: SHAKHAWAT.DEV</span>
        <span>PORT: 3000</span>
        <span>STATUS: BOOTING_</span>
      </div>

      {/* Code Stream Logs */}
      <div className="flex-1 my-8 space-y-2 overflow-y-auto max-w-3xl leading-relaxed">
        {currentLogs.map((log, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="text-neon-violet">[{idx + 1}]</span>
            <span className="text-fg-muted font-light">&gt; {log}</span>
            {idx < LOGS.length - 1 && <span className="text-green-500 font-bold">✓</span>}
          </div>
        ))}
        {progress < 100 && (
          <div className="animate-pulse text-neon-cyan">
            &gt; Syncing environment assets... <span className="inline-block h-3.5 w-1.5 bg-neon-cyan animate-pulse" />
          </div>
        )}
      </div>

      {/* Bottom Progress Panel */}
      <div className="border-t border-neon-cyan/20 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="w-full sm:max-w-md bg-border rounded-full h-1 overflow-hidden">
          <div
            className="bg-neon-cyan h-full transition-all duration-75 shadow-[0_0_10px_var(--neon-cyan)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-6 shrink-0 justify-between">
          <span className="font-bold text-lg">{progress}%</span>
          <span className="text-neon-violet tracking-widest text-[9px] uppercase animate-pulse">
            [ LOADING ENGINE ]
          </span>
        </div>
      </div>
    </div>
  );
}
