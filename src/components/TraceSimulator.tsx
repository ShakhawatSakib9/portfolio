"use client";

import { useState, useEffect } from "react";
import { Play, CheckCircle2, Server, Key, Database, RefreshCw, Layers, ShieldCheck } from "lucide-react";
import { playClick, playChime, playTick } from "@/utils/audio";

interface TraceSpan {
  node: string;
  operation: string;
  latency: number;
  status: string;
  details: string;
  icon: any;
}

const TRACES: Record<string, TraceSpan[]> = {
  "POST /api/v1/orders": [
    { node: "Vercel Edge Router", operation: "SSL Handshake & Route Lookup", latency: 8, status: "200 OK", details: "Route mapped to Node.js serverless origin. Headers verified.", icon: Server },
    { node: "Request Validator", operation: "Schema Matcher", latency: 6, status: "200 OK", details: "validated params: qty=2, item_id=302, payment_method=bKash", icon: ShieldCheck },
    { node: "Database Transaction", operation: "ACID Row lockForUpdate()", latency: 45, status: "200 OK", details: "SELECT * FROM inventory WHERE id = 302 FOR UPDATE; UPDATE count=count-2", icon: Database },
    { node: "Redis Job Queue", operation: "Dispatch OrderCreatedJob", latency: 12, status: "200 OK", details: "Serialized job payload pushed to orders queue. Status: IDLE", icon: Layers },
    { node: "Audit Logger", operation: "Save Ledger Entry", latency: 10, status: "200 OK", details: "INSERT INTO audit_histories (action, model_id) VALUES ('checkout', 302)", icon: Key }
  ],
  "POST /api/v1/payment/bkash-webhook": [
    { node: "Vercel Edge Router", operation: "SSL Verification", latency: 9, status: "200 OK", details: "Payload request verified against digital signature keys.", icon: Server },
    { node: "Signature Validator", operation: "SHA256 HMAC Validation", latency: 14, status: "200 OK", details: "Webhook header signature successfully verified with secret credentials.", icon: ShieldCheck },
    { node: "Redis Idempotency Check", operation: "GET bkash_trx:TRX-988A", latency: 5, status: "200 OK", details: "Lock key free. Transaction ID not processed before. Creating Redis key...", icon: Layers },
    { node: "Database Transaction", operation: "Enrollment Grant & Ledger Update", latency: 38, status: "200 OK", details: "UPDATE billing_ledgers SET status='paid'; INSERT INTO course_student (user_id, course_id)", icon: Database }
  ]
};

export default function TraceSimulator() {
  const [selectedRoute, setSelectedRoute] = useState<string>("POST /api/v1/orders");
  const [traceStep, setTraceStep] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const spans = TRACES[selectedRoute];

  const handleStartTrace = () => {
    if (isExecuting) return;
    playClick();
    setIsExecuting(true);
    setTraceStep(0);
  };

  useEffect(() => {
    if (isExecuting && traceStep >= 0 && traceStep < spans.length) {
      const timer = setTimeout(() => {
        playTick();
        setTraceStep((prev) => prev + 1);
      }, spans[traceStep].latency * 15 + 400); // Dynamic step duration based on latency scale

      return () => clearTimeout(timer);
    } else if (traceStep === spans.length) {
      playChime();
      setIsExecuting(false);
    }
  }, [isExecuting, traceStep, spans]);

  const totalLatency = spans.slice(0, traceStep).reduce((sum, s) => sum + s.latency, 0);

  return (
    <div className="rounded-2xl border border-border bg-bg-card/45 p-5 font-mono text-xs text-fg-muted space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
        <span className="text-[10px] text-neon-cyan uppercase font-bold tracking-wider">
          [ SIMULATED OBSERVABILITY TELEMETRY ]
        </span>
        <span className="text-[9px] text-fg-dim border border-border px-1.5 py-0.5 rounded">
          STATUS: ACTIVE_
        </span>
      </div>

      {/* Selector & Run CTA */}
      <div className="flex items-center justify-between gap-4">
        <select
          value={selectedRoute}
          onChange={(e) => {
            playClick();
            setSelectedRoute(e.target.value);
            setTraceStep(-1);
            setIsExecuting(false);
          }}
          disabled={isExecuting}
          className="bg-bg border border-border text-fg text-[11px] rounded-lg px-2.5 py-1.5 focus:border-neon-cyan focus:outline-none"
        >
          {Object.keys(TRACES).map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>

        <button
          onClick={handleStartTrace}
          disabled={isExecuting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 transition-all font-bold text-[10px] tracking-wider uppercase disabled:opacity-50"
        >
          <Play className="h-3 w-3" />
          {isExecuting ? "Executing..." : "Execute Request Trace"}
        </button>
      </div>

      {/* Visual Map Progress */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-bg/40 border border-border/40 rounded-xl">
        {spans.map((span, idx) => {
          const isDone = traceStep > idx;
          const isActive = traceStep === idx;
          return (
            <div key={span.node} className="flex items-center gap-2">
              <div
                className={`px-2 py-1 rounded border text-[9px] transition-all duration-300 ${
                  isDone
                    ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400"
                    : isActive
                    ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,255,242,0.15)]"
                    : "border-border bg-bg/60 text-fg-dim"
                }`}
              >
                {span.node}
              </div>
              {idx < spans.length - 1 && (
                <span className={`text-[10px] ${isDone ? "text-emerald-400" : "text-fg-dim"}`}>➔</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Span Trace Detail */}
      <div className="min-h-[140px] bg-bg/80 border border-border/80 rounded-xl p-4 flex flex-col justify-between">
        {traceStep === -1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-fg-dim space-y-2 py-4">
            <RefreshCw className="h-6 w-6 animate-spin text-neon-violet" />
            <p className="text-[10px] uppercase tracking-wider">Awaiting telemetry execution request...</p>
          </div>
        )}

        {traceStep >= 0 && traceStep < spans.length && (
          <div className="space-y-2.5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = spans[traceStep].icon;
                  return <Icon className="h-4 w-4 text-neon-cyan" />;
                })()}
                <span className="font-bold text-fg text-[11px]">{spans[traceStep].node}</span>
              </div>
              <span className="text-neon-violet text-[10px]">{spans[traceStep].latency}ms span</span>
            </div>
            <div className="space-y-1 text-[10px] leading-relaxed">
              <p>
                <span className="text-neon-cyan font-bold">&gt; Operation: </span>
                <span className="text-fg-muted">{spans[traceStep].operation}</span>
              </p>
              <p>
                <span className="text-neon-cyan font-bold">&gt; Query Trace: </span>
                <span className="text-fg text-mono break-all">{spans[traceStep].details}</span>
              </p>
              <p>
                <span className="text-neon-cyan font-bold">&gt; Status: </span>
                <span className="text-emerald-400 font-bold">{spans[traceStep].status}</span>
              </p>
            </div>
          </div>
        )}

        {traceStep === spans.length && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-2 animate-fade-in">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            <div className="space-y-0.5">
              <p className="text-fg font-bold text-[11px] uppercase tracking-wider">Trace Handshake Complete</p>
              <p className="text-[10px] text-fg-dim">
                Total payload round-trip delay: <span className="text-emerald-400 font-bold">{totalLatency}ms</span>
              </p>
            </div>
          </div>
        )}

        {traceStep >= 0 && (
          <div className="mt-4 pt-2 border-t border-border/40 flex items-center justify-between text-[9px] text-fg-dim">
            <span>Cumulative Span Delay: {totalLatency}ms</span>
            <span>Target Response: HTTP 200 OK</span>
          </div>
        )}
      </div>
    </div>
  );
}
