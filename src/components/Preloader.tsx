"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const LOGS = [
  "Initializing MSH Core Kernel v2.1...",
  "Connecting MySQL database pools...",
  "Running migrations:",
  "  Migrating: 2026_07_05_000001_create_skills_table .......... [DONE]",
  "  Migrating: 2026_07_05_000002_create_case_studies_table .... [DONE]",
  "  Migrating: 2026_07_05_000003_create_incident_logs_table ... [DONE]",
  "Seeding: PortfolioDatabaseSeeder .......................... [100%]",
  "Caching database indices via Redis key-value store ........ [DONE]",
  "Booting Vercel serverless telemetry endpoints ............. [READY]",
  "Spinning up Laravel Reverb WebSocket broadcaster .......... [ONLINE]",
  "SYSTEM ONLINE. Handshake established.",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Tick progress from 0 to 100
    const progressDuration = 2200; // 2.2 seconds
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
    }, progressDuration + 600);

    // Lock body scroll during preloading
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Calculate ASCII progress bar
  const getAsciiBar = () => {
    const barsCount = Math.floor(progress / 10);
    const hashes = "█".repeat(barsCount);
    const dots = "░".repeat(10 - barsCount);
    
    let label = "Loading Kernel...";
    if (progress >= 30 && progress < 50) label = "Mounting /dev/portfolio...";
    if (progress >= 50 && progress < 70) label = "Establishing Database pools...";
    if (progress >= 70 && progress < 90) label = "Optimizing Query Cache...";
    if (progress >= 90 && progress < 100) label = "Broadcasting Reverb WebSockets...";
    if (progress === 100) label = "✅ System Ready! Welcome, Commander.";

    return { bar: `[${hashes}${dots}]`, label };
  };

  const ascii = getAsciiBar();

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
          <div key={idx} className="flex gap-3 animate-fade-in">
            <span className="text-neon-violet">[{idx + 1}]</span>
            <span className="text-fg-muted font-light">&gt; {log}</span>
            {idx < LOGS.length - 1 && <span className="text-green-500 font-bold">✓</span>}
          </div>
        ))}
      </div>

      {/* Bottom Progress Panel with ASCII loading bar */}
      <div className="border-t border-neon-cyan/20 pt-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-neon-cyan tracking-wider">
            <span className="text-neon-violet font-bold">{progress}%</span>
            <span>{ascii.bar}</span>
            <span className="text-fg font-semibold animate-pulse">{ascii.label}</span>
          </div>
          <span className="text-neon-violet tracking-widest text-[9px] uppercase animate-pulse">
            [ SECURE SYSTEM INITIALIZATION ]
          </span>
        </div>
      </div>
    </div>
  );
}
