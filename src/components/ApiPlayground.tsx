"use client";

import { useState } from "react";
import { Terminal, Send, ArrowRight, Activity, Database, Check } from "lucide-react";
import Magnetic from "./Magnetic";

const ENDPOINTS = [
  {
    id: "status",
    method: "GET",
    url: "/api/v1/status",
    description: "Fetches system status, runtime memory usage, and execution latency.",
  },
  {
    id: "metrics",
    method: "GET",
    url: "/api/v1/metrics",
    description: "Queries active connections, average query times, and database optimization stats.",
  },
  {
    id: "bkash-payment",
    method: "POST",
    url: "/api/v1/payment/bkash-verify",
    description: "Executes tokenized bKash payment verification agreement and webhook response.",
  },
];

export default function ApiPlayground() {
  const [selected, setSelected] = useState(ENDPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setLatency(null);
    setHttpStatus(null);

    const startTime = Date.now();
    try {
      const res = await fetch(selected.url, {
        method: selected.method,
      });
      const data = await res.json();
      const endTime = Date.now();
      
      setHttpStatus(res.status);
      setLatency(endTime - startTime);
      setResponse(data);
    } catch (err) {
      setHttpStatus(500);
      setResponse({ error: "Failed to connect to the backend server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="relative py-24 lg:py-32 overflow-hidden bg-bg-soft">
      {/* Accent ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.06),transparent_60%)] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Text panel (5 cols) */}
          <div className="lg:col-span-5 reveal">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
              // 04. API Playground
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg leading-tight">
              Test my <span className="text-gradient">Backend API</span> in Real-time
            </h2>
            <p className="mt-4 text-base text-fg-muted leading-relaxed sm:text-lg">
              Don&apos;t just read about code — verify it. Select an endpoint on the left and hit send. A live serverless function will process the request and return real metrics.
            </p>

            {/* Endpoint selectors */}
            <div className="mt-8 space-y-3.5">
              {ENDPOINTS.map((ep) => {
                const isActive = selected.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelected(ep);
                      setResponse(null);
                      setLatency(null);
                      setHttpStatus(null);
                    }}
                    className={`w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? "bg-bg-card border-neon-cyan/60 shadow-[0_0_20px_rgba(14,165,233,0.12)]"
                        : "bg-bg-card/40 border-border hover:border-border-glow hover:bg-bg-card/70"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-neon-cyan px-2.5 py-1 rounded-lg bg-neon-cyan/15 border border-neon-cyan/30 shrink-0">
                      {ep.method}
                    </span>
                    <div>
                      <span className="block font-mono text-xs font-bold text-fg">
                        {ep.url}
                      </span>
                      <span className="block text-xs text-fg-muted mt-1 leading-relaxed">
                        {ep.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <Magnetic strength={0.3}>
                <button
                  onClick={handleSend}
                  disabled={loading}
                  data-cursor-label="[ EXECUTE API ]"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-neon-cyan px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-slate-950 font-bold transition-all hover:shadow-[0_0_25px_var(--neon-cyan)] hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      Executing...
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    </>
                  ) : (
                    <>
                      Send Request
                      <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Terminal panel (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
              {/* Terminal top header bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-neon-cyan" />
                  <span className="font-mono text-xs text-slate-400">interactive-api-console.sh</span>
                </div>
                {/* Colored dots */}
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Console Screen */}
              <div className="p-6 font-mono text-xs text-slate-300 overflow-x-auto min-h-[320px] max-h-[440px] bg-slate-950 leading-relaxed">
                <div className="text-slate-200">
                  <span className="text-neon-cyan font-bold">$</span> curl -i -X {selected.method} &quot;https://shakhawat.dev{selected.url}&quot;
                </div>
                
                {loading && (
                  <div className="mt-4 animate-pulse flex items-center gap-2 text-neon-cyan">
                    <span>&gt; Connecting to serverless endpoint...</span>
                  </div>
                )}

                {httpStatus && (
                  <div className="mt-4 text-fg space-y-1">
                    <div className="text-green-400">
                      HTTP/1.1 {httpStatus} OK
                    </div>
                    <div className="text-fg-dim">
                      Date: {new Date().toUTCString()}
                    </div>
                    <div className="text-fg-dim">
                      Content-Type: application/json; charset=utf-8
                    </div>
                    {latency && (
                      <div className="text-neon-cyan">
                        X-Response-Time: {latency}ms
                      </div>
                    )}
                  </div>
                )}

                {response && (
                  <pre className="mt-6 text-green-300 font-mono text-xs overflow-x-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}

                {!loading && !response && (
                  <div className="mt-12 text-center text-fg-dim">
                    <Activity className="h-8 w-8 mx-auto text-border-glow animate-pulse" />
                    <p className="mt-3">Console idle. Hit the &quot;Send Request&quot; button to see response payload.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
