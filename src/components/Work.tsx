"use client";

import { useState } from "react";
import { Zap, Cpu, ShieldCheck, Database, Lock } from "lucide-react";
import Magnetic from "./Magnetic";

const PROJECTS = [
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
  },
  {
    id: "restaurant-pos",
    title: "Restaurant POS & Recipe Engine",
    subtitle: "POS, Billing & Inventory (forReceipeSys)",
    confidentialTag: "Commercial POS System",
    description:
      "A complete restaurant operation system covering POS order billing, recipe-based inventory deduplication, and daily sales/profit reporting.",
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
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce & Store Management",
    subtitle: "Scalable Retail & Stock Engine",
    confidentialTag: "Retail Management",
    description:
      "A scalable e-commerce backend and store management system for product catalog indexing, customer order tracking, and inventory stock control.",
    challenge:
      "Maintaining fast product search responsiveness during large catalog queries and multi-store inventory updates.",
    solution:
      "Structured indexed database schemas, RESTful product catalog APIs, and automated low-stock alert notifications.",
    metrics: [
      { label: "Catalog Search", value: "<100ms Query Time", icon: Zap },
      { label: "Order State", value: "Automated Workflow", icon: Cpu },
      { label: "Data Integrity", value: "Strict Foreign Keys", icon: ShieldCheck },
    ],
    tech: ["Laravel", "MySQL", "RESTful APIs", "JSON", "Blade Templating"],
  },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState(0);
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
                  onClick={() => setActiveTab(idx)}
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

              {/* Description */}
              <p className="mt-6 text-fg-muted leading-relaxed text-sm sm:text-base">
                {activeProject.description}
              </p>

              {/* Challenge & Solution Grid */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              <div className="mt-8">
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
