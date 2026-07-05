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
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-neon-cyan" />
              <span className="text-xs text-neon-cyan font-bold">KUBERNETES ORCHESTRATOR</span>
            </div>
            <div className="text-[10px] text-fg-muted space-y-1 text-left bg-bg p-4 rounded-xl border border-border">
              <p className="text-yellow-400">Warning: Pod cpu_utilization exceeded threshold (180%)</p>
              <p className="text-neon-cyan">&gt; kubectl autoscale deployment msh-core --cpu-percent=80 --min=2 --max=10</p>
              <p className="text-green-400">&gt; Spawning 3 new replica pods on cluster Node-F...</p>
              <p>&gt; backup-pod-node-c98 [STATUS: RUNNING]</p>
              <p>&gt; Re-routing load balancer traffic flows...</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <ShieldCheck className="h-14 w-14 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-emerald-400 uppercase tracking-wide">
              System Stable
            </h2>
            <p className="text-xs text-fg-dim">
              Auto-scaling completed. Traffic successfully balanced.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
