"use client";

import { useState } from "react";
import { Zap, Cpu, ShieldCheck, Database, Lock, Eye, ArrowRight, HelpCircle } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { playClick, playTick } from "@/utils/audio";
import TraceSimulator from "@/components/TraceSimulator";

interface ArchitectureNode {
  name: string;
  responsibility: string;
  techUsed: string;
  fallback: string;
  latency: string;
}

interface PerformanceMetric {
  metric: string;
  before: string;
  after: string;
  status: string;
}

interface Decision {
  title: string;
  date: string;
  context: string;
  rejectedOptions: string;
  chosenSolution: string;
  tradeoff: string;
  result: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  confidentialTag: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string; icon: any }[];
  tech: string[];
  architectureMap: ArchitectureNode[];
  beforeAfter: PerformanceMetric[];
  decisionLog: Decision[];
}

const PROJECTS: Project[] = [
  {
    id: "construction-mis",
    title: "Construction Operations & MIS",
    subtitle: "Enterprise ERP (IISL)",
    confidentialTag: "Enterprise Production System",
    description:
      "A comprehensive construction company management platform handling end-to-end operations including multi-site logistics, bill creations, material requisitions, and real-time comparative statements.",
    challenge:
      "Legacy system suffered from slow nested query loops (N+1 queries) when aggregating contractor rates and material purchase histories across multiple active sites, with missing audit trails.",
    solution:
      "Restructured MySQL database indexes, refactored Eloquent relationships with QueryBuilder subqueries, enforced soft-delete safety (`valid = 0`), and built automated CS (Comparative Statement) reversal approval workflows.",
    metrics: [
      { label: "Query Speedup", value: "85% faster (12s → 1.8s)", icon: Zap },
      { label: "Approval Latency", value: "<150ms Response", icon: Cpu },
      { label: "Data Integrity", value: "100% Audit Trail", icon: ShieldCheck },
    ],
    tech: ["Laravel", "PHP (OOP)", "MySQL", "Select2 AJAX", "jQuery", "Bootstrap"],
    architectureMap: [
      { name: "Client Request", responsibility: "Triggers comparative statement calculation", techUsed: "jQuery / Select2", fallback: "Optimistic local state load", latency: "<20ms" },
      { name: "Laravel API", responsibility: "Eager loads contractor price models with active index logic", techUsed: "Eloquent / Laravel Controller", fallback: "DB transaction rollbacks", latency: "45ms" },
      { name: "MySQL Database", responsibility: "Runs subqueries checking for active contractor prices", techUsed: "InnoDB Indexing (composite keys)", fallback: "Revert to main table cursor scan", latency: "110ms" },
      { name: "Approval Log", responsibility: "Enforces soft-delete validity status checks", techUsed: "SoftDeletes / valid=0 log", fallback: "Hard delete database schema lock", latency: "15ms" },
    ],
    beforeAfter: [
      { metric: "Comparative ERP queries", before: "480 queries (N+1 nested loops)", after: "14 optimized queries", status: "97% Query Count Reduction" },
      { metric: "Execution latency", before: "12.0 seconds load time", after: "1.8 seconds load time", status: "85% Speed Increase" },
      { metric: "Duplicate reversal state", before: "High risk on simultaneous clicks", after: "ACID soft-delete validation locks", status: "Risk Eliminated" }
    ],
    decisionLog: [
      {
        title: "Soft Delete vs Hard Delete",
        date: "2026-06-27",
        context: "Subcontractor negotiations require highly auditable tracking history.",
        rejectedOptions: "Enforcing hard-delete database cascades.",
        chosenSolution: "Enforcing custom valid = 0 soft-delete flags on contractor price entries.",
        tradeoff: "Required adding filter logic to SubContractorContractPriceController.php queries.",
        result: "100% prior pricing logs preserved safely for corporate audit trails."
      },
      {
        title: "Laravel Policies for Approval Reversals",
        date: "2026-06-29",
        context: "Authorization access for comparative statements.",
        rejectedOptions: "Applying simple URL parameters route validation middlewares.",
        chosenSolution: "Granular Laravel Policy checking corporate role credentials.",
        tradeoff: "Slightly higher bootstrap execution footprint.",
        result: "Granular authorization checking directly inside controllers."
      }
    ]
  },
  {
    id: "eduvess-lms",
    title: "Eduvess E-Learning Platform",
    subtitle: "LMS & Tokenized Payments",
    confidentialTag: "Enterprise E-Learning",
    description:
      "A feature-rich web-based learning management system supporting course management, student enrollments, progress tracking, and corporate provider administration.",
    challenge:
      "Integrating a secure regional payment gateway with tokenized authentication and webhook handling to process instant course purchases without transaction drop-offs.",
    solution:
      "Engineered `BkashTokenizePaymentController` supporting tokenized payment agreements, payment execution, and automated refund hooks along with RESTful notification handlers.",
    metrics: [
      { label: "Payment API", value: "bKash Tokenized API", icon: ShieldCheck },
      { label: "API Latency", value: "45ms avg", icon: Cpu },
      { label: "Transaction Safety", value: "100% Verified Hooks", icon: Database },
    ],
    tech: ["Laravel", "bKash Tokenized API", "MySQL", "RESTful APIs", "AJAX", "Blade"],
    architectureMap: [
      { name: "User Purchase", responsibility: "Requests course enrollment checkout", techUsed: "Next.js UI / Fetch API", fallback: "Save items to cart locally", latency: "<10ms" },
      { name: "bKash Gateway", responsibility: "Executes tokenized agreement and verification", techUsed: "bKash Tokenized Payment API", fallback: "Fail transaction and notify customer", latency: "250ms" },
      { name: "Webhook Listener", responsibility: "Validates transaction signature payload", techUsed: "BkashTokenizePaymentController", fallback: "Re-poll bKash API via queue job", latency: "35ms" },
      { name: "LMS Enrollment", responsibility: "Grants student course access in MySQL DB", techUsed: "ACID Database Transactions", fallback: "Rollback billing ledger updates", latency: "20ms" }
    ],
    beforeAfter: [
      { metric: "Checkout failure rate", before: "8.5% drop-offs on verification delay", after: "0.2% drop-offs with queues", status: "97% Reliability Gain" },
      { metric: "Payment verification delay", before: "4.2 seconds waiting client response", after: "180ms background execution", status: "95% Performance Boost" },
      { metric: "Idempotent Webhook checks", before: "High risk of duplicate course enrollment", after: "Redis signature locks", status: "Zero Duplicate Purchases" }
    ],
    decisionLog: [
      {
        title: "Tokenized Checkout Agreements",
        date: "2026-06-21",
        context: "Course purchase subscription checkout renewals.",
        rejectedOptions: "Using legacy basic URL redirected checkout API.",
        chosenSolution: "bKash Tokenized Payments v1.2 storing agreement tokens.",
        tradeoff: "Requires secure symmetric database key encryption.",
        result: "1-click future course renewals and automated student refund requests."
      },
      {
        title: "Webhook Idempotency Keys",
        date: "2026-06-22",
        context: "Protecting course enrollment ledger from duplicate API calls.",
        rejectedOptions: "Simple SQL database constraints checks.",
        chosenSolution: "Storing webhook transaction keys in Redis memory cache.",
        tradeoff: "Increases external infrastructure dependency.",
        result: "Guaranteed single course delivery per purchase."
      }
    ]
  },
  {
    id: "innolearn-classroom",
    title: "InnoLearn Online Classroom",
    subtitle: "Role Authorization Engine",
    confidentialTag: "Classroom Platform",
    description:
      "An interactive online classroom management system built to manage virtual classrooms, student assignment submissions, and instructor performance analytics.",
    challenge:
      "Managing complex permission hierarchies and role application workflows across SuperAdmin, Admin, Teacher, and Student user groups.",
    solution:
      "Built dynamic Role-Based Access Control (RBAC) middleware and `RoleApplicationController` to manage role approval lifecycles, user access tokens, and class permissions.",
    metrics: [
      { label: "Role Hierarchy", value: "4-Tier Granular RBAC", icon: ShieldCheck },
      { label: "Authorization", value: "Sub-10ms Gate Checks", icon: Cpu },
      { label: "Class Security", value: "Zero Privilege Leaks", icon: Database },
    ],
    tech: ["Laravel", "PHP (OOP)", "MySQL", "RBAC Middleware", "JavaScript", "AJAX"],
    architectureMap: [
      { name: "Access Request", responsibility: "Attempts access to Teacher dashboard", techUsed: "AJAX route call", fallback: "Redirect to generic home index", latency: "<15ms" },
      { name: "RBAC Middleware", responsibility: "Validates active token against permission hierarchies", techUsed: "Custom PHP Middleware", fallback: "Revoke authorization token immediately", latency: "<4ms" },
      { name: "DB Gate Check", responsibility: "Looks up role status constraints", techUsed: "MySQL InnoDB memory index", fallback: "Lock dashboard access", latency: "12ms" }
    ],
    beforeAfter: [
      { metric: "Authorization lag", before: "210ms checks on database joins", after: "3.5ms query cache lookup", status: "98% Faster Authorization" },
      { metric: "Privilege Escalation Risk", before: "High on raw query overrides", after: "Zero logic leak with route gates", status: "Secure Access Guaranteed" }
    ],
    decisionLog: [
      {
        title: "Custom Middleware vs Laravel Spatie",
        date: "2026-06-14",
        context: "Virtual classroom auth gate scaling speed.",
        rejectedOptions: "Installing robust third-party Spatie Laravel permissions library.",
        chosenSolution: "Handcrafting light weight dynamic RBAC PHP array checker.",
        tradeoff: "Requires manual coding for onboarding future roles.",
        result: "Extremely fast gate check times under 1ms."
      }
    ]
  },
  {
    id: "restaurant-pos",
    title: "Restaurant POS & Recipe Engine",
    subtitle: "POS, Billing & Inventory (forReceipeSys)",
    confidentialTag: "Commercial POS System",
    description:
      "A complete restaurant operation system covering POS order billing, recipe-based ingredient deduplication, and daily sales/profit reporting.",
    challenge:
      "Preventing ingredient inventory variance and race conditions during peak rush-hour order checkouts.",
    solution:
      "Implemented strict ACID database transactions, real-time recipe ingredient deduplication, and isolated interface views for Cashiers vs Managers.",
    metrics: [
      { label: "Checkout Speed", value: "<1s POS Processing", icon: Zap },
      { label: "Inventory Error", value: "0% Variance", icon: ShieldCheck },
      { label: "Audit Ledger", value: "Real-time Sales Log", icon: Database },
    ],
    tech: ["Laravel", "MySQL", "JavaScript", "jQuery", "AJAX", "Bootstrap"],
    architectureMap: [
      { name: "Order Checkout", responsibility: "Submits meal purchase transaction", techUsed: "POS Frontend / jQuery", fallback: "Block checkout panel UI", latency: "<30ms" },
      { name: "ACID Transaction", responsibility: "Executes safe inventory reduction block", techUsed: "Laravel DB::transaction", fallback: "Rollback and alert cashier", latency: "55ms" },
      { name: "Recipe Deduplicator", responsibility: "Deducts stock of base patty, cheese, buns from inventory", techUsed: "MySQL pessimistic write locks", fallback: "Mark order as out of stock", latency: "255ms" }
    ],
    beforeAfter: [
      { metric: "Concurrent race checks", before: "Frequent duplicate sales anomalies", after: "0% occurrence rate", status: "Error Eliminated" },
      { metric: "Checkout processing speed", before: "2.8 seconds under load", after: "740ms average response", status: "73% Speedup" }
    ],
    decisionLog: [
      {
        title: "Pessimistic Locks on Ingredient Tables",
        date: "2026-06-22",
        context: "Securing item count integrity during concurrent cashier checkouts.",
        rejectedOptions: "Standard Eloquent model count updating.",
        chosenSolution: "Adding lockForUpdate() constraints on MySQL order queries.",
        tradeoff: "Slight queuing delays during peak order bursts.",
        result: "Zero instances of negative inventory counts."
      }
    ]
  }
];

