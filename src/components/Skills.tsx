"use client";

import { Cpu, Server, Database, Code, Layout, ShieldCheck, GitBranch, Layers } from "lucide-react";

const SKILLS = [
  {
    name: "Laravel",
    category: "Backend",
    description: "Eloquent ORM, Queues, REST APIs, Laravel Echo, Sanctum",
    icon: Server,
    color: "#ff2d20", // Laravel Red
  },
  {
    name: "PHP",
    category: "Backend",
    description: "OOP, MVC Architecture, Composer, PSR Standards",
    icon: Code,
    color: "#777bb4", // PHP Blue-Violet
  },
  {
    name: "MySQL / SQL",
    category: "Database",
    description: "Query Optimization, Indexing, Transactions, Relational DBs",
    icon: Database,
    color: "#00758f", // MySQL Blue-Cyan
  },
  {
    name: "RESTful APIs",
    category: "Architecture",
    description: "API Versioning, Authentication, Rate Limiting, JSON/XML",
    icon: Cpu,
    color: "#00fff2", // Neon Cyan
  },
  {
    name: "React / Next.js",
    category: "Frontend",
    description: "App Router, Hooks, SSR, Tailwind Integration",
    icon: Layout,
    color: "#00d8ff", // React Cyan
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Responsive layouts, Utility-first, Custom theme overrides",
    icon: Layers,
    color: "#38bdf8", // Tailwind Sky
  },
  {
    name: "Git / GitHub",
    category: "Workflow",
    description: "Version Control, Pull Requests, Rebase, Branching Strategies",
    icon: GitBranch,
    color: "#f05032", // Git Orange
  },
  {
    name: "Security & Testing",
    category: "Quality",
    description: "SQL Injection defense, CSRF, JWT, PHPUnit, Authentication",
    icon: ShieldCheck,
    color: "#7c3aed", // Violet
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden bg-bg-soft">
      {/* Glow overlays */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.06),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl reveal">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// 02. Technical Arsenal</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg">
            My Tech Stack &amp; <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            I specialize in building reliable backends, managing databases, and integrating clean modern frontends.
            Here are the core technologies I work with daily.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="reveal group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-transparent hover:-translate-y-1.5"
                style={
                  {
                    "--hover-shadow": `0 10px 30px -10px ${skill.color}50`,
                    "--hover-border": skill.color,
                  } as React.CSSProperties
                }
              >
                {/* Glow Background Shader */}
                <div
                  className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${skill.color}15 0%, transparent 60%)`,
                  }}
                />

                {/* Custom Glowing Border on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                  style={{
                    borderColor: skill.color,
                    boxShadow: `0 0 20px -8px ${skill.color}`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-fg-dim">
                        {skill.category}
                      </span>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg border border-border-glow transition-colors group-hover:border-transparent"
                        style={{
                          color: skill.color,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Skill Info */}
                    <h3 className="mt-6 text-xl font-semibold text-fg transition-colors group-hover:text-glow">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Visual indicator */}
                  <div className="mt-6 h-1 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 w-0 group-hover:w-full"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
