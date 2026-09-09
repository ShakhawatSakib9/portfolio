"use client";

import { useState } from "react";
import {
  Layers,
  Database,
  ShieldCheck,
  FileCode,
  Gauge,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Terminal,
  Cpu,
  Lock,
} from "lucide-react";

interface Principle {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: any;
  howItWorks: string;
  badPractice: string;
  goodPractice: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: "separation",
    number: "01",
    title: "Separation of Concerns",
    tagline: "Fat controllers are technical debt. Keep controllers thin and business logic decoupled.",
    icon: Layers,
    howItWorks: "Controllers only orchestrate flow. FormRequests validate incoming data, dedicated Service Classes handle domain rules, and API Resources format outbound payloads.",
    badPractice: "❌ Putting DB queries, payment calls, and mail triggers in a 200-line controller method.",
    goodPractice: "✅ $order = $this->orderService->create($request->validated());",
  },
  {
    id: "database-first",
    number: "02",
    title: "Database-First Thinking",
    tagline: "Index before blaming the server. Clean schemas and eager loading prevent bottlenecks.",
    icon: Database,
    howItWorks: "Before writing application code, I analyze relational access patterns, add composite indexes, and design foreign keys so queries stay sub-millisecond even with 100k+ rows.",
    badPractice: "❌ Executing nested relations inside foreach loops without with(), generating N+1 queries.",
    goodPractice: "✅ Pre-eager loading with(['contractor', 'project']) and indexing (project_id, created_at).",
  },
  {
    id: "api-contracts",
    number: "03",
    title: "API Contract Stability",
    tagline: "Strict JSON contracts that frontend, mobile, and third-party webhooks can rely on.",
    icon: FileCode,
    howItWorks: "Standardized HTTP semantics (200 OK, 201 Created, 422 Unprocessable, 403 Forbidden). Payloads are transformed via JsonResource classes so database schema changes never break clients.",
    badPractice: "❌ Returning raw Eloquent models directly with unformatted date strings and hidden password hashes.",
    goodPractice: "✅ Explicit OrderResource mappings with unified { status, data, meta } envelopes.",
  },
  {
    id: "secure-default",
    number: "04",
    title: "Secure by Default",
    tagline: "Defense-in-depth with Gate policies, CSRF verification, and sanitized PDO bindings.",
    icon: ShieldCheck,
    howItWorks: "Never trust user input. Enforce strict FormRequest rules, sanitize parameters via PDO prepared statements, implement granular RBAC, and rate-limit sensitive endpoints.",
    badPractice: "❌ Relying solely on UI hides for unauthorized buttons without server-side Gate checks.",
    goodPractice: "✅ $this->authorize('update', $contract); + Sanctum token ability scoping.",
  },
  {
    id: "acid-safety",
    number: "05",
    title: "ACID Transaction Integrity",
    tagline: "Financial, inventory, and stock deductions must either succeed completely or roll back safely.",
    icon: Lock,
    howItWorks: "Multi-table business operations (like restaurant order billing or construction material allocation) are wrapped in DB::transaction() with pessimistic row locks to prevent race conditions.",
    badPractice: "❌ Deducting stock in table A, encountering an error on table B, and leaving orphaned negative balances.",
    goodPractice: "✅ DB::transaction(fn() => $this->deductStockAndLogAudit($order));",
  },
  {
    id: "measure-before-opt",
    number: "06",
    title: "Measure Before Optimizing",
    tagline: "Telemetry and query logs before guesswork. Real metrics guide optimization decisions.",
    icon: Gauge,
    howItWorks: "Profile production bottlenecks using Laravel query listeners, slow-query logs, and execution timers before altering algorithms. Fix the real 90% latency culprit, not theoretical minutiae.",
    badPractice: "❌ Rewriting readable PHP into unreadable micro-loops without profiling query latency first.",
    goodPractice: "✅ Profiling query execution time and index cardinality, cutting 12s latency to 1.8s.",
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Understand", desc: "Clarify user requirement, business context & constraints" },
  { step: "02", title: "Model Data", desc: "Architect relational tables, indexes & foreign key constraints" },
  { step: "03", title: "Contract Design", desc: "Define RESTful JSON spec & HTTP status codes" },
  { step: "04", title: "Business Logic", desc: "Build thin controllers, FormRequests & decoupled Service classes" },
  { step: "05", title: "Security & RBAC", desc: "Apply Gate authorization, CSRF protection & input sanitation" },
  { step: "06", title: "Testing", desc: "Run PHPUnit feature tests, validation passes & permission checks" },
  { step: "07", title: "Optimize", desc: "Check query logs for N+1 issues, verify index hits & memory usage" },
  { step: "08", title: "Deploy & Monitor", desc: "Push with zero downtime, verify database migrations & check error logs" },
];

const EXPLORING_TOPICS = [
  {
    name: "Docker & Containerization",
    desc: "Building standardized PHP 8.3, Nginx & MySQL multi-container staging workflows.",
    tag: "DevOps",
  },
  {
    name: "Distributed Queues & Redis",
    desc: "High-throughput asynchronous job workers for report generation and notifications.",
    tag: "Performance",
  },
  {
    name: "Event-Driven Laravel",
    desc: "Domain events, listeners, and subscriber patterns for decoupled enterprise modules.",
    tag: "Architecture",
  },
  {
    name: "Automated CI/CD Workflows",
    desc: "GitHub Actions pipelines for automated linting, PHPUnit testing, and staging deploy.",
    tag: "Tooling",
  },
];

