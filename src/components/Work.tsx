"use client";

import { useState } from "react";
import { ExternalLink, Database, Cpu, Zap, Code, ShieldCheck } from "lucide-react";
import Magnetic from "./Magnetic";

const PROJECTS = [
  {
    id: "construction-mis",
    title: "Construction MIS & Approval Engine",
    subtitle: "Enterprise Resource Planning (ERP)",
    description:
      "A high-concurrency management information system built to streamline multi-level approvals, bill creations, and real-time comparative statements for construction logistics.",
    challenge:
      "Legacy system was suffering from slow, nested query loops (N+1 queries) when aggregating material rates, causing approval printouts to take upwards of 12 seconds to load.",
    solution:
      "Restructured database indexes, refactored raw Eloquent relations into optimized database views and subqueries, and implemented Redis caching for historical audit logs.",
    metrics: [
      { label: "Query Speedup", value: "85% faster (12s → 1.8s)", icon: Zap },
      { label: "Approval Latency", value: "<150ms", icon: Cpu },
      { label: "Data Accuracy", value: "100% Audit trail", icon: ShieldCheck },
    ],
    tech: ["Laravel 11", "PHP 8.3", "MySQL", "Redis", "Select2 AJAX", "Bootstrap & Custom CSS"],
  },
  {
    id: "payment-recon",
    title: "Supplier Payment & Reconciliation Engine",
    subtitle: "Fintech Billing System",
    description:
      "A transaction ledger and reconciliation system mapping purchase indents, advances, and subcontractor invoices with precise financial auditing.",
    challenge:
      "Complex payment structures caused duplicate entries in print vouchers when bills were reversed or partially processed, leading to ledger discrepancies.",
    solution:
      "Implemented strict database transactions (ACID), built automated invoice-indent state machines, and enforced unique hash keys to prevent concurrent double-spend requests.",
    metrics: [
      { label: "Recon Accuracy", value: "100% automatic", icon: ShieldCheck },
      { label: "API Response Time", value: "45ms avg", icon: Cpu },
      { label: "Ledger Errors", value: "Reduced to 0", icon: Database },
    ],
    tech: ["Laravel", "PostgreSQL", "Queue Workers", "REST API", "Tailwind CSS"],
  },
  {
    id: "profile-upload",
    title: "Optimized File Storage & Media CDN",
    subtitle: "Microservice / Module Integration",
    description:
      "A modular, secure file upload and image manipulation component designed to handle employee records, document attachments, and dynamic image sizing.",
    challenge:
      "Heavy profile pictures uploaded by users bloated storage space and choked bandwidth on slow mobile connections.",
    solution:
      "Built a queued image optimizer that compresses files to WebP on upload, creates standard responsive image crops, and serves them via a cached path.",
    metrics: [
      { label: "Bandwidth Saved", value: "72% average", icon: Zap },
      { label: "Upload Time", value: "Sub-1s processing", icon: Cpu },
      { label: "Storage Reduction", value: "5GB to 1.4GB", icon: Database },
    ],
    tech: ["Laravel Media Library", "Intervention Image", "AWS S3", "Alpine.js"],
  },
];

export default function Work() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);

  return (
    <section id="work" className="relative py-24 lg:py-32 overflow-hidden bg-bg">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -bottom-40 right-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.06),transparent_60%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// 03. Selected Work</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg">
            Case Studies: Solving <span className="text-gradient">Real Problems</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            I don&apos;t just write code; I design systems. Here is how I solved database latency, financial concurrency, and storage bottlenecks on real projects.
          </p>
        </div>

        {/* Work Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {PROJECTS.map((proj) => {
              const isActive = activeProject === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(proj.id)}
                  className={`group flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-bg-card border-neon-cyan shadow-[0_0_20px_-10px_var(--neon-cyan)]"
                      : "bg-bg-soft/40 border-border hover:border-border-glow"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neon-violet">
                    {proj.subtitle}
                  </span>
                  <span
                    className={`mt-2 text-lg font-semibold transition-colors ${
                      isActive ? "text-neon-cyan" : "text-fg-muted group-hover:text-fg"
                    }`}
                  >
                    {proj.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details (8 cols) */}
          <div className="lg:col-span-8">
            {PROJECTS.map((proj) => {
              if (proj.id !== activeProject) return null;
              return (
                <div
                  key={proj.id}
                  className="relative rounded-3xl border border-border bg-bg-card/70 p-8 backdrop-blur-md transition-opacity duration-500 animate-fadeIn"
                >
                  {/* Decorative glow line */}
                  <span className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">// {proj.subtitle}</span>
                      <h3 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">{proj.title}</h3>
                    </div>
                    <Magnetic>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted hover:border-neon-cyan hover:text-neon-cyan cursor-pointer transition-colors">
                        <ExternalLink className="h-4.5 w-4.5" />
                      </span>
                    </Magnetic>
                  </div>

                  <p className="mt-6 text-fg-muted text-base leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Challenge & Solution Grid */}
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-bg/50 p-5">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neon-pink">
                        [The Challenge]
                      </h4>
                      <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                        {proj.challenge}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-bg/50 p-5">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neon-cyan">
                        [The Architecture Solution]
                      </h4>
                      <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                        {proj.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-8">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                      Performance Metrics
                    </h4>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {proj.metrics.map((m) => {
                        const Icon = m.icon;
                        return (
                          <div key={m.label} className="flex items-center gap-4 rounded-xl border border-border/60 bg-bg-soft/40 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg border border-border-glow text-neon-violet">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] uppercase tracking-wider text-fg-dim">
                                {m.label}
                              </span>
                              <span className="block text-sm font-semibold text-fg mt-0.5">
                                {m.value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-8 pt-6 border-t border-border/60">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                      Technologies Leveraged
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-bg/60 px-3 py-1 font-mono text-[11px] text-fg-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
