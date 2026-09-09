"use client";

import {
  Server,
  Code2,
  Database,
  Cpu,
  Code,
  Layout,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const SKILLS = [
  {
    name: "Laravel",
    category: "Core Backend",
    description: "Scalable MVC architecture, Eloquent ORM, Queues & Jobs, Sanctum authentication, and robust service layer patterns.",
    icon: Server,
    color: "#ff2d20", // Laravel Red
    badge: "Primary Framework",
    tags: ["Eloquent ORM", "Queues & Jobs", "Sanctum", "MVC Pattern"],
  },
  {
    name: "PHP (OOP)",
    category: "Backend Foundation",
    description: "Solid Object-Oriented principles, clean design patterns, Composer dependency management, and PSR standards.",
    icon: Code2,
    color: "#0284c7", // Ocean Blue
    badge: "Core Language",
    tags: ["OOP Principles", "Clean Code", "Composer", "PSR Standards"],
  },
  {
    name: "MySQL & Database",
    category: "Database Engineering",
    description: "Relational schema design, complex query optimization, indexing strategies, foreign keys, and transaction integrity.",
    icon: Database,
    color: "#0ea5e9", // Sky Water Blue
    badge: "Query Tuning",
    tags: ["Query Optimization", "Indexing", "Relational Schemas", "Transactions"],
  },
  {
    name: "RESTful API Systems",
    category: "System Architecture",
    description: "Contract-first REST API development, secure token authentication, rate limiting, and seamless frontend sync.",
    icon: Cpu,
    color: "#06b6d4", // Water Cyan
    badge: "Production Ready",
    tags: ["JSON Contracts", "API Versioning", "Token Auth", "Endpoints"],
  },
  {
    name: "JavaScript & AJAX",
    category: "Dynamic Frontend",
    description: "Asynchronous server communication, dynamic DOM manipulation, real-time data sync, and interactive user interfaces.",
    icon: Code,
    color: "#38bdf8", // Sky Blue
    badge: "Asynchronous UX",
    tags: ["AJAX & Fetch", "DOM Manipulation", "Async/Await", "Event Handling"],
  },
  {
    name: "Blade & Tailwind CSS",
    category: "UI & Templating",
    description: "Modular Laravel Blade components, modern utility-first layouts with Tailwind CSS, and responsive styling.",
    icon: Layout,
    color: "#0ea5e9", // Water Blue
    badge: "Modern Styling",
    tags: ["Blade Components", "Tailwind CSS", "Responsive UI", "Glassmorphism"],
  },
  {
    name: "Git & Postman",
    category: "Workflow & Tooling",
    description: "Git version control, feature branch workflows, PR reviews, API collection debugging, and endpoint documentation.",
    icon: GitBranch,
    color: "#f97316", // Workflow Orange
    badge: "Daily Toolchain",
    tags: ["Git Workflow", "Postman Testing", "Version Control", "Documentation"],
  },
  {
    name: "Security & RBAC",
    category: "Enterprise Quality",
    description: "Granular Role-Based Access Control, CSRF/XSS defense, SQL injection protection, and server-side request validation.",
    icon: ShieldCheck,
    color: "#0284c7", // Water Blue (No Purple!)
    badge: "Enterprise Security",
    tags: ["RBAC", "Sanctum Auth", "CSRF Protection", "Input Validation"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden bg-bg-soft">
      {/* Background ambient water-blue glow overlays */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08),transparent_60%)] blur-3xl" />

      {/* Synchronized container width with Hero and About */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="max-w-3xl reveal">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
            // 02. Technical Arsenal
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg leading-tight">
            My Tech Stack &amp; <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg leading-relaxed">
            I specialize in building reliable backends with Laravel &amp; PHP, architecting relational MySQL databases, and integrating clean modern frontends. Here are the core technologies I work with daily.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty("--mouse-x", `${x}px`);
              card.style.setProperty("--mouse-y", `${y}px`);
            };

            return (
              <div
                key={skill.name}
                onMouseMove={handleMouseMove}
                className="reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-neon-cyan/40 hover:-translate-y-1.5 hover:shadow-xl"
                style={
                  {
                    "--hover-shadow": `0 12px 30px -10px ${skill.color}35`,
                  } as React.CSSProperties
                }
              >
                {/* Top Subtle Accent Gradient Highlight */}
                <span className="absolute top-0 inset-x-4 h-[1.5px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent transition-opacity duration-300 group-hover:via-neon-cyan" />

                {/* Mouse Spotlight Glow Background */}
                <div
                  className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${skill.color}15, transparent 80%)`,
                  }}
                />

                {/* Card Content Top Area */}
                <div className="relative z-10">
                  {/* Category & Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim font-medium">
                        {skill.category}
                      </span>
                    </div>

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg border border-border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        color: skill.color,
                        boxShadow: `0 0 16px -4px ${skill.color}30`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="mt-5 text-xl font-bold text-fg transition-colors group-hover:text-neon-cyan">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-fg-muted leading-relaxed min-h-[3.2rem]">
                    {skill.description}
                  </p>

                  {/* Tech Tags / Micro Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-bg/80 border border-border/70 text-fg-dim font-medium transition-colors group-hover:border-border-glow group-hover:text-fg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Status / Proficiency Capsule */}
                <div className="relative z-10 mt-6 pt-3.5 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neon-cyan" />
                    <span className="font-mono text-[11px] text-fg-muted font-medium">
                      {skill.badge}
                    </span>
                  </div>
                  <span
                    className="h-1.5 w-6 rounded-full opacity-60 transition-all duration-300 group-hover:w-10 group-hover:opacity-100"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