export default function EngineeringPrinciples() {
  const [activePrinciple, setActivePrinciple] = useState<Principle>(PRINCIPLES[0]);

  return (
    <section id="principles" className="relative py-24 lg:py-32 overflow-hidden bg-bg">
      {/* Subtle ambient water-blue glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="reveal max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
            // 03. Engineering Philosophy &amp; Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg leading-tight">
            How I Architect <span className="text-gradient">Production Systems</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted leading-relaxed sm:text-lg">
            Writing code that works is only the first step. I design maintainable, secure, and performant backend architectures that scale gracefully under real-world business load.
          </p>
        </div>

        {/* 6 Core Engineering Principles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            const isSelected = activePrinciple.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActivePrinciple(p)}
                className={`group relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-neon-cyan bg-bg-card/90 shadow-[0_0_25px_rgba(14,165,233,0.15)] -translate-y-1"
                    : "border-border bg-bg-card/60 hover:border-neon-cyan/50 hover:bg-bg-card/80"
                }`}
              >
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                        isSelected
                          ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                          : "border-border/80 bg-bg text-fg-muted group-hover:border-neon-cyan/40 group-hover:text-neon-cyan"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-fg-dim tracking-wider">
                      {p.number}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-neon-cyan bg-neon-cyan/10 px-2.5 py-0.5 rounded-full border border-neon-cyan/30">
                      Active Inspector
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-5 font-mono text-base sm:text-lg font-bold text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {p.tagline}
                </p>

                {/* Click indicator */}
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-fg-dim group-hover:text-neon-cyan transition-colors">
                  <span>View Production Rule</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Principle Deep Dive Drawer */}
        <div className="mt-8 rounded-2xl border border-border-glow bg-bg-card/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl reveal">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
                PRINCIPLE {activePrinciple.number}
              </span>
              <h4 className="font-mono text-lg sm:text-xl font-bold text-fg">
                {activePrinciple.title} · Implementation Standard
              </h4>
            </div>
            <p className="font-mono text-xs text-fg-muted">
              Standardized across all enterprise repositories at IISBD
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: How it works */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base text-fg leading-relaxed">
                {activePrinciple.howItWorks}
              </p>
              <div className="rounded-xl border border-border/70 bg-bg p-4 font-mono text-xs text-fg-muted space-y-2">
                <div className="flex items-center gap-2 text-neon-cyan font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Why This Matters to Recruiters &amp; CTOs</span>
                </div>
                <p className="leading-relaxed">
                  Prevents regression bugs, makes code reviews effortless for senior teammates, and ensures seamless onboarding for new engineering hires.
                </p>
              </div>
            </div>

            {/* Right: Code comparison box */}
            <div className="lg:col-span-7 space-y-3">
              <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 font-mono text-xs shadow-md">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-rose-500/20">
                  <span className="text-[11px] font-bold text-rose-400">
                    // Common Anti-Pattern (What I Avoid)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold uppercase">
                    Refactor Needed
                  </span>
                </div>
                <p className="text-rose-200/90 leading-relaxed overflow-x-auto">
                  {activePrinciple.badPractice}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 font-mono text-xs shadow-md">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-emerald-500/20">
                  <span className="text-[11px] font-bold text-emerald-400">
                    // Production Standard (How I Write It)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase">
                    Clean Architecture
                  </span>
                </div>
                <p className="text-emerald-300 leading-relaxed overflow-x-auto">
                  {activePrinciple.goodPractice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Development Workflow (8-Step Pipeline) */}
        <div className="mt-20 reveal">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan font-semibold">
                // Systematic Execution Pipeline
              </p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-fg">
                How I Approach a New Feature
              </h3>
            </div>
            <span className="font-mono text-xs text-fg-muted self-start sm:self-auto bg-bg-card px-3 py-1.5 rounded-full border border-border">
              8-Step Engineering Workflow
            </span>
          </div>

          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {WORKFLOW_STEPS.map((w, idx) => (
              <div
                key={w.step}
                className="group relative rounded-xl border border-border bg-bg-card/70 p-3 sm:p-4 transition-all duration-300 hover:border-neon-cyan/50 hover:bg-bg-card hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-neon-cyan">
                      {w.step}
                    </span>
                    {idx < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight className="hidden lg:block h-3 w-3 text-fg-dim/40 group-hover:text-neon-cyan transition-colors" />
                    )}
                  </div>
                  <h4 className="font-mono text-sm font-bold text-fg leading-tight">
                    {w.title}
                  </h4>
                  <p className="mt-2 text-[11px] text-fg-muted leading-snug">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Growth / Currently Exploring */}
        <div className="mt-20 reveal">
          <div className="rounded-2xl border border-border bg-bg-card/60 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full border border-neon-cyan/20">
                  <Sparkles className="h-3 w-3" />
                  <span>Continuous Engineering Evolution</span>
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-fg">
                  Currently Exploring &amp; Leveling Up
                </h3>
              </div>
              <p className="font-mono text-xs text-fg-muted max-w-md">
                A great engineer never stays static. These are the modern backend paradigms I am actively working with and expanding into.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EXPLORING_TOPICS.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-border/80 bg-bg/70 p-4 hover:border-neon-cyan/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25 font-semibold">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-mono text-sm font-bold text-fg">
                    {item.name}
                  </h4>
                  <p className="mt-2 text-xs text-fg-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
