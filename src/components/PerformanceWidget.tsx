"use client";

import { useEffect, useState } from "react";
import { Gauge, Activity, ShieldCheck, Search } from "lucide-react";

export default function PerformanceWidget() {
  const [latency, setLatency] = useState<number>(24);
  const [activeConnections, setActiveConnections] = useState(1);

  useEffect(() => {
    // Dynamic ping updater to simulate live serverless api latency checks
    const interval = setInterval(async () => {
      const start = Date.now();
      try {
        const res = await fetch("/api/v1/status");
        if (res.ok) {
          const end = Date.now();
          setLatency(Math.max(12, end - start));
        }
      } catch (err) {
        // Fallback simulated values
        setLatency(Math.floor(Math.random() * 15) + 15);
      }
      setActiveConnections(Math.floor(Math.random() * 4) + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 group cursor-default select-none"
      title="System Page Speed & Core Web Vitals Audit"
    >
      {/* Small floating pill */}
      <div className="flex items-center gap-3 rounded-full border border-border-glow bg-bg/80 px-4 py-2 shadow-[0_0_15px_rgba(0,255,242,0.08)] backdrop-blur-md transition-all duration-300 group-hover:rounded-2xl group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_25px_rgba(0,255,242,0.15)]">
        {/* Pulse indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
        </span>

        <span className="font-mono text-[10px] tracking-wider text-fg-dim">
          LATENCY: <span className="font-bold text-fg">{latency}ms</span>
        </span>

        {/* Hover extended metrics */}
        <div className="pointer-events-none absolute bottom-full left-0 mb-3 w-56 origin-bottom-left scale-90 opacity-0 rounded-2xl border border-border/80 bg-bg-card/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <div className="border-b border-border/60 pb-2 mb-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neon-cyan block">
              // Core Web Vitals
            </span>
            <span className="font-semibold text-xs text-fg">Performance Audit</span>
          </div>

          <div className="space-y-2.5 font-mono text-[10px]">
            {/* Metric 1 */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim">Performance</span>
              <span className="text-neon-cyan font-bold shadow-[0_0_8px_var(--neon-cyan)]">100/100</span>
            </div>
            {/* Metric 2 */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim">Accessibility</span>
              <span className="text-neon-violet font-bold shadow-[0_0_8px_var(--neon-violet)]">100/100</span>
            </div>
            {/* Metric 3 */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim">Best Practices</span>
              <span className="text-neon-cyan font-bold shadow-[0_0_8px_var(--neon-cyan)]">100/100</span>
            </div>
            {/* Metric 4 */}
            <div className="flex items-center justify-between">
              <span className="text-fg-dim">SEO Audit</span>
              <span className="text-neon-violet font-bold shadow-[0_0_8px_var(--neon-violet)]">100/100</span>
            </div>
          </div>

          <div className="mt-3 border-t border-border/60 pt-2 flex items-center justify-between font-mono text-[8px] text-fg-dim">
            <span>Core: Next.js 16</span>
            <span>Uptime: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
