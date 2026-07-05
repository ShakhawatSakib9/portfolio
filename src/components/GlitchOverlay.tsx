"use client";

import { useEffect, useState } from "react";
import { useMode } from "@/context/ModeContext";
import { AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { playChime, playClick } from "@/utils/audio";

export default function GlitchOverlay() {
  const { isGlitchActive } = useMode();
  const [step, setStep] = useState(1); // 1: Red Glitch Alert, 2: K8s Auto-scaling trace, 3: Success

  useEffect(() => {
    if (isGlitchActive) {
      setStep(1);
      playClick();

      // After 1.2 seconds, start K8s pod scaling
      const t1 = setTimeout(() => {
        setStep(2);
        playClick();
      }, 1200);

      // After 2.8 seconds, show nominal recovery message
      const t2 = setTimeout(() => {
        setStep(3);
        playChime();
      }, 2800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isGlitchActive]);

  if (!isGlitchActive) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 font-mono p-6 select-none animate-pulse">
      <div className="w-full max-w-lg border border-red-500/30 rounded-2xl bg-red-500/5 p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] backdrop-blur-md">
        {step === 1 && (
          <div className="space-y-4 text-center animate-bounce">
            <AlertTriangle className="h-14 w-14 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-black text-red-500 tracking-tighter uppercase">
              HTTP 429: Too Many Requests
            </h2>
            <div className="text-xs text-red-400 space-y-1 text-left bg-red-950/20 p-4 rounded-xl border border-red-500/10">
              <p>&gt; Spike detected: rate limit exceeded on telemetry endpoints.</p>
              <p>&gt; IP address throttled. Connection queue full.</p>
              <p>&gt; Triggering automatic fallback handler...</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-neon-cyan" />
              <span className="text-xs text-neon-cyan font-bold uppercase tracking-wider">
                KUBERNETES AUTOSCALER [ SIMULATED OBSERVABILITY ]
              </span>
            </div>
            
            <div className="text-[10px] text-fg-muted space-y-3 text-left bg-bg p-4 rounded-xl border border-border">
              <div>
                <p className="text-yellow-400 font-bold mb-1">Warning: Pod cpu_utilization exceeded threshold (180%)</p>
                <p className="text-neon-cyan">&gt; Scaling: msh-core --min=2 --max=10</p>
              </div>

              {/* Traffic & Queue Metrics */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-border/40 py-2 my-1">
                <div>
                  <span className="text-fg-dim block text-[9px] uppercase">TRAFFIC RATE (SPIKE)</span>
                  <span className="text-red-400 font-bold text-xs">15.2k req/sec</span>
                  <div className="h-1.5 w-full bg-border rounded overflow-hidden mt-1">
                    <div className="h-full bg-red-500 w-[95%] animate-pulse" />
                  </div>
                </div>
                <div>
                  <span className="text-fg-dim block text-[9px] uppercase">QUEUE DEPTH</span>
                  <span className="text-yellow-400 font-bold text-xs">1,840 pending</span>
                  <div className="h-1.5 w-full bg-border rounded overflow-hidden mt-1">
                    <div className="h-full bg-yellow-500 w-[75%] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Replica Scaling progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-fg-dim">
                  <span>POD REPLICAS</span>
                  <span className="text-neon-cyan font-mono">8 / 10 ONLINE</span>
                </div>
                <div className="h-2 w-full bg-border rounded overflow-hidden">
                  <div className="h-full bg-neon-cyan w-[80%] transition-all duration-1000" />
                </div>
              </div>

              {/* Latency Normalization Graph */}
              <div className="space-y-1">
                <span className="text-fg-dim block text-[9px] uppercase">LATENCY TIMELINE</span>
                <div className="flex items-end justify-between h-12 bg-black/60 rounded p-1 border border-border/20 font-mono text-[8px] text-fg-dim gap-1">
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-full bg-emerald-500 h-[10%]" />
                    <span className="mt-1">45ms</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-full bg-red-500 h-[95%] animate-pulse" />
                    <span className="mt-1">1850ms</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full animate-pulse">
                    <div className="w-full bg-yellow-500 h-[45%]" />
                    <span className="mt-1">620ms</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-full bg-emerald-500 h-[12%]" />
                    <span className="mt-1">52ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 text-center animate-fade-in">
            <ShieldCheck className="h-14 w-14 text-emerald-400 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-emerald-400 uppercase tracking-wide">
                SYSTEM NOMINAL &amp; RECOVERED
              </h2>
              <span className="text-[9px] text-fg-dim block">[ SIMULATED TELEMETRY STATUS: RESOLVED ]</span>
            </div>
            <div className="text-[10px] text-fg-muted font-mono bg-bg border border-border p-4 rounded-xl text-left space-y-1">
              <p>&gt; Replicas scaled back to 3/10.</p>
              <p>&gt; Latency stabilized at 45ms. Drop rate: 0.00%</p>
              <p>&gt; Rate-limiting cooldown complete.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