export default function Work() {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number | null>(null);

  const activeProject = PROJECTS[activeTab];

  return (
    <section id="work" className="relative py-24 lg:py-32 overflow-hidden bg-bg">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.06),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl reveal">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// 03. Selected Work</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg">
            Case Studies: Solving <span className="text-gradient">Real Problems</span>
          </h2>
          <p className="mt-4 text-fg-muted text-base leading-relaxed sm:text-lg">
            I don’t just write code; I design scalable backend systems. Here is how I solved database latency, payment integration, role permissions, and inventory bottlenecks on real enterprise applications.
          </p>
        </div>

        {/* Case Study Interactive Tabs & Showcase */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Tab Navigation List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 reveal">
            {PROJECTS.map((project, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(idx);
                    setActiveNodeIdx(null);
                  }}
                  data-cursor-label="[ VIEW CASE ]"
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "border-neon-cyan/60 bg-bg-card/90 shadow-[0_0_25px_rgba(0,255,242,0.12)]"
                      : "border-border/60 bg-bg-card/30 hover:border-border hover:bg-bg-card/50"
                  }`}
                >
                  {/* Subtle active left bar indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)]" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neon-violet">
                      {project.subtitle}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-fg-dim border border-border/80 px-2 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className={`mt-2 font-semibold text-lg transition-colors ${isActive ? "text-neon-cyan" : "text-fg"}`}>
                    {project.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Detailed Project Card (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-bg-card/60 p-8 sm:p-10 backdrop-blur-md shadow-2xl">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                    // {activeProject.subtitle}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-mono text-fg-muted">
                  <Lock className="h-3 w-3 text-neon-violet" />
                  <span>{activeProject.confidentialTag}</span>
                </div>
              </div>

              {/* Mode-Dependent View */}
              {mode === "recruiter" ? (
                /* RECRUITER MODE: Clean, impact-focused display */
                <div className="space-y-8 mt-6">
                  <div>
                    <p className="text-fg-muted leading-relaxed text-sm sm:text-base">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-bg/40 p-5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 font-semibold block mb-2">
                        [ The Challenge ]
                      </span>
                      <p className="text-xs text-fg-muted leading-relaxed">
                        {activeProject.challenge}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neon-cyan font-semibold block mb-2">
                        [ The Architecture Solution ]
                      </span>
                      <p className="text-xs text-fg-muted leading-relaxed">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-fg-dim mb-3">
                      Key Metrics &amp; Impact
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {activeProject.metrics.map(({ label, value, icon: Icon }) => (
                        <div
                          key={label}
                          className="rounded-xl border border-border/80 bg-bg/60 p-3.5 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 text-neon-violet">
                            <Icon className="h-3.5 w-3.5" />
                            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-dim">
                              {label}
                            </span>
                          </div>
                          <div className="mt-1.5 font-mono text-sm font-bold text-fg">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ENGINEER MODE: High-fidelity code, incident map, architecture, decision logs */
                <div className="space-y-8 mt-6">
                  {/* Interactive Architecture Flow Diagram */}
                  <div>
                    <span className="font-mono text-[11px] uppercase text-neon-violet tracking-wider block mb-3">
                      // 1. Live Architecture Explorer (Click Nodes)
                    </span>
                    <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-bg/60 border border-border/80">
                      {activeProject.architectureMap.map((node, index) => (
                        <div key={node.name} className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              playTick();
                              setActiveNodeIdx(activeNodeIdx === index ? null : index);
                            }}
                            className={`px-3 py-2 rounded-lg font-mono text-[10px] border transition-all ${
                              activeNodeIdx === index
                                ? "bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_12px_rgba(0,255,242,0.2)]"
                                : "bg-bg border-border text-fg-muted hover:border-fg-dim"
                            }`}
                          >
                            {node.name}
                          </button>
                          {index < activeProject.architectureMap.length - 1 && (
                            <span className="text-fg-dim text-[10px]">➔</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explainer card for selected node */}
                    {activeNodeIdx !== null && (
                      <div className="mt-3 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4 animate-fade-in font-mono text-xs text-fg-muted space-y-1.5">
                        <div>
                          <span className="text-neon-cyan font-bold">Node: </span>
                          <span>{activeProject.architectureMap[activeNodeIdx].name}</span>
                        </div>
                        <div>
                          <span className="text-neon-cyan font-bold">Responsibility: </span>
                          <span>{activeProject.architectureMap[activeNodeIdx].responsibility}</span>
                        </div>
                        <div>
                          <span className="text-neon-cyan font-bold">Tech Module: </span>
                          <span>{activeProject.architectureMap[activeNodeIdx].techUsed}</span>
                        </div>
                        <div>
                          <span className="text-neon-cyan font-bold">Fault Fallback: </span>
                          <span>{activeProject.architectureMap[activeNodeIdx].fallback}</span>
                        </div>
                        <div className="flex justify-between pt-1 text-[10px] text-fg-dim">
                          <span>Latency: {activeProject.architectureMap[activeNodeIdx].latency}</span>
                          <span>Throughput: Real-time event-driven</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 1.1 Trace a Request Observability */}
                  <div>
                    <span className="font-mono text-[11px] uppercase text-neon-violet tracking-wider block mb-3">
                      // 1.1 Live Distributed Request Tracer
                    </span>
                    <TraceSimulator />
                  </div>

                  {/* Before vs After Performance observatory */}
                  <div>
                    <span className="font-mono text-[11px] uppercase text-neon-cyan tracking-wider block mb-3">
                      // 2. Before ➔ After Performance Observatory
                    </span>
                    <div className="overflow-x-auto rounded-2xl border border-border/80 bg-bg/40">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border/80 bg-bg-card/40 text-fg-dim">
                            <th className="p-3">Metric</th>
                            <th className="p-3">Before</th>
                            <th className="p-3">After (Optimized)</th>
                            <th className="p-3 text-right">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeProject.beforeAfter.map((m) => (
                            <tr key={m.metric} className="border-b border-border/40 hover:bg-bg/25">
                              <td className="p-3 font-semibold text-fg">{m.metric}</td>
                              <td className="p-3 text-red-400">{m.before}</td>
                              <td className="p-3 text-emerald-400">{m.after}</td>
                              <td className="p-3 text-right text-neon-cyan font-semibold">{m.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Decision Logs */}
                  <div>
                    <span className="font-mono text-[11px] uppercase text-neon-violet tracking-wider block mb-3">
                      // 3. Engineering Decisions & Architecture Trade-offs
                    </span>
                    <div className="space-y-4">
                      {activeProject.decisionLog.map((dec) => (
                        <div key={dec.title} className="p-5 rounded-xl border border-border/80 bg-bg/30 font-mono space-y-2">
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="text-xs font-bold text-fg flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-neon-violet" />
                              {dec.title}
                            </h4>
                            <span className="text-[9px] text-neon-cyan border border-neon-cyan/20 px-2 py-0.5 rounded">
                              {dec.date}
                            </span>
                          </div>
                          <div className="text-[10px] text-fg-muted space-y-1.5 pl-3 border-l border-border/60">
                            <p>
                              <span className="text-fg-dim font-bold uppercase">[Context]: </span>
                              {dec.context}
                            </p>
                            <p>
                              <span className="text-red-400 font-bold uppercase">[Rejected]: </span>
                              {dec.rejectedOptions}
                            </p>
                            <p>
                              <span className="text-emerald-400 font-bold uppercase">[Chosen]: </span>
                              {dec.chosenSolution}
                            </p>
                            <p>
                              <span className="text-yellow-400 font-bold uppercase">[Trade-off]: </span>
                              {dec.tradeoff}
                            </p>
                            <p className="text-neon-cyan font-semibold">
                              <span className="text-fg-dim font-bold uppercase">[Result]: </span>
                              {dec.result}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Technologies Used Badges */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-dim mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border bg-bg/80 px-3 py-1 font-mono text-xs text-fg-muted hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
