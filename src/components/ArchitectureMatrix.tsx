"use client";

import { useState } from "react";
import { Server, Grid, Layers, ArrowRight, Info } from "lucide-react";
import { playClick } from "@/utils/audio";

type ArchitectureType = "monolith" | "modular" | "microservices";

interface MatrixMetric {
  label: string;
  monolith: string;
  modular: string;
  microservices: string;
  explanation: string;
}

const METRICS: MatrixMetric[] = [
  {
    label: "Execution Latency",
    monolith: "12ms (In-memory loop)",
    modular: "18ms (Internal interface boundary)",
    microservices: "85ms (Network gRPC/REST hops)",
    explanation: "Monoliths perform logical computations in-process, bypassing the network serialization/deserialization delay of microservices."
  },
  {
    label: "Data Isolation",
    monolith: "Single Shared DB (ACID Joins)",
    modular: "Logical Schema Separation (Clean Boundaries)",
    microservices: "Isolated DB-per-Service (Eventual Consistency)",
    explanation: "Microservices require eventual consistency and distributed transaction patterns (e.g. Sagas), which increases application complexity."
  },
  {
    label: "Deployment Overhead",
    monolith: "1 Pipeline (Single Artifact)",
    modular: "1 Pipeline (Separated Modules)",
    microservices: "Multiple Pipelines (Independent Releases)",
    explanation: "Microservices allow faster iteration speeds but require high maturity in CI/CD automation."
  },
  {
    label: "Blast Radius & Resilience",
    monolith: "High (Single crash takes down entire app)",
    modular: "Medium (Errors localized but sharing process space)",
    microservices: "Low (Service degradation / fallback active)",
    explanation: "If a service crashes in a microservices architecture, circuit breakers keep the remaining systems operational."
  },
  {
    label: "Operational Cost",
    monolith: "Low (Basic VM hosting)",
    modular: "Low (Simple server footprint)",
    microservices: "High (Kubernetes, Tracing, API Gateway)",
    explanation: "Orchestrating, logging, and tracing multiple services demands specialized infrastructure engineers and higher cloud budgets."
  }
];

export default function ArchitectureMatrix() {
  const [selectedArch, setSelectedArch] = useState<ArchitectureType>("modular");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleSelect = (arch: ArchitectureType) => {
    playClick();
    setSelectedArch(arch);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-card/40 p-5 font-mono text-xs text-fg-muted space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
        <span className="text-[10px] text-neon-cyan uppercase font-bold tracking-wider">
          // 2.1 Interactive Architecture Decision Matrix
        </span>
        <span className="text-[9px] text-fg-dim border border-border px-1.5 py-0.5 rounded">
          TRADE-OFF EVALUATOR
        </span>
      </div>

      <p className="text-[11px] text-fg-dim leading-relaxed">
        Toggle to analyze how system architecture decisions impact database integrity, performance latency, and operational budgets.
      </p>

      {/* Select Architecture Toggles */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {(["monolith", "modular", "microservices"] as ArchitectureType[]).map((arch) => {
          const isActive = selectedArch === arch;
          return (
            <button
              key={arch}
              onClick={() => handleSelect(arch)}
              className={`p-2 sm:p-3 rounded-xl border text-center transition-all ${
                isActive
                  ? "border-neon-cyan bg-neon-cyan/5 text-neon-cyan shadow-[0_0_12px_rgba(0,255,242,0.15)]"
                  : "border-border/60 bg-bg/40 text-fg-muted hover:border-fg-dim"
              }`}
            >
              <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                {arch === "monolith" && "Monolith"}
                {arch === "modular" && "Modular Monolith"}
                {arch === "microservices" && "Microservices"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Comparison metrics */}
      <div className="space-y-2.5">
        {METRICS.map((metric, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={metric.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-3 rounded-xl border transition-all ${
                isHovered ? "border-border bg-bg/70" : "border-border/40 bg-bg/25"
              }`}
            >
              <div className="flex justify-between items-center gap-4">
                <span className="font-bold text-fg text-[11px]">{metric.label}</span>
                <span className="text-neon-violet font-semibold text-[10px] text-right">
                  {selectedArch === "monolith" && metric.monolith}
                  {selectedArch === "modular" && metric.modular}
                  {selectedArch === "microservices" && metric.microservices}
                </span>
              </div>
              
              {isHovered && (
                <div className="mt-2 pt-2 border-t border-border/40 text-[10px] text-fg-dim flex items-start gap-1.5 animate-fade-in">
                  <Info className="h-3.5 w-3.5 text-neon-cyan shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{metric.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
