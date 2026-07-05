"use client";

import { useState, useEffect } from "react";
import { Terminal, ShieldAlert, Zap, RefreshCw, CheckCircle2, AlertOctagon } from "lucide-react";
import { playClick, playTick, playChime } from "@/utils/audio";

interface ChaosStep {
  text: string;
  status: "error" | "warn" | "info" | "success";
}

export default function ChaosLab() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [crashedNode, setCrashedNode] = useState<string>("");
  const [logs, setLogs] = useState<ChaosStep[]>([]);
  const [recoveryTime, setRecoveryTime] = useState<number>(0);

  const targets = ["Redis Cache", "Database Replica", "Webhook Web Server"];

  const handleInjectChaos = () => {
    if (isRunning) return;
    playClick();
    setIsRunning(true);
    const chosenNode = targets[Math.floor(Math.random() * targets.length)];
    setCrashedNode(chosenNode);
    setActiveStep(0);
    setRecoveryTime(0);

    const initialLogs: ChaosStep[] = [
      { text: `[CRITICAL] Injecting fault: ${chosenNode} terminated abruptly!`, status: "error" },
      { text: `[DETECTION] Telemetry health checker reported 0% ping response.`, status: "warn" }
    ];
    setLogs(initialLogs);
  };

  useEffect(() => {
    if (!isRunning || activeStep < 0) return;

    const timer = setTimeout(() => {
      playTick();
      if (activeStep === 0) {
        setLogs((prev) => [
          ...prev,
          { text: `[CIRCUIT BREAKER] Tripped to OPEN state. Intercepting calls.`, status: "warn" },
          { text: `[FALLBACK] Graceful degradation active: Re-routing database query queues.`, status: "info" }
        ]);
        setActiveStep(1);
      } else if (activeStep === 1) {
        setLogs((prev) => [
          ...prev,
          { text: `[SELF-HEAL] Requesting Kubernetes orchestrator to spin new replica container.`, status: "info" },
          { text: `[HEAL] Node scheduler assigned task to Cluster Node-C9. Status: PENDING`, status: "info" }
        ]);
        setActiveStep(2);
      } else if (activeStep === 2) {
        setLogs((prev) => [
          ...prev,
          { text: `[HEALTHY] Container successfully initialized. Health probe: 200 OK`, status: "info" },
          { text: `[SYNC] Syncing local memory replication buffer... Complete.`, status: "info" }
        ]);
        setActiveStep(3);
      } else if (activeStep === 3) {
        playChime();
        setLogs((prev) => [
          ...prev,
          { text: `[NOMINAL] Reconnected system node. Closing circuit breaker back to CLOSED state.`, status: "success" },
          { text: `[RESOLVED] Self-healing workflow successfully verified. Recovery target achieved.`, status: "success" }
        ]);
        setRecoveryTime(Math.floor(Math.random() * 200) + 1100);
        setIsRunning(false);
        setActiveStep(-1);
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  return (
    <div className="rounded-2xl border border-border/80 bg-bg-card/60 overflow-hidden shadow-2xl backdrop-blur-md font-mono text-xs text-fg-muted">
      {/* Tab bar header */}
      <div className="bg-bg/80 border-b border-border/80 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-neon-cyan animate-pulse" />
          <span className="font-semibold text-fg text-xs uppercase tracking-wider">
            Chaos Monkey Resilience Lab [ SIMULATED RESILIENCE TEST ]
          </span>
        </div>
        <span className="text-[9px] text-fg-dim border border-border px-1.5 py-0.5 rounded">
          STATUS: READY
        </span>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-[11px] text-fg-dim leading-relaxed">
          Test the self-healing and decoupling integrity of our infrastructure layers. Injecting a fault automatically trips circuit breakers, routes queries to fallback caches, and recovers automatically.
        </p>

        {/* Live Services Grid */}
        <div className="grid grid-cols-3 gap-3">
          {targets.map((node) => {
            const isCrashed = isRunning && crashedNode === node && activeStep < 3;
            return (
              <div
                key={node}
                className={`p-3.5 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                  isCrashed
                    ? "border-red-500/50 bg-red-500/5 text-red-400 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                    : "border-border/60 bg-bg/40 text-fg-muted"
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider text-fg-dim">{node}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isCrashed ? "bg-red-500 animate-ping" : "bg-emerald-400"}`}
                  />
                  <span className="text-[10px] font-bold">
                    {isCrashed ? "OFFLINE (CRASH)" : "ONLINE (HEALTHY)"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleInjectChaos}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-bold text-[10px] tracking-widest uppercase disabled:opacity-50"
          >
            <Zap className="h-3.5 w-3.5" />
            Inject Chaos Fault
          </button>

          {recoveryTime > 0 && !isRunning && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
              <CheckCircle2 className="h-4 w-4" />
              <span>RECOVERED IN {recoveryTime}ms (100% Resilient)</span>
            </div>
          )}
        </div>

        {/* Real-time telemetry log output */}
        <div className="rounded-xl bg-[#090b11] p-4 border border-border/60 min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5">
          {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center text-fg-dim py-12 space-y-2">
              <Terminal className="h-6 w-6 text-neon-cyan animate-pulse" />
              <p className="text-[9px] uppercase tracking-widest">Awaiting Chaos Fault Injection...</p>
            </div>
          )}
          {logs.map((log, i) => (
            <div
              key={i}
              className={`font-mono text-[10px] leading-relaxed ${
                log.status === "error"
                  ? "text-red-400"
                  : log.status === "warn"
                  ? "text-yellow-400"
                  : log.status === "success"
                  ? "text-emerald-400 font-bold"
                  : "text-neon-cyan"
              }`}
            >
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
